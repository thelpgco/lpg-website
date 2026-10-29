"""One-off patch: plan v4.0 -> v4.1 (owner facts of 26 Oct 2026, tools built, site converted).
Idempotent: re-running does nothing once the v4.1 marker is present.
"""
import re
from pathlib import Path

P = Path(__file__).resolve().parent.parent / "THE_LPG_CO_SEO_MASTER_PLAN.md"
t = P.read_text(encoding="utf-8")
if "<!-- v4.1 -->" in t:
    raise SystemExit("already patched")


def replace_section(text: str, heading: str, body: str) -> str:
    """Replace everything under `heading` up to the next heading of equal or higher level."""
    level = len(heading) - len(heading.lstrip("#"))
    start = text.index(heading)
    after = start + len(heading)
    m = re.search(r"^#{1,%d} " % level, text[after:], flags=re.M)
    end = after + m.start() if m else len(text)
    return text[:start] + heading + "\n\n" + body.strip() + "\n\n" + text[end:]


def insert_before(text: str, marker: str, block: str) -> str:
    i = text.index(marker)
    return text[:i] + block.strip() + "\n\n" + text[i:]


# ---- header / section 0
t = t.replace("**Plan version:** v4.0 (v3.0 is in `archive/`)", "**Plan version:** v4.1 (v3.0 is in `archive/`) <!-- v4.1 -->")
t = re.sub(
    r"1\. \*\*Gate 0 is mostly closed\.\*\*.*?See section 2\.",
    "1. **Gate 0 is mostly closed.** You are an OGRA-licensed marketer/distributor, a reseller and a referral partner, with a network of distributors who deliver. On 26 Oct 2026 you supplied the licence number, phone and WhatsApp, the Islamabad office, a named safety reviewer and your real distributor list. What is still open is evidence and operations, not facts (section 2.2).",
    t,
    flags=re.S,
)

# ---- 2.1 answers: add rows
t = t.replace(
    "| 8 | Ahrefs or Semrush | No | Replacement stack in section 5.1. |",
    "| 8 | Ahrefs or Semrush | No | Replacement stack in section 5.1. |\n"
    "| 2 | OGRA licence number | **09024041999** | Shown in the site footer and on `/licences-and-compliance/`. Re-check the digits against the licence document before launch. |\n"
    "| 4 | Phone and WhatsApp | **+92 306 9701659** (same number) | In `lib/site.ts`. Call and WhatsApp buttons and the mobile bottom bar use it. |\n"
    "| 5 | Physical outlet | **Office #99, Service Road, Sector G-12, Islamabad** | An office, not a depot or shop. Google Business Profile only if Google's rules for an office or service-area business fit (section 17.3). |\n"
    "| 7b | Safety reviewer | **Haroon Rasheed**, 12+ years in the field | Byline is live. The **review date appears only after he signs off** (`data/safety-review.json`). |\n"
    "| new | Cylinders | \"Each cylinder is OGRA certified\" | Stated on the site. Keep proof on file (section 2.3). |\n"
    "| new | Distributor list | `LPG_dealers_all_regions.xlsx` is your **real network** | Replaces the Maps data as the source of truth (section 4.2). |\n"
    "| new | Engineering | \"All engineering services, nationally, our own team of experts\" | Service pages are built. They stay `noindex` until one real project is recorded (`data/projects.json`). |\n"
    "| new | Serper API key | Supplied | Stored only in `.env.local` (git-ignored). **It was pasted into chat, so rotate it** after the first runs. |",
)

# ---- 2.2 still open
t = replace_section(
    t,
    "### 2.2 Still open",
    """
Facts are in. What remains is evidence, access and operations.

| # | Item | Needed by | Why |
|---|---|---|---|
| 1 | **Licence document:** class, validity date, legal name, NTN, registered address. Keep a scan on file. | Before launch | The number is on the site. Schema, legal exposure and trust all depend on it matching the document. |
| 2 | **Proof that cylinders are OGRA-certified:** photo of the marking per size, any certificate IDs. A written term that **every partner supplies only certified cylinders** | Before launch | The claim is public. A partner who delivers an uncertified cylinder makes it false. |
| 3 | **Haroon Rasheed:** his written OK to be named, a short bio and credentials, and a sign-off on the safety pages | Before safety pages are treated as reviewed | Set `reviewedOn` in `data/safety-review.json` only after he has read them. |
| 4 | **Hours, delivery charges, email address** | Before launch | Facts table. The site never invents these. |
| 5 | **Emergency numbers by province** (confirm each) | Before the smell-gas page lists numbers | Currently says "your local emergency or fire service". No number is published until confirmed. |
| 6 | **One real engineering project** (title, city, year, photos, client consent), and which services your team carries out itself | Before service pages are indexed | `data/projects.json` is empty, so the pages are `noindex`. |
| 7 | **A monthly OGRA price entry** in `data/prices.json`, checked against the OGRA notification | Before price pages are indexed | OGRA's notification list is not in the server-rendered page, so I did not scrape or guess a number. 3 minutes a month. |
| 8 | **Test orders with measured time**, and 3 verification calls per hub city | Gate L, per city | Unlocks `indexable` per city in `data/city-overrides.json`. |
| 9 | **Partner consent to be listed** (name, number) | Before `/lpg-near-me/` | The site publishes counts only. |
| 10 | Budget, team size, who answers leads | Before roadmap dates are fixed | Sets weekly page output. |
| 11 | **Supabase project** (for leads and the `intel` schema), **Search Console and GA4** for thelpgco.pk, a **Google Ads account** for Keyword Planner | Before launch | Without Supabase, production refuses to take leads (by design). |
| 12 | Lawyer review of privacy, terms and the questions in section 2.4 | Before launch | Drafts are in the site. |
""",
)

# ---- 2.3 claims register
t = replace_section(
    t,
    "### 2.3 Claims register: nothing below goes live until its evidence exists",
    """
| Claim | Status on 26 Oct 2026 | Evidence still needed | Wording on the site |
|---|---|---|---|
| "21 years of experience" | **Not on the site** | Registration year, a company document, 2-3 references | Left out |
| OGRA-licensed marketer/distributor | **Live** (number 09024041999) | Scan of the licence, class, validity | "OGRA licence no. 09024041999" in the footer and licences page |
| "Each cylinder is OGRA-certified" | **Live** (owner statement) | Marking photos, certificate IDs, a partner term | "We supply OGRA-certified cylinders. Check the marking on delivery." |
| "We serve every city" | **Not on the site** | A live partner and a test order in each city | "Strongest in {hub cities}. Other areas: send a request and we say whether we can reach you." |
| "1000s of distributors" | **Replaced by real counts** from your list | None | "347 gas supply partners, 104 auto-LPG partners, 51 cities" (counts only) |
| "Delivery within an hour" | **Not on the site** | Order logs with a measured median per city | "Delivery time depends on your area. We confirm it when you order." A measured time appears per city only when you enter it |
| Engineering services nationally | **Pages built, `noindex`** | One real project, plus a named executor (your team: done) | Scope and process only. No project claims |
| Composite cylinders with gas | **Generic text only** | Supplier, specifications, weights | General properties only (lighter, no rust, translucent) |
| Safety reviewer | **Name and experience live** | His sign-off | No review date until `reviewedOn` is set |
| Company file: "I reviewed Pak Engineering, Imperial Gases..." | Research note | n/a | Never present other companies' work as yours |
""",
)

# ---- 4.2b owner network
t = insert_before(
    t,
    "### 4.3 How the dealer data is used",
    """
### 4.2b Your own distributor list is now the source of truth (26 Oct 2026)

You confirmed that `LPG_dealers_all_regions.xlsx` holds your real distributors, all of whom take orders from you. The site now counts from this file (`15_export_site_data.py` writes `data/network.json`, counts and area names only).

| Measure | Value |
|---|---:|
| Unique partners (482 rows, 30 duplicate phones removed) | **452** |
| Gas supply partners (dealers and review cases) | **347** |
| Auto-LPG conversion partners | **104** |
| Cities in the 250-city master with at least one partner | **51** |
| Cities with 5+ gas supply partners (hub threshold) | **9** |
| By region (gas supply / auto-LPG) | Sindh 137 / 47 · Punjab 91 / 14 · ICT 46 / 14 · KP 39 / 21 · Balochistan 12 / 4 · **AJK 2 / 2 · GB 2 / 2** |
| Hub cities | Karachi 121 · Islamabad 46 · Lahore 33 · Rawalpindi 15 · Peshawar 12 · Hyderabad 8 · Faisalabad 6 · Quetta 6 · Burewala 5 |

**What this means.** The network is real and concentrated: Karachi alone is 35% of supply partners. **AJK and GB have two each**, so the site cannot say "we serve all of Pakistan within an hour". It says where the network is strong and invites partners elsewhere. **Multan** (a large city) has one partner in your list, below the hub threshold of five, so it has no hub until you add more.

Partner phone numbers stay private. `partners_master.csv` marks everyone in your list as `active (owner-confirmed)` with `consent_to_list = none`, until each partner agrees to be named.
""",
)

# ---- 5.5 what the first runs found (inserted before section 6)
t = insert_before(
    t,
    "## 6. Scope: what the company file adds, and what the data says about each part",
    """
### 5.5 What the first runs found (26 Oct 2026)

**Tools built** (`scripts/intel/`): `serper_run.py` (key from `.env.local`, skips stored queries, stops on 401/402/429), `crawl.py` (robots.txt, 2 s delay, sitemap then links, change hash), `analyze.py` (domain share, city weakness, automatic SERP-overlap clustering, reports). Storage is a local SQLite file, `docs/seo-plan/intel/intel.db`, with the same tables as `supabase/intel.sql`.

**Serper:** waves 0 and 1 are stored. **478 queries, 478 credits, 0 failures.** Wave 2 (280), autocomplete (about 660) and wave C are not yet run.

| Finding | Evidence | What changes |
|---|---|---|
| **#1 for the head price keyword is not winnable.** `ogra.org.pk` ranks #1 for "lpg rate in pakistan", "lpg prices in pakistan" and "lpg 1kg price today pakistan". | Top 5 for "lpg rate in pakistan": OGRA, PSO, CEIC, Facebook, sui-gas.pk | Target **top 3-5** with fresher, clearer, city-aware price pages that cite OGRA. Do not model #1 CTR on price keywords. |
| **Facebook is a top-5 result on about 1 in 5 city queries** (and 303 of the wave 0 results). YouTube is second. | Wave 1: 20% of top-5 slots are Facebook | City SERPs are weak: a proper site page can enter the top 5. Also means Facebook pages and YouTube are channels, not only competitors. |
| **The real competitors are not the list you gave.** 20 competitor-type domains rank. The most frequent: noorlpg.com, cylin.com.pk, ssgclpg.com, burshane.com, burhangas.com, ppgl.com.pk. Dedicated LPG sites you did not list also rank: lpgpriceinpakistan.com, maxgas.pk, tezgas.pk, lpgshop.pk, supergas.com, sarhadgas.com, loralailpg.com.pk. | `serp_domain_share.csv` | Add these to the crawl (`crawl.py --from-serp`). `lpgpriceinpakistan.com` is a direct rival for the price pages. |
| **Google Pakistan returns no People Also Ask, related searches, answer boxes or map packs** for the queries tested. Only organic results come back. | 4,700 organic rows, 0 PAA, 0 related, 0 places | The "PAA as FAQ source" step is dropped. FAQ ideas come from autocomplete, the crawl and your phone and WhatsApp questions. `/places` is a separate endpoint if wanted. |
| **Near-synonym queries mostly have different SERPs.** Only 4 merge groups at 70%+ overlap in 238 queries (for example "lpg stands for / lpg stand for / lpg gas stands for"). 92 pairs overlap by 40% or more, and those below 70% need a hand read. | `serp_clusters.csv` | Do not merge by keyword resemblance alone. The 40-69% pairs need a hand read before merging. |
| City SERPs are weakest in smaller northern and frontier cities (Kohat, Chitral, Skardu, Chaman, Chilas) | `city_serp_weakness.csv` | These cities are the weakest SERPs and the **thinnest supply** (section 4.2b). Recruit partners first. |

**Competitor crawl:** run on the 8 owner-listed domains, politely. A dry run of sitemaps found about **436 pages** (cylin.com.pk 144, noorlpg.com 139, ppgl.com.pk 129), more than the 250 estimated earlier. Pages that returned almost no text are flagged `needs_js` and need Playwright (not installed). Final counts are in `intel/reports/SUMMARY.md`.
""",
)

# ---- 7.5 launch order
t = replace_section(
    t,
    "### 7.5 Launch order today (from `city_readiness.csv`)",
    """
Based on **your distributor list** (section 4.2b), not the Maps scrape.

| Tier | Cities (gas supply partners) | Plan |
|---|---|---|
| **Hub cities** (9) | Karachi 121 · Islamabad 46 · Lahore 33 · Rawalpindi 15 · Peshawar 12 · Hyderabad 8 · Faisalabad 6 · Quetta 6 · Burewala 5 | Hub pages exist and work for customers. **They are `noindex` and not in the sitemap** until you add the city to `data/city-overrides.json` (3 verification calls, a measured test order, 5+ local facts). **Wave 1: Karachi, Lahore, Islamabad, Rawalpindi.** Wave 2: Peshawar, Hyderabad, Faisalabad, Quetta, Burewala. |
| **Listed, not a hub** | Gujranwala 4 · Gojra 3 · Sahiwal, Bhakkar, Gujrat, Mansehra, Gilgit 2 each, and about 35 more towns with 1-2 | On the province hub and on `/delivery-areas/`. Recruit one or two more partners to reach the hub threshold. |
| **Large city, thin supply** | **Multan** (1 partner) and others | No hub. Add partners first. |
| **Strategic, thin** | Gilgit-Baltistan 2, Azad Kashmir 2, Balochistan 12 | Winter demand makes these important and the supply is the weakest. Province hubs are `noindex` until partners are added. |
| **No page** | About 200 cities | Listed on province hubs. Revisit if Search Console shows demand. |

The older Maps-based tiers in `city_readiness.csv` are kept for reference. Where they disagree with this table, this table wins.
""",
)

# ---- 14.1 scaffold converted
t = replace_section(
    t,
    "### 14.1 The current scaffold needs to change",
    """
**Done on 26 Oct 2026.** `lpg-website/` was a UAE starter ("GasLine LPG", 8 UAE cities). It is now THE LPG CO. PAKISTAN. `next build` passes (55 static pages), `tsc` is clean, and the production server was tested.

| Area | What is built |
|---|---|
| Brand and locale | THE LPG CO. PAKISTAN, thelpgco.pk, `en-PK`, PKR, Pakistan phone validation (mobile and landline, normalised to +92). No UAE text remains (checked on a rendered page). Licence, phone, office and reviewer come from `lib/site.ts`. |
| URL tree | Trailing slashes. `/lpg-in-{city or province}/` through one dynamic route and a rewrite. `/lpg-price-in-pakistan/` family, `/lpg-cylinders/`, `/lpg-home-delivery/`, `/order-lpg/`, `/services/` and 8 service pages, trust pages, safety pages, `/our-network/`, `/delivery-areas/`, `/become-an-lpg-distributor/`, `/what-is-lpg/`. Old `/cities`, `/get-quote`, `/safety` redirect with 308. |
| Gates in code | Price pages: `noindex` until `data/prices.json` has a verified entry. City hubs: `noindex` until `data/city-overrides.json` says `indexable`. Service pages: `noindex` until `data/projects.json` has a project with consent. Province hubs: `noindex` for now. The **sitemap lists only indexable pages**. Verified on the running server. |
| Honesty in code | No price is shown without a source and a verified date. No delivery time unless measured. Partner counts only, no names or numbers. Review date only after sign-off. |
| Leads | One form, nine request types, cylinder size, city or "other". Honeypot, rate limit (5 per 10 minutes), consent required. Stores request type and `kind` (customer, engineering, distributor). Verified: valid, invalid, UAE number, no consent, honeypot, rate limit. Production without Supabase returns 503 by design. `supabase/leads.sql` updated. |
| Conversion | Header call and WhatsApp, a mobile bottom bar with call and WhatsApp, a `generate_lead` event hook. |
| Schema | LocalBusiness (Islamabad address), WebSite, BreadcrumbList, FAQPage, Service. |

**Not built yet:** `/ur/` and hreflang, the price calculator and other tools, `/shop/`, appliance and industry pages, `/lpg-near-me/`, the shortage and "why prices change" pages (they need sourced facts), a GA4 script, Search Console and Bing verification, split sitemaps, a Lighthouse run on a mid-range Android profile, images and social cards, Supabase connection.
""",
)

# ---- 22 commands
t = insert_before(
    t,
    "## 23. Gates",
    """
### Intel and site commands

```
# one-time: put SERPER_API_KEY in lpg-website/.env.local (git-ignored)
cd docs/seo-plan/scripts/intel
python serper_run.py --file national --dry-run     # preview, spends nothing
python serper_run.py --file national               # wave 0 (resumable)
python serper_run.py --file cities --wave 1        # wave 1
python serper_run.py --file cities --wave 2        # wave 2 (after wave 1 review)
python serper_run.py --file autocomplete           # autocomplete expansion
python crawl.py --owner-listed                     # the 8 owner-listed sites
python crawl.py --from-serp --per-domain 25        # real competitors found by Serper
python analyze.py                                  # reports in docs/seo-plan/intel/reports/
python ../15_export_site_data.py                   # rebuild data/network.json for the site
# site (from lpg-website/)
npm run build && npx next start -p 3000
```
""",
)

# ---- 23 gate A
t = t.replace(
    "| **A** Business | Licence and model confirmed, partner commitment, compliance questions answered | **Mostly passed.** Open: licence numbers, outlet, safety reviewer, lawyer questions |",
    "| **A** Business | Licence and model confirmed, partner commitment, compliance questions answered | **Mostly passed.** Facts supplied. Open: licence scan, cylinder-certification proof, reviewer sign-off, lawyer questions |",
)
t = t.replace(
    "| **B** SEO opportunity | Overlap tests, final page map, competitor gaps documented | Ready to run (Phase 0). Needs Serper and Keyword Planner. |",
    "| **B** SEO opportunity | Overlap tests, final page map, competitor gaps documented | **In progress.** Serper waves 0-1 done, crawl running. Needs Keyword Planner volumes and the section 10.4 overlap read. |",
)
t = t.replace(
    "| **L** Location (per city) | Section 7.2 | None passed yet. Wave 1 targets Karachi, Lahore, Islamabad, Rawalpindi. |",
    "| **L** Location (per city) | Section 7.2 | None passed yet (calls and test orders needed). Wave 1 targets Karachi, Lahore, Islamabad, Rawalpindi. Pages are built and `noindex`. |",
)

# ---- 24 open decisions
t = replace_section(
    t,
    "## 24. Open decisions",
    """
1. Licence scan, class, validity, legal name, NTN (section 2.2)
2. Proof for "OGRA-certified cylinders" and a partner term that backs it
3. Hours, delivery charges, email address
4. Haroon Rasheed's consent, bio and sign-off
5. Budget, team, and who answers leads
6. One real engineering project, and which engineering services your team does itself
7. The monthly OGRA price entry (who does it, on which day)
8. Supabase, Search Console, GA4, Google Ads (Keyword Planner) access
9. **Rotate the Serper key**, since it was shared in chat
10. Whether to pay for one month of Ahrefs or Semrush at Gate B
11. Whether to test lever D (adjacent energy topics) at Gate X
12. Whether to add a Multan partner and recruit in AJK, GB and Balochistan
""",
)

# ---- 25 revision log
t = t.rstrip() + """

---

## 26. Revision log: v4.0 to v4.1 (26 Oct 2026)

| Change | Reason |
|---|---|
| Gate 0 facts recorded (licence, phone, office, reviewer, cylinders, engineering) | Supplied by the owner |
| Owner distributor list becomes the network source of truth (452 partners, 347 gas supply, 51 cities, 9 hubs) | Owner confirmed it is the real network. It replaces the Maps scrape for counts. |
| "1000s of distributors" claim replaced by real counts | The list shows 347 gas supply partners, concentrated in a few cities |
| Serper runner, crawler and analysis built and run (478 queries) | Owner asked for both tools |
| #1 on head price queries downgraded to top 3-5 | `ogra.org.pk` holds #1 on all three price queries |
| People Also Ask dropped as an FAQ source | Google Pakistan returned none |
| Competitor list widened by SERP evidence | 20 competitor domains rank, many not on the owner list |
| Website converted from UAE to Pakistan, with data gates | Owner asked for it. Gates make the plan's honesty rules real in code. |
| Hub tiers recomputed from the owner list | Multan loses its hub, Burewala gains one |
"""

P.write_text(t, encoding="utf-8")
print("patched", P)
