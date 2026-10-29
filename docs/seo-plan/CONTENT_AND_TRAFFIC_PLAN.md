# Content and traffic execution plan (30K organic clicks)

**Site:** thelpgco.pk · **Company:** THE LPG CO. PAKISTAN · **Version:** 1.0 · **Date:** 26 Oct 2026  
**Method:** [`keywords and research/seo-LeadGEN.md`](../../keywords%20and%20research/seo-LeadGEN.md) (v3.0)  
**Strategy parent:** [`THE_LPG_CO_SEO_MASTER_PLAN.md`](THE_LPG_CO_SEO_MASTER_PLAN.md) (v4.3)

This is the **writing and publishing playbook**. Use it with the page briefs, competitor research library, and the site registry. Do not invent facts. Do not copy competitor text.

---

## 1. Goal (locked)

| Metric | Target |
|---|---|
| Organic Search (+ Discover) clicks / month | **~30,000** |
| “Number one” | Positions **1–3** on head price and cylinder queries we can win; **top 5** where `ogra.org.pk` or the map pack owns #1 |
| Method | Golden rules 1–10; Steps 12–15, 17, 21–23; publication gate before every `published` status |

**Why 30K, not 100K:** the keyword model at assumed #1 CTRs supports about **26–37K** clicks/month from the mapped universe. Price alone is about 20–28K. Thirty thousand means winning price + cylinders + core learn/local pages. One hundred thousand stays a stretch for Gate X after 30K is real in Search Console.

**Title policy (CTR, not deceptive clickbait):** earn the click with true numbers, dates, city names, and “today” only when the page shows the current OGRA figure. Forbidden: fake urgency, cheapest / #1 / guaranteed, ALL CAPS, keyword dumps, promises the page cannot keep (LeadGEN Step 21.5.2).

---

## 2. Data map (what to open for every page)

| Asset | Path | Use |
|---|---|---|
| Method | `keywords and research/seo-LeadGEN.md` | Writing, schema, links, gates |
| This playbook | `docs/seo-plan/CONTENT_AND_TRAFFIC_PLAN.md` | Order of work, waves, placement, schema |
| Master plan | `docs/seo-plan/THE_LPG_CO_SEO_MASTER_PLAN.md` | Claims register, business gates, measurement |
| Page map | `docs/seo-plan/page-map.csv` | One URL per cluster (137 rows = **134 active** + 3 `MERGED`) |
| Keywords | `docs/seo-plan/keyword-master.csv` | Primary + secondary by intent |
| Brief | `docs/seo-plan/briefs/<PAGE_ID>.md` | Outline, facts table, must-not-claim, gate |
| Brief index / priority | `docs/seo-plan/briefs/INDEX.md`, `briefs.csv` | `publish_order` |
| P1 queue | `docs/seo-plan/P1_WRITING_QUEUE.csv` | Blockers, competitor folder, wave |
| P1 title/meta bank | `docs/seo-plan/P1_TITLE_META_BANK.csv` | 50–60 / 140–160 CTR titles |
| Competitor text | `content-research/competitors/by-category/<topic>/` | Angles only — **never copy** |
| Topic angles | `…/<topic>/_TOPIC_ANGLES.md` | “Cover from all angles” checklist |
| SERP / crawl | `docs/seo-plan/intel/intel.db` | Who ranks; overlap pairs |
| Sorted URLs | `docs/seo-plan/intel/competitor-urls/sorted/` | Topic groups |
| Registry | `data/pages.json` | draft → review → approved → published |
| Metas | `data/meta.json` | Static titles/descriptions |
| Prices / cities / projects / safety | `data/prices.json`, `city-overrides.json`, `projects.json`, `safety-review.json` | Data gates |
| Network | `data/network.json` | Partner **counts** only until consent |
| Compliance / decisions | `COMPLIANCE_CHECK.md`, `DECISION_LOG.md` | What is open or blocked |
| Owner Wave 0 checklist | `OWNER_WAVE0_CHECKLIST.md` | Exact files/answers needed from the owner |
| Blank brief | `templates/PAGE_BRIEF.md` | New pages only |
| Status tool | `scripts/page-status.mjs` | Move pages up the ladder one step at a time |

**Honest gap:** Most commercial pages still need ≥3 information-gain items before `published`. Fifty-one pages are built at status `review` (noindex); remaining English drafts follow the Page Factory SOP (section 4). Urdu is out of scope.

---

## 3. Page types (14 kinds → 134 URLs)

| Type | Approx count | Example URLs | Live when |
|---|---:|---|---|
| Price (flagship, per-kg, OGRA, city) | 5+ | `/lpg-price-in-pakistan/` | Verified OGRA row |
| Cylinder hub, sizes, price, composite | ~10 | `/lpg-cylinders/` | With price cluster |
| City / province hubs | ~22 | `/lpg-in-islamabad/` | **Gate L** only |
| Delivery / order / B2B supply | ~8 | `/order-lpg/` | With price |
| Near-me directories | 4 | `/lpg-near-me/` | Agreed partners |
| Guides / comparisons | ~20 | `/what-is-lpg/` | Early authority |
| Safety | ~5 | `/lpg-safety/` | Reviewer sign-off |
| Tools | 7 | cylinder price calculator | Formula + OGRA data |
| Appliances / shop | ~5 | geyser, heater, stove | Real stock |
| Services / industries | ~15 | pipeline, restaurants | Real project each |
| Dealers / network / auto | ~6 | become distributor | Real terms |
| Market / news | 3 | shortage, supply | Sourced timeline |
| Trust | 15 | about, licences, partner-standards | Early (facts first) |

**Urdu removed (27 Oct 2026):** no `/ur/` mirrors, no hreflang. Active map = **119 pages** (was 134 − 15 UR). Roman Urdu search phrases may appear as natural FAQ/H2 wording on English pages only.

Full inventory: `page-map.csv`. Do not add URLs outside the map without a new brief and overlap test.

---

## 4. Page Factory SOP (one page = one pass)

LeadGEN Steps 12–13.7. Repeat for every remaining English draft (waves R1–R7). No Urdu pages.

```
Primary keyword → Serper (organic + PAA) → competitor teardown → brief + 3 info-gain
  → app/<slug>/page.tsx → media alts + schema → internal links → audit → status review
```

1. **SERP snapshot** — `python docs/seo-plan/scripts/intel/serper_run.py --queries "<primary>"` (plus 1–2 variants). Note top 10 URLs, winning page type, PAA, gaps. Store in the brief only (never on the live page).
2. **Competitor teardown** — `content-research/competitors/by-category/<topic>/_TOPIC_ANGLES.md` + 2–3 strongest page files; refresh with `intel/26_fetch_competitor_content.py` if stale. Cover angles; **never copy text**.
3. Open **brief** `briefs/<PAGE_ID>.md`. Complete verified-facts table. Gaps: `[NEEDS FACT: …]`.
4. **Outline** = visitor journey + competitor angles we can answer truthfully + **≥3 information-gain** items (LeadGEN golden rule 3).
5. **Draft** `app/<slug>/page.tsx` from facts only (shell: PageShell, early answer, tables, FAQ→JSON-LD, CTA, ContentImage / ImageGallery). Match strong examples: `/lpg-price-in-pakistan/`, `/lpg-cylinders/`.
6. **Humanise:** first-hand specifics; delete filler; no sentence that could sit unchanged on a competitor page.
7. **On-page pass** (section 5) + titles/metas in `data/meta.json` (50–60 / 140–160).
8. **Media** — register in `lib/media.ts`; each image alt describes the image and includes the **primary keyword** only when accurate (LeadGEN 13.7). Unique alt per image.
9. **Schema** matching visible content (section 6).
10. **Internal links:** 2–5 contextual links in/out.
11. **QA** — sibling similarity; `python docs/seo-plan/scripts/18_site_audit.py` (server up). Set status `review` (noindex until publication gate).
12. **Publication gate** (end of brief) → `node scripts/page-status.mjs set <path> approved` then `published` only when Wave 0 blockers are Pass.
13. **Log** in `DECISION_LOG.md`. Request indexing only for money pages.

**Build waves (English drafts):** R1 cylinder SKUs → R2 guides/news/safety depth → R3 commercial/B2B → R4 city hubs (Gate L) → R5 industries → R6 tools/shop/AP → R7 trust leftovers. Finish each wave’s SERP→TSX→audit before the next. Hold thin pages that need stock/projects/Gate L facts.

**Length:** no word-count target (LeadGEN 13.3). Done when every outline question is answered. Guides/safety may run long; price pages stay table-led.

**Coverage (“all angles”):** (1) every secondary intent group on the brief; (2) competitor headings on 2+ sites; (3) what / cost / how / where / risks / next step; (4) real WhatsApp FAQs; (5) link sibling pages instead of duplicating their job.

---

## 5. Keyword placement (every indexable page)

| Place | Rule |
|---|---|
| URL | Fixed in page-map; depth ≤ 3 |
| Title (50–60) | Primary near start; brand last; true hook |
| Meta (140–160) | Phrase once + proof detail + CTA |
| H1 (one) | Primary or close variant; matches title intent |
| First 100 words | Answer first; primary once, naturally |
| ≥1 H2 | Primary or close variant; other H2s are questions |
| Body | Secondaries by intent group; **no density target** |
| Image alt / filename | Describe the image; keyword only if accurate |
| Anchors | Descriptive; never “click here” |
| Never on page | The word “keyword”, competitor names, SERP notes, tool dumps |

After each batch: `python docs/seo-plan/scripts/18_site_audit.py` (server running).

### Title formulas (CTR)

| Kind | Pattern |
|---|---|
| Price flagship | `LPG Rate in Pakistan Today: OGRA Price per kg & Cylinder` |
| City price | `LPG Price in {City} Today: per kg & 11.8 kg Cylinder` |
| City hub | `LPG Gas in {City}: Price Today, Delivery & Supply` |
| Cylinder hub | `LPG Cylinders in Pakistan: Steel & Composite with Gas` |
| Guide | `What Does LPG Stand For? Full Form, Meaning & Uses` |
| Safety | Checklist / steps; “Reviewed by …” only after sign-off |

Shipped bank for all P1 pages: **`P1_TITLE_META_BANK.csv`** (33/33 titles 50–60; 33/33 metas 140–160). Apply into `data/meta.json` before a page leaves `review`. City-hub titles may say “Today” only when that page shows a verified OGRA figure (W0-1 + Gate L); until then keep the page `noindex`.

---

## 6. Schema by page type

| Page type | Types |
|---|---|
| Every page | `Organization`, `WebSite`; `BreadcrumbList` on inner pages |
| `/about/`, `/contact/` | + `LocalBusiness` (Islamabad G-12 only) |
| City / service | + `Service` (+ `FAQPage` if FAQ is visible) |
| Guides / safety | + `Article`; `reviewedBy` only after sign-off |
| Price history (3+ months) | + `Dataset` + CSV distribution |
| Working tools | `WebApplication` optional |
| Appliances with real stock | `Product` with price and availability |
| FAQ markup | For readers; rich results not expected for this site type |

Validate with Google’s Rich Results Test before each publish batch. Schema must match **visible** content (LeadGEN 15.8).

---

## 7. Waves (path to 30K)

### Wave 0 — Owner unlocks (writing may draft; publishing blocked)

Logged as open rows in `DECISION_LOG.md`. Nothing moves to `published` until the relevant row is **Pass**.

| ID | Fact / access | Unlocks |
|---|---|---|
| W0-1 | Verified OGRA notification in `data/prices.json` (per kg, date, source URL, checker) | All price pages |
| W0-2 | Licence scan + digit check vs OGRA register | Licences / trust claims |
| W0-3 | Proof for “OGRA-certified cylinders” | Cylinder / trust claims |
| W0-4 | Original photos (office, marked cylinder, delivery, regulator) | Information gain / media |
| W0-5 | Haroon Rasheed sign-off per safety page + bio consent | SF-001, SF-002, TR-014 |
| W0-6 | 3 partner calls + 1 timed test order (Islamabad, Rawalpindi, Lahore, Karachi) | City hubs (Gate L) |
| W0-7 | Supabase live (`leads.sql` run) | Production leads |
| W0-8 | Search Console + Bing + GA4 id | Measurement / indexing |
| W0-9 | Rotate Serper API key (was shared in chat) | Security |
| W0-10 | Lawyer review of privacy / terms / price advertising | Compliance |

### Wave 1 — Money pages (majority of 30K)

Order from `briefs.csv` `publish_order` / `P1_WRITING_QUEUE.csv` where `wave=1-money` (25 pages), including: PR-001 → PR-002 → PR-003 → CY-002 → HP-001 → DL-008 → CY-001 → DL-001 → trust set → ED-001 → SF-001/002 (after W0-5) → CY-007 → PR-004/005.

### Wave 2 — Depth

Composite cylinder, refill, history, calculator, more guides, dealer page, Gate-L city hubs **one by one** (never a batch of template hubs).

### Wave 3 — Expansion

Directories (near me), services/industries with projects, appliances with stock, remaining cities.

**Batch rule (LeadGEN 22.4):** 10–50 pages; stop if indexing &lt; ~70% after 8 weeks. Sibling text similarity &lt; 0.8.

---

## 8. P1 writing queue

Machine-readable: **[`P1_WRITING_QUEUE.csv`](P1_WRITING_QUEUE.csv)** (33 rows).

| Wave | Pages | Meaning |
|---|---:|---|
| `1-money` | 25 | Write as soon as Wave 0 facts for that page exist |
| `0-hold` | 8 | City hubs + NW-001/002 + AP-002/003 — hold until Gate L / news / stock |

Each row has: `publish_order`, `page_id`, `url`, `brief`, `competitor_folder`, `competitor_angles`, `title_50_60`, `meta_140_160`, `blocker`, `info_gain_ready`.

Regenerate after brief/map changes:

```bash
python docs/seo-plan/scripts/27_build_p1_queue_and_bank.py
```

---

## 9. Measurement (after launch)

| Cadence | Action |
|---|---|
| Weekly | Test lead; Search Console coverage; response time |
| Monthly | OGRA entry; CTR rescue (Step 21.5); orphan/audit crawl; Serper ranks |
| Quarterly | Refresh top pages; prune/merge; portfolio decision (scale/fix/hold/kill) |
| Gate X (month 6–12) | Re-run click model with Search Console actuals; only then revisit 100K |

Setup: domain Search Console, Bing, `NEXT_PUBLIC_GA_ID`, events `generate_lead`, `phone_click`, `whatsapp_click`.

---

## 10. Will not do

- Deceptive clickbait or unverifiable superlatives  
- Thin / template-only city pages  
- Copying text from `content-research/competitors/`  
- Targeting polluted queries (e.g. “lpg engineering services”) or Lever D bill-check for the 30K goal  
- Indexing pages still in `review`  
- Publishing with `[NEEDS FACT]` left on the page  

---

## 11. Commands (quick)

```bash
# from lpg-website/
node scripts/page-status.mjs list review
node scripts/page-status.mjs set /lpg-price-in-pakistan/ approved
python docs/seo-plan/scripts/18_site_audit.py
python docs/seo-plan/scripts/21_build_page_briefs.py
python docs/seo-plan/scripts/22_export_meta_tags.py
python docs/seo-plan/scripts/27_build_p1_queue_and_bank.py
```

---

## 12. Revision

| Ver | Date | Change |
|---|---|---|
| 1.0 | 26 Oct 2026 | First playbook: 30K goal, data map, SOP, schema, waves, P1 queue and title bank |
| 1.1 | 26 Oct 2026 | Reverify: parent v4.3; page-map 137=134+3 MERGED; “Today” publish rule; meta.json synced from bank |
| 1.2 | 27 Oct 2026 | Urdu cancelled (119 English pages); Page Factory SOP (Serper→teardown→brief→TSX→alts); waves R1–R7 |
