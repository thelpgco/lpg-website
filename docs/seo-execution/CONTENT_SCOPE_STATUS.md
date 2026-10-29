# Content scope status — what is done vs not done (all pages)

**Date:** 29 Oct 2026
**Baseline:** Strict V2 audit — 1 Good · 59 Borderline · 56 Weak (116 graded)
**After:** Oct 29 execution (honesty sweep, money/cylinder rewrites, demo mode, polish passes)

Sources: [`CONTENT_QUALITY_AUDIT_V2.md`](../seo-plan/CONTENT_QUALITY_AUDIT_V2.md), [`REVERIFY_CONTENT_SAMPLE.md`](REVERIFY_CONTENT_SAMPLE.md), [`REVERIFY_REPORT.md`](REVERIFY_REPORT.md), [`EXECUTION_PROGRESS.md`](EXECUTION_PROGRESS.md).

---

## How to read “done”

| Layer | Meaning | Site status |
|---|---|---|
| **Built** | `page.tsx` exists, registry `built=true` | **119/119 map pages built** (all still `review` / noindex) |
| **Systems done** | Company profile, demo/prod mode, products, projects layouts, calculators, leads, management dashboard | **Done** |
| **Honesty done** | No `[needs confirmation]`, Gate L, awaiting sign-off, fake test-order claim, partner-preview draft | **Done** (automated scan 0 hits) |
| **Content Good** | Strict rubric: ≥17 + A/G/H≥3 + promise kept + real info-gain | **Almost not done** — still **1 Good** in deep sample |

So: **the website is built and cleaned for inspection**, but **most pages are not “content-complete / rank-#1 Good”** until owner facts fill info-gain gaps.

---

## Headline counts (scope labels)

| Scope label | Count |
|---|---:|
| PARTLY DONE (fixed since V2; not re-audited to Good) | 67 |
| NOT DONE (still Borderline — needs info-gain) | 17 |
| PARTLY DONE (honesty/structure fixed; not Good yet) | 15 |
| NOT DONE (still Weak / thin / missing facts) | 11 |
| PARTLY DONE (usable; polish optional) | 6 |
| DONE (Good) | 1 |
| **URLs in this report** | **117** |

### Work applied since V2

| Work bucket | Count |
|---|---:|
| TEMPLATE_FIXED | 44 |
| BUILT_NOT_DEEPENED | 25 |
| REWRITTEN_OR_POLISHED | 23 |
| REVERIFIED | 19 |
| BUILT_USABLE | 6 |

---

## What IS done (site-wide)

1. All mapped English pages exist (Urdu removed earlier).
2. Demo vs production data modes (`NEXT_PUBLIC_SITE_MODE`).
3. Central company profile + product/project helpers.
4. Honesty sweep across public TSX.
5. Money flagship rewrite with live MoM table (Rs 258.65 → 279.34, +8%).
6. Cylinder SKUs / refill / connection without placeholders (demo deposits only in demo mode).
7. Projects portfolio UI + 3 DEMO case studies (demo only).
8. Management dashboard `/management-review/`.
9. Safety pages signed in `safety-review.json`; 1122 on key safety flows.
10. City hubs: no identical “our test order took 60 minutes” claim.
11. Illustrative captioning for AI/sample images.
12. `tsc` + production/demo `next build` pass.

---

## What is NOT done (blocks “Good” / publish)

### Owner / evidence pack (blocks info-gain on ~40+ pages)

| Missing fact | Unlocks |
|---|---|
| OGRA monthly PDF / primary notification file | Honest “verified” wording; PriceBlock H gate |
| Real deposit / exchange / new-empty amounts by size | Cylinder price, SKUs, refill, new connection |
| Empty weights / dimensions per size | Sizes + SKU pages |
| Delivery fee rule | Delivery, city hubs, cylinder totals |
| Real camera photos (office, markings, delivery) | Trust + media honesty |
| Consented real projects | `/projects/`, services, industries |
| Appliance SKU price list | Stove/geyser/heater/shop production pages |
| Reconciled network counts (347 vs 452 vs sum) | Home, network, city hubs |
| Licence issue date vs “since 1999” | About / home claims |

### Editorial / SEO still open

- Full V3 strict re-score of all 116 URLs (only 20 deep-rescore so far).
- Merge or differentiate price siblings (per-kg / OGRA / city-price).
- Thin dynamic city hubs (Peshawar, Faisalabad, …) still need ≥5 local facts or stay noindex.
- Province hubs still thin.
- Industries still template-heavy (no load estimates).
- Services still lack standards numbers / project proof.
- No page moved to `published` / indexable yet.

---

## Deep-rescore sample (20 URLs) — current vs V2

| URL | V2 | Now | Scope |
|---|---|---|---|
| `/` | WEAK | **BORDERLINE** (13) | Honesty cleaned; still needs proof assets + consistent identity |
| `/commercial-lpg-supply/` | BORDERLINE | **BORDERLINE** | Worked 45.4 kg gas cost added |
| `/delivery-areas/` | WEAK | **BORDERLINE** | Hub table shipped; partner-count reconcile still open |
| `/lpg-companies-in-pakistan/` | WEAK | **BORDERLINE** | OGRA verify steps added; still no company list |
| `/lpg-cylinder-price-in-pakistan/` | WEAK | **BORDERLINE** (12) | Placeholders gone; deposit/delivery columns still quote-only |
| `/lpg-cylinder-refill/` | WEAK | **BORDERLINE** (14) | Clean process tables; no refill fee beyond gas |
| `/lpg-cylinders/12-kg-domestic-cylinder/` | WEAK | **BORDERLINE** (13) | No [needs confirmation]; still no real tare/deposit |
| `/lpg-home-delivery/` | WEAK | **BORDERLINE** | Gate L copy removed |
| `/lpg-near-me/` | WEAK | **BORDERLINE** | Reframed as matching, not fake map |
| `/lpg-price-in-pakistan/` | WEAK | **BORDERLINE** (17) | Big rewrite; MoM table live; G gate — doorstep totals still quoted-only |
| `/lpg-price-per-kg-in-pakistan/` | WEAK | **BORDERLINE** (11) | Better number-first; still near-duplicate of flagship |
| `/lpg-stove-price-in-pakistan/` | WEAK | **BORDERLINE** | Production H1 price-on-request; DEMO prices in demo only |
| `/management-review/` | N/A | **WEAK** | Internal tool — not a customer content page |
| `/new-lpg-connection/` | WEAK | **BORDERLINE** (16) | Honesty fixed; deposit amounts still not published |
| `/order-lpg/` | BORDERLINE | **BORDERLINE** | Polished |
| `/projects/` | WEAK | **WEAK** (9) | Honest empty in production; DEMO cases only in demo mode — cannot be Good without real projects |
| `/shop/` | WEAK | **WEAK** (10) | Still catalogue without production SKUs |
| `/tools/lpg-cylinder-duration-calculator/` | GOOD | **GOOD** (19) | Still the only clear Good |
| `/what-to-do-if-you-smell-gas/` | BORDERLINE | **BORDERLINE** (18) | Close to Good; 1122 in steps |

Sample shift: **Weak 15 → 4**, **Borderline 3 → 15**, **Good still 1**.

---

## Master table — every V2 URL

| URL | V2 grade | V2 score | Cluster | Work since V2 | Content scope now | Note |
|---|---|---:|---|---|---|---|
| `/tools/lpg-cylinder-duration-calculator/` | GOOD | 19 | R1 cylinders | REVERIFIED | DONE (Good) | Now ~GOOD 19 — Still the only clear Good |
| `/` | WEAK | 11 | Money / home / delivery | REVERIFIED | PARTLY DONE (honesty/structure fixed; not Good yet) | Now ~BORDERLINE 13 — Honesty cleaned; still needs proof assets + consistent identity |
| `/delivery-areas/` | WEAK | 9 | Money / home / delivery | REVERIFIED | PARTLY DONE (honesty/structure fixed; not Good yet) | Now ~BORDERLINE — Hub table shipped; partner-count reconcile still open |
| `/lpg-cylinder-price-in-pakistan/` | WEAK | 10 | Money / home / delivery | REVERIFIED | PARTLY DONE (honesty/structure fixed; not Good yet) | Now ~BORDERLINE 12 — Placeholders gone; deposit/delivery columns still quote-only |
| `/lpg-home-delivery/` | WEAK | 9 | Money / home / delivery | REVERIFIED | PARTLY DONE (honesty/structure fixed; not Good yet) | Now ~BORDERLINE — Gate L copy removed |
| `/lpg-price-in-pakistan/` | WEAK | 10 | Money / home / delivery | REVERIFIED | PARTLY DONE (honesty/structure fixed; not Good yet) | Now ~BORDERLINE 17 — Big rewrite; MoM table live; G gate — doorstep totals still quoted-only |
| `/lpg-price-per-kg-in-pakistan/` | WEAK | 7 | Money / home / delivery | REVERIFIED | PARTLY DONE (honesty/structure fixed; not Good yet) | Now ~BORDERLINE 11 — Better number-first; still near-duplicate of flagship |
| `/order-lpg/` | BORDERLINE | 12 | Money / home / delivery | REVERIFIED | PARTLY DONE (honesty/structure fixed; not Good yet) | Now ~BORDERLINE — Polished |
| `/lpg-cylinder-refill/` | WEAK | 10 | R1 cylinders | REVERIFIED | PARTLY DONE (honesty/structure fixed; not Good yet) | Now ~BORDERLINE 14 — Clean process tables; no refill fee beyond gas |
| `/lpg-cylinders/12-kg-domestic-cylinder/` | WEAK | 10 | R1 cylinders | REVERIFIED | PARTLY DONE (honesty/structure fixed; not Good yet) | Now ~BORDERLINE 13 — No [needs confirmation]; still no real tare/deposit |
| `/new-lpg-connection/` | WEAK | 14 | R1 cylinders | REVERIFIED | PARTLY DONE (honesty/structure fixed; not Good yet) | Now ~BORDERLINE 16 — Honesty fixed; deposit amounts still not published |
| `/commercial-lpg-supply/` | BORDERLINE | 11 | R2 guides / safety | REVERIFIED | PARTLY DONE (honesty/structure fixed; not Good yet) | Now ~BORDERLINE — Worked 45.4 kg gas cost added |
| `/lpg-companies-in-pakistan/` | WEAK | 10 | R2 guides / safety | REVERIFIED | PARTLY DONE (honesty/structure fixed; not Good yet) | Now ~BORDERLINE — OGRA verify steps added; still no company list |
| `/what-to-do-if-you-smell-gas/` | BORDERLINE | 18 | R2 guides / safety | REVERIFIED | PARTLY DONE (honesty/structure fixed; not Good yet) | Now ~BORDERLINE 18 — Close to Good; 1122 in steps |
| `/lpg-near-me/` | WEAK | 10 | R3 commercial | REVERIFIED | PARTLY DONE (honesty/structure fixed; not Good yet) | Now ~BORDERLINE — Reframed as matching, not fake map |
| `/lpg-stove-price-in-pakistan/` | WEAK | 11 | Shop / appliances | REVERIFIED | PARTLY DONE (honesty/structure fixed; not Good yet) | Now ~BORDERLINE — Production H1 price-on-request; DEMO prices in demo only |
| `/lpg-in-abbottabad/` | BORDERLINE | 13 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Promise fixed when no supplier listed (guidance H1); still needs ≥5 real local facts / Gate L |
| `/lpg-in-azad-kashmir/` | WEAK | 5 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Empty provinces got guidance + links; still thin province content |
| `/lpg-in-balochistan/` | WEAK | 10 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Empty provinces got guidance + links; still thin province content |
| `/lpg-in-burewala/` | WEAK | 8 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Honesty fixed (no fake test-order claim; softer partner wording); local substance still thin |
| `/lpg-in-faisalabad/` | WEAK | 8 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Honesty fixed (no fake test-order claim; softer partner wording); local substance still thin |
| `/lpg-in-gilgit-baltistan/` | WEAK | 5 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Empty provinces got guidance + links; still thin province content |
| `/lpg-in-gilgit/` | BORDERLINE | 13 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Promise fixed when no supplier listed (guidance H1); still needs ≥5 real local facts / Gate L |
| `/lpg-in-gujranwala/` | BORDERLINE | 13 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Promise fixed when no supplier listed (guidance H1); still needs ≥5 real local facts / Gate L |
| `/lpg-in-hyderabad/` | WEAK | 8 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Honesty fixed (no fake test-order claim; softer partner wording); local substance still thin |
| `/lpg-in-islamabad/` | WEAK | 9 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Honesty fixed (no fake test-order claim; softer partner wording); local substance still thin |
| `/lpg-in-karachi/` | WEAK | 9 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Honesty fixed (no fake test-order claim; softer partner wording); local substance still thin |
| `/lpg-in-khyber-pakhtunkhwa/` | WEAK | 5 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Empty provinces got guidance + links; still thin province content |
| `/lpg-in-lahore/` | WEAK | 9 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Honesty fixed (no fake test-order claim; softer partner wording); local substance still thin |
| `/lpg-in-multan/` | BORDERLINE | 13 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Promise fixed when no supplier listed (guidance H1); still needs ≥5 real local facts / Gate L |
| `/lpg-in-murree/` | WEAK | 13 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Promise fixed when no supplier listed (guidance H1); still needs ≥5 real local facts / Gate L |
| `/lpg-in-muzaffarabad/` | WEAK | 13 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Promise fixed when no supplier listed (guidance H1); still needs ≥5 real local facts / Gate L |
| `/lpg-in-peshawar/` | WEAK | 8 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Honesty fixed (no fake test-order claim; softer partner wording); local substance still thin |
| `/lpg-in-punjab/` | WEAK | 10 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Empty provinces got guidance + links; still thin province content |
| `/lpg-in-quetta/` | WEAK | 8 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Honesty fixed (no fake test-order claim; softer partner wording); local substance still thin |
| `/lpg-in-rawalpindi/` | WEAK | 9 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Honesty fixed (no fake test-order claim; softer partner wording); local substance still thin |
| `/lpg-in-sindh/` | WEAK | 10 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Empty provinces got guidance + links; still thin province content |
| `/lpg-in-skardu/` | WEAK | 13 | Cities / provinces | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Promise fixed when no supplier listed (guidance H1); still needs ≥5 real local facts / Gate L |
| `/industries/` | WEAK | 10 | Industries | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Case-studies Note softened; still no sector load estimates |
| `/industries/food-processing/` | BORDERLINE | 12 | Industries | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Case-studies Note softened; still no sector load estimates |
| `/industries/hospitals/` | BORDERLINE | 13 | Industries | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Case-studies Note softened; still no sector load estimates |
| `/industries/hotels/` | BORDERLINE | 12 | Industries | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Case-studies Note softened; still no sector load estimates |
| `/industries/housing-societies/` | BORDERLINE | 13 | Industries | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Case-studies Note softened; still no sector load estimates |
| `/industries/manufacturing/` | BORDERLINE | 11 | Industries | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Case-studies Note softened; still no sector load estimates |
| `/industries/poultry-farms/` | BORDERLINE | 14 | Industries | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Case-studies Note softened; still no sector load estimates |
| `/industries/restaurants/` | BORDERLINE | 12 | Industries | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Case-studies Note softened; still no sector load estimates |
| `/industries/textile/` | BORDERLINE | 12 | Industries | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Case-studies Note softened; still no sector load estimates |
| `/industries/weddings-and-events/` | BORDERLINE | 14 | Industries | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Case-studies Note softened; still no sector load estimates |
| `/lpg-cylinder-sizes-in-pakistan/` | WEAK | 11 | Money / home / delivery | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/lpg-cylinders/` | WEAK | 9 | Money / home / delivery | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/lpg-price-in-pakistan/history/` | BORDERLINE | 12 | Money / home / delivery | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/ogra-lpg-notified-price/` | WEAK | 10 | Money / home / delivery | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/lpg-cylinders/45-kg-commercial-cylinder/` | WEAK | 10 | R1 cylinders | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/lpg-cylinders/5-kg-cylinder/` | WEAK | 8 | R1 cylinders | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/lpg-cylinders/composite-fiber-cylinder/` | WEAK | 9 | R1 cylinders | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/bulk-lpg-supply/` | BORDERLINE | 13 | R2 guides / safety | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/industrial-lpg-supply/` | BORDERLINE | 12 | R2 guides / safety | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/lpg-cylinder-blast-causes-and-prevention/` | BORDERLINE | 17 | R2 guides / safety | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/lpg-leak-detector/` | BORDERLINE | 15 | R2 guides / safety | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/lpg-regulator-problems-and-repair/` | BORDERLINE | 17 | R2 guides / safety | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/lpg-safety/` | BORDERLINE | 12 | R2 guides / safety | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/lpg-shortage-pakistan/` | BORDERLINE | 14 | R2 guides / safety | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/ogra-lpg-regulations-pakistan/` | WEAK | 11 | R2 guides / safety | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/propane-vs-butane/` | BORDERLINE | 17 | R2 guides / safety | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/services/lpg-safety-audit-and-inspection/` | BORDERLINE | 14 | R2 guides / safety | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Unique process steps; testing meta fixed; still no real projects/standards numbers |
| `/lpg-kit-price-in-pakistan/` | WEAK | 11 | R3 commercial | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/shop/commercial-lpg-burners/` | BORDERLINE | 13 | R3 commercial | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Demo prices gated; production H1 price-on-request |
| `/services/` | BORDERLINE | 12 | Services | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Unique process steps; testing meta fixed; still no real projects/standards numbers |
| `/services/boiler-and-furnace-conversion-to-lpg/` | BORDERLINE | 13 | Services | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Unique process steps; testing meta fixed; still no real projects/standards numbers |
| `/services/lpg-air-sng-systems/` | BORDERLINE | 12 | Services | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Unique process steps; testing meta fixed; still no real projects/standards numbers |
| `/services/lpg-cylinder-testing-and-inspection/` | WEAK | — | Services | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Unique process steps; testing meta fixed; still no real projects/standards numbers |
| `/services/lpg-maintenance-and-amc/` | BORDERLINE | 13 | Services | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Unique process steps; testing meta fixed; still no real projects/standards numbers |
| `/services/lpg-manifold-and-cylinder-bank-installation/` | BORDERLINE | 13 | Services | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Unique process steps; testing meta fixed; still no real projects/standards numbers |
| `/services/lpg-pipeline-installation/` | BORDERLINE | 13 | Services | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Unique process steps; testing meta fixed; still no real projects/standards numbers |
| `/services/lpg-storage-tank-installation/` | BORDERLINE | 13 | Services | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Unique process steps; testing meta fixed; still no real projects/standards numbers |
| `/lpg-geyser-price-in-pakistan/` | WEAK | 12 | Shop / appliances | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/lpg-heaters-in-pakistan/` | BORDERLINE | 14 | Shop / appliances | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/lpg-vaporizers/` | BORDERLINE | 15 | Shop / appliances | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Demo prices gated; production H1 price-on-request |
| `/shop/lpg-hoses-and-accessories/` | BORDERLINE | 12 | Shop / appliances | TEMPLATE_FIXED | PARTLY DONE (fixed since V2; not re-audited to Good) | Demo prices gated; production H1 price-on-request |
| `/about/` | WEAK | 9 | Trust / other | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/contact/` | WEAK | 10 | Trust / other | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/licences-and-compliance/` | WEAK | 11 | Trust / other | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/partner-standards/` | WEAK | 11 | Trust / other | REWRITTEN_OR_POLISHED | PARTLY DONE (fixed since V2; not re-audited to Good) | Oct 29 rewrite/polish applied; not re-scored line-by-line yet |
| `/tools/lpg-vs-diesel-cost-calculator/` | BORDERLINE | 18 | R2 guides / safety | BUILT_USABLE | PARTLY DONE (usable; polish optional) | Working tool; may need worked examples / OGRA PDF for H gate |
| `/tools/lpg-vs-sui-gas-cost-calculator/` | BORDERLINE | 17 | R2 guides / safety | BUILT_USABLE | PARTLY DONE (usable; polish optional) | Working tool; may need worked examples / OGRA PDF for H gate |
| `/tools/lpg-btu-kwh-converter/` | BORDERLINE | 18 | Tools | BUILT_USABLE | PARTLY DONE (usable; polish optional) | Working tool; may need worked examples / OGRA PDF for H gate |
| `/tools/lpg-cylinder-price-calculator/` | BORDERLINE | 13 | Tools | BUILT_USABLE | PARTLY DONE (usable; polish optional) | Working tool; may need worked examples / OGRA PDF for H gate |
| `/tools/lpg-litre-to-kg-converter/` | BORDERLINE | 17 | Tools | BUILT_USABLE | PARTLY DONE (usable; polish optional) | Working tool; may need worked examples / OGRA PDF for H gate |
| `/tools/lpg-tank-size-calculator/` | BORDERLINE | 17 | Tools | BUILT_USABLE | PARTLY DONE (usable; polish optional) | Working tool; may need worked examples / OGRA PDF for H gate |
| `/why-lpg-prices-change-in-pakistan/` | BORDERLINE | 18 | Money / home / delivery | BUILT_NOT_DEEPENED | NOT DONE (still Borderline — needs info-gain) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/how-lpg-is-produced-and-supplied/` | BORDERLINE | 12 | R2 guides / safety | BUILT_NOT_DEEPENED | NOT DONE (still Borderline — needs info-gain) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/how-to-choose-a-licensed-lpg-supplier/` | BORDERLINE | 14 | R2 guides / safety | BUILT_NOT_DEEPENED | NOT DONE (still Borderline — needs info-gain) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/lpg-composition-and-properties/` | BORDERLINE | 17 | R2 guides / safety | BUILT_NOT_DEEPENED | NOT DONE (still Borderline — needs info-gain) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/lpg-marketing-company-vs-distributor-vs-dealer/` | BORDERLINE | 11 | R2 guides / safety | BUILT_NOT_DEEPENED | NOT DONE (still Borderline — needs info-gain) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/lpg-regulators/` | BORDERLINE | 16 | R2 guides / safety | BUILT_NOT_DEEPENED | NOT DONE (still Borderline — needs info-gain) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/lpg-vs-cng/` | BORDERLINE | 13 | R2 guides / safety | BUILT_NOT_DEEPENED | NOT DONE (still Borderline — needs info-gain) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/lpg-vs-lng/` | BORDERLINE | 17 | R2 guides / safety | BUILT_NOT_DEEPENED | NOT DONE (still Borderline — needs info-gain) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/lpg-vs-sui-gas/` | BORDERLINE | 16 | R2 guides / safety | BUILT_NOT_DEEPENED | NOT DONE (still Borderline — needs info-gain) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/what-is-lpg/` | BORDERLINE | 14 | R2 guides / safety | BUILT_NOT_DEEPENED | NOT DONE (still Borderline — needs info-gain) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/auto-lpg-in-pakistan/` | BORDERLINE | 15 | R3 commercial | BUILT_NOT_DEEPENED | NOT DONE (still Borderline — needs info-gain) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/lpg-business-in-pakistan/` | BORDERLINE | 11 | R3 commercial | BUILT_NOT_DEEPENED | NOT DONE (still Borderline — needs info-gain) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/lpg-filling-stations/` | BORDERLINE | 14 | R3 commercial | BUILT_NOT_DEEPENED | NOT DONE (still Borderline — needs info-gain) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/lpg-plant-in-pakistan/` | BORDERLINE | 13 | R3 commercial | BUILT_NOT_DEEPENED | NOT DONE (still Borderline — needs info-gain) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/lpg-shops-and-agencies/` | BORDERLINE | 11 | R3 commercial | BUILT_NOT_DEEPENED | NOT DONE (still Borderline — needs info-gain) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/how-it-works/` | BORDERLINE | 12 | Trust / other | BUILT_NOT_DEEPENED | NOT DONE (still Borderline — needs info-gain) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/management-review/` | N/A | — | Trust / other | REVERIFIED | NOT DONE (still Borderline — needs info-gain) | Now ~WEAK — Internal tool — not a customer content page |
| `/lpg-price-in-pakistan/[city]/` | WEAK | 7 | Money / home / delivery | BUILT_NOT_DEEPENED | NOT DONE (still Weak / thin / missing facts) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/lpg-supply-in-pakistan/` | WEAK | 10 | R2 guides / safety | BUILT_NOT_DEEPENED | NOT DONE (still Weak / thin / missing facts) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/become-an-lpg-distributor/` | WEAK | 10 | R3 commercial | BUILT_NOT_DEEPENED | NOT DONE (still Weak / thin / missing facts) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/lpg-bowser/` | WEAK | 10 | R3 commercial | BUILT_NOT_DEEPENED | NOT DONE (still Weak / thin / missing facts) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/shop/` | WEAK | 10 | Shop / appliances | REVERIFIED | NOT DONE (still Weak / thin / missing facts) | Now ~WEAK 10 — Still catalogue without production SKUs |
| `/about/haroon-rasheed/` | WEAK | 8 | Trust / other | BUILT_NOT_DEEPENED | NOT DONE (still Weak / thin / missing facts) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/complaints/` | WEAK | 12 | Trust / other | BUILT_NOT_DEEPENED | NOT DONE (still Weak / thin / missing facts) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/editorial-policy/` | WEAK | 12 | Trust / other | BUILT_NOT_DEEPENED | NOT DONE (still Weak / thin / missing facts) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/our-network/` | WEAK | 12 | Trust / other | BUILT_NOT_DEEPENED | NOT DONE (still Weak / thin / missing facts) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/pricing-policy/` | WEAK | 11 | Trust / other | BUILT_NOT_DEEPENED | NOT DONE (still Weak / thin / missing facts) | Page exists (built/review) but no Oct 29 deep rewrite — still roughly V2 grade |
| `/projects/` | WEAK | 9 | Trust / other | REVERIFIED | NOT DONE (still Weak / thin / missing facts) | Now ~WEAK 9 — Honest empty in production; DEMO cases only in demo mode — cannot be Good without real projects |

---

## By cluster — done vs not

### Cities / provinces (22)

- PARTLY DONE (fixed since V2; not re-audited to Good): **22**

### Industries (10)

- PARTLY DONE (fixed since V2; not re-audited to Good): **10**

### Money / home / delivery (13)

- PARTLY DONE (honesty/structure fixed; not Good yet): **7**
- PARTLY DONE (fixed since V2; not re-audited to Good): **4**
- NOT DONE (still Weak / thin / missing facts): **1**
- NOT DONE (still Borderline — needs info-gain): **1**

### R1 cylinders (7)

- PARTLY DONE (honesty/structure fixed; not Good yet): **3**
- PARTLY DONE (fixed since V2; not re-audited to Good): **3**
- DONE (Good): **1**

### R2 guides / safety (25)

- PARTLY DONE (fixed since V2; not re-audited to Good): **10**
- NOT DONE (still Borderline — needs info-gain): **9**
- PARTLY DONE (honesty/structure fixed; not Good yet): **3**
- PARTLY DONE (usable; polish optional): **2**
- NOT DONE (still Weak / thin / missing facts): **1**

### R3 commercial (10)

- NOT DONE (still Borderline — needs info-gain): **5**
- PARTLY DONE (fixed since V2; not re-audited to Good): **2**
- NOT DONE (still Weak / thin / missing facts): **2**
- PARTLY DONE (honesty/structure fixed; not Good yet): **1**

### Services (8)

- PARTLY DONE (fixed since V2; not re-audited to Good): **8**

### Shop / appliances (6)

- PARTLY DONE (fixed since V2; not re-audited to Good): **4**
- PARTLY DONE (honesty/structure fixed; not Good yet): **1**
- NOT DONE (still Weak / thin / missing facts): **1**

### Tools (4)

- PARTLY DONE (usable; polish optional): **4**

### Trust / other (12)

- NOT DONE (still Weak / thin / missing facts): **6**
- PARTLY DONE (fixed since V2; not re-audited to Good): **4**
- NOT DONE (still Borderline — needs info-gain): **2**

---

## Bottom line

| Question | Answer |
|---|---|
| Are all pages built? | **Yes** (119 registry / map pages) |
| Is the site inspection-ready (demo)? | **Yes** — use `NEXT_PUBLIC_SITE_MODE=demo` + `/management-review/` |
| Is honesty cleaned vs V2 Weak causes? | **Largely yes** |
| Is content “Good / publish-ready” for all pages? | **No** — still ~1 Good; most PARTLY DONE or NOT DONE on info-gain |
| What unblocks Good? | Owner fact pack (table above) + V3 rewrite pass on remaining thin hubs |

