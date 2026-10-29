"""Patch: master plan v4.1 -> v4.2 (27 Oct 2026 compliance re-verification against seo-LeadGEN.md).
Idempotent: re-running does nothing once the v4.2 marker is present. Every replacement is asserted.
"""
import re
from pathlib import Path

P = Path(__file__).resolve().parent.parent / "THE_LPG_CO_SEO_MASTER_PLAN.md"
t = P.read_text(encoding="utf-8")
if "<!-- v4.2 -->" in t:
    raise SystemExit("already patched")


def sub(old: str, new: str, count: int = 1) -> None:
    global t
    assert old in t, f"missing anchor: {old[:70]!r}"
    t = t.replace(old, new, count)


def replace_section(heading: str, body: str) -> None:
    global t
    level = len(heading) - len(heading.lstrip("#"))
    assert heading in t, heading
    start = t.index(heading)
    after = start + len(heading)
    m = re.search(r"^#{1,%d} " % level, t[after:], flags=re.M)
    end = after + m.start() if m else len(t)
    t = t[:start] + heading + "\n\n" + body.strip() + "\n\n" + t[end:]


def insert_before(marker: str, block: str) -> None:
    global t
    assert marker in t, marker
    i = t.index(marker)
    t = t[:i] + block.strip() + "\n\n" + t[i:]


# ------------------------------------------------------------------ header
sub("**Plan version:** v4.1 (v3.0 is in `archive/`) <!-- v4.1 -->", "**Plan version:** v4.2 (v3.0 is in `archive/`) <!-- v4.1 --> <!-- v4.2 -->")

# ------------------------------------------------------------------ 9.1 counts
sub("| **P1 launch** | Weeks 1–4 | **32** (22 content and conversion, 10 trust) |", "| **P1 launch** | Weeks 1–4 | **33** (22 content and conversion, 11 trust) |")
sub("| **P2** | Weeks 5–12 | 41 (40 content, 1 trust) |", "| **P2** | Weeks 5–12 | 43 (40 content, 3 trust) |")
sub("131 active pages plus city expansions that clear Gate L. **No hundreds of city or area pages.**",
    "**134 active pages** (P1 33, P2 43, P3 44, P4 14) plus city expansions that clear Gate L. **No hundreds of city or area pages.** TR-013 `/partner-standards/` and TR-014 `/about/haroon-rasheed/` are new trust pages (partner standards and the reviewer's bio, which needs his consent). `/lpg-in-burewala/` (LC-012) joined the map when the owner list showed it as a hub.\n\n"
    "**Built vs planned:** 51 pages are built (all at status `review`, so `noindex`). Four P1 pages are **deliberately not built**: NW-001 shortage tracker and NW-002 supply (they need dated, sourced news items), AP-002 geyser and AP-003 heater (they need real stock, a named supplier and prices). Building them with invented facts would break Golden rule 1.")

# ------------------------------------------------------------------ 10.4 overlap results
insert_before("---\n\n## 11. Page templates and content blueprints",
"""**Result of the test on stored SERPs (27 Oct 2026, `audit/serp-overlap-pairs.csv`, from `21_build_page_briefs.py`).** 78 of 134 pages have a stored SERP. No pair reaches 7 shared URLs (the merge line), so no page is merged. Eighteen pairs share 4–6 URLs. Read by hand:

| Pair | Shared | Decision |
|---|---:|---|
| CY-002 `price of lpg cylinder in pakistan` ↔ CY-003 `lpg 11.8 kg price` | 6 | Keep both **only if** CY-003 carries content the price page does not (size, use, refill, deposit, how long it lasts). Otherwise merge CY-003 into CY-002. Review at publication. |
| PR-001 ↔ CY-003 | 6 | Same: CY-003 must not repeat the price table. Link CY-003 to PR-001 for the rate. |
| NM-004 `lpg companies in pakistan` ↔ ED-010 `licensed lpg supplier` | 6 | ED-010 is a *how to choose* guide, NM-004 a *directory*. Keep apart; ED-010 links to NM-004. |
| NM-004 ↔ BZ-004 `lpg distributor` | 5 | BZ-004 is for people who want to become one. Keep apart. |
| CY-008 `lpg refill near me` ↔ NM-001 `lpg near me` | 5 | Refill page answers "how and where to refill", NM-001 is the directory. Keep apart. |
| PR-001 ↔ CY-002 | 5 | Keep: per-kg rate vs price of a cylinder. Cross-link in the first paragraph. |
| PR-002 ↔ PR-005 (Lahore) | 5 | City price page must show city-specific rows, not the national table again. |
| PR-001 ↔ PR-004 / PR-002 / CY-004 | 4 each | Keep. |
| Other pairs (NM-001/NM-003, DL-008/DL-009, NM-001/BZ-004, CY-003/CY-004, PR-004/CY-002, PR-004/CY-003, BZ-004/ED-010) | 4 | Keep. |

The price cluster is the one to watch: six pages target overlapping SERPs. The defence is distinct jobs (rate, per kg, notification, cylinder cost, size, city) and the hard rule that each page shows only what is its own, linking to the others for the rest. Re-run the test after each Serper refresh.""")

# ------------------------------------------------------------------ 11.3 stale starter-brief statements
sub("Primary \"lpg rate in pakistan\" with 50+ mapped variants. Title `LPG Rate in Pakistan {Mon YYYY}: Price per kg & Cylinder` (54 characters).",
    "Primary \"lpg rate in pakistan\" with 50+ mapped variants. Title `LPG Rate in Pakistan Today: OGRA Price per kg & Cylinder` (56 characters; \"today\" matches how people search and does not need a monthly edit; a month is added only where the page is rebuilt each month).")
sub("`Dataset` schema, `Article` with a named author, ISR with revalidation when a notification is saved.",
    "`Dataset` schema once 3+ months of history exist (not before). No `Article` markup until a named author is shown. ISR with revalidation when a notification is saved.")
sub("Title pattern `LPG Gas in Karachi: Cylinder Price, Delivery, Dealers` (52 characters).",
    "Title pattern `LPG Gas in {City}: Price Today, Delivery & Supply` (built as shipped; the template drops words to stay within 50-60 characters for long city names).")
sub("Titles and meta tags for 10 P1 pages are in `meta-tags-p1.csv` (titles 50–60 characters, meta 140–156).",
    "Titles and meta descriptions of every built page are in `meta-tags.csv`, regenerated from the running site by `22_export_meta_tags.py` (51 of 51 within 50–60 and 140–160 characters). The old `meta-tags-p1.csv` was wrong (hub metas claimed a delivery charge) and is archived.")

# ------------------------------------------------------------------ 11.5 / 11.6 writing standard + briefs
insert_before("---\n\n## 12. Content production system",
r"""### 11.5 Writing standard (every page) *(Steps 13.3–13.9, 15.8)*

This is the rule set the briefs apply. It exists so that "how to write each page" is a document, not a habit.

**A. Order of work for one page.** Read the live SERP and three competing pages → fill the brief and the verified-facts table → outline around the visitor's journey → draft from the facts table only → add the 3+ information-gain items → fact-check each claim → humanising edit (below) → on-page pass (placement table) → schema → reviewer → publication gate → publish and log.

**B. Where the primary keyword goes (and where it does not).** Natural language, no density target (Step 13.7).

| Place | Rule |
|---|---|
| URL | Short, lowercase, hyphens, set once, depth ≤ 3. |
| Title (50–60 characters) | Primary phrase near the start, unique, brand last. |
| Meta description (140–160) | The phrase once, a reason to click, a true detail, a CTA. Not a ranking factor; it earns the click. |
| H1 | One only. Contains the primary phrase or a close variant and matches the title's intent. |
| First 100 words | Answer the query and use the phrase once, naturally, in the first two sentences. |
| H2/H3 | At least one subheading carries the phrase or a close variant. The others state what the section answers. Never repeat the exact phrase in every heading. |
| Body | Secondary terms grouped by intent (price, order, delivery, size, safety, place, Urdu) are used where they read naturally. |
| Image alt and filename | Alt describes the image for someone who cannot see it; the keyword only if it truly describes the image. Filenames descriptive: `lpg-rate-in-pakistan-monthly-chart.webp`. |
| Internal anchors | Descriptive and varied (page name, partial match, natural phrase). Never "click here". |
| Not used | Meta keywords, hidden text, keyword lists in the footer, the phrase forced into every paragraph, "LSI keyword" counts. |

**C. What "100% covered from all angles" means here.** It is a checklist, not a length. A page is complete when each of these is true, and the brief records each:

1. Every keyword group in the page's cluster has a home on the page, or a link to the page that owns it.
2. Every subtopic that appears on competitor pages of **two or more** different sites (the brief's boilerplate-filtered list) is answered, or deliberately left out with a reason.
3. The six angles of the visitor's intent are addressed, each by a fact, an example or an action: **what it is · how much it costs · how to do or order it · who or where · risks and rules (OGRA, safety) · what to do next.**
4. Questions the team hears on calls and WhatsApp are answered (there are no People Also Ask boxes for these queries in Pakistan).
5. Angles that belong to another page are linked, not copied (the cannibalisation rule).

**D. Length policy.** Google has no preferred length, and a keyword word-count target is not used (Step 13.3). The brief shows the competitor range from the crawl for reference. For **scheduling writers only**, expected finished shapes are: price pages short and table-led (the table, worked examples, the sourcing note); city hubs about 400–800 words of unique local facts; guides and safety pages about 800–1,500 words with tables and a diagram; service pages as long as the process, scope and real project need. A page that is short because it has no facts stays **in review** (that is the correct state for most hubs today). A page is not padded to look long.

**E. Humanising: an expert edit, not a rewrite tool.** The goal is accurate and useful (Step 13.5), not text that "passes a detector". AI drafts are allowed only from the facts table, and a person edits every page. The edit pass:

1. Add first-hand specifics from the team using the brief's question list (a real call, a measured time, a photo, a mistake customers make). This is the single biggest quality lever.
2. Delete any sentence that could appear on a competitor's page unchanged.
3. Cut filler: openers like "In today's world", "it is important to note", "whether you are X or Y", "look no further", stacked adjectives, and "comprehensive/ultimate guide".
4. Replace claims with the thing that proves them: a number, a date, a document, a photo.
5. Vary rhythm: short sentences for facts, a longer one only to explain. One idea per paragraph (1–3 sentences).
6. Read it aloud once, and once on a phone.
7. Explain every technical term the first time (OGRA, deposit, regulator, kg vs litres).

**F. Readability and format (Step 13.6).** Answer first. Steps in numbered lists. Prices, sizes and comparisons in HTML tables (not images). Descriptive H2s in order, H3 only under an H2. Bold only key facts. Plain-language target about grade 8–10 (heuristic; the audit reports the grade for every page and flags above 12). CTA visible near the top and repeated after key sections on service pages.

**G. Media (Step 13.9).** Original photos and data only; no stock photos presented as our work or as workers. Compressed WebP or AVIF, explicit width and height, lazy-load below the fold only. A visual wherever it explains (a size comparison, a regulator photo, a chart), not on a timer. Default social card ships as `app/opengraph-image.tsx`; price pages get their own monthly card later.

**H. External links (Step 13.8).** Link out only where it helps or backs a claim: OGRA notifications, official rules, standards. Never to competitors for money terms. `rel="sponsored"` or `ugc` where applicable.

**I. Schema per page type (Step 15.8).** Section 14.2. Markup describes only visible content. FAQ markup is written for readers, because Google now limits FAQ rich results to a few site types.

**J. Urdu and Roman Urdu (the 15 UR pages, Step 11.5.2).** Written by the Urdu writer, not machine-translated; search terms in Urdu script and Roman Urdu are researched separately. Safety content in Urdu is reviewed by Mr Rasheed. `/ur/…` URLs, `lang="ur-PK"`, `dir="rtl"`, a readable Nastaliq-capable font, hreflang `en-PK` ↔ `ur-PK` pairs. Roman Urdu appears only where users search it (an H2 or FAQ such as "aaj ka rate"), with the writer confirming spelling.

**K. Facts and claims.** Nothing outside the verified-facts table appears on a page. Gaps are written `[NEEDS FACT: …]` and block publication (section 11.4). The brief lists each page's "must not claim" items.

### 11.6 The page briefs are generated for every page *(Step 12)*

`scripts/21_build_page_briefs.py` writes **134 briefs** to `briefs/` (index in `briefs/INDEX.md`, summary in `briefs.csv`) from the page map, keyword master, stored SERPs, the competitor crawl, the site audit and the site's data files. Each brief has: searcher's task · keyword cluster grouped by intent · what ranks now (domain, page type, title) · the cannibalisation test · competitor subtopics (boilerplate removed) · first sentence · heading outline · entity checklist · information-gain items with **ready or needs-data status** · a verified-facts table with the status of each fact · must-not-claim list · voice rules · questions to ask the team · CTA, media and length notes · keyword placement with the real title and meta · internal links out and today's inbound links · the publication gate.

Today: 78 briefs have a stored SERP, 24 have competitor pages to tear down, and 15 carry an overlap flag. A brief that says **"Blocked for publish: fewer than 3 information-gain items"** is the honest status of most pages and tells the owner which fact or photo unlocks it. A blank form for a new page is `templates/PAGE_BRIEF.md`. Re-run the generator after every audit or data change; it overwrites the briefs, so keep manual notes in the page's own change log, not in the brief file.""")

# ------------------------------------------------------------------ 12 workflow link
sub("**Prompts by task** (from the master reference):",
    "**Where the brief lives:** `briefs/<PAGE_ID>.md` (section 11.6). Writers start there, not from this plan.\n\n**Prompts by task** (from the master reference):")

# ------------------------------------------------------------------ 14.1 / 14.2 / 14.4
sub("### 14.1 The current scaffold needs to change", "### 14.1 What is built (site scaffold)")
replace_section("### 14.1 What is built (site scaffold)", r"""
**Done 26–27 Oct 2026.** `lpg-website/` was a UAE starter ("GasLine LPG", 8 UAE cities). It is now THE LPG CO. PAKISTAN. `tsc` is clean, `next build` passes, and `18_site_audit.py` crawls every built page against the method (0 fix items). Pages built: 51 (all `review`, so `noindex` until the owner publishes them).

| Area | What is built |
|---|---|
| Brand and locale | THE LPG CO. PAKISTAN, thelpgco.pk, `en-PK`, PKR, Pakistan phone validation (mobile and landline, normalised to +92). No UAE text remains. Licence, phone, office and reviewer come from `lib/site.ts`. |
| URL tree | Trailing slashes. `/lpg-in-{city or province}/` through one dynamic route and a rewrite. Price family, cylinders, delivery, order, `/services/` and 8 service pages, trust pages, safety, network, distributor, what-is-lpg. Old `/cities`, `/get-quote`, `/safety` redirect (308). |
| **Page registry** (new) | `data/pages.json`: every page in `page-map.csv` with `status` (draft → review → approved → published), `built` and `lastmod`. Only `published` pages can be indexed or enter the sitemap. Built pages are `review`, unbuilt are `draft` and cannot rise. Managed with `node scripts/page-status.mjs list|set`. Generated by `20_build_page_registry.py` (keeps existing statuses). |
| Gates in code (on top of the registry) | Price pages: noindex until `data/prices.json` has a verified entry. City hubs: until `data/city-overrides.json` says `indexable`. Service pages: until `data/projects.json` has a project with consent. Safety pages: no "reviewed by" line until `data/safety-review.json` holds that page's sign-off. **A page is indexable only when its status is `published` AND its data gate is open.** The sitemap follows the same rule. |
| Metadata | One source of truth: `data/meta.json` (34 static paths) plus `fit()` templates for hubs, price-city and services. `meta()` throws at build if a path has no entry. Titles 50–60 and meta 140–160 on all 51 built pages (`meta-tags.csv`). No site-wide canonical or robots default (each page sets its own). Default Open Graph card (`app/opengraph-image.tsx`) and favicon (`app/icon.tsx`). |
| Honesty in code | No price without a source and a verified date. No delivery time unless measured. Partner counts only, no names or numbers. Review date only after sign-off. Hub metas make no delivery-charge claim. |
| Leads | One form, nine request types. Honeypot, rate limit, consent required. Each lead stores `page_id`, consent text **version** and time, UTM and referrer, request type and `kind`, plus funnel fields (first contact, accepted, order). `supabase/leads.sql` rewritten to match (not yet run). Production without Supabase returns 503 by design. |
| Conversion and tracking | Header call and WhatsApp, mobile bottom bar, `TrackedLink` on every contact link, `generate_lead`, `phone_click` and `whatsapp_click` events, GA4 loader that sends nothing until `NEXT_PUBLIC_GA_ID` is set. |
| Schema | Section 14.2. |
| Internal links | Contextual links between related pages; short footer (company, trust pages, partner standards); no footer city lists. The audit counts inbound body links per page. |
| Tools | `18_site_audit.py` (crawl and score every page), `21_build_page_briefs.py` (134 briefs), `22_export_meta_tags.py`, `scripts/page-status.mjs`. |

**Not built yet:** `/ur/` and hreflang, the calculators and other tools, `/shop/`, appliance and industry pages, `/lpg-near-me/`, NW-001, NW-002, AP-002, AP-003 (need sourced facts), Search Console and Bing verification files, split sitemaps, a Lighthouse run on a mid-range Android profile, original photos and per-page social cards, Supabase connection, call tracking number.
""")

sub("### 14.2 Schema", "### 14.2 Schema (what is emitted today, and the rule)")
replace_section("### 14.2 Schema (what is emitted today, and the rule)", r"""
Rule *(Step 15.8)*: markup must describe **visible, true** content. FAQ markup is written for readers, since Google shows FAQ rich results only for a few site types. Reviews are never marked up unless genuine and visible. Validate with the Rich Results Test and the Schema Markup Validator before each batch.

| Page | Types emitted now | Notes |
|---|---|---|
| Every page | `Organization`, `WebSite` (layout) · `BreadcrumbList` on inner pages | |
| Home | + `FAQPage` | Reader-facing FAQ |
| `/about/`, `/contact/` | + `LocalBusiness` (Islamabad G-12 address) | **Only these two**: the one real premises. Hubs never get `LocalBusiness`. |
| City, province and service pages | + `Service` (+ `FAQPage` where an FAQ is shown) | Area served = the real coverage; no invented offices |
| Guides and safety (3 built) | + `Article`; `reviewedBy` / `dateModified` appear only after the safety sign-off exists | Author is the editorial team until a named author consents |
| Price pages | No `Dataset` yet | Added when 3+ months of history exist, with the CSV as a distribution |
| Tools | `WebApplication` optional, only when the tool works | None built |
| Products and appliances | `Product` with real price and availability | Only when the shop has real stock |
""")

replace_section("### 14.3 On-page rules", """
Titles 50–60 characters, primary phrase first, brand last · meta 140–160 · one H1 · H2s that state what each section answers · descriptive alt text · self-referencing canonical · Open Graph title, description and image · no stuffing. The full placement table is section 11.5-B.

---
""")

insert_before("---\n\n## 15. Conversion and lead operations",
r"""### 14.4 Technical and indexing decisions *(Steps 15.2–15.9, 19, 21.1)*

| Topic | Decision |
|---|---|
| **Sitemap** | Lists only indexable pages (status `published` and data gate open). `lastmod` is the real change date from the registry. No `priority` or `changefreq` (Google ignores them). Large batches later: split by section. |
| **robots.txt** | `Allow /`; disallow `/api/` and the internal `/lpg-hub/` path (the public URLs are the `/lpg-in-…/` rewrites). Sitemap URL listed. Not used to hide pages: unpublished pages carry `noindex` instead. |
| **Canonical and robots meta** | Every page sets its own self-referencing canonical and `index` or `noindex` through `meta()`. |
| **Search Console and Bing** | Verify the domain property and Bing before the first publish; submit the sitemap; IndexNow for price changes. Request indexing for a few important pages only. |
| **GA4** | `NEXT_PUBLIC_GA_ID` loads it. Key events: `generate_lead` (form), `phone_click`, `whatsapp_click`. Mark `generate_lead`, `phone_click` and `whatsapp_click` as key events. |
| **Attribution** | UTM and referrer captured on the form, stored with the lead with `page_id`. WhatsApp links carry a prefilled message that names the page, so the first message identifies the source. |
| **Call tracking** | Not adopted yet. The licence-listed number stays the single public number. Option when volume justifies it: a dynamic number for ads only, never replacing the licence number on trust pages. Until then count `phone_click` events. |
| **Core Web Vitals** | Targets LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 on a mid-range Android profile. No third-party script except GA. Images set width and height. Check PageSpeed and field data (CrUX) monthly after launch. Not yet measured on real devices. |
| **Cookies and consent** | GA4 is loaded only when an ID is configured. Whether a consent banner is needed for Pakistan, and the wording of the privacy policy, are questions for the lawyer (section 2.4). Form consent text is versioned and stored with each lead. |
| **AI crawlers** | Search and citation bots (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot) are allowed, because being cited is part of the plan (section 17.4). Training-only crawlers (GPTBot, CCBot, Google-Extended) are an owner decision; blocking them has no effect on Google Search ranking. `llms.txt` is **not** adopted: no major search engine documents using it. |
| **hreflang** | Added only when the Urdu pages exist, as `en-PK` ↔ `ur-PK` pairs with self-reference. |
| **Security** | `SERPER_API_KEY` only in `.env.local` (git-ignored) and read from the environment; never in code, docs or logs. Rotate it, since it was shared in chat. Leads API: honeypot, rate limit, validation. |
""")

# ------------------------------------------------------------------ 16 internal linking
sub("- Monthly orphan crawl.",
    "- **Footer:** short and fixed (company, trust pages, partner standards, contact). No city or keyword lists in the footer.\n"
    "- **Contextual links carry the weight:** inside body text, with descriptive anchors. The audit reports inbound body links per page; a built page with none is an orphan and is fixed.\n"
    "- **Two-way price cluster:** PR-001, PR-002, PR-003, CY-002 and the city price pages link to each other in their first paragraph, because their SERPs overlap (section 10.4).\n"
    "- **New page checklist:** 2–5 inbound contextual links added on the day it goes live, from the parent, two siblings and a relevant guide.\n"
    "- Monthly orphan crawl (`18_site_audit.py` does it).")

# ------------------------------------------------------------------ 17.4 AI search
sub("Put a clear answer block and a dated, sourced table at the top of each price page. Decide per bot in `robots.txt`.",
    "Put a clear answer block and a dated, sourced table at the top of each price page. Bot decisions are in section 14.4.")

# ------------------------------------------------------------------ 19.x maintenance, diagnostics, CTR, portfolio
insert_before("---\n\n## 20. Risks",
r"""### 19.1 Maintenance, refresh and pruning *(Step 23)*

| Cadence | Tasks |
|---|---|
| **Weekly** | Send a test lead end to end (form → database → notification). Check lead response time. Uptime alert. Partner issues. |
| **Monthly** | **Enter the OGRA notification and verify it; update every price page** (the stale banner appears after 35 days). Search Console coverage and errors. `18_site_audit.py` for broken links, orphans, title and meta lengths. Rankings from Serper. AI-citation check of 10–20 questions. Reflect partner changes on hub pages. |
| **Quarterly** | Refresh top pages (prices, partner counts, facts, photos). Prune or merge weak pages. Review titles on low-CTR pages. Update seasonal content ahead of winter. Re-run the overlap test (section 10.4). |
| **Yearly** | Full technical audit. Privacy, terms and compliance review with the lawyer. Backup restore test. Re-verify partner licences. |
| **Event-driven** | Core update (wait, compare, then act). OGRA notification outside the cycle. Partner leaves a city (update coverage). Rule change (update pages and the consent text version). |

**Pruning decision tree** (pages still weak after 6+ months): (1) Does it serve a need we can fulfil? If not, remove (410), or 301 to the closest page if it has links. (2) Impressions but low CTR → rewrite title and intro. (3) Ranking 11–30 → add information gain and internal links. (4) No impressions or links and it overlaps a stronger page → merge and 301. (5) Useful for navigation only → `noindex`. After an algorithm update, wait, compare affected and unaffected pages, then make pages more useful; never mass-rewrite.

### 19.2 Diagnostics *(Step 21.3)*

| Symptom | Investigate |
|---|---|
| Discovered, not indexed | Internal links, site quality signals, crawl priority |
| Crawled, not indexed | Duplication, thin or undifferentiated text (typical for template hubs), page quality |
| Indexed, no impressions | Real demand (many volumes are the tool's floor of 10), relevance, links |
| Impressions, low clicks | Title and snippet, true position, intent mismatch, AI Overview or `ogra.org.pk` above us |
| Stuck at 11–30 | Gaps against the top 3, information gain, authority |
| Traffic, no leads | Offer, form, tracking, WhatsApp response time |
| Leads suddenly zero | Broken form or tracking: send the test lead immediately |
| Leads, no orders | Qualification, partner response time, price |
| Many similar pages ignored | Template similarity; release fewer, better pages |

### 19.3 CTR and ranking improvement *(Step 21.5)*

Monthly, from the Search Console page export: pages with average position ≤ 15 and impressions above the site's CTR baseline for that position band are flagged. Open each page's queries, compare with the live SERP, rewrite the title and description using only true facts (a number only if real; "reviewed by" only if signed off; a year only if the content was updated for it), and for positions 8–20 also add information gain and internal links. Log the change date. Change one thing at a time and judge after 4 weeks, aligned to weekdays. Do not rewrite pages that already perform.

### 19.4 Portfolio decisions *(Step 24, one site)*

Reviewed monthly on a scorecard: indexed pages, impressions trend, clicks, leads, accepted leads, orders, partners per city, AI referrals.

| Situation | Decision |
|---|---|
| Accepted leads and margin growing | **Scale:** next batch, next city (only if the earlier cities are served on time) |
| Impressions growing, few leads | **Fix conversion** (form, WhatsApp, offer) |
| Leads, low acceptance | **Fix qualification or partner fit** |
| Indexed but negligible impressions after about 6 months | **Reassess** differentiation, merge or hold |
| Not indexing after fixes, or negative economics after 9–12 months | Cut the page set, or reconsider the project. The time frames are starting assumptions. |

**Batch release** *(Step 22.4)*: pilot with the P1 set (33 pages), then 10–50 pages per batch; measure indexing after 4–8 weeks; stop and fix when it is below about 70%. **Publishing order** follows the priority score in `briefs.csv` (revenue or safety value first, then demand floor, then readiness): flagship price, per-kg, OGRA, cylinder pages, trust pages, safety (after sign-off), then the hubs that clear Gate L. Never publish template hubs as a batch.
""")

# ------------------------------------------------------------------ 22 commands
sub("# site (from lpg-website/)",
    "python docs/seo-plan/scripts/18_site_audit.py      # crawl the running site; writes audit/*\n"
    "python docs/seo-plan/scripts/21_build_page_briefs.py  # 134 briefs, overlap pairs\n"
    "python docs/seo-plan/scripts/22_export_meta_tags.py   # meta-tags.csv from the running site\n"
    "python docs/seo-plan/scripts/20_build_page_registry.py # rebuild data/pages.json (keeps statuses)\n"
    "# site (from lpg-website/)\n"
    "node scripts/page-status.mjs list review           # which pages are in which state\n"
    "node scripts/page-status.mjs set /lpg-safety/ approved   # one step at a time up the ladder")

# ------------------------------------------------------------------ 24 open decisions
sub("12. Whether to add a Multan partner and recruit in AJK, GB and Balochistan",
    "12. Whether to add a Multan partner and recruit in AJK, GB and Balochistan\n"
    "13. A GA4 measurement id, Search Console and Bing access\n"
    "14. Which pages the owner approves for `published` first (section 19.4 gives the order), and who signs each\n"
    "15. Whether to block training-only AI crawlers (section 14.4)\n"
    "16. Real photos: warehouse or yard, cylinders with markings, a delivery, a regulator and hose\n"
    "17. Whether CY-003 (11.8 kg) stays a separate page (section 10.4)")

# ------------------------------------------------------------------ revision log
t = t.rstrip() + r"""

---

## 27. Revision log: v4.1 to v4.2 (27 Oct 2026): re-verification against the method

The owner asked for every page's writing, keyword placement, topical coverage, humanising and schema to be checked against `seo-LeadGEN.md`. The full matrix is `COMPLIANCE_CHECK.md`.

| Change | Reason |
|---|---|
| Added the writing standard (11.5) and per-page briefs (11.6) | The v4.1 plan had blueprints but no rule for keyword placement, coverage, length, humanising, Urdu or media |
| Page registry with a status ladder (14.1) | Nothing may be indexed until a human approves it; every built page was indexable by default |
| Metadata moved to `data/meta.json` | Titles and metas were scattered, and several were stale or duplicated |
| Hub titles and metas stopped claiming a delivery charge | Unverified claim (Golden rule 1) |
| Safety pages no longer say "reviewed" before sign-off | Claim without evidence |
| Schema rules rewritten (14.2); `LocalBusiness` only on `/about/` and `/contact/` | Schema must match visible content and real premises |
| Lead record now carries `page_id`, consent version, UTM and funnel fields | Step 14 and 20 attribution |
| GA4 events and attribution (14.4) | Step 21.1 |
| Overlap test run on stored SERPs (10.4) | Step 8.2; found the price-cluster overlap and CY-003 risk |
| Maintenance, diagnostics, CTR, pruning and portfolio rules added (19.1–19.4) | Steps 21–24 were missing |
| Page counts corrected to 134 (9.1); new trust pages TR-013 and TR-014 | Plan said 131 |
| Four P1 pages recorded as deliberately unbuilt | They need sourced facts |
| `meta-tags.csv` regenerated from the running site | Old CSV did not match the site |
| Favicon and default Open Graph image added | Step 13.7 lists Open Graph; the site had neither |
| Audit tokenizer improved (plurals, "near", "1 kg") | False positives |
"""
P.write_text(t, encoding="utf-8")
print("plan patched to v4.2:", len(t), "chars")
