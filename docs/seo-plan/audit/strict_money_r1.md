# Strict content-quality re-audit: HOME + MONEY + R1 (v2, harsher rubric)

Audit date: 28 Oct 2026. Site: `D:\SparePartsHub-App\lpg-website`. Every page below was read in full, together with its shared components (`PriceBlock`, `lib/prices.ts`, `lib/network.ts`, `lib/seo.ts`, `lib/media.ts`, `ContentImage`, `ImageGallery`, `Calculator.tsx`) and the data files `prices.json`, `city-overrides.json`, `commercial-terms.json`, `network.json` and `MEDIA_STATUS.md`.

Scoring: A answer-first, C coverage, G info-gain, H honesty, K craft, D differentiation, M media honesty. Each is 0–3, so the maximum is 21.

- **GOOD** needs total ≥17, A≥3, G≥3, H≥3, no draft or internal language visible to users, and a page that delivers what its H1 and URL promise.
- **WEAK** applies if total ≤10, or H≤1, or A≤1, or the H1/URL promises price or a list that the body refuses to give, or the unique substance is mostly a template swap.
- **BORDERLINE** is everything else.
- H calibration: H=3 means no hedging or draft leakage. H=2 means minor hedging only. H=1 means visible internal or draft language. H=0 means literal placeholders, contradictions, or a fabricated-looking claim.

Status note: every page in scope is `status: "review"` in `data/pages.json`, so all are currently noindex. The grades judge content quality, not current index state.

---

## Cross-cutting findings that drive many scores

1. **Literal `[needs confirmation]` placeholders appear on user-visible pages.**
   - They are on `/lpg-cylinders/12-kg-domestic-cylinder/`, `45-kg-commercial-cylinder/`, `5-kg-cylinder/`, `composite-fiber-cylinder/`, `/lpg-cylinder-refill/` and `/new-lpg-connection/`.
   - They sit in table cells, FAQ answers and body copy.
   - Example: "The amount for your size and city is [needs confirmation] with us before you agree."
   - This is automatic H=0 on those pages.
2. **Owner and process language leaks to users.**
   - "until the owner documents them" appears on `/lpg-cylinder-price-in-pakistan/` and `/lpg-cylinders/`.
   - "still pending owner photos" appears on `/lpg-cylinders/`.
   - "Photos of markings on our stock are still pending" appears in the home FAQ.
   - "(Gate L)", "test orders" and "partners are verified over time" appear on `/lpg-home-delivery/` and the city price pages.
   - "price file", "amber 'being updated' notice" and "a longer CSV history needs three or more checked months" appear on the price pages.
3. **Verification claims overreach the data.**
   - `PriceBlock` prints "Checked by THE LPG CO. team on 27 October 2026. Official OGRA source", and the copy says "we publish only after we check the official notification".
   - But `prices.json` `sourceNote` says: "as reported from the official notification cycle (Dawn / The Nation / ARY summarising OGRA…). Re-check PDF on ogra.org.pk when the file is posted."
   - The Sept 2026 row is "prior month figure cited in October notification coverage". Both rows link to the generic OGRA index page, not the notification.
   - So the price rests on secondary reporting, not on a checked primary notification, while the UI says otherwise.
4. **Contradictory delivery promises.**
   - Home, price pages and city pages say "about one hour".
   - `/delivery-areas/` says "we do not promise one time for every city".
   - `/lpg-home-delivery/` says "We do not assume cash on delivery"; `/order-lpg/` FAQ says "cash on delivery is common".
   - `commercial-terms.stockPolicy` says "held in inventory for same-day dispatch", while the cylinder pages say stock is "[needs confirmation]".
5. **Template-swap bleed.**
   - The identical "How to read this page" Note, the identical "× price per kg" formula lists, the identical "three roles" block and the identical `terms.delivery` string are pasted across 5–8 pages.
6. **AI imagery shown as real.**
   - `MEDIA_STATUS.md` states the whole `hold-ai` pack is "ChatGPT-edited… temporary creatives".
   - The `hold-ai` filenames include `-faces`, `mobile-app-fiction`, `kitchen-45kg-unrealistic`, `office-exterior-ai-hq` and `ogra-price-monitor-sample`.
   - Hero `ContentImage` captions say "(illustrative)" on some pages. But every `ImageGallery` ("Photos") renders bare captions such as "Delivery team handover", "Doorstep LPG delivery", "Karachi LPG delivery", "OGRA price check", "Mobile LPG order", "Cylinder shoulder marking" and "Printed cylinder specs".
   - A visitor would read those as real. The "marking" and "spec label" images also invent certification and tare-weight text.
   - `/lpg-cylinders/` simultaneously says marking photos are "pending", yet its gallery shows a "Cylinder shoulder marking" image.

---

## HOME + MONEY

### `/` (app/page.tsx) — WEAK (11/21) A2 C2 G1 H1 K2 D2 M1
- **Intent vs delivery:** The home page is meant to say what the business is, show the price and route to ordering. It does, with a live price block and a hub-city list.
- **What works:**
  - Clear H1 ("LPG cylinders and gas supply across Pakistan").
  - Real licence number and office address.
  - Live `PriceBlock`, honest "tell you honestly whether we can reach you", and a 3-step how-it-works.
- **What fails:**
  - FAQ "Are your cylinders OGRA-certified?" ends: "Photos of markings on our stock are still pending." This is draft language visible to users and trips the H gate.
  - The hero calls the company "Manufacturer and marketer" while the meta description says "marketer", and the FAQ says "reseller and referral partner". The identity is inconsistent.
  - "Delivery target about one hour" contradicts `/delivery-areas/`.
  - A "Photo gallery" nav link points to a dump of AI images (`/gallery/`).
  - There are no real extras (no numbers beyond "347 partners in 51 cities").
- **Verdict:** rewrite lightly. Deleting the "pending" sentence, unifying the identity wording and dropping the gallery link lifts it to Borderline. It needs real proof assets (licence scan, real stock, real depot) to reach Good.

### `/lpg-price-in-pakistan/` — WEAK (10/21) A2 C2 G1 H1 K2 D1 M1
- **Intent vs delivery:** "LPG rate in Pakistan today" is delivered. Rs 279.34/kg and the 5, 11.8, 15 and 45.4 kg gas costs appear in the price block directly under the intro.
- **What works:** The number and its effective date are there. It separates "gas price" from "doorstep total". The sizes table is correct (279.34 × 11.8 = Rs 3,296).
- **What fails:**
  - The intro hedges ("the figure we have verified… (when available)"), so the number is not in the first sentence.
  - Internal language is visible: "Numbers appear only after we enter a checked OGRA notification in our price file", "a longer CSV history needs three or more checked months on file", "City supply hubs… open after we verify partners and a test order".
  - "We do not publish a standing 'delivery fee' table until those terms are written down" reads as a to-do.
  - Conditional copy ("if you see the amber 'being updated' notice") is stale when the data is live.
  - Nothing unique: no month-on-month change, no per-size deltas and no "what moved" explanation on this page.
  - Three near-identical siblings (per-kg, cylinder price, OGRA).
  - The OGRA monitor image is a "sample" AI picture captioned "OGRA price check".
- **Verdict:** rewrite as the single flagship. Lead with the number and the +8.0% change, drop the conditional and process copy, and fold in the per-kg and OGRA pages (see below). Real sourcing of the price is required first (see data findings).

### `/lpg-price-per-kg-in-pakistan/` — WEAK (7/21) A2 C1 G1 H1 K1 D0 M1
- **Intent vs delivery:** "LPG 1kg price today" is delivered as a single number, but the page is nearly a subset of the flagship.
- **What works:** The number, date and source link are shown. The "divide a shop's total by kg to compare fairly" tip is the one useful idea.
- **What fails:**
  - It uses the same `PriceBlock`, the same "How to read this page" Note, the same formulas and the same FAQ as `/lpg-price-in-pakistan/`.
  - It repeats "Searchers ask for lpg 1kg price today pakistan… or aaj ka rate", which is SEO talk addressed to Google, not to users.
  - It carries the same "being updated" conditional copy.
  - There is no unique content, and "FAQ: Is the per-kg price the same in every city?" is hedged although `commercial-terms` says it is.
- **Verdict:** merge into `/lpg-price-in-pakistan/` with a 301. If a separate URL is kept, it needs a distinct angle (per-kg history and per-kg comparisons by size).

### `/lpg-cylinder-price-in-pakistan/` — WEAK (10/21) A2 C2 G1 H1 K2 D1 M1
- **Intent vs delivery:** The H1 promises the price of a cylinder. The body gives only the gas portion and explicitly declines to give deposit, new-empty or delivery amounts, so it fails the "promises price the body refuses to give" gate.
- **What works:**
  - The gas, shell and delivery split is the right framing.
  - The size table is correct.
  - The "what changes your bill" list is sensible.
- **What fails:**
  - "Standing deposit and delivery tables are not published until the owner documents them" is internal language.
  - The FAQ "price of a new, empty cylinder" answers only "Ask us… vary by distributor".
  - Rs figures duplicate the flagship's table.
  - There is nothing unique and no real rupee range for the shell.
- **Verdict:** rewrite. Get deposit and new-empty ranges per size from the owner and publish them, or retitle to "LPG cylinder gas cost by size" and merge into the flagship.

### `/ogra-lpg-notified-price/` — WEAK (10/21) A2 C2 G1 H1 K2 D1 M1
- **Intent vs delivery:** The page should explain the OGRA notification and show the current figure. It shows a 2-row table and a generic "how to read" list, with no real notification evidence.
- **What works:** The OGRA site pointer ("Prices → LPG Notified Prices"), the effective-date explanation and the history table.
- **What fails:**
  - The FAQ "Why is your table empty or showing an update notice?" and the empty-state copy ("No verified notification has been added yet") are draft states shown on a populated page.
  - "Until the first verified month is entered" is internal.
  - It claims "we check against the official site" while the data note says the figure came from news summaries.
  - The "OGRA" link goes to the generic index, not to a notification PDF.
  - The history table duplicates `/lpg-price-in-pakistan/history/`.
  - There is no screenshot of a real notification.
- **Verdict:** merge with `/history/`. Make this URL the single "OGRA notified price and history" page, with the real notification PDF or screenshot and the delta table.

### `/lpg-price-in-pakistan/history/` — BORDERLINE (12/21) A2 C1 G2 H2 K2 D2 M1
- **Intent vs delivery:** The H1 promises "monthly OGRA notified rates" history. The body delivers two months (Sept and Oct 2026), so coverage is thin for a "history" URL.
- **What works:**
  - Real extras: month-over-month delta (+Rs 20.69/kg, +8.0%), 11.8 and 45.4 kg columns, a bar chart and a 4-step "use the history" list.
  - Honest "2 months on file… we do not fill gaps".
  - The arithmetic is correct.
- **What fails:**
  - Two rows cannot answer "history". Competitors show 12–60 months.
  - "First month on file" is a draft label.
  - "A trend line needs at least three checked months" explains the data process to the user.
  - It carries the same unverified-source overclaim in the `PriceBlock`.
  - The AI "OGRA price check" image is shown unlabelled.
- **Verdict:** keep and fix. Backfill at least 12–24 months from OGRA's archive, with the real notification links, before publish. Hold-noindex until then.

### `/lpg-price-in-pakistan/[city]/` (karachi, lahore pattern) — WEAK (7/21) A2 C1 G0 H1 K2 D0 M1
- **Intent vs delivery:** "LPG price in Karachi/Lahore today" is delivered only as the national number relabelled with the city name. The page itself says the rate is identical everywhere.
- **What works:**
  - Honest that the rate is national.
  - Locality lists for Karachi and Lahore come from real partner data (121 and 33 suppliers).
  - The page is noindex by code because `hasCityPrice` is false.
- **What fails:**
  - It is a template swap: only `c.name`, `c.suppliers` and localities change between cities.
  - "Gate L" and "test orders" are internal terms shown to users.
  - "Local supply checks for Karachi were recorded on 2026-10-27" is a raw ISO date in a vague claim.
  - "That list comes from published sources" contradicts `network.json`, whose source is the "Owner-supplied distributor list".
  - The caption "landmark context… (not a branch office)" over stock art is padding.
  - The FAQ "Target about 60 minutes" comes from `testOrderMinutes: 60`, set identically for all four cities (see data findings).
  - `localNotes` in `city-overrides.json` are never used.
  - Because `sameOgraRateAllCities` is true, `hasCityPrice` can never become true, so these pages can never be indexable under the current gate.
- **Verdict:** merge into the national page and redirect. Hold-noindex in the meantime.

### `/lpg-cylinders/` — WEAK (9/21) A2 C2 G1 H0 K2 D1 M1
- **Intent vs delivery:** It is the cylinder range hub. The body is a short guide to types and sizes with no real catalogue, no sizes table and no prices.
- **What works:** Clean steel and composite explanation, a "check on delivery" list and onward links.
- **What fails:**
  - A Note titled "Photo guide pending": "A close-up guide to markings… is still pending owner photos".
  - "We do not publish standing exchange terms until the owner documents them".
  - The gallery shows "Cylinder shoulder marking" and "Printed cylinder specs" AI images while the page says marking photos are pending.
  - It repeats the sizes page almost sentence for sentence.
  - It claims "We supply… composite cylinders" without any confirmed stock.
- **Verdict:** rewrite. Remove the draft Notes, use real marking photos or none, and make this a true hub with a sizes table, a stock matrix and prices.

### `/lpg-cylinder-sizes-in-pakistan/` — WEAK (11/21) A3 C1 G1 H1 K2 D2 M1
- **Intent vs delivery:** It promises sizes in Pakistan. It gives a 4-row table but explicitly lacks dimensions and empty weights, which are the real information gain for this query.
- **What works:** The table sits directly under the lineup image. The "size = gas weight" point is correct, and the per-size sections and the sizing tips are useful.
- **What fails:**
  - A Note says: "Exact empty weight and height… are not on file yet. When we have supplier specs, we will add them here." This is draft language.
  - "We do not list rupee totals here" while a verified price exists.
  - FAQ "Are composite cylinders available in all sizes?" gives no answer.
  - The images invent tare and spec labels.
  - It covers only the same four sizes everyone lists, with no 6 kg or 14.2 kg and nothing on valve types (POL vs Click-on).
- **Verdict:** rewrite. Add tare weight, height, diameter, valve type, price per size and typical days of use per size, from real supplier specs. This page is the strongest candidate to become Good.

### `/lpg-home-delivery/` — WEAK (9/21) A2 C2 G1 H1 K1 D1 M1
- **Intent vs delivery:** It explains the delivery process, not delivery itself. It gives no fee, no hours, no areas table and no time beyond the generic "about one hour".
- **What works:** A clear 4-step process, a role disclosure, hub-city chips and a commercial cross-link.
- **What fails:**
  - The Note "Partners verified over time… (Gate L), we run partner calls and test orders" is internal.
  - The "Response and delivery time" paragraph prints `terms.delivery`, `deliveryTarget` and `delivery247Note` back to back, repeating the same promise three times.
  - FAQ "Do I pay before or after delivery?" does not answer, while `/order-lpg/` says COD is common.
  - The "three roles" block is pasted from other pages.
  - The gallery shows unlabelled AI "Doorstep LPG delivery" faces.
- **Verdict:** rewrite. Give the real answers (fee, payment, hours, areas, delivery time by city) and drop the Gate L text and the duplicated sentences.

### `/order-lpg/` — BORDERLINE (12/21) A3 C2 G1 H2 K1 D2 M1
- **Intent vs delivery:** The page delivers a transactional route: the form sits beside a clear phone and WhatsApp block, and a "what to tell us" list. The FAQ is honest that this is "not a one-click checkout".
- **What works:** It is answer-first for a conversion page. The "what to tell us" and "what we confirm" lists are practical, and the payment FAQ is candid.
- **What fails:**
  - `terms.stockPolicy` is pasted in parentheses mid-sentence ("holds inventory (Standard cylinder sizes and listed appliances/accessories are held in inventory…)"). The sentence reads as a JSON dump.
  - "manufactures standard cylinders" has no evidence (no factory, no certification) and conflicts with partner-supplied cylinders elsewhere.
  - The three-roles block is repeated again.
  - The gallery shows the AI "mobile-app-fiction" image captioned "Mobile LPG order", which implies an app or ordering UI that does not exist.
  - It has no unique numbers (no minimum order, no fee).
- **Verdict:** keep and fix. Rewrite the `terms` strings into prose, remove or substantiate the "manufactures" claim, and drop the app-fiction image.

### `/delivery-areas/` — WEAK (9/21) A2 C1 G1 H1 K1 D2 M1
- **Intent vs delivery:** It promises areas. It gives 9 hub links with partner counts, province chips and a comma-run list of about 42 other cities, with no per-city delivery detail.
- **What works:** The honest "if your city is not here, send a request", and the real partner counts per city (Karachi 121, Islamabad 46, Lahore 33).
- **What fails:**
  - The Note "Delivery time… we do not promise one time for every city" contradicts the home page and the city pages ("about one hour").
  - The "Other cities" comma list is a keyword dump.
  - There is no table, no FAQ and no open-24h or auto-LPG counts, even though `network.json` has them.
  - Partner counts imply active partners, while the data is an "owner-supplied list, counts only".
  - It uses city landmark stock art.
- **Verdict:** rewrite. Build a table with city, partners, 24h-open count, localities and delivery confirmed (Y/N), and reconcile the delivery-time wording.

### `/why-lpg-prices-change-in-pakistan/` — BORDERLINE (18/21) A3 C3 G2 H2 K3 D3 M2
- **Intent vs delivery:** It explains why LPG prices change, and does. The "Short answer" is first, followed by the live month-to-month change and a drivers table. This is the best of the money cluster.
- **What works:**
  - Real extras: the live delta table (+Rs 20.69/kg, +8.0%, about +Rs 244 per 11.8 kg cylinder).
  - A per-kg to per-cylinder sensitivity matrix (Rs 5/10/20/50 × 4 sizes, all arithmetic correct).
  - A drivers table, a 5-step "how to handle" list, and a clear "price change ≠ shortage" section.
  - It does not invent causes: "We do not state why one particular month moved unless we can cite a dated source."
  - The OGRA image is captioned "(illustrative screen)".
- **What fails:**
  - It admits it cannot say why the +8% happened. The user's real question for this month goes unanswered (no cited cause such as the Aramco CP or the PKR rate).
  - The drivers table has no figures (no Aramco CP, no PKR/USD, no tax share), so the G score is capped.
  - The underlying price is the unverified-source figure.
  - The gallery repeats the unlabelled AI "OGRA price check".
- **Verdict:** keep. To reach Good, add a dated, cited cause for Oct 2026 (Aramco CP and exchange rate), add a rough per-kg cost breakdown, and re-source the price from the real notification.

---

## R1

### `/lpg-cylinders/12-kg-domestic-cylinder/` — WEAK (10/21) A3 C2 G1 H0 K1 D2 M1
- **Intent vs delivery:** The page promises the 11.8/12 kg cylinder: spec, price and ordering. It gives a live gas price but leaves the specs and shell cost as placeholders.
- **What works:** The Quick answer states "about Rs 3,296 for the gas alone (Rs 279.34/kg)" at the top. The "who it suits" list, the safety list and the empty-weight warning are good.
- **What fails:**
  - The spec table reads "Empty cylinder weight and height | [needs confirmation]". The shell-cost table reads "[needs confirmation] per size and city".
  - The FAQ reads "The amount for your size and city is [needs confirmation] with us before you agree" (a broken sentence).
  - The delivery section reads "Stock for the size and city is [needs confirmation]".
  - The `PriceBlock` repeats all four sizes on an 11.8 kg page.
  - The FAQ claim "a few weeks" for a family is unsupported and conflicts with the calculator's 13-day example.
  - The gallery shows AI spec-label and stamp images.
- **Verdict:** rewrite. Remove every `[needs confirmation]`. Add the real empty weight, dimensions, deposit amount and a days-per-cylinder table by household type.

### `/lpg-cylinders/45-kg-commercial-cylinder/` — WEAK (10/21) A3 C2 G1 H0 K1 D2 M1
- **Intent vs delivery:** It promises the commercial cylinder: who needs it, how to handle it, price and ordering. The price and handling are partly delivered, the commercial detail is not.
- **What works:** The Quick answer gives about Rs 12,682 gas. The domestic vs commercial table and the handling checklist are sound.
- **What fails:**
  - `[needs confirmation]` appears in the spec table (empty weight), the shell row, the stock paragraph and two FAQ answers ("Availability and the delivery window are [needs confirmation]").
  - "How many 45.4 kg cylinders can I keep on site?" gives no figure and no regulation.
  - There are no commercial pricing or volume terms, and no weekly-consumption guide for restaurants.
  - The gallery repeats AI restaurant and warehouse scenes.
- **Verdict:** rewrite. Add the empty weight, dimensions, deposit, a restaurant consumption table (cylinders per week by burner count) and the storage rule from OGRA or the safety review.

### `/lpg-cylinders/5-kg-cylinder/` — WEAK (8/21) A3 C1 G1 H0 K1 D1 M1
- **Intent vs delivery:** It promises the 5 kg cylinder. It mostly restates the 11.8 kg page at 5 kg.
- **What works:** A quick answer with Rs 1,397 gas, and the 5 vs 11.8 table.
- **What fails:**
  - It is a template swap of the 12 kg page (same structure, same sentences).
  - `[needs confirmation]` appears in the spec table, the price paragraph ("quoted separately and are [needs confirmation] for your city") and the FAQ.
  - It is phase P3, and "Is a 5 kg cylinder available everywhere?" is answered with a placeholder.
  - There is no cost-per-kg comparison with the 11.8 kg size (a real extra it could have given).
- **Verdict:** merge into `/lpg-cylinder-sizes-in-pakistan/`. Hold-noindex.

### `/lpg-cylinders/composite-fiber-cylinder/` — WEAK (9/21) A2 C2 G1 H0 K1 D2 M1
- **Intent vs delivery:** It promises composite cylinders. It gives a generic composite-vs-steel comparison and no sizes, prices or brands, so it cannot show a product the business actually supplies.
- **What works:** The comparison table (weight, rust, visible gas level) and the delivery checklist are clear.
- **What fails:**
  - `[needs confirmation]` appears in the sizes row, the shell-price row and the FAQ answers.
  - The page says "Composite cylinders are not stocked in every city or size", with no city where they are.
  - There are no weights, no sizes and no price (competitors give kg and Rs).
  - The AI composite images imply a product that is not evidenced.
  - The home and `/lpg-cylinders/` pages promise composite cylinders "with gas".
- **Verdict:** hold-noindex until stock, sizes, brand, price and a certification reference are confirmed. Then rewrite.

### `/lpg-cylinder-refill/` — WEAK (10/21) A3 C2 G1 H0 K1 D2 M1
- **Intent vs delivery:** It promises how a refill works. It delivers a good refill vs exchange definition and a delivery checklist, but no refill price, time or process specific to this company.
- **What works:** The Quick answer, the refill vs exchange table and the "what to check" list (including "feels light, ask us").
- **What fails:**
  - `[needs confirmation]` appears in the table ("May involve deposit or shell terms — [needs confirmation]"), the shell row and the stock FAQ.
  - The refill price relies on the same `PriceBlock` and gives no refill-specific fee or turnaround.
  - It does not cover hydro-test dates or the cylinder age rule it mentions.
  - The AI "delivery team" hero is captioned "(illustrative)", but the gallery repeats the AI delivery faces unlabelled.
- **Verdict:** rewrite. Remove the placeholders, state the refill and exchange process, and add the test-date rule, a turnaround and an actual price.

### `/new-lpg-connection/` — WEAK (14/21) A3 C3 G2 H0 K2 D3 M1
- **Intent vs delivery:** It promises what you need and how to order a new connection. The checklist and safe first-use are well delivered, but the cost, which is the main question, is entirely "[needs confirmation]".
- **What works:**
  - The best structure in R1: Quick answer, what-you-need table, deposit vs buy-new table, order steps, a 6-step safe first use and a smell-gas Note.
  - The first-use steps (soapy-water leak test, never a flame) are correct and useful.
  - It is unique within the site (D3).
- **What fails:**
  - The "Amount" column of the deposit vs new-empty table is `[needs confirmation]` in both rows.
  - FAQs repeat it: deposit "[needs confirmation]", empty cylinder "[needs confirmation]", stock "[needs confirmation]". The order paragraph says "Accessory stock is [needs confirmation]".
  - There is no price for the regulator or hose.
  - Score 14 does not save it: H≤1 is an automatic Weak.
- **Verdict:** rewrite (quick win). Fill in deposit, new-empty and accessory prices or ranges and remove the placeholders. It is one data-fill away from Borderline, and with real prices it could approach Good.

### `/tools/lpg-cylinder-duration-calculator/` (+ `Calculator.tsx`) — GOOD (19/21) A3 C2 G3 H3 K3 D3 M2
- **Intent vs delivery:** It promises a calculator that estimates how long a cylinder lasts. The working tool is the first element and returns a number immediately (default 11.8 kg, 3 h, 1 burner is about 14 days).
- **What works:**
  - Two input modes (burner-hours, or known kg per day).
  - An editable burn rate with the 0.25 kg/h figure openly flagged as an assumption.
  - A reserve percentage.
  - The live OGRA rate turned into Rs per day (gas only).
  - A worked size table whose arithmetic checks (4.5/10.6/13.5/40.9 kg usable giving about 6/13/17/51 days at 0.8 kg/day).
  - A leak-signal Note and an honest "No" to "Is the result accurate?".
  - Clean, accessible markup (labels, `role="status"`, `aria-live`). No draft language, no placeholders.
- **What fails:**
  - It has no appliance presets (geyser, heater, commercial burner). The page says these "use more" with no number, which is the obvious extra.
  - The 0.25 kg/h default is unsourced.
  - The Rs/day line inherits the unverified-source price.
  - The gallery uses unlabelled AI kitchen and family images.
  - Phase P3, so low priority.
- **Verdict:** keep. Add appliance presets and cite the burn-rate source. It is the only page in scope that clears all Good gates.

---

## Data and media honesty checks

| File | Finding | Severity |
|---|---|---|
| `data/prices.json` | The Oct and Sept `sourceNote` say the figures come from news summaries and must be re-checked against the PDF. Yet `verifiedBy: "THE LPG CO. team"` and `verifiedOn: 2026-10-27` back a UI claim of "Checked by… Official OGRA source". `sourceUrl` is the generic OGRA index page, not the notification. Arithmetic is internally consistent (279.34 × 11.8 = 3,296.21; +20.69 = +8.0%). Only 2 months of history. | High (H) |
| `data/city-overrides.json` | `testOrderMinutes: 60` and `verifiedOn: 2026-10-27` are identical for all four cities, the same day as the owner note. That pattern looks like a stated target recorded as a "test order", not four timed orders. `CityHubStatic` renders "In our own test order the cylinder arrived in 60 minutes" for the `/lpg-in-*` hubs from this value. If no timed order was done, it is a fabricated claim. `localNotes` are unused on the price pages. | High (H) |
| `data/commercial-terms.json` | Policy is confirmed, but no amounts exist (deposit, new-empty, delivery fee). That is why the pages fall back to `[needs confirmation]`. `stockPolicy` ("held in inventory for same-day dispatch") contradicts the pages that say stock is unconfirmed. `manufacturer: true` is unevidenced. `responseTime` ("during active hours") is shortened to "within a few minutes" in `site.ts`. `sameOgraRateAllCities: true` makes the city price pages permanently non-indexable under the current `hasCityPrice` gate. | Medium–High |
| `docs/seo-plan/MEDIA_STATUS.md` | States that the ChatGPT-edited pack is live "so partners can review" and that real photos come "later". It is honest internally, but nothing on-page labels most gallery images as illustrative. Many images are presented as real people, real delivery and real marking close-ups. | High (M) |
| `data/network.json` | The source is an "owner-supplied distributor list… counts only". Pages say partners come "from published sources" (city page) and "listed partners" (home and delivery areas). The counts (347 suppliers, 51 cities) are not a verified active-partner network. | Medium |

---

## Cluster summary (20 page entries; Karachi and Lahore counted once as the `[city]` pattern)

| Grade | Count | Pages |
|---|---|---|
| **GOOD** | **1** | duration calculator |
| **BORDERLINE** | **3** | `/why-lpg-prices-change-in-pakistan/` (18), `/lpg-price-in-pakistan/history/` (12), `/order-lpg/` (12) |
| **WEAK** | **16** | `/`, `/lpg-price-in-pakistan/`, `/lpg-price-per-kg-in-pakistan/`, `/lpg-cylinder-price-in-pakistan/`, `/ogra-lpg-notified-price/`, `/lpg-price-in-pakistan/[city]/`, `/lpg-cylinders/`, `/lpg-cylinder-sizes-in-pakistan/`, `/lpg-home-delivery/`, `/delivery-areas/`, 12 kg, 45 kg, 5 kg, composite, `/lpg-cylinder-refill/`, `/new-lpg-connection/` |

Three Weak pages score 11–14 but are Weak only because H≤1. These are `/`, `/lpg-cylinder-sizes-in-pakistan/` and `/new-lpg-connection/`.

### Verdict counts
- **keep (with fixes):** 3. These are the calculator, why-prices-change and order-lpg.
- **rewrite:** 11. These are home, flagship price, cylinder price, `/lpg-cylinders/`, sizes, home-delivery, delivery-areas, 12 kg, 45 kg, refill and new-connection.
- **merge:** 4. These are per-kg into the flagship, OGRA with history, the city pages into the national page, and 5 kg into sizes.
- **hold-noindex:** 2. These are history (until backfilled) and composite.

### Fastest path to quality
1. **Strip every `[needs confirmation]`, "owner", "pending", "Gate L" and "price file" string.** This is a copy-only change that clears H≤1 on most Weak pages.
2. **Get owner numbers:** deposit, new-empty and delivery fee per size; empty weights and dimensions; accessory prices. This unlocks the cylinder pages, sizes, refill and new-connection.
3. **Re-source the price from the real OGRA notification (PDF link and screenshot), and backfill 12 or more months.** Otherwise the "Checked… Official OGRA source" claim is not honest.
4. **Label or remove AI imagery** in galleries (especially "OGRA price check", delivery faces, "mobile app", marking and spec labels). Real photos are needed for any claim about stock, markings or delivery.
5. **Consolidate the price cluster** (flagship, per-kg, OGRA, cylinder price, city) from five thin near-duplicates into two or three distinct pages: flagship with history, a cylinder-cost page that has real shell and delivery numbers, and why-prices-change.
