"""Build a searchable JSON index of ALL_LPG_KEYWORDS_CONTENT_COMPETITORS.md MANIFEST."""
from __future__ import annotations

import json
import re
from pathlib import Path

SITE = Path(__file__).resolve().parents[3]
SRC = SITE / "keywords and research" / "ALL_LPG_KEYWORDS_CONTENT_COMPETITORS.md"
OUT = SITE / "docs" / "seo-execution" / "RESEARCH_INDEX.json"

ROW = re.compile(
    r"^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|\s*([^|]*)\|?\s*$",
    re.M,
)


def main() -> None:
    text = SRC.read_text(encoding="utf-8", errors="replace")
    # Only parse MANIFEST table (before first embedded source)
    cut = text.find("\n## 1.")
    if cut < 0:
        cut = text.find("\n# 1.")
    manifest_blob = text[: cut if cut > 0 else 200000]
    rows = []
    for m in ROW.finditer(manifest_blob):
        rows.append(
            {
                "id": int(m.group(1)),
                "section": m.group(2).strip(),
                "label": m.group(3).strip(),
                "chars": int(m.group(4)),
                "sha256_prefix": m.group(5).strip(),
                "note": m.group(6).strip(),
            }
        )
    # Also index BEGIN markers for offset lookup (sample first 200)
    begins = []
    for m in re.finditer(r"^===== BEGIN SOURCE #(\d+):\s*(.+?)\s*=====", text, re.M):
        begins.append({"id": int(m.group(1)), "title": m.group(2).strip(), "offset": m.start()})
        if len(begins) >= 1200:
            break

    payload = {
        "source_file": str(SRC.as_posix()),
        "total_chars_claimed": 11464845,
        "manifest_rows": len(rows),
        "begin_markers_indexed": len(begins),
        "sections": sorted({r["section"] for r in rows}),
        "by_id": {str(r["id"]): r for r in rows},
        "by_label": {r["label"]: r["id"] for r in rows},
        "begins": begins,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"wrote {OUT} manifest={len(rows)} begins={len(begins)}")


if __name__ == "__main__":
    main()
