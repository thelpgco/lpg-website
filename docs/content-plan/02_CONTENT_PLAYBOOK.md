# Content playbook: THE LPG CO. PAKISTAN

**Use:** paste this whole file into the writing agent, together with one page assignment (see §11).
**Goal of every page:** be the most useful result in Google Pakistan for its query, turn readers into calls, WhatsApp messages and form requests, and keep the site eligible for AdSense.

This replaces the generic "buyer-first SEO page" prompt. It keeps that prompt's good parts (research first, no fake data, the swap test, measured gates). It fixes what didn't fit this site:
- **Intent decides the page, not one template.** Forcing four "buy now" CTAs onto a safety guide hurts rankings, trust and AdSense approval.
- **Built for the LPG niche in Pakistan.** OGRA, cylinder sizes, Sui gas, winter shortages and Roman Urdu are covered. VINs, recalls and shipping are not.
- **Gates are measured by a script.** The writer doesn't count its own "because" and "you" words.
- **E-E-A-T comes from real owner input** (photos, field cases, a named reviewer), not from wording tricks.
- **Covers what the old prompt left out:** cannibalization, internal links, schema, freshness, Search Console feedback and ad placement.

---

## 0. Site facts (locked; never change, never add)

| Fact | Value / source |
|---|---|
| Company | THE LPG CO. PAKISTAN, `https://thelpgco.pk` |
| What we do | An OGRA-licensed LPG marketer and distributor. We supply domestic and commercial cylinders, bulk and industrial LPG, and engineering (pipelines, manifolds, cylinder banks, tanks, vaporizers, conversions, AMC, safety audits) across Pakistan through a distributor network. |
| Licence | OGRA licence **09024041999** |
| Office | Office #99, Service Road, Sector G-12, Islamabad |
| Phone / WhatsApp | +92 339 4022940 (read from `lib/site.ts`; never retype it) |
| Founded | **Owner to confirm** (1999 vs "21 years"). Until then, write no "years in business" number. |
| How ordering works | 1. Call, WhatsApp or send the form → 2. we confirm your street, cylinder size, price and delivery window before you agree → 3. the distributor serving your area (or our own licensed team) delivers and exchanges the empty cylinder → 4. you pay on the terms confirmed. |
| Price rule | The gas rate follows the **OGRA monthly notified price per kg**. Read the current value and month from `data/prices.json`. Never type a price by hand. Delivery, deposit and cylinder terms are confirmed on the order. |
| Allowed delivery claim (word for word) | "Target in covered city areas: about one hour when a local team is available; otherwise the distributor contacts you to confirm the window." Use it **once per page at most**. |
| Allowed network claims | Only counts read from `data/directory/by-city.json` at build time ("X network dealers listed in Lahore"). |
| CTA targets | `components/TrackedLink.tsx` and `ContactButtons.tsx` (call + WhatsApp, tracked), `LeadForm.tsx` (form). Never hand-build CTA links. The form has no anchor id yet: add `id="lead-form"` once, so in-page CTAs can link to it. |
| Never name on the page | Competing LPG marketers or distributors as recommendations, people without consent, internal file names (`network.json`, `lpg data.md`, `partners_master` …). Banned words: "DEMO", "illustrative", "showcase". Regulators, plants and public companies may be named as **facts** (e.g. "OGRA notifies…", "imports arrive through Port Qasim"). |

---

## 1. Hard rules (any breach fails the page)

1. **No invented facts.** Never invent prices, reviews, ratings, customer stories, project details, stock, response times, dealer names or counts, statistics or dates. If you can't source it, soften it ("usually", "about", "confirm with OGRA") or leave it out.
2. **Every number has a source:** `data/*.json`, an official page (OGRA, the Petroleum Division, HDIP, PSQCA, PBS, Rescue 1122, a provincial government) or a manufacturer spec. Put the source in the brief, not on the page.
3. **No self-praise or empty superlatives:** best, #1, leading, top, trusted by thousands, unmatched, cheapest, guaranteed, largest, famous, go-to.
4. **No unbacked claims:** "verified", "in stock", "guaranteed delivery", "lowest price", "24/7" (unless the listing data says so for that dealer).
5. **No copying.** Competitor pages in `content-research/competitors/` are research only. Never reuse their sentences, structure order or tables.
6. **Unique per sibling.** No sentence, paragraph, CTA or FAQ answer may repeat across pages of the same type (cities, industries, services, cylinder sizes). Shared facts go in shared components, once per page.
7. **Safety is YMYL.** Safety instructions must match official guidance (Rescue 1122, OGRA safety advisories, manufacturer instructions). They are reviewed by the company safety reviewer before the page is published. Never tell a reader to fix a leak, refill or repair a regulator themselves.
8. **No research language on the page:** scrape, crawl, competitor, SERP, keyword.

---

## 2. Classify the page first (intent → page type)

Before researching, decide the **dominant intent** of the query from the current Google results:

| Intent | Example queries | Page type | Primary goal | CTAs | Ads (AdSense) |
|---|---|---|---|---|---|
| Transactional / local | "LPG cylinder home delivery Lahore", "gas cylinder near me" | City, near-me, order | Lead | 4–5 (opening, options, price, before-you-go, sticky mobile bar) | **None** |
| Commercial | "commercial LPG supply", "LPG for restaurants", "LPG pipeline installation" | Industry, service, supply | Quote request | 4 | **None** |
| Commercial investigation | "LPG cylinder price in Pakistan", "LPG stove price", "best LPG heater" | Price / product guide | Lead + traffic | 3 | Optional, below the fold |
| Informational | "what is LPG", "LPG vs CNG", "why LPG prices change" | Guide | Traffic + trust | 2 soft (mid + end) | **Yes** |
| Safety | "gas leak what to do", "cylinder blast causes" | Safety guide | Trust; emergency info first | 1 soft (end only) | Yes, never above the safety steps |
| Tool | "LPG litre to kg", "cylinder duration calculator" | Calculator | Traffic + links | 1 under the result | Yes, below the tool |

**One primary query per URL.** Before writing, search `docs/seo-plan/keyword-master.csv` and `docs/seo-execution/ALL_URLS_AND_KEYWORDS.csv`. If another URL already targets the same query, **stop and report the cannibalization** instead of writing.

---

## 3. Research (every page)

1. **Live results.** Search google.com.pk for the primary query and 2 variants (English + Roman Urdu if people use it, e.g. "gas cylinder ki qeemat"). Record:
   - the top 10 results;
   - People Also Ask;
   - related searches;
   - autocomplete.
2. **Competitor reading.** Use the cached pages in `content-research/competitors/` (351 pages, `ALL_PAGES.csv`) first, then live pages. For 4–10 ranking pages note:
   - the site type;
   - word count and headings;
   - the expert terms used;
   - what they offer;
   - **what they miss**.
3. **Existing brief.** Check `docs/seo-plan/briefs/<ID>.md` for this page (the ID comes from `data/pages.json`). Extend it; never contradict it without saying so.
4. **Build the brief:**
   - **Questions:** PAA + autocomplete + "what a buyer would ask on the phone".
   - **Topics:** headings used by ≥ 2 competitors.
   - **Terms:** 2–3-word expert phrases (e.g. "notified price", "cylinder bank", "two-stage regulator", "vapour withdrawal", "empty-for-full exchange").
   - **Entities:** OGRA, the Petroleum Division, HDIP, PSQCA, Rescue 1122, SNGPL/SSGC, Port Qasim, named localities, roads and industries.
   - **Length target:** the median competitor word count. The floor is 800 for money pages and 1,000 for guides.
5. **Information gain:** at least **3 checked facts the top results don't give**, with sources. Good sources:
   - OGRA notifications and the price history (we have it in `data/prices.json`, which most competitors lack);
   - our own directory data (dealers per city, 24-hour partners, auto-LPG fitters);
   - official safety guidance;
   - physical properties (propane/butane boiling points and why butane-rich gas struggles in Murree or Quetta winters);
   - owner field knowledge from the owner-input sheet.
6. **Set the page aside** if there are fewer than 3 information-gain facts **and** no real local or owner data. Report it as "set aside: thin". Never pad.

---

## 4. Cover every angle: the 12 LPG question types

Answer **≥ 10 of 12** (money pages) or **≥ 8 of 12** (guides, tools). Map each H2 to the types it answers in the brief.

| # | Question type | LPG meaning |
|---|---|---|
| 1 | What it is / the types | Cylinder sizes (5 / 11.8 / 15 / 45.4 kg, composite), propane vs butane mix, bulk vs cylinder |
| 2 | Where to get it | Our order flow, network dealers, filling plants, shops vs delivery; never refill shops' "decanting" |
| 3 | Cost and what drives it | The notified price × kg, plus delivery, deposit, shop margin, winter demand and import cost. Use "more than", "less than" and "saves", not invented prices |
| 4 | How to (process) | Order, exchange, a new connection, a quote for engineering |
| 5 | Identification / sizing | Cylinder markings, tare weight, the test date, valve and regulator type, load in kg/hour, how many cylinders a kitchen needs |
| 6 | Options compared | LPG vs Sui gas / CNG / diesel / electric; cylinder vs manifold vs bulk tank; steel vs composite |
| 7 | Quality, risk and checks | Seal, weight check on delivery, hose age, regulator condition, refusing a damaged cylinder |
| 8 | Rules | OGRA licensing and notified price, the cylinder testing period, storage rules. Name the body and tell the reader to confirm with it |
| 9 | Problems and causes | Low flame in cold weather (butane), regulator icing, leaks at the hose clip, underweight cylinders, shortages in winter |
| 10 | Timing and logistics | Delivery window, empty-for-full exchange, access for trucks or pickups, snow and road closures |
| 11 | Local / sector context | City industries, Sui gas load-shedding, altitude and climate, tourist season, ports and plants, the sector's load profile |
| 12 | Trust / responsibility | Who delivers, who you pay, what to get in writing, the licence check, the complaints path (`/complaints/`) |

Then list every **modifier** people use with the main keyword (price, today, near me, home delivery, 11.8 kg, refill, commercial, wholesale, Roman Urdu forms) and give each one a sentence or a section.

---

## 5. Page recipes (adapt the order; write every section fresh)

**Every page:**
- **Title:** ≤ 60 characters including " | THE LPG CO." (or no suffix when it doesn't fit). The query comes first. Add the month/year only on price pages. Store it in `data/meta.json`.
- **Description:** 140–160 characters. Name 2 specifics and end with an action ("Call or WhatsApp for today's rate.").
- **Answer-first:** the first 2 sentences under the H1 answer the query in ≤ 50 words.
- **Each H2:** its first sentence answers the heading in under 30 words.
- **Media:** ≥ 1 real photo from `lib/media.ts` with specific alt text. Use a table wherever data is compared.

### 5a. City page (`/lpg-in-{city}/`)
1. **Answer-first:** how to get LPG delivered in {city} today, plus the current notified price (from data).
2. **Order in 3 steps:** call/WhatsApp/form → we confirm street + price + window → delivery and exchange. **CTA 1.**
3. **Who delivers in {city}:** the dealer table from data, with counts by type (network, local, 24-hour, auto-LPG).
4. **Delivery in {city}:** the real areas served, access issues and the timing reasons (traffic belts, hill roads, snow).
5. **Price in {city}:** the notified rate vs local shop prices and why they differ. **CTA 2.**
6. **Local section A:** the climate and season effect (winter Sui gas shortages, cold-weather butane problems).
7. **Local section B:** local industry and commercial demand (e.g. Faisalabad textiles, Multan poultry belt, Murree hotels).
8. **Cylinder sizes people in {city} use**, and which to choose.
9. **Safety for {city} homes:** only the points that are local (gas heaters in winter, ventilation in flats).
10. **Before you go:** **CTA 3** with a city-specific wording.
11. **Nearby towns and related pages**, then 3–6 **FAQs** not answered above.

### 5b. Industry page (`/industries/{sector}/`)
1. **Answer-first:** the setup this sector usually needs. **CTA 1.**
2. **How {sector} uses LPG:** the equipment list with typical consumption ranges (cite the maker specs).
3. **Worked example:** "A 6-burner kitchen running 12 h uses about … kg/day → … × 45.4 kg cylinders a week." Show the formula and link the calculator.
4. **Cylinders vs cylinder bank vs bulk tank for {sector}:** a table with the reasons. **CTA 2.**
5. **Sector-specific risks and checks** (not generic safety).
6. **Cost drivers for {sector}.** **CTA 3.**
7. **What to send for a quote:** a sector-specific checklist.
8. **Field note from our team** (owner input; omit if none).
9. **FAQs**, plus **CTA 4** in the last quarter.

### 5c. Service page (`/services/{service}/`)
Problem it solves → who needs it (with signs) → **method step by step** (materials, standards, tests, duration) → what you get in writing → what you prepare → common faults we find (owner input) → cost drivers → **CTAs after the problem, the method and the cost, and at the end** → FAQs.

### 5d. Price / product page
Today's rate table (from data) → per-size price table → what changes the price, with causes → the history chart/table → how to check that you got full weight → buying checklist → options compared → **3 CTAs** → a Roman-Urdu FAQ block.

### 5e. Guide / comparison / safety
- **Answer-first.**
- **A comparison table** near the top.
- **Mechanism sections** that explain why.
- **The Pakistan context.**
- **A myths vs facts block.**
- **Sources line:** "Based on OGRA notifications and [maker] specs".
- **A reviewer box** on safety pages ("Reviewed by THE LPG CO. safety team on {date}").
- **One soft CTA** mid-page and one at the end.
- **Safety pages:** the emergency steps come first. No CTA above them.

### 5f. Tool
The tool sits above the fold → how the formula works → a worked example table → assumptions and limits → related tools → 1 CTA under the result.

---

## 6. Writing style

- **Talk to the reader.** Use "you" naturally. Open sections with the reader's situation ("Running low before a cold night?").
- **Show expertise; never claim it.** Use real numbers (kg, kg/hour, bar, °C, metres of altitude, the month of the notification), the cause behind each claim ("because butane stops vaporising near 0 °C, …") and honest limits ("confirm the test date with your distributor").
- **Swap test.** If you can swap {city} or {sector} for a sibling's and the paragraph still reads true, rewrite it.
- **Pakistani usage.** Write "Sui gas", "cylinder", "rate", "refill", "11.8 kg domestic cylinder", "45.4 kg commercial cylinder". Add Roman-Urdu phrases only in FAQs or headings where people search that way, written naturally ("LPG cylinder ka rate aaj").
- **Readability.** Use short sentences. Define a term the first time ("notified price: the maximum consumer price OGRA sets each month"). Use tables for numbers and prose for reasons.
- **Length.** Reach the competitor median by adding sections that answer something, never padding.
- **CTA wording is unique per page and section**, e.g. "Get today's Multan rate on WhatsApp" or "Send your kitchen's burner list for a cylinder-bank quote". It is never a generic "Contact us".

---

## 7. Conversion rules (all money pages)

- The primary action in Pakistan is **WhatsApp**. Second is the call. Third is the form. Show all three, in that order, at every CTA.
- **Sticky mobile bar** with WhatsApp and Call on money pages (`components/StickyContactBar.tsx` already exists; check that it is on every money page).
- **Pre-filled WhatsApp text** per page ("Hi, I need an 11.8 kg cylinder in G-11 Islamabad"), so the lead arrives with context.
- **Remove friction:** the form asks only for name, phone, city and need. Everything else is optional.
- **Trust strip next to the first CTA:** the OGRA licence number, the office address and the certified-cylinder rule. Once per page.
- **Price transparency converts:** show the notified rate near the top of every money page.
- Track `whatsapp_click`, `phone_click` and `generate_lead` (already sent by `TrackedLink.tsx` and `LeadForm.tsx`) per page in GA4; mark them as key events. Review the pages with traffic and no clicks every month.

---

## 8. Technical SEO per page

- **Schema** via `lib/schema.ts`:
  - `Organization` and `LocalBusiness` (sitewide);
  - `BreadcrumbList`;
  - `Service` on service and industry pages;
  - `Product` + `Offer` only where a real price exists;
  - `FAQPage` is fine to keep, but don't expect FAQ rich results.
- **Internal links:** link **up** to the parent hub, **across** to 3–6 existing siblings with descriptive anchors, and **down** to the tools. Every new page gets ≥ 3 inbound links from existing published pages. Never link to noindexed pages from the nav.
- **Canonical and robots** are handled by `meta()` in `lib/seo.ts`. The status goes to `published` in `data/pages.json` only after §9 passes.
- **Images:** real photos, compressed, descriptive alt text, no text baked into images.
- **Freshness:** price-driven pages update from `data/prices.json` monthly. Change the "updated" date only when the content really changes.

---

## 9. Quality gates (measured, not self-reported)

Run the build, then run `python -I docs/content-plan/scripts/measure_pages.py .next/server/app --only <url>`. Fill the gate table with the real numbers.

| Gate | Money pages | Guides / tools | Fix if it fails |
|---|---|---|---|
| Brief questions answered | ≥ 90% | ≥ 80% | Add a section or an FAQ |
| Competitor topics covered | ≥ 70% | ≥ 70% | Add the topic in a heading or paragraph |
| Question types (§4) | ≥ 10/12 | ≥ 8/12 | Add the missing section |
| Information-gain facts on the page | ≥ 3, sourced | ≥ 3, sourced | Research more; never invent |
| **Unique text (script)** | ≥ 55% | ≥ 65% | Rewrite the shared sentences; add a local or sector section |
| **Overlap with closest sibling (script)** | ≤ 30% | ≤ 20% | Reword; change the section order; add a unique section |
| Length | ≥ competitor median, floor 800 | Guides: ≥ median, floor 1,000 (commercial guides such as plants or filling stations: 800). Tools: floor 600, because the calculator is the content (recipe §5f) | Add a real section |
| Specific figures | ≥ 6 per 1,000 words | ≥ 6 | Add kg, bar, °C, dates, distances |
| Causes explained | Most body paragraphs give a reason | same | Add the reason, naturally |
| Sources named | ≥ 3 distinct official or maker sources | ≥ 3 | Name OGRA, HDIP, the maker… |
| CTAs | ≥ 4, one in the last quarter, unique wording | 1–2 soft | Add or reword |
| Title / description | ≤ 60 / 140–160 characters, query first, action at the end | same | Rewrite |
| Banned words (§1) | 0 | 0 | Search and reword |
| Facts match `data/*.json` | 100% | 100% | Read the values from data |
| Internal links | 1 up, ≥ 3 across, ≥ 3 inbound | same | Add the links |
| Manual read | passes | passes | See below |

**Manual read (done last, by a human or a second agent):**
- [ ] A real buyer would accept every answer.
- [ ] Every paragraph passes the swap test.
- [ ] The information-gain facts match their sources.
- [ ] Nothing contradicts another page or `data/*.json`.
- [ ] It reads naturally aloud: no keyword stuffing, no merged sentences, no stray `&apos;` or `�`.
- [ ] Every link points to an existing page.
- [ ] The safety advice was checked by the safety reviewer (safety pages).

**The page is published only when every gate passes.** Then set its status to `published` in `data/pages.json`.

---

## 10. What to deliver for each page

1. The code change (the page file, plus `data/meta.json` for the title and description).
2. The brief: questions, topics, terms, entities, the length target and competitor notes.
3. The gate table with the measured numbers.
4. The information-gain facts, each with its source URL, flagged for the owner to verify.
5. The brief items dropped, and why.
6. The owner inputs that would strengthen the page (photos, a field note, a project).
7. Or, when the page fails: "set aside" with the reason.

---

## 11. Page assignment template (give this with the playbook)

```
Page: /industries/restaurants/
Registry ID: (from data/pages.json)
Primary query: LPG supply for restaurants
Secondary queries: commercial gas cylinder for restaurant, 45 kg cylinder price restaurant, restaurant gas cylinder bank
Intent: commercial
Current audit: 35% unique, 57% overlap with /industries/food-processing/
Owner inputs available: (photos / field notes / project, or "none")
Siblings that must stay different: /industries/hotels/, /industries/food-processing/, /industries/weddings-and-events/
```
