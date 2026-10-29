"""Remove internal file names / meta jargon from customer-facing TSX under app/ and components/."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
SKIP = {"management-review"}

subs = [
    (re.compile(r"lpg data\.md\s*/\s*lpg data2\.md"), "our local directory"),
    (re.compile(r"lpg data2\.md"), "our local directory"),
    (re.compile(r"lpg data\.md"), "our company directory"),
    (re.compile(r"network\.json"), "our network"),
    (re.compile(r"dealer workbook", re.I), "dealer network"),
    (re.compile(r"partners master", re.I), "partner list"),
    (re.compile(r"research files?", re.I), "local listings"),
    (re.compile(r"LPG research data", re.I), "local distributors"),
    (re.compile(r"research listings?", re.I), "local listings"),
    (re.compile(r"research data", re.I), "local listings"),
    (re.compile(r"industry[- ]register", re.I), "local distributor"),
    (re.compile(r"Named directory rebuilt[^.]*\."), ""),
    (re.compile(r"\(illustrative[^)]*\)", re.I), ""),
    (re.compile(r"illustrative gallery", re.I), "photo gallery"),
    (re.compile(r"Illustrative "), ""),
]


def main() -> None:
    n = 0
    for d in (ROOT / "app", ROOT / "components"):
        for p in d.rglob("*.tsx"):
            if any(s in p.parts for s in SKIP):
                continue
            t = p.read_text(encoding="utf-8")
            nt = t
            for rx, rep in subs:
                nt = rx.sub(rep, nt)
            if nt != t:
                p.write_text(nt, encoding="utf-8")
                n += 1
                print(p.relative_to(ROOT))
    print("changed", n)


if __name__ == "__main__":
    main()
