"""Analysis over intel.db. Writes CSVs + a markdown summary to docs/seo-plan/intel/reports/.

  python analyze.py

Outputs
  serp_domain_share.csv     who really ranks (by result type) - national vs city SERPs
  city_serp_weakness.csv    per-city SERP weakness proxy (plan 5.4): share of top-5 held by weak result types
  serp_clusters.csv         automatic SERP-overlap clustering of national queries (Jaccard on top-10 URLs)
  paa_questions.csv         People Also Ask questions with frequency (FAQ source)
  related_searches.csv      related searches with frequency (keyword expansion source)
  autocomplete.csv          autocomplete suggestions (if the autocomplete wave was run)
  competitor_coverage.csv   competitor pages crawled, by type (if the crawl has run)
  SUMMARY.md                human-readable digest
"""
from __future__ import annotations

import itertools
from collections import defaultdict

import pandas as pd

from common import INTEL_DIR, connect

OUT = INTEL_DIR / "reports"
OUT.mkdir(parents=True, exist_ok=True)

WEAK = {"directory", "marketplace", "news", "forum", "gov"}   # not a dedicated LPG business page


def q(con, sql, params=()):
    return pd.read_sql_query(sql, con, params=params)


def main() -> None:
    con = connect()
    res = q(con, """select s.*, qq.q as query, qq.scope, qq.wave, qq.intent
                    from serp_results s join serp_queries qq on qq.id=s.query_id""")
    if res.empty:
        print("No SERP data stored yet. Run serper_run.py first.")
        return
    org = res[res.kind == "organic"].copy()
    lines = ["# SERP and competitor intelligence summary", ""]
    nq = q(con, "select count(*) n, sum(credits) c from serp_queries").iloc[0]
    lines += [f"- Queries stored: **{int(nq.n)}** (credits used: {int(nq.c)})", f"- Organic results stored: **{len(org)}**", ""]

    # 1. domain share
    share = (org.groupby(["domain", "result_type"]).agg(appearances=("id", "count"),
                                                         avg_position=("position", "mean"),
                                                         top3=("position", lambda s: int((s <= 3).sum()))).reset_index()
             .sort_values("appearances", ascending=False))
    share.to_csv(OUT / "serp_domain_share.csv", index=False)
    lines += ["## Who ranks (top 15 domains across all stored SERPs)", "", "| Domain | Type | Appearances | Avg pos | Top-3 |", "|---|---|---|---|---|"]
    for _, r in share.head(15).iterrows():
        lines.append(f"| {r.domain} | {r.result_type} | {r.appearances} | {r.avg_position:.1f} | {r.top3} |")
    mix = org.groupby("result_type").size().sort_values(ascending=False)
    lines += ["", "Result-type mix: " + ", ".join(f"{k} {v} ({v / len(org):.0%})" for k, v in mix.items()), ""]

    # 2. city SERP weakness proxy
    city = org[(org.wave.isin(["1", "2"])) & (org.position <= 5)].copy()
    rows = []
    for scope, g in city.groupby("scope"):
        nres = len(g)
        weak = g.result_type.isin(WEAK).sum()
        lpg_biz = g[(g.result_type == "competitor") | ((g.result_type == "other") & g.url.str.contains("lpg|gas", case=False, na=False))]
        rows.append({"city": scope, "top5_results": nres, "weak_share": round(weak / nres, 2),
                     "dedicated_lpg_sites_share": round(len(lpg_biz) / nres, 2),
                     "weakness_score_0_30": round(30 * (weak / nres + (1 - len(lpg_biz) / nres)) / 2, 1)})
    if rows:
        cw = pd.DataFrame(rows).sort_values("weakness_score_0_30", ascending=False)
        cw.to_csv(OUT / "city_serp_weakness.csv", index=False)
        lines += ["## City SERP weakness proxy (higher = weaker competition, 0-30)", "", "| City | Weak share | Dedicated LPG sites | Score |", "|---|---|---|---|"]
        for _, r in cw.head(12).iterrows():
            lines.append(f"| {r.city} | {r.weak_share:.0%} | {r.dedicated_lpg_sites_share:.0%} | {r.weakness_score_0_30} |")
        lines.append("")

    # 3. automatic SERP-overlap clustering (national queries)
    nat = org[org.wave == "0"]
    sets = {qq: set(g.url.dropna().map(lambda u: u.split("#")[0].rstrip("/"))) for qq, g in nat.groupby("query")}
    pairs, parent = [], {k: k for k in sets}

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for a, b in itertools.combinations(sets, 2):
        if not sets[a] or not sets[b]:
            continue
        j = len(sets[a] & sets[b]) / len(sets[a] | sets[b])
        if j >= 0.4:
            pairs.append({"query_a": a, "query_b": b, "jaccard": round(j, 2),
                          "verdict": "MERGE (one page)" if j >= 0.7 else "REVIEW (manual)"})
        if j >= 0.7:
            parent[find(a)] = find(b)
    pd.DataFrame(pairs, columns=["query_a", "query_b", "jaccard", "verdict"]).sort_values("jaccard", ascending=False).to_csv(OUT / "serp_clusters.csv", index=False)
    clusters: dict[str, list[str]] = defaultdict(list)
    for k in sets:
        clusters[find(k)].append(k)
    multi = [v for v in clusters.values() if len(v) > 1]
    lines += ["## SERP-overlap clustering (national queries)", "",
              f"- Queries analysed: {len(sets)}; pairs with overlap >= 40%: {len(pairs)}; merge groups at >= 70%: {len(multi)}", ""]
    for v in sorted(multi, key=len, reverse=True)[:10]:
        lines.append("- " + " / ".join(sorted(v)[:6]) + (" ..." if len(v) > 6 else ""))
    lines.append("")

    # 4. PAA, related, autocomplete
    for kind, fname, label in (("paa", "paa_questions.csv", "People Also Ask"),
                               ("related", "related_searches.csv", "Related searches"),
                               ("autocomplete", "autocomplete.csv", "Autocomplete")):
        d = res[res.kind == kind]
        if d.empty:
            continue
        freq = d.groupby(d.title.str.lower().str.strip()).agg(freq=("id", "count"), queries=("query", "nunique")).reset_index()
        freq = freq.rename(columns={"title": "text"}).sort_values("freq", ascending=False)
        freq.to_csv(OUT / fname, index=False)
        lines += [f"## {label}: {len(freq)} distinct (top 10)", ""]
        lines += [f"- {r.text} ({r.freq}x)" for _, r in freq.head(10).iterrows()]
        lines.append("")

    # 5. competitor coverage
    pages = q(con, "select domain, content_type, count(*) n, sum(word_count) words, sum(needs_js) needs_js from pages where status=200 group by domain, content_type")
    if not pages.empty:
        pages.to_csv(OUT / "competitor_coverage.csv", index=False)
        tot = pages.groupby("domain").agg(pages=("n", "sum"), words=("words", "sum"), needs_js=("needs_js", "sum")).sort_values("pages", ascending=False)
        lines += ["## Competitor corpus crawled", "", "| Domain | Pages | Words | Pages needing JS render |", "|---|---|---|---|"]
        for d, r in tot.iterrows():
            lines.append(f"| {d} | {int(r.pages)} | {int(r.words or 0):,} | {int(r.needs_js or 0)} |")
        lines.append("")

    (OUT / "SUMMARY.md").write_text("\n".join(lines), encoding="utf-8")
    print("\n".join(lines))


if __name__ == "__main__":
    main()

