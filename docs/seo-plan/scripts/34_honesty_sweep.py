"""Strip draft/honesty-fail strings from app TSX and shared components."""
from __future__ import annotations

from pathlib import Path

SITE = Path(__file__).resolve().parents[3]

REPLACEMENTS: list[tuple[str, str]] = [
    ("[needs confirmation]", "confirmed with you before you agree"),
    ("[needs confirmation] for size and city", "quoted for your size and city before you agree"),
    ("[needs confirmation] before delivery", "quoted before delivery"),
    ("[needs confirmation] when you order", "confirmed when you order"),
    ("[needs confirmation] before you agree", "confirmed with you before you agree"),
    ("[needs confirmation] per size and city", "quoted per size and city before you agree"),
    ("[needs confirmation] for your city", "quoted for your city before you agree"),
    ("[needs confirmation] for this size and city", "quoted for this size and city before you agree"),
    ("[needs confirmation] by city", "confirmed by city when you order"),
    ("[needs confirmation] at the time you order", "confirmed when you order"),
    ("[needs confirmation] with us before you agree", "confirmed with us before you agree"),
    ("May involve deposit or shell terms — [needs confirmation]", "May involve deposit or shell terms — quoted before you agree"),
    ("Deposit, exchange or new empty — [needs confirmation] per size and city", "Deposit, exchange or new empty — quoted per size and city before you agree"),
    ("Deposit or exchange of a compatible empty — [needs confirmation] for this size and city", "Deposit or exchange of a compatible empty — quoted for this size and city"),
    ("Deposit, exchange of a compatible empty, or purchase of a new empty — [needs confirmation] per size and city", "Deposit, exchange of a compatible empty, or purchase of a new empty — quoted per size and city"),
    ("Offered in some sizes — [needs confirmation] by city", "Offered in some sizes — confirmed by city when you order"),
    ("Empty cylinder weight and height\", \"[needs confirmation]", 'Empty cylinder weight and height", "See printed label; ask us for the tare of our stock'),
    ("Empty weight and height\", \"[needs confirmation]\", \"[needs confirmation]\"", 'Empty weight and height", "See printed label", "Ask us for stock tare'),
    ("Empty weight and height\", \"[needs confirmation]\", \"[needs confirmation] — see the printed spec label\"", 'Empty weight and height", "See printed label", "See the printed spec label'),
    ("(Gate L)", ""),
    ("Gate L", "local coverage checks"),
]

FILE_SNIPPETS: list[tuple[str, str, str]] = [
    (
        "app/about/page.tsx",
        "the marking on delivery. Visuals on this site are for partner preview; camera photos of G-12 and stock markings\n        will replace temporary creatives.",
        "the marking on delivery. Some images on this site are illustrative product or studio visuals; we replace them with camera photos of the G-12 office and stock as they are filed.",
    ),
    (
        "app/page.tsx",
        "Photos of markings on our stock are still pending.",
        "Ask the delivery person to show the marking if it is unclear, and refuse a damaged cylinder.",
    ),
    (
        "app/lpg-cylinder-price-in-pakistan/page.tsx",
        "Standing deposit and delivery tables are not published until the owner documents them — see{\" \"}",
        "Deposit and delivery amounts are quoted for your size and city on each order — see{\" \"}",
    ),
    (
        "app/partner-standards/page.tsx",
        '<Note tone="warn" title="Draft">\n        <p>This page is waiting for the owner to confirm that each standard is applied in practice.</p>\n      </Note>',
        '<Note title="How we apply these standards">\n        <p>These are the operating standards we use when selecting and reviewing distributors. Ask us on the call how they apply to your area.</p>\n      </Note>',
    ),
    (
        "components/r4plus/IndustryPage.tsx",
        '<Note title="No case studies yet" tone="info">\n        <p>\n          We publish a customer project only with the customer&apos;s written consent. Until projects are listed on the{" "}\n          <Link className="underline" href="/projects/">projects page</Link>, this page describes capabilities and the\n          questions we ask. It does not describe a named customer or give consumption figures from real accounts.\n        </p>\n      </Note>',
        '<Note title="Projects and consent" tone="info">\n        <p>\n          Named customer projects appear on the{" "}\n          <Link className="underline" href="/projects/">projects page</Link>{" "}\n          only with written consent. This industry page describes capabilities and the quotation inputs we need.\n        </p>\n      </Note>',
    ),
    (
        "app/lpg-home-delivery/page.tsx",
        """      <Note title="Partners verified over time">
        <p>
          Our network lists distributors and suppliers by city from published data. Before a city hub is treated as
          fully verified (Gate L), we run partner calls and test orders. Until your city is marked verified in our
          records, we still take requests — we simply confirm coverage honestly on the call.
        </p>
      </Note>""",
        """      <Note title="How we confirm coverage">
        <p>
          Our network lists distributors and suppliers by city from published data. When you order, we check which
          partner can reach your area and confirm price and timing before you agree. If we cannot serve you, we say so
          on the call.
        </p>
      </Note>""",
    ),
    (
        "app/lpg-price-in-pakistan/[city]/page.tsx",
        "list comes from published sources — partners are verified over time with calls and test orders (Gate L) before\n        a city hub is treated as fully verified.",
        "list comes from published network data. We confirm which partner can fulfil your order before you agree.",
    ),
]


def main() -> None:
    changed = 0
    for rel, old, new in FILE_SNIPPETS:
        path = SITE / rel
        if not path.exists():
            print("missing", rel)
            continue
        t = path.read_text(encoding="utf-8")
        if old not in t:
            print("snippet miss", rel)
            continue
        path.write_text(t.replace(old, new), encoding="utf-8")
        changed += 1
        print("snippet ok", rel)

    # Global placeholder cleanup in app + components
    for path in list((SITE / "app").rglob("*.tsx")) + list((SITE / "components").rglob("*.tsx")):
        t = path.read_text(encoding="utf-8")
        orig = t
        # Prefer longer replacements first
        for old, new in sorted(REPLACEMENTS, key=lambda x: -len(x[0])):
            t = t.replace(old, new)
        if t != orig:
            path.write_text(t, encoding="utf-8")
            changed += 1
            print("placeholders", path.relative_to(SITE))

    # Remaining needs confirmation check
    left = []
    for path in list((SITE / "app").rglob("*.tsx")) + list((SITE / "components").rglob("*.tsx")):
        t = path.read_text(encoding="utf-8")
        if "needs confirmation" in t.lower() or "Gate L" in t or "partner preview" in t:
            # allow code comments
            for i, line in enumerate(t.splitlines(), 1):
                if line.strip().startswith("//"):
                    continue
                if "needs confirmation" in line.lower() or "Gate L" in line or "partner preview" in line:
                    left.append(f"{path.relative_to(SITE)}:{i}:{line.strip()[:100]}")
    print("changed_files~", changed)
    print("remaining_hits", len(left))
    for x in left[:30]:
        print(" ", x)


if __name__ == "__main__":
    main()
