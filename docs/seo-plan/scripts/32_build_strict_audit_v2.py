"""Parse cluster strict audits and write CONTENT_QUALITY_AUDIT_V2.md master table."""
from __future__ import annotations

import re
from collections import Counter, defaultdict
from pathlib import Path

SITE = Path(__file__).resolve().parents[3]
AUDIT = SITE / "docs" / "seo-plan" / "audit"
OUT = SITE / "docs" / "seo-plan" / "CONTENT_QUALITY_AUDIT_V2.md"

FILES = [
    ("money_r1", AUDIT / "strict_money_r1.md"),
    ("r2_r3", AUDIT / "strict_r2_r3.md"),
    ("r4plus", AUDIT / "strict_r4plus.md"),
]

# Prefer earlier clusters for overlaps (money_r1 owns duration calculator over r4plus)
PRIORITY = {"money_r1": 0, "r2_r3": 1, "r4plus": 2}

# Examples:
# ### `/path/` — WEAK (10/21) A2 …
# ### `/` (app/page.tsx) — WEAK (11/21) …
# ### `/tools/…/` (+ `Calculator.tsx`) — GOOD (19/21) …
HEADER_RE = re.compile(
    r"^###\s+`([^`]+)`(?:\s*\([^)]*\))?(?:\s*\(\+\s*`[^`]+`\))?\s*[—\-]\s*(.+)$",
    re.M,
)
GRADE_RE = re.compile(
    r"(GOOD|BORDERLINE|WEAK|Not scored)",
    re.I,
)
SCORE_RE = re.compile(r"\((\d+)\s*(?:/21)?(?:\s*raw[^)]*)?\)")


def parse_file(path: Path, source: str) -> list[dict]:
    text = path.read_text(encoding="utf-8")
    rows = []
    for m in HEADER_RE.finditer(text):
        url = m.group(1).strip()
        rest = m.group(2).strip()
        gm = GRADE_RE.search(rest)
        if not gm:
            continue
        grade = gm.group(1).upper()
        if grade == "NOT SCORED":
            grade = "NOT_SCORED"
        sm = SCORE_RE.search(rest)
        score = int(sm.group(1)) if sm else None
        # extract A/C/G/H/K/D/M if present
        dims = re.search(r"\b([0-3]/[0-3]/[0-3]/[0-3]/[0-3]/[0-3]/[0-3])\b", rest)
        if not dims:
            dims = re.search(
                r"A(\d)\s*C(\d)\s*G(\d)\s*H(\d)\s*K(\d)\s*D(\d)\s*M(\d)",
                rest,
                re.I,
            )
            dim_str = "/".join(dims.groups()) if dims else ""
        else:
            dim_str = dims.group(1)
        # verdict line after header
        after = text[m.end() : m.end() + 1200]
        vm = re.search(r"\*\*Verdict:\*\*\s*(.+)", after)
        verdict = vm.group(1).strip() if vm else ""
        rows.append(
            {
                "url": url if url.startswith("/") else f"/{url.strip('/')}/",
                "grade": grade,
                "score": score,
                "dims": dim_str,
                "verdict": verdict[:220],
                "source": source,
            }
        )
    return rows


def normalize_url(u: str) -> str:
    u = u.strip()
    if "page.tsx" in u or "app/" in u:
        # keep as noted
        return u
    if not u.startswith("/"):
        u = "/" + u
    if not u.endswith("/") and "[" not in u:
        u += "/"
    return u


def main() -> None:
    all_rows: list[dict] = []
    for source, path in FILES:
        if not path.exists():
            raise SystemExit(f"missing {path}")
        parsed = parse_file(path, source)
        print(f"{source}: {len(parsed)} headers")
        all_rows.extend(parsed)

    # Deduplicate by url preferring higher priority (lower number)
    best: dict[str, dict] = {}
    for r in all_rows:
        url = normalize_url(r["url"])
        r["url"] = url
        prev = best.get(url)
        if prev is None or PRIORITY[r["source"]] < PRIORITY[prev["source"]]:
            best[url] = r

    rows = sorted(best.values(), key=lambda x: (x["grade"], x["url"]))
    counts = Counter(r["grade"] for r in rows)
    print("unique", len(rows), dict(counts))

    # Cluster buckets for the report
    def cluster(url: str) -> str:
        if url in {"/", "/lpg-price-in-pakistan/", "/lpg-price-per-kg-in-pakistan/", "/lpg-cylinder-price-in-pakistan/", "/ogra-lpg-notified-price/", "/lpg-price-in-pakistan/history/", "/lpg-cylinders/", "/lpg-cylinder-sizes-in-pakistan/", "/lpg-home-delivery/", "/order-lpg/", "/delivery-areas/", "/why-lpg-prices-change-in-pakistan/"} or "lpg-price-in-pakistan/[" in url:
            return "Money / home / delivery"
        if url.startswith("/lpg-cylinders/") or url in {"/lpg-cylinder-refill/", "/new-lpg-connection/", "/tools/lpg-cylinder-duration-calculator/"}:
            return "R1 cylinders"
        if any(x in url for x in ["lpg-vs-", "propane", "what-is-lpg", "how-lpg", "composition", "how-to-choose", "marketing-company", "ogra-lpg-regulations", "lpg-supply", "lpg-shortage", "lpg-companies", "lpg-safety", "smell-gas", "blast", "regulator", "leak-detector"]):
            return "R2 guides / safety"
        if any(x in url for x in ["commercial-lpg", "bulk-lpg", "industrial-lpg", "lpg-bowser", "lpg-plant", "lpg-business", "auto-lpg", "lpg-kit", "filling-stations", "shops-and-agencies", "lpg-near-me", "become-an-lpg"]):
            return "R3 commercial"
        if url.startswith("/lpg-in-"):
            return "Cities / provinces"
        if url.startswith("/industries"):
            return "Industries"
        if url.startswith("/tools/"):
            return "Tools"
        if url.startswith("/shop") or any(x in url for x in ["stove-price", "geyser-price", "heaters", "vaporizers"]):
            return "Shop / appliances"
        if url.startswith("/services"):
            return "Services"
        if url in {"/privacy/", "/terms/"}:
            return "Legal (not scored)"
        return "Trust / other"

    by_c = defaultdict(list)
    for r in rows:
        by_c[cluster(r["url"])].append(r)

    lines: list[str] = []
    lines.append("# Content quality audit V2 (strict re-verification)")
    lines.append("")
    lines.append("**Date:** 28 Oct 2026 · **Scope:** every built content URL, deep-read in three cluster passes · **No provisional grades.**")
    lines.append("")
    lines.append("Source cluster files (evidence + quotes):")
    lines.append("- [`audit/strict_money_r1.md`](audit/strict_money_r1.md) — home, money, delivery, R1 cylinders")
    lines.append("- [`audit/strict_r2_r3.md`](audit/strict_r2_r3.md) — guides, safety, commercial")
    lines.append("- [`audit/strict_r4plus.md`](audit/strict_r4plus.md) — cities, industries, tools, shop, services, trust")
    lines.append("")
    lines.append("Compared with V1 ([`CONTENT_QUALITY_AUDIT.md`](CONTENT_QUALITY_AUDIT.md)): V1 had **15 Good / 74 Borderline / 28 Weak**. Strict V2 is much harsher.")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## How Good vs Bad is decided (stricter than V1)")
    lines.append("")
    lines.append("| Gate | Rule |")
    lines.append("|---|---|")
    lines.append("| Criteria | A answer-first · C coverage · G info-gain · H honesty · K craft · D differentiation · M media — each 0–3 (max 21) |")
    lines.append("| **GOOD** | Total ≥17 **and** A≥3 **and** G≥3 **and** H≥3 **and** no draft/internal language on the page **and** H1/URL promise is actually delivered |")
    lines.append("| **BORDERLINE** | Total 11–16, **or** score looks Good but fails a gate (G/H/promise/draft) |")
    lines.append("| **WEAK** | Total ≤10 **or** H≤1 **or** A≤1 **or** URL/H1 promises price/list/projects the body refuses **or** page is mostly a template name-swap |")
    lines.append("")
    lines.append("**What counts as info-gain (G=3):** ≥3 concrete extras a competitor page typically lacks — worked rupee tables from live OGRA data, working calculators with assumptions, checklists with specifics, sourced local facts. A generic FAQ alone is **not** enough.")
    lines.append("")
    lines.append("**Automatic honesty fails (H≤1):** visible `[needs confirmation]`, `Gate L`, `owner photos pending`, `partner preview`, fabricated-looking identical test-order times, AI images captioned as real HQ/licence/certificates, price marketed as OGRA-checked when `prices.json` still says news secondary + PDF recheck.")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Headline counts (strict V2)")
    lines.append("")
    lines.append("| Grade | Count |")
    lines.append("|---|---:|")
    for g in ["GOOD", "BORDERLINE", "WEAK", "NOT_SCORED"]:
        lines.append(f"| {g.replace('_', ' ').title()} | {counts.get(g, 0)} |")
    lines.append(f"| **Unique URLs graded** | **{len(rows)}** |")
    lines.append("")
    lines.append("**Blunt reading:** under this bar almost nothing is publish-ready content. Structure is mostly fine; substance and honesty gates fail. V1 over-credited explainers that look complete but still show draft/safety-review leakage or missing numbers.")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Master table (every graded URL)")
    lines.append("")
    lines.append("| Grade | Score | Path | Dims A/C/G/H/K/D/M | Cluster | Short verdict |")
    lines.append("|---|---:|---|---|---|---|")
    order = {"WEAK": 0, "BORDERLINE": 1, "GOOD": 2, "NOT_SCORED": 3}
    for r in sorted(rows, key=lambda x: (order.get(x["grade"], 9), -(x["score"] or 0), x["url"])):
        score = r["score"] if r["score"] is not None else "—"
        dims = r["dims"] or "—"
        verd = (r["verdict"] or "—").replace("|", "/")
        lines.append(
            f"| {r['grade']} | {score} | `{r['url']}` | {dims} | {cluster(r['url'])} | {verd} |"
        )

    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Counts by cluster")
    lines.append("")
    lines.append("| Cluster | Good | Borderline | Weak | Other |")
    lines.append("|---|---:|---:|---:|---:|")
    for cname in sorted(by_c):
        c = Counter(r["grade"] for r in by_c[cname])
        lines.append(
            f"| {cname} | {c.get('GOOD',0)} | {c.get('BORDERLINE',0)} | {c.get('WEAK',0)} | {c.get('NOT_SCORED',0)} |"
        )

    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## The only pages that clear GOOD (strict)")
    goods = [r for r in rows if r["grade"] == "GOOD"]
    if not goods:
        lines.append("_None in this pass._")
    else:
        for r in sorted(goods, key=lambda x: -(x["score"] or 0)):
            lines.append(f"- `{r['url']}` — {r['score']}/21 — {r['verdict'] or 'passes all gates'}")
    lines.append("")
    lines.append("## Closest to Good (Borderline with score ≥16 — one gate away)")
    close = [r for r in rows if r["grade"] == "BORDERLINE" and (r["score"] or 0) >= 16]
    if not close:
        lines.append("_None listed with score ≥16 in parsed headers._")
    else:
        for r in sorted(close, key=lambda x: -(x["score"] or 0)):
            lines.append(f"- `{r['url']}` — {r['score']}/21 — {r['verdict'] or 'gated'}")

    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Cross-cutting failures (site-wide)")
    lines.append("")
    lines.append("1. **Draft / process language on public pages** — `[needs confirmation]`, Gate L, owner pending, safety \"awaiting sign-off\".")
    lines.append("2. **Price authenticity gap** — UI says team-checked OGRA; `prices.json` still cites Dawn/Nation/ARY + PDF recheck.")
    lines.append("3. **Fake-feeling delivery proof** — four cities share identical 60-minute \"test order\" while data says target.")
    lines.append("4. **AI creatives presented as real** — office, licence, inspection cert, leadership, delivery scenes.")
    lines.append("5. **Promise mismatch** — `*-price*` URLs without prices; companies page without companies; projects with zero projects; Skardu/Murree/Muzaffarabad H1s promise supply while body says no supplier listed.")
    lines.append("6. **Template shells** — dynamic city/province hubs, industries, services `stdProcess()`, appliance pages.")
    lines.append("7. **Network count inconsistency** — 347 vs summed table rows (~329) depending on page.")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## What to do next (ordered)")
    lines.append("")
    lines.append("1. **Honesty sweep (no new facts):** strip draft markers, Gate L, pending-owner lines, fix 60-min wording to \"target\", caption AI as illustrative or remove from trust pages, reconcile partner-count wording.")
    lines.append("2. **Attach OGRA PDF/screenshot** and stop claiming primary verification until done.")
    lines.append("3. **Owner numbers:** deposit/exchange, empty weights, delivery fee rule, 3–5 appliance SKUs with prices, one consented project, real photos.")
    lines.append("4. **Rewrite money flagship** as one job; merge or heavily differentiate per-kg / OGRA / city-price duplicates.")
    lines.append("5. **City hubs:** write ≥5 real local facts or keep noindex; fix province hubs with empty city arrays.")
    lines.append("6. **Retitle or fill** stove/geyser/kit price URLs; empty shop/projects stay noindex.")
    lines.append("")
    lines.append("For quotes and per-page evidence, open the three `audit/strict_*.md` files — this V2 file is the index and the harsh scoreboard.")
    lines.append("")

    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("wrote", OUT)


if __name__ == "__main__":
    main()
