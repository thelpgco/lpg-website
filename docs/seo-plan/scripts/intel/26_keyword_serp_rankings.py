"""Who ranks for the Semrush keyword list: Google top 20 in Pakistan for each keyword, via Serper.

Run:  python docs/seo-plan/scripts/intel/26_keyword_serp_rankings.py [--refresh]
      Responses are cached in raw/; --refresh ignores the cache and fetches every keyword again.
Needs SERPER_API_KEY (environment or lpg-website/.env.local; loaded by common.load_env, never written out).
Cost: 2 Serper credits per keyword (pages 1 and 2, 10 results each).
Google now returns some results as google.com/goto?url=... redirects; those are resolved to the real URL.

Writes (UTF-8) to docs/seo-plan/intel/keyword-rankings-<date>/:
  INDEX.md            summary: top competitors, our positions, SERP features, page types that win
  rankings.csv        keyword, volume, position, domain, url, title, snippet  (one row per result)
  competitors.csv     per domain: keywords ranked, top-3 / top-10 counts, avg position, estimated clicks
  top-pages.csv       per URL: keywords it ranks for and best position (the pages to study)
  serp-features.csv   per keyword: answer box, People Also Ask, local pack, knowledge graph, our position
  raw/<keyword>.json  untouched Serper responses
"""
from __future__ import annotations

import csv
import json
import os
import re
import sys
import time
from collections import defaultdict
from datetime import date
from pathlib import Path

import requests

from common import INTEL_DIR, domain_of, load_env

KEYWORDS: list[tuple[str, int]] = [
    ("lpg gas price in pakistan", 22200), ("lpg price in pakistan today", 12100), ("lpg gas price today", 9900),
    ("lpg price in pakistan", 8100), ("lpg gas price in pakistan today", 6600), ("today lpg rate", 5400),
    ("lpg", 4400), ("lpg near me", 3600), ("lpg gas price", 2900), ("lpg 1kg price today pakistan", 2400),
    ("lpg gas rate", 2400), ("lpg gas", 1900), ("lpg price", 1900), ("lpg rate", 1900), ("lpg stands for", 1900),
    ("lpg price in pakistan today per kg", 1600), ("lpg 1kg price today", 1300), ("lpg cylinder", 1300),
    ("lpg cylinder price in pakistan", 1300), ("ogra lpg prices", 1300), ("lpg full form", 1000),
    ("lpg 1kg price today 2026", 880), ("lpg gas cylinder", 720), ("lpg price per kg in pakistan today 2021", 720),
    ("lpg cylinder price", 590), ("lpg filling station", 590), ("lpg gas cylinder price", 590),
    ("lpg gas rate today", 590), ("lpg gas station", 590), ("lpg rate in pakistan", 590), ("lpg meaning", 480),
    ("lpg price today", 480), ("lpg shop", 480), ("lpg shop near me", 480), ("ssgc lpg", 480),
    ("lpg price karachi", 390), ("lpg price lahore", 390), ("lpg rate today in pakistan", 390), ("lpg station", 390),
]

OUR_DOMAIN = "thelpgco.pk"
LOCATION = "Islamabad, Islamabad Capital Territory, Pakistan"
# Rough organic click-through by position (industry averages), used only to rank competitors by likely traffic.
CTR = {1: 0.28, 2: 0.15, 3: 0.10, 4: 0.07, 5: 0.05, 6: 0.04, 7: 0.03, 8: 0.025, 9: 0.02, 10: 0.018}

OUT = INTEL_DIR / f"keyword-rankings-{date.today().isoformat()}"


def slug(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def search_page(q: str, key: str, page: int) -> dict:
    for attempt in range(3):
        r = requests.post(
            "https://google.serper.dev/search",
            headers={"X-API-KEY": key, "Content-Type": "application/json"},
            json={"q": q, "gl": "pk", "hl": "en", "location": LOCATION, "num": 10, "page": page},
            timeout=30,
        )
        if r.status_code == 200:
            return r.json()
        time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"Serper failed for {q!r}: HTTP {r.status_code} {r.text[:200]}")


def resolve(link: str) -> str:
    """google.com/goto?url=... -> the page it redirects to (one request, redirect not followed)."""
    if "google.com/goto" not in link:
        return link
    try:
        r = requests.get(link, allow_redirects=False, timeout=15, headers={"User-Agent": "Mozilla/5.0"})
        return r.headers.get("location") or link
    except requests.RequestException:
        return link


def search(q: str, key: str) -> dict:
    """Top 20: page 1 + page 2, positions renumbered 1-20, goto links resolved. Other SERP blocks from page 1."""
    first = search_page(q, key, 1)
    second = search_page(q, key, 2)
    organic = first.get("organic", []) + second.get("organic", [])
    for i, item in enumerate(organic, 1):
        item["position"] = i
        item["link"] = resolve(item.get("link", ""))
    return {**first, "organic": organic}


def main() -> None:
    load_env()
    key = os.environ.get("SERPER_API_KEY", "").strip()
    if not key:
        raise SystemExit("SERPER_API_KEY is not set")
    (OUT / "raw").mkdir(parents=True, exist_ok=True)

    rows, features = [], []
    for q, vol in KEYWORDS:
        cache = OUT / "raw" / f"{slug(q)}.json"
        fetched = "--refresh" in sys.argv or not cache.exists()
        data = search(q, key) if fetched else json.loads(cache.read_text(encoding="utf-8"))
        # Google throttles goto lookups when they come fast; retry any left over, slowly.
        for item in data.get("organic", []):
            if "google.com/goto" in item.get("link", ""):
                time.sleep(1)
                item["link"] = resolve(item["link"])
        cache.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
        ours = None
        for item in data.get("organic", []):
            d = domain_of(item.get("link", ""))
            if d == "google.com" and "google.com/goto" in item.get("link", ""):
                shown = item.get("displayedLink", "")
                d = domain_of(shown.split(" ")[0]) if shown.startswith("http") else "unresolved"
            pos = item.get("position")
            rows.append({"keyword": q, "volume": vol, "position": pos, "domain": d, "url": item.get("link", ""),
                         "title": item.get("title", ""), "snippet": item.get("snippet", "")})
            if d == OUR_DOMAIN and ours is None:
                ours = pos
        ab = data.get("answerBox") or {}
        places = data.get("places") or []
        features.append({
            "keyword": q, "volume": vol, "our_position": ours or "",
            "answer_box": domain_of(ab.get("link", "")) if ab else "",
            "answer_box_text": (ab.get("answer") or ab.get("snippet") or "")[:200],
            "people_also_ask": " | ".join(p.get("question", "") for p in data.get("peopleAlsoAsk", [])),
            "local_pack": " | ".join(p.get("title", "") for p in places),
            "knowledge_graph": (data.get("knowledgeGraph") or {}).get("title", ""),
            "top_result": rows[-len(data.get("organic", []))]["url"] if data.get("organic") else "",
        })
        print(f"{q:45s} ours={ours or '-'}")
        if fetched:
            time.sleep(0.3)

    write_csv(OUT / "rankings.csv", rows, ["keyword", "volume", "position", "domain", "url", "title", "snippet"])
    write_csv(OUT / "serp-features.csv", features,
              ["keyword", "volume", "our_position", "answer_box", "answer_box_text", "people_also_ask", "local_pack",
               "knowledge_graph", "top_result"])

    # Per-domain and per-URL rollups.
    dom = defaultdict(lambda: {"kws": {}, "clicks": 0.0})
    page = defaultdict(lambda: {"kws": {}, "domain": "", "title": ""})
    for r in rows:
        d, pos = r["domain"], r["position"]
        best = dom[d]["kws"].get(r["keyword"])
        if best is None or pos < best:
            dom[d]["kws"][r["keyword"]] = pos
        p = page[r["url"]]
        p["domain"], p["title"] = d, r["title"]
        if r["keyword"] not in p["kws"] or pos < p["kws"][r["keyword"]]:
            p["kws"][r["keyword"]] = pos
    vol = dict(KEYWORDS)
    comp = []
    for d, v in dom.items():
        ps = list(v["kws"].values())
        clicks = sum(vol[k] * CTR.get(p, 0) for k, p in v["kws"].items())
        comp.append({"domain": d, "keywords_ranked": len(ps), "top3": sum(p <= 3 for p in ps),
                     "top10": sum(p <= 10 for p in ps), "avg_position": round(sum(ps) / len(ps), 1),
                     "est_monthly_clicks": round(clicks), "is_us": d == OUR_DOMAIN,
                     "keywords": "; ".join(f"{k} (#{p})" for k, p in sorted(v["kws"].items(), key=lambda x: x[1]))})
    comp.sort(key=lambda c: (-c["est_monthly_clicks"], -c["keywords_ranked"]))
    write_csv(OUT / "competitors.csv", comp,
              ["domain", "keywords_ranked", "top3", "top10", "avg_position", "est_monthly_clicks", "is_us", "keywords"])

    pages = []
    for u, v in page.items():
        ps = v["kws"]
        pages.append({"url": u, "domain": v["domain"], "title": v["title"], "keywords_ranked": len(ps),
                      "best_position": min(ps.values()),
                      "est_monthly_clicks": round(sum(vol[k] * CTR.get(p, 0) for k, p in ps.items())),
                      "keywords": "; ".join(f"{k} (#{p})" for k, p in sorted(ps.items(), key=lambda x: x[1]))})
    pages.sort(key=lambda p: (-p["est_monthly_clicks"], -p["keywords_ranked"]))
    write_csv(OUT / "top-pages.csv", pages,
              ["url", "domain", "title", "keywords_ranked", "best_position", "est_monthly_clicks", "keywords"])

    write_index(comp, pages, features)
    print(f"\nWrote {OUT}")


def write_csv(path: Path, rows: list[dict], cols: list[str]) -> None:
    with path.open("w", newline="", encoding="utf-8-sig") as f:  # BOM so Excel opens it as UTF-8
        w = csv.DictWriter(f, fieldnames=cols)
        w.writeheader()
        w.writerows(rows)


def write_index(comp: list[dict], pages: list[dict], features: list[dict]) -> None:
    us = next((c for c in comp if c["is_us"]), None)
    total = sum(v for _, v in KEYWORDS)
    lines = [
        f"# Keyword rankings: who ranks for our {len(KEYWORDS)} target keywords",
        "",
        f"Google results from Serper, {date.today().isoformat()}, country Pakistan, location {LOCATION}, top 20 per keyword.",
        f"Target volume: {total:,} searches a month. Estimated clicks use average click-through by position (a rough guide, not real traffic).",
        "",
        "## Our position",
        "",
        (f"thelpgco.pk ranks for {us['keywords_ranked']} of {len(KEYWORDS)} keywords (top 3: {us['top3']}, top 10: {us['top10']}, "
         f"average position {us['avg_position']}).") if us else "thelpgco.pk is not in the top 20 for any keyword yet.",
        "",
        "| Keyword | Volume | Our position | #1 result |",
        "|---|---:|---:|---|",
        *[f"| {f['keyword']} | {f['volume']:,} | {f['our_position'] or '—'} | {f['top_result']} |" for f in features],
        "",
        "## Top 25 competing domains (by estimated clicks)",
        "",
        "| Domain | Keywords | Top 3 | Top 10 | Avg pos | Est. clicks/mo |",
        "|---|---:|---:|---:|---:|---:|",
        *[f"| {c['domain']}{' **(us)**' if c['is_us'] else ''} | {c['keywords_ranked']} | {c['top3']} | {c['top10']} | {c['avg_position']} | {c['est_monthly_clicks']:,} |"
          for c in comp[:25]],
        "",
        "## Top 30 pages to study (by estimated clicks)",
        "",
        "| Page | Keywords | Best pos | Est. clicks/mo |",
        "|---|---:|---:|---:|",
        *[f"| [{p['title'][:70]}]({p['url']}) | {p['keywords_ranked']} | {p['best_position']} | {p['est_monthly_clicks']:,} |" for p in pages[:30]],
        "",
        "## SERP features",
        "",
        f"- Answer box (featured snippet) on {sum(bool(f['answer_box']) for f in features)} keywords.",
        f"- Local map pack on {sum(bool(f['local_pack']) for f in features)} keywords: {', '.join(f['keyword'] for f in features if f['local_pack'])}.",
        f"- People Also Ask on {sum(bool(f['people_also_ask']) for f in features)} keywords (questions in serp-features.csv).",
        "",
        "Files: rankings.csv (every result), competitors.csv, top-pages.csv, serp-features.csv, raw/ (Serper JSON).",
        "",
    ]
    (OUT / "INDEX.md").write_text("\n".join(lines), encoding="utf-8")


if __name__ == "__main__":
    main()
