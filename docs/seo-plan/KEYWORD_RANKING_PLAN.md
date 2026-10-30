# Keyword ranking plan: thelpgco.pk (30 Oct 2026)

Goal: rank #1 in Pakistan for the 45 keywords from the Semrush export (about 140,000 searches a month in total).

Honest note: nobody can guarantee #1. Keyword difficulty here is low to moderate (KD 12–44), so top 3 is realistic for most terms within 3–6 months **if** the on-site work below is done and the site earns links and reviews. A few terms are capped by who owns them (see "Hard keywords").

---

## 1. One page per keyword group (no new duplicate pages)

Google ranks one page per intent. Splitting "lpg price today" and "lpg gas price today" into two pages makes both weaker. Every keyword below already has a page; the job is to make that page the best answer.

| Group | Keywords (monthly searches) | Target page | Current state |
|---|---|---|---|
| **A. Price today** (biggest) | lpg gas price in pakistan 22,200 · lpg price in pakistan today 12,100 · lpg gas price today 9,900 · lpg price in pakistan 8,100 · lpg gas price in pakistan today 6,600 · today lpg rate 5,400 · lpg gas price 2,900 · lpg gas rate 2,400 · lpg price 1,900 · lpg rate 1,900 · lpg gas rate today 590 · lpg rate in pakistan 590 · lpg price today 480 · lpg rate today in pakistan 390 | `/lpg-price-in-pakistan/` | Strong (1,670 words, live price in title). Title and H1 miss the word **"gas"** and **"rate"**, which are in the top keywords. |
| **B. Per kg** | lpg 1kg price today pakistan 2,400 · lpg price in pakistan today per kg 1,600 · lpg 1kg price today 1,300 · lpg 1kg price today 2026 880 | `/lpg-price-per-kg-in-pakistan/` | Good. Title already has "1kg", price and month. |
| **C. Price history** | lpg price per kg in pakistan today 2021 720 | `/lpg-price-in-pakistan/history/` | **Weak: only 2 months of data** (Sep–Oct 2026). Needs every month back to 2019. |
| **D. Cylinder price** | lpg cylinder price in pakistan 1,300 · lpg cylinder price 590 · lpg gas cylinder price 590 | `/lpg-cylinder-price-in-pakistan/` | Good. Add "gas cylinder" wording and the full size table high up. |
| **E. OGRA** | ogra lpg prices 1,300 | `/ogra-lpg-notified-price/` | Good. OGRA's own site will usually be #1 (navigational). Aim for #2. |
| **F. City price** | lpg price karachi 390 · lpg price lahore 390 | `/lpg-price-in-pakistan/karachi/` and `/lahore/` | OK. H1 is short; add the live price to the H1. |
| **G. What is LPG** | lpg 4,400 · lpg gas 1,900 · lpg stands for 1,900 · lpg full form 1,000 · lpg meaning 480 | `/what-is-lpg/` | Good. "lpg" alone is owned by Wikipedia and dictionaries; aim top 3 in Pakistan. |
| **H. Cylinders** | lpg cylinder 1,300 · lpg gas cylinder 720 | `/lpg-cylinders/` | Title says "LPG Cylinders"; add "Gas Cylinder" and sizes. |
| **I. Near me / shops** | lpg near me 3,600 · lpg shop 480 · lpg shop near me 480 | Google Maps (Business Profile) + `/lpg-near-me/` + `/lpg-shops-and-agencies/` | "Near me" is decided mostly by the **Google Business Profile** and distance, not the website. |
| **J. Stations** | lpg filling station 590 · lpg gas station 590 · lpg station 390 | `/lpg-filling-stations/` | Title lacks "LPG station" / "gas station". |
| **K. SSGC LPG** | ssgc lpg 480 | New section or guide | No page. Brand (navigational) search: SSGC will rank #1. A factual guide can reach page 1. |

---

## 2. Website changes (Claude can do these in code)

### Week 1 (quick wins)
1. **Price page title and H1:** "LPG Gas Price in Pakistan Today: Rs 279.34/kg (Oct 2026)", and an H1 with "LPG gas price and rate in Pakistan today". First sentence answers in one line: "The LPG gas price in Pakistan today is Rs 279.34 per kg, so an 11.8 kg cylinder costs Rs 3,296 (OGRA, effective 1 October 2026)." Google's AI Overviews and featured snippets lift that sentence.
2. **Price table at the top** of A, B and D, above any explanation: per kg, 5 / 11.8 / 15 / 45.4 kg, plus the month-on-month change.
3. **Titles for H, J, F:** "LPG Gas Cylinders in Pakistan: Sizes, Steel & Composite"; "LPG Filling Stations & Gas Stations in Pakistan"; city H1s with the live price.
4. **FAQ wording that matches the searches:** "What is the LPG rate today?", "What is the 1 kg LPG price today?", "What is the LPG cylinder price in Pakistan?", "What is LPG full form?". Short first sentence, details after.
5. **Price markup:** keep the price in Product/Offer markup on the cylinder pages and add a `Dataset` for the history table (helps Google and AI tools read the numbers).

### Weeks 2–4 (content depth)
6. **Fill the price history** (group C): every OGRA monthly notification from 2019 to today, with the per-kg and 11.8 kg prices. This is the only way to rank for "2021", "2022", "2023" and similar searches, and it is a page other sites link to. Source: the OGRA notification PDFs (each month needs checking against the official PDF).
7. **Year sections:** "LPG price in Pakistan 2021 / 2022 / 2023 / 2024 / 2025 / 2026" as headed sections with jump links on the history page (one page, not six).
8. **SSGC LPG guide** (group K): what SSGC LPG (Pvt) Ltd is, its OGRA licence, that it sells at the same OGRA price, how to buy. Factual only, with no suggestion that we are SSGC.
9. **Price chart** on the history page (server-rendered SVG, not JavaScript-only).

### Every month (the biggest ranking factor for groups A–F)
10. **Update the price within hours of OGRA's notification**, usually on the last day of the month or the 1st. The site that shows the new price first wins "today" searches for the month. Steps are in `data/prices.json` → `_process`. Next update: **1 November 2026**.
11. Read the price from the **official OGRA PDF**, not press reports (the current October entry is from press coverage).

---

## 3. Off-site work (owner)

Rankings for keywords at this difficulty are decided by **links and trust** once the pages are good. The site is new, so this is the main gap.

1. **Google Business Profile** (groups I and A): verified profile for Office #99, G-12, with 24/7 hours, photos, products (cylinder sizes with prices) and a **post every month with the new OGRA price**. This is how you get into the "lpg near me" map results.
2. **Reviews:** aim for 30+ real Google reviews in 3 months. Send the review link on WhatsApp after each delivery.
3. **Price-update links (most valuable):** each month, share the new price on Facebook, Instagram, LinkedIn and X with a link to `/lpg-price-in-pakistan/`. Post it in local Facebook groups (G-13, Bahria, DHA, Lahore and Karachi groups) where allowed.
4. **Get cited by news and blogs:** Pakistani news sites write "LPG price" articles every month. Email their business desks the new price table on day one and offer it as a source. One link from Dawn, Express Tribune, ARY, Samaa, ProPakistani or Business Recorder is worth more than 100 directory links.
5. **Embeddable price widget:** a small "Today's LPG price in Pakistan" box that other sites can embed with a link back. Claude can build it.
6. **Directories:** same name, address and phone on Bing Places, Apple Business Connect, Yellow Pages Pakistan, businesslist.pk and OLX.
7. **Search Console + Bing Webmaster Tools:** submit the sitemap, request indexing after each price update, and check the "Queries" report every month to see which keywords are moving.

---

## 4. Hard keywords (realistic targets)

| Keyword | Who owns #1 | Realistic target |
|---|---|---|
| lpg (4,400) | Wikipedia, dictionaries | Top 5 in Pakistan |
| ogra lpg prices (1,300) | ogra.org.pk | #2 |
| ssgc lpg (480) | ssgc / SSGC LPG's own site | Page 1 |
| lpg near me (3,600) | Google Maps pack (distance) | Map pack in Islamabad / Rawalpindi via the Business Profile |
| lpg meaning / stands for / full form | Dictionary sites | Top 3 (featured snippet possible) |

All the price, cylinder, station and city keywords can realistically reach #1–3.

---

## 5. How to measure

- **Search Console → Performance → Queries:** track position for each keyword monthly. Expect movement 4–8 weeks after changes.
- **Semrush Position Tracking** with this keyword list, location Pakistan.
- **GA4:** `phone_click`, `whatsapp_click`, `generate_lead` as key events, so you can see which keywords bring orders, not just visits.

## 6. Timeline

| When | What |
|---|---|
| Week 1 | On-page fixes 1–5 (code), Business Profile verified, 1 Nov price update on the day |
| Weeks 2–4 | History backfill, year sections, SSGC guide, chart; first 10 reviews; first news outreach |
| Month 2–3 | Monthly price routine + outreach every month; price widget; 30 reviews |
| Month 3–6 | Expect top 3 for most price, cylinder and city keywords if links come in |
