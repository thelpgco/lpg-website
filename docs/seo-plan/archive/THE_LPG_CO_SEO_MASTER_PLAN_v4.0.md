# THE LPG CO. PAKISTAN: SEO & Lead-Gen Master Plan

**Site:** thelpgco.pk · **Market:** Pakistan, all seven regions · **Languages:** English first, Urdu and Roman Urdu second · **Plan version:** v4.0 (v3.0 is in `archive/`) · **Written:** 26 Oct 2026

**Goal set by the owner:** rank #1 and reach 100,000 organic clicks a month.

**Method:** the SEO & Lead Generation Operating System (`keywords and research/seo-LeadGEN.md`, v3.0). Step numbers like *(Step 8.6)* point into that file. Every number below comes from your files or from the scripts in `docs/seo-plan/scripts/`. Anything I assumed is labelled **ASSUMPTION**.

---

## 0. What changed in v4, and what I read

v3 was written with no business facts. v4 uses your company file, the competitor list, the city list and the dealer data. The headline changes:

1. **Gate 0 is mostly closed.** You are an OGRA-licensed marketer/distributor, a reseller and a referral partner, with a network of distributors who deliver. Four items are still open (licence numbers, phone and WhatsApp numbers, physical outlet, a named safety reviewer). See section 2.
2. **The site now has three audiences, not one:** customers who want gas, dealers and distributors who want supply, and businesses that want engineering work. Section 3.
3. **City pages follow supply, not population.** Today the data supports 9 launch-ready cities, 7 more that need verification, and 234 that do not yet have enough partners. Section 7.
4. **There are no Ahrefs or Semrush accounts, so the plan replaces them** with Google Keyword Planner, Search Console, Serper (SERP, People Also Ask, autocomplete) and our own competitor crawler feeding a database. Section 5.
5. **Competitors are crawled into a database** and compared topic by topic. The eight sites you listed hold about 250 crawlable pages in total, so this is a small job. The real competitors will come from the Serper results. Section 5.3.
6. **The service and product scope grew** (engineering, industries, appliances, composite cylinders, dealers). The demand data shows these are lead and trust pages, not traffic pages. Section 6.
7. **Page map: 76 → 134 rows** (131 active, 3 merged). Section 9.
8. **Three of your claims cannot go on the site until proven** ("1000s of distributors", "within an hour", "every city"). Section 2.3.

### 0.1 Read-through receipt

| Input | What it contains | What it told me |
|---|---|---|
| `seo-LeadGEN.md` (1,928 lines) | The master method | One cluster = one URL. Verified facts only. 3+ information-gain items. No doorway pages. Gates before scale. |
| `keywords and search results.md` | Ubersuggest text, a Semrush-style top-10, three Google captures from Islamabad | Price intent dominates. Local results are held by small sites. The supply crisis is live. |
| `ubersuggest lpg.csv` and `lpg (1).csv` | 2,074 rows, 1,702 unique keywords | 681 have volume. 96% of targets have difficulty 20 or below. |
| `company details.md` (973 lines) | 22 service categories, 16 product groups, 15 industry sectors, a knowledge-centre outline (about 100 topics), 12 tool ideas, a launch order, and your answers | See sections 2, 3 and 6. |
| `competiators.md` | 8 domains | Crawled for structure on 26 Oct 2026. Section 5.3. |
| `cities and areas we serve.md` (613 lines) | **A census table of 235 cities** (2023 and 2017 population, province). It lists **no neighbourhoods and does not say which cities you serve.** | Used as the city universe (250 with GB and AJK additions). Areas inside cities have to come from partner data. |
| `LPG_dealers_all_regions.xlsx` | 482 dealers with phone numbers (columns: name, name_for_emails, subtypes, phone, website, address, city, country) | 433 of 452 unique phones already sit in the cleaned master. It adds 16 new records. Section 4. |
| `docs/seo-plan/data/*` | Cleaned Maps data (1,908 raw rows → 663), location master (250 cities), city and keyword tables, Serper query lists, competitor seeds | Not created in this chat. I checked each file before building on it (section 4.1). |

**Keyword hygiene** (unchanged): 272 keywords excluded as foreign or irrelevant, 19 brand-navigation queries left to the brands. 1,099 keywords map to pages: 536 with volume and 563 zero-volume long-tail terms kept for monitoring. 312 have no page (the earlier 314 changed when small-city price pages merged into hubs). Median difficulty of targets is 9. That is a third-party score, but it matches what the live results show.

---

## 1. The honest math on "#1 and 100,000 clicks"

### 1.1 What your data supports

Floor counts each distinct volume once (Ubersuggest merges close variants). Ceiling is the raw sum. Clicks assume position #1 on every query at the CTRs shown (**ASSUMPTION**, already net of AI Overviews and the map pack).

| Pillar | Searches/mo (floor–ceiling) | CTR at #1 | Clicks/mo at #1 |
|---|---:|---:|---:|
| Price | 90,980 – 128,160 | 22% | 20,000 – 28,200 |
| Local ("near me", shops, stations) | 10,050 – 10,790 | 10% | 1,000 – 1,100 |
| Learn | 6,860 – 10,510 | 18% | 1,200 – 1,900 |
| Home (`lpg`, `lpg gas`) | 6,620 – 8,520 | 12% | 800 – 1,000 |
| Cylinders (incl. composite 260) | 6,610 – 11,300 | 28% | 1,900 – 3,200 |
| Appliances (stoves 1,370, geysers and heaters 740) | 2,240 – 3,920 | 22% | 500 – 900 |
| Auto LPG | 1,220 – 1,890 | 20% | 200 – 400 |
| B2B (dealers, plant, bowser) | 600 – 870 | 22% | 130 – 190 |
| City hubs (Locations) | 670 – 750 | 12% | 80 – 90 |
| Safety | 440 – 710 | 22% | 100 – 200 |
| Delivery | 250 – 320 | 25% | 60 – 80 |
| Market / news | 70 – 180 | 25% | 20 – 50 |
| Services, industries, shop, trust, Urdu | not measured yet | – | – |
| **Total** | **126,610 – 177,920** | | **≈ 26,000 – 37,200** |

Output of `03_model.py` on the v4 map. Delivery volume fell and Locations appeared because city keywords moved onto the hubs. The total is unchanged in substance from v3.

### 1.2 What the new data adds to the math

| Source of traffic | Evidence | Result |
|---|---|---|
| **City long tail** | Only 5 of 250 cities have any volume in the exports: Lahore 2,720, Karachi 2,370, Rawalpindi 310, Islamabad 210, Faisalabad 70 (all in `data/city_keyword_demand.csv`). That is 0.02 to 0.21 searches per 1,000 residents per month. About 52 million people live outside Karachi and Lahore. | **ASSUMPTION:** 1,000 – 10,400 city searches a month, so **about 100 – 2,600 clicks.** City pages are lead pages, not the road to 100K. |
| **Engineering terms** | Vaporizer: 145 keywords, 0 volume. Pipeline: 60. Leak detector: 10. Tank, bowser and tanker: 240. Plant: 220. | Real demand is small, or hidden under different wording. Test in Keyword Planner before building. These pages earn trust and high-value leads. |
| **Dealer and distributor terms** | `lpg agency` 170, `lpg agency near me` 70, `lpg distributor near me` 50. Floor about 390. | Worth one page (BZ-004). |
| **Composite cylinders** | Floor 260. A competitor (burhangas.com) ranks. | One page (CY-006). You supply them, so it is a real product page. |

### 1.3 The three levers from v3, plus a fourth

| Lever | Why it could add traffic | Needed to confirm |
|---|---|---|
| **A. Wider keyword universe** | Google's own "People also search for" lists terms missing from the CSVs: *gas cylinder price in pakistan*, *12 kg…*, *13 kg*, *15kg*, *gas cylinder fiber*, *list of LPG distributors in Pakistan*. | Keyword Planner volumes for the 947 seeds in `data/keyword_planner_upload.txt` |
| **B. Urdu and Roman Urdu** | `lpg ka rate`, `lpg ki kimat`, `lpg ka aaj ka rate` already show 30–140 each in an English-biased tool. Urdu-script volume is almost certainly undercounted. | Keyword Planner in Urdu, and the 7 Urdu-script Serper queries |
| **C. Crisis, season, Discover** | Live shortage in the Islamabad captures. Winter is peak demand. | Google Trends (24 months) and Search Console |
| **D. Adjacent energy intents** (new, optional) | cylin.com.pk runs 21 gas-bill-check pages plus load-shedding, winter and Ramzan pages. Those draw a much larger audience than LPG buyers. | Keyword Planner volume for those topics. **Owner decision at Gate X:** more traffic, but it dilutes topical focus and the visitors are not LPG buyers. |

**ASSUMPTION, to be tested:** if the unexported universe is 0.5× to 1.5× the mapped one, saturation reaches about 40–90K clicks a month. 100K is a **stretch goal needing A, B, C and probably D.** The current data cannot promise it.

### 1.4 Staged targets (organic Search and Discover clicks per month, from Search Console)

| Month after launch | Target | Must be true first |
|---|---:|---|
| 1–2 | 100 – 500 | 90%+ of submitted pages indexed; impressions rising weekly |
| 3 | 1,500 | Flagship price page in the top 10 for its head terms; first 10 relevant referring domains |
| 6 | 8,000 | Price pillar at positions 1–5; 15+ leads a week; 5+ city hubs live and delivering |
| 9 | 18,000 | Urdu pillar live; Discover impressions present |
| 12 | 35,000 | About the ceiling of the current data. **Gate X** reviews expansion data |
| 18 | 60,000 | Only if Gate X showed room above 40K |
| 24 | 100,000 | Stretch. Needs the levers delivering |

**"#1" means** position 1 for the head price terms and the cylinder, delivery and "what is" pages. It cannot mean #1 everywhere. OGRA, Reuters and the map pack will keep some positions.

---

## 2. Gate 0: facts, claims and what is still open

### 2.1 Answers received (26 Oct 2026)

| # | Question | Your answer | What it means for the plan |
|---|---|---|---|
| 1 | Business model | OGRA-licensed marketer or distributor, a reseller, and a referral business partner. A network of distributors and suppliers supply customers directly. | Three roles. Every order page must say which one applies (section 3.2). |
| 3 | Cities served | All Pakistan through the network, delivery "within an hour" | Real, but only provable per city. City pages open as each city passes Gate L (section 7.2). |
| 6 | Appliances | Yes. Everything related to LPG, including cylinders and fibre cylinders with gas | Appliance and composite pages are unblocked. They still need real stock, prices and a supplier name. |
| 7 | Urdu writer | Yes | Urdu pillar can start. |
| 8 | Ahrefs or Semrush | No | Replacement stack in section 5.1. |

### 2.2 Still open

| # | Item | Needed by | Why |
|---|---|---|---|
| 2 | **OGRA licence number(s), licence class, validity date, legal name, NTN, registered address** | Before any page that sells or claims to be licensed | Trust page, schema, legal exposure |
| 4 | **Phone and WhatsApp numbers, hours, delivery charges** | Before launch | Facts table. The site never invents these. |
| 5 | **Physical outlet, yard or shop: yes or no** | Before local SEO work | Decides whether a Google Business Profile is allowed (section 17.3) |
| 7b | **A named, qualified safety reviewer** | Before safety pages publish | You have a writer who can write Urdu. A writer is not a safety reviewer. Name, role and credentials must be public. |
| 9 | Budget, team size, who answers leads | Before roadmap dates are fixed | Sets weekly page output and how many cities can open |
| new | **Serper API key** (serper.dev) and a **Google Ads account** (free) for Keyword Planner | Day 1 | Section 5 |
| new | **Search Console and GA4 access** for thelpgco.pk | Before launch | Measurement |

### 2.3 Claims register: nothing below goes live until its evidence exists

| Claim (from your file or message) | Evidence needed | Safe wording until then |
|---|---|---|
| "21 years of experience" | Registration year, a company document, 2–3 supplier or customer references | Leave it out, or "Established {year}" once verified |
| OGRA-licensed marketer/distributor | Licence number, class and validity shown on `/licences-and-compliance/` | "Authorised LPG marketer" only next to the number |
| "We serve every city in Pakistan" | A live partner and a test order in each city | "Delivery in {list of live cities}. Other areas: tell us where you are." |
| "1000s of distributors" | A CRM count with verification status. The Maps data shows **459 operational, phone-listed businesses in 103 cities.** | Show only the verified count from the CRM |
| "Delivery within an hour" | Order logs, with a measured median per city | "Typical delivery in {city}: {X} minutes (last 30 days, {n} orders)." Before data: "Call to confirm delivery time." |
| Engineering (pipelines, tanks, vaporizers, SNG, filling plants) | A named executor (your team or a partner) and at least one real project | Page stays unpublished |
| Composite/fibre cylinders with gas | Supplier, specifications, weights | Publish after specs |
| Company file says "I reviewed Pakistani LPG businesses… Pak Engineering, Imperial Gases" | That is a research note, not your credentials | Never present other companies' work as yours |

### 2.4 Pakistan compliance questions for a lawyer (questions, not advice) *(Step 4)*

OGRA licensing for marketing, distribution, transport and storage, and which activity each of your three roles falls under. Whether a distributor or reseller may advertise a price above OGRA's notified maximum, and how to describe open-market prices in a shortage. Rules on advertising claims such as "within an hour". Consumer-protection duties. Whether and how to publish partner phone numbers. Data-protection duties for phone numbers (check the current status of Pakistan's data-protection law). WhatsApp and call consent. Company and tax registration.

---

## 3. Business model → site model

### 3.1 Three audiences, three funnels

| Audience | Wants | Pages | Conversion |
|---|---|---|---|
| **Customers** (households, shops, restaurants) | Price, a cylinder, delivery, safety | Price, cylinders, city hubs, delivery, order, safety, appliances | Order or WhatsApp in two taps |
| **Dealers, distributors, resellers** | Supply, margin, a licence route | `/become-an-lpg-distributor/`, `/our-network/`, `/industrial-lpg-supply/`, `/bulk-lpg-supply/` | Dealer enquiry form, then a call |
| **Businesses and projects** | Pipelines, tanks, conversions, maintenance, bulk contracts | `/services/…`, `/industries/…`, `/commercial-lpg-supply/` | Quote request |

### 3.2 The three hats, disclosed on every order

| Hat | Customer sees | Who delivers |
|---|---|---|
| Marketer or distributor (own supply) | "Supplied by THE LPG CO." | Own fleet or contracted carrier |
| Reseller | "Supplied through {licensed supplier}" | Supplier |
| Network or referral | "Delivered by an independent partner in {area}. We coordinate." | Partner |

The `/how-it-works/` page explains all three in plain words. The lead record stores which hat applied, so quality and complaints can be traced. If a partner earns a commission from a referral, the page says so.

### 3.3 The partner lifecycle (the supply side of every location page)

`prospect → contacted → verified → agreed → live`

| Stage | What happens | Evidence stored |
|---|---|---|
| prospect | A business from the data (679 now) | Maps record |
| contacted | Called or messaged on WhatsApp | Date, who |
| verified | Confirms area, hours, cylinder types, **where its gas comes from (licensed source)**, and that it still operates | Call note, date, verifier |
| agreed | Accepts our delivery-time and price rules and agrees to be listed | Written WhatsApp consent |
| live | Receives orders; delivery times are measured | Order logs |

A partner appears on the public site only at **agreed**. The directory shows aggregate counts for everyone else. This is deliberate: the data came from a Maps scrape, and publishing a stranger's phone number as "our partner" is a trust and legal risk.

---

## 4. The data foundation

### 4.1 What was checked before I used it

| File | Check | Result |
|---|---|---|
| `lpg_businesses_clean.csv` | Cleaning report reviewed. Rejections reconcile (1,908 raw → 663). | **Kept as the master.** Rejected 1,245: closed permanently 442, petrol pumps with no LPG signal 262, not an LPG type 260, major-brand petrol pumps 110, CNG only 82, not relevant or non-gas companies 71, duplicates 14, other 4. |
| `LPG_dealers_all_regions.xlsx` | 482 rows. After removing 30 duplicate phones, **452 unique.** Compared by phone with the master: **433 overlap.** My first overlap check said 0 because of a data-type bug in my script. I found and fixed it. | **16 genuinely new LPG records added**, flagged `source_file = LPG_dealers_all_regions.xlsx`. Auto-conversion shops (about 104) stay out. |
| `location-master.csv` | 250 cities, with the census table as the base | Kept. Two towns (Sahiwal, Taxila) appear twice in the source and are flagged. |
| `serper_queries.csv` | 520 city queries (30 cities × 8 intents, 70 cities × 4 intents). English only. | Kept. Urdu and national queries added in `serper_queries_national.csv`. |
| `competitor_seeds.csv` | 53 domains, but **3 of your 8 were missing** (flamora.pk, bostanlpg.com, paklpg.com) | Rebuilt as `competitors_v4.csv` with all 8 first |

### 4.2 What the partner data says

| Measure | Value |
|---|---|
| Raw Maps rows → clean | 1,908 → 663 (34.7%) |
| Partner master (clean + 16 from your Excel) | 679 |
| By role (clean) | 352 shops/agencies, 126 filling points, 86 companies/marketers, 87 other, 9 autogas, 3 producers |
| With a phone | 70% (mostly mobile numbers) |
| With a website | 10% (66) |
| Open 24 hours | 140 |
| Average rating | 4.37 (441 rated; 222 listings have no reviews) |
| Share of clean listings in Karachi | 286 of 663 (43%) |
| Cities with at least 1 clean listing | 133 of 250 |
| Cities with at least 3 / 5 / 10 phone-listed partners | 17 / 9 / 5 |
| Cities with zero listings | 185 of 250 |

**What this does and does not show.** It shows where *Google Maps listings* exist. It is probably an undercount of your real network, because you say you have thousands of distributors and many are not on Maps. **Your own distributor list, loaded into the partner CRM, replaces this as the source of truth.** Until then, the plan uses this data conservatively.

Coverage is thin where you say you serve: **Gilgit-Baltistan 4 listings, Azad Kashmir 4, Balochistan 28.** Those regions need partner recruitment and verification before any city page can open.

### 4.3 How the dealer data is used

| Use | Allowed now | Condition |
|---|---|---|
| Internal prospecting and onboarding calls | Yes | Contact for business purposes. Offer opt-out. |
| Demand and supply scoring for cities | Yes | `city_readiness.csv` |
| Aggregate facts on city pages (number of partners, number open 24 hours, filling points) | Yes, after verification | Counts only. No names. |
| Named listings with phone numbers on `/lpg-near-me/` | **Only for partners at "agreed"** | Written consent and a verified-on date |
| Public bulk list of the 679 | **No** | Unverified Maps data, personal mobile numbers, quality and doorway risk |
| Using Google Maps scrapes at scale | Check the data vendor's terms and Google's terms before reuse | Prefer your own CRM going forward |

### 4.4 Files this plan ships (re-runnable)

| File | What it is |
|---|---|
| `page-map.csv` | **134 rows**, v4. New columns: `v4_change` (NEW, MERGED, GATE). |
| `keyword-master.csv` | 1,702 keywords with target page and disposition. Merged pages re-pointed. |
| `data/partners_master.csv` | 679 partners with `verification_status`, `consent_to_list`, `listing_eligible` (all start at unverified, none, no) |
| `data/city_readiness.csv` | 250 cities: partners, 24-hour count, keyword demand, supply tier, v4 decision |
| `data/competitors_v4.csv` | 56 domains: 8 owner-listed, 3 from SERP captures, 45 from Maps websites |
| `data/serper_queries.csv` | 520 city queries |
| `data/serper_queries_national.csv` | 238 queries: page keywords, services, industries, dealers, appliances, Roman Urdu, Urdu script |
| `data/serper_autocomplete_seeds.csv` | 12 seeds to expand a–z and by city |
| `supabase/intel.sql` | Competitor and SERP database (7 tables, row level security on) |
| `scripts/01…13_*.py` | Rebuild everything after new exports |

---

## 5. Search intelligence without Ahrefs or Semrush

### 5.1 The replacement stack

| Need | Tool | What we lose versus Ahrefs/Semrush |
|---|---|---|
| Search volume | **Google Keyword Planner** (free in a Google Ads account). Upload `keyword_planner_upload.txt` in batches. | Ranges (for example 100–1K) unless the account has ad spend. Use ranges only to rank terms, not to forecast. |
| SERP snapshots, People Also Ask, related searches, local pack | **Serper** (`/search`, `/places`, `/autocomplete`) | Nothing important for our use |
| Difficulty | Ubersuggest (already have), plus our own SERP weakness score (section 5.4) | Third-party difficulty is shaky. Our own score is more honest. |
| Competitor pages | **Own crawler** into `intel.pages` (section 5.3) | Nothing. We read the pages directly. |
| Competitor backlinks and traffic | **Not available.** Optional: a one-month paid Ahrefs or Semrush plan at Gate B only. | **This is the real gap.** It is why we cannot rank "easy wins" by link profile. |
| Domain age (new-site check) | RDAP/WHOIS and the Wayback Machine, scripted | Minor |
| Our own site | **Search Console**, Bing Webmaster Tools, GA4. **Ahrefs Webmaster Tools** is free for sites you own and gives site audits and your own backlinks. | None |
| Trends and seasonality | Google Trends | Relative only |

Serper pricing and free credits change. Check the current price before running. The waves below are about 1,450 search queries plus about 670 autocomplete calls in total.

### 5.2 Serper waves

| Wave | Queries | Purpose | When |
|---|---:|---|---|
| **0 National** | 238 | Money pages, services, industries, dealers, appliances, Roman Urdu, 7 Urdu-script queries | Day 1–2 |
| **1 Top cities** | 240 (30 cities × 8 intents) | Price, buy, delivery, refill, dealer, commercial, plus Roman Urdu | Day 2–3 |
| **2 Next cities** | 280 (70 cities × 4 intents) | City pages that might pass Gate L | Week 3, only for cities with 3+ verified partners |
| **C Clustering** | about 680 (every keyword with volume above zero) | Automatic SERP-overlap clustering, replacing the Ahrefs overlap export *(Step 8.2)* | Day 3–5 |
| **Autocomplete** | 12 seeds × (26 letters + 30 cities) | Demand proxy for cities with no volume data, and new keyword ideas | Day 3–5 |

Wave 3 (150 smaller cities) is deliberately not planned. Nothing in the data justifies it yet.

Every response is stored raw in `intel.serp_snapshots` (so it can be re-parsed) and parsed into `intel.serp_results`. Re-run the top 100 queries weekly for rank tracking.

**Automatic clustering (replaces the manual SERP-overlap export).** For two keywords, take the top 10 organic URLs for each and compute the share they have in common (Jaccard). Rule from *Step 8.2*: **70% or more → one page; 40–69% → read by hand; under 40% → separate pages.** The PR-001 / PR-002 / PR-003 / CY-002 tests in section 10.4 run from this table, not by eye.

### 5.3 The competitor crawler and database

**What I found on 26 Oct 2026 (sitemaps, robots.txt and homepages only, one request each):**

| Domain | What it is | Pages found | Notes |
|---|---|---:|---|
| cylin.com.pk | Platform with tools and Urdu | 144 (81 English, 63 `/ur`) | **The strongest site in your list.** 21 tool URLs (price by city, refill, runtime, safety check), 21 bill-check URLs, 9 coverage URLs (a hub and 8 cities), size guide, load-shedding, winter, Ramzan, careers, docs. JavaScript-rendered. |
| ppgl.com.pk | PARCO Pearl Gas brand | 129 | Mostly WordPress listing and blog items |
| noorlpg.com | Brand with distributors | about 45 (no sitemap) | Services, product categories, composite cylinder, auto gas, find distributors, distributor application, blogs |
| gasonline.pk | Marketplace | about 15 | Numeric product-category URLs |
| flamora.pk | App-like supplier | 6 | JavaScript-rendered |
| paklpg.com | Small WordPress | 7 | Thin |
| friends-gas.pk | Local agency (Rawalpindi/Islamabad) | 1 long page + 13 testimonials | Single rich page of about 216 KB |
| bostanlpg.com | Local agency (Islamabad) | 1 | Single page |

All eight allow crawling of content paths in `robots.txt` (they disallow only admin or API paths). **Together they hold about 250 pages, so crawling them takes minutes.** The point is not size. It is that `cylin.com.pk` is the only one doing what we plan to do (price tools, Urdu, city coverage), and that **the sites that rank for your money queries are different from this list** (price trackers, news, OGRA, directories). The Serper results find those.

**Crawler design:**

| Item | Rule |
|---|---|
| Seed domains | Priority 1: the 8 above. Priority 2: domains seen in wave 0–1 top 10s (expect 40–80). Priority 3: the 45 websites from Maps listings, to see who is a real LPG business. |
| Discovery | `sitemap.xml` first, then `robots.txt` sitemaps, then internal link crawl. Cap 300 pages per domain. |
| Fetching | Plain HTTP with an identifying user agent. **Playwright only** for JavaScript-rendered sites (cylin.com.pk, flamora.pk). 1 request every 2 seconds per domain. Respect `robots.txt` and stop on repeated 403 or 429. |
| Extract | Title, meta, canonical, H1–H3 outline, word count, body text, schema types, internal and external links, image count, price present, phone present, form present, dates |
| Store | `intel.pages` (see `supabase/intel.sql`). Re-crawl monthly. A changed `text_hash` raises an alert. |
| **Use** | **Analysis only.** The text is never republished or lightly reworded. We learn *what topics and facts* a page covers, then write our own from verified facts. |
| Classify | Each page gets a type: home, service, product, city, blog, tool, directory, legal, other |

**The coverage matrix (what "cover everything competitors have" means in practice).** Each competitor page is mapped to a topic. Each topic is checked against `page-map.csv`:

| Status | Meaning | Action |
|---|---|---|
| covered | We have or plan a page | Compare depth. Make ours better. |
| open | A competitor has it and we do not | Pass the page-map gates, then add |
| skip_thin | The competitor page is thin or template filler | Do not copy. Check whether it ranks. |
| skip_irrelevant | Careers, login, docs | Ignore |

Coverage is a **floor, not a goal.** Matching a competitor's thin page loses to a better page. The goal is to be more useful on every topic that passes our gates.

### 5.4 SERP weakness and city opportunity score

Used for city pages and any page where we have no volume data. **ASSUMPTION: the weights are a starting point and are tuned after wave 1.**

| Part | Points | How it is measured from Serper and the crawl |
|---|---:|---|
| **Demand** | 0–40 | Keyword Planner bucket if available. Otherwise: autocomplete present (10), city population tier (T1 20, T2 15, T3 10, T4 5), any Ubersuggest volume (10). |
| **SERP weakness** | 0–30 | Count the top 10: dedicated city pages from LPG sellers (strong, −3 each), directories and listicles (weak, +2), off-topic (+2), marketplace listing pages (+1). Add +5 if no local dealer site has its own page for that city. Add +3 if the best page is over 12 months old. |
| **Supply** | 0–30 | 0 partners 0, 1–2 → 8, 3–4 → 16, 5+ verified → 24, plus 6 if a delivery test passed |

| Score | Decision |
|---|---|
| 70+ | Build now |
| 50–69 | Queue |
| below 50 | Section on the province hub |

Supply is capped so that **a city with no partners can never score above 70.** That keeps the rule "no page without fulfilment" intact.

---

## 6. Scope: what the company file adds, and what the data says about each part

The company file lists 22 service divisions, 16 product groups, 15 industry sectors, a knowledge centre of about 100 topics and 12 tools. I did not add one page per bullet. The file itself says "each bullet does not need a separate indexed page." Here is how it maps.

| Company-file area | Plan decision | Demand evidence | Phase |
|---|---|---|---|
| **A. Supply** (residential, commercial, industrial, bulk, wholesale, cylinders) | Existing delivery pages plus **DL-009 industrial supply**. Wholesale folds into the dealer page BZ-004. | Delivery floor about 200 and price floor about 91K. The money is in conversion, not volume. | P1–P2 |
| **B. Engineering** (pipelines, tanks, manifolds, vaporizers, SNG, conversions, filling plants) | **9 service pages** under `/services/`, plus vaporizer (AP-004), plant (BZ-002), bowser (BZ-003) kept where they are | Near zero in the exports (vaporizer 0, pipeline 60, tank and bowser 240, plant 220) | P3–P4, gated |
| **C. Operations, safety, maintenance** | Maintenance and AMC, safety audit, cylinder testing pages. Leak detector (SF-006) stays a product page. | Tiny | P3 |
| **D. Specialised** (autogas, agriculture, events) | Autogas stays P4 (AU-001/002). Poultry and events become industry pages. | Auto LPG floor 1,050 | P3–P4 |
| **Products** (16 groups) | `/shop/` hub plus existing stove, geyser, heater, regulator pages. Add hoses/accessories and commercial burners only. | Stoves 1,370, geysers and heaters 740, regulators 390 | P2–P4 |
| **Industries** (15 sectors) | **1 hub + 9 industry pages** (small sectors are grouped) | No volume data | P3–P4, gated |
| **Knowledge centre** (about 100 topics) | Map to existing ED/SF pages. **5 new** guide pages (propane vs butane, how LPG is produced, OGRA rules, how to choose a licensed supplier, marketing company vs distributor). The rest become sections. | "What is LPG" family: about 5,300 | P2–P3 |
| **Tools** (12 ideas) | 7 tools in the map (cost, duration, litre-to-kg, vs Sui gas, vs diesel, tank size, BTU/kWh). The duration and consumption calculators merge into one. | Not measured. cylin.com.pk shows tools can rank. | P2–P4 |
| **Multilingual** | 15 Urdu pages in the map | Roman Urdu terms already 30–140 each | P2–P3 |

**Why engineering pages are gated and not just built.** Without volume data, their value is trust and high-value leads, and a hollow page with no real project hurts both. Each page needs a named executor and one real project. Your company file calls this out itself: "Don't create unsupported project statistics or customer testimonials."

---

## 7. Location pages: the system

### 7.1 Structure: one hub per city

For most cities there is **one page: `/lpg-in-{city}/`**. It carries price, delivery, dealers and areas. v3 had separate price, delivery and "LPG in" pages for the same city. Those three would compete for one cluster, so v4 merges them.

| Page | URL | When |
|---|---|---|
| City hub | `/lpg-in-{city}/` | The city passes Gate L (section 7.2) |
| City price page | `/lpg-price-in-pakistan/{city}/` | **Only Karachi and Lahore** (price intent 2,340 and 2,700 a month), and only if the Serper overlap test against the hub is under 70% |
| Area page | `/lpg-in-{city}/{area}/` | Only in T1 cities, only where Serper or autocomplete shows area-level searches **and** 3+ verified partners work in that area. Maximum 10 per city at first. |
| Province hub | `/lpg-in-{province}/` (6 pages) | Always. It lists every city in the province with its status. It is also where cities that fail Gate L live. |
| Delivery areas | `/delivery-areas/` | Always. Index of cities: Live or On request. |

Doorway pages break Google's rules *(Appendix A)*. **No city page is created from a template.**

### 7.2 Gate L: the location gate

A city hub goes live only when all of these are true. Failing cities stay as a section on the province hub.

| # | Condition | Evidence |
|---|---|---|
| L1 | **3 or more partners verified by call**, with area, hours, cylinder types and a licensed source confirmed | `partners` table |
| L2 | **One real test order delivered**, with measured time | Order log |
| L3 | **5 or more verified local facts** (*Step 13.3*) | Facts table |
| L4 | Serper shows a gap, or demand is high enough that being the best page still pays | Score 50+ (section 5.4) |
| L5 | The city is not a near-duplicate of a neighbouring city page | Similarity under 0.8 and a different SERP (overlap under 70%) |
| L6 | Delivery claims are limited to measured data | Section 2.3 |

### 7.3 What goes on a city page (sections appear only when data exists)

| Section | Data source | Information-gain item |
|---|---|---|
| Answer box: the price in this city | OGRA row, plus our delivery charge | Per-city price with delivery charge |
| Order box | Form with city and size | – |
| **Measured delivery time** | Our order logs (last 30 days, n orders) | **Own data** |
| **Areas covered** | Localities from verified partners | **Verified area list** |
| **Partner counts** | CRM: verified partners, open 24 hours, filling points, average rating | **Own data** |
| Price table by size (5, 11.8, 15, 45.4 kg and composite) | Same price rows as PR-001 | – |
| What is different here (cold-weather demand, supply notes) | Verified only | Local context |
| Local questions | People Also Ask captured by Serper for that city | Questions real people ask |
| Emergency numbers | Called and confirmed | Safety value |
| Nearby cities and the province hub | Page map | Internal links |
| Named partner list | **Only partners at "agreed"** | – |

A page needs **3+ information-gain items and 5+ verified facts** before it publishes. If a section has no data, it is omitted. We never fill it with filler.

### 7.4 The process per city, from Serper to published page

1. Run the Serper queries for the city (wave 1 or 2).
2. Classify each of the top 10 results by type: brand, local dealer, directory, marketplace, news, government, social.
3. Crawl the top 3 pages per intent. Record word count, whether the page is genuinely city-specific, which facts it carries (prices, areas, phone, hours), and its age. Compare with other cities on the same site to spot template pages.
4. Write the **gap list**: facts and sections competitors lack.
5. Pull our verified facts: partner count, areas, 24-hour count, measured times.
6. Build the page from the template. Omit empty sections.
7. **Uniqueness check:** at least 60% of body words must be specific to that city after removing the template; similarity to every sibling city page under 0.8 *(Step 13.4, prompt P12)*.
8. Publish, link from the province hub and 2–4 nearby city pages, add to the sitemap, log it.

### 7.5 Launch order today (from `city_readiness.csv`)

| Tier | Cities (phone-listed partners) | Plan |
|---|---|---|
| **A: launch candidates** (9) | Karachi 180 · Islamabad 70 · Lahore 30 · Peshawar 20 · Quetta 11 · Faisalabad 8 · Rawalpindi 8 · Hyderabad 7 · Multan 5 | Verify 3+ partners each by call, run a test order, then open. **Wave 1: Karachi, Lahore, Islamabad, Rawalpindi.** Wave 2: Peshawar, Quetta, Faisalabad, Hyderabad, Multan. |
| **B: verify first** (7) | Gujranwala 4 · Burewala 4 · Gojra 4 · Mansehra 3 · Gujrat 3 · Batkhela 3 · Mardan 3 | Province hub section until verified |
| **Watch** (34) | Gilgit 2, Rawalakot, Astore, Zhob, Loralai, Pishin, Kohat, Abbottabad, Swabi, Muzaffarabad, Umerkot, Gwadar, Haripur (1 each); Skardu, Chilas, Hunza, Ghizer, Ghanche, Bagh, Kotli, Mirpur, Murree, Chitral, Mingora, Turbat, Khuzdar, Ziarat, Chaman and others (0) | **These are the regions you want to serve (GB, AJK, Balochistan, northern KP) with the least evidence.** Recruit and verify partners first. Winter demand makes these strategic. |
| **No page** (about 200) | All other cities | Listed on province hubs. Revisit if Search Console shows demand. |

---

## 8. Strategy

**Thesis: own the price truth, supply it through a verified network, and prove it city by city.**

1. **Be the best place for the LPG price in Pakistan.** One flagship page, a monthly dataset, a calculator, and a clear split between official and market prices.
2. **Turn price-checkers into orders** through city hubs where delivery is proven.
3. **Build topical authority** across cylinders, delivery, safety, supply news and "what is LPG".
4. **Win the crisis now and be there at the next one.** Dated, sourced shortage tracker in week 1.
5. **Use the network as an asset.** Verified partner counts and measured delivery times per city are data nobody else publishes.
6. **Add Urdu early.**
7. **Never publish what cannot be fulfilled or verified.**

**Fast lane.** It is late October, winter demand is rising and the shortage is in the news. Ship the flagship price page, the shortage tracker and "what is LPG" in **weeks 1–2** with a minimal template.

---

## 9. The topical map and page inventory *(Steps 8.6, 9, 11)*

```
PRICE        /lpg-price-in-pakistan/ (flagship)        76–112K searches
  ├ /lpg-price-per-kg-in-pakistan/ · /ogra-lpg-notified-price/ · /lpg-price-in-pakistan/{karachi,lahore}/
  ├ /lpg-price-in-pakistan/history/ · /{month-year}/ archive · /tools/lpg-cylinder-price-calculator/
CYLINDERS    /lpg-cylinders/ → price, sizes, 12 kg, 45 kg, 5 kg, composite/fibre, refill, new connection
LOCATIONS    /lpg-in-{city}/ (hubs, gated) · /lpg-in-{province}/ (6) · /delivery-areas/
DELIVERY     /lpg-home-delivery/ · /commercial-lpg-supply/ · /industrial-lpg-supply/ · /bulk-lpg-supply/ · /order-lpg/
NETWORK      /become-an-lpg-distributor/ · /our-network/ · /how-it-works/
LOCAL        /lpg-near-me/ · /lpg-shops-and-agencies/ · /lpg-filling-stations/ · /lpg-companies-in-pakistan/
MARKET       /lpg-shortage-pakistan/ · /lpg-supply-in-pakistan/ · /why-lpg-prices-change-in-pakistan/
LEARN        /what-is-lpg/ · composition · vs LNG · vs CNG · vs Sui gas · propane vs butane · OGRA rules · how to choose a licensed supplier · tools
SAFETY       /lpg-safety/ · /what-to-do-if-you-smell-gas/ · blast prevention · regulators · leak detector
APPLIANCES   stove · geyser · heater · vaporizers   (now unblocked: you sell them)
SERVICES     /services/ → pipeline · storage tank · manifold and cylinder bank · LPG-air/SNG · boiler conversion · safety audit · maintenance/AMC · cylinder testing   (gated)
INDUSTRIES   /industries/ → restaurants · hotels · textile · food processing · poultry · hospitals · housing societies · manufacturing · weddings and events   (gated)
SHOP         /shop/ · hoses and accessories · commercial burners
AUTO / B2B   auto LPG · kit price · plant · bowser · business   (gated)
TRUST        /about/ · /contact/ · /licences-and-compliance/ · /editorial-policy/ · /pricing-policy/ · /projects/ · /privacy/ · /terms/ · /complaints/
URDU         /ur/ mirror of 15 pages, hreflang en-PK ↔ ur-PK
```

No `/lpg/` parent folder: the whole site is about LPG *(Step 11.5.2)*. Maximum URL depth is 3. Your company file suggested `/lpg-supply/` as a hub. I did not use it: "lpg supply" is currently a **news** query (NW-002), so that URL would clash.

### 9.1 Counts

| Phase | Window | Pages | What ships |
|---|---|---:|---|
| **P1 launch** | Weeks 1–4 | **32** (22 content and conversion, 10 trust) | Price flagship, per-kg, OGRA, Karachi and Lahore price; cylinders hub, price, sizes; delivery hub, 4 city hubs (Islamabad, Rawalpindi, Lahore, Karachi), order; shortage, supply; what is LPG; safety, gas-smell; geyser and heater pages |
| **P2** | Weeks 5–12 | 41 (40 content, 1 trust) | Peshawar, Quetta, Faisalabad, Multan, Gujranwala, Hyderabad hubs, province hubs, history, calculator, sizes, refill, new connection, composite, industrial and commercial supply, directories, comparisons, OGRA rules, how to choose a supplier, dealer page, stoves, first 5 Urdu pages |
| **P3** | Months 4–6 | 44 | Gated: services, industries, regulators, leak detector, tools, more Urdu, cold-region hubs when partners exist |
| **P4** | Months 7–12 | 14 | Auto LPG, plant, bowser, SNG, boiler, textile and hospital pages, advanced tools |
| **Merged** | – | 3 | PR-006, PR-007, PR-008 (small-city price pages) folded into hubs |

131 active pages plus city expansions that clear Gate L. **No hundreds of city or area pages.**

### 9.2 Pages with no page of their own

| Queries | Decision | Reason |
|---|---|---|
| lpg uses (about 70), stand for, full form, meaning (about 5,300) | Inside `/what-is-lpg/` | Same intent |
| Brand queries (ssgc 590, pso 390, noor 390…) | No page | The brands win these |
| lpg bill check, lpg bill | No page unless Search Console shows demand | Probably Sui bills (but see lever D) |
| Price pages for Islamabad, Rawalpindi and Faisalabad (210, 50, 70) | Merged into hubs | Volume too small, same cluster as the hub |
| Wholesale supply | Section of BZ-004 | Same audience as the dealer page |
| Vaporizers, plants, leak detectors from the company file | Existing pages (AP-004, BZ-002, SF-006) | One cluster, one URL |
| jobs, foreign (India, Nepal…), `lpg to gas` | Excluded | Not our market, or ambiguous |

---

## 10. Page launch rules

### 10.1 Gates that stop a page going live *(Golden rules 1–4, Step 22.3)*

| Page group | Gate |
|---|---|
| City hubs | **Gate L** (section 7.2) |
| Price pages | A verified OGRA row. City price pages also need the overlap test. |
| Directories (`/lpg-near-me/` and similar) | 5+ partners at "agreed" per city. Names and phones only with consent. |
| Appliances and shop | Real stock, prices and a named supplier in the facts table |
| Composite cylinders | Supplier, specs, weights |
| Services and industries | Named executor, one real project, consumption figures from real accounts |
| Auto LPG | Legal status and OGRA rules confirmed |
| Safety | Named, qualified reviewer, review date |
| Any claim | A row in the facts table or the claims register (section 2.3) |

### 10.2 Launch set (P1) keyword sets

| Page | URL | Primary keyword (volume) | Mapped | Searches floor–ceiling |
|---|---|---|---:|---:|
| PR-001 | `/lpg-price-in-pakistan/` | lpg rate in pakistan (22,200) | 54 / 72 | 76,310 – 111,850 |
| PR-002 | `/lpg-price-per-kg-in-pakistan/` | lpg 1kg price today pakistan (2,400) | 19 / 23 | 7,990 – 8,940 |
| PR-003 | `/ogra-lpg-notified-price/` | ogra lpg price (1,000) | 10 / 14 | 1,640 – 1,670 |
| PR-004 / 005 | Karachi / Lahore price | lpg price karachi / lahore (720) | 14 / 10 | 2,340 / 2,700 |
| CY-002 | `/lpg-cylinder-price-in-pakistan/` | price of lpg cylinder in pakistan (1,600) | 21 / 34 | 5,850 – 10,330 |
| DL-002 / 003 | Islamabad, Rawalpindi hubs | lpg gas rawalpindi (260) | 4 / 16 and 2 / 5 | 210 – 280 and 310 |
| DL-004 / 005 | Lahore, Karachi hubs | – | 3 / 6 and 0 / 3 | 30 and 0. Their price searches sit on PR-005 and PR-004. |
| ED-001 | `/what-is-lpg/` | lpg stand for (1,900) | 23 / 50 | 5,320 – 8,370 |
| HP-001 | `/` | lpg (4,400, tentative) | 5 / 5 | 6,620 – 8,520 |

"Mapped" shows keywords with volume / all mapped keywords.

Delivery, safety, supply and trust pages carry little reported volume. They are in P1 because they carry **revenue, safety or trust.** Full list in `page-map.csv`.

### 10.3 Click-through reality

Page-level volume counts the same search on several pages when keywords overlap. Use `page-map.csv` per-page floors for planning, not their sum.

### 10.4 Overlap tests that must pass before publishing *(Steps 8.2, 8.4)*

Run automatically from `intel.serp_results` (Jaccard of top-10 URLs). **70% or more → merge; 40–69% → read the SERPs by hand; under 40% → keep separate.**

| Pages | Query pair |
|---|---|
| PR-001 vs PR-002 vs PR-003 | `lpg rate in pakistan` · `lpg 1kg price today pakistan` · `ogra lpg price` |
| PR-001 vs CY-002 | `lpg rate in pakistan` · `lpg cylinder price in pakistan` |
| **City hub vs city price page (Karachi, Lahore)** | `lpg price karachi` vs `lpg gas karachi`, and the same for Lahore |
| NM-001 / 002 / 003 | `lpg near me` · `lpg shop near me` · `lpg station near me` |
| HP-001 vs ED-001 | `lpg` · `lpg gas` |
| Services, industries, new guides | Each primary vs the nearest existing page |

---

## 11. Page templates and content blueprints *(Steps 12, 13)*

### 11.1 Voice and format

- Pakistani business English (British spelling). Plain words, short sentences.
- **Rs 3,296** with commas. Dates as **26 October 2026**. Weights in kg. Always state the notification month beside a price.
- Answer the question in the first two sentences of the page and of each section.
- Service pages use "we". Guides use the third person.
- **Never write:** competitor names on our pages, unverified prices, invented reviews or counts, fake urgency, "cheapest" or "fastest" without proof, any price above the OGRA maximum shown as the official price, claims from the claims register that are not yet verified.
- Every price page shows "Source: OGRA notification dated …, checked on …". More than 35 days past its last verification, the page shows a stale banner automatically.
- **Urdu pages:** written by your Urdu writer, not machine-translated. Safety content in Urdu is reviewed by the named safety reviewer.

### 11.2 Blueprint by page type

| Type | Sections | Minimum information gain (3+) |
|---|---|---|
| **Price flagship** | Answer box · per kg and by size · change since last month · OGRA vs reported market price (labelled, sourced) · city links · calculator · 12-month chart and CSV · how the price is set · next notification · order CTA · FAQ · sources | Own month-on-month calculation · dataset download · notified vs market comparison · per-size calculator |
| **City hub** | Section 7.3 | Measured delivery time · verified area list · partner counts · local PAA |
| **Cylinder size page** | Use · weight and gas content · price by month · deposit and refill rules · safety · where to get it | Price history for the size · real photo with markings · how long it lasts |
| **Composite/fibre** | What it is · weights and specs · price · who it suits · safety and approvals · how to order | Real specs and photos · weight comparison with steel · price history |
| **Directory** | Search by city and area · agreed partners with hours · how we verify · report errors | Verified partners with date |
| **Service (gated)** | What it is · who needs it · our scope · process (survey, quote, install, test, handover) · standards and approvals · **a real project** · cost factors · FAQ · quote form | Real project, real photos, process we actually follow |
| **Industry (gated)** | Typical LPG uses in this sector · demand factors · supply and system options · a real customer or partner job · quote form | Consumption figures from real accounts |
| **Dealer / network** | Why join · what we supply · how verification works · requirements · application form | Real terms and process |
| **News tracker** | Status box with last update · dated, sourced timeline · price table before and after · FAQ | Dated source-linked timeline |
| **Guide** | Direct answer · definition · comparison table · Pakistan context · link to the money page | Pakistan numbers and rules · original diagram |
| **Safety** | Steps first, then why · sources · named reviewer and date | Reviewed by a named person · English and Urdu · printable checklist |
| **Tool** | Inputs · result · formulas shown · related pages | The tool itself. States it is an estimate, not an engineering design. |
| **Trust** | Real names, numbers and licences | – |

### 11.3 Starter briefs

Each brief is completed in the `PAGE_BRIEF` form *(Step 12)* before writing.

**PR-001 flagship.** Primary "lpg rate in pakistan" with 50+ mapped variants. Title `LPG Rate in Pakistan {Mon YYYY}: Price per kg & Cylinder` (54 characters). Opening: "The OGRA-notified LPG price for {month year} is Rs {X} per kg, which makes an 11.8 kg cylinder Rs {Y}." Only with confirmed figures. Must not claim a market price without a dated source, or a delivery guarantee at the notified price. `Dataset` schema, `Article` with a named author, ISR with revalidation when a notification is saved.

**City hub (example Karachi).** Title pattern `LPG Gas in Karachi: Cylinder Price, Delivery, Dealers` (52 characters). First two sentences: the price per 11.8 kg cylinder in Karachi and how quickly we deliver (measured). Facts required: OGRA row, delivery charge, measured median time, area list, partner counts. Must not claim "within an hour" without logs.

**CY-006 composite/fibre cylinder.** Supplier, specs, tare and net weight, price, valve type, approvals, delivery lead time. Burhan Gas quotes 2–3 days in the capture, so a faster verified lead time is real information gain.

**NW-001 shortage tracker.** Status box with last update. Dated entries each with a source link. Names and numbers only from Reuters, Business Recorder, OGRA and official notices. Updated daily during the crisis.

**BZ-004 dealer page.** What we supply, what a dealer must have (licence, storage, vehicle), how verification works, terms. The form routes to the dealer pipeline, not the customer one.

**SF-002 gas-smell page.** Steps in English and Urdu, reviewed by the named reviewer, emergency numbers only after they are called and confirmed per city.

Titles and meta tags for 10 P1 pages are in `meta-tags-p1.csv` (titles 50–60 characters, meta 140–156).

### 11.4 The verified-facts table comes first *(Step 12)*

Every brief carries a table of **fact · value · source · verifier · date.** Writers and AI drafts use only those rows. Anything else is written as `[NEEDS FACT: …]`.

| Fact | Source | Owner |
|---|---|---|
| OGRA notified price per kg, per 11.8 kg, per 45.4 kg, by region, with dates | OGRA notification (link and PDF copy) | Data editor |
| Previous 24 months of notified prices | OGRA archive | Data editor |
| Licence numbers, legal name, NTN, address | Documents | Owner |
| Phone, WhatsApp, hours, delivery charges | Owner | Operations |
| Per city: verified partners, areas, hours, measured delivery time | CRM and order logs | Operations |
| Composite cylinder specs and supplier | Supplier documents | Operations |
| Appliance stock, prices, suppliers | Supplier lists | Operations |
| Established year and references | Company documents | Owner |
| Border closure, supply impact, price reports | Reuters, Business Recorder, OGRA (linked) | News editor |
| Emergency numbers by city | Called and confirmed | Safety reviewer |

---

## 12. Content production system *(Steps 12–13, 27)*

| Role | Does |
|---|---|
| Editor-in-chief | Owns the page map and publish decisions |
| Data editor | Monthly OGRA update, dataset, calculators |
| Writers (English, Urdu) | Drafts from briefs and the facts table |
| **Safety and technical reviewer (named, to be appointed)** | Signs safety, regulatory and engineering pages |
| Operations lead | Partner verification, order logs, facts |
| Developer | Template, data pipeline, schema |
| Outreach lead | Links and PR |

**Workflow per page:** confirm it is in `page-map.csv` and its gate passed · read the live SERP for that city and tear down 3 competing pages from `intel.pages` · fill the brief and facts table · draft from facts only (paste guardrail block G first) · add 3 information-gain items · fact-check every claim (P11) and sibling-similarity check (P12) · titles, meta, headings · reviewer sign-off · publish, link from 2–5 pages, log.

**Prompts by task** (from the master reference): keywords K1, K3, K2, K6 · clustering P7, K7 · teardown P8, K4, K5 · brief P9 · draft P10, P11, P12 · on-page O2–O4, P13 · writing W1, W2, W4, W5 · links P14, P15 · diagnosis P16, O5 · technical T1–T3.

**Quality gate:** a page does not publish unless it answers its question early, has 3+ information-gain items, every claim is in the facts table, it has been read on a phone, title/meta/canonical/schema are valid, it has links in and out, it is in the sitemap, conversion and tracking are tested, and a review date is set.

---

## 13. The data engine *(Steps 15.1, 22.1, 27)*

**Tables (Supabase, alongside the existing leads table):**

| Table | Fields |
|---|---|
| `price_notifications`, `price_rows` | Month, dates, source, PDF, price per kg, size prices, change |
| `market_reports` | City, size, price, date, source type, verifier, status |
| `cities` | Slug, province, tier, partners verified, gate L status, delivery median |
| **`partners`** | Loaded from `partners_master.csv`, then the real distributor list: name, city, locality, phone, role, `verification_status`, `consent_to_list`, source of gas, hours, 24h flag, verified on and by, notes |
| **`orders`** | Lead id, city, size, hat (own / reseller / referral), partner id, created, delivered, minutes, status. **This produces the delivery-time claims.** |
| `locality_facts` | City, area, verified fact, source, date |
| `pages` | Page id, type, url, gate status, last verified, owner |
| `leads` | Existing, plus `page_id`, consent text version, source, hat, partner, first contact time |
| **`intel.*`** | Competitor and SERP tables from `supabase/intel.sql` |

**Monthly price SOP:** enter OGRA rows within hours, attach the PDF, second person verifies · publish (every price page reads the same rows) · freeze last month into an archive page with commentary · update `dateModified`, sitemap `lastmod`, IndexNow · send alerts · log. The stale banner switches on after 35 days.

**Partner verification SOP (new):** weekly call batch for the next city in the launch order · fill the verification checklist · record consent by WhatsApp · load into `partners` · run the test order · measure.

**Market Price Pulse (Phase 3):** reported market prices per city from news, dealers and reader submissions, each with source, date and method. Ships only when the verification process works.

---

## 14. On-page, schema and technical *(Steps 13.7, 15.2–15.9)*

### 14.1 The current scaffold needs to change

`lpg-website/` was generated as a UAE starter (placeholder name "GasLine LPG", 8 UAE cities, `/services/[slug]`, `/cities/[slug]`). Changes for v4:

| Change | Detail |
|---|---|
| Rebrand and localise | THE LPG CO. Pakistan, thelpgco.pk, `en-PK`, PKR, Asia/Karachi, Pakistan phone formats. Remove UAE content. |
| URL structure | The tree in section 9. Replace `/cities` and `/services/[slug]` with the new structure. 301 any URL that changes. |
| Data-driven pages | Pages render from tables. ISR with on-demand revalidation. |
| **City hub template** | Sections render only when data exists (section 7.3). Pages are blocked at build time unless Gate L fields are set. |
| **Page-gate enforcement** | `pages.gate_status` controls `noindex`, sitemap inclusion and the "On request" state on `/delivery-areas/` |
| **Partner and dealer forms** | Separate forms and routing for customers, dealers and project quotes. Lead stores the hat and partner. |
| Sitemaps | Index split by type (pages, tools, archive, news, Urdu). Canonical 200 URLs only. |
| Urdu | `/ur/` tree, `hreflang` en-PK ↔ ur-PK with self references, RTL layout, subset Urdu web font |
| Performance | Mid-range Android on 4G: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 on throttled mobile |
| Conversion | WhatsApp click-to-chat, tap-to-call, stored consent, honeypot, rate limit (partly built) |
| Analytics | Search Console, Bing Webmaster Tools, GA4 events: `generate_lead`, `whatsapp_click`, `phone_click`, `dealer_enquiry`, `price_alert_subscribe`, `tool_use` |
| Hosting | CDN, HTTPS, uptime monitoring, backups |

### 14.2 Schema

| Page | Types |
|---|---|
| Every page | `Organization`, `BreadcrumbList` |
| Price history | `Dataset` with the CSV as a distribution |
| Guides and news | `Article` with named author and reviewer |
| Service and delivery pages | `Service`. `LocalBusiness` **only** with a real premises or registered service area. |
| Tools | `WebApplication` is optional. The tool must work. |
| Reviews | Never mark up reviews that are not genuine and visible |

### 14.3 On-page rules

Titles 50–60 characters, primary phrase first, brand last · meta 140–160 · one H1 · H2s that state what each section answers · descriptive alt text · self-referencing canonical · no stuffing.

---

## 15. Conversion and lead operations *(Steps 14, 20)*

**Funnel:** price or guide page → size picker → city → order or WhatsApp → confirmation call → delivery → follow-up → re-order reminder.

| Element | Standard |
|---|---|
| CTA | Above the fold on commercial pages. WhatsApp and call on mobile. |
| Form | City, size, name, phone. Four fields. |
| Consent | Clear text: who will call and why. Stored with version and time. No pre-ticked box. |
| Price honesty | Show the OGRA-based price and the delivery charge separately |
| No fake urgency | No counters, "only 3 left" or "23 orders today" |
| **Routing** | Customer leads go to the live partner for that city. Dealer and project leads go to separate queues. |
| **Speed to lead** | Confirmation call within a target window (**ASSUMPTION:** 10 minutes in business hours), tracked |
| **Partner SLA** | Each partner agrees a delivery-time target and a price list. Missed targets are logged per partner. |
| Weekly test | One synthetic test lead a week, followed through to delivery |
| Re-order | Ask permission for a refill reminder |

**Because three roles share one site,** `/how-it-works/` and every order confirmation state which role applies *(section 3.2)*. If a referral commission applies, say so.

**Owned audience:** a price-alert signup (WhatsApp channel, email) on every price page.

**Illustrative economics (ASSUMPTION):** 10,000 monthly clicks to commercial and price pages × 1.5% request rate = 150 requests; 70% valid is about 105 orders. Replace with your numbers after month 1.

---

## 16. Internal linking *(Steps 17, 17.1)*

- **Funnel spine:** Price → Cylinder price → City hub → Order.
- **Hub and spoke:** each pillar links to every child; each child links back and to 2–4 siblings.
- **Province hubs → city hubs → area pages**, and nearby-city links between hubs.
- Guides and safety link to the relevant delivery or price page in the body. News links to the flagship.
- Every new page gets links from 2–5 existing pages on the day it goes live.
- Descriptive anchors ("LPG price in Lahore"), never "click here". Short footer, no giant city lists. Breadcrumbs with markup.
- Monthly orphan crawl.

---

## 17. Authority and visibility *(Steps 18, 19)*

### 17.1 Link-earning assets (only what we can produce)

| Asset | Who would cite it |
|---|---|
| Pakistan LPG Price Tracker: monthly dataset, chart, CSV | Business and energy journalists, economists |
| **LPG Network Coverage Report:** verified partners and measured delivery time by city | Journalists, local news, consumer groups |
| Cylinder cost and LPG vs Sui gas calculators | Personal-finance writers, forums |
| Reviewed safety checklist (English and Urdu) | Schools, mosques, local government |
| Who supplies Pakistan's LPG | Journalists, students |
| Neutral directory of licensed LPG marketers | Trade sites |

### 17.2 Plan

Month 1: publish the tracker with a methodology page and pitch business journalists. Set up a WhatsApp channel, YouTube channel and Facebook page under the exact brand name. Months 2–3: expert comments, a reviewed safety explainer, genuine business-directory listings (real name, address, phone). Months 3–6: a data story from the first three months of data. **Never:** bought links, private blog networks, link exchanges, interlinked owned sites. **KPI** (ASSUMPTION): 10 relevant referring domains by month 3, 30 by month 6, 80 by month 12.

### 17.3 Local SEO, honestly *(Step 16)*

- **If you operate a real outlet, yard or shop:** create a Google Business Profile with the real address, hours and categories. This is the route into the map pack that carries "lpg near me" (3,600) and "lpg station near me" (1,900).
- **If not:** no Business Profile is allowed. Compete with organic pages and the order funnel. **Do not create profiles for partners' shops under your name.** A service-area business may only list real areas it serves.
- Partners who are real shops may hold their own profiles. We never claim them.

### 17.4 AI search *(Step 19)*

Put a clear answer block and a dated, sourced table at the top of each price page. Decide per bot in `robots.txt`. Verify Bing Webmaster Tools and use IndexNow. Track referrals from chatgpt.com, perplexity.ai, copilot.microsoft.com and gemini.google.com in GA4. Each month ask 10–20 key questions in the main assistants and record whether we are cited.

---

## 18. Roadmap *(Section 26)*

### 18.1 Phase 0: intelligence and data (days 1–7)

| Day | Work | Output |
|---|---|---|
| **1** | You send the open items (section 2.2). Create the Serper key, the Google Ads account, Search Console and GA4. Run `supabase/intel.sql`. | Access and schema |
| **1–2** | Serper wave 0 (238 queries). Start the crawl of the 8 owner domains. | First SERP data and 250 competitor pages |
| **2–3** | Serper wave 1 (240 queries). Add every new domain from the top 10s to the crawl list. | City SERPs for 30 cities |
| **3–5** | Keyword Planner uploads. Clustering queries (wave C). Autocomplete expansion. | Updated volumes, automatic overlap results |
| **4–7** | Teardown of 12 pages per money cluster. Coverage matrix. Final page map. | **Gate B** |
| **1–14 (parallel)** | **Partner verification calls** for Karachi, Lahore, Islamabad, Rawalpindi. Load your real distributor list. Run one test order per city. | Gate L for wave 1 |

### 18.2 Days 5–30 (build and launch)

| Days | Work |
|---|---|
| 5–10 | **Fast lane:** minimal template, OGRA data, ship PR-001, NW-001, ED-001 |
| 5–14 | Data model, trust pages, tracking, schema, sitemap. Back-fill 12–24 months of OGRA data. |
| 10–21 | Remaining P1: PR-002, PR-003, PR-004/005, CY-001/002/007, SF-001/002, NW-002, AP-002/003 |
| 14–28 | City hubs as each passes Gate L. DL-001, DL-008, order flow, test leads. **Gate C** launch checklist. |
| 30 | Review indexing, errors, first impressions. Go or no-go for P2. |

### 18.3 Days 31–90

| Weeks | Work |
|---|---|
| 5–6 | P2 batch 1: history, calculator, size pages, composite, refill |
| 7–8 | P2 batch 2: Peshawar, Quetta, Faisalabad, Multan, Gujranwala, Hyderabad hubs (each after Gate L), province hubs, dealer page, OGRA rules, supplier-choice guide |
| 9–10 | Urdu foundation (5 pages), first outreach round, industrial supply |
| 11–12 | First optimisation cycle (CTR fixes, pages at positions 8–20). **Gate E1** review. |

### 18.4 Months 4–12

| Months | Work |
|---|---|
| 4–6 | P3 pages that passed gates: services, industries, tools, regulators. Appliances live **before the next winter.** Recruit partners in GB, AJK and Balochistan, then re-score. |
| 6 | **Gate X.** Expansion data against the 100K target. |
| 7–9 | P4. Release in batches of 10–50 pages. Check indexing after 4–8 weeks. Stop and fix if indexing falls below about 70%. |
| 10–12 | Refresh top pages, merge weak ones, plan year two |

**Capacity rule:** lead operations take longer than page production. Do not open a new city until the earlier cities are served on time *(Step 26.2)*.

---

## 19. Measurement *(Step 21)*

**Setup before launch:** Search Console (domain), Bing, GA4 events, rank tracker for Pakistan plus Karachi, Lahore, Islamabad (about 150 keywords), call and WhatsApp attribution, `page_id` and hat on every lead.

| Metric | Source | Cadence |
|---|---|---|
| Indexed ÷ submitted | Search Console | Weekly |
| Impressions, clicks, CTR, position per page | Search Console, Bing | Weekly |
| Rankings by city | Serper weekly top-100 run | Weekly |
| Discover | Search Console | Weekly |
| Leads, valid rate, time to first contact | Lead database | Daily in crisis, else weekly |
| **Per city: verified partners, median delivery minutes, orders** | `orders`, `partners` | Weekly |
| Orders and revenue by page | Lead database and finance | Monthly |
| New relevant referring domains | Ahrefs Webmaster Tools | Monthly |
| Competitor changes (new pages, changed text) | `intel.pages` diff | Monthly |
| Price data freshness | Data editor dashboard | Daily |

**Diagnosis:** use the symptom → cause table in *Step 21.3*. Run prompts P16 and O5 monthly.

---

## 20. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| AI Overviews answer price queries | High | Own the cited source, the dataset, calculators and the order path. Review the CTR assumption in month 3. |
| One page carries about three quarters of demand | High | Protect it; build cylinder, city and Urdu pillars |
| **Unprovable claims ("within an hour", "every city", "1000s")** | **High** | Claims register (section 2.3). Measured data only. |
| **Publishing partner details without consent** | **High** | Aggregate counts by default. Names only at "agreed". |
| **Thin or template city pages** | **High** | Gate L, 60% unique text, sibling similarity under 0.8, batch release |
| **No backlink data (no Ahrefs/Semrush)** | Medium | SERP weakness score, Ahrefs Webmaster Tools for our own site, optional one-month paid plan at Gate B |
| Keyword Planner ranges, Ubersuggest difficulty are third-party | Medium | Use ranges to rank terms, validate in Search Console after launch |
| Wrong price or safety statement | High | Second-person check, sourced figures, stale banner, named reviewer, correction log |
| Advertising above OGRA's notified maximum | Legal | Lawyer review before launch. Show notified, market and our price separately. |
| Competitor with tools and Urdu (cylin.com.pk) | Medium | Differentiate on verified network data, price clarity, safety, WhatsApp speed. Do not copy. |
| Copying competitor text | Legal and quality | Crawl for analysis only. Original writing from our facts. |
| Operational overload | Medium | Cap open cities to capacity to serve |
| Engineering pages without real projects | Medium | Gated. Nothing publishes without a named executor and a project. |
| New-domain delay | Medium | Fast lane first. Set expectations (section 1.4). |
---

## 21. Pre-publish checklist per page *(Sections 25.2, 25.4)*

- [ ] In `page-map.csv`, gate passed, no other page targets the same cluster
- [ ] Live SERP and 3 competing pages studied in the target city (from `intel.pages`)
- [ ] Facts table complete. Nothing outside it appears.
- [ ] No claim from the claims register that lacks evidence
- [ ] Question answered in the first two sentences
- [ ] 3 information-gain items present
- [ ] Title (50–60), meta (140–160), H1, headings, alt text, canonical, schema valid
- [ ] Mobile read-through done. Core Web Vitals checked.
- [ ] Order path and tracking tested
- [ ] Similarity check against sibling pages passed
- [ ] Reviewed by the named reviewer (price, safety, legal-adjacent, engineering)
- [ ] Linked from 2–5 pages. In the sitemap. Indexing requested.
- [ ] Review date set

---

## 22. Commands

```
python docs/seo-plan/scripts/01_parse.py            # merge the two Ubersuggest files
python docs/seo-plan/scripts/02_map.py              # keyword to page mapping (writes v3.5 maps)
python docs/seo-plan/scripts/10_scope_sizing.py     # sizing of new topics and city demand
python docs/seo-plan/scripts/12_build_v4_data.py    # partners, city readiness, competitors
python docs/seo-plan/scripts/13_build_v4_pagemap.py # page-map.csv v4, keyword-master, Serper query lists
python docs/seo-plan/scripts/03_model.py            # demand and click model
python docs/seo-plan/scripts/04_checks.py           # integrity checks and meta tags
```

`13_build_v4_pagemap.py` rebuilds `page-map.csv` and `keyword-master.csv` from the archived v3.5 files in `archive/`. `02_map.py` writes the older (v3.5) maps. **After a new Ubersuggest export:** run `01_parse.py` and `02_map.py`, copy the two outputs over `archive/page-map_v3.5.csv` and `archive/keyword-master_v3.5.csv`, then run `13_build_v4_pagemap.py` and `04_checks.py`.

Integrity checks on the v4 map: page ids and URLs are unique, maximum depth is 3, no page is deeper than the rule allows. Five pages (CY-001, PR-009, PR-010, DL-006, NW-003) and every new service, industry and tool page still need seed keywords from Keyword Planner.

---

## 23. Gates

| Gate | Condition | Status |
|---|---|---|
| **A** Business | Licence and model confirmed, partner commitment, compliance questions answered | **Mostly passed.** Open: licence numbers, outlet, safety reviewer, lawyer questions |
| **B** SEO opportunity | Overlap tests, final page map, competitor gaps documented | Ready to run (Phase 0). Needs Serper and Keyword Planner. |
| **L** Location (per city) | Section 7.2 | None passed yet. Wave 1 targets Karachi, Lahore, Islamabad, Rawalpindi. |
| **C** Launch | Launch checklist, tested lead flow, tracking | After build |
| **D** Authority | Relevant referring domains growing | From month 1 |
| **E** Pilot | Indexing about 70%+, impressions rising, accepted leads | Day 90 |
| **X** Ceiling | Expansion data (levers A–D) added to the model | Month 6 |

**Gate X:** at month 6, re-run `03_model.py` with the expanded keyword set and Search Console actuals. **100K or more at assumed CTRs:** keep the target. **50–100K:** reset to 70–80% of the modelled ceiling and invest in the biggest lever. **Under 50K:** the market does not support 100K from Search. Reset, and consider lever D and non-search channels (YouTube, WhatsApp, Facebook, partnerships).

---

## 24. Open decisions

1. Licence numbers, legal name, NTN, address (section 2.2)
2. Phone and WhatsApp numbers, hours, delivery charges
3. Physical outlet: yes or no
4. A named safety reviewer
5. Budget, team, and who answers leads
6. **Your real distributor list** (replaces the Maps data)
7. Serper key, Google Ads account, Search Console and GA4 access
8. Whether to pay for one month of Ahrefs or Semrush at Gate B
9. Whether to test lever D (adjacent energy topics) at Gate X
10. Which engineering services you can actually carry out, and who does the work

---

## 25. Revision log: v3 → v4

**What was missing in v3:** business facts, partner data, competitor detail and a way to do research without Ahrefs or Semrush.

**Changes and reasons:**

| Change | Reason |
|---|---|
| Gate 0 closed except four items | You answered the business model, coverage, appliances, Urdu writer and tool access |
| Three roles and the "hat" disclosure | A marketer, a reseller and a referral partner on one site needs explicit disclosure |
| Claims register | "1000s", "within an hour" and "every city" are not provable from the data (459 phone-listed partners in 103 cities) |
| City hubs replace separate price, delivery and "LPG in" pages | They competed for one cluster. Only Karachi and Lahore (2,340 and 2,700 searches) keep a separate price page. |
| PR-006, PR-007, PR-008 merged into hubs | Volumes of 210, 50 and 70 do not justify pages |
| Gate L and supply-capped scoring | Only 5 of 250 cities have keyword volume, so population and supply decide, with SERP checks |
| Dealer data: master is the cleaned file, Excel adds 16 | 433 of 452 phones overlap. I first reported 0 because of a script bug in my check. |
| Partner lifecycle and consent | The data is a Maps scrape. Publishing unverified numbers as "our network" is a trust and legal risk. |
| Replacement research stack and Serper waves | No Ahrefs or Semrush. Clustering is done from SERP overlap. |
| Competitor crawler and `intel.sql` | You asked to crawl every competitor page into a database. The 8 listed sites have about 250 pages. |
| Service, industry, shop, tool, guide and Urdu pages added (58 new rows) | The company file lists them. Each is gated because the demand data shows little volume. |
| Did not adopt `/lpg-supply/` as a hub | "lpg supply" is a news query handled by NW-002 |
| Lever D added | cylin.com.pk's adjacent-intent pages suggest where extra traffic might come from. Owner decision at Gate X. |
| "Cities and areas" file treated as a census table | It contains no neighbourhoods and no served-city flags |

**What would make this plan final:** the open items in section 24, the Phase 0 results (Serper, Keyword Planner, crawl), and the first verified partners for wave 1.
