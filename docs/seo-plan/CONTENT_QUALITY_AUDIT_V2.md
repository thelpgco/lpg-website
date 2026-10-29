# Content quality audit V2 (strict re-verification)

**Date:** 28 Oct 2026 · **Scope:** every built content URL, deep-read in three cluster passes · **No provisional grades.**

Source cluster files (evidence + quotes):
- [`audit/strict_money_r1.md`](audit/strict_money_r1.md) — home, money, delivery, R1 cylinders
- [`audit/strict_r2_r3.md`](audit/strict_r2_r3.md) — guides, safety, commercial
- [`audit/strict_r4plus.md`](audit/strict_r4plus.md) — cities, industries, tools, shop, services, trust

Compared with V1 ([`CONTENT_QUALITY_AUDIT.md`](CONTENT_QUALITY_AUDIT.md)): V1 had **15 Good / 74 Borderline / 28 Weak**. Strict V2 is much harsher.

---

## How Good vs Bad is decided (stricter than V1)

| Gate | Rule |
|---|---|
| Criteria | A answer-first · C coverage · G info-gain · H honesty · K craft · D differentiation · M media — each 0–3 (max 21) |
| **GOOD** | Total ≥17 **and** A≥3 **and** G≥3 **and** H≥3 **and** no draft/internal language on the page **and** H1/URL promise is actually delivered |
| **BORDERLINE** | Total 11–16, **or** score looks Good but fails a gate (G/H/promise/draft) |
| **WEAK** | Total ≤10 **or** H≤1 **or** A≤1 **or** URL/H1 promises price/list/projects the body refuses **or** page is mostly a template name-swap |

**What counts as info-gain (G=3):** ≥3 concrete extras a competitor page typically lacks — worked rupee tables from live OGRA data, working calculators with assumptions, checklists with specifics, sourced local facts. A generic FAQ alone is **not** enough.

**Automatic honesty fails (H≤1):** visible `[needs confirmation]`, `Gate L`, `owner photos pending`, `partner preview`, fabricated-looking identical test-order times, AI images captioned as real HQ/licence/certificates, price marketed as OGRA-checked when `prices.json` still says news secondary + PDF recheck.

---

## Headline counts (strict V2)

| Grade | Count |
|---|---:|
| Good | 1 |
| Borderline | 59 |
| Weak | 56 |
| Not Scored | 0 |
| **Unique URLs graded** | **116** |

**Blunt reading:** under this bar almost nothing is publish-ready content. Structure is mostly fine; substance and honesty gates fail. V1 over-credited explainers that look complete but still show draft/safety-review leakage or missing numbers.

---

## Master table (every graded URL)

| Grade | Score | Path | Dims A/C/G/H/K/D/M | Cluster | Short verdict |
|---|---:|---|---|---|---|
| WEAK | 14 | `/new-lpg-connection/` | 3/3/2/0/2/3/1 | R1 cylinders | rewrite (quick win). Fill in deposit, new-empty and accessory prices or ranges and remove the placeholders. It is one data-fill away from Borderline, and with real prices it could approach Good. |
| WEAK | 13 | `/lpg-in-murree/` | 2/2/2/2/2/2/1 | Cities / provinces | WEAK (promise fail). |
| WEAK | 13 | `/lpg-in-muzaffarabad/` | 2/2/2/2/2/2/1 | Cities / provinces | WEAK (promise fail). |
| WEAK | 13 | `/lpg-in-skardu/` | 2/2/2/2/2/2/1 | Cities / provinces | WEAK (promise fail). Retitle as guidance ("LPG in Skardu: winter use and how to ask") or hold until a supplier is listed. |
| WEAK | 12 | `/complaints/` | 2/1/0/2/2/2/2 | Trust / other | WEAK (promise fail, thin). |
| WEAK | 12 | `/editorial-policy/` | 3/1/0/1/2/3/2 | Trust / other | WEAK (honesty). |
| WEAK | 12 | `/lpg-geyser-price-in-pakistan/` | 1/2/2/2/2/2/1 | Shop / appliances | WEAK by rule. The safety content is the best in the group, which makes the missing price more visible. |
| WEAK | 12 | `/our-network/` | 3/2/2/1/2/2/0 | Trust / other | WEAK (honesty: numbers do not reconcile, AI images as network proof). |
| WEAK | 11 | `/` | 2/2/1/1/2/2/1 | Money / home / delivery | rewrite lightly. Deleting the "pending" sentence, unifying the identity wording and dropping the gallery link lifts it to Borderline. It needs real proof assets (licence scan, real stock, real dep |
| WEAK | 11 | `/licences-and-compliance/` | 3/2/1/1/2/2/0 | Trust / other | WEAK (honesty). A compliance page must carry only real documents. |
| WEAK | 11 | `/lpg-cylinder-sizes-in-pakistan/` | 3/1/1/1/2/2/1 | Money / home / delivery | rewrite. Add tare weight, height, diameter, valve type, price per size and typical days of use per size, from real supplier specs. This page is the strongest candidate to become Good. |
| WEAK | 11 | `/lpg-kit-price-in-pakistan/` | 1/1/2/3/2/2/0 | R3 commercial | — |
| WEAK | 11 | `/lpg-stove-price-in-pakistan/` | 1/2/1/2/2/2/1 | Shop / appliances | WEAK by rule. Either publish a verified price band or retitle (for example "LPG stoves in Pakistan: what to compare"). |
| WEAK | 11 | `/ogra-lpg-regulations-pakistan/` | 2/2/1/3/2/1/0 | R2 guides / safety | — |
| WEAK | 11 | `/partner-standards/` | 3/2/1/1/2/2/0 | Trust / other | WEAK (draft language, unverified claims). |
| WEAK | 11 | `/pricing-policy/` | 2/2/1/1/2/2/1 | Trust / other | WEAK (the policy is broken by the site's own data). |
| WEAK | 10 | `/become-an-lpg-distributor/` | 2/1/1/2/2/2/0 | R3 commercial | — |
| WEAK | 10 | `/contact/` | 3/1/0/0/3/3/0 | Trust / other | WEAK (honesty). Without the images this is a Borderline-12 page. |
| WEAK | 10 | `/industries/` | 2/1/1/2/1/2/1 | Industries | WEAK (link hub). |
| WEAK | 10 | `/lpg-bowser/` | 2/1/1/2/2/1/1 | R3 commercial | — |
| WEAK | 10 | `/lpg-companies-in-pakistan/` | 2/2/1/3/1/1/0 | R2 guides / safety | — |
| WEAK | 10 | `/lpg-cylinder-price-in-pakistan/` | 2/2/1/1/2/1/1 | Money / home / delivery | rewrite. Get deposit and new-empty ranges per size from the owner and publish them, or retitle to "LPG cylinder gas cost by size" and merge into the flagship. |
| WEAK | 10 | `/lpg-cylinder-refill/` | 3/2/1/0/1/2/1 | R1 cylinders | rewrite. Remove the placeholders, state the refill and exchange process, and add the test-date rule, a turnaround and an actual price. |
| WEAK | 10 | `/lpg-cylinders/12-kg-domestic-cylinder/` | 3/2/1/0/1/2/1 | R1 cylinders | rewrite. Remove every `[needs confirmation]`. Add the real empty weight, dimensions, deposit amount and a days-per-cylinder table by household type. |
| WEAK | 10 | `/lpg-cylinders/45-kg-commercial-cylinder/` | 3/2/1/0/1/2/1 | R1 cylinders | rewrite. Add the empty weight, dimensions, deposit, a restaurant consumption table (cylinders per week by burner count) and the storage rule from OGRA or the safety review. |
| WEAK | 10 | `/lpg-in-balochistan/` | 2/1/1/2/2/1/1 | Cities / provinces | WEAK. |
| WEAK | 10 | `/lpg-in-punjab/` | 2/1/1/2/2/1/1 | Cities / provinces | WEAK. |
| WEAK | 10 | `/lpg-in-sindh/` | 2/1/1/2/2/1/1 | Cities / provinces | WEAK. |
| WEAK | 10 | `/lpg-near-me/` | 2/1/1/2/2/1/1 | R3 commercial | — |
| WEAK | 10 | `/lpg-price-in-pakistan/` | 2/2/1/1/2/1/1 | Money / home / delivery | — |
| WEAK | 10 | `/lpg-supply-in-pakistan/` | 2/1/1/2/2/1/1 | R2 guides / safety | — |
| WEAK | 10 | `/ogra-lpg-notified-price/` | 2/2/1/1/2/1/1 | Money / home / delivery | merge with `/history/`. Make this URL the single "OGRA notified price and history" page, with the real notification PDF or screenshot and the delta table. |
| WEAK | 10 | `/shop/` | 2/1/0/2/2/2/1 | Shop / appliances | WEAK. A link hub for pages that are themselves quote forms. |
| WEAK | 9 | `/about/` | 2/2/1/0/2/2/0 | Trust / other | WEAK (honesty, draft language). |
| WEAK | 9 | `/delivery-areas/` | 2/1/1/1/1/2/1 | Money / home / delivery | rewrite. Build a table with city, partners, 24h-open count, localities and delivery confirmed (Y/N), and reconcile the delivery-time wording. |
| WEAK | 9 | `/lpg-cylinders/` | 2/2/1/0/2/1/1 | Money / home / delivery | rewrite. Remove the draft Notes, use real marking photos or none, and make this a true hub with a sizes table, a stock matrix and prices. |
| WEAK | 9 | `/lpg-cylinders/composite-fiber-cylinder/` | 2/2/1/0/1/2/1 | R1 cylinders | hold-noindex until stock, sizes, brand, price and a certification reference are confirmed. Then rewrite. |
| WEAK | 9 | `/lpg-home-delivery/` | 2/2/1/1/1/1/1 | Money / home / delivery | rewrite. Give the real answers (fee, payment, hours, areas, delivery time by city) and drop the Gate L text and the duplicated sentences. |
| WEAK | 9 | `/lpg-in-islamabad/` | 2/2/1/0/2/1/1 | Cities / provinces | WEAK on honesty. Remove the test-order sentence until a dated, real test exists. |
| WEAK | 9 | `/lpg-in-karachi/` | 2/2/1/0/2/1/1 | Cities / provinces | WEAK (honesty). Highest-volume city, so fix first. |
| WEAK | 9 | `/lpg-in-lahore/` | 2/2/1/0/2/1/1 | Cities / provinces | WEAK (honesty). |
| WEAK | 9 | `/lpg-in-rawalpindi/` | 2/2/1/0/2/1/1 | Cities / provinces | WEAK (honesty). |
| WEAK | 9 | `/projects/` | 1/1/0/2/2/1/2 | Trust / other | WEAK. Cannot be Good until a consented project exists. |
| WEAK | 8 | `/about/haroon-rasheed/` | 1/1/0/1/2/1/2 | Trust / other | WEAK. Redirect to `/about/`. |
| WEAK | 8 | `/lpg-cylinders/5-kg-cylinder/` | 3/1/1/0/1/1/1 | R1 cylinders | merge into `/lpg-cylinder-sizes-in-pakistan/`. Hold-noindex. |
| WEAK | 8 | `/lpg-in-burewala/` | 2/1/0/2/2/0/1 | Cities / provinces | WEAK. |
| WEAK | 8 | `/lpg-in-faisalabad/` | 2/1/0/2/2/0/1 | Cities / provinces | WEAK. |
| WEAK | 8 | `/lpg-in-hyderabad/` | 2/1/0/2/2/0/1 | Cities / provinces | WEAK. |
| WEAK | 8 | `/lpg-in-peshawar/` | 2/1/0/2/2/0/1 | Cities / provinces | mostly template. WEAK. |
| WEAK | 8 | `/lpg-in-quetta/` | 2/1/0/2/2/0/1 | Cities / provinces | WEAK. |
| WEAK | 7 | `/lpg-price-in-pakistan/[city]/` | 2/1/0/1/2/0/1 | Money / home / delivery | — |
| WEAK | 7 | `/lpg-price-per-kg-in-pakistan/` | 2/1/1/1/1/0/1 | Money / home / delivery | merge into `/lpg-price-in-pakistan/` with a 301. If a separate URL is kept, it needs a distinct angle (per-kg history and per-kg comparisons by size). |
| WEAK | 5 | `/lpg-in-azad-kashmir/` | 1/0/0/2/1/0/1 | Cities / provinces | WEAK. |
| WEAK | 5 | `/lpg-in-gilgit-baltistan/` | 1/0/0/2/1/0/1 | Cities / provinces | WEAK. |
| WEAK | 5 | `/lpg-in-khyber-pakhtunkhwa/` | 1/0/0/2/1/0/1 | Cities / provinces | WEAK. A shell with 2 FAQs. |
| WEAK | — | `/services/lpg-cylinder-testing-and-inspection/` | 2/1/1/1/2/2/1 | Services | WEAK. Fix the meta or add the real test scope and who performs it. |
| BORDERLINE | 18 | `/tools/lpg-btu-kwh-converter/` | 3/3/2/3/3/3/1 | Tools | Borderline (gated). |
| BORDERLINE | 18 | `/tools/lpg-vs-diesel-cost-calculator/` | 3/3/3/2/3/3/1 | R2 guides / safety | Borderline (gated). Becomes GOOD when H-4 is fixed and a static worked example is added. |
| BORDERLINE | 18 | `/what-to-do-if-you-smell-gas/` | 3/3/2/3/3/3/1 | R2 guides / safety | — |
| BORDERLINE | 18 | `/why-lpg-prices-change-in-pakistan/` | 3/3/2/2/3/3/2 | Money / home / delivery | keep. To reach Good, add a dated, cited cause for Oct 2026 (Aramco CP and exchange rate), a |
| BORDERLINE | 17 | `/lpg-composition-and-properties/` | 3/3/2/3/2/2/2 | R2 guides / safety | — |
| BORDERLINE | 17 | `/lpg-cylinder-blast-causes-and-prevention/` | 3/3/3/2/3/2/1 | R2 guides / safety | — |
| BORDERLINE | 17 | `/lpg-regulator-problems-and-repair/` | 3/3/3/2/2/2/2 | R2 guides / safety | — |
| BORDERLINE | 17 | `/lpg-vs-lng/` | 3/3/2/3/2/3/1 | R2 guides / safety | — |
| BORDERLINE | 17 | `/propane-vs-butane/` | 3/3/3/2/2/2/2 | R2 guides / safety | — |
| BORDERLINE | 17 | `/tools/lpg-litre-to-kg-converter/` | 3/2/2/3/3/3/1 | Tools | Borderline (gated). Close. |
| BORDERLINE | 17 | `/tools/lpg-tank-size-calculator/` | 3/2/2/3/3/3/1 | Tools | Borderline (gated). |
| BORDERLINE | 17 | `/tools/lpg-vs-sui-gas-cost-calculator/` | 3/2/3/2/3/3/1 | R2 guides / safety | Borderline (gated). |
| BORDERLINE | 16 | `/lpg-regulators/` | 3/3/2/2/2/2/2 | R2 guides / safety | — |
| BORDERLINE | 16 | `/lpg-vs-sui-gas/` | 3/3/2/2/2/3/1 | R2 guides / safety | — |
| BORDERLINE | 15 | `/auto-lpg-in-pakistan/` | 3/2/2/3/2/2/1 | R3 commercial | — |
| BORDERLINE | 15 | `/lpg-leak-detector/` | 3/2/2/2/2/3/1 | R2 guides / safety | — |
| BORDERLINE | 15 | `/lpg-vaporizers/` | 3/2/2/2/2/3/1 | Shop / appliances | Borderline. Most distinct page in the group. |
| BORDERLINE | 14 | `/how-to-choose-a-licensed-lpg-supplier/` | 3/2/2/2/2/2/1 | R2 guides / safety | — |
| BORDERLINE | 14 | `/industries/poultry-farms/` | 3/2/2/2/1/3/1 | Industries | Borderline; the most distinct sector page. |
| BORDERLINE | 14 | `/industries/weddings-and-events/` | 3/2/2/2/1/3/1 | Industries | Borderline; distinct intent. |
| BORDERLINE | 14 | `/lpg-filling-stations/` | 3/2/2/2/2/2/1 | R3 commercial | — |
| BORDERLINE | 14 | `/lpg-heaters-in-pakistan/` | 3/2/2/2/2/2/1 | Shop / appliances | Borderline. |
| BORDERLINE | 14 | `/lpg-shortage-pakistan/` | 2/2/2/2/2/3/1 | R2 guides / safety | — |
| BORDERLINE | 14 | `/services/lpg-safety-audit-and-inspection/` | 3/2/2/2/2/2/1 | R2 guides / safety | Borderline. Best of the services. |
| BORDERLINE | 14 | `/what-is-lpg/` | 3/2/1/3/2/2/1 | R2 guides / safety | — |
| BORDERLINE | 13 | `/bulk-lpg-supply/` | 3/2/1/2/2/2/1 | R2 guides / safety | — |
| BORDERLINE | 13 | `/industries/hospitals/` | 3/2/2/2/1/2/1 | Industries | Borderline. |
| BORDERLINE | 13 | `/industries/housing-societies/` | 3/2/2/2/1/2/1 | Industries | Borderline. |
| BORDERLINE | 13 | `/lpg-in-abbottabad/` | 2/2/2/2/2/2/1 | Cities / provinces | Borderline. |
| BORDERLINE | 13 | `/lpg-in-gilgit/` | 2/2/2/2/2/2/1 | Cities / provinces | Borderline. One of the more useful pages in the group. |
| BORDERLINE | 13 | `/lpg-in-gujranwala/` | 2/2/2/2/2/2/1 | Cities / provinces | Borderline. |
| BORDERLINE | 13 | `/lpg-in-multan/` | 2/2/2/2/2/2/1 | Cities / provinces | Borderline. Source the census figure; this is the best template instance. |
| BORDERLINE | 13 | `/lpg-plant-in-pakistan/` | 3/2/1/2/2/2/1 | R3 commercial | — |
| BORDERLINE | 13 | `/lpg-vs-cng/` | 3/2/1/2/2/2/1 | R2 guides / safety | — |
| BORDERLINE | 13 | `/services/boiler-and-furnace-conversion-to-lpg/` | 3/2/1/2/2/2/1 | Services | Borderline. |
| BORDERLINE | 13 | `/services/lpg-maintenance-and-amc/` | 3/2/1/2/2/2/1 | Services | Borderline. |
| BORDERLINE | 13 | `/services/lpg-manifold-and-cylinder-bank-installation/` | 3/2/1/2/2/2/1 | Services | Borderline. |
| BORDERLINE | 13 | `/services/lpg-pipeline-installation/` | 3/2/1/2/2/2/1 | Services | Borderline. |
| BORDERLINE | 13 | `/services/lpg-storage-tank-installation/` | 3/2/1/2/2/2/1 | Services | Borderline. |
| BORDERLINE | 13 | `/shop/commercial-lpg-burners/` | 2/2/2/2/2/2/1 | R3 commercial | Borderline. |
| BORDERLINE | 13 | `/tools/lpg-cylinder-price-calculator/` | 3/2/1/2/3/1/1 | Tools | Borderline. Gas weight × rate is a commodity calculation. |
| BORDERLINE | 12 | `/how-it-works/` | 2/2/1/2/2/2/1 | Trust / other | Borderline. |
| BORDERLINE | 12 | `/how-lpg-is-produced-and-supplied/` | 3/2/1/2/2/1/1 | R2 guides / safety | — |
| BORDERLINE | 12 | `/industrial-lpg-supply/` | 2/2/2/2/1/2/1 | R2 guides / safety | — |
| BORDERLINE | 12 | `/industries/food-processing/` | 3/2/1/2/1/2/1 | Industries | Borderline. |
| BORDERLINE | 12 | `/industries/hotels/` | 3/2/1/2/1/2/1 | Industries | Borderline. |
| BORDERLINE | 12 | `/industries/restaurants/` | 3/2/1/2/1/2/1 | Industries | Borderline. Generic checklist. |
| BORDERLINE | 12 | `/industries/textile/` | 3/2/2/2/1/1/1 | Industries | Borderline. Differentiation is weak against `manufacturing`. |
| BORDERLINE | 12 | `/lpg-price-in-pakistan/history/` | 2/1/2/2/2/2/1 | Money / home / delivery | keep and fix. Backfill at least 12–24 months from OGRA's archive, with the real notification links, before publish. Hold-noindex until then. |
| BORDERLINE | 12 | `/lpg-safety/` | 3/2/1/2/2/1/1 | R2 guides / safety | — |
| BORDERLINE | 12 | `/order-lpg/` | 3/2/1/2/1/2/1 | Money / home / delivery | keep and fix. Rewrite the `terms` strings into prose, remove or substantiate the "manufactures" claim, and drop the app-fiction image. |
| BORDERLINE | 12 | `/services/` | 2/2/1/2/2/2/1 | Services | Borderline. |
| BORDERLINE | 12 | `/services/lpg-air-sng-systems/` | 3/1/1/2/2/2/1 | Services | Borderline (bottom of the group). |
| BORDERLINE | 12 | `/shop/lpg-hoses-and-accessories/` | 2/2/2/2/2/1/1 | Shop / appliances | Borderline. |
| BORDERLINE | 11 | `/commercial-lpg-supply/` | 2/3/1/2/1/1/1 | R2 guides / safety | — |
| BORDERLINE | 11 | `/industries/manufacturing/` | 3/2/1/2/1/1/1 | Industries | Borderline (bottom). Merge or differentiate by process. |
| BORDERLINE | 11 | `/lpg-business-in-pakistan/` | 2/2/1/2/2/1/1 | R3 commercial | — |
| BORDERLINE | 11 | `/lpg-marketing-company-vs-distributor-vs-dealer/` | 3/2/1/2/2/1/0 | R2 guides / safety | — |
| BORDERLINE | 11 | `/lpg-shops-and-agencies/` | 2/2/1/2/2/1/1 | R3 commercial | — |
| GOOD | 19 | `/tools/lpg-cylinder-duration-calculator/` | 3/2/3/3/3/3/2 | R1 cylinders | keep. Add appliance presets and cite the burn-rate source. It is the onl |

---

## Counts by cluster

| Cluster | Good | Borderline | Weak | Other |
|---|---:|---:|---:|---:|
| Cities / provinces | 0 | 4 | 18 | 0 |
| Industries | 0 | 9 | 1 | 0 |
| Money / home / delivery | 0 | 3 | 10 | 0 |
| R1 cylinders | 1 | 0 | 6 | 0 |
| R2 guides / safety | 0 | 22 | 3 | 0 |
| R3 commercial | 0 | 6 | 4 | 0 |
| Services | 0 | 7 | 1 | 0 |
| Shop / appliances | 0 | 3 | 3 | 0 |
| Tools | 0 | 4 | 0 | 0 |
| Trust / other | 0 | 1 | 10 | 0 |

---

## The only pages that clear GOOD (strict)
- `/tools/lpg-cylinder-duration-calculator/` — 19/21 — keep. Add appliance presets and cite the burn-rate source. It is the onl

## Closest to Good (Borderline with score ≥16 — one gate away)
- `/tools/lpg-btu-kwh-converter/` — 18/21 — Borderline (gated).
- `/tools/lpg-vs-diesel-cost-calculator/` — 18/21 — Borderline (gated). Becomes GOOD when H-4 is fixed and a static worked example is added.
- `/what-to-do-if-you-smell-gas/` — 18/21 — gated
- `/why-lpg-prices-change-in-pakistan/` — 18/21 — keep. To reach Good, add a dated, cited cause for Oct 2026 (Aramco CP and exchange rate), a
- `/lpg-composition-and-properties/` — 17/21 — gated
- `/lpg-cylinder-blast-causes-and-prevention/` — 17/21 — gated
- `/lpg-regulator-problems-and-repair/` — 17/21 — gated
- `/lpg-vs-lng/` — 17/21 — gated
- `/propane-vs-butane/` — 17/21 — gated
- `/tools/lpg-litre-to-kg-converter/` — 17/21 — Borderline (gated). Close.
- `/tools/lpg-tank-size-calculator/` — 17/21 — Borderline (gated).
- `/tools/lpg-vs-sui-gas-cost-calculator/` — 17/21 — Borderline (gated).
- `/lpg-regulators/` — 16/21 — gated
- `/lpg-vs-sui-gas/` — 16/21 — gated

---

## Cross-cutting failures (site-wide)

1. **Draft / process language on public pages** — `[needs confirmation]`, Gate L, owner pending, safety "awaiting sign-off".
2. **Price authenticity gap** — UI says team-checked OGRA; `prices.json` still cites Dawn/Nation/ARY + PDF recheck.
3. **Fake-feeling delivery proof** — four cities share identical 60-minute "test order" while data says target.
4. **AI creatives presented as real** — office, licence, inspection cert, leadership, delivery scenes.
5. **Promise mismatch** — `*-price*` URLs without prices; companies page without companies; projects with zero projects; Skardu/Murree/Muzaffarabad H1s promise supply while body says no supplier listed.
6. **Template shells** — dynamic city/province hubs, industries, services `stdProcess()`, appliance pages.
7. **Network count inconsistency** — 347 vs summed table rows (~329) depending on page.

---

## What to do next (ordered)

1. **Honesty sweep (no new facts):** strip draft markers, Gate L, pending-owner lines, fix 60-min wording to "target", caption AI as illustrative or remove from trust pages, reconcile partner-count wording.
2. **Attach OGRA PDF/screenshot** and stop claiming primary verification until done.
3. **Owner numbers:** deposit/exchange, empty weights, delivery fee rule, 3–5 appliance SKUs with prices, one consented project, real photos.
4. **Rewrite money flagship** as one job; merge or heavily differentiate per-kg / OGRA / city-price duplicates.
5. **City hubs:** write ≥5 real local facts or keep noindex; fix province hubs with empty city arrays.
6. **Retitle or fill** stove/geyser/kit price URLs; empty shop/projects stay noindex.

For quotes and per-page evidence, open the three `audit/strict_*.md` files — this V2 file is the index and the harsh scoreboard.

