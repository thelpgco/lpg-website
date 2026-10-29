"""One-shot: neutralize leftover Urdu plan language in THE_LPG_CO_SEO_MASTER_PLAN.md."""
from pathlib import Path

p = Path(__file__).resolve().parents[1] / "THE_LPG_CO_SEO_MASTER_PLAN.md"
t = p.read_text(encoding="utf-8")
pairs = [
    (
        "| 7 | Urdu writer | Yes | Urdu pillar can start. |",
        "| 7 | Urdu writer | Cancelled | English-only site; no Urdu pillar (27 Oct 2026). |",
    ),
    (
        "6. **Add Urdu early.**",
        "6. **Urdu cancelled.** English-only; Roman Urdu phrases OK on English FAQs where users search them.",
    ),
    (
        "- **Urdu pages:** written by your Urdu writer, not machine-translated. Safety content in Urdu is reviewed by the named safety reviewer.",
        "- **Urdu pages:** cancelled. Do not build `/ur/` or hreflang.",
    ),
    (
        "| **hreflang** | Added only when the Urdu pages exist, as `en-PK` ↔ `ur-PK` pairs with self-reference. |",
        "| **hreflang** | Not used (Urdu cancelled; English-only). |",
    ),
    (
        "**Not built yet:** `/ur/` and hreflang, the calculators and other tools",
        "**Not built yet:** the calculators and other tools",
    ),
    (
        "| Gate 0 closed except four items | You answered the business model, coverage, appliances, Urdu writer and tool access |",
        "| Gate 0 closed except four items | You answered the business model, coverage, appliances and tool access; Urdu writer cancelled |",
    ),
]
for a, b in pairs:
    if a in t:
        t = t.replace(a, b)
        print("OK", a[:55])
    else:
        print("MISS", a[:55])

# J section — find by start marker
start = "**J. Urdu and Roman Urdu"
if start in t:
    i = t.index(start)
    j = t.find("\n\n", i)
    if j < 0:
        j = i + 400
    t = (
        t[:i]
        + "**J. Urdu locale cancelled (27 Oct 2026).** No `/ur/` pages and no hreflang. "
        "Roman Urdu search phrases (e.g. \"aaj ka rate\") may appear as natural H2/FAQ wording on English pages only."
        + t[j:]
    )
    print("OK J section")
else:
    print("MISS J section")

p.write_text(t, encoding="utf-8")
print("done")
