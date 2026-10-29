# THE LPG CO. PAKISTAN — SEO & Lead-Gen Master Plan

**Site:** thelpgco.pk · **Market:** Pakistan (country-wide, English first, Urdu second) · **Plan version:** v3.0 (see Section 24 for how v1 became v3) · **Written:** 26 Oct 2026

**Goal set by the owner:** rank #1 and reach 100,000 organic clicks per month.

**Method:** the SEO & Lead Generation Operating System (`keywords and research/seo-LeadGEN.md`, v3.0). Step numbers in brackets, like *(Step 8.6)*, point to that file. Every number below comes from the four research files or from the scripts in `docs/seo-plan/scripts/`, and anything I assumed is labelled **ASSUMPTION**.

**Companion files (generated from your data, re-runnable):**

| File | What it is |
|---|---|
| `keyword-master.csv` | All 1,702 unique keywords from both Ubersuggest exports, each with one target page, a role (primary or secondary) and a disposition |
| `page-map.csv` | 57 planned pages: URL, type, phase, primary keyword, keywords mapped, demand floor and ceiling, gate notes |
| `meta-tags-p1.csv` | Title and meta description for the 10 most important launch pages, with character counts |
| `scripts/01_parse.py … 05_tables.py` | Rebuild everything after new exports arrive |

---

## 0. The read-through receipt (what I read, and what it told me)

| Input | What it contains | Key takeaways |
|---|---|---|
| `seo-LeadGEN.md` (1,928 lines) | The master method: 24 steps, 5 gates, clustering rules, page standards, prompts | One cluster = one URL. No doorway pages. Verified-facts table is the only source of facts. 3+ information-gain items per commercial page. Gates must pass before scaling. |
| `keywords and search results.md` | Ubersuggest screenshot text, a Semrush-style top-10, and three live Google captures (`lpg cylinder`, `lpg supply`, `lpg pakistan`) taken in Islamabad on about 25–26 Oct 2026 | Price intent dominates. The supply crisis is live. Commercial results are held by small sites. See Sections 3 and 4. |
| `ubersuggest lpg.csv` | 412 keywords | Merged with the file below |
| `ubersuggest lpg (1).csv` | 1,662 keywords, with search intent | 1,702 unique keywords after merging; 681 have volume above zero, 1,021 show zero |
| `company details.md` | **Empty (0 bytes)** | Business facts are missing. See Gate 0 in Section 2. |

**Data hygiene results** (from `02_map.py`): 272 keywords are excluded as foreign or irrelevant (India, jobs, "jpg to pdf" at 246,000, "log 0", cosmetic "LPG" brands and so on). 19 are brand-navigation queries (SSGC, PSO, Noor, SNGPL) that the brands' own sites will win. 314 have no page. That leaves **1,097 keywords mapped to 57 planned pages**: 535 with volume and 562 zero-volume long-tail terms kept for monitoring.

**Difficulty is unusually low:** across the 535 targeted keywords the median Ubersuggest difficulty is 9, the maximum is 40, and 96% score 20 or below. This is a third-party number (Glossary: "Third-party metrics are not Google"), but it matches what the live results show: small local sites in the commercial positions.

---

## 1. The honest math on "#1 and 100,000 clicks"

### 1.1 What your data supports

Demand for every keyword mapped to a page, in searches per month. **Floor** counts each distinct volume figure once, because Ubersuggest merges close variants (it shows 9,900 for both "lpg price in pakistan today" and "lpg price today", and 6,600 for four different phrasings). **Ceiling** is the raw sum. Clicks assume ranking #1 on every query with the click-through rates shown (**ASSUMPTION**, already net of AI Overviews, snippets and the map pack).

| Pillar | Searches/mo (floor–ceiling) | Assumed CTR at #1 | Clicks/mo at #1 |
|---|---:|---:|---:|
| Price | 91,310 – 128,560 | 22% | 20,100 – 28,300 |
| Local ("near me", shops, stations) | 10,050 – 10,790 | 10% | 1,000 – 1,100 |
| Learn (what is LPG, comparisons) | 6,860 – 10,510 | 18% | 1,200 – 1,900 |
| Home (`lpg`, `lpg gas`, `lpg to gas`) | 6,620 – 8,520 | 12% | 800 – 1,000 |
| Cylinders | 6,610 – 11,300 | 28% | 1,900 – 3,200 |
| Appliances | 2,240 – 3,920 | 22% | 500 – 900 |
| Auto LPG | 1,220 – 1,890 | 20% | 200 – 400 |
| B2B | 530 – 870 | 22% | 100 – 200 |
| Safety | 440 – 710 | 22% | 100 – 200 |
| Delivery | 540 – 620 | 25% | 100 – 200 |
| Market / news | 70 – 180 | 25% | 20 – 50 |
| **Total** | **126,490 – 177,870** | | **≈ 26,000 – 37,000** |

A second source agrees: the Semrush-style block in your file reports 5,501 keywords and 136,310 total volume for the `lpg` seed.

### 1.2 What that means

1. **Being #1 on every keyword in these four files caps out near 26–37K clicks a month.** That is the ceiling of the data you supplied, not of the market. 100K clicks would need roughly 55–80% of every search in these files, which does not happen.
2. **One page decides the outcome.** `/lpg-price-in-pakistan/` carries 76–112K of the 126–178K monthly searches. About three quarters of all clicks depend on winning it and keeping it won.
3. **Price searchers are not buyers.** They want a number. Many are answered on the results page itself (AI Overview, featured snippet, news box). The plan therefore has two jobs: win the price pages, and turn price-checkers into delivery orders (Section 12).
4. **Getting from about 30K to 100K needs three things that are not in your files yet:**

| Lever | Why it could add traffic | What it still needs (done in weeks 1–2) |
|---|---|---|
| **A. A wider keyword universe** | Your exports start from the seed `lpg`. Google's own "People also search for" in your file lists queries that are not in the CSVs: *gas cylinder price in pakistan*, *12 kg gas cylinder price in pakistan today*, *13 kg*, *15kg*, *5 kg*, *gas cylinder fiber*, *sui gas cylinder*, *list of LPG distributors in Pakistan*. "gas cylinder" alone shows 5,400 searches in the overlap panel, though that panel mixes in UAE queries. | Export Pakistan-only volumes for 40+ new seeds from Keyword Planner and Ahrefs/Semrush |
| **B. Urdu and Roman Urdu** | Searches such as *lpg ka rate*, *lpg ki kimat*, *lpg ka aaj ka rate*, *lpg meaning in urdu* already appear (30–140 each) in an English-biased tool. Urdu-script searches are very likely under-counted. | Urdu-script keyword export (گیس سلنڈر کی قیمت, ایل پی جی ریٹ and similar) |
| **C. Crisis and seasonal peaks, plus Discover** | Your SERP capture reports a border closure (dated 17 Oct 2026 in the AI Overview, and a Reuters snippet dated 23 Oct 2026), 12 kg cylinders rising from about Rs 4,500 to Rs 7,000, a strike, and TV and news results. All of this must be re-checked against the primary sources before we publish it. Volumes in the CSVs predate this (`lpg shortage in pakistan` shows only 30). Winter is peak LPG demand. | Google Trends for the last 24 months and Search Console data after launch |

**ASSUMPTION (to be tested, not promised):** if the unexported universe is 0.5× to 1.5× the size of the mapped one, saturation rises to roughly 40–90K clicks a month. The 100K target is therefore a **stretch goal that needs levers A, B and C all working**. It is not a number the current data can promise.

### 1.3 Staged targets (organic Search + Discover clicks per month, from Search Console)

These are targets with explicit gates, not forecasts. A new site cannot be guaranteed first-page results (Master reference, "What it can't do").

| Month after launch | Target clicks/mo | Leading indicators that must be true first |
|---|---:|---|
| 1–2 | 100 – 500 | 90%+ of submitted pages indexed; impressions rising weekly |
| 3 | 1,500 | Flagship price page in top 10 for its head terms; first 10 relevant referring domains |
| 6 | 8,000 | Price pillar at positions 1–5; 15+ leads per week; cylinder and delivery pages indexed |
| 9 | 18,000 | Urdu pillar live; Discover impressions present |
| 12 | 35,000 | Roughly the ceiling of the current data. Expansion data (levers A–C) reviewed at **Gate X** (Section 22) |
| 18 | 60,000 | Only if Gate X showed room above 40K |
| 24 | 100,000 | Stretch. Needs levers A, B and C all delivering |

**"#1" means:** position 1 for the head price terms and the cylinder, delivery and "what is" pages. It cannot mean #1 for every keyword. Government (OGRA), Reuters, and the map pack will keep some positions.

---

## 2. Gate 0 — facts I need from you before anything is published

`company details.md` is empty, so the business model is unknown. The pages, the legal risk and the conversion flow all change with it.

| # | Question | Why it matters |
|---|---|---|
| 1 | Is THE LPG CO. an **OGRA-licensed marketer or distributor**, a **reseller** of one, or a **referral/lead-gen** business that connects customers with licensed suppliers? | LPG marketing, storage, transport and distribution are licensed activities in Pakistan. The legal basis decides what the site may say and sell. *(Step 3, Step 4)* |
| 2 | Legal name, registration, **OGRA licence numbers**, NTN, registered address | Trust pages, schema, and Google's rule against faking local presence *(Step 16)* |
| 3 | Which **cities can you actually serve today**, and who delivers? | No delivery page without fulfilment *(Golden rule 1)* |
| 4 | Real phone and WhatsApp numbers, opening hours, delivery charges, typical delivery time | Facts for the verified-facts table. The site must never invent them. |
| 5 | Do you own a **physical outlet, yard or shop**? | Decides whether a Google Business Profile is allowed *(Step 16, Situation A vs B)* |
| 6 | Will you **sell appliances** (stoves, geysers, heaters, regulators) or earn affiliate commission? | Those pages are gated on it (Section 7.3) |
| 7 | Who writes in Urdu, and who can review safety content? | Urdu pillar and safety review are in the plan |
| 8 | Access to **Ahrefs/Semrush**, Search Console, GA4 | Weeks 1–2 validation depends on it |
| 9 | Budget, team size, and writers | Sets the weekly page count in Section 15 |

**Pakistan compliance questions to take to a Pakistani lawyer** (these are questions, not advice) *(Step 4)*:
OGRA licensing for marketing, distribution and transport; storage rules for cylinders; whether any advertised price may exceed OGRA's notified maximum, and how to describe open-market prices honestly during a shortage; consumer-protection and advertising claims; data-protection duties for collecting phone numbers (check the current status of Pakistan's data-protection law); call and WhatsApp consent; company and tax registration.

**If you are a licensed operator:** the site sells your service, and delivery pages can show your own times and prices. **If you are a referral business:** every page needs the "how it works" disclosure, provider vetting, and a written lead definition *(Step 20.3)*. The page set below works for both. Only the order flow and trust pages differ.

---

## 3. What the search results tell us

Evidence is the three live Google captures in your file (Islamabad G-13 location, personalised, around 25–26 Oct 2026). A different city will look different, so rankings must be tracked per city *(Step 6.3)*.

### 3.1 Query by query

| Query | What Google shows | Reading |
|---|---|---|
| `lpg cylinder` | Map pack (Hafiz LPG Gas Agency 4.9★ with 56 reviews, LPG House, Al Hadi), an AI Overview with the OGRA rate and sizes, then friends-gas.pk, Burhan Gas, cylin.com.pk, ebizpk (directory), todaypetroldieselprice.pk, Noor LPG, Parco Pearl Gas | Local pack and AI answer sit above organic. Organic positions are held by **small sites and one directory**. The people-also-ask box asks about the price of 12 kg, 1 kg and 20 kg. |
| `lpg supply` | AI Overview about the border closure, news (Business Recorder, Investify, Reuters), videos (Dunya, ARY, Geo, WION), brand sites, OGRA | Currently a **news query**. Winning it needs dated, sourced reporting. PAA: *Is Pakistan facing LPG shortage? Why? Who supplies LPG to Pakistan? What is an LPG supply?* |
| `lpg pakistan` | AI Overview, Reuters, OGRA price page, CEIC/ISI data, PLPGMA, Noor, Burshane, the All Pakistan LPG Distributors Association | **Authority and data** results. PAA: *Does Pakistan produce LPG? What is the LPG rate today? Who supplies LPG?* |

### 3.2 Competitors seen (for tear-down in week 1, *Step 6*)

| Type | Seen in results | Why they matter |
|---|---|---|
| Price tools | todaypetroldieselprice.pk (per-kg and 11.8/45.4 kg figures, refreshed within hours), cylin.com.pk (price by size tool) | Direct rivals for the flagship page |
| Delivery | cylin.com.pk (live ETA and driver map, 40–60 min in Rawalpindi/Islamabad), friends-gas.pk (new connections, refills, commercial, cylinder testing), burhangas.com (composite cylinders in 2–3 days) | The closest direct rivals for delivery |
| Brands | Parco Pearl Gas (ppgl.com.pk, eshop), Noor LPG, Burshane, Bostan LPG | Own their brand queries. We will not chase those. |
| Authority | OGRA (`/lpg-notified-prices`), PLPGMA, All Pakistan LPG Distributors Association, CEIC, Reuters | Source of truth. We cite them and add what they do not give. |
| Directory | ebizpk | Weak page quality, a beatable result |
| Marketplaces | gasonline.pk (45 kg cylinder at Rs 15,500) | Product listing pattern |

> The unlabeled number columns next to each result in the capture could not be interpreted with confidence, so I used none of them. Pull page-level traffic and referring domains from Ahrefs in week 1.

### 3.3 Three observations that shape the plan

1. **The gap between OGRA's notified price and what people pay.** The AI Overview shows OGRA's rate (Rs 279.34/kg, which gives about Rs 3,296 for 11.8 kg and Rs 12,682 for 45.4 kg; 279.34 × 11.8 = 3,296). The Reuters snippet says 12 kg cylinders reached Rs 7,000 in the shortage, and CEIC reports an average retail price near Rs 4,855 for September 2026. These are **different sources measuring different things.** A page that clearly separates "OGRA notified", "reported market" and "our price", with dates and sources, answers what searchers are trying to find. **None of these figures may be published until confirmed against the OGRA notification and cited sources.** An AI Overview is never a source *(Appendix G)*.
2. **The formula is public and simple.** Cylinder price = price per kg × cylinder weight. That makes a calculator and a monthly dataset cheap to build and genuinely useful.
3. **Commercial intent is local and small; informational and price intent is huge.** The map pack answers "near me". Our non-map route is delivery pages, directories with verified listings, and the price-to-order funnel.

---

## 4. Strategy in one page

**Thesis: own the price truth, then convert the people who come for it.**

1. **Become the most trustworthy, fastest-updated, best-explained place for the LPG price in Pakistan.** One flagship page, a monthly dataset, a calculator, city pages with real city data, and a clear split between official and market prices.
2. **Build the topical authority around it:** cylinders, delivery, safety, supply news, and "what is LPG". Pillars and clusters per *(Step 8.6)*.
3. **Turn price traffic into orders:** every price page leads to size selection, then to order or WhatsApp, in two taps.
4. **Win the crisis now, and be there at the next one.** A dated, sourced shortage tracker, launched in week 1, because the demand is live and winter is the peak season.
5. **Earn links with original data:** the price series, a market price index, a published methodology.
6. **Add Urdu early:** the biggest untapped share of the audience.
7. **Never publish what we cannot fulfil or verify.** No city page without data, no delivery page without a driver, no safety page without a reviewer.

**Fast lane (do not wait for the full site).** It is late October, winter demand is rising, and the shortage is in the news. Ship the flagship price page, the shortage tracker and the "what is LPG" page in **weeks 1–2** with a minimal template, then build the rest around them.

---

## 5. The topical map (pillars → clusters → supporting pages) *(Step 8.6)*

Pillars are named after how Pakistanis search ("lpg rate", "lpg cylinder price", "lpg near me"), not after industry vocabulary.

```
PRICE (pillar)  /lpg-price-in-pakistan/                        76–112K searches
├─ per kg           /lpg-price-per-kg-in-pakistan/
├─ regulator view   /ogra-lpg-notified-price/
├─ city pages       /lpg-price-in-pakistan/{karachi, lahore, islamabad, rawalpindi, faisalabad}/
├─ history          /lpg-price-in-pakistan/history/         (Dataset; downloadable CSV)
├─ monthly archive  /lpg-price-in-pakistan/{month-year}/    (one frozen page per notification)
├─ tool             /tools/lpg-cylinder-price-calculator/
└─ explainer        /why-lpg-prices-change-in-pakistan/

CYLINDERS (pillar)  /lpg-cylinders/
├─ price by size    /lpg-cylinder-price-in-pakistan/
├─ 12 kg domestic   /lpg-cylinders/12-kg-domestic-cylinder/   (11.8 kg official, "12 kg" colloquial)
├─ 45 kg commercial /lpg-cylinders/45-kg-commercial-cylinder/
├─ 5 kg             /lpg-cylinders/5-kg-cylinder/
├─ composite/fiber  /lpg-cylinders/composite-fiber-cylinder/
├─ sizes guide      /lpg-cylinder-sizes-in-pakistan/
├─ refill           /lpg-cylinder-refill/
├─ new connection   /new-lpg-connection/
└─ tool             /tools/lpg-cylinder-duration-calculator/

DELIVERY (money)    /lpg-home-delivery/
├─ city pages       /lpg-home-delivery/{islamabad, rawalpindi, lahore, karachi}/   (only with live fulfilment)
├─ commercial       /commercial-lpg-supply/
├─ bulk             /bulk-lpg-supply/
└─ order            /order-lpg/

LOCAL               /lpg-near-me/  ·  /lpg-shops-and-agencies/  ·  /lpg-filling-stations/  ·  /lpg-companies-in-pakistan/

MARKET & SUPPLY     /lpg-shortage-pakistan/  ·  /lpg-supply-in-pakistan/

LEARN               /what-is-lpg/  ·  /lpg-composition-and-properties/  ·  /lpg-vs-lng/  ·  /lpg-vs-cng/  ·  /lpg-vs-sui-gas/
                    /tools/lpg-litre-to-kg-converter/

SAFETY              /lpg-safety/  ·  /what-to-do-if-you-smell-gas/  ·  /lpg-cylinder-blast-causes-and-prevention/
                    /lpg-regulators/  ·  /lpg-regulator-problems-and-repair/  ·  /lpg-leak-detector/

APPLIANCES (gated)  /lpg-stove-price-in-pakistan/  ·  /lpg-geyser-price-in-pakistan/  ·  /lpg-heaters-in-pakistan/  ·  /lpg-vaporizers/
AUTO LPG (gated)    /auto-lpg-in-pakistan/  ·  /lpg-kit-price-in-pakistan/
B2B (gated)         /lpg-business-in-pakistan/  ·  /lpg-plant-in-pakistan/  ·  /lpg-bowser/
TRUST               /about/ · /contact/ · /how-it-works/ · /licences-and-compliance/ · /editorial-policy/ · /pricing-policy/ · /delivery-areas/ · /privacy/ · /terms/ · /complaints/
URDU (phase 2+)     /ur/ mirror of the top 12–15 pages, with hreflang en-PK ↔ ur-PK
```

**One-site-one-topic rule:** the whole site is about LPG, so there is no `/lpg/` parent folder *(Step 11.5.2)*. Maximum depth is three levels. City pattern is fixed: `/{topic}/{city}/`.

### 5.1 Decisions on queries that should NOT get their own page

| Queries | Decision | Reason |
|---|---|---|
| lpg uses, where lpg is used, what is lpg used for (≈70 searches in total) | Section inside `/what-is-lpg/` | Same intent, tiny volume (Step 11.3: improve, don't add) |
| lpg stand for / stands for / full form / meaning / abbreviation / liquefied petroleum gas | One page, `/what-is-lpg/` | About 5,300 searches that SERP-overlap suggests belong together (overlap in your capture is 28–50%, so run the overlap test) |
| Brand queries (ssgc lpg 590, pso lpg cylinder 390, noor lpg retail outlet 390, noor lpg 320, pso lpg 260) | No page | The brands' own sites win these. Price-with-brand queries go to the cylinder price page as a section. |
| lpg bill check (140), lpg bill (70) | No page | Probably Sui gas bills, a different product. Revisit only if Search Console shows traffic. |
| lpg ship / tanker / vessel / truck | No page | Logistics searches, no buyer |
| jobs | Excluded | Playbook exclude list (Step 7.7) |
| Foreign (India, Nepal, Bangladesh…) | Excluded | Not our market |
| `lpg to gas` (1,900) | Do not target | Meaning unclear, probably conversion. Check the SERP first. |

---

## 6. Keyword research findings *(Step 7)*

### 6.1 Demand by intent cluster (merged data)

| Cluster | Keywords | Searches (floor – ceiling) | Top terms |
|---|---:|---:|---|
| National price / rate | 87 | 76,300 – 113,500 | lpg rate in pakistan 22,200 · lpg prices in pakistan 14,800 · lpg price in pakistan today 9,900 · lpg price today 9,900 · lpg prices today 8,100 |
| Cylinder price and sizes | 141 | 11,600 – 21,900 | lpg 1kg price today pakistan 2,400 · price of lpg cylinder in pakistan 1,600 · lpg cylinder 1,300 |
| Local ("near me", shops, stations) | 86 | 9,000 – 11,200 | lpg near me 3,600 · lpg station near me 1,900 · lpg store 880 · lpg filling station 720 |
| What-is / learning | 166 | 6,000 – 10,100 | lpg stand for 1,900 · lpg full form 880 · lng vs lpg 320 |
| City price | 23 | 2,800 – 4,600 | lpg price karachi 720 · lpg price in lahore 720 · lpg price lahore 590 |
| Appliances and accessories | 181 | 1,700 – 4,600 | lpg stove 480 · lpg geyser price in pakistan 210 · lpg regulator 170 |
| Auto LPG | 301 | 1,000 – 2,400 | lpg car 320 · lpg kit price in pakistan 170 |
| B2B and trade | 71 | 500 – 1,400 | lpg plant 140 · lpg companies in pakistan 110 · lpg bowser 110 |

### 6.2 Top 40 target keywords and where each goes

| # | Keyword | Volume | SD | Intent (tool) | Page |
|---|---|---:|---:|---|---|
| 1 | lpg rate in pakistan | 22,200 | 12 | - | PR-001 |
| 2 | lpg prices in pakistan | 14,800 | 15 | informational, commercial | PR-001 |
| 3 | lpg price in pakistan today | 9,900 | 16 | informational | PR-001 |
| 4 | lpg price today | 9,900 | 21 | informational | PR-001 |
| 5 | lpg prices today | 8,100 | 14 | informational | PR-001 |
| 6 | lpg gas price in pakistan | 6,600 | 7 | - | PR-001 |
| 7 | lpg today rate | 6,600 | 20 | - | PR-001 |
| 8 | pakistan lpg rate | 6,600 | 16 | informational | PR-001 |
| 9 | today lpg price | 6,600 | 19 | transactional, navigational | PR-001 |
| 10 | lpg | 4,400 | 14 | informational | HP-001 (tentative) |
| 11 | lpg near me | 3,600 | 10 | navigational | NM-001 |
| 12 | lpg gas price | 2,900 | 16 | informational | PR-001 |
| 13 | lpg 1kg price today pakistan | 2,400 | 15 | transactional | PR-002 |
| 14 | lpg price | 2,400 | 16 | informational | PR-001 |
| 15 | today lpg price in pakistan | 2,400 | 16 | informational | PR-001 |
| 16 | lpg gas | 1,900 | 22 | - | HP-001 (tentative) |
| 17 | lpg gas prices | 1,900 | 16 | informational | PR-001 |
| 18 | lpg price in pakistan today per kg | 1,900 | 16 | informational | PR-002 |
| 19 | lpg stand for | 1,900 | 26 | informational | ED-001 |
| 20 | lpg stands for | 1,900 | 19 | - | ED-001 |
| 21 | lpg station near me | 1,900 | 12 | navigational | NM-003 |
| 22 | lpg to gas | 1,900 | 15 | mixed | HP-001 (do not target) |
| 23 | lpg cylinder price in pakistan | 1,600 | 12 | - | CY-002 |
| 24 | lpg gas stands for | 1,600 | 18 | informational | ED-001 |
| 25 | lpg rates | 1,600 | 12 | informational | PR-001 |
| 26 | price of lpg cylinder in pakistan | 1,600 | 14 | commercial | CY-002 |
| 27 | cylinder lpg | 1,300 | 9 | transactional | CY-002 |
| 28 | lpg 1kg price today | 1,300 | 17 | informational, commercial | PR-002 |
| 29 | lpg cylinder | 1,300 | 11 | - | CY-002 |
| 30 | lpg gas price in pakistan today | 1,300 | 15 | informational | PR-001 |
| 31 | lpg gas rate | 1,300 | 12 | informational | PR-001 |
| 32 | lpg rate | 1,000 | 18 | informational | PR-001 |
| 33 | ogra lpg price | 1,000 | 12 | informational, commercial | PR-003 |
| 34 | full form lpg | 880 | 15 | informational | ED-001 |
| 35 | lpg 1kg price today 2026 | 880 | 16 | transactional, commercial | PR-002 |
| 36 | lpg full form | 880 | 19 | - | ED-001 |
| 37 | lpg gas cylinder | 880 | 11 | transactional | CY-002 |
| 38 | lpg prices in pakistan today | 880 | 11 | informational | PR-001 |
| 39 | lpg store | 880 | 20 | navigational | NM-002 |
| 40 | lpg filling station | 720 | 11 | navigational, commercial | NM-003 |

The full mapping for all 1,702 keywords is in `keyword-master.csv`.

### 6.3 The easy-win test status *(Step 7.8)*

| Signal | Status with current data |
|---|---|
| E: low difficulty (≤ 20) | **Passed** for 96% of targets, on third-party scores |
| A: allintitle under 50 or KGR under 0.25 | Not yet checked. Run it for the shortlist only (Google shows CAPTCHAs for bulk checks). |
| B: DR ≤ 10 site in the top 5 | Needs Ahrefs SERP overview |
| C: weak or irrelevant result in the top 5 | The Islamabad capture shows ebizpk (a directory) and small sites, a likely pass for cylinder and delivery. Confirm per query. |
| D: young domain in the top 5 | WHOIS and Wayback check, week 1 |
| F: results don't fully satisfy intent | Likely for city-level price and "price vs market price". Confirm in the teardown. |

Rule to apply (Step 7.8.3): three or more signals → target now; two → target later or as a supporting page; zero or one → park.

### 6.4 Keyword work that still has to happen in weeks 1–2

1. Pakistan-only exports for 40+ new seeds (Keyword Planner and Ahrefs/Semrush): gas cylinder, cylinder sizes and prices by kg (5, 6, 11.8, 12, 13, 15, 22, 45), sui gas, geyser, heater, LPG companies by city, plus the 20+ cities and districts beyond the five in the files, and winter and northern-areas terms (Murree, Gilgit, Skardu, Chitral).
2. Urdu-script and Roman Urdu exports.
3. SERP-overlap test across the price and cylinder keywords (Step 8.2) to settle the "TEST" rows in the page map.
4. Seed the five pages that have no keyword data yet: CY-001, PR-009, PR-010, DL-006, NW-003.

---

## 7. Site architecture and page inventory *(Steps 9, 11, 11.5)*

### 7.1 Counts

| Phase | Window | Pages | What ships |
|---|---|---:|---|
| **P1 (launch)** | Weeks 1–4 | 19 content pages + 10 trust pages | Price flagship and per-kg and OGRA pages, 3 city price pages, cylinders hub and price and sizes, delivery hub and 2 city pages, order page, shortage tracker, supply explainer, "what is LPG", safety hub and gas-smell page |
| **P2** | Weeks 5–12 | 20 | Remaining city price and delivery pages, history, calculator, size pages, refill, new connection, commercial supply, directories, comparisons, composition, converter, blast guide |
| **P3** | Months 4–6 | 13 | Gated pages: more cities, bulk, directories, regulators, leak detector, stoves, geysers, heaters (ready before winter), B2B |
| **P4** | Months 7–12 | 5 plus Urdu | Auto LPG, plant, bowser, vaporizers, and the Urdu mirror |

That is 57 mapped pages plus trust pages, the Urdu mirror (about 12–15 pages) and city expansions that clear their gates. **The plan deliberately avoids hundreds of city and area pages.** Doorway pages are a policy violation *(Appendix A)*, and the master reference's rule is that combinations are research opportunities, not pages *(Step 22)*.

### 7.2 Launch-set (P1) pages and their keyword sets

| Page | URL | Primary keyword (vol) | Mapped | Searches floor–ceiling |
|---|---|---|---:|---:|
| HP-001 | `/` | lpg (4,400, tentative) | 5 | 6,620–8,520 |
| PR-001 | `/lpg-price-in-pakistan/` | lpg rate in pakistan (22,200) | 72 | 76,310–111,850 |
| PR-002 | `/lpg-price-per-kg-in-pakistan/` | lpg 1kg price today pakistan (2,400) | 23 | 7,990–8,940 |
| PR-003 | `/ogra-lpg-notified-price/` | ogra lpg price (1,000) | 14 | 1,640–1,670 |
| PR-004 | `/lpg-price-in-pakistan/karachi/` | lpg price karachi (720) | 14 | 2,340–3,000 |
| PR-005 | `/lpg-price-in-pakistan/lahore/` | lpg price in lahore (720) | 11 | 2,700 |
| PR-006 | `/lpg-price-in-pakistan/islamabad/` | lpg price islamabad / 1kg near islamabad (90) | 7 | 210–280 |
| CY-001 | `/lpg-cylinders/` | seed in Ahrefs/Semrush | 0 | – |
| CY-002 | `/lpg-cylinder-price-in-pakistan/` | lpg cylinder price in pakistan (1,600) | 34 | 5,850–10,330 |
| CY-007 | `/lpg-cylinder-sizes-in-pakistan/` | lpg bottle sizes (10) | 7 | 10–20 |
| DL-001 | `/lpg-home-delivery/` | lpg home delivery (170) | 3 | 180 |
| DL-002 | `/lpg-home-delivery/islamabad/` | lpg cylinder / gas islamabad (0 reported) | 9 | 0 |
| DL-003 | `/lpg-home-delivery/rawalpindi/` | lpg gas rawalpindi (260) | 4 | 260 |
| DL-008 | `/order-lpg/` | lpg online (20) | 11 | 30–70 |
| NW-001 | `/lpg-shortage-pakistan/` | lpg shortage in pakistan (30, pre-crisis figure) | 16 | 40–110 |
| NW-002 | `/lpg-supply-in-pakistan/` | lpg importers in pakistan (20) | 16 | 30–70 |
| ED-001 | `/what-is-lpg/` | lpg stand for (1,900) | 50 | 5,320–8,370 |
| SF-001 | `/lpg-safety/` | is lpg safe (10) | 4 | 10–30 |
| SF-002 | `/what-to-do-if-you-smell-gas/` | can lpg gas kill you (10) | 6 | 10–30 |

Several P1 pages carry little reported search volume (delivery, safety, supply). They are in P1 because they carry **revenue, safety, or trust**, which the volume column does not measure. The delivery pages in particular are the money pages.

### 7.3 Gates that stop a page going live *(Golden rules 1–4, Step 22.3)*

| Page group | Gate |
|---|---|
| City price pages | The city has its own verified OGRA or supplier price row **and** at least 5 verified local facts (Step 13.3 location standard). Otherwise the content lives on the national page. |
| City delivery pages | Live fulfilment in that city, tested with a real order, **and** 5 or more verified local facts (areas, delivery time we measured, charges, hours, partner) |
| Directories | At least 5 phone-verified listings per city (Step 11.2). No scraping of map results. |
| Appliances | We sell the product or have a disclosed affiliate arrangement. Real stock and prices. |
| Auto LPG | Legal status and OGRA rules for auto-LPG fitment confirmed. Cylinders in cars are a safety issue. |
| Composite cylinders | A named supplier and verified specifications |
| Any claim | A row in the verified-facts table with source, verifier and date |

### 7.4 Overlap tests that must pass before publishing *(Steps 8.2, 8.4)*

The four price-related pages share a lot of vocabulary, which is the highest cannibalization risk in the plan.

| Pages | Test | Rule |
|---|---|---|
| PR-001 vs PR-002 (per kg) | Export the top 10 for "lpg rate in pakistan" and "lpg 1kg price today pakistan" | 70% or more shared URLs → merge PR-002 into PR-001 as a section. 40–69% → read the SERPs by hand. Under 40% → keep separate. |
| PR-001 vs PR-003 (OGRA) | Same, using "ogra lpg price" | Same rule |
| PR-001 vs CY-002 (cylinder price) | Same, using "lpg cylinder price in pakistan" | Same rule |
| NM-001 vs NM-002 vs NM-003 | "lpg near me", "lpg shop near me", "lpg station near me" | If the SERPs are mixed, keep one finder and make the other two sections |
| HP-001 vs ED-001 | "lpg" and "lpg gas" | Decides whether the home page or `/what-is-lpg/` is mapped to the head terms |

**Intent definitions to keep the pages distinct** if they stay separate: PR-001 = "what is the rate now" (per kg and per size, change). PR-002 = per-kilogram conversions. PR-003 = what the regulator notified and how it is set. CY-002 = what a cylinder costs including deposit, plus what to check when buying.

---

## 8. Page templates and content blueprints *(Steps 12, 13)*

### 8.1 Voice, language and format rules (all pages)

- Pakistani business English (British spelling: litre, colour). Plain words, short sentences, jargon explained.
- Money as **Rs 3,296** (comma separators). Dates as **26 October 2026**. Weights in kg. Always state the notification month beside any price.
- Answer the main question in the first two sentences of the page and of each section *(Step 13.5)*.
- Service pages in the company voice ("we"). Guides in the third person.
- Numbers in tables, steps in numbered lists, one idea per paragraph, descriptive H2s *(Step 13.6)*.
- **Never write:** competitor names on our pages, the word "keyword", unverified prices, invented reviews or counts, fake urgency, "cheapest" or "fastest" without proof, any price above the OGRA maximum presented as the official price.
- **Freshness stamp:** every price page shows "Source: OGRA notification dated …, checked on …". If a page is more than 35 days past its last verification, it shows a stale banner automatically (Section 13).

### 8.2 Blueprint by page type

| Type | Sections (functional framework, Step 13.1) | Minimum information gain (3+ per page) |
|---|---|---|
| **Price flagship (PR-001)** | 1. Answer box: the rate, effective date, source. 2. Table: per kg and by size (5, 11.8, 15, 45.4 kg). 3. Change since last month. 4. OGRA notified vs reported market price, labelled and sourced. 5. City rates (links). 6. Calculator. 7. 12-month chart and CSV link. 8. How the price is set. 9. Next expected notification. 10. Order CTA. 11. FAQ from real questions. 12. Sources and methodology. | Our own month-on-month calculation and chart · downloadable dataset · notified-versus-market comparison with dates · per-size calculator · plain-language formula |
| **City price (PR-004…)** | Answer box with city rate · table by size · what is different in this city (delivery charges, typical deposits, supply situation, only if verified) · links to the delivery page and the national page | The city's own notified or verified supplier price · local supply notes · verified delivery data |
| **Cylinder size page** | What the size is for · weight and gas content · price by month · deposit and refill rules · safety notes · where to get it | Price history for that size · real photo with markings · how long it lasts for typical households |
| **Delivery city page (money)** | Order box above the fold · price and delivery charge · areas covered (a real list) · time we measured · how ordering works · payment · safety check · FAQ | Our own delivery-time data · exact coverage list · cylinder and regulator options in stock · real photo and driver process |
| **Directory (near me)** | Search by city/area · verified listings with call and hours · how we verify · a way to report errors | Phone-verified listings · last-verified date per listing · coverage map |
| **News/tracker (NW-001)** | Status box with last update time · dated timeline (each entry with source) · price changes · what households can do · FAQ | Dated source-linked timeline · price table before and after · reader price reports (once verified) |
| **Guide (what is, vs, composition)** | Direct answer first · definition · facts · comparison table · Pakistan-specific context · link to the money page | Pakistan-specific numbers and rules · original diagram · expert-reviewed notes |
| **Safety** | Steps first, then why · sources · reviewer named and dated | Reviewed by a named person with credentials · emergency steps in English and Urdu · printable checklist |
| **Tool** | Inputs · result · explanation · related pages | The tool itself · the formulas shown |
| **Trust** | Real names, numbers and licences | – |

### 8.3 Starter briefs for the launch pages *(Step 12, template of three parts)*

Each brief gets completed in `PAGE_BRIEF` form before writing. The summary below is the starting point.

**PR-001 `/lpg-price-in-pakistan/`** *(flagship)*
- *Search brief:* primary "lpg rate in pakistan"; 70+ mapped variants (price/rate/prices/today/per kg without city). Intent: informational with a price answer. Rival: tools and news.
- *Content brief:* title `LPG Rate in Pakistan {Mon YYYY}: Price per kg & Cylinder` (54 characters). H1: "LPG Rate in Pakistan Today". Opening: "The OGRA-notified LPG price for {month year} is Rs {X} per kg, which makes an 11.8 kg cylinder Rs {Y}." (only with confirmed figures.)
- *Facts required:* OGRA notification (date, effective period, price per kg, per cylinder, regions), previous 12 months, sources for market prices.
- *Must not claim:* a "market price" without a dated source; "lowest price"; any guarantee of delivery at the notified price.
- *Implementation:* `Dataset` schema for the series, `Article` with named author, `BreadcrumbList`. ISR with on-demand revalidation when a notification is saved.

**CY-002 `/lpg-cylinder-price-in-pakistan/`:** price by size, deposit, new vs refill, composite vs steel, the brand note ("OGRA sets the gas price; deposits and cylinder types differ"). Pull the size rows from the same data as PR-001 so the two never disagree.

**DL-001/002/003 `/lpg-home-delivery/…`:** order form first. The Islamabad/Rawalpindi pages are the first two because the research shows demand and strong rivals there, which also means they need real proof: own measured delivery times and a real coverage list. If we cannot beat the live-ETA and driver-map experience that cylin.com.pk shows, we compete on price clarity, safety check and WhatsApp response speed.

**NM-001 `/lpg-near-me/`:** a finder with verified listings. Until there are 5 verified listings in a city, show a "request delivery" path for that city.

**NW-001 `/lpg-shortage-pakistan/`:** status box (last update timestamp), dated entries, each with a source link. No predictions presented as facts. Names and numbers only from cited sources (Reuters, Business Recorder, OGRA, official notices). Updated daily during the crisis.

**NW-002 `/lpg-supply-in-pakistan/`:** where Pakistan's LPG comes from (domestic production vs imports), who regulates and supplies, how a border closure affects supply. Answers the PAA: *Does Pakistan produce LPG? Who supplies LPG to Pakistan?* All volumes cited with date and source.

**ED-001 `/what-is-lpg/`:** answer in two sentences ("LPG stands for liquefied petroleum gas…"), then composition, uses in Pakistani homes, how it differs from Sui gas, safety link, order link. Title: `LPG Full Form: What LPG Stands For and Its Meaning` (50 characters).

**SF-002 `/what-to-do-if-you-smell-gas/`:** steps, in English and Urdu, reviewed by a named qualified person. Includes emergency contact numbers **only after we verify them** for each city.

Title and meta tags for these (all within 60 and 140–160 characters) are in `meta-tags-p1.csv`.

### 8.4 The page-brief rule: verified-facts table first *(Step 12)*

Every brief carries a table: **fact · value · source · who verified · date.** Writers and AI drafts may use only those rows. Anything else is written as `[NEEDS FACT: …]`.

Starter table (values stay blank until verified):

| Fact | Source | Owner |
|---|---|---|
| OGRA notified price per kg, per 11.8 kg, per 45.4 kg, by region, with effective dates | OGRA notification (link and PDF copy) | Data editor |
| Previous 24 months of notified prices | OGRA archive | Data editor |
| Cylinder weights, deposit amounts, brand cylinder types | Supplier documents | Operations |
| Our delivery time, charges, areas, hours | Our own order logs | Operations |
| Our licences and registration | Documents | Owner |
| Border closure date, supply impact, price reports | Reuters, Business Recorder, OGRA (linked) | News editor |
| Emergency numbers by city | Official sources, called and confirmed | Safety reviewer |
| Auto-LPG legal status | OGRA rules, lawyer | Owner |

---

## 9. Content production system *(Steps 12–13, 27)*

### 9.1 Roles

| Role | Does |
|---|---|
| Editor-in-chief | Owns the page map, approves briefs, final publish decision |
| Data editor | Monthly OGRA update, dataset, calculators |
| Writers (English, Urdu) | Drafts from briefs and the facts table |
| Subject reviewer | Reviews safety, technical and legal-adjacent pages, signed and dated |
| Operations lead | Supplies delivery, coverage and supplier facts |
| Developer | Template, data pipeline, schema, performance |
| Outreach lead | Links and PR |

### 9.2 Workflow per page *(Step 13.4)*

1. Confirm the page is in `page-map.csv`, its gate has passed, and no other page targets the cluster.
2. Read the live SERP in the target city, and tear down 3 competing pages (Step 6.6, prompt P8).
3. Fill the brief (prompt P9) and the facts table.
4. Draft from the facts only (prompt P10, with the guardrail block G first).
5. Add the three information-gain items.
6. Fact-check every claim (P11). Sibling similarity check (P12): rewrite anything above about 0.8 similarity.
7. Titles, meta, headings (O2, O3, O4).
8. Subject review for safety, price and legal-adjacent pages.
9. Publish, link from 2–5 pages, submit to Search Console and Bing, record in the log.

### 9.3 Which master-reference prompts to use where

| Task | Prompts |
|---|---|
| Keyword ideas and validation | K1, K3, K2, K6 |
| Clustering and overlap | P7, K7 |
| Competitor tear-down and gaps | P8, K4, K5 |
| Brief | P9 |
| Draft, fact-check, differentiation | P10, P11, P12 |
| On-page | O2, O3, O4, P13 |
| Writing quality | W1 (intro), W2 (pain points from real language), W4 (expertise upgrade), W5 (FAQs) |
| Links | P14 (internal), P15 (link assets) |
| Diagnosis | P16, O5 |
| Technical | T1, T2, T3 |

Always paste the guardrail block (Section 27.1) first. The model, prompt version and reviewer are logged for every published page.

### 9.4 Quality gates *(Section 25.4)*

A page does not publish unless: it answers its question early; has 3+ information-gain items; every claim is in the facts table; it has been read on a phone; title, meta, canonical and schema are valid; it has links in and out; it is in the sitemap; conversion and tracking were tested; and a review date is set.

---

## 10. The data engine (the competitive moat) *(Steps 15.1, 22.1, 27)*

The flagship wins on speed, accuracy and depth, so the price data is built as a system from day one.

**Tables (Supabase, in addition to the existing leads table):**

| Table | Fields |
|---|---|
| `price_notifications` | id, month, notified_on, effective_from, effective_to, source_url, pdf_copy, status |
| `price_rows` | notification_id, region/city, price_per_kg, price_5kg, price_11_8kg, price_15kg, price_45_4kg, change_vs_previous |
| `market_reports` | id, city, size, price, reported_on, source_type (news / dealer / reader), source_url, verified_by, status |
| `cities` | slug, name, province, verified_fact_count, delivery_live, notes |
| `providers` | id, services, coverage, licence_no, verified_on, status |
| `pages` | page_id, type, url, gate_status, last_verified, owner |
| `leads` | existing, plus page_id, consent_text_version, source, status, provider, first_contact_at |

**Monthly price SOP (the most important recurring task):**

1. Within hours of an OGRA notification: enter the rows, attach the PDF, verify by a second person.
2. Publish the update: PR-001, PR-002, PR-003, city pages, CY-002, size pages and calculators all read from the same rows, so they cannot disagree.
3. Freeze last month into an archive page (`/lpg-price-in-pakistan/{month-year}/`) with short commentary. Do not publish an archive that merely duplicates the head page.
4. Update `dateModified`, the sitemap `lastmod`, and ping Bing with IndexNow. Request indexing in Search Console for the flagship only.
5. Send the alert (WhatsApp channel, email) and post on social.
6. Log the update date. The stale banner switches on automatically after 35 days.

**Market Price Pulse (Phase 3, original data):** a city-by-city view of reported market prices from news, dealers, and reader submissions, each with a source, date and method. Moderation rules and verification are written before launch. It is the likeliest link magnet in the plan, and also the biggest accuracy risk, so it only ships once the verification process works.

---

## 11. On-page, schema and technical requirements *(Steps 13.7, 15.2–15.9)*

### 11.1 The current scaffold needs to change

The Next.js project already in `lpg-website/` was generated as a UAE lead-gen starter. For this plan it needs:

| Change | Detail |
|---|---|
| Rebrand and localise | Name "The LPG Co. Pakistan", domain thelpgco.pk, locale `en-PK`, currency PKR, time zone Asia/Karachi, Pakistan cities and phone format. Remove the UAE cities and the UAE copy. |
| Data-driven pages | Pages render from the tables in Section 10. ISR with on-demand revalidation when a notification is saved. |
| New URL structure | The tree in Section 5. Rename `/safety` to `/lpg-safety/`; replace `/cities` and `/services` with the pillar structure; 301 any URL that changes. |
| Sitemaps | Index split by type (pages, tools, archive, news, Urdu), canonical 200 URLs only, accurate `lastmod` from the data. |
| robots.txt | Allow content. Decide per AI bot (Step 19). Block internal search and parameters. |
| Urdu | `/ur/` tree, `hreflang` en-PK ↔ ur-PK with self-references, RTL layout, subset Urdu web font |
| Performance | Pakistan is mostly mid-range Android on 4G: aim for LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 on a throttled mobile profile. No heavy client libraries. Compressed WebP images. |
| Conversion | WhatsApp click-to-chat, tap-to-call, consent text stored with a version and timestamp, honeypot, rate limit (partly built) |
| Analytics | Search Console (domain), Bing Webmaster Tools, GA4 events: `generate_lead`, `whatsapp_click`, `phone_click`, `price_alert_subscribe`, `tool_use` |
| Hosting and DNS | CDN in front, HTTPS, uptime monitoring, backups |

### 11.2 Schema by page type *(Steps 15.3, 15.8)*

| Page | Types |
|---|---|
| Every page | `Organization`, `BreadcrumbList` |
| Price history | `Dataset` (with the CSV as a distribution) |
| Guides and news | `Article` with a real, named author and reviewer |
| Delivery and service pages | `Service`. `LocalBusiness` **only** if the company has a real premises or service area registered |
| Tools | `WebApplication` is optional. The tool must work. |
| FAQ | Write for readers. FAQ rich results are limited to government and health sites, so do not expect snippets. |
| Reviews | Never mark up reviews that are not genuine and visible. Self-serving reviews are not eligible. |

### 11.3 On-page rules

Titles 50–60 characters with the primary phrase first and the brand last; meta descriptions 140–160 characters; one H1; H2s that state what each section answers; alt text that describes the image; descriptive file names; self-referencing canonical; no keyword stuffing and no exact-match H2 repetition *(Step 13.7)*.

---

## 12. Conversion and lead operations *(Steps 14, 20)*

**The funnel:** Price or guide page → size picker ("Which cylinder do you use?") → city → order or WhatsApp → confirmation call → delivery → follow-up and re-order reminder.

| Element | Standard |
|---|---|
| Primary CTA | Above the fold on every commercial page. WhatsApp and call buttons on mobile. |
| Form | City, cylinder size, name, phone. Details optional. Four fields maximum. |
| Consent | Clear text beside the button: who will call and why. Stored with version and time. No pre-ticked box. |
| Price honesty | Show the OGRA-based price and our delivery charge separately. Never present a price above the notified maximum as the official one. |
| No fake urgency | No invented counters, "only 3 left", or "23 orders today" |
| Spam protection | Honeypot, rate limit, phone validation, duplicate detection |
| Speed to lead | Confirmation call within a target window (**ASSUMPTION:** 10 minutes in business hours), tracked |
| Weekly test | A synthetic test lead each week, followed through to the provider |
| Lead record | `page_id` stored on every lead, so revenue can be traced to a page |
| Re-order | Ask permission for a refill reminder. It builds repeat business without new search traffic. |

**If referral model:** the written lead definition, return window and reason codes from *Step 20.3* apply, and every page carries the referral disclosure.

**Owned audience:** a "price alert" signup (WhatsApp channel, email) on every price page. It is the cheapest insurance against search volatility and the base for the news and Discover push.

**Illustrative economics (ASSUMPTION, not a forecast):** at 10,000 monthly clicks to commercial and price pages, a 1.5% request rate gives 150 requests; with a 70% valid rate that is about 105 orders to fulfil. Replace the rates with your own after the first month.

---

## 13. Internal linking plan *(Steps 17, 17.1)*

- **Funnel spine:** Price → Cylinder price → Delivery → Order. Every price and cylinder page has a visible path to order.
- **Hub-and-spoke:** each pillar links to every child; each child links back to its pillar and to 2–4 siblings.
- **Cross-pillar:** guides and safety pages link to the relevant delivery or price page in the body. News pages link to the price flagship.
- **New-page rule:** every page gets links from 2–5 existing pages on the day it goes live *(Step 17.1)*.
- **Anchors:** descriptive and varied ("LPG price in Lahore", "11.8 kg cylinder rate"), never "click here".
- **Footer:** short, no giant city lists.
- **Breadcrumbs** with markup on every page.
- **Automation:** a "related pages" block that reads `page-map.csv` relationships. Monthly crawl for orphans.

---

## 14. Authority and visibility *(Steps 18, 19)*

### 14.1 Link-earning assets (only what we can actually produce)

| Asset | Who would cite it | Effort |
|---|---|---|
| **Pakistan LPG Price Tracker**: monthly dataset, chart, CSV | Business and energy journalists, finance sites, universities, economists | M, then monthly |
| **Market Price Pulse** (after the verification process is live) | News outlets, consumer groups | L |
| **Cylinder cost calculator** and **LPG vs Sui gas cost calculator** | Blogs, forums, personal-finance writers | M |
| **LPG safety checklist** (English and Urdu), reviewed | Schools, mosques and community pages, local government pages | S |
| **Who supplies Pakistan's LPG** explainer with sourced figures | Journalists, students, policy sites | M |
| **Directory of licensed LPG marketers** (neutral) | Trade sites, news | M |

### 14.2 Plan

- **Month 1:** publish the tracker with a methodology page. Pitch it to business journalists who cover monthly OGRA notices. Set up the WhatsApp channel, a YouTube channel and a Facebook page with the exact brand name.
- **Months 2–3:** expert comments for journalist-request services; a safety explainer with a recognised reviewer; a genuine listing on relevant Pakistani business directories (real name, address and phone only).
- **Months 3–6:** a data story from the first three months of the price series; partnerships with local associations if eligible.
- **Never:** bought links, private blog networks, link exchanges, or interlinked owned sites *(Step 18.3)*.
- **KPI:** new **relevant** referring domains per month. **ASSUMPTION** to start with: 10 by month 3, 30 by month 6, 80 by month 12.

### 14.3 Local SEO, honestly *(Step 16)*

- **If you operate a real outlet or yard:** create a Google Business Profile with the real address, hours and categories. Collect genuine reviews. Keep name, address and phone identical everywhere. This is the only route into the map pack that carries "lpg near me" (3,600) and "lpg cylinder near me".
- **If you are a referral service:** no Business Profile is allowed. Compete through organic pages, verified directories and the order funnel. Do not create fake branch listings.
- **Rank-and-rent style arrangements:** if a partner rents a city, every business detail on that page must match the partner's real details.

### 14.4 AI search *(Step 19)*

Put a clear answer block and a dated, sourced table at the top of each price page. Allow the search bots you want to be cited by and decide on training bots separately in robots.txt. Verify Bing Webmaster Tools (Copilot uses Bing's index) and use IndexNow. Track referrals from chatgpt.com, perplexity.ai, copilot.microsoft.com and gemini.google.com in GA4, and each month ask 10–20 key questions in the major assistants and record whether we are cited. An `llms.txt` file is optional and low priority.

---

## 15. Roadmap *(Section 26)*

### 15.1 First 30 days (Gate 0 through launch)

| When | Work | Output |
|---|---|---|
| **Days 1–3** | Answer Gate 0. Open Search Console, Bing, GA4. Confirm tool access. Lawyer questions sent. | Business facts file; legal questions list |
| **Days 1–5** | **Fast lane:** minimal template, OGRA data entered, ship `PR-001`, `NW-001`, `ED-001` | The three pages live and submitted |
| **Days 3–7** | Keyword expansion exports (Section 6.4). SERP snapshots for Karachi, Lahore, Islamabad. Overlap tests (Section 7.4). Competitor tear-down of 12 pages. | Updated `keyword-master.csv`, final `page-map.csv` (**Gate B**) |
| **Days 5–14** | Data model, trust pages, tracking, schema, sitemap. Back-fill 12–24 months of OGRA data. | Working site template and dataset |
| **Days 10–21** | Remaining P1 pages: PR-002, PR-003, PR-004–006, CY-001, CY-002, CY-007, SF-001, SF-002, NW-002 | Content live as each page passes its gate |
| **Days 14–28** | DL-001–003, DL-008, partner onboarding, order flow, test leads | **Gate C** launch checklist |
| **Day 30** | Review: indexing, errors, first impressions | Go/no-go on P2 |

### 15.2 Days 31–90

| Period | Work |
|---|---|
| Weeks 5–6 | P2 batch 1: PR-007, PR-009 (history), PR-010 (calculator), CY-003, CY-004, CY-008, CY-009 |
| Weeks 7–8 | P2 batch 2: DL-004, DL-005, DL-006, NM-001, NM-004, ED-002–006 |
| Weeks 9–10 | SF-003; Urdu foundation (top 5 pages translated and reviewed); first outreach round |
| Weeks 11–12 | First optimisation cycle: titles on pages with impressions but low CTR (Step 21.5), pages at positions 8–20 get information gain and internal links; **Gate E1** review |

### 15.3 Months 4–12

| Months | Work |
|---|---|
| 4–6 | P3 batch: gated pages that have passed their gates. Appliances (stoves, heaters, geysers) must be live **before** the next winter. Market Price Pulse if verification is ready. More cities, only if data supports them. |
| 6 | **Gate X:** check expansion data against the 100K target (Section 22). |
| 7–9 | P4 pages that cleared gates. Urdu pillar expanded. Release in batches of 10–50 pages, measuring indexing after 4–8 weeks (Step 22.4). Stop and fix quality if indexing falls below about 70%. |
| 10–12 | Refresh top pages. Prune or merge weak ones (Step 23). Plan year two. |

**Capacity rule:** lead operations take more time than page production. Do not open a new city page until the earlier cities are being served on time *(Step 26.2 cap)*.

---

## 16. Measurement *(Step 21)*

**Setup before launch:** Search Console (domain property), Bing Webmaster Tools, GA4 events, rank tracker set to Pakistan and to Karachi, Lahore and Islamabad, call/WhatsApp attribution, `page_id` on every lead.

**Rank tracking set (about 150 keywords):** every primary and the top 3 secondaries per page, the head price terms in each of the three cities, and the 20 most important Urdu terms.

| Metric | Source | Cadence |
|---|---|---|
| Indexed ÷ submitted pages | Search Console | Weekly |
| Impressions, clicks, CTR, position by page | Search Console, Bing | Weekly |
| Rankings by city | Rank tracker | Weekly |
| Discover impressions and clicks | Search Console | Weekly |
| Leads, valid rate, time to first contact | Lead database | Daily during crisis, otherwise weekly |
| Orders and revenue by page | Lead database and finance | Monthly |
| New relevant referring domains | Ahrefs/Semrush | Monthly |
| AI-assistant referrals and citations | GA4 and manual check | Monthly |
| Price data freshness (days since last verification) | Data editor dashboard | Daily |

**Diagnosis:** use the symptom → cause table in *Step 21.3* (not indexed, indexed but no impressions, impressions but low CTR, stuck at 11–30, traffic without leads). Run prompts P16 and O5 monthly.

---

## 17. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| AI Overviews and snippets answer price queries | High | Own the cited source, the dataset, calculators and the order path. Count CTR assumptions at 22% and review in month 3. |
| One page carries about three quarters of demand | High | Protect it with freshness, depth and links. Build the cylinder, delivery and Urdu pillars so growth does not depend on it. |
| Publishing a wrong price or safety statement | High | Second-person check, sourced figures, stale banner, subject reviewer, visible correction log |
| Advertising above OGRA's notified maximum | Legal | Lawyer review before launch. Show notified, market and our price separately and honestly. |
| Competitors with live tracking (cylin.com.pk) | Medium | Differentiate on price clarity, safety, WhatsApp speed and coverage proof; do not copy |
| New-domain delay | Medium | Fast-lane pages first; set expectations in Section 1.3 |
| Crisis ends and demand falls | Medium | Evergreen pillars, owned audience, winter seasonality |
| Thin or duplicate pages | High | Gates, similarity checks, batch release with an indexing stop signal |
| Operational overload from leads | Medium | Cap city count to the capacity to serve |
| Over-reliance on third-party volume numbers | Medium | Validate in Keyword Planner and Search Console after launch |
| Doorway-page policy | High | No placeholder city pages; each needs 5+ verified local facts |

---

## 18. Pre-publish checklist per page *(Section 25.2 and 25.4, condensed)*

- [ ] In `page-map.csv`; gate passed; no other page targets the same cluster
- [ ] Live SERP and three competing pages studied in the target city
- [ ] Facts table complete; nothing outside it appears on the page
- [ ] Main question answered in the first two sentences
- [ ] Three information-gain items present
- [ ] Title (50–60), meta (140–160), H1, headings, alt text, canonical, schema valid
- [ ] Mobile read-through done; Core Web Vitals checked
- [ ] Order path and tracking tested
- [ ] Similarity check against sibling pages passed
- [ ] Reviewed by the subject reviewer (price, safety, legal-adjacent)
- [ ] Linked from 2–5 pages; in the sitemap; indexing requested
- [ ] Review date set

---

## 19. What is different about this plan compared with a typical LPG site

1. One data pipeline feeds every price on the site, so pages never disagree.
2. The notified/market/our-price split is explicit, dated and sourced.
3. Three launch pages go out in days because the demand and the season are now.
4. Every commercial page earns its place with a gate. No city pages by template.
5. Urdu is planned from the start.
6. The plan states what the data can and cannot deliver, and the test that decides whether 100K is reachable (Gate X).

---

## 20. Page-by-page reference

The authoritative list is `page-map.csv` (57 pages, with URL, phase, primary keyword, secondary terms, floor and ceiling demand, and gate notes). Re-run the scripts after any new export:

```
python docs/seo-plan/scripts/01_parse.py   # merge the two Ubersuggest files
python docs/seo-plan/scripts/02_map.py     # keyword → page mapping, page-map.csv, keyword-master.csv
python docs/seo-plan/scripts/03_model.py   # demand and click model
python docs/seo-plan/scripts/04_checks.py  # integrity checks and meta tags
python docs/seo-plan/scripts/05_tables.py  # markdown tables
```

Integrity checks on the current output: no keyword appears twice, every page has exactly one primary keyword, and five pages (CY-001, PR-009, PR-010, DL-006, NW-003) still need seed keywords from Ahrefs/Semrush.

---

## 21. Gates summary *(Phase gates A–E)*

| Gate | Condition | Status |
|---|---|---|
| **A** Business | Licence/model confirmed, provider or fulfilment commitment, compliance questions answered, positive conservative economics | **Open: needs Gate 0 answers** |
| **B** SEO opportunity | Overlap tests done, page map final, competitor gaps documented | Draft ready; needs weeks 1–2 data |
| **C** Launch | Launch checklist (Step 15), tested lead flow, tracking verified | After build |
| **D** Authority | New relevant referring domains growing | From month 1 |
| **E** Pilot results | Indexing at least about 70%, impressions growing, accepted leads | Day 90 review |
| **X** Ceiling (added in this plan) | Expansion keyword data (levers A–C) added to the model | Month 6 |

## 22. Gate X — how we decide whether 100K is reachable

At month 6, re-run `03_model.py` with the expanded keyword set (Pakistan-only volumes, Urdu, new cities, sizes) and Search Console actuals:

- **Saturation ≥ 100K clicks/mo at assumed CTRs:** keep the 100K target and the month-18 and month-24 steps.
- **Saturation 50–100K:** reset the target to 70–80% of the modelled ceiling and invest in the biggest remaining lever (usually Urdu or new topics).
- **Saturation < 50K:** the market does not support 100K from Search. Reset the target and add non-search channels (YouTube, WhatsApp, Facebook, partnerships).

## 23. Open decisions (blocking or near-blocking)

1. The business model and licence status (Gate 0, questions 1–2)
2. The cities with live fulfilment (question 3)
3. Real contact details, hours, delivery data (question 4)
4. Whether there is a physical outlet (question 5)
5. Whether appliances will be sold (question 6)
6. Urdu resourcing and the safety reviewer (question 7)
7. Tool access for week 1 (question 8)
8. Budget and team (question 9)

## 24. Revision log — how v1 became v3

**v1 (first draft, written straight from the keyword files):** 100K as a plan target; city price pages for five cities in launch; delivery pages for four cities; brand pages for Noor, PSO and SSGC; stove, geyser and auto-LPG pages in the first wave.

**Review A (after sizing the data):**
- Summed demand honestly: floor 126K, ceiling 178K searches; at #1 everywhere that is about 26–37K clicks. **Replaced the flat 100K claim** with staged targets, the three levers and Gate X (Sections 1, 22).
- Found one page carrying about three quarters of the demand. Added the protect-and-diversify strategy (Sections 4, 17).
- Found that `lpg to gas` (1,900), `lpg` (4,400) and `lpg gas` (1,900) are ambiguous. Marked HP-001 as tentative and "do not target" for the first.
- Found that the three captured results pages are different in kind (map plus AI plus small sites; news; authority data). Added query-by-query reading (Section 3.1).

**Review B (audit against the master reference's golden rules and gates):**
- Golden rule 1 (no page without fulfilment) → delivery launches in **two cities**, not four; the others move to P2 behind the gate.
- Golden rule 4 (no template swapping) and Step 13.3 → city pages need a verified row of their own and five local facts; otherwise the content lives on the national page (Section 7.3).
- Step 8.4 (cannibalization) → four price-vocabulary pages looked risky; added overlap tests with a merge rule (Section 7.4).
- Step 11.3 → "uses" queries merged into `/what-is-lpg/`; brand and bill queries given no page (Section 5.1).
- Step 4 and Appendix A → appliances, auto-LPG and bowser pages **gated** on selling, legality and volume.
- Step 16 → no Business Profile unless a real premises exists (Section 14.3).
- Step 12 → verified-facts table put ahead of drafting; the "AI Overview is not a source" rule written into Section 3.3.
- Step 14 → price honesty, no fake urgency, consent and test lead set out in Section 12.
- Added the fast lane after noticing the date: late October is the start of winter demand and the shortage is live.
- Added the stale-price banner, because wrong prices in a shortage are a trust and legal risk.

**What would make this plan final (v4):** Gate 0 answers, the week-1–2 keyword and SERP data, and the overlap-test results. Until then the plan is complete in structure and honest about its limits.
