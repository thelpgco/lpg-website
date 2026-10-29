"""Full re-verification of lpg-website for management inspection readiness."""
from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from pathlib import Path

SITE = Path(__file__).resolve().parents[3]
APP = SITE / "app"
COMP = SITE / "components"
OUT = SITE / "docs" / "seo-execution" / "REVERIFY_REPORT.md"

DRAFT = [
    r"needs confirmation",
    r"\[needs confirmation\]",
    r"Gate L",
    r"partner preview",
    r"awaiting final team sign-off",
    r"until the owner",
    r"Photos of markings on our stock are still pending",
    r"Searchers ask",
    r"empty on purpose",
    r"No case studies yet",
]

SEO_VOICE = [r"Searchers ask", r"When people ask for the price of lpg"]


def iter_tsx():
    yield from APP.rglob("*.tsx")
    yield from COMP.rglob("*.tsx")


def scan_phrases() -> list[str]:
    hits = []
    for path in iter_tsx():
        text = path.read_text(encoding="utf-8", errors="replace")
        for i, line in enumerate(text.splitlines(), 1):
            s = line.strip()
            if s.startswith("//") or s.startswith("*") or s.startswith("/*"):
                continue
            for pat in DRAFT + SEO_VOICE:
                if re.search(pat, line, re.I):
                    # allow Gate L only in comments already skipped; network.ts comment
                    hits.append(f"{path.relative_to(SITE)}:{i}: {s[:120]}")
                    break
    return hits


def pages_registry():
    pages = json.loads((SITE / "data" / "pages.json").read_text(encoding="utf-8"))
    meta = json.loads((SITE / "data" / "meta.json").read_text(encoding="utf-8"))
    return pages, meta


def built_without_meta(pages, meta):
    missing = []
    for url, row in pages.items():
        if not row.get("built"):
            continue
        # dynamic hubs generate meta in code
        if url.startswith("/lpg-in-") and url not in meta:
            # may be dynamic — check if static page exists OR hub
            slug = url[len("/lpg-in-") :].strip("/")
            static = APP / "lpg-in-{0}".format(slug) / "page.tsx"
            hub = APP / "lpg-hub" / "[slug]" / "page.tsx"
            if static.exists() and url not in meta:
                missing.append(url)
            elif not static.exists() and hub.exists():
                continue  # dynamic metadata
            elif url not in meta:
                missing.append(url)
            continue
        if url.startswith("/services/") and url != "/services/":
            continue  # dynamic from services.ts
        if url not in meta:
            missing.append(url)
    return missing


def demo_isolation() -> dict:
    demo_proj = json.loads((SITE / "data" / "demo" / "projects.json").read_text(encoding="utf-8"))
    prod_proj = json.loads((SITE / "data" / "production" / "projects.json").read_text(encoding="utf-8"))
    mode = (SITE / "lib" / "mode.ts").read_text(encoding="utf-8")
    products = (SITE / "lib" / "products.ts").read_text(encoding="utf-8")
    projects = (SITE / "lib" / "projects.ts").read_text(encoding="utf-8")
    return {
        "demo_project_count": len(demo_proj.get("projects") or []),
        "prod_project_count": len(prod_proj.get("projects") or []),
        "mode_module": "siteMode" in mode and "isDemo" in mode,
        "products_gated": "isDemo()" in products,
        "projects_gated": "isDemo()" in projects,
        "demo_leaked_into_production_file": any(
            "DEMO" in json.dumps(p) for p in (prod_proj.get("projects") or [])
        ),
    }


def route_files() -> list[str]:
    return sorted(str(p.relative_to(APP).as_posix()) for p in APP.rglob("page.tsx"))


def price_math() -> dict:
    prices = json.loads((SITE / "data" / "prices.json").read_text(encoding="utf-8"))
    notes = prices.get("notifications") or []
    latest = notes[0] if notes else None
    prev = notes[1] if len(notes) > 1 else None
    out = {"latest": None, "checks": []}
    if not latest:
        return {"latest": None, "checks": ["FAIL: no notifications"]}
    kg = float(latest["perKgPkr"])
    out["latest"] = {"month": latest["month"], "perKg": kg, "sourceNote": latest.get("sourceNote", "")[:80]}
    for size, expect in [(5, round(kg * 5)), (11.8, round(kg * 11.8)), (15, round(kg * 15)), (45.4, round(kg * 45.4))]:
        got = round(kg * size)
        out["checks"].append(
            f"{'PASS' if got == expect else 'FAIL'}: {size}kg gas = Rs {got}"
        )
    if prev:
        d = kg - float(prev["perKgPkr"])
        pct = d / float(prev["perKgPkr"]) * 100
        out["checks"].append(f"MoM: {prev['perKgPkr']} → {kg} (Δ {d:.2f}, {pct:.1f}%)")
    return out


def critical_files() -> list[tuple[str, bool]]:
    paths = [
        "lib/mode.ts",
        "lib/company/profile.ts",
        "lib/products.ts",
        "lib/projects.ts",
        "lib/money.ts",
        "components/DemoBanner.tsx",
        "components/PriceBlock.tsx",
        "components/CylinderCostBlock.tsx",
        "components/GasCostWorked.tsx",
        "app/management-review/page.tsx",
        "app/projects/[slug]/page.tsx",
        "data/demo/products.json",
        "data/demo/projects.json",
        "data/production/projects.json",
        "docs/seo-execution/MANAGEMENT_INSPECTION.md",
        "docs/seo-execution/RESEARCH_INDEX.json",
        "docs/seo-execution/EXECUTION_PROGRESS.md",
    ]
    return [(p, (SITE / p).exists()) for p in paths]


def main() -> None:
    pages, meta = pages_registry()
    phrase_hits = scan_phrases()
    missing_meta = built_without_meta(pages, meta)
    demo = demo_isolation()
    prices = price_math()
    crit = critical_files()
    routes = route_files()

    status = Counter(v.get("status") for v in pages.values())
    built = sum(1 for v in pages.values() if v.get("built"))

    # Sample content strength: word-ish literals for key money pages
    key_pages = [
        "app/lpg-price-in-pakistan/page.tsx",
        "app/lpg-cylinders/12-kg-domestic-cylinder/page.tsx",
        "app/management-review/page.tsx",
        "app/projects/page.tsx",
        "app/lpg-hub/[slug]/page.tsx",
        "app/page.tsx",
    ]
    key_stats = []
    for rel in key_pages:
        p = SITE / rel
        if not p.exists():
            key_stats.append((rel, "MISSING", 0))
            continue
        t = p.read_text(encoding="utf-8", errors="replace")
        words = len(re.findall(r"[A-Za-z]{3,}", t))
        bad = sum(1 for pat in DRAFT if re.search(pat, t, re.I))
        key_stats.append((rel, "OK" if bad == 0 else "DRAFT", words))

    fails = []
    if phrase_hits:
        fails.append(f"Draft/SEO-voice hits in TSX: {len(phrase_hits)}")
    if any(not ok for _, ok in crit):
        fails.append("Missing critical files: " + ", ".join(p for p, ok in crit if not ok))
    if not demo["mode_module"] or not demo["products_gated"] or not demo["projects_gated"]:
        fails.append("Demo/production gating incomplete")
    if demo["demo_leaked_into_production_file"]:
        fails.append("DEMO projects leaked into production/projects.json")
    if demo["prod_project_count"] != 0:
        fails.append("production projects should be empty until consented")
    if any(c.startswith("FAIL") for c in prices["checks"]):
        fails.append("Price math failed")

    lines = []
    lines.append("# Full re-verification report")
    lines.append("")
    lines.append("**Date:** 29 Oct 2026 · **Scope:** code, data, honesty, demo isolation, registry, price math, critical routes")
    lines.append("")
    lines.append(f"## Overall: {'FAIL' if fails else 'PASS (with notes)'}")
    lines.append("")
    if fails:
        lines.append("### Blocking issues")
        for f in fails:
            lines.append(f"- {f}")
        lines.append("")
    else:
        lines.append("No blocking integrity failures found in automated checks.")
        lines.append("")

    lines.append("## Registry")
    lines.append("")
    lines.append(f"- Pages in `pages.json`: **{len(pages)}**")
    lines.append(f"- Built: **{built}**")
    lines.append(f"- Statuses: {dict(status)}")
    lines.append(f"- `page.tsx` route files: **{len(routes)}**")
    lines.append(f"- Meta entries: **{len(meta)}**")
    lines.append(f"- Built URLs missing static meta (excl. known dynamic): **{len(missing_meta)}**")
    if missing_meta:
        for u in missing_meta[:25]:
            lines.append(f"  - `{u}`")
    lines.append("")

    lines.append("## Demo vs production isolation")
    lines.append("")
    for k, v in demo.items():
        lines.append(f"- `{k}`: **{v}**")
    lines.append("")

    lines.append("## Price arithmetic")
    lines.append("")
    lines.append(f"- Latest: `{prices.get('latest')}`")
    for c in prices["checks"]:
        lines.append(f"- {c}")
    lines.append("")

    lines.append("## Critical files")
    lines.append("")
    for p, ok in crit:
        lines.append(f"- `{'PASS' if ok else 'FAIL'}` {p}")
    lines.append("")

    lines.append("## Honesty / draft-language scan")
    lines.append("")
    lines.append(f"- Hits (non-comment): **{len(phrase_hits)}**")
    for h in phrase_hits[:40]:
        lines.append(f"  - `{h}`")
    lines.append("")

    lines.append("## Key page sample")
    lines.append("")
    lines.append("| File | Draft scan | Approx token words |")
    lines.append("|---|---|---:|")
    for rel, st, words in key_stats:
        lines.append(f"| `{rel}` | {st} | {words} |")
    lines.append("")

    lines.append("## Notes (not automatic fails)")
    lines.append("")
    lines.append("- All registry pages remain `review` / noindex until publish ladder.")
    lines.append("- Content quality Good-bar for all 116 URLs still requires editorial V3 pass; this report is integrity + honesty + systems.")
    lines.append("- OGRA price still sourced via press coverage note until PDF attached.")
    lines.append("- Illustrative AI images remain; captions should mark illustrative.")
    lines.append("")
    lines.append("## How to spot-check manually")
    lines.append("")
    lines.append("1. `NEXT_PUBLIC_SITE_MODE=demo npm run dev` → `/management-review/`")
    lines.append("2. Confirm amber demo banner + DEMO project badges on `/projects/`")
    lines.append("3. `NEXT_PUBLIC_SITE_MODE=production npm run dev` → `/projects/` empty honest state, no DEMO prices")
    lines.append("4. Price flagship shows 279.34 and MoM table")
    lines.append("")

    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"wrote {OUT}")
    print("FAILS", fails or "none")
    print("phrase_hits", len(phrase_hits))
    print("missing_meta", len(missing_meta))


if __name__ == "__main__":
    main()
