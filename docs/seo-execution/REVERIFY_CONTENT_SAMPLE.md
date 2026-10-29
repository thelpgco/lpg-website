# Re-verify: content quality sample (after the 29 Oct fixes)

**Date:** 29 Oct 2026 · **Site:** `lpg-website` · **Mode checked:** production (no `NEXT_PUBLIC_SITE_MODE` in `.env.local`, so `siteMode()` returns `"production"`).
**Method:** every page was read from source (`page.tsx` plus the components, `lib/` and `data/` it renders) in production mode. I did not run the build or load a browser, and I did not read demo-mode output.
**Rubric (same as V2):** each of A/C/G/H/K/D/M is scored 0–3 (max 21).
- **GOOD** needs a total of 17 or more, **and** A≥3, G≥3 and H≥3, **and** no draft language, **and** the H1/URL promise kept.
- **BORDERLINE** is 11–16, or 17 or more with a failed gate.
- **WEAK** is 10 or less, or H≤1, or A≤1, or a broken promise.

## Headline

| | V2 (same 20 URLs) | Now |
|---|---:|---:|
| Good | 1 | **1** |
| Borderline | 3 | **15** |
| Weak | 15 | **4** |
| Not graded in V2 | 1 (`/management-review/`) | 0 |

**Plain reading:**
- The 29 Oct fixes removed the honesty failures: `[needs confirmation]`, Gate L, "pending" sentences, test-order claims and "awaiting sign-off".
- That moved 14 pages from Weak to Borderline.
- **Information gain barely moved.** G is still 1–2 on every page except the calculator.
- No page gained a real deposit, new-empty, delivery-fee, stock or empty-weight number. Production copy now says "quoted before you agree" in their place.
- **No new page cleared Good.** The best money page, `/lpg-price-in-pakistan/`, totals 17 but fails the G gate.
- The registry still has every page at `review` (`data/pages.json`: 119 of 119), so all of them are `noindex` and none are in the sitemap. None of the improvement is exposed to search yet.

---

## Cross-check items

### 1. PriceBlock source wording — PARTIAL PASS

`components/PriceBlock.tsx` lines 36–41 and `data/prices.json`.

Honest:
- It no longer says "verified by our team". It says: "Entered by THE LPG CO. team on 27 October 2026 from the monthly notification cycle (press coverage of the OGRA notice; PDF re-check when posted)."
- The `(press coverage …)` clause is driven by `sourceNote` in `prices.json` ("Dawn / The Nation / ARY summarising OGRA"), so the disclosure matches the data.
- The flagship also says it in the body: "entered by THE LPG CO. team on … from press coverage of the OGRA notification."
- The page labels the table "gas price only".

Not honest enough:
1. The block opens with "OGRA-notified LPG consumer price effective 1 October 2026". The secondary-source disclosure is a trailing grey parenthetical.
2. "PDF re-check when posted" was written on 27 Oct for a price effective 1 Oct. That is about four weeks stale and is a to-do shown to users. The link goes to the OGRA index page, not a notification PDF.
3. The fallback branch (no price on file) says "We publish a figure only after our team checks the official notification". That contradicts how the live figure was sourced. It is dormant, but it fires if the data is ever removed.
4. Pages that state the figure as OGRA-notified **without** PriceBlock carry no source line at all. These are `/lpg-price-per-kg-in-pakistan/` ("as notified by OGRA"), `/lpg-cylinder-price-in-pakistan/` ("live OGRA rate") and the `GasCostWorked` table on `/commercial-lpg-supply/`.
5. The data fields are still named `verifiedBy` and `verifiedOn`, and `/management-review/` prints "Verified: 2026-10 …". The source is a news summary.

Arithmetic is correct: 279.34 × 11.8 = 3,296.21 → Rs 3,296; × 5 = 1,397; × 15 = 4,190; × 45.4 = 12,682. Month on month is +Rs 20.69 (+8.0%) from Rs 258.65.

### 2. `isDemo()` leakage — gating is correct, but five FAQ strings leak

- **Gating that works.**
  - `lib/mode.ts` defaults to production.
  - `lib/products.ts` returns `productionCylinders` and an empty `appliances()` when not demo.
  - `lib/projects.ts` returns the empty `data/production/projects.json` when not demo.
  - `projects/[slug]` has `dynamicParams=false`, and `generateStaticParams` comes from the active mode's list, so no demo slugs are generated in production.
  - Every other use in `app/`, `components/` and `lib/` is a ternary or an `&&` that yields nothing in production. That covers kit, cylinder price, sizes, cylinders hub, shop, `ApplianceInfoPage`, `CylinderCostBlock`, `ContentImage` and `ImageGallery`.
  - `.env.example` sets production.
- **Leak 1: static copy that talks about demo mode and renders in production.** These are plain strings, not behind `isDemo()`:
  - `lpg-cylinders/12-kg-domestic-cylinder/page.tsx` line 35: "(in demonstration mode the page shows a DEMO figure)".
  - `new-lpg-connection/page.tsx` line 26: "(demonstration mode shows DEMO figures)".
  - `lpg-cylinders/45-kg-commercial-cylinder/page.tsx` line 43: "(demonstration mode shows a DEMO figure)".
  - `lpg-cylinders/composite-fiber-cylinder/page.tsx` line 40: "(demonstration mode shows a DEMO figure)".
  - `shop/page.tsx` line 30: "In demonstration mode the page shows DEMO prices only."
  - `components/Faq.tsx` copies every answer into the **FAQPage JSON-LD**, so the same text ships in structured data. This fails the "no draft/internal language" gate on four pages in this sample.
- **Leak 2: `/management-review/` is reachable in production.**
  - It is `noindex` and not in the registry or sitemap, but nothing blocks it. `robots.ts` only disallows `/api/` and `/lpg-hub/`, and there is no middleware.
  - It prints registry statuses, internal file names and "No password is required yet."
- **Minor.** `data/demo/*.json` is imported unconditionally, so demo data is in the server bundle. I found no client component importing `lib/products` or `lib/projects`, so it does not ship to the browser.

### 3. SafetyReview — PASS

- `data/safety-review.json` has `reviewedOn: 2026-10-29` and per-page dates for 6 paths.
- `SafetyReview.tsx` renders "Last reviewed on 29 October 2026", and `reviewedPageNode` emits `lastReviewed`.
- There is no "awaiting sign-off" string anywhere in `app/`, `components/` or `lib/`. Only a stale comment in `lib/schema.ts` still says "null until the reviewer signs that page off".
- If a date were missing, the fallback is neutral ("Safety guidance is maintained by the team…").
- Caveats:
  - All six dates are identical (29 Oct), the same day as the code fix. They read as batch stamps, so keep the real review record outside the repo.
  - The byline says "UK-trained specialists with 12+ years in LPG operations". That credential is unevidenced on the page. No name, certificate or body is given, for a safety (YMYL) page.

---

## Page grades

### 1. `/` — **BORDERLINE 13** · A3 C2 G1 H2 K2 D2 M1 (V2: WEAK 11)

- **Improved vs V2**
  - The draft sentence "Photos of markings … still pending" is gone. The certified-cylinder FAQ now reads "Every distributor and supplier in our network must supply only cylinders that carry valid certification markings."
  - The live price is in the hero ("Today's OGRA rate is Rs 279.34 per kg … Rs 3,296 of gas").
  - Delivery wording now matches `/delivery-areas/`: "delivery target about one hour in covered network areas (confirmed on each order)".
- **Remaining defects**
  - "OGRA-licensed since 1999". OGRA itself was created in 2002, so the owner must evidence this claim or it should be reworded to "operating since 1999". `company.yearsOperating` also gives "27+ years", while the code comment says ~21.
  - Identity is still inconsistent. The hero says "We also manufacture cylinders"; the meta says "OGRA-licensed LPG marketer"; the FAQ says "reseller and referral partner". There is no evidence of manufacturing anywhere on the site.
  - "347 listed supply partners in 51 cities". The per-city rows in `network.json` sum to 297, and `/delivery-areas/` also says "452 partners in total". None of this is explained.
  - The "Photo gallery" nav link to `/gallery/` is still there (V2 said to drop it).
  - The hero gallery is mostly AI images ("Office exterior (illustrative)", a delivery truck, and so on).
  - The price is repeated three times (hero, H2 "LPG price today", PriceBlock), with no unique data beyond MoM.

### 2. `/lpg-price-in-pakistan/` — **BORDERLINE 17 (gated: G2)** · A3 C3 G2 H3 K3 D2 M1 (V2: WEAK 10)

- **Improved**
  - This is the biggest rewrite. The number is in the H1 and intro: "…is Rs 279.34 per kg, so the gas in an 11.8 kg domestic cylinder costs Rs 3,296. That is up 8.0% on September 2026 (Rs 258.65 per kg)."
  - There is a month-on-month table with per-size deltas ("one 11.8 kg refill costs Rs 244 more in gas").
  - A "Where this figure comes from" section is honest: "…from press coverage of the OGRA notification."
  - All process and conditional copy is gone.
- **Remaining defects**
  - G2. The +8% is not explained on the page; it links out to `/why-lpg-prices-change-in-pakistan/`.
  - The "Official rate vs what you pay at the door" table has every Amount cell as "Quoted for your size and city before you agree". The doorstep total, which is the real question, is not answered.
  - The FAQ "What does aaj ka rate or LPG ki kimat mean on this page?" is SEO talk addressed to Google.
  - Three near-duplicate siblings still exist (per-kg, cylinder price, OGRA).
  - The gallery image is an AI "sample" price monitor (auto-captioned "(illustrative)").
  - The source-hedge issue from item 1 applies.

### 3. `/lpg-price-per-kg-in-pakistan/` — **BORDERLINE 11** · A3 C2 G1 H2 K2 D1 M0 (V2: WEAK 7)

- **Improved**
  - The number is in the H1 and intro, with MoM: "up Rs 20.69 (8.0%) on September 2026".
  - There is now a 1/2/3/5/10 kg table with exact figures (Rs 279.34, 558.68, …).
  - A useful FAQ: "Why does a shop quote a different per-kg price?"
  - The "SEO talk" sentence from V2 is gone.
- **Remaining defects**
  - It is still a strict subset of the flagship. The 1–10 kg table is arithmetic anyone can do.
  - H2: "OGRA-notified consumer price" and "as notified by OGRA", with **no source line or link** (no PriceBlock).
  - There is no image at all (M0).
  - Merge or 301 into the flagship is still the right call (V2 advice not taken).

### 4. `/lpg-cylinder-price-in-pakistan/` — **BORDERLINE 12** · A3 C2 G1 H2 K2 D1 M1 (V2: WEAK 10)

- **Improved**
  - The H1 now says what it prices: "Price of LPG cylinder in Pakistan: 11.8 kg gas Rs 3,296 (October 2026)".
  - Internal text is gone ("not published until the owner documents them").
  - The "How a typical total is built" note gives the first-time and repeat-refill structure.
- **Remaining defects**
  - The H1/URL still promise a *cylinder* price, and the body gives only the gas part.
  - The main table has three columns (deposit, new empty, delivery) × 5 rows. All 15 cells say "Quoted for your size and city before you agree" or "Confirmed with the distributor…". It is a table of identical cells.
  - The meta description (from `priceMeta`) ends "plus deposit and delivery", which oversells.
  - Gas figures duplicate the flagship.
  - No source line (H2).
  - The lineup image is captioned as fact ("Gas, cylinder and delivery are priced separately for each size") but looks AI-rendered. It is not labelled illustrative, while the same family of images is labelled illustrative on other pages.

### 5. `/lpg-cylinders/12-kg-domestic-cylinder/` — **BORDERLINE 13** · A3 C2 G1 H2 K2 D2 M1 (V2: WEAK 10)

- **Improved**
  - Every `[needs confirmation]` is gone.
  - The "Quick answer" is first and correct: "11.8 kg of LPG … currently about Rs 3,296 for the gas alone (Rs 279.34/kg)".
  - The "Empty weight is not the gas weight" note and the safety list are good. The hero image is captioned "(illustrative)".
- **Remaining defects**
  - **Demo leak in the FAQ** (and its JSON-LD): "(in demonstration mode the page shows a DEMO figure)". This is draft language, so it fails the gate.
  - Spec row: "Empty weight and size | Printed on the cylinder label; we state the exact figure for your cylinder when you order". The facts are still absent.
  - `PriceBlock` (four sizes) plus `CylinderCostBlock` repeat the same costs on an 11.8 kg page.
  - The FAQ "a small family … may take a few weeks per cylinder" is unsourced and sits oddly next to the calculator's default of about 14 days.

### 6. `/lpg-cylinder-refill/` — **BORDERLINE 14** · A3 C2 G1 H3 K2 D2 M1 (V2: WEAK 10)

- **Improved**
  - All placeholders are gone. The refill vs exchange table is clean: "Gas is filled into the cylinder you hold" against "You return an empty and receive a filled cylinder".
  - The hero image is captioned "(illustrative)".
  - `PriceBlock` is on the page, so the source is disclosed.
  - No demo-language leak on this page.
- **Remaining defects**
  - No refill price beyond gas, no turnaround and no stated test-date rule. "within test date" appears only in one FAQ answer.
  - `AllCylindersCostTable` repeats "Quoted for your size and city before you agree" per row.
  - `PriceBlock` and the table show the same sizes twice.
  - The "Refill … Usually none" shell-cost claim is unsupported.

### 7. `/new-lpg-connection/` — **BORDERLINE 16 (gated: G2, H2, draft leak)** · A3 C3 G2 H2 K2 D3 M1 (V2: WEAK 14, H0)

- **Improved**
  - Every `[needs confirmation]` is gone, so the automatic H≤1 failure is cleared.
  - It still has the best structure of the cylinder pages: a what-you-need table, deposit vs buy-new table, order steps and a 6-step first-use list ("Check for leaks with soapy water … never a flame").
  - The hero image is captioned "(illustrative)".
- **Remaining defects**
  - **Demo leak** in the FAQ and JSON-LD: "(demonstration mode shows DEMO figures)".
  - The cost question, the core of "new connection", is still unanswered: the Deposit, New empty and Delivery rows all say "Quoted before you agree". There is no regulator or hose price.
  - "We confirm accessory stock when you order" is the only stock statement.
  - G is capped because the checklist and first-use steps are standard advice.

### 8. `/delivery-areas/` — **BORDERLINE 14** · A3 C2 G2 H2 K2 D2 M1 (V2: WEAK 9)

- **Improved**
  - There is now a hub table: City | Province | "121 (42 open 24h)" | Status | Delivery target.
  - There are per-hub cards for the four hubs with local notes, and a province table with auto-LPG counts.
  - The delivery-time contradiction is gone. The Note now matches the home page: "Target in covered areas: about one hour when a local team is available; otherwise the distributor contacts you personally".
  - Draft language is gone.
- **Remaining defects**
  - The numbers are visible and unreconciled. The intro says "347 listed supply partners in 51 cities" and the table caption says "452 partners in total".
  - Status "Active hub, confirmed 27 October 2026" does not say what was confirmed. There is no test-order evidence, only owner notes.
  - The "What to expect in our active hubs" cards copy `city-overrides.json` text that also appears on the city pages.
  - The "Other cities" comma-run list is still a keyword dump.
  - There is no locality table and no "delivery confirmed Y/N" column per city.
  - The gallery is AI and landmark art.

### 9. `/lpg-home-delivery/` — **BORDERLINE 11** · A2 C2 G1 H2 K2 D1 M1 (V2: WEAK 9)

- **Improved**
  - The Gate L Note is removed.
  - The intro now gives the gas figure and the delivery target.
  - The payment FAQ now says "Cash on delivery is common for refills".
  - The "Where we deliver" copy names the active hubs.
- **Remaining defects**
  - There is still no delivery fee, hours table or per-city time.
  - The "Response and delivery time" paragraph still chains `responseTime + delivery + delivery247Note`.
  - The FAQ "What should I check when the cylinder arrives?" is answered with the partner certification rule, which is not a check list.
  - The "three roles" block is pasted on three pages (this one, `/order-lpg/` and the how-it-works pages).
  - The hero says "Cylinder delivered with the correct regulator and hose setup" as fact. The same image is captioned "(illustrative)" on `/new-lpg-connection/`, and that page says accessories are confirmed on order. This is an inconsistent claim (H2).

### 10. `/order-lpg/` — **BORDERLINE 13** · A3 C2 G1 H2 K2 D2 M1 (V2: BORDERLINE 12)

- **Improved**
  - The `terms.*` strings are now a labelled list ("Delivery:", "Ordering hours:", "Deposit:", "Exchange:", "New cylinders:", "Stock:"). V2 called the old text a "JSON dump".
  - The FAQ is candid: "It is a confirmed order request, not a one-click card checkout."
  - The gas figure is in the intro.
- **Remaining defects**
  - "manufactures standard cylinders" is unchanged and unevidenced.
  - "Stock: … listed appliances/accessories are held in inventory for same-day dispatch" appears while no appliances are listed anywhere.
  - The gallery still includes `63-mobile-app-fiction.png` ("Mobile LPG order (illustrative)"). V2 asked for it to be dropped, because it implies an app that does not exist.
  - No minimum order or fee numbers.

### 11. `/projects/` + `lib/projects.ts` — **WEAK 10** · A2 C1 G0 H3 K2 D1 M1 (V2: WEAK 9)

- **Demo gating: PASS.**
  - `projects()` returns `[]` in production.
  - `meta({ index: list.length > 0 && !isDemo() })` keeps it `noindex`.
  - H1 is "LPG engineering projects: none published yet".
  - The FAQ is honest: "We list a project only after the customer agrees in writing".
  - Demo cards, badges and notes are `demo`-gated, and `/projects/[slug]` has no production params.
- **Improved**
  - There is no promise of projects and no demo content visible in production.
  - Equipment photos carry "illustrative … not photos of a customer project".
- **Remaining defects**
  - It is an honest empty state. It has zero projects and zero evidence, and the rest is a link grid to service pages (G0).
  - Cannot exceed Weak or Borderline until a consented project exists.

### 12. `/management-review/` — **WEAK 10** · A2 C2 G1 H2 K2 D1 M0 (V2: not graded)

- It is an internal dashboard, not a content page. Content scoring is not really applicable.
- **Issue:** it is publicly reachable in production. It prints "Switch with NEXT_PUBLIC_SITE_MODE=demo …", "No password is required yet", and the registry's draft/review statuses.
- **Mode banner is correct:** "Production mode. Only verified data is shown on public pages; no demonstration catalogue, case studies or prices are rendered."
- **Recommendation:** return `notFound()` or require auth in production.

### 13. `/lpg-hub/[slug]/` (served at `/lpg-in-{slug}/`) — **WEAK (template)**

I graded the best and worst instances. Four of the 15 slugs reach Borderline.

| Instance | Score | A/C/G/H/K/D/M | V2 |
|---|---:|---|---|
| Karachi, Lahore, Islamabad, Rawalpindi (have `localNotes`) | **BORDERLINE 11** | 2/2/2/2/2/1/0 | WEAK 9 |
| Peshawar, Hyderabad, Faisalabad, Quetta, Burewala (counts and localities only) | **WEAK 9** | 2/2/1/2/2/0/0 | WEAK 8 |
| 6 province hubs | **WEAK 9** | 2/1/0/3/2/1/0 | WEAK 5 |

- **Improved**
  - The "test-order 60 minutes" claims are gone from the visible copy. The FAQ now uses `deliveryNote`: "Target about one hour in covered Karachi areas when a local team is available".
  - Province hubs now have an honest explanation ("no single city here has enough listings for its own page yet") with nearest-hub links.
  - The price block is on every city page, with "Same notified per-kg rate applies nationwide".
- **Remaining defects**
  - H1 says "price today" but the price appears only after about five sections, under "LPG 1kg price today in {city}".
  - The locality lists are raw scraped dealer strings:
    - Karachi: "Azam Basti Azam Town", "Clifton Punjab Colony", "Lower Gizri Gizri", "Upper Gizri Defence Housing Authority".
    - Lahore: "bala stop Sodhiwal", "Block C Model Town".
  - The local notes are generic and unsourced ("Coastal humidity makes cylinder condition checks … especially important"). The page then stamps "Verified by our team on 2026-10-27" in raw ISO format.
  - There is no media block (M0).
  - 11 of 15 slugs are still a name-swap of counts.

### 14. `/commercial-lpg-supply/` — **BORDERLINE 16** · A3 C3 G2 H3 K2 D2 M1 (V2: BORDERLINE 11)

- **Improved**
  - There is now a live **worked gas-cost table** from `GasCostWorked`: one 45.4 kg cylinder is Rs 12,682, then 4, 8 and 16 cylinders a month, plus the change since September.
  - The pasted `terms.*` lines are replaced with a labelled structure.
  - The short answer is honest: "We do not publish a fixed commercial price".
  - Safety text now says "leave first, then call 1122 from a safe distance".
- **Remaining defects**
  - G2. There is no restaurant consumption guide (cylinders per week by burner count) and no storage-limit rule.
  - The table shows only gas. Deposit and exchange are "confirmed before you agree".
  - The "347 partners / 51 cities" figure is unreconciled.
  - It overlaps `/bulk-lpg-supply/` and `/industrial-lpg-supply/`.
  - The images are AI scenes (auto-labelled illustrative).

### 15. `/what-to-do-if-you-smell-gas/` — **BORDERLINE 18 (gated: G2)** · A3 C3 G2 H3 K3 D3 M1 (V2: BORDERLINE 18)

- **Improved**
  - `SafetyReview` now shows "Last reviewed on 29 October 2026" and the emergency numbers box (1122, with a fallback "Use your local emergency number if 1122 is not active").
  - The leading danger note says "Do not use the order form in an emergency".
  - No draft language.
- **Remaining defects**
  - G is unchanged, because the steps are the standard consensus.
  - Order conflict: the Note says "Leave the area first, then call 1122", but step 2 is "Close the cylinder valve, if it is safe" before step 4 "Get everyone out".
  - The credential claim "UK-trained specialists with 12+ years" has no evidence on the page.
  - It does not mention turning off the stove knob or what to do for a leaking regulator or hose connection.
  - M1: the two images are AI. The page remains the closest to Good in the sample.

### 16. `/lpg-companies-in-pakistan/` — **BORDERLINE 15** · A3 C2 G2 H3 K2 D2 M1 (V2: WEAK 10, promise mismatch)

- **Improved**
  - The H1 is retitled "LPG companies in Pakistan: how OGRA licensing works", so the H1 now matches the body.
  - A "Not a directory" note is added.
  - There is a 6-step walkthrough for checking a licence on ogra.org.pk, a roles table ("What a customer can ask") and a "our licence as a worked example" table.
- **Remaining defects**
  - The URL and the searcher's intent are still "list of companies", and the body refuses to list any. The page is honest about it, but the demand it targets is not served.
  - The worked example invites readers to check licence 09024041999 and "operating since 1999". If OGRA does not show it, the trust damage is serious.
  - The gallery includes an AI `ogra-licence-sample` image on a page about verifying licences. It is auto-labelled illustrative.
  - Licence categories are never named.

### 17. `/lpg-near-me/` — **BORDERLINE 13** · A2 C2 G1 H3 K2 D2 M1 (V2: WEAK 10)

- **Improved**
  - The H1 is honest: "LPG near me: how we match you to a supplier near you". The "Why not just show a map of shops?" FAQ is a clear stance.
  - It has a "Main supply cities" list with partner counts and a provinces list.
  - There is no draft language.
- **Remaining defects**
  - It does not answer "near me" (no places or addresses). "Send your city" is the answer.
  - G1: the only data is partner counts.
  - The "347 partners / 51 cities" figure is unreconciled.
  - It repeats the delivery and terms boilerplate.

### 18. `/lpg-stove-price-in-pakistan/` — **BORDERLINE 12** · A2 C2 G1 H2 K2 D2 M1 (V2: WEAK 11, price URL without price)

- **Improved**
  - The production H1 is honest: "price on request, what decides it".
  - The meta title is now "What Decides It and How to Ask".
  - A "Price on request" note sits at the top.
- **Remaining defects**
  - It has no rupee figure, so the URL promise ("price") is not delivered.
  - The V2 fragment is still present: "we confirm availability and price on a date."
  - "Do you stock stoves? Listed appliances are held in inventory where our local team can fulfil" appears while no appliance is listed.
  - The `stoveFront` image alt still reads "LPG stove price in Pakistan — two-burner stainless…", and its caption is not labelled illustrative.

### 19. `/shop/` — **WEAK 10** · A2 C1 G0 H2 K2 D2 M1 (V2: WEAK 10)

- **Improved**
  - "Stock and prices pending" is replaced by a "Price on request" note.
  - The H1 is "LPG appliances and accessories: price on request".
  - "Can I buy online from this page? Not yet."
- **Remaining defects**
  - **Demo leak:** the FAQ says "In demonstration mode the page shows DEMO prices only." It ships in production and in JSON-LD.
  - The inventory claim is unchanged: "Listed appliances and accessories are held in inventory where our local team can fulfil", with nothing listed.
  - It has eight category cards, zero products and zero prices, so it is a link hub for quote forms.
  - Score unchanged from V2.

### 20. `/tools/lpg-cylinder-duration-calculator/` — **GOOD 19** · A3 C2 G3 H3 K3 D3 M2 (V2: GOOD 19)

- **No regression.** The working calculator comes first (default 11.8 kg, 3 h, 1 burner is about 14 days).
  - It has two modes, an editable burn rate with "Default 0.25 kg per hour is an assumption", and a reserve %.
  - It turns the live OGRA rate into Rs per day ("gas only; excludes deposit and delivery").
  - The worked table checks out: 4.5/10.6/13.5/40.9 kg usable gives about 6/13/17/51 days at 0.8 kg/day.
  - It says "Is the result accurate? No."
  - There is no draft language, and the H1 promise is delivered.
- **Remaining defects** (V2 advice not done)
  - No appliance presets (geyser, heater, tandoor).
  - No source for the 0.25 kg/h figure.
  - The "a few weeks" claim on `/lpg-cylinders/12-kg-domestic-cylinder/` is not tied to it.

---

## Sample counts

| Grade | V2 (these 20 URLs) | Now | Pages |
|---|---:|---:|---|
| **Good** | 1 | **1** | duration calculator |
| **Borderline** | 3 | **15** | `/`, flagship, per-kg, cylinder price, 12 kg, refill, new connection, delivery areas, home delivery, order, commercial, smell gas, companies, near-me, stove |
| **Weak** | 15 | **4** | projects, management-review, hub template, shop |

V2 breakdown for the same URLs:
- **Good (1):** duration calculator.
- **Borderline (3):** order-lpg, commercial, smell-gas.
- **Weak (15):** `/`, flagship, per-kg, cylinder price, 12 kg, refill, new connection, delivery areas, home delivery, projects, companies, near-me, stove, shop, and the hub template (cities scored 5–9).
- **Not graded:** management-review.

**Movement:** 14 pages moved from Weak to Borderline. None were downgraded. 1 stays Good, 3 Borderline pages stayed Borderline, and 2 Weak pages stayed Weak.

## Fix list, highest value first

1. **Delete the five "demonstration mode" FAQ strings** (12 kg, 45 kg, composite, new connection, shop). That is a 10-minute fix and restores the no-draft-language gate on four pages.
2. **Resolve or reword two identity claims:** "OGRA-licensed since 1999" and "we manufacture cylinders". Both are unevidenced, and OGRA itself dates from 2002.
3. **Reconcile the network numbers** (347 suppliers, 452 partners, 297 summed across cities), or explain "partners = suppliers + auto-LPG".
4. **Put a source line on every page that states the rate** (per-kg, cylinder price, commercial). Replace "PDF re-check when posted" with an actual PDF link or a date, and rename `verifiedBy` / `verifiedOn`.
5. **Get real shell numbers** (deposit, new-empty, delivery fee per size, tare weight). Nothing else will lift G above 2 on the money and cylinder pages.
6. **Gate `/management-review/`** in production.
7. **Clean the Karachi and Lahore locality strings**, and drop or evidence the "Verified by our team" lines.
8. **Set the real reviewer evidence** behind the SafetyReview credential line, and decide on indexing: all 119 pages are `review`.
