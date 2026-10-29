"""Merge docs/seo-plan/wave-meta/*-meta.json into data/meta.json
and *-galleries.json into lib/media.ts galleries map.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

SITE = Path(__file__).resolve().parents[3]
WAVE = SITE / "docs" / "seo-plan" / "wave-meta"
META = SITE / "data" / "meta.json"
MEDIA = SITE / "lib" / "media.ts"


def main() -> None:
    meta = json.loads(META.read_text(encoding="utf-8"))
    upserts = 0
    for frag in sorted(WAVE.glob("*-meta.json")):
        data = json.loads(frag.read_text(encoding="utf-8"))
        for k, v in data.items():
            if not isinstance(v, dict) or "title" not in v or "description" not in v:
                raise SystemExit(f"bad meta entry {frag.name} {k}")
            meta[k] = v
            upserts += 1
        print(f"meta from {frag.name}: {len(data)}")
    META.write_text(json.dumps(meta, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"meta.json keys={len(meta)} upserts={upserts}")

    galleries: dict[str, list[str]] = {}
    for frag in sorted(WAVE.glob("*-galleries.json")):
        data = json.loads(frag.read_text(encoding="utf-8"))
        galleries.update(data)
        print(f"galleries from {frag.name}: {len(data)}")

    text = MEDIA.read_text(encoding="utf-8")
    # Validate ids exist as object keys in media catalog
    media_keys = set(re.findall(r"^  ([a-zA-Z][a-zA-Z0-9]*): \{\n    id:", text, re.M))
    if not media_keys:
        media_keys = set(re.findall(r"^  ([a-zA-Z][a-zA-Z0-9]*): \{", text, re.M))
        media_keys -= {"galleries"}

    missing_ids = []
    for path, ids in galleries.items():
        for i in ids:
            if i not in media_keys:
                missing_ids.append((path, i))
    if missing_ids:
        print("WARNING unknown media ids:", missing_ids[:10], "...", len(missing_ids))

    # Rebuild galleries object entries that are missing
    to_add = {p: ids for p, ids in galleries.items() if f'"{p}"' not in text and f"'{p}'" not in text}
    # also add if key appears only as comment
    to_add = {p: ids for p, ids in galleries.items() if not re.search(rf'^\s*"{re.escape(p)}":', text, re.M)}
    print(f"gallery paths to insert: {len(to_add)}")
    if to_add:
        block_lines = []
        for path in sorted(to_add):
            ids_fmt = ", ".join(json.dumps(i) for i in to_add[path])
            block_lines.append(f'  {json.dumps(path)}: [{ids_fmt}],')
        block = "\n".join(block_lines) + "\n"
        markers = [
            '  // Appliances live on home',
            '  "/gallery/":',
            "  '/gallery/':",
        ]
        inserted = False
        for marker in markers:
            if marker in text:
                text = text.replace(marker, block + marker, 1)
                inserted = True
                break
        if not inserted:
            raise SystemExit("could not find insertion marker in media.ts")
        MEDIA.write_text(text, encoding="utf-8")
        print("media.ts updated")
    else:
        print("media.ts galleries already present")


if __name__ == "__main__":
    main()
