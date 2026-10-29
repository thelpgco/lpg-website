"""Build CONTENT_SCOPE_STATUS.md: done vs not-done for every V2 URL after Oct 29 work."""
from __future__ import annotations

import re
from collections import Counter, defaultdict
from pathlib import Path

SITE = Path(__file__).resolve().parents[3]
V2 = SITE / "docs" / "seo-plan" / "CONTENT_QUALITY_AUDIT_V2.md"
SAMPLE = SITE / "docs" / "seo-execution" / "REVERIFY_CONTENT_SAMPLE.md"
OUT = SITE / "docs" / "seo-execution" / "CONTENT_SCOPE_STATUS.md"

# Paths rewritten / polished in Oct 29 execution (systems + honesty + copy)
DONE_REWRITE = {
    "/",
    "/lpg-price-in-pakistan/",
    "/lpg-price-per-kg-in-pakistan/",
    "/lpg-cylinder-price-in-pakistan/",
    "/ogra-lpg-notified-price/",
    "/lpg-price-in-pakistan/history/",
    "/lpg-cylinders/",
    "/lpg-cylinder-sizes-in-pakistan/",
    "/delivery-areas/",
    "/lpg-home-delivery/",
    "/order-lpg/",
    "/lpg-cylinders/12-kg-domestic-cylinder/",
    "/lpg-cylinders/45-kg-commercial-cylinder/",
    "/lpg-cylinders/5-kg-cylinder/",
    "/lpg-cylinders/composite-fiber-cylinder/",
    "/lpg-cylinder-refill/",
    "/new-lpg-connection/",
    "/projects/",
    "/shop/",
    "/lpg-stove-price-in-pakistan/",
    "/lpg-geyser-price-in-pakistan/",
    "/lpg-heaters-in-pakistan/",
    "/commercial-lpg-supply/",
    "/bulk-lpg-supply/",
    "/industrial-lpg-supply/",
    "/lpg-companies-in-pakistan/",
    "/ogra-lpg-regulations-pakistan/",
    "/lpg-near-me/",
    "/lpg-kit-price-in-pakistan/",
    "/lpg-shortage-pakistan/",
    "/propane-vs-butane/",
    "/what-to-do-if-you-smell-gas/",
    "/lpg-safety/",
    "/lpg-leak-detector/",
    "/lpg-regulator-problems-and-repair/",
    "/lpg-cylinder-blast-causes-and-prevention/",
    "/about/",
    "/contact/",
    "/licences-and-compliance/",
    "/partner-standards/",
    "/gallery/",
    "/shop-preview/",
}

# Template-level fixes apply to all URLs using these templates
TEMPLATE_FIXED = {
    "dynamic_hub": "Honesty fixed (no fake test-order claim; softer partner wording)",
    "static_city": "Promise fixed when no supplier listed (guidance H1)",
    "province": "Empty provinces got guidance + links",
    "services": "Unique process steps; testing meta fixed",
    "industries": "Case-studies Note softened",
    "appliances": "Demo prices gated; production H1 price-on-request",
}

DYNAMIC_CITIES = [
    "/lpg-in-islamabad/",
    "/lpg-in-rawalpindi/",
    "/lpg-in-lahore/",
    "/lpg-in-karachi/",
    "/lpg-in-peshawar/",
    "/lpg-in-hyderabad/",
    "/lpg-in-faisalabad/",
    "/lpg-in-quetta/",
    "/lpg-in-burewala/",
]
PROVINCES = [
    "/lpg-in-punjab/",
    "/lpg-in-sindh/",
    "/lpg-in-balochistan/",
    "/lpg-in-khyber-pakhtunkhwa/",
    "/lpg-in-azad-kashmir/",
    "/lpg-in-gilgit-baltistan/",
]
STATIC_CITIES = [
    "/lpg-in-multan/",
    "/lpg-in-gujranwala/",
    "/lpg-in-gilgit/",
    "/lpg-in-abbottabad/",
    "/lpg-in-skardu/",
    "/lpg-in-murree/",
    "/lpg-in-muzaffarabad/",
]

# Current editorial status after Oct 29 (from reverify sample where known)
SAMPLE_NOW = {
    "/": ("BORDERLINE", 13, "Honesty cleaned; still needs proof assets + consistent identity"),
    "/lpg-price-in-pakistan/": ("BORDERLINE", 17, "Big rewrite; MoM table live; G gate — doorstep totals still quoted-only"),
    "/lpg-price-per-kg-in-pakistan/": ("BORDERLINE", 11, "Better number-first; still near-duplicate of flagship"),
    "/lpg-cylinder-price-in-pakistan/": ("BORDERLINE", 12, "Placeholders gone; deposit/delivery columns still quote-only"),
    "/lpg-cylinders/12-kg-domestic-cylinder/": ("BORDERLINE", 13, "No [needs confirmation]; still no real tare/deposit"),
    "/lpg-cylinder-refill/": ("BORDERLINE", 14, "Clean process tables; no refill fee beyond gas"),
    "/new-lpg-connection/": ("BORDERLINE", 16, "Honesty fixed; deposit amounts still not published"),
    "/delivery-areas/": ("BORDERLINE", None, "Hub table shipped; partner-count reconcile still open"),
    "/lpg-home-delivery/": ("BORDERLINE", None, "Gate L copy removed"),
    "/order-lpg/": ("BORDERLINE", None, "Polished"),
    "/projects/": ("WEAK", 9, "Honest empty in production; DEMO cases only in demo mode — cannot be Good without real projects"),
    "/management-review/": ("WEAK", None, "Internal tool — not a customer content page"),
    "/commercial-lpg-supply/": ("BORDERLINE", None, "Worked 45.4 kg gas cost added"),
    "/what-to-do-if-you-smell-gas/": ("BORDERLINE", 18, "Close to Good; 1122 in steps"),
    "/lpg-companies-in-pakistan/": ("BORDERLINE", None, "OGRA verify steps added; still no company list"),
    "/lpg-near-me/": ("BORDERLINE", None, "Reframed as matching, not fake map"),
    "/lpg-stove-price-in-pakistan/": ("BORDERLINE", None, "Production H1 price-on-request; DEMO prices in demo only"),
    "/shop/": ("WEAK", 10, "Still catalogue without production SKUs"),
    "/tools/lpg-cylinder-duration-calculator/": ("GOOD", 19, "Still the only clear Good"),
}


def parse_v2():
    text = V2.read_text(encoding="utf-8")
    rows = []
    for m in re.finditer(
        r"^\| (GOOD|BORDERLINE|WEAK|NOT_SCORED) \| ([^|]+) \| `([^`]+)` \| ([^|]*) \| ([^|]*) \| ([^|]*) \|",
        text,
        re.M,
    ):
        score_raw = m.group(2).strip()
        try:
            score = int(re.search(r"\d+", score_raw).group()) if re.search(r"\d+", score_raw) else None
        except Exception:
            score = None
        rows.append(
            {
                "v2_grade": m.group(1),
                "v2_score": score,
                "url": m.group(3).strip(),
                "dims": m.group(4).strip(),
                "cluster": m.group(5).strip(),
                "verdict": m.group(6).strip()[:160],
            }
        )
    return rows


def work_status(url: str) -> tuple[str, str]:
    """Return (work_bucket, note)."""
    if url in SAMPLE_NOW:
        g, sc, note = SAMPLE_NOW[url]
        return ("REVERIFIED", f"Now ~{g}" + (f" {sc}" if sc else "") + f" — {note}")
    if url in DONE_REWRITE:
        return ("REWRITTEN_OR_POLISHED", "Oct 29 rewrite/polish applied; not re-scored line-by-line yet")
    if url in DYNAMIC_CITIES:
        return ("TEMPLATE_FIXED", TEMPLATE_FIXED["dynamic_hub"] + "; local substance still thin")
    if url in PROVINCES:
        return ("TEMPLATE_FIXED", TEMPLATE_FIXED["province"] + "; still thin province content")
    if url in STATIC_CITIES:
        return ("TEMPLATE_FIXED", TEMPLATE_FIXED["static_city"] + "; still needs ≥5 real local facts / Gate L")
    if url.startswith("/services/"):
        return ("TEMPLATE_FIXED", TEMPLATE_FIXED["services"] + "; still no real projects/standards numbers")
    if url.startswith("/industries/"):
        return ("TEMPLATE_FIXED", TEMPLATE_FIXED["industries"] + "; still no sector load estimates")
    if url in {
        "/lpg-vaporizers/",
        "/shop/commercial-lpg-burners/",
        "/shop/lpg-hoses-and-accessories/",
        "/lpg-geyser-price-in-pakistan/",
        "/lpg-heaters-in-pakistan/",
    }:
        return ("TEMPLATE_FIXED", TEMPLATE_FIXED["appliances"])
    if url.startswith("/tools/"):
        return ("BUILT_USABLE", "Working tool; may need worked examples / OGRA PDF for H gate")
    if url in {"/privacy/", "/terms/"}:
        return ("LEGAL_NOT_SCORED", "Legal utility pages — not scored for SEO content")
    return ("BUILT_NOT_DEEPENED", "Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade")


def content_done_label(url: str, v2_grade: str, work: str) -> str:
    """Human label for 'is content done?'"""
    if url in SAMPLE_NOW and SAMPLE_NOW[url][0] == "GOOD":
        return "DONE (Good)"
    if work == "REVERIFIED" and SAMPLE_NOW.get(url, ("",))[0] == "BORDERLINE":
        return "PARTLY DONE (honesty/structure fixed; not Good yet)"
    if work in {"REWRITTEN_OR_POLISHED", "TEMPLATE_FIXED"}:
        return "PARTLY DONE (fixed since V2; not re-audited to Good)"
    if work == "BUILT_USABLE" and v2_grade in {"GOOD", "BORDERLINE"}:
        return "PARTLY DONE (usable; polish optional)"
    if work == "LEGAL_NOT_SCORED":
        return "N/A (legal)"
    if v2_grade == "WEAK":
        return "NOT DONE (still Weak / thin / missing facts)"
    return "NOT DONE (still Borderline — needs info-gain)"


def main() -> None:
    rows = parse_v2()
    # Add management-review if missing
    urls = {r["url"] for r in rows}
    if "/management-review/" not in urls:
        rows.append(
            {
                "v2_grade": "N/A",
                "v2_score": None,
                "url": "/management-review/",
                "dims": "—",
                "cluster": "Trust / other",
                "verdict": "Added after V2",
            }
        )

    enriched = []
    for r in rows:
        work, note = work_status(r["url"])
        done = content_done_label(r["url"], r["v2_grade"], work)
        enriched.append({**r, "work": work, "work_note": note, "done": done})

    done_c = Counter(e["done"] for e in enriched)
    work_c = Counter(e["work"] for e in enriched)
    by_cluster = defaultdict(list)
    for e in enriched:
        by_cluster[e["cluster"]].append(e)

    lines = []
    lines.append("# Content scope status — what is done vs not done (all pages)")
    lines.append("")
    lines.append("**Date:** 29 Oct 2026")
    lines.append("**Baseline:** Strict V2 audit — 1 Good · 59 Borderline · 56 Weak (116 graded)")
    lines.append("**After:** Oct 29 execution (honesty sweep, money/cylinder rewrites, demo mode, polish passes)")
    lines.append("")
    lines.append("Sources: [`CONTENT_QUALITY_AUDIT_V2.md`](../seo-plan/CONTENT_QUALITY_AUDIT_V2.md), [`REVERIFY_CONTENT_SAMPLE.md`](REVERIFY_CONTENT_SAMPLE.md), [`REVERIFY_REPORT.md`](REVERIFY_REPORT.md), [`EXECUTION_PROGRESS.md`](EXECUTION_PROGRESS.md).")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## How to read “done”")
    lines.append("")
    lines.append("| Layer | Meaning | Site status |")
    lines.append("|---|---|---|")
    lines.append("| **Built** | `page.tsx` exists, registry `built=true` | **119/119 map pages built** (all still `review` / noindex) |")
    lines.append("| **Systems done** | Company profile, demo/prod mode, products, projects layouts, calculators, leads, management dashboard | **Done** |")
    lines.append("| **Honesty done** | No `[needs confirmation]`, Gate L, awaiting sign-off, fake test-order claim, partner-preview draft | **Done** (automated scan 0 hits) |")
    lines.append("| **Content Good** | Strict rubric: ≥17 + A/G/H≥3 + promise kept + real info-gain | **Almost not done** — still **1 Good** in deep sample |")
    lines.append("")
    lines.append("So: **the website is built and cleaned for inspection**, but **most pages are not “content-complete / rank-#1 Good”** until owner facts fill info-gain gaps.")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Headline counts (scope labels)")
    lines.append("")
    lines.append("| Scope label | Count |")
    lines.append("|---|---:|")
    for k, n in done_c.most_common():
        lines.append(f"| {k} | {n} |")
    lines.append(f"| **URLs in this report** | **{len(enriched)}** |")
    lines.append("")
    lines.append("### Work applied since V2")
    lines.append("")
    lines.append("| Work bucket | Count |")
    lines.append("|---|---:|")
    for k, n in work_c.most_common():
        lines.append(f"| {k} | {n} |")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## What IS done (site-wide)")
    lines.append("")
    lines.append("1. All mapped English pages exist (Urdu removed earlier).")
    lines.append("2. Demo vs production data modes (`NEXT_PUBLIC_SITE_MODE`).")
    lines.append("3. Central company profile + product/project helpers.")
    lines.append("4. Honesty sweep across public TSX.")
    lines.append("5. Money flagship rewrite with live MoM table (Rs 258.65 → 279.34, +8%).")
    lines.append("6. Cylinder SKUs / refill / connection without placeholders (demo deposits only in demo mode).")
    lines.append("7. Projects portfolio UI + 3 DEMO case studies (demo only).")
    lines.append("8. Management dashboard `/management-review/`.")
    lines.append("9. Safety pages signed in `safety-review.json`; 1122 on key safety flows.")
    lines.append("10. City hubs: no identical “our test order took 60 minutes” claim.")
    lines.append("11. Illustrative captioning for AI/sample images.")
    lines.append("12. `tsc` + production/demo `next build` pass.")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## What is NOT done (blocks “Good” / publish)")
    lines.append("")
    lines.append("### Owner / evidence pack (blocks info-gain on ~40+ pages)")
    lines.append("")
    lines.append("| Missing fact | Unlocks |")
    lines.append("|---|---|")
    lines.append("| OGRA monthly PDF / primary notification file | Honest “verified” wording; PriceBlock H gate |")
    lines.append("| Real deposit / exchange / new-empty amounts by size | Cylinder price, SKUs, refill, new connection |")
    lines.append("| Empty weights / dimensions per size | Sizes + SKU pages |")
    lines.append("| Delivery fee rule | Delivery, city hubs, cylinder totals |")
    lines.append("| Real camera photos (office, markings, delivery) | Trust + media honesty |")
    lines.append("| Consented real projects | `/projects/`, services, industries |")
    lines.append("| Appliance SKU price list | Stove/geyser/heater/shop production pages |")
    lines.append("| Reconciled network counts (347 vs 452 vs sum) | Home, network, city hubs |")
    lines.append("| Licence issue date vs “since 1999” | About / home claims |")
    lines.append("")
    lines.append("### Editorial / SEO still open")
    lines.append("")
    lines.append("- Full V3 strict re-score of all 116 URLs (only 20 deep-rescore so far).")
    lines.append("- Merge or differentiate price siblings (per-kg / OGRA / city-price).")
    lines.append("- Thin dynamic city hubs (Peshawar, Faisalabad, …) still need ≥5 local facts or stay noindex.")
    lines.append("- Province hubs still thin.")
    lines.append("- Industries still template-heavy (no load estimates).")
    lines.append("- Services still lack standards numbers / project proof.")
    lines.append("- No page moved to `published` / indexable yet.")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Deep-rescore sample (20 URLs) — current vs V2")
    lines.append("")
    lines.append("| URL | V2 | Now | Scope |")
    lines.append("|---|---|---|---|")
    for url, (g, sc, note) in sorted(SAMPLE_NOW.items()):
        v2g = next((r["v2_grade"] for r in rows if r["url"] == url), "—")
        lines.append(f"| `{url}` | {v2g} | **{g}**" + (f" ({sc})" if sc else "") + f" | {note} |")
    lines.append("")
    lines.append("Sample shift: **Weak 15 → 4**, **Borderline 3 → 15**, **Good still 1**.")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Master table — every V2 URL")
    lines.append("")
    lines.append("| URL | V2 grade | V2 score | Cluster | Work since V2 | Content scope now | Note |")
    lines.append("|---|---|---:|---|---|---|---|")
    order = {
        "DONE (Good)": 0,
        "PARTLY DONE (honesty/structure fixed; not Good yet)": 1,
        "PARTLY DONE (fixed since V2; not re-audited to Good)": 2,
        "PARTLY DONE (usable; polish optional)": 3,
        "NOT DONE (still Borderline — needs info-gain)": 4,
        "NOT DONE (still Weak / thin / missing facts)": 5,
        "N/A (legal)": 6,
    }
    for e in sorted(enriched, key=lambda x: (order.get(x["done"], 9), x["cluster"], x["url"])):
        sc = e["v2_score"] if e["v2_score"] is not None else "—"
        lines.append(
            f"| `{e['url']}` | {e['v2_grade']} | {sc} | {e['cluster']} | {e['work']} | {e['done']} | {e['work_note'][:120]} |"
        )

    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## By cluster — done vs not")
    lines.append("")
    for cname in sorted(by_cluster):
        items = by_cluster[cname]
        cc = Counter(i["done"] for i in items)
        lines.append(f"### {cname} ({len(items)})")
        lines.append("")
        for k, n in cc.most_common():
            lines.append(f"- {k}: **{n}**")
        lines.append("")

    lines.append("---")
    lines.append("")
    lines.append("## Bottom line")
    lines.append("")
    lines.append("| Question | Answer |")
    lines.append("|---|---|")
    lines.append("| Are all pages built? | **Yes** (119 registry / map pages) |")
    lines.append("| Is the site inspection-ready (demo)? | **Yes** — use `NEXT_PUBLIC_SITE_MODE=demo` + `/management-review/` |")
    lines.append("| Is honesty cleaned vs V2 Weak causes? | **Largely yes** |")
    lines.append("| Is content “Good / publish-ready” for all pages? | **No** — still ~1 Good; most PARTLY DONE or NOT DONE on info-gain |")
    lines.append("| What unblocks Good? | Owner fact pack (table above) + V3 rewrite pass on remaining thin hubs |")
    lines.append("")

    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"wrote {OUT} urls={len(enriched)}")
    print(dict(done_c))


if __name__ == "__main__":
    main()
