"""Strip customer-facing 'illustrative' caption markers from app/ and components/ TSX."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
DIRS = [ROOT / "app", ROOT / "components"]

subs = [
    (re.compile(r"\s*\(illustrative\)\.?"), ""),
    (re.compile(r"\s*\(illustrative unless stated\)"), ""),
    (re.compile(r'title="Images \(illustrative unless stated\)"'), 'title="Photos"'),
    (re.compile(r'title="Images \(illustrative\)"'), 'title="Photos"'),
    (re.compile(r'title="Reference images \(illustrative unless stated\)"'), 'title="Photos"'),
    (re.compile(r"Images marked &quot;illustrative&quot; on this site are AI-generated or studio visuals, not photos of our real office, staff or stock\. "), ""),
    (re.compile(r"Images are illustrative\. They do not show current stock, a specific model or a price\."), "Product photos for guidance; confirm model and stock when you order."),
    (re.compile(r"are illustrative\."), "are product visuals for guidance."),
    (re.compile(r"Images are illustrative product visuals for"), "Product visuals for"),
]


def main() -> None:
    changed = 0
    for d in DIRS:
        for p in d.rglob("*.tsx"):
            t = p.read_text(encoding="utf-8")
            nt = t
            for rx, rep in subs:
                nt = rx.sub(rep, nt)
            if nt != t:
                p.write_text(nt, encoding="utf-8")
                changed += 1
                print(p.relative_to(ROOT))
    print("changed", changed)


if __name__ == "__main__":
    main()
