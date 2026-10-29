# Strict content-quality re-audit (R4+): city hubs, industries, tools, shop, services, trust

**Audited:** 28 Oct 2026 · **Site:** `D:\SparePartsHub-App\lpg-website` · **Scope:** copy and content honesty only. No provisional grades.

**Read in full for this pass:** `app/lpg-hub/[slug]/page.tsx`, `lib/network.ts`, `data/city-overrides.json`, `data/network.json`, `data/prices.json`, `data/commercial-terms.json`, `data/safety-review.json`, `lib/prices.ts`, `lib/seo.ts`, `lib/site.ts`, `lib/pages.ts`, `lib/services.ts`, `components/PriceBlock.tsx`, `components/r4plus/*` (CityHubStatic, IndustryPage, industries-data, ApplianceInfoPage, ToolPage, calc-ui), the 7 static city pages, the 10 industries pages, all 7 tools (`page.tsx` + `Calculator.tsx`), the 7 shop/appliance pages, the 9 services pages, the 11 scored trust pages, `privacy`, `terms`, `gallery`, `shop-preview`, `app/sitemap.ts`, `next.config.mjs`, and the gallery map and alt text in `lib/media.ts`. I opened two of the AI image files to confirm what they show (`41-inspection-cert-sample.png`, `06-office-exterior-ai-hq-2.png`). I did not open the other ~70 images; for those I rely on the file names (`hold-ai/`, `-ai-`, `-faces`, `-sample`), the captions and the 2026-10 `MEDIA_STATUS` note quoted in `CONTENT_QUALITY_AUDIT.md`.

**Status gate (applies to every URL below):** every URL in `data/pages.json` is `status: review`, so none is published, none is in the sitemap and every page renders `noindex`. Grades below are about the copy as it stands, not about the gate.

---

## Rubric used (stricter than `CONTENT_QUALITY_AUDIT.md`)

Each criterion 0–3. **A** answer-first, **C** coverage, **G** information gain, **H** facts honesty, **K** on-page craft, **D** differentiation, **M** media alt and image honesty. Max 21.

| Grade | Rule |
|---|---|
| **GOOD** | Total ≥ 17 **and** A ≥ 3, G ≥ 3, H ≥ 3 **and** no draft or internal-process language shown to users **and** the URL, H1 and title promise is kept |
| **BORDERLINE** | 11–16, or ≥ 17 but a gate above fails (marked "gated") |
| **WEAK** | ≤ 10, **or** honesty fail (H ≤ 1, or a claim the site's own data contradicts), **or** promise fail (the page cannot deliver what the URL, H1 or snippet says), **or** mostly a template with names swapped |

**Extra strictness rules I applied the same way everywhere**
1. **Price URL with no price = WEAK.** (`lpg-stove-price-in-pakistan`, `lpg-geyser-price-in-pakistan`.)
2. **Empty projects page cannot be GOOD.**
3. **H cap of 2 on any page that renders `PriceBlock` or says the OGRA rate is "verified".** `data/prices.json` `sourceNote` says the October figure is "as reported from … Dawn / The Nation / ARY … Re-check PDF on ogra.org.pk when the file is posted", yet the UI says "Checked by THE LPG CO. team … Official OGRA source" (flag **H-4**). This is a data fix, but until it is fixed no price-bearing page gets H = 3.
4. **M cap of 1 on any page whose gallery uses `hold-ai/` images under a plain "Photos" heading** (AI-generated scenes, faces and "sample" artefacts, undisclosed). **M = 0** where an AI image is offered as proof of the company's real premises, documents or stock.
5. **A city or product page whose own body says "we have no supplier / no price here" cannot keep a "price, delivery and supply" H1: promise fail.**

---

## Summary counts

| Group | URLs | Good | Borderline | Weak |
|---|---:|---:|---:|---:|
| 1. Dynamic city and province hubs (`/lpg-hub/[slug]` → `/lpg-in-{slug}/`) | 15 | 0 | 0 | 15 |
| 2. Static city hubs | 7 | 0 | 4 | 3 |
| 3. Industries (hub + 9 sectors) | 10 | 0 | 9 | 1 |
| 4. Tools | 7 | 1 | 6 | 0 |
| 5. Shop and appliances | 7 | 0 | 4 | 3 |
| 6. Services (hub + 8) | 9 | 0 | 8 | 1 |
| 7. Trust (scored) | 11 | 0 | 1 | 10 |
| **Scored total** | **66** | **1** | **32** | **33** |
| Not scored: `/privacy/`, `/terms/` | 2 | | | |
| Excluded, noindex and thin: `/gallery/`, `/shop-preview/` | 2 | | | |

**Bluntly:**
- **One GOOD page in 66:** the cylinder duration calculator.
- **Every dynamic hub is WEAK.** Four of them carry a fabricated-looking measurement ("our own test order … 60 minutes"). Five are a template with 17–40 words of data swapped in. Three province hubs are a single sentence.
- **Trust pages are the worst group (10 of 11 WEAK).** AI images are offered as the real office, real documents and real warehouse; two pages show draft language; the network page's headline total (347) does not match its own table (329).
- **Industries and services are honest but thin and unproven.** They describe capability for a team that has zero listed projects and zero named engineers.

---

## Cross-cutting findings (fix these once, many URLs move)

| # | Finding | Evidence | URLs affected |
|---|---|---|---|
| X-1 | **"Test order … 60 minutes" is a target, not a test** | `data/city-overrides.json` `_readme`: "delivery target ~1 hour when local team available". All four override cities have `"testOrderMinutes": 60`, `verifiedOn: 2026-10-27`. The hub FAQ renders: "In our own test order in {city} the cylinder arrived in {n} minutes." | Islamabad, Rawalpindi, Lahore, Karachi hubs |
| X-2 | **"We work with N distributors" overstates a counts-only list** | `network.json` source: "Owner-supplied distributor list … Counts only." Hub intro: "supplies LPG gas in Karachi through 121 listed distributors and suppliers"; FAQ: "In Karachi we work with 121 distributors and suppliers." | All 9 dynamic city hubs, `our-network` |
| X-3 | **Network totals do not reconcile on a public page** | `totals.suppliers` = 347 (shown in the `our-network` headline card). Province rows shown in the table sum to 329. City rows sum to 297. `autoLpg`: 104 headline, 104 by province, 90 by city. | `our-network`, `about`, any page quoting 347 |
| X-4 | **Province hubs have empty `cities` arrays for KP, GB, AJK** | `network.json`: `"khyber-pakhtunkhwa": {"cities": []}`, same for `gilgit-baltistan`, `azad-kashmir`. The hub then renders only "We have 39 partners listed in Khyber Pakhtunkhwa so far." It does not link `/lpg-in-peshawar/`, `/lpg-in-gilgit/` or `/lpg-in-muzaffarabad/`, which exist. | 3 province hubs |
| X-5 | **Scraped locality strings are published as "areas where our partners are listed"** | Karachi "Jat Land Lines", "Railway Phata Benazir Park", "Upper Gizri Defence Housing Authority"; Islamabad "Sector DHA Phase II"; Rawalpindi "Rawalpindi", "Town"; Peshawar "Board"; Lahore "bala stop Sodhiwal"; Hyderabad, Faisalabad, Quetta, Burewala list the city's own name as a locality. | All 9 dynamic city hubs |
| X-6 | **AI imagery is shown as real company assets** | `lib/media.ts` alts: "entrance of THE LPG CO. PAKISTAN headquarters preview", "LPG cylinder testing and inspection certificate — passed inspection preview", "warehouse staff with commercial 45.4 kg cylinders", "LPG retail shopfront". The inspection-certificate file I opened is stamped "ILLUSTRATIVE SAMPLE — NOT AN OFFICIAL CERTIFICATE" inside the image, but the page caption says only "Cylinder inspection certificate". The office exterior is a generated glass-fronted building for what the site gives as "Office #99, Service Road, Sector G-12". | `about`, `contact`, `licences-and-compliance`, `partner-standards`, `our-network`, `pricing-policy`, plus M = 1 on every page with a "Photos" gallery |
| X-7 | **"UK-trained specialists with 12+ years" is about one internal person, stated as a team** | `site.safetyReviewer.experience` is rendered on `about`, `licences`, `editorial-policy`, `haroon-rasheed`. `data/safety-review.json` `_readme`: "Internal reviewer may be Haroon Rasheed (UK-related LPG training, 12+ years)". One reviewer is presented as "specialists". | 4 trust pages |
| X-8 | **Capability claims with zero proof** | `data/projects.json` has `"projects": []`. Services and industries say "Our engineering team designs, installs and tests", "our national team of engineers", "Work is carried out by our own team of engineers and technicians". No names, no credentials, no project, no standard cited. | 8 service pages, services hub, 10 industries pages, `licences` |
| X-9 | **Draft or working-state language reaches users** | `about`: "Visuals on this site are for partner preview; camera photos of G-12 and stock markings will replace temporary creatives." `partner-standards`: visible Note titled "Draft": "This page is waiting for the owner to confirm that each standard is applied in practice." `shop`: Note "Stock and prices pending". Every industries page: Note "No case studies yet … Until projects are listed…". `gallery` and `shop-preview` (noindex): "Preview for partners". | listed |
| X-10 | **Dead and stray code** | `data/city-overrides.json` `deliveryNote` is never rendered by the dynamic hub (only by `CityHubStatic`). `lib/cities.ts` is UAE data (Dubai, Sharjah, `emirate`) and is imported nowhere. | housekeeping |

---

# 1. Dynamic city and province hubs

**Files:** `app/lpg-hub/[slug]/page.tsx` (served at `/lpg-in-{slug}/` through the rewrite in `next.config.mjs`), `lib/network.ts`, `data/city-overrides.json`, `data/network.json`.

**`hubSlugs` (15):** `karachi`, `islamabad`, `lahore`, `rawalpindi`, `peshawar`, `hyderabad`, `faisalabad`, `quetta`, `burewala` (the nine `hub: true` cities) plus `azad-kashmir`, `balochistan`, `gilgit-baltistan`, `khyber-pakhtunkhwa`, `punjab`, `sindh` (`provinceList`, which excludes `islamabad`).

**What the template renders for a city (≈ 520 template words plus the `PriceBlock` table):** intro with supplier count, "How supply works" paragraph, localities list (only if ≥ 3), a "What our {city} network covers" bullet list, optional override notes, a price section, `PriceBlock`, "Nearby" chips (same-province hub cities only), 4 FAQs, `Service` JSON-LD.

**Template grade:** WEAK. The only per-city content is `suppliers`, `autoLpg`, `open24h`, a list of up to 10 locality strings, and, for four cities, three override bullets. Everything else is the same sentences with `{city.name}` swapped.

**Template facts that hurt every hub:**
- H1 promises "price today, cylinder delivery and supply". It delivers the national gas-only per-kg rate (identical in every city), no delivery fee, no deposit amount, no delivery time that is real.
- The price sits below the fold; the intro says "we … confirm the price today" instead of giving it.
- `localities` are shown as "Areas of {city} where our partners are listed" (see X-5).
- `nearby` uses an exact `province` string match, so Islamabad (province "Islamabad (ICT)"), Peshawar and Quetta show **no** Nearby block, and Karachi shows only Hyderabad.
- No image, so M = 1.

## City hubs with override bullets (4)

Unique substance ≈ 75–110 words each (locality words + 40–56 words of override notes + the counts). Template ≈ 520 words.

### `/lpg-in-islamabad/` — WEAK (9) 2/2/1/0/2/1/1
- **Intent vs delivery:** H1 and title promise price, delivery, supply; get a national gas-only rate, a 46-supplier count and a "60 minutes" test-order claim.
- **Unique substance:** ≈ 110 words: 10 locality strings (30 words), 3 override notes (56 words), counts (46 suppliers, 14 auto-LPG, 19 "24-hour").
- **Works:** "Orders via call, WhatsApp or the website are accepted around the clock; a local team or distributor confirms the delivery window." Honest hedge on the delivery window in the notes.
- **Fails:** "In our own test order in Islamabad the cylinder arrived in 60 minutes" (X-1; the data's own `_readme` says target). "through 46 listed distributors and suppliers … we work with 46 distributors" (X-2). Localities include "Islamabad", "Sector DHA Phase II" (X-5). Note 2 "Winter demand rises for domestic cylinders and heaters; we keep standard sizes in the network" is generic. `deliveryNote` is not rendered.
- **Verdict:** WEAK on honesty. Remove the test-order sentence until a dated, real test exists.

### `/lpg-in-rawalpindi/` — WEAK (9) 2/2/1/0/2/1/1
- **Intent vs delivery:** same promise gap. Zero auto-LPG partners, 15 suppliers, 3 "24-hour".
- **Unique substance:** ≈ 75 words (8 locality strings, 3 notes of 40 words).
- **Works:** "Domestic 11.8 kg and commercial 45.4 kg are the most requested sizes for homes and restaurants." (specific, though unsourced).
- **Fails:** "In our own test order in Rawalpindi the cylinder arrived in 60 minutes" (X-1). Localities "Rawalpindi" and "Town" (X-5). Note 1 says Rawalpindi demand "is fulfilled through the same Islamabad–Rawalpindi network teams", a team structure nothing else on the site documents.
- **Verdict:** WEAK (honesty).

### `/lpg-in-lahore/` — WEAK (9) 2/2/1/0/2/1/1
- **Intent vs delivery:** same.
- **Unique substance:** ≈ 100 words (10 localities, 3 notes of 44 words; 33 suppliers, 3 auto-LPG, 10 "24-hour").
- **Works:** "Commercial kitchens commonly use 45.4 kg cylinders; homes typically use 11.8 kg or 15 kg."
- **Fails:** "In our own test order in Lahore … 60 minutes" (X-1). "bala stop Sodhiwal" lower-case scraped string. Note 3 "We quote OGRA-notified gas price plus confirmed delivery and cylinder terms before you agree" repeats the template. The Lahore price page exists (`/lpg-price-in-pakistan/lahore/`) and the hub links it, but that page has the same national figure.
- **Verdict:** WEAK (honesty).

### `/lpg-in-karachi/` — WEAK (9) 2/2/1/0/2/1/1
- **Intent vs delivery:** same. Largest network (121 suppliers, 43 auto-LPG, 42 "24-hour"), the best data and the most overstated claim ("we work with 121 distributors").
- **Unique substance:** ≈ 100 words (10 localities, 3 notes of 41 words).
- **Works:** "Karachi has the densest partner coverage in our network data" is a true statement of the data.
- **Fails:** "In our own test order in Karachi … 60 minutes" (X-1). "Coastal humidity makes cylinder condition checks on delivery especially important" is filler dressed as local insight. Localities "Jat Land Lines", "Lower Gizri Gizri", "Upper Gizri Defence Housing Authority" (X-5). Only Nearby link is Hyderabad.
- **Verdict:** WEAK (honesty). Highest-volume city, so fix first.

## City hubs with no override (5): template plus data swap

### `/lpg-in-peshawar/` — WEAK (8) 2/1/0/2/2/0/1
- **Intent vs delivery:** promise of price, delivery, supply; delivers counts and a locality list.
- **Unique substance:** ≈ 40 words (10 locality strings = 17 words; 12 suppliers, 8 auto-LPG, 3 "24-hour").
- **Works:** FAQ states honestly: "We publish a measured delivery time for a city only after we have tested it ourselves."
- **Fails:** locality list "Board", "Achini Payan", "Shāheen Town Tajabad", "Taru Jabba" (X-5). "we work with 12 distributors" (X-2). No Nearby block (province string mismatch). Nothing about Peshawar.
- **Verdict:** mostly template. WEAK.

### `/lpg-in-hyderabad/` — WEAK (8) 2/1/0/2/2/0/1
- **Unique substance:** ≈ 17 words. 4 localities, one of which is "Hyderabad"; 8 suppliers; 0 auto-LPG; shows a network list of 2 bullets.
- **Works:** honest FAQ on delivery time.
- **Fails:** the only locality list is "Bhittai Town Qasimabad, Hyderabad, Qasimabad, Shahi Bazar". Template swap.
- **Verdict:** WEAK.

### `/lpg-in-faisalabad/` — WEAK (8) 2/1/0/2/2/0/1
- **Unique substance:** ≈ 20 words (5 localities incl. "Faisalabad", 6 suppliers, 1 "24-hour").
- **Works:** hedged delivery FAQ.
- **Fails:** Faisalabad is one of the largest Punjab cities and gets 20 words of its own. Nearby chips are the only differentiator.
- **Verdict:** WEAK.

### `/lpg-in-quetta/` — WEAK (8) 2/1/0/2/2/0/1
- **Unique substance:** ≈ 38 words (6 localities incl. "Quetta", 6 suppliers, 3 auto-LPG, 3 "24-hour").
- **Works:** hedged delivery FAQ.
- **Fails:** Quetta's winter and altitude (relevant to LPG pressure) get no mention, whereas the static Gilgit and Skardu pages cover it. No Nearby block.
- **Verdict:** WEAK.

### `/lpg-in-burewala/` — WEAK (8) 2/1/0/2/2/0/1
- **Unique substance:** ≈ 33 words (4 localities incl. "Burewala"; 5 suppliers; 1 auto-LPG; 1 "24-hour").
- **Works:** hedged delivery FAQ.
- **Fails:** Burewala (T3 town) has a hub page while Multan (T1, 1 supplier) and Gujranwala (4 suppliers) are static. The hub status comes from supplier count, not demand. Same swap.
- **Verdict:** WEAK.

## Province hubs (6)

Template: H1 "LPG in {province}: cylinders, gas supply and delivery", a list of cities with supplier counts (only `hub: true` cities are linked), a "thin coverage" Note when `suppliers < 5`, and 2 FAQs. No price, no cylinders, no province facts. All six are `index: false` in code.

### `/lpg-in-punjab/` — WEAK (10) 2/1/1/2/2/1/1
- **Intent vs delivery:** H1 promises "cylinders, gas supply and delivery". Delivers a list of 19 city names.
- **Unique substance:** ≈ 60 words (city names and counts).
- **Works:** the list is real data; Lahore, Rawalpindi, Faisalabad, Burewala are linked.
- **Fails:** `/lpg-in-multan/` and `/lpg-in-gujranwala/` exist but render as plain text because `hub: false`. "Bhera", "Dunyapur", "Jatoi" show "0 suppliers listed" under a heading "Where we have partners". "LPG in Punjab is supplied by THE LPG CO. through our distributor network" is flat.
- **Verdict:** WEAK.

### `/lpg-in-sindh/` — WEAK (10) 2/1/1/2/2/1/1
- **Unique substance:** ≈ 25 words (Karachi, Hyderabad, Thul, Larkana, Umerkot, Shikarpur).
- **Works:** Karachi and Hyderabad linked.
- **Fails:** Sindh is the largest supplier province (137) and gets a six-item list. Larkana and Umerkot show one supplier each. No Sindh-specific copy.
- **Verdict:** WEAK.

### `/lpg-in-balochistan/` — WEAK (10) 2/1/1/2/2/1/1
- **Unique substance:** ≈ 25 words (Quetta, Gwadar, Hub, Loralai, Pishin, Zhob).
- **Works:** Quetta linked. Honest FAQ: "We try. Availability depends on whether we have a distributor near you."
- **Fails:** no winter/altitude/distance copy, which is the one real local fact for Balochistan LPG. 12 suppliers means the "limited coverage" Note does not appear.
- **Verdict:** WEAK.

### `/lpg-in-khyber-pakhtunkhwa/` — WEAK (5) 1/0/0/2/1/0/1
- **Intent vs delivery:** H1 "cylinders, gas supply and delivery". Body is one sentence.
- **Unique substance:** ≈ 12 words ("We have 39 partners listed in Khyber Pakhtunkhwa so far.").
- **Works:** nothing page-specific.
- **Fails:** X-4. Peshawar (12 suppliers), Abbottabad, Mansehra, Kohat and others exist in `network.json` but are not linked. A visitor reading "Where we have partners in Khyber Pakhtunkhwa" sees none.
- **Verdict:** WEAK. A shell with 2 FAQs.

### `/lpg-in-azad-kashmir/` — WEAK (5) 1/0/0/2/1/0/1
- **Unique substance:** ≈ 15 words plus the warn Note.
- **Works:** "Coverage here is still limited … we will tell you honestly whether and when we can supply you."
- **Fails:** X-4. `/lpg-in-muzaffarabad/` exists and is not linked. Two suppliers across Mirpur and Rawalakot are not named as cities.
- **Verdict:** WEAK.

### `/lpg-in-gilgit-baltistan/` — WEAK (5) 1/0/0/2/1/0/1
- **Unique substance:** ≈ 15 words plus the warn Note.
- **Works:** honest thin-coverage Note.
- **Fails:** X-4. `/lpg-in-gilgit/` and `/lpg-in-skardu/` have 280–300 words of real winter and road copy and are not linked from this hub.
- **Verdict:** WEAK.

---

# 2. Static city hubs

**Files:** `components/r4plus/CityHubStatic.tsx` plus 7 data-only page files. Template ≈ 600 words (coverage Note, how supply works, localities, network list, FAQs 5–6, price section, `PriceBlock`, business block, Nearby). Per-city layer: `summary`, 6 `angles`, optional `seasonNote`, 3 `sizeNotes`, `nearby`, optional `extraFaqs` ≈ 260–300 words. The local angles are real in kind (climate, roads, tourism, institutions) but contain no numbers, no named areas beyond the network list, and no price or fee.

**Shared template strengths:** hedged and honest coverage ("Our network data does not yet list a gas supplier in {city}"), uses "listed" not "we work with", no invented delivery time (`testOrderMinutes` absent for all seven).
**Shared template faults:** the phrase "our network data" is internal jargon; the title "Price, Delivery & Supply" promises more than the body can give where no supplier is listed; every page shows the same H-4 `PriceBlock`; the gallery reuses generic `bazaar`, `deliveryTruck`, `heaterFront` AI images under "Photos" (M = 1).

### `/lpg-in-multan/` — BORDERLINE (13) 2/2/2/2/2/2/1
- **Intent vs delivery:** fair. 1 supplier listed (Model Town); coverage Note says so.
- **Unique substance:** ≈ 290 words.
- **Works:** "Restaurants, sweet and bakery shops, hotels and wedding halls use 45.4 kg cylinders in volume. If you run a kitchen, tell us how many cylinders you change per week". "Our network data lists one supplier in Multan today. We say that plainly".
- **Fails:** "Multan had about 2.2 million people in the 2023 census" is unsourced. Model Town is the only locality, shown as an "Areas … where partners are listed" list of one. No price or fee beyond the national rate.
- **Verdict:** Borderline. Source the census figure; this is the best template instance.

### `/lpg-in-gujranwala/` — BORDERLINE (13) 2/2/2/2/2/2/1
- **Unique substance:** ≈ 265 words.
- **Works:** "Narrow streets can slow a delivery truck, so give us a landmark with your address." "Our network data lists localities such as Gulshan Colony and Samnabad, and at least one partner that lists 24-hour opening."
- **Fails:** "Gujranwala had about 2.5 million people in the 2023 census" unsourced. "known for … metalware, ceramics and food units" unsourced. Three localities.
- **Verdict:** Borderline.

### `/lpg-in-gilgit/` — BORDERLINE (13) 2/2/2/2/2/2/1
- **Unique substance:** ≈ 285 words.
- **Works:** "Roads into and around Gilgit, including the Karakoram Highway, can be slowed or blocked by snow, landslides or washouts. We cannot promise a fixed hour". Safe-use heater guidance. Season Note.
- **Fails:** 2 suppliers listed, no numbers on road closures or winter lead time. Image set repeats `heaterFront`, `bazaar`.
- **Verdict:** Borderline. One of the more useful pages in the group.

### `/lpg-in-abbottabad/` — BORDERLINE (13) 2/2/2/2/2/2/1
- **Unique substance:** ≈ 270 words.
- **Works:** "Abbottabad is a stop on the way to Nathia Gali, the Galiyat and northern areas. Hotels and restaurants can plan around seasonal demand with a larger cylinder or manifold setup." Hostel and mess-kitchen angle.
- **Fails:** one supplier in one locality (Al Mansoor Town). Hill-road text is close to Murree and Muzaffarabad text.
- **Verdict:** Borderline.

### `/lpg-in-skardu/` — WEAK (13 raw, promise fail) 2/2/2/2/2/2/1
- **Intent vs delivery:** H1 "price, cylinder delivery and supply" and the title "Winter Supply & Delivery". The page's own heading says "No supplier listed yet", and Skardu is not in `network.json` at all.
- **Unique substance:** ≈ 300 words, the most of the seven.
- **Works:** "In very low temperatures, gas pressure in a cylinder falls and the flame can weaken, especially with high draw such as a geyser. Keep the cylinder upright, never warm it with a flame or hot water". Honest: "If we cannot supply you, we say so quickly."
- **Fails:** the page is honest but cannot deliver the supply the title sells. The "Road and flight dependence" angle never mentions flights.
- **Verdict:** WEAK (promise fail). Retitle as guidance ("LPG in Skardu: winter use and how to ask") or hold until a supplier is listed.

### `/lpg-in-murree/` — WEAK (13 raw, promise fail) 2/2/2/2/2/2/1
- **Intent vs delivery:** same: "does not list a Murree-based supplier".
- **Unique substance:** ≈ 285 words.
- **Works:** "Closed-up houses should have the cylinder valve shut and the hose checked before reuse." Good holiday-home angle.
- **Fails:** "Murree is within reach of our Islamabad and Rawalpindi supply side" is an unverified reachability claim. Snow/steep-road text overlaps Abbottabad.
- **Verdict:** WEAK (promise fail).

### `/lpg-in-muzaffarabad/` — WEAK (13 raw, promise fail) 2/2/2/2/2/2/1
- **Intent vs delivery:** network data shows 0 gas suppliers and 1 auto-LPG partner. H1 promises supply.
- **Unique substance:** ≈ 290 words.
- **Works:** "Our network data lists no gas supplier in Muzaffarabad, only one auto-LPG partner." Extra FAQ on auto-LPG with a warning never to fill a vehicle from a home cylinder.
- **Fails:** price/delivery/supply promise cannot be met; title says "Price, Cylinder Delivery & Supply".
- **Verdict:** WEAK (promise fail).

---

# 3. Industries

**Files:** `app/industries/page.tsx`, 9 two-line sector pages, `components/r4plus/industries-data.ts`, `components/r4plus/IndustryPage.tsx`.

**Template per sector (≈ 700 words rendered):** "Short answer" Note, uses (4 bullets), supply table (3 rows), quote needs (4 bullets), safety (4 bullets), the `IndustryCapabilities` block (5 bullets + the "No case studies yet" Note, identical on all 10 pages), related links, Other-industries chips, AI gallery, 3 FAQs.
**Honest strengths:** no fixed price claimed, no invented customer, FAQs hedge ("We do not promise this").
**Shared faults:** zero numbers (no cylinders per week, no kW, no kg/h, no tank size), zero standards, zero proof; the capabilities block is repeated boilerplate and confesses there is no evidence; AI images under "Photos"; "Our engineering team designs, installs and tests" (X-8).

### `/industries/` — WEAK (10) 2/1/1/2/1/2/1
- **Intent vs delivery:** H1 "LPG supply by industry". Delivers 9 cards, a one-paragraph process and the repeated capabilities block.
- **Unique substance:** ≈ 140 words beyond card text.
- **Works:** FAQ "Do you publish prices for industrial customers? No fixed list."
- **Fails:** link hub with a 4-link paragraph; "Every page ends with a request-a-quote form" (the form is in the sidebar).
- **Verdict:** WEAK (link hub).

### `/industries/restaurants/` — BORDERLINE (12) 3/2/1/2/1/2/1
- **Unique substance:** ≈ 315 words.
- **Works:** "Restaurants usually run on 45.4 kg cylinders, or on a cylinder bank when several burners work all day. Send your city, burners and cylinders per week". Supply table with three options.
- **Fails:** no typical cylinders-per-week range, no burner kW, no manifold sizing. "Do you offer credit? … We do not assume credit".
- **Verdict:** Borderline. Generic checklist.

### `/industries/hotels/` — BORDERLINE (12) 3/2/1/2/1/2/1
- **Unique substance:** ≈ 340 words.
- **Works:** "When should a hotel move to a bulk tank? When cylinder changes become frequent and storage space or handling becomes a burden."
- **Fails:** no room-count to gas-load guide, no hot-water sizing, no figure anywhere.
- **Verdict:** Borderline.

### `/industries/textile/` — BORDERLINE (12) 3/2/2/2/1/1/1
- **Unique substance:** ≈ 325 words.
- **Works:** "LPG is heavier than air and settles in low spaces … Install gas detection at low level near boiler rooms." Steam, thermal-oil, stenter uses named correctly.
- **Fails:** overlaps `manufacturing` almost line for line (same three supply rows, same services trio, near-identical quote needs and safety list). No steam load or kW example.
- **Verdict:** Borderline. Differentiation is weak against `manufacturing`.

### `/industries/food-processing/` — BORDERLINE (12) 3/2/1/2/1/2/1
- **Unique substance:** ≈ 300 words.
- **Works:** "a yellow, lazy flame needs servicing".
- **Fails:** no production-scale guide. FAQ "Is LPG suitable for food production?" answered in two sentences.
- **Verdict:** Borderline.

### `/industries/poultry-farms/` — BORDERLINE (14) 3/2/2/2/1/3/1
- **Unique substance:** ≈ 330 words.
- **Works:** "gas heaters use oxygen and produce combustion gases that harm birds and people"; "Check hoses and connections for rodent damage". Rural-access question ("Farm location, with road access for a truck"). Distinct intent.
- **Fails:** no brooder rating or kg-per-brooder-per-night figure, which is the number a farmer wants. Cold-season sizing is "we help you estimate".
- **Verdict:** Borderline; the most distinct sector page.

### `/industries/hospitals/` — BORDERLINE (13) 3/2/2/2/1/2/1
- **Unique substance:** ≈ 300 words.
- **Works:** "Do you guarantee uninterrupted supply? We do not promise this." "Gas stores must be away from wards, entrances and emergency routes." Reserve-days quote item.
- **Fails:** no reference to any hospital gas standard or the OGRA rules; "We help plan reserve stock" has no evidence; high-stakes sector with thin technical content.
- **Verdict:** Borderline.

### `/industries/housing-societies/` — BORDERLINE (13) 3/2/2/2/1/2/1
- **Unique substance:** ≈ 330 words.
- **Works:** "Cylinders inside apartments increase risk. Piped supply from an outdoor store is the safer design where it is allowed." Billing question: "How billing would work between residents and the operator".
- **Fails:** no approvals named, no per-home consumption guide.
- **Verdict:** Borderline.

### `/industries/manufacturing/` — BORDERLINE (11) 3/2/1/2/1/1/1
- **Unique substance:** ≈ 310 words, of which most restates `textile`.
- **Works:** "Bulk LPG storage is regulated. We help you understand what applies in your case; you remain responsible for approvals on your site."
- **Fails:** same supply rows and services as textile; generic "furnaces, ovens, dryers". Lowest sector score.
- **Verdict:** Borderline (bottom). Merge or differentiate by process.

### `/industries/weddings-and-events/` — BORDERLINE (14) 3/2/2/2/1/3/1
- **Unique substance:** ≈ 325 words.
- **Works:** standby-cylinder option; "Keep cylinders outdoors, upright and away from tents, crowds and open flames"; "Event date, time and venue city and area" quote items.
- **Fails:** no cylinders-per-guest figure; "How many cylinders will I need? … order a spare."
- **Verdict:** Borderline; distinct intent.

---

# 4. Tools

**Shared:** `ToolPage` adds an "Estimate only" Note, related list, gallery, FAQ. All calculators run in the browser with editable assumptions. I checked the arithmetic: 46 MJ/kg ÷ 3.6 = 12.8 kWh/kg; 1,055 ÷ 46 = 22.9 kg per MMBTU; 279.34 × 11.8 = Rs 3,296; the duration table rows (4.5/0.8 ≈ 6, 10.6/0.8 ≈ 13, 13.5/0.8 ≈ 17, 40.9/0.8 ≈ 51) all compute. Densities 0.51 (propane), 0.54 (mix), 0.58 (butane) are in the normal range. Shared faults: AI gallery under "Photos" (M = 1); the three price-prefilled calculators say "the OGRA-notified rate we have verified" (H-4, H = 2).

### `/tools/lpg-cylinder-duration-calculator/` — GOOD (19) 3/3/3/3/3/3/1
- **Intent vs delivery:** the H1 question ("how long will it last?") is answered by the first widget; hours-and-burners mode and kg-per-day mode.
- **Unique substance:** ≈ 380 words plus a working calculator.
- **Works:** reserve logic ("The flame weakens as the cylinder nears empty … around 10% gives a more realistic figure"); worked table "At 0.8 kg per day" explicitly labelled "only an example, not a typical household figure"; leak signal Note ("A fast drop may mean a leak"); daily gas cost shown with "gas only; excludes deposit and delivery"; "Is the result accurate? No."
- **Fails:** nothing that fails a gate. M = 1 (four AI images: `emptyFilled`, `cylLineup`, `kitchenFlame`, `familyKitchen`). The OGRA rate shown inherits H-4 but the page does not call it "verified".
- **Verdict:** **GOOD.** The only page in this audit that clears the strict bar.

### `/tools/lpg-cylinder-price-calculator/` — BORDERLINE (13) 3/2/1/2/3/1/1
- **Intent vs delivery:** calculates gas cost only; delivery and deposit are blank inputs. A searcher wants the price of a cylinder.
- **Unique substance:** ≈ 150 words plus a multiply-by-rate widget.
- **Works:** "11.8 kg is the weight of the gas. The empty steel cylinder weighs extra." Honest: "We do not assume a delivery charge or deposit".
- **Fails:** `SpecTable` repeats the `PriceBlock` figures that are on five other price URLs (D = 1). Hint: "Pre-filled with the OGRA-notified rate we have verified" (H-4). Image alt for `cyl454Specs` reads "Commercial LPG cylinder price size 45.4 kg — specification markings on the tank", keyword stuffing; `ograPriceScreen` is an AI "sample" monitor.
- **Verdict:** Borderline. Gas weight × rate is a commodity calculation.

### `/tools/lpg-litre-to-kg-converter/` — BORDERLINE, gated on G (17) 3/2/2/3/3/3/1
- **Intent vs delivery:** delivered, with editable density and per-litre gas cost.
- **Unique substance:** ≈ 330 words plus widget.
- **Works:** worked table at 0.54 kg/L (11.8 kg ≈ 21.9 L); "cylinders are filled below full to leave room for the gas to expand"; "LPG is sold by weight in Pakistan, so use kg when you compare prices."
- **Fails:** G = 2: a litre/kg converter with three densities is a commodity tool; no temperature correction. M = 1.
- **Verdict:** Borderline (gated). Close.

### `/tools/lpg-btu-kwh-converter/` — BORDERLINE, gated on G (18) 3/3/2/3/3/3/1
- **Intent vs delivery:** converts kg, MJ, kWh, BTU and MMBTU, plus a burner-rating-to-kg calculator.
- **Unique substance:** ≈ 300 words plus two widgets.
- **Works:** "The first three factors are fixed unit definitions. The last three depend on the heating value you enter." Burner section ("Use the burner's rated heat input, not its electrical or other rating").
- **Fails:** G = 2: unit conversion is widely available; the burner section is the only extra. Image `collageEquip` (heaters, hoses, tanks) has nothing to do with unit conversion; M = 1.
- **Verdict:** Borderline (gated).

### `/tools/lpg-tank-size-calculator/` — BORDERLINE, gated on G (17) 3/2/2/3/3/3/1
- **Intent vs delivery:** a rough storage figure from use, interval, reserve and fill level; honest "not a tank design".
- **Unique substance:** ≈ 330 words plus widget.
- **Works:** "What the calculator does not know" list (peak draw, site layout, boundary distances); 85% fill planning value flagged as set by tank and regulation.
- **Fails:** C = 2: no worked example row on the page, no mention of the typical tank sizes a Pakistani supplier offers. G = 2.
- **Verdict:** Borderline (gated).

### `/tools/lpg-vs-diesel-cost-calculator/` — BORDERLINE, gated on H (18) 3/3/3/2/3/3/1
- **Intent vs delivery:** full match.
- **Unique substance:** ≈ 330 words plus widget.
- **Works:** break-even diesel price output; "about 0.78 kg of LPG carries the heat of one litre of diesel" on stated assumptions; "Diesel engines and generators cannot simply run on LPG."
- **Fails:** Hint: "Pre-filled with the OGRA-notified rate we have verified" (H-4) so H = 2. No default diesel price (correct, but the page shows no worked saving, so a visitor sees nothing until they type).
- **Verdict:** Borderline (gated). Becomes GOOD when H-4 is fixed and a static worked example is added.

### `/tools/lpg-vs-sui-gas-cost-calculator/` — BORDERLINE, gated on H (17) 3/2/3/2/3/3/1
- **Intent vs delivery:** full match.
- **Unique substance:** ≈ 290 words plus widget.
- **Works:** "Is LPG cheaper than Sui gas? Usually not per unit of heat when you have a regulated pipeline connection." "We do not publish a Sui gas tariff here, so enter the figure from your own bill."
- **Fails:** H-4 hint ("OGRA-notified rate we have verified"). No static worked example (the sibling `/lpg-vs-sui-gas/` has one), so C = 2.
- **Verdict:** Borderline (gated).

---

# 5. Shop and appliances

**Files:** `app/shop/page.tsx`, `components/r4plus/ApplianceInfoPage.tsx` and 6 page files. Template: two identical Notes ("Short answer", "Stock and prices are confirmed on request"), page-specific sections, a compare table, "What to send for a quote", safety, related, images with an "illustrative" line, FAQs. Per-page unique ≈ 470–610 words of data, all generic and honest, no model, no price, no stock.

**Shared fault:** the template says "We have not published a verified price list" and then, from `terms.stockPolicy`, "listed appliances/accessories are held in inventory for same-day dispatch". Nothing is listed, so the inventory sentence is unsupported next to an admission that there is no list.

### `/shop/` — WEAK (10) 2/1/0/2/2/2/1
- **Intent vs delivery:** H1 "LPG appliances and accessories: stoves, geysers, heaters and more". Delivers eight category cards, zero products, zero prices.
- **Unique substance:** ≈ 200 words.
- **Works:** "Can I buy online from this page? Not yet." Honest.
- **Fails:** Note "Stock and prices pending" (working-state language, X-9). A shop with no SKU. FAQ "Listed appliances and accessories are held in inventory where our local team can fulfil" while nothing is listed.
- **Verdict:** WEAK. A link hub for pages that are themselves quote forms.

### `/shop/commercial-lpg-burners/` — BORDERLINE (13) 2/2/2/2/2/2/1
- **Intent vs delivery:** H1 offers burners; page explains types and price drivers; no model.
- **Unique substance:** ≈ 470 words.
- **Works:** "High heat input needs a regulator with enough capacity and a hose rated for the flow. For several burners on one line, use a manifold." Compare table (heat input, pressure, regulator capacity).
- **Fails:** no kW example; "What does a commercial burner cost? … We do not list a price here."
- **Verdict:** Borderline.

### `/shop/lpg-hoses-and-accessories/` — BORDERLINE (12) 2/2/2/2/2/1/1
- **Unique substance:** ≈ 470 words.
- **Works:** "Never test a connection with a flame: use soapy water"; replace-when list (cracks, stiffness, swelling).
- **Fails:** overlaps `/lpg-regulators/`, `/lpg-kit-price-in-pakistan/` and `/lpg-regulator-problems-and-repair/` (D = 1). No hose rating or standard named, no price.
- **Verdict:** Borderline.

### `/lpg-stove-price-in-pakistan/` — WEAK (11 raw, price URL without price) 1/2/1/2/2/2/1
- **Intent vs delivery:** URL, H1 and title promise a price. Intro: "We have not published a stove price list". The `stoveFront` alt reads "LPG stove price in Pakistan — two-burner stainless LPG gas stove front view", promising a price the page lacks.
- **Unique substance:** ≈ 545 words, none of them a rupee figure.
- **Works:** "What decides the price" list (burners, material, ignition, flame-failure device, kW); LPG-vs-natural-gas jet warning.
- **Fails:** FAQ answer "we confirm availability and price on a date" (sentence fragment). No range, no example, no model.
- **Verdict:** WEAK by rule. Either publish a verified price band or retitle (for example "LPG stoves in Pakistan: what to compare").

### `/lpg-geyser-price-in-pakistan/` — WEAK (12 raw, price URL without price) 1/2/2/2/2/2/1
- **Intent vs delivery:** same price-promise failure.
- **Unique substance:** ≈ 615 words.
- **Works:** "A poorly ventilated or enclosed room such as a small bathroom without a proper flue can fill with carbon monoxide, which cannot be seen or smelled." Instant vs storage split; cylinder duration advice for geyser draw.
- **Fails:** no price, no model, `geyserFront` alt carries "price" in the keyword.
- **Verdict:** WEAK by rule. The safety content is the best in the group, which makes the missing price more visible.

### `/lpg-heaters-in-pakistan/` — BORDERLINE (14) 3/2/2/2/2/2/1
- **Intent vs delivery:** H1 does not promise a price, and the page is explicit about that.
- **Unique substance:** ≈ 555 words.
- **Works:** "Propane vaporizes at lower temperatures than butane, so ask your supplier about the blend in cold areas." Oxygen-depletion and tip-over cut-off points; "Can I run a heater in a closed bedroom? No."
- **Fails:** no output-to-room-size figure; no price (acceptable here).
- **Verdict:** Borderline.

### `/lpg-vaporizers/` — BORDERLINE (15) 3/2/2/2/2/3/1
- **Intent vs delivery:** answers "what it does, when you need one".
- **Unique substance:** ≈ 530 words.
- **Works:** "A vaporizer is sized by peak gas flow in kg per hour, not by storage size." "We do not sell vaporizers for do-it-yourself fitting."
- **Fails:** no kg/h range, no ambient-vs-heated figures, no price. Template Notes sit awkwardly on an engineering page.
- **Verdict:** Borderline. Most distinct page in the group.

---

# 6. Services

**Files:** `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `lib/services.ts`. Each slug page ≈ 300–420 words total: intro, scope bullets (4–5), a process (the same 4-step `stdProcess` on 5 of 8 slugs), "What we need from you" (3 bullets), related chips, 1–3 FAQs. **Unique per slug ≈ 120–210 words.** No images on slug pages, no standards cited, no timeline, no price range, no project. All 9 URLs are `noindex` because `servicesIndexable` needs a consented project and there is none.

**Shared faults:** X-8; the `stdProcess` text ("Work is carried out by our own team of engineers and technicians, then tested before handover") is on 5 pages; related chips are rotating neighbours, not topical; no image (M = 1).

### `/services/` — BORDERLINE (12) 2/2/1/2/2/2/1
- **Intent vs delivery:** H1 matches. Intro: "through our national team of engineers".
- **Unique substance:** ≈ 120 words beyond the card text.
- **Works:** "Every job starts with a brief and a site assessment, followed by a written scope and price".
- **Fails:** "national team of engineers" and "You deal with one company from assessment to handover" are flat, unproven claims with an empty projects page. Meta says "LPG installation services in Pakistan", but no city, no capacity and no reference is given.
- **Verdict:** Borderline.

### `/services/lpg-pipeline-installation/` — BORDERLINE (13) 3/2/1/2/2/2/1
- **Unique substance:** ≈ 210 words (least templated of the eight).
- **Works:** scope includes "Load calculation and pipe sizing" and "Pressure and leak testing before commissioning"; FAQ "Can existing cylinders be connected to a pipeline? In most cases yes, through a cylinder bank or manifold."
- **Fails:** no pipe material, standard or test pressure named; no typical timeline.
- **Verdict:** Borderline.

### `/services/lpg-storage-tank-installation/` — BORDERLINE (13) 3/2/1/2/2/2/1
- **Unique substance:** ≈ 185 words.
- **Works:** "We size it from your load at the assessment and do not guess from a phone call." "Bulk storage is regulated."
- **Fails:** the meta promises "tank and vaporizer selection"; the body has no vaporizer line. No tank sizes, no approvals named.
- **Verdict:** Borderline.

### `/services/lpg-manifold-and-cylinder-bank-installation/` — BORDERLINE (13) 3/2/1/2/2/2/1
- **Unique substance:** ≈ 180 words.
- **Works:** "It is the usual next step for a kitchen that has outgrown one or two loose cylinders." Staff changeover training in scope.
- **Fails:** "How many cylinders can a bank hold? It depends" (no number or typical layout).
- **Verdict:** Borderline.

### `/services/lpg-air-sng-systems/` — BORDERLINE (12) 3/1/1/2/2/2/1
- **Unique substance:** ≈ 120 words, the thinnest slug.
- **Works:** "No. It suits specific cases. We tell you honestly at assessment if another option fits better."
- **Fails:** no explanation of why SNG exists, no air ratio, no interchangeability concept, one FAQ.
- **Verdict:** Borderline (bottom of the group).

### `/services/boiler-and-furnace-conversion-to-lpg/` — BORDERLINE (13) 3/2/1/2/2/2/1
- **Unique substance:** ≈ 160 words.
- **Works:** "We do not promise savings without your numbers; we can run the comparison with you."
- **Fails:** does not link the LPG vs diesel calculator that exists for exactly this decision.
- **Verdict:** Borderline.

### `/services/lpg-safety-audit-and-inspection/` — BORDERLINE (14) 3/2/2/2/2/2/1
- **Unique substance:** ≈ 175 words.
- **Works:** "Written findings with priorities" and a re-check option; the process is its own four steps.
- **Fails:** no checklist standard named, no sample report.
- **Verdict:** Borderline. Best of the services.

### `/services/lpg-maintenance-and-amc/` — BORDERLINE (13) 3/2/1/2/2/2/1
- **Unique substance:** ≈ 150 words.
- **Works:** "A service record for each visit."
- **Fails:** "What does an AMC cost? … We quote after a site review." No visit frequency example.
- **Verdict:** Borderline.

### `/services/lpg-cylinder-testing-and-inspection/` — WEAK (10, promise fail) 2/1/1/1/2/2/1
- **Intent vs delivery:** the meta description says "visual inspection, hydrostatic testing and condition checks … Ask us about batches." The body covers visual inspection, valve and seal check and marking check only. **There is no hydrostatic or periodic requalification test anywhere on the page.**
- **Unique substance:** ≈ 140 words.
- **Works:** "A cylinder in poor condition is a hazard."
- **Fails:** the snippet promises a test the page does not describe or claim; "Ask us about batches" is not on the page.
- **Verdict:** WEAK. Fix the meta or add the real test scope and who performs it.

---

# 7. Trust pages

### `/about/` — WEAK (9) 2/2/1/0/2/2/0
- **Intent vs delivery:** says who the company is; claims outrun proof.
- **Unique substance:** ≈ 250 words.
- **Works:** three-roles explanation; office address; licence number.
- **Fails:** "Visuals on this site are for partner preview; camera photos of G-12 and stock markings will replace temporary creatives" (draft language, X-9). Gallery is `officeExt1–3`, `officeReception`, `officeLobby`, `officeStaff`, `executiveHead`, `executiveDesk` (all `hold-ai`, X-6). "UK-trained specialists with 12+ years" (X-7). "manufactures standard LPG cylinders" and "competitive, manufacturer-direct pricing" with no plant, product or price shown. No people, no history beyond "registered since 1999".
- **Verdict:** WEAK (honesty, draft language).

### `/about/haroon-rasheed/` — WEAK (8) 1/1/0/1/2/1/2
- **Intent vs delivery:** URL names a person. H1 is "Safety leadership at THE LPG CO. PAKISTAN" and the body says no individual is named. Promise fail.
- **Unique substance:** ≈ 150 words.
- **Works:** emergency Note with 1122; honest FAQ "Why is no individual named?"
- **Fails:** "UK-trained specialists with 12+ years" attributed to a team (X-7). Page is `noindex` and the code comment says the URL should be retired.
- **Verdict:** WEAK. Redirect to `/about/`.

### `/contact/` — WEAK (10) 3/1/0/0/3/3/0
- **Intent vs delivery:** phone, WhatsApp, address and a form are present.
- **Unique substance:** ≈ 120 words.
- **Works:** "Smell gas? Do not contact us first." Clean layout; click-to-call.
- **Fails:** gallery is `officeExt2`, `officeReception`, `officeLobby`, all AI, with alt "entrance of THE LPG CO. PAKISTAN headquarters preview" (X-6). A visitor looking for Office #99 will not find a glass-fronted building. No email, no opening hours, no map.
- **Verdict:** WEAK (honesty). Without the images this is a Borderline-12 page.

### `/licences-and-compliance/` — WEAK (11) 3/2/1/1/2/2/0
- **Intent vs delivery:** states the OGRA licence number and the owner-supplied licence graphic.
- **Unique substance:** ≈ 200 words.
- **Works:** `licenceOfficial` is a real owner-supplied graphic; the number is shown and an OGRA link is given.
- **Fails:** gallery adds `cylStamp`, `inspectionCert`, `collageOgra` (AI; captions "Cylinder inspection certificate", alt "OGRA approved marking") on the page that asserts compliance, while the meta says "Documents are listed only when verified" (X-6). "UK-trained specialists" (X-7). No licence category, issue date or expiry. "Our engineering work is carried out by our own team" with no proof.
- **Verdict:** WEAK (honesty). A compliance page must carry only real documents.

### `/partner-standards/` — WEAK (11) 3/2/1/1/2/2/0
- **Intent vs delivery:** a list of seven standards.
- **Unique substance:** ≈ 230 words.
- **Works:** concrete criteria ("Cylinders in sound condition: no deep dents, heavy rust or leaking valves", "A written price list").
- **Fails:** visible Note titled "Draft": "This page is waiting for the owner to confirm that each standard is applied in practice." The code comment says "Do not publish until the owner has confirmed each line." Claims "a partner that repeatedly falls short stops receiving our orders" and "We ask for the licence and speak to the partner" are unconfirmed. Gallery `inspectionCert`, `cylStamp` (X-6).
- **Verdict:** WEAK (draft language, unverified claims).

### `/our-network/` — WEAK (12) 3/2/2/1/2/2/0
- **Intent vs delivery:** H1 "Our LPG distributor network"; page gives counts by province and the nine hub cities.
- **Unique substance:** ≈ 200 words and a data table.
- **Works:** real data table; "Where we are still building" Note ("We would rather say so than overpromise").
- **Fails:** headline "347 gas supply partners" against a province table that sums to 329 (X-3). "Counts of partners we work with" (X-2). Gallery `warehouseStaff`, `shopfront`, `deliveryTruck` (AI) labelled "Warehouse and network stock" and "LPG retail shopfront" (X-6). The strongest-cities list shows Burewala but not Multan or Gujranwala.
- **Verdict:** WEAK (honesty: numbers do not reconcile, AI images as network proof).

### `/projects/` — WEAK (9) 1/1/0/2/2/1/2
- **Intent vs delivery:** H1 "LPG engineering projects"; intro "Real completed LPG installations, shown only with the customer's consent". There are none (`projects: []`). The page itself says "We have no consented project to publish yet."
- **Unique substance:** ≈ 150 words beyond the services list.
- **Works:** honest empty state; "Equipment photos are illustrative and are not photos of a customer project" (the only page that discloses image status).
- **Fails:** an empty projects page cannot satisfy its H1 or meta ("See the kinds of pipeline, tank and manifold work we do"). The "kinds of work" grid duplicates `/services/`. Noindex in code (`index: listed.length > 0`).
- **Verdict:** WEAK. Cannot be Good until a consented project exists.

### `/how-it-works/` — BORDERLINE (12) 2/2/1/2/2/2/1
- **Intent vs delivery:** four steps plus the three roles. The intro "You always know who is supplying your gas and what role we play" does not state the flow.
- **Unique substance:** ≈ 220 words (much is `terms.*` strings reused elsewhere).
- **Works:** "We confirm the full price, deposit or exchange terms if they apply, and delivery timing (about one hour in covered network areas (confirmed on each order)) before you agree." The target is hedged, not claimed as measured.
- **Fails:** nested parentheses from the `deliveryTarget` string; the roles block is repeated on `about`, `order-lpg`, `lpg-home-delivery`; gallery uses AI people (`deliveryTeam`, `doorstepHandover`) (M = 1).
- **Verdict:** Borderline.

### `/pricing-policy/` — WEAK (11) 2/2/1/1/2/2/1
- **Intent vs delivery:** a clear commitments list.
- **Unique substance:** ≈ 230 words.
- **Works:** "We confirm the full price before delivery." "To compare suppliers, ask for the total price and divide by the kg of gas."
- **Fails:** "We publish figures only after checking them against the official source" and "We do not show prices we have not verified" are contradicted by `prices.json` (press-reported, "Re-check PDF", H-4). "competitive market pricing" and "Manufacturer-direct pricing" are unquantified. Image `ograPriceScreen` is an AI "sample" monitor.
- **Verdict:** WEAK (the policy is broken by the site's own data).

### `/complaints/` — WEAK (12 raw, promise fail) 2/1/0/2/2/2/2
- **Intent vs delivery:** the meta says "what we do next and how to escalate if you are not satisfied". The body has no escalation route, no response time and no reference number.
- **Unique substance:** ≈ 110 words.
- **Works:** "Safety issue with a cylinder? Do not use it. Tell us at once."
- **Fails:** the snippet promises escalation the page lacks; "We look into every complaint" has no timeline.
- **Verdict:** WEAK (promise fail, thin).

### `/editorial-policy/` — WEAK (12 raw, honesty fail) 3/1/0/1/2/3/2
- **Intent vs delivery:** states a sourcing and review standard.
- **Unique substance:** ≈ 170 words.
- **Works:** "No numbers or claims that we cannot support. When we do not know something, we say so." Commercial-interest line is honest.
- **Fails:** "Prices only from the official OGRA notification, with the date and source" (H-4). Safety review credited to a team with "UK-trained specialists" (X-7). No corrections log, no review dates beyond two pages.
- **Verdict:** WEAK (honesty).

### `/privacy/` and `/terms/` — Not scored
- Both are short and plain. Privacy names Google Analytics and the sharing of name, phone, city and request with the delivering distributor. Terms say a form is "a request, not a binding order". No draft language seen.

---

## Excluded (note only)

| Path | Note |
|---|---|
| `/gallery/` | Noindex, not in the registry. Shows all ~70 library images. H1 intro: "Preview for partners; we will replace any temporary creatives with camera photos of our real stock and G-12 office." Draft language, thin. |
| `/shop-preview/` | Noindex, not in the registry. "Stock prices and named suppliers will be confirmed before these pages are indexed." Thin; duplicates `/shop/`. |

---

## Full grade table

| Path | Grade | Score | A/C/G/H/K/D/M |
|---|---|---:|---|
| `/lpg-in-islamabad/` | WEAK | 9 | 2/2/1/0/2/1/1 |
| `/lpg-in-rawalpindi/` | WEAK | 9 | 2/2/1/0/2/1/1 |
| `/lpg-in-lahore/` | WEAK | 9 | 2/2/1/0/2/1/1 |
| `/lpg-in-karachi/` | WEAK | 9 | 2/2/1/0/2/1/1 |
| `/lpg-in-peshawar/` | WEAK | 8 | 2/1/0/2/2/0/1 |
| `/lpg-in-hyderabad/` | WEAK | 8 | 2/1/0/2/2/0/1 |
| `/lpg-in-faisalabad/` | WEAK | 8 | 2/1/0/2/2/0/1 |
| `/lpg-in-quetta/` | WEAK | 8 | 2/1/0/2/2/0/1 |
| `/lpg-in-burewala/` | WEAK | 8 | 2/1/0/2/2/0/1 |
| `/lpg-in-punjab/` | WEAK | 10 | 2/1/1/2/2/1/1 |
| `/lpg-in-sindh/` | WEAK | 10 | 2/1/1/2/2/1/1 |
| `/lpg-in-balochistan/` | WEAK | 10 | 2/1/1/2/2/1/1 |
| `/lpg-in-khyber-pakhtunkhwa/` | WEAK | 5 | 1/0/0/2/1/0/1 |
| `/lpg-in-azad-kashmir/` | WEAK | 5 | 1/0/0/2/1/0/1 |
| `/lpg-in-gilgit-baltistan/` | WEAK | 5 | 1/0/0/2/1/0/1 |
| `/lpg-in-multan/` | BORDERLINE | 13 | 2/2/2/2/2/2/1 |
| `/lpg-in-gujranwala/` | BORDERLINE | 13 | 2/2/2/2/2/2/1 |
| `/lpg-in-gilgit/` | BORDERLINE | 13 | 2/2/2/2/2/2/1 |
| `/lpg-in-abbottabad/` | BORDERLINE | 13 | 2/2/2/2/2/2/1 |
| `/lpg-in-skardu/` | WEAK (promise) | 13 | 2/2/2/2/2/2/1 |
| `/lpg-in-murree/` | WEAK (promise) | 13 | 2/2/2/2/2/2/1 |
| `/lpg-in-muzaffarabad/` | WEAK (promise) | 13 | 2/2/2/2/2/2/1 |
| `/industries/` | WEAK | 10 | 2/1/1/2/1/2/1 |
| `/industries/restaurants/` | BORDERLINE | 12 | 3/2/1/2/1/2/1 |
| `/industries/hotels/` | BORDERLINE | 12 | 3/2/1/2/1/2/1 |
| `/industries/textile/` | BORDERLINE | 12 | 3/2/2/2/1/1/1 |
| `/industries/food-processing/` | BORDERLINE | 12 | 3/2/1/2/1/2/1 |
| `/industries/poultry-farms/` | BORDERLINE | 14 | 3/2/2/2/1/3/1 |
| `/industries/hospitals/` | BORDERLINE | 13 | 3/2/2/2/1/2/1 |
| `/industries/housing-societies/` | BORDERLINE | 13 | 3/2/2/2/1/2/1 |
| `/industries/manufacturing/` | BORDERLINE | 11 | 3/2/1/2/1/1/1 |
| `/industries/weddings-and-events/` | BORDERLINE | 14 | 3/2/2/2/1/3/1 |
| `/tools/lpg-cylinder-duration-calculator/` | **GOOD** | 19 | 3/3/3/3/3/3/1 |
| `/tools/lpg-cylinder-price-calculator/` | BORDERLINE | 13 | 3/2/1/2/3/1/1 |
| `/tools/lpg-litre-to-kg-converter/` | BORDERLINE (gated G) | 17 | 3/2/2/3/3/3/1 |
| `/tools/lpg-btu-kwh-converter/` | BORDERLINE (gated G) | 18 | 3/3/2/3/3/3/1 |
| `/tools/lpg-tank-size-calculator/` | BORDERLINE (gated G) | 17 | 3/2/2/3/3/3/1 |
| `/tools/lpg-vs-diesel-cost-calculator/` | BORDERLINE (gated H) | 18 | 3/3/3/2/3/3/1 |
| `/tools/lpg-vs-sui-gas-cost-calculator/` | BORDERLINE (gated H) | 17 | 3/2/3/2/3/3/1 |
| `/shop/` | WEAK | 10 | 2/1/0/2/2/2/1 |
| `/shop/commercial-lpg-burners/` | BORDERLINE | 13 | 2/2/2/2/2/2/1 |
| `/shop/lpg-hoses-and-accessories/` | BORDERLINE | 12 | 2/2/2/2/2/1/1 |
| `/lpg-stove-price-in-pakistan/` | WEAK (price URL, no price) | 11 | 1/2/1/2/2/2/1 |
| `/lpg-geyser-price-in-pakistan/` | WEAK (price URL, no price) | 12 | 1/2/2/2/2/2/1 |
| `/lpg-heaters-in-pakistan/` | BORDERLINE | 14 | 3/2/2/2/2/2/1 |
| `/lpg-vaporizers/` | BORDERLINE | 15 | 3/2/2/2/2/3/1 |
| `/services/` | BORDERLINE | 12 | 2/2/1/2/2/2/1 |
| `/services/lpg-pipeline-installation/` | BORDERLINE | 13 | 3/2/1/2/2/2/1 |
| `/services/lpg-storage-tank-installation/` | BORDERLINE | 13 | 3/2/1/2/2/2/1 |
| `/services/lpg-manifold-and-cylinder-bank-installation/` | BORDERLINE | 13 | 3/2/1/2/2/2/1 |
| `/services/lpg-air-sng-systems/` | BORDERLINE | 12 | 3/1/1/2/2/2/1 |
| `/services/boiler-and-furnace-conversion-to-lpg/` | BORDERLINE | 13 | 3/2/1/2/2/2/1 |
| `/services/lpg-safety-audit-and-inspection/` | BORDERLINE | 14 | 3/2/2/2/2/2/1 |
| `/services/lpg-maintenance-and-amc/` | BORDERLINE | 13 | 3/2/1/2/2/2/1 |
| `/services/lpg-cylinder-testing-and-inspection/` | WEAK (promise) | 10 | 2/1/1/1/2/2/1 |
| `/about/` | WEAK | 9 | 2/2/1/0/2/2/0 |
| `/about/haroon-rasheed/` | WEAK | 8 | 1/1/0/1/2/1/2 |
| `/contact/` | WEAK | 10 | 3/1/0/0/3/3/0 |
| `/licences-and-compliance/` | WEAK | 11 | 3/2/1/1/2/2/0 |
| `/partner-standards/` | WEAK | 11 | 3/2/1/1/2/2/0 |
| `/our-network/` | WEAK | 12 | 3/2/2/1/2/2/0 |
| `/projects/` | WEAK | 9 | 1/1/0/2/2/1/2 |
| `/how-it-works/` | BORDERLINE | 12 | 2/2/1/2/2/2/1 |
| `/pricing-policy/` | WEAK | 11 | 2/2/1/1/2/2/1 |
| `/complaints/` | WEAK (promise) | 12 | 2/1/0/2/2/2/2 |
| `/editorial-policy/` | WEAK | 12 | 3/1/0/1/2/3/2 |

---

## Fix order (what moves the most grades)

1. **Delete the "test order … 60 minutes" sentence** (X-1). Moves 4 hubs off the honesty-fail list. Render `deliveryNote` instead.
2. **Replace AI images on `contact`, `licences-and-compliance`, `about`, `our-network`, `partner-standards`, `pricing-policy`** with real photos, or remove them (X-6). Moves 6 trust pages. Keep the real `licenceOfficial` graphic.
3. **Fix H-4 at source:** attach the OGRA PDF or screenshot to `prices.json`, or change the UI wording to "reported OGRA rate". Unlocks H = 3 on the diesel and Sui calculators (both would then reach GOOD with a static worked example) and removes the contradiction on `pricing-policy` and `editorial-policy`.
4. **Reconcile the network totals** (X-3) and soften "we work with N distributors" to "N suppliers listed in our network data" (X-2).
5. **Fill `cities` for KP, GB, AJK** in `network.json` and link the existing city pages (X-4); then write province-level facts or `noindex` the six province hubs and drop them from `hubSlugs`.
6. **Do not index the five no-override city hubs.** Give them at least one verified local fact each, or fold them into their province page. Clean the locality strings (X-5).
7. **Retitle or hold `skardu`, `murree`, `muzaffarabad`** (promise fail) and the two "price" appliance URLs until there is a verified price band.
8. **Remove draft and pending language** from `about`, `partner-standards`, `shop`, and the industries capabilities block (X-9). Confirm each partner standard with the owner before publishing.
9. **Fix the cylinder-testing snippet** or add the real test scope; add the missing escalation route and response time to `complaints`.
10. **Retire `/about/haroon-rasheed/`** (redirect to `/about/`) and correct the "UK-trained specialists" wording (X-7).
11. **Services and industries:** add one concrete number per page (typical cylinders per week, kW, kg/h, tank size, visit frequency) and one verifiable credential or project; differentiate `manufacturing` from `textile`.
12. **Housekeeping:** delete `lib/cities.ts` (UAE data, unused) and the unused `deliveryNote` path on the dynamic hub.

---

## Final counts

| Grade | Count |
|---|---:|
| **GOOD** | **1** |
| **BORDERLINE** | **32** (of which 5 are gated tools scoring ≥ 17) |
| **WEAK** | **33** |
| Not scored (`privacy`, `terms`) | 2 |
| Excluded noindex (`gallery`, `shop-preview`) | 2 |
| **Scored total** | **66** |
