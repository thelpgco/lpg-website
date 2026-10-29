"""Export every page-map URL with full link + primary/secondary keywords."""
from __future__ import annotations

import csv
import json
import re
from pathlib import Path

SITE = Path(__file__).resolve().parents[3]
MAP = SITE / "docs" / "seo-plan" / "page-map.csv"
PAGES = SITE / "data" / "pages.json"
OUT_MD = SITE / "docs" / "seo-execution" / "ALL_URLS_AND_KEYWORDS.md"
OUT_CSV = SITE / "docs" / "seo-execution" / "ALL_URLS_AND_KEYWORDS.csv"


def detect_site() -> str:
    text = (SITE / "lib" / "site.ts").read_text(encoding="utf-8")
    m = re.search(r'domain:\s*"([^"]+)"', text)
    domain = m.group(1) if m else "thelpgco.pk"
    return f"https://{domain.rstrip('/')}"


def norm(url: str) -> str:
    url = (url or "").strip()
    if not url:
        return ""
    if url != "/" and not url.endswith("/"):
        url += "/"
    return url


def full_url(site: str, path: str) -> str:
    if path == "/":
        return site.rstrip("/") + "/"
    return site.rstrip("/") + path


def main() -> None:
    site = detect_site()
    rows = list(csv.DictReader(MAP.open(encoding="utf-8")))
    pages = json.loads(PAGES.read_text(encoding="utf-8")) if PAGES.exists() else {}
    map_paths = {norm(r.get("url", "")) for r in rows}

    lines: list[str] = [
        "# All page URLs and target keywords",
        "",
        f"**Site:** {site}",
        f"**Source:** `docs/seo-plan/page-map.csv`",
        f"**Pages listed:** {len(rows)}",
        "",
        "These are the keywords each page is **built to target** (SEO map intent).",
        "Ranking is not guaranteed - pages are still `review` / noindex until published.",
        "",
        "| # | Full URL | Path | Primary keyword | Vol/mo | Top secondary keywords | Pillar | Page ID | Phase |",
        "|--:|---|---|---|--:|---|---|---|---|",
    ]

    csv_rows: list[dict] = []
    for i, r in enumerate(rows, 1):
        path = norm(r.get("url", ""))
        full = full_url(site, path)
        pk = (r.get("primary_keyword") or "").strip()
        try:
            vol = int(float(r.get("primary_volume") or 0))
        except ValueError:
            vol = 0
        sec = (r.get("top_secondary") or "").strip().replace("|", "/")
        pillar = r.get("pillar") or ""
        pid = r.get("page_id") or ""
        phase = r.get("phase") or ""
        vol_cell = str(vol) if vol else "-"
        pk_cell = pk or "(no primary mapped)"
        sec_cell = sec or "-"
        lines.append(
            f"| {i} | {full} | `{path}` | {pk_cell} | {vol_cell} | {sec_cell} | {pillar} | {pid} | {phase} |"
        )
        csv_rows.append(
            {
                "full_url": full,
                "path": path,
                "page_id": pid,
                "primary_keyword": pk,
                "primary_volume": vol,
                "top_secondary_keywords": sec,
                "pillar": pillar,
                "phase": phase,
                "type": r.get("type") or "",
                "v4_change": r.get("v4_change") or "",
                "gate_notes": (r.get("gate_notes") or "")[:240],
            }
        )

    orphans = sorted(
        norm(p)
        for p in pages.keys()
        if norm(p) and norm(p) not in map_paths and norm(p).rstrip("/") not in {x.rstrip("/") for x in map_paths}
    )
    if orphans:
        lines.extend(
            [
                "",
                "## Extra built paths not in page-map",
                "",
                "These exist in `data/pages.json` but have no map keyword row:",
                "",
            ]
        )
        for p in orphans:
            lines.append(f"- {full_url(site, p)} (`{p}`)")

    OUT_MD.parent.mkdir(parents=True, exist_ok=True)
    OUT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")
    with OUT_CSV.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(csv_rows[0].keys()))
        w.writeheader()
        w.writerows(csv_rows)

    print(f"wrote {OUT_MD}")
    print(f"wrote {OUT_CSV}")
    print(f"rows={len(rows)} orphans={len(orphans)} site={site}")


if __name__ == "__main__":
    main()
