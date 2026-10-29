# Content quality audit: thelpgco.pk (`lpg-website`)

**Audited:** 28 Oct 2026 · **Scope:** copy and content quality only (not design, not technical SEO) · **Source of truth:** `app/**/page.tsx`, shared components (`components/r4plus/*`, `PriceBlock`), data files (`data/*.json`), `lib/services.ts`, `lib/media.ts`, `docs/seo-plan/page-map.csv`, `data/pages.json`.

**What was graded:** 119 built URLs in the registry (all currently `status: review`). 2 legal pages (`/privacy/`, `/terms/`) are not scored. `/gallery/` and `/shop-preview/` are excluded as thin and noindex. SERP positions are not assessed and none are claimed.

**How much was actually read:**
- **81 URLs** were scored from direct reading. For template families (dynamic city hub, static city hub, industries, appliances, tools, services) the template was read once and applied to every clone.
- **36 URLs** are **provisional (P)**. For these I read the H1, intro, H2 outline and metrics, not every paragraph. Treat their grades as likely, not confirmed.

---

## Rubric (how we decide good vs bad)

Each criterion is scored 0–3 (0 = fails, 1 = weak, 2 = acceptable, 3 = strong).

| # | Criterion | 3 means | 0–1 means |
|---|---|---|---|
| A | Answer-first | H1 and the first 2–3 sentences answer the search intent | Intro describes the page or the process, or promises something the page does not give |
| C | Coverage | what / cost / how / where / risks / next step (or the page-type equivalent), with no unrelated dumping | A key question is skipped, or the page is only a link hub |
| G | Information gain | ≥3 concrete extras a competitor lacks (tables, worked numbers, checklists, calculators, honest limits, local specifics) | Only generic definitions, formulas repeated from sibling pages, or form prompts |
| H | Facts honesty | Nothing invented. Unknowns are hedged. No fake superlatives. | Unverifiable claims stated flat, internal/draft language shown to users, or contradictions between pages |
| K | On-page craft | One H1, useful H2s, FAQ where the intent needs one, 2–5 internal links, readable paragraphs | Link dumps (>8), repeated boilerplate blocks, visible `[needs confirmation]` markers, internal jargon |
| D | Differentiation | Clearly different from siblings in intent and content | Same intent or same component as a sibling |
| M | Media alts | Descriptive alt, natural primary keyword only when the image really shows that | Alt promises something the image or page does not show; no content image on a page that needs one |

**Overall grade** (max 21):

| Grade | Rule |
|---|---|
| **Good** | Total ≥ 16 **and** A ≥ 2, G ≥ 2, H ≥ 2 |
| **Borderline** | 10–15, or ≥ 16 with a gating flaw |
| **Weak** | Total ≤ 9, or H = 0, or A = 0 |

"Good" means good **content-wise**. It does not mean the page has cleared the publication gates (owner facts, verified price, real photos).

---

## Summary counts (Good / Borderline / Weak)

| | Good | Borderline | Weak | Not scored | Total |
|---|---:|---:|---:|---:|---:|
| **All 119 URLs** | **15** | **74** | **28** | 2 | 119 |
| of which direct or template read | 10 | 43 | 28 | 0 | 81 |
| of which provisional (P) | 5 | 31 | 0 | 0 | 36 |

**What the numbers say, bluntly**

1. **The explainer and safety pages are good, and the sales and local pages are thin.** The 15 Good pages are all "how it works" or "safety" content: `why-lpg-prices-change`, `lpg-vs-sui-gas`, the blast guide, the smell-gas page, `propane-vs-butane`, regulators, the duration calculator, the 11.8 kg SKU and others. The pages that earn leads (price, delivery, city hubs, appliances, services) are Borderline or Weak.
2. **The weakness is missing business facts, not weak writing.** Nowhere on the site is there a deposit amount, an empty-cylinder weight or price, a delivery fee, an appliance price, a real project or a real photo. Copy has been engineered around the gaps ("we confirm before you agree" appears about 91 times in 38 files). Pages are honest but contain little a visitor can use.
3. **A large share of the 119 URLs are template shells.** 28 are Weak, and most Borderline city, industry and appliance pages are a shared template with a small unique layer (about 120–290 words each). The site looks like 119 pages, but fewer than half carry substantial page-specific copy.
4. **Honesty is mostly strong, with five exceptions that matter** (listed under "Honesty flags to fix before indexing").
5. **Lexical duplication is low** (5-gram overlap between price pages is 0.02–0.11, and between sibling SKU pages 0.01–0.07). Nothing is copy-pasted. The duplication that hurts is **intent duplication** (four pages answering "LPG price" with the same `PriceBlock` and the same four-line formula) and **component duplication** (same Notes and the same three-roles block).

**What is clean across the site** (checked by script across all `app/**/*.tsx`):
- No `NEEDS FACT` markers.
- No competitor brand names. The only "company" names are SNGPL and SSGC on `/lpg-vs-sui-gas/`, which are public utilities.
- No "keyword" in public prose. The one hit is a code comment.
- No "cheapest", "#1" or "guaranteed" claims made about us. Those words appear only in disclaimers and in FAQ answers that warn against them.
- No invented prices, stock counts or partner names.
- The OGRA price arithmetic is correct (279.34 × 11.8 = Rs 3,296, and the Rs 5/10/20/50 table on `why-lpg-prices-change` computes correctly).

---

## Honesty flags to fix before indexing

These are the cases where the rubric's "facts honesty" criterion is at risk. They are more important than style.

| # | Flag | Where | Evidence |
|---|---|---|---|
| H-1 | **Four city hubs claim a measured delivery time that is really a target** | `lpg-in-islamabad/`, `rawalpindi/`, `lahore/`, `karachi/` (dynamic hub, `app/lpg-hub/[slug]/page.tsx`) | `city-overrides.json` sets `testOrderMinutes: 60` for all four cities, with `verifiedOn` on the same date (2026-10-27). The FAQ renders: "In our own test order in {city} the cylinder arrived in 60 minutes." The file's own `_readme` says the figure is the "delivery target ~1 hour". Four identical results from "tests" will read as invented. |
| H-2 | **"OGRA-licensed since 1999"** on the home page | `app/page.tsx` ("OGRA-licensed since {site.foundedYear}") | 1999 is the incorporation year used on `/about/` ("registered since 1999"). OGRA itself was constituted in 2002, so a licence held "since 1999" needs the owner's licence issue date before this line stays. |
| H-3 | **"We work with 121 distributors" in Karachi (and 46, 33 and so on elsewhere)** | Dynamic hub FAQ and intro; home; commercial; companies | `data/network.json` source is "Owner-supplied distributor list … Counts only". Stating "we work with N distributors" or "N partners" implies a relationship with each. Safer wording: "N suppliers listed in our network data". Static hubs already use this safer wording. |
| H-4 | **"Verified" price is verified against news reports, not the OGRA notification** | `data/prices.json` → `PriceBlock` | `sourceNote`: "as reported from … (Dawn / The Nation / ARY summarising OGRA) … Re-check PDF on ogra.org.pk when the file is posted." The block still says "Checked by THE LPG CO. team … Official OGRA source" on a page that markets itself as the verified rate. Attach the OGRA PDF or a screenshot before indexing. |
| H-5 | **Draft and owner-process language shown to users** | `about` ("Visuals on this site are for partner preview; camera photos … will replace temporary creatives"), `lpg-cylinders` ("still pending owner photos", "until the owner documents them"), `lpg-cylinder-price-in-pakistan` ("until the owner documents them"), `lpg-home-delivery` and `lpg-price-in-pakistan/[city]` ("Gate L") | Internal workflow shown to customers. The cylinders hub also **contradicts** `commercial-terms.json` and `/order-lpg/`, which do state exchange and deposit terms. |
| H-6 | **Image alts and captions assert real-world artefacts the site does not have** | `lib/media.ts` | `MEDIA_STATUS.md` says the images are a "ChatGPT-edited pack … temporary creatives". Alts and captions include "THE LPG CO. PAKISTAN headquarters", "OGRA licence document on desk", "LPG cylinder testing and inspection certificate - passed inspection", "Leadership portrait", "Customer service desk". `/contact/` and `/licences-and-compliance/` show these as if real. A "Composite LPG cylinder label 12.5 kg - Made in Pakistan" alt states a size the composite page deliberately avoids stating. |

---

## By wave / cluster table with path, grade, top issues

**Wave** is the phase (P1–P4) from `page-map.csv`. Scores are A/C/G/H/K/D/M. Rows ending in (P) are provisional.

### Cluster 0: Money pages (price, cylinders hub, delivery, order, home)

| Wave | Path | Grade (score) | A/C/G/H/K/D/M | Top issues |
|---|---|---|---|---|
| P1 | `/` | Borderline (13) | 2/2/1/1/2/3/2 | H1 "LPG cylinders and gas supply across Pakistan" says what we are, not what the visitor gets. No price or timing in the hero text (the price block is lower down). "OGRA-licensed since 1999" is an unverified claim (H-2). "347 listed supply partners in 51 cities" in the hero bullet reads as a partnership claim (H-3). |
| P1 | `/lpg-price-in-pakistan/` | Borderline (11) | 2/2/1/2/2/1/1 | The flagship is hedged as if the price might not exist: "the figure we have verified for this month (when available)", "If you see the amber 'being updated' notice". With a verified rate on file, this reads as a draft. Only extra is `PriceBlock`. The copy repeats the same four formula lines as three sibling pages. The month-on-month change (Rs 258.65 → 279.34, +8.0%) is already in the data and is only shown on `/history/` and `/why-lpg-prices-change/`. It is missing from the page that has the search volume. A fake FAQ ("What does 'aaj ka rate' / LPG ki kimat mean on this page?") is keyword-fishing in prose. Says "history … will live on this cluster", which is future-tense draft voice. |
| P1 | `/lpg-cylinder-price-in-pakistan/` | Borderline (11) | 2/2/1/2/2/1/1 | Strong framing (gas vs shell vs delivery) but the shell and delivery rows are empty: "Standing deposit and delivery tables are not published until the owner documents them". Visitors searching "price of lpg cylinder" get gas-only numbers, which are the part they can calculate themselves. "When people ask for the price of lpg cylinder in pakistan, they often mean one number" is SEO voice. |
| P1 | `/lpg-price-per-kg-in-pakistan/` | **Weak (9)** | 2/2/0/2/2/0/1 | Near-duplicate in intent: same `PriceBlock`, same "How to read this page" Note, same formula bullets. The only unique content is a paragraph saying what "per kg" means. "Searchers ask for lpg 1kg price today pakistan, lpg per kg price, or aaj ka rate" is SEO voice. |
| P1 | `/ogra-lpg-notified-price/` | Borderline (11) | 2/2/1/2/2/1/1 | Good in concept (how to read a notification, history table). Only 2 rows of history. No notification screenshot or PDF link, although `media.ograPriceScreen` exists. Overlaps `/history/` on the history table. |
| P2 | `/lpg-price-in-pakistan/history/` | Borderline (15) | 3/2/2/3/2/2/1 | Best of the price cluster: MoM column, bar chart, planning steps, honest "a trend line needs at least three checked months". Becomes Good at 3+ months. With 2 data points, the "history" is one delta. |
| P2 | `/why-lpg-prices-change-in-pakistan/` | **Good (19)** | 3/3/3/3/2/3/2 | See Best 10. |
| P1 | `/lpg-price-in-pakistan/karachi/`, `/lahore/` | **Weak (7)** | 2/1/0/1/2/0/1 | By design these are noindex unless a city-specific price exists. So the content is a duplicate of the national page with a city name, a landmark photo, "{121} distributors" (H-3) and "Gate L". The page itself says the rate is identical nationwide. |
| P1 | `/lpg-cylinders/` | Borderline (12) | 2/2/1/1/2/2/2 | A hub with no price and no sizes table of its own. "Photo guide pending" Note and "we do not publish standing exchange terms until the owner documents them" (H-5, and wrong). Steel vs composite is only bullet-deep. |
| P1 | `/lpg-home-delivery/` | Borderline (12) | 2/3/1/2/1/1/2 | The intro describes process, not what the visitor most wants (who, how soon, how much). Repeats the three-roles block (also on `/order-lpg/`, `/how-it-works/`, `/about/`, city price page). "Gate L" shown to users. City chips duplicate home, delivery-areas, near-me and commercial. "Partners verified over time" Note. |
| P1 | `/order-lpg/` | Borderline (12) | 3/2/1/2/2/1/1 | Answer-first intro is good. Content is mostly terms boilerplate (`terms.*`) and repeats the lines on home-delivery. No example order or sample confirmation message. No content image. |
| P1 | `/delivery-areas/` | **Weak (9)** | 2/1/0/2/2/1/1 | A link list: 9 chips, 6 province chips and a comma-run of about 40 city names. The delivery target (about one hour) that exists in `site.deliveryTarget` is missing here. The Note says "we do not promise one time for every city", which contradicts the one-hour target used on home and order. |

### Cluster R1: Cylinder SKUs and cylinder explainers

| Wave | Path | Grade (score) | A/C/G/H/K/D/M | Top issues |
|---|---|---|---|---|
| P2 | `/lpg-cylinders/12-kg-domestic-cylinder/` | **Good (16)** | 3/3/2/2/2/2/2 | Best SKU: explains 11.8 vs 12 kg, bill-split table, "empty weight is not gas weight" Note. Low-end Good: 4 visible `[needs confirmation]` markers, empty weight and height unknown, deposit unknown. |
| P2 | `/lpg-cylinders/45-kg-commercial-cylinder/` | Borderline (15) | 3/2/2/2/2/2/2 | Good domestic-vs-commercial table and handling list. **6** visible `[needs confirmation]`. No tare weight, no cylinders-per-week guide, no restaurant sizing example. |
| P3 | `/lpg-cylinders/5-kg-cylinder/` | Borderline (13) | 3/2/1/2/2/1/2 | Clone of the 11.8 kg page with numbers swapped. 4 markers. No 5 kg-specific facts (carry weight, which valve and regulator it takes, who actually stocks it). |
| P2 | `/lpg-cylinders/composite-fiber-cylinder/` | Borderline (13) | 2/2/1/2/2/2/2 | Honest, but there is no price block, no sizes and no cities. "Offered in some sizes — [needs confirmation]". 6 markers. A composite cylinder page without a size or a price cannot satisfy "lpg fiber cylinder". The alt "Composite … label 12.5 kg" conflicts with the copy. |
| P1 | `/lpg-cylinder-sizes-in-pakistan/` | Borderline (14) | 3/2/1/2/2/2/2 | The sizes page has no tare weights or dimensions: "Exact empty weight and height … are not on file yet". It also carries no price block. The "15 kg" size is presented as a standard size without evidence in the page. |
| P2 | `/lpg-cylinder-refill/` | Borderline (14) | 3/2/1/2/2/2/2 | Clear refill-vs-exchange table, but "Shell: … [needs confirmation]". `/lpg-companies-in-pakistan/` points readers here for "exchange and deposit terms", which this page does not contain. |
| P2 | `/new-lpg-connection/` | Borderline (15) | 3/2/2/2/2/2/2 | Good first-use checklist. The search intent ("empty cylinder price") is not answered: deposit and purchase amounts are `[needs confirmation]` ×6. |

### Cluster R2: Guides, safety and comparison

| Wave | Path | Grade (score) | Top issues |
|---|---|---|---|
| P2 | `/lpg-vs-sui-gas/` | **Good (19)** | Worked MMBTU arithmetic from the live price, switch checklist, honest "usually not cheaper". See Best 10. |
| P2 | `/lpg-cylinder-blast-causes-and-prevention/` | **Good (19)** | Cause table, myths vs facts, prevention checklist. |
| P1 | `/what-to-do-if-you-smell-gas/` | **Good (18)** | Action-first, "do not use the order form", odorant explanation. Has no content image. |
| P3 | `/propane-vs-butane/` | **Good (18)** | Real physical-property table with hedges ("approx.") and a Pakistan cold-region angle. |
| P3 | `/lpg-regulators/` | **Good (17)** | Type table, flow-by-appliance table, fitting steps. |
| P1 | `/lpg-shortage-pakistan/` | **Good (16)** | Honest "no sourced report on file". Weak spot: the "Dated and sourced updates" section is empty ("This log is empty on purpose"). It is honest but is a section with no content. |
| P2 | `/lpg-leak-detector/` (P), `/lpg-regulator-problems-and-repair/` (P), `/lpg-vs-cng/` (P), `/lpg-composition-and-properties/` (P), `/how-to-choose-a-licensed-lpg-supplier/` (P) | Good (P) | Strong outlines, 600–900 words, tables, 6–7 FAQs. Not read line by line. |
| P1 | `/lpg-safety/` (P) | Borderline (P) | Pillar safety page; outline is right, 535 words. Needs a read for specifics and depth. |
| P1 | `/what-is-lpg/` (P) | Borderline (P) | 8 H2s, 507 words, no content image. The "lpg stand for" intent is answered in the H1. Depth unverified. |
| P2–P3 | `/lpg-vs-lng/`, `/how-lpg-is-produced-and-supplied/`, `/lpg-supply-in-pakistan/`, `/ogra-lpg-regulations-pakistan/`, `/lpg-marketing-company-vs-distributor-vs-dealer/` (all P) | Borderline (P) | Competent structure. `lpg-supply-in-pakistan` avoids tonnage, import and import-source figures on purpose ("We do not quote exact tonnages"), so it gives no information gain on "lpg importers in pakistan". |
| P2 | `/lpg-companies-in-pakistan/` | Borderline (14) | The H1 and intent are "list of companies". The page explains licensing and then says "We do not publish a ranked list". Honest and useful on licensing, but fails the intent and gives the visitor no way to proceed except our form. |
| P3 | `/lpg-near-me/` | Borderline (11) | "LPG near me" wants nearby places. Gets a form and the same chips as delivery-areas, home-delivery and commercial. |
| P3 | `/lpg-filling-stations/` | Borderline (15) | Useful split (cylinder plant vs vehicle station). "How listings will work" is a promise of future content. |

### Cluster R3: Commercial, bulk and B2B

| Wave | Path | Grade (score) | A/C/G/H/K/D/M | Top issues |
|---|---|---|---|---|
| P3 | `/bulk-lpg-supply/` | **Good (16)** | 3/3/2/3/2/2/1 | Cylinders vs bank vs tank table, quotation inputs, "What we do not claim" Note, 85% fill logic. No numbers (no tank sizes, no typical load). |
| P2 | `/commercial-lpg-supply/` | Borderline (15) | 3/3/2/3/1/2/1 | Good options table and quote-inputs list. **16 internal links** and a seven-item "Related pages" list. "Talk to us now" Note repeated on 11 pages. |
| P2 | `/industrial-lpg-supply/` | Borderline (14) | 3/2/2/3/1/2/1 | **19 internal links.** The use-by-application table is useful. Overlaps bulk, bowser and industries. |
| P4 | `/lpg-bowser/` | Borderline (13) | 3/2/1/3/2/1/1 | Good delivery steps. The "short answer" admits "we do not publish bowser prices, capacities or delivery times". Intent overlaps `/bulk-lpg-supply/` (same "who uses what" table). |
| P3 | `/lpg-business-in-pakistan/`, `/lpg-shops-and-agencies/`, `/lpg-plant-in-pakistan/`, `/become-an-lpg-distributor/` (P) | Borderline (P) | | Role and licence explainers. The "outside the biggest cities" recruiting line repeats. No numbers on margins, investment or licence cost, which is the information-gain opportunity. |
| P4 | `/auto-lpg-in-pakistan/` (P), `/lpg-kit-price-in-pakistan/` (P) | Borderline (P) | | The kit-price page has no price ("we do not publish prices we have not verified"). |

### Cluster R4+: Cities, provinces and industries (templates)

| Wave | Path | Grade (score) | Top issues |
|---|---|---|---|
| P1–P2 | `/lpg-in-karachi/`, `/islamabad/`, `/lahore/`, `/rawalpindi/` (dynamic hub) | **Weak (9)** | The only unique content is `city-overrides.json` local notes (3 bullets), a list of 8–10 locality names and counts. 60-minute "test order" (H-1). "We work with 121 distributors" (H-3). |
| P2 | `/lpg-in-peshawar/`, `/hyderabad/`, `/faisalabad/`, `/quetta/`, `/burewala/` (dynamic hub, no override) | **Weak (7)** | Template plus data swap. Locality lists look scraped and are used as service areas: Peshawar "Board", "Achini Payan", "Shāheen Town Tajabad". |
| P2 | `/lpg-in-punjab/`, `/sindh/`, `/khyber-pakhtunkhwa/`, `/balochistan/`, `/azad-kashmir/`, `/gilgit-baltistan/` | **Weak (6)** | A list of cities and counts plus 2 FAQs. No province-level facts (winter, terrain, supply route, cities beyond the list). |
| P2–P3 | `/lpg-in-multan/` (14), `/skardu/` (14), `/murree/` (15), `/abbottabad/` (P), `/gilgit/` (P), `/gujranwala/` (P), `/muzaffarabad/` (P) | Borderline | The best city template. 6 unique local "angles" each (snow and road delays in Murree and Skardu, commercial kitchens in Multan), honest "no supplier listed yet" notes. Issues: H1 "price, cylinder delivery and supply" promises more than the page can say where no supplier is listed (Skardu, Murree). Census figures (Multan about 2.2m, Gujranwala about 2.5m) have no source link. "Road and flight dependence" heading never mentions flights. About 40% of each page is the shared template. |
| P3–P4 | `/industries/*` (9) | Borderline (11–13) | See template risk. `hospitals` and `housing-societies` are the most distinct. `manufacturing` is a near-twin of `textile` (sector-data overlap 0.13, the highest in the set). |
| P3 | `/industries/` | Borderline (11) | Hub; thin. |

### Cluster R5+: Tools, appliances, shop and services

| Wave | Path | Grade (score) | Top issues |
|---|---|---|---|
| P3 | `/tools/lpg-cylinder-duration-calculator/` | **Good (17)** | Working calculator, reserve logic, worked table at 0.8 kg/day clearly labelled "not a typical household figure", leak-signal tip. |
| P3–P4 | `/tools/lpg-vs-sui-gas-cost-calculator/`, `/tools/lpg-vs-diesel-cost-calculator/` | Borderline (15) | Correct method (46 MJ/kg, 36 MJ/l) with editable assumptions. Pages have no worked example with real numbers, ~250–300 words each, no images. |
| P2–P4 | `/tools/lpg-cylinder-price-calculator/`, `/lpg-btu-kwh-converter/`, `/lpg-litre-to-kg-converter/`, `/lpg-tank-size-calculator/` (P) | Borderline (P) | Thin by nature (about 250–300 words). |
| P2 | `/lpg-stove-price-in-pakistan/` | **Weak (9)** | The H1 and URL promise a price. The page says "we do not list a rupee price". The alt "LPG stove price in Pakistan - two-burner stainless LPG gas stove" promises a price too. No model, no price band and no example. |
| P1 | `/lpg-geyser-price-in-pakistan/` | Borderline (11) | Same promise problem, but the CO / flue section and the instant-vs-storage split add real value. |
| P1/P3/P4 | `/lpg-heaters-in-pakistan/`, `/lpg-vaporizers/`, `/shop/lpg-hoses-and-accessories/` (P); `/shop/commercial-lpg-burners/` | Borderline (10–11) | `ApplianceInfoPage` template: "Stock and prices are confirmed on request" box, compare table, quote needs, safety bullets. No in-body links (only the related list). |
| P2 | `/shop/` | Borderline (13) | Honest: "There is no online checkout and no appliance price list yet." A catalogue with no products. |
| P3–P4 | `/services/` (P), `/services/*` (8 pages) | **Weak (9)** for the 8 | Each service page has about 120–210 words of unique copy. `stdProcess()` repeats the same 4-step process on all of them. No standards, no examples, no project, no image. "Work is carried out by our own team of engineers and technicians" has no evidence on the site. |

### Cluster Trust

| Wave | Path | Grade | Top issues |
|---|---|---|---|
| P1 | `/about/` | Borderline (12) | Preview-mode sentence (H-5), "competitive, manufacturer-direct pricing" (unquantified), the three-roles block repeated, no people, no history beyond "since 1999". |
| P1 | `/how-it-works/` | Borderline (10) | The intro "You always know who is supplying your gas" does not say how ordering works. Repeats roles text. |
| P2 | `/pricing-policy/` | Borderline (11) | Reasonable commitments. "Competitive market pricing" is a vague claim next to a "no cheapest slogans" line. |
| P3 | `/projects/` | Borderline (11) | Honest empty state. The intro "Real completed LPG installations, shown only with consent" sits above zero projects. Noindex until a project exists. |
| P2 | `/about/haroon-rasheed/` | Borderline (10) | Noindex. The URL and H1 mention a person who is, by owner decision, not named on the page. Retire or redirect to `/about/`. |
| P1–P2 | `/contact/`, `/complaints/`, `/editorial-policy/`, `/partner-standards/`, `/licences-and-compliance/`, `/our-network/` (P) | Borderline (P) | Short utility pages. `/contact/` and `/licences-and-compliance/` show AI-made "office" and "licence" images (H-6). |

---

## Worst 15 pages (fix first) with concrete rewrite notes

Ranked by (damage × traffic opportunity). The grade is in brackets. Some entries cover a group that shares one fix.

1. **`/lpg-price-in-pakistan/`** (Borderline 11, but the most valuable page, with the largest mapped search volume)
   - Cut every "when available" and "if you see the amber notice" hedge. Show the verified figure in the first screen with the OGRA effective date. Keep a single "not yet verified" fallback in `PriceBlock`, not in prose.
   - Add what the data already supports: **month-on-month change** (Rs 258.65 → 279.34, +Rs 20.69, +8.0%; 11.8 kg gas Rs 3,052 → Rs 3,296, +Rs 244). Add a 3-row "what this means for your 11.8 kg cylinder" table and a link to the duration calculator.
   - Delete the "aaj ka rate / LPG ki kimat" FAQ, or answer it in one honest line ("Yes, this is today's OGRA-notified rate").
   - Replace "history … will live on this cluster" with a link to `/history/`.
   - Attach the OGRA PDF or screenshot (H-4).
2. **`/lpg-cylinder-price-in-pakistan/`** (Borderline 11)
   - The page promises "gas vs deposit vs delivery" and delivers only the gas. Get the owner's real deposit and exchange figures (per size, per city if they differ). Until then, write the deposit and exchange sections as a clear "typical process" with no placeholder language, and remove "until the owner documents them".
   - Add a worked example with real numbers: 11.8 kg refill (gas Rs 3,296 + delivery [owner figure]) and 45.4 kg (gas Rs 12,682).
   - Remove "When people ask for the price of lpg cylinder in pakistan…".
3. **`/lpg-price-per-kg-in-pakistan/`** (Weak 9)
   - Either merge into `/lpg-price-in-pakistan/` with a 301 redirect, or give it its own job: a one-screen answer ("Rs 279.34 per kg, effective 1 Oct 2026") plus a quick per-kg-vs-per-cylinder comparison table. Today it is the flagship page with fewer sentences.
   - Remove "Searchers ask for…". Drop the repeated "How to read this page" Note.
4. **City hubs `/lpg-in-karachi/`, `/islamabad/`, `/lahore/`, `/rawalpindi/`** (Weak 9)
   - Fix H-1: remove the "test order … 60 minutes" sentence unless there is a real, dated test (order time and delivery time). Otherwise use "target about one hour in covered areas".
   - Replace "we work with 121 distributors" with "121 suppliers listed in our network data".
   - Add the content the static hubs have: 5–6 genuine local angles, the common cylinder size by area, local winter or heat notes, and which areas the listed partners actually cover.
5. **`/lpg-price-in-pakistan/karachi/` and `/lahore/`** (Weak 7)
   - Keep noindex until a city-specific figure exists. If the price is identical, make the page about something else: Karachi- and Lahore-specific buying notes (apartment access, typical cylinder sizes, 45.4 kg restaurant demand), with the price block only as a footer. Remove "Gate L".
6. **`/delivery-areas/`** (Weak 9)
   - Give it a real job: a table with city, status (served / on request), target delivery time, sizes available and how to order. Use `city-overrides.json` for the four with targets. Show "on request" for the rest. Remove the contradictory "we do not promise one time for every city" line, or make the one-hour target specific to the four cities.
7. **`/lpg-cylinders/`** (Borderline 12)
   - Delete "Photo guide pending" and "until the owner documents them" (and the contradiction with `commercial-terms.json`). Add a four-row comparison table (size / typical use / gas price today / who it suits) with live prices. Put the exchange/deposit terms the owner has already confirmed in plain words.
8. **`/lpg-near-me/`** (Borderline 11)
   - If no addresses are available, rename the intent honestly ("Find an LPG supplier near you: how we match you") or fold it into `/delivery-areas/` and 301. Do not run both pages with the same chips.
9. **`/lpg-companies-in-pakistan/`** (Borderline 14)
   - The honesty is right but the intent fails. Add a neutral, sourced reference list of OGRA-licensed LPG marketers **with the OGRA source and date** (names are public). Keep the "we do not rank" Note. This gives the information gain that competitors lack.
   - Fix the FAQ pointer to "exchange and deposit terms on the cylinder refill page" (the page has none).
10. **`/lpg-stove-price-in-pakistan/`** (and `/lpg-kit-price-in-pakistan/`) (Weak 9 and Borderline 10)
    - A price-intent URL must show a price or a price band. Get 3–5 real products with real prices from the owner's stock, or change the H1, alt and title to "LPG stoves: what to compare and how to ask" and stop promising a price. Replace the "LPG stove price in Pakistan" alt text on a picture that carries no price.
11. **`/services/*` (8 pages)** (Weak 9)
    - Replace `stdProcess()` with a service-specific process (pipeline: pressure test steps, pipe material; tank: distances, approvals; manifold: changeover type). Add one real number or standard per page (e.g. the test pressure used). Remove "our own team of engineers and technicians" until a project backs it up. Add a hero image that is not stock-looking.
12. **Dynamic hubs without overrides: `/lpg-in-peshawar/`, `/hyderabad/`, `/faisalabad/`, `/quetta/`, `/burewala/`** (Weak 7)
    - Either build static city pages like Multan or Murree (6 angles each), or keep them noindex and link them only from the delivery-areas table. Review the locality lists: "Board", "Achini Payan" and similar are not service areas a visitor can use.
13. **Province hubs (6 pages)** (Weak 6)
    - Keep noindex. When written, each needs terrain and season notes, which cities have hub pages, and what we can and cannot reach.
14. **`/industries/manufacturing/`** (Borderline 11) with **`/industries/textile/`** (Borderline 12)
    - The two share the same supply structure (bank / bulk tank + vaporizer / LPG-air), the same three services and the same safety bullets. Merge into one "factories and textile units" page, or make each specific: textile (stenters, thermal oil, steam, shifts) vs manufacturing (kilns, brazing, heat treatment, with a real example load in kg/hr).
15. **`/` (home) and `/about/`** (Borderline 13 and 12)
    - Resolve H-2 and H-3. Remove the "partner preview" sentence on `/about/` (H-5). Add proof that exists: licence number with a link to OGRA's licence information (once verified) and the office address. State what is manufactured and where.

---

## Best 10 pages (keep / publish-ready content-wise aside from gates)

| # | Path | Score | Why it works | Fix before publish |
|---|---|---:|---|---|
| 1 | `/why-lpg-prices-change-in-pakistan/` | 19 | A live month-on-month table from the verified data, a driver table, "change per kg → change per cylinder" grid, honest "we do not state why one month moved without a dated source". | Needs the OGRA PDF behind the price (H-4). No ranking claims. |
| 2 | `/lpg-vs-sui-gas/` | 19 | Worked MMBTU cost from the live OGRA rate (Rs ~6,400 per MMBTU of LPG heat at Rs 279.34/kg), what to compare, a seven-step switch checklist, danger Note. The "usually not cheaper" answer is honest. | Add a "slab rate" example from a public SNGPL/SSGC tariff, with source and date. |
| 3 | `/lpg-cylinder-blast-causes-and-prevention/` | 19 | Cause table, myths and facts, checklist, fire steps. | Safety-team sign-off date (`safety-review.json` has no date for this page). |
| 4 | `/propane-vs-butane/` | 18 | Property table with hedges, cold-weather relevance to Pakistan, a checklist. | Confirm what mix Pakistani cylinders actually carry before the "propane-rich" advice stays. |
| 5 | `/what-to-do-if-you-smell-gas/` | 18 | Action-first, "do not use the order form", why LPG smells. | Add a content image. Safety review is dated 2026-10-27. |
| 6 | `/tools/lpg-cylinder-duration-calculator/` | 17 | A real working calculator with a reserve, editable assumptions and a clearly labelled example. | Add a real "typical burner kg/hr" table from the owner or a source. |
| 7 | `/lpg-regulators/` | 17 | Type table, flow-by-appliance table, five-point checklist, fitting steps. | Add regulator photos with accurate alts. |
| 8 | `/lpg-cylinders/12-kg-domestic-cylinder/` | 16 | Clear answers on 11.8 vs 12 kg, bill split, handling. | Replace 4 `[needs confirmation]` markers with real deposit and weight data. |
| 9 | `/bulk-lpg-supply/` | 16 | Decision table, quote inputs, "What we do not claim". | Add one real tank-size range or a worked load example. Cut the "Related pages" list (8 links). |
| 10 | `/lpg-shortage-pakistan/` | 16 | A "real shortage or rumour?" test and a cause table. | The empty sourced-updates log is a hole. Add one or two OGRA or news items with dates and links, or reword the section so it does not read as empty. |

Runners-up (provisional Good, not read line by line): `/lpg-leak-detector/`, `/lpg-regulator-problems-and-repair/`, `/lpg-vs-cng/`, `/lpg-composition-and-properties/`, `/how-to-choose-a-licensed-lpg-supplier/`.

---

## Template risk (cities, industries, shop)

### Cities

| Template | Used by | Unique copy | Verdict |
|---|---|---|---|
| **Dynamic hub** (`app/lpg-hub/[slug]/page.tsx`) | 9 city URLs + 6 province URLs | City hubs with an override have 3 bullets of local notes; the other 5 have none. Everything else is name, counts and a list of locality strings. | **High risk.** A clone with the city name swapped. Weak. Honesty flags H-1 and H-3 live here. |
| **Static hub** (`CityHubStatic`) | 7 city URLs | 6 hand-written "angles", season note, size notes, nearby links per city. About 250–290 words of unique copy each. | **Acceptable.** The best template on the site. It also says plainly when no supplier is listed. Weak spots: H1 promises "price, cylinder delivery and supply", the shared Note and "How supply works" block is about 40% of the page, and census figures have no source. |
| **City price page** (`[city]`) | Karachi, Lahore | Landmark photo and supplier count | Duplicate of national page. Weak. Noindex by design. |

Two template-level fixes, not per page:
- Add a **"what is different here" minimum**: no city page may ship without ≥3 city-specific facts that are not in the data file (areas served, which size is common, season or terrain, typical building access).
- Do not add more city pages until the five no-override hubs are either written or kept noindex.

### Industries (`IndustryPage` + `industries-data.ts`)

- Every sector page has the same skeleton: Short answer → Uses (4 bullets) → Supply options (3 rows) → Quote inputs (4 bullets) → Safety (4 bullets) → Capabilities (5 bullets, identical on all 9) → "No case studies yet" Note (identical on all 9) → Services → Other industries → 3 FAQs.
- That is **honest** (no invented customers or consumption figures) but it also means **no information gain**: there is no load estimate, no typical cylinders-per-week, and no sector-specific regulation or approval.
- Closest pair: textile ↔ manufacturing (0.13 sector-data overlap). Distinct pair: hospitals ↔ housing-societies (reserve planning, shared-system billing and operator responsibility are real, specific content).
- Remove the repeated "No case studies yet" Note from 9 pages. It reads as an apology on every page. Keep it on `/projects/` only.

### Shop and appliances (`ApplianceInfoPage`)

- Six pages (stove, geyser, heaters, vaporizers, burners, hoses) plus the shop hub share a template with the same two Notes ("Short answer", "Stock and prices are confirmed on request") and the same compare-table pattern.
- The unique value is the "what decides the price" list and the safety bullets. The geyser page's CO / flue content is the best of the family.
- **Intent mismatch:** three URLs (`-stove-price-`, `-geyser-price-`, `-kit-price-`) promise a price and show none. Either supply a price band or retitle.
- There are no in-body links, only the `related` list, and no price-adjacent content (running cost per hour, cylinder duration).

### Services (`lib/services.ts`)

- 8 URLs share `stdProcess()`. Each has 120–210 words of unique copy. No project, no standard, no image. This is the thinnest cluster by unique words.

### Cross-template boilerplate

| Phrase or block | Files | Hits | Note |
|---|---:|---:|---|
| "before you agree" | 38 | 91 | The site's safety valve, but it appears so often it reads as a refusal to commit. |
| "we confirm" | 34 | 57 | Same. |
| "OGRA-licensed marketer and distributor" | 20 | 25 | Fine for trust. Excessive on city and appliance pages. |
| "Talk to us now" Note | 11 | 11 | Duplicate block. |
| `[needs confirmation]` | 6 | 29 | On 6 cylinder and connection pages. Visible to users. |
| "Gate L", "owner", "partner preview" | 6 | 7 | Internal language on public pages (H-5). |
| Three-roles block | 5 | 5 | Home-delivery, order, how-it-works, about, city price. |

---

## Recommended next writing passes

Ordered by impact. Each pass says what is blocked by the owner.

**Pass 1: Honesty clean-up (1–2 days, no new facts needed)**
- Fix H-1 to H-5: the 60-minute test claim, "since 1999", "we work with N distributors", "Gate L" and "owner/preview" language, and the cylinders-hub contradiction.
- Replace the draft-voice hedges on the price flagship and the three price siblings ("when available", "amber notice", "history will live here").
- Remove the keyword-fishing FAQs and the "Searchers ask for…" paragraphs.
- Re-caption AI images as "Illustrative" or take them off pages where they read as real (`/contact/`, `/licences-and-compliance/`, `/about/`) (H-6).

**Pass 2: Price cluster rewrite (2–3 days)**
- One flagship, one per-kg answer, one cylinder-price page with real breakdown, one OGRA-source page, one history page. Give each a separate job (see Worst 15 #1–3), and drop the repeated formula block and Note.
- Blocked by: OGRA PDF or screenshot for October (H-4). Owner deposit, exchange and delivery figures.

**Pass 3: Owner-fact collection (can run in parallel, unblocks 20+ pages)**
Collect once, publish everywhere:
1. Deposit and exchange amounts per size (5, 11.8, 15, 45.4 kg; steel and composite). Unlocks 6 pages with `[needs confirmation]`.
2. Empty weight, height and cylinder certification marking for each size. Unlocks the sizes page and every SKU.
3. Delivery fee rule (free radius, per-km, per-floor) and payment methods.
4. Real delivery test: dated, timed, with city, for at least the four hub cities (resolves H-1).
5. Composite sizes, and which cities stock them.
6. Appliance list: 3–5 models with price, so the stove and geyser pages can carry a price.
7. Real photos: office, stock and a cylinder marking (resolves H-6).
8. One consented project, even a small one. Unlocks `/projects/`, services and industries.
9. Licence issue date (resolves H-2).

**Pass 4: Cylinder SKUs and hub (2 days after Pass 3)**
- Rewrite `/lpg-cylinders/` as a comparison hub with live prices. Give `5-kg` its own angle (portability, valve fit, who stocks it). Add restaurant sizing to `45-kg`. Add sizes and cities to `composite`.

**Pass 5: Delivery and local (2–3 days)**
- `/delivery-areas/` as a table. Merge or retitle `/lpg-near-me/`. Rewrite the dynamic city hub with a "≥3 city facts" rule. Decide what to do with the 5 no-override hubs and 6 province hubs (write or keep noindex).
- `/lpg-companies-in-pakistan/`: add a sourced OGRA marketer reference.

**Pass 6: B2B and industries (3–4 days)**
- Merge or differentiate bulk, bowser and industrial. Cut link lists to ≤6. Give each industry one sector-specific number or regulation, and drop the repeated Notes. Merge textile and manufacturing, or differentiate them.
- Services: replace `stdProcess()`.

**Pass 7: Provisional pages (1 day of reading)**
- Read the 36 provisional pages in full and confirm or change their grade. The first to check are `/lpg-safety/`, `/what-is-lpg/`, `/lpg-supply-in-pakistan/`, `/ogra-lpg-regulations-pakistan/`, `/lpg-near-me/` and `/lpg-kit-price-in-pakistan/`.

**Pass 8: Strengthen what already works**
- Add three months of OGRA history to `/history/` (moves it to Good).
- Add typical burner kg/hr and a sample monthly household table to the duration calculator.
- Add one worked-number example to the diesel and Sui calculators.
- Add the one missing image to `/what-to-do-if-you-smell-gas/`.

---

## Appendix: automated metrics for the deep-read sample

Words = visible string literals in the page file only. Shared-component copy (`PriceBlock`, `ApplianceInfoPage`, `IndustryPage`, `CityHubStatic`, `lib/services.ts`) is excluded, so template pages are under-counted. Links = `<Link>` in the page file. Markers = visible `[needs confirmation]`.

| Page | Words | H2 | FAQ Qs | Links | PriceBlock | Markers | Content imgs/alts | Notes |
|---|---:|---:|---:|---:|:---:|---:|---:|---|
| `/` | 473 | 4 | 5 | 12 | yes | 0 | gallery only | |
| `/lpg-price-in-pakistan/` | 533 | 6 | 6 | 12 | yes | 0 | gallery only | |
| `/lpg-cylinder-price-in-pakistan/` | 401 | 5 | 6 | 12 | yes | 0 | gallery only | |
| `/lpg-price-per-kg-in-pakistan/` | 412 | 6 | 6 | 9 | yes | 0 | gallery only | |
| `/ogra-lpg-notified-price/` | 381 | 6 | 6 | 9 | yes | 0 | gallery only | |
| `/lpg-cylinders/` | 405 | 5 | 6 | 11 | no | 0 | 1 | "pending owner photos" |
| `/lpg-cylinders/12-kg-domestic-cylinder/` | 681 | 5 | 6 | 9 | yes | 4 | 1 + gallery | |
| `/lpg-cylinders/45-kg-commercial-cylinder/` | 579 | 5 | 6 | 7 | yes | 6 | 1 + gallery | |
| `/lpg-cylinders/5-kg-cylinder/` | 409 | 5 | 5 | 5 | yes | 4 | 1 + gallery | |
| `/lpg-cylinders/composite-fiber-cylinder/` | 522 | 5 | 6 | 6 | no | 6 | 2 + gallery | |
| `/lpg-home-delivery/` | 483 | 6 | 7 | 12 | no | 0 | 1 + gallery | |
| `/order-lpg/` | 410 | 5 | 6 | 6 | no | 0 | gallery only | |
| `/delivery-areas/` | 151 | 3 | 0 | 5 (+15 chips) | no | 0 | gallery only | |
| `/commercial-lpg-supply/` | 822 | 7 | 7 | 16 | no | 0 | gallery only | |
| `/industrial-lpg-supply/` | 676 | 5 | 7 | 19 | no | 0 | gallery only | |
| `/bulk-lpg-supply/` | 662 | 5 | 7 | 13 | no | 0 | gallery only | |
| `/lpg-vs-sui-gas/` | 878 | 8 | 6 | 9 | no | 0 | 1 + gallery | Live MMBTU example |
| `/why-lpg-prices-change-in-pakistan/` | 677 | 6 | 6 | 7 | yes | 0 | 1 + gallery | 3 tables |
| `/lpg-cylinder-blast-causes-and-prevention/` | 910 | 5 | 7 | 7 | no | 0 | 1 + gallery | 2 tables |
| `/lpg-shortage-pakistan/` | 743 | 6 | 7 | 6 | no | 0 | 1 + gallery | Sourced-updates log empty |
| `/what-to-do-if-you-smell-gas/` | 470 | 4 | 3 | 3 | no | 0 | gallery only | |
| Static city hubs (7) | 252–291 (page file) | via template | 4–5 | via template (~12) | yes | 0 | gallery only | 6 unique angles each |
| Industries (9) | 1–2 (page file); data in `industries-data.ts` | via template | 3 each | via template (~9) | no | 0 | gallery only | |
| Appliance pages (6) | 461–597 | via template | 4 | 0 in body (+5–6 related) | no | 0 | gallery only | |
| Tools (7) | 244–355 | 1–3 | 4–5 | 0–6 | no | 0 | gallery only | |
| Services (8) | ~120–210 (in `lib/services.ts`) | 4 | 1–3 | 3 | no | 0 | none | Shared `stdProcess()` |

**Lexical overlap (5-gram Jaccard on page-file literals):** price pages 0.02–0.11 (highest: price ↔ per-kg 0.11). SKU pages 0.01–0.07. B2B pages 0.04–0.08. Delivery family 0.00–0.09. Industry sector data 0.04–0.13 (textile ↔ manufacturing 0.13). These are low, so the problem is shared intent and shared components, not copied text.
