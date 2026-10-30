# Plan to outrank every competitor: thelpgco.pk (30 Oct 2026)

Built from live data, not guesses:
- Google top 20 for all 39 target keywords (750 results, Serper, Pakistan / Islamabad, not personalised): `intel/keyword-rankings-2026-10-30/`
- A content audit of the 41 competitor pages that rank, next to 11 of our pages: `page-audit.csv`, `page-audit.json`
- 290 real Google autocomplete searches from 29 seed terms: `autocomplete.json`
- Earlier: [KEYWORD_RANKING_PLAN.md](KEYWORD_RANKING_PLAN.md) (keyword → page map), [COMPETITORS.md](intel/keyword-rankings-2026-10-30/COMPETITORS.md) (who ranks)

---

## 0. The situation in one paragraph

thelpgco.pk has more pages, cleaner structure and more accurate prices than every price blog that ranks, but **it is not in the top 20 for any target keyword, and only #14 for its own name**. The blogs that beat us (olx, sui-gas.pk, icons.com.pk) win on **age, links and depth of data**, not quality. Two of them are **showing wrong prices right now**: olx's title says "May 2026" (Rs 303.81/kg), and icons.com.pk shows June's Rs 308.76 as "current". The real October price is Rs 279.34. So the plan has three legs, and all three are needed:

1. **Data nobody else has** (history back to 2016, the OGRA price breakdown, real market rates, licensed company and station lists).
2. **Better pages** built around that data, updated on the day OGRA announces.
3. **Trust signals** (Business Profile, reviews, links, social), without which none of the above ranks.

---

## 1. What the competitors actually have (audit results)

| Page | Words | Tables (rows) | History covered | What makes it rank |
|---|---:|---:|---|---|
| sui-gas.pk/lpg-price-per-kg | 2,542 | 5 (20) | 2026 only | Accurate Oct price, month-by-month 2026, "market price is higher" section, underfilled-cylinder check, LPG vs Sui gas per MMBTU, 7 FAQs, Article schema with dateModified |
| icons.com.pk/lpg-gas-price-pakistan-today | 2,116 | 5 (39) | Aug 2023 – 2026 | **Today's date in the title**, OGRA price breakdown (producer price, levy, GST), city market rates, trend table. Its "current" price is out of date. |
| blog.olx.com.pk/autos/lpg-price-in-pakistan | 1,998 | 4 (45) | 2023 – 2026 | Brand authority (OLX), official vs market-rate tables, history table, FAQs. Five months out of date. |
| ceicdata.com (LPG 11.67 kg retail) | 2,887 | 8 (184) | 2020 – 2026 monthly | Pure time series + Dataset schema |
| karandaaz dataset | 3,078 | (data table) | 2013 – 2026 | Pure time series |
| psopk.com order form | 1,522 | 0 | none | State brand + "LPG home delivery" order form for 11.8 / 45.4 / 10 kg |
| ogra.org.pk notified prices | (PDF links) | — | official | The source itself |
| burhangas.com 10 kg composite | 257 | 0 | — | Product page: price Rs 11,800, Product + Offer schema, 5/10/13 kg range |
| eshop.ppgl.com.pk 11.8 kg | 302 | 1 | — | Product page with price breakdown and order button (6 kg, 10 kg composite, 11.8, 45.4 kg) |
| cylin.com.pk/coverage/islamabad | 384 | 0 | — | Typical delivery 35–55 min, areas, 4 FAQs, Service + Offer schema |
| friends-gas.pk | 1,049 | 0 | — | Composite and metal sizes, safety checks, subscriptions, testimonials, phone and WhatsApp |
| Wikipedia / unacademy / elgas | 1,400–5,500 | — | — | Definition pages for "lpg", "full form", "meaning" |
| mylpg.eu stations list | 7,401 | — | — | 175 named LPG stations in Pakistan with map |
| **Ours** (price page) | 1,596 | 3 (15) | **Sep–Oct 2026 only** | Accurate, structured, 10 FAQs, Dataset/Article schema, but young domain with few links |

**What every winning price page has that we lack:** (a) multi-year history, (b) a market-rate table (what shops actually charge), (c) the price breakdown, (d) a city-by-city table, (e) 2,000+ words of genuinely useful sections.

---

## 2. The data assets that will put us ahead (build once, update monthly)

These are the moat. Each one is something no single competitor has in full.

### D1. Complete OGRA price history, 2016 → today (highest priority)
- Every monthly OGRA notification: per-kg price, 11.8 kg and 45.4 kg prices, effective date and source link to the PDF.
- Competitors: sui-gas 2026 only, icons/olx from 2023, ceic from 2020. **We go back to the 2016 LPG policy, about 120 months.**
- Unlocks: "lpg price per kg in pakistan today 2021" (720/mo), every "lpg price 20XX" search, "lpg gas price history", "lpg price chart", and links from journalists and students who need the series.
- **Source:** OGRA notification PDFs (ogra.org.pk → LPG notified prices archive). Each month entered into `data/prices.json` with `sourceUrl` and `verifiedBy`. Claude can collect and draft; a person checks each row against the PDF (site rule: no unverified price).

### D2. Price breakdown for every month
- From the same OGRA notification: producer price (Saudi Aramco CP and freight), margins (marketing, distribution), petroleum levy and GST, adding up to the consumer price.
- Only icons.com.pk shows this, for one month. We show it for every month, with a "why it moved this month" line (Saudi CP up or down, rupee rate).
- Unlocks: "why lpg price increase", "lpg price increase october 2026", "lpg price breakdown"; makes us the page news sites cite.

### D3. Real market rates: what shops actually charge (unique to us)
- Competitors print market ranges ("Rs 350–400/kg") with no source. **We are a distributor and can collect real figures.**
- Each month the owner or network records actual retail prices seen in Islamabad, Rawalpindi, Lahore and Karachi (a range, the date checked, and the number of shops checked). Published as "Market rate checked by THE LPG CO. on [date]".
- Unlocks: "lpg rate today lahore / karachi / islamabad", "lpg 1kg price today in lahore", and is the single most quotable fact for AI answers.
- **Owner input needed:** a simple monthly WhatsApp form or sheet. Never publish a number that was not actually checked.

### D4. LPG vs Sui gas vs electricity vs diesel cost table
- Cost per MMBTU and per hour of cooking at this month's prices (gas tariffs from OGRA slabs). We already have the calculators; turn them into a monthly table on the price page.
- Unlocks: "is lpg cheaper than sui gas", "lpg vs sui gas", "how much lpg gas is used in 1 hour".

### D5. OGRA-licensed LPG marketing companies list (full table)
- We already hold OGRA's marketer list (`data/directory/marketers.json`). Clean it and publish: company, licence city, licence expiry, link.
- Unlocks: "ogra lpg distributors list", "lpg companies in pakistan", "ssgc lpg", "lpg marketing companies list"; journalists and buyers link to it.

### D6. LPG auto-refuelling station list
- OGRA publishes auto-refuelling station construction licences (ogra.org.pk/download/4501, which already ranks #1 for "lpg filling station"). Turn it into a clean, searchable table by city.
- Unlocks: "lpg filling station", "lpg gas station", "lpg station", "lpg near me for car" (mylpg.eu ranks with only 175 stations).

### D7. Cylinder specification and price sheet
- Every size we sell (steel 5, 11.8, 15, 45.4 kg; composite sizes): gas price, deposit, new empty cylinder price, tare weight, dimensions, regulator type.
- **Owner input needed:** deposit and new-cylinder prices, and composite sizes and prices. burhangas ranks #1 for "lpg cylinder" with exactly this kind of page.
- Unlocks: "empty lpg gas cylinder price in pakistan", "fiber lpg gas cylinder price in pakistan", "composite cylinder price in pakistan", "lpg cylinder weight", "12 kg lpg cylinder price".

---

## 3. Page-by-page: what we build to beat each #1

### 3.1 `/lpg-price-in-pakistan/`: the main price page (about 78,000 searches a month)
Beat: PSO / OGRA (authority) and olx / sui-gas / icons (content). Target: #1–3.

Add, in this order on the page:
1. **Answer box** (done): today's price per kg and per cylinder in one sentence.
2. **"Updated [date]" line** showing `verifiedOn`, plus **"Next OGRA revision: [last day of month]"**. Competitors show stale dates; ours is always right.
3. **Official price table** (done) plus a **market-rate table** by city (D3).
4. **This month vs last month** (done), plus a **12-month mini chart** (server-rendered SVG).
5. **Price breakdown** (D2) with a "why it changed" note.
6. **City table:** Islamabad, Rawalpindi, Lahore, Karachi, Peshawar, Quetta, Multan, Faisalabad, with the same OGRA rate, the market range and a link to each city page.
7. **Cost comparison** (D4).
8. **"How to check you are not overcharged"**: maximum legal price, weighing the cylinder, OGRA complaint route.
9. **Order block:** call / WhatsApp / form (PSO ranks #1 with an order form; price searchers want to buy).
10. **FAQ** expanded with the autocomplete questions: "lpg ka rate kya hai aaj ka", "lpg price increase or decrease", "when will lpg price decrease", "lpg new price in pakistan today", "lpg price today 11.8 kg".
- Target length about 2,500 words, all useful.

### 3.2 `/lpg-price-per-kg-in-pakistan/`: 1 kg price
Beat: icons.com.pk (#2–3). Add: the 1–10 kg table (done), a **city 1 kg market-rate table** ("lpg 1kg price today in lahore / karachi / near islamabad" are real autocomplete terms), and a per-kg history chart.

### 3.3 `/lpg-price-in-pakistan/history/`: history (D1)
Beat: ceicdata, karandaaz, olx. Becomes **the** LPG price history of Pakistan:
- Full table 2016 → today (newest first) with the % change.
- **Year sections with anchors**: "LPG price in Pakistan 2021", 2022 and so on (each is a search).
- Yearly highs and lows, average, and biggest monthly rise and fall.
- Line chart; downloadable CSV (people link to downloadable data).
- Dataset schema (done) updated to the full range.

### 3.4 NEW: monthly price notice pages, `/lpg-price-in-pakistan/2026-11/` and so on
- Each month a short, fast page: "LPG price for November 2026: Rs X/kg (up / down Rs Y)", with the breakdown, the reason, the effective date and the OGRA PDF link. Linked from history and the main page.
- Wins the "lpg price increase november 2026", "ogra lpg price notification" and "lpg new price" news searches, where Facebook and news sites rank today.
- Each one is real, dated, unique data (not thin), and feeds Google News and Discover.

### 3.5 `/lpg-cylinder-price-in-pakistan/` + cylinder product pages
Beat: PSO, daraz, burhangas, PARCO eShop.
- One product page per size with photo, gas price, deposit, new-cylinder price, specs, "Order on WhatsApp" button, and Product + Offer schema with price (D7).
- **New composite cylinder pages** (5 / 10 / 13 kg or whatever we stock): "fiber lpg gas cylinder price in pakistan" and "composite cylinder price in pakistan".
- **"Empty LPG cylinder price in Pakistan"** section (a real autocomplete term).
- **Regulator and hose prices** ("lpg gas cylinder regulator price in pakistan").

### 3.6 `/ogra-lpg-notified-price/`
Beat: aim for #2 under OGRA. Add: how to read the notification (annotated example), links to every monthly notice page, and the breakdown explained line by line.

### 3.7 City price pages: Karachi, Lahore (+ Islamabad, Rawalpindi, Peshawar, …)
- Add the city **market rate** (D3) and date checked, local distributors, and delivery charge.
- **New `/lpg-price-in-pakistan/islamabad/` and `/rawalpindi/`** ("lpg price islamabad today", "lpg price in islamabad today per kg", "lpg cylinder price islamabad" are all live searches; we are based there and can rank fastest).

### 3.8 `/what-is-lpg/`: "lpg", "lpg gas", "full form", "meaning", "stands for"
Beat Wikipedia in Pakistan by being the clearest local answer:
- Properties table (density, boiling point, energy per kg, propane/butane mix in Pakistan by season), **"LPG meaning in Urdu"** (مائع پٹرولیم گیس), "is LPG the same as propane", "is LPG natural gas", "LPG vs LNG vs CNG" quick table, and a simple diagram.

### 3.9 `/lpg-near-me/`, `/lpg-shops-and-agencies/`: near me / shop
- The map pack decides these, so the **Google Business Profile** is step one (section 5).
- On the page: "open now 24 hours" (true for orders), delivery charges, live areas list, and a map embed of the office.

### 3.10 `/lpg-filling-stations/`: station keywords (D6)
- Add the OGRA station list as a table by city, "LPG station near me for car" guidance, and the difference between a cylinder plant and an auto station (already there).

### 3.11 NEW: `/ssgc-lpg/`: "ssgc lpg"
- Factual guide: SSGC LPG (Pvt) Ltd, its OGRA licence, terminal, that it sells at the OGRA price, and how to buy. No implication that we are SSGC.

### 3.12 NEW: `/lpg-companies-in-pakistan/` upgrade (D5)
- Full licensed marketer table, with filters by city. "ogra lpg distributors list" and "ogra lpg license".

---

## 4. Content quality rules (how we stay better)

1. **Accuracy is the weapon.** Every price carries its effective date, source link and who checked it. Competitors show stale prices; we point that out by always being current.
2. **Update within hours of OGRA** (usually the last day of the month). The page that updates first wins "today" searches for 30 days.
3. **Answer first, detail after:** one-sentence answer, then table, then explanation.
4. **Real data only:** market rates, delivery times and deposits only when actually checked (site claims policy).
5. **Roman Urdu and Urdu:** answer "lpg ka rate kya hai aaj ka" in the FAQ now; later add Urdu versions of the price page (with hreflang `ur-PK`), which none of the competitors have.
6. **E-E-A-T:** byline "THE LPG CO. pricing team", "checked against OGRA PDF on [date]", OGRA licence number, office address, editorial policy link (already in place).
7. **Images with meaning:** real cylinder photos with sizes, the annotated OGRA notification, price charts. No stock filler.

---

## 5. Trust and links (the leg that decides it)

The pages above will not rank until Google trusts the domain. Owner actions, in order:

| # | Action | Why | Effort |
|---|---|---|---|
| 1 | **Google Business Profile** verified (Office #99, G-12): 24/7, photos, products with prices, monthly price post | Map pack for near me / shop; brand trust | 1 day + monthly post |
| 2 | **Reviews**: WhatsApp the review link after each delivery; target 30 in 3 months, 100 in a year | Local ranking + trust | Ongoing |
| 3 | **Search Console + Bing Webmaster**: sitemap, request indexing after each update | Faster indexing; ChatGPT and Copilot use Bing | 1 hour |
| 4 | **Monthly price post** on Facebook, Instagram, LinkedIn, X and a 30-second **YouTube Short**, all linking to the price page | Facebook and YouTube posts rank top 3 for these keywords within days | 30 min/month |
| 5 | **Press outreach on day one**: email the new price table and breakdown to business desks (Business Recorder, The News, The Nation, Dawn, Express Tribune, ProPakistani, ARY). They already rank and are cited for these terms. | One news link outweighs hundreds of directories | 1 hour/month |
| 6 | **Embeddable price widget** ("Today's LPG price in Pakistan", auto-updating, with a link back) offered to news, auto and property blogs | Earns links every month | Claude builds once |
| 7 | **Data citations**: send the history CSV (D1) to Karandaaz, university economics departments and Wikipedia's LPG-in-Pakistan sections as a source | High-authority links | Occasional |
| 8 | **Directories and NAP**: Bing Places, Apple Business Connect, Yellow Pages PK, businesslist.pk, OLX business, PLPGMA membership listing | Consistent business identity | One-off |
| 9 | **Distributor network**: each partner links to its city page on thelpgco.pk | Relevant local links | Ongoing |

---

## 6. Technical edge (already strong, keep it)

Done: server-rendered pages, schema (Organization, LocalBusiness, Service, FAQ, Product/Offer, Dataset, Breadcrumb), llms.txt, AI crawlers allowed, sitemap with real lastmod, one-hop www redirect, gallery lazy-loading.

To add with the new data:
- Dataset schema on the main price page and on each monthly notice page.
- `NewsArticle` schema on monthly notice pages (Google News / Top Stories).
- Price chart as inline SVG (crawlable, fast).
- A CSV download of the history at a stable URL.
- IndexNow ping to Bing on each price update.

---

## 7. Timeline

| When | Build (Claude) | Owner |
|---|---|---|
| **31 Oct – 1 Nov** | November price live within hours of OGRA; first monthly notice page `/lpg-price-in-pakistan/2026-11/`; "Updated / next revision" line | Confirm the OGRA PDF figure; post on Facebook, Instagram and YouTube; email 5 news desks |
| **Week 1 (Nov 2–8)** | Market-rate table component (ready for data); city table; Islamabad and Rawalpindi price pages; Roman Urdu FAQs | Business Profile verified; Search Console + Bing; first market-rate check (4 cities) |
| **Weeks 2–3** | **History backfill 2016 → 2026** (D1) + breakdown (D2) + chart + CSV; year sections | Spot-check the history rows against OGRA PDFs |
| **Week 4** | OGRA marketer list (D5); station list (D6); SSGC LPG guide; what-is-LPG upgrade | Send deposit, new-cylinder and composite prices (D7) |
| **Month 2** | Cylinder product pages with prices; composite pages; price widget; cost comparison table (D4) | 15+ reviews; widget outreach; December price on day one |
| **Month 3** | Urdu price page (hreflang); city market-rate pages for Lahore and Karachi | 30 reviews; monthly press + social routine |
| **Monthly, forever** | Price update + notice page + market rates; re-run `26_keyword_serp_rankings.py` and `27_competitor_page_audit.py` | Price post, press email, review requests |

## 8. How we will know it is working

| Measure | Now | 3 months | 6 months |
|---|---|---|---|
| Target keywords in top 20 (Serper report) | 0 / 39 | 20 / 39 | 35 / 39 |
| Target keywords in top 3 | 0 | 5 | 20+ |
| Brand search "thelpgco" position | 14 | 1 | 1 |
| Google reviews | 0 | 30 | 75 |
| Referring domains (links) | very few | 15 | 40 |
| Monthly organic clicks (Search Console) | — | 3,000 | 15,000 |
| Calls + WhatsApp from organic (GA4 key events) | — | tracked | growing monthly |

Re-run both intel scripts on the 5th of each month and compare against this table.

---

## 9. What I need from the owner

1. **Market rates**: every month, the actual retail price per kg and per 11.8 kg cylinder seen in Islamabad, Rawalpindi, Lahore and Karachi (with the number of shops checked).
2. **Cylinder prices**: deposit and new empty cylinder price for each size; composite sizes and prices; regulator and hose prices.
3. **OGRA PDFs**: confirmation of each month's figure from the official PDF (or permission for Claude to read it and a person to tick it off).
4. **Business Profile, reviews, social accounts and press emails**: the off-site steps in section 5.
5. **Facts to confirm** in [OWNER_TODO.md](../content-plan/OWNER_TODO.md) (areas, payment methods, delivery fee).
