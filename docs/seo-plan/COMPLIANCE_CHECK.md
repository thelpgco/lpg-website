# Compliance check against `seo-LeadGEN.md` (27 Oct 2026)

Every Golden rule, every Step (1–27), and every page-writing item the owner listed, checked against what exists. Status words: **DONE** (built and verified), **PARTIAL** (some of it), **OWNER** (only the owner can supply it), **NOT DONE**.

## 1. Verdict

The **system** is built and consistent with the method: plan, page map (134 pages), 134 briefs, a page registry with an approval ladder, data gates in code, a site audit that crawls every built page, a lead flow with consent and attribution. The audit shows **0 fix items** on the 51 built pages.

The **content is not ready to publish**, and the documents say so honestly:

| Measure | Value |
|---|---|
| Pages in the map | 134 (33 P1, 43 P2, 44 P3, 14 P4) |
| Pages built | 51, all at status `review`, so all `noindex` and none in the sitemap |
| Pages that meet Golden rule 3 (3+ information-gain items ready) | **0 of 134** |
| Built pages under 150 words | 9. Median built page 229 words, 34 under 300 |
| Pages with a stored SERP | 81 |
| Pages with no primary keyword | 6 unbuilt pages (need Keyword Planner seeds) + 15 Urdu + 14 trust pages (by design) |

Pages are short because the facts that make them worth publishing are not in the system yet (a verified OGRA price, measured delivery times, local facts, photos, a real project). Padding them with generic text would break Golden rules 2–4, so the gate stays closed. Section 6 lists what unlocks each group.

## 2. The owner's checklist: how each page is written

| Item | Status | Where it lives and what is true |
|---|---|---|
| **Content writing standard** | DONE | Plan 11.5 (order of work, voice, readability, media, links, schema, Urdu, facts rule) |
| **Topical mapping** | DONE | Plan section 9 (11 pillars, 134 pages), `page-map.csv`, `keyword-master.csv` (primary and secondary per URL) |
| **Keyword research per page** | PARTIAL | Each brief groups the cluster by intent. Volumes are Ubersuggest/Keyword Planner ranges where a "10" is the tool's floor. 6 unbuilt pages need seeds. Urdu keywords are not researched yet |
| **Clustering by SERP** | DONE for 81 pages | Overlap test: no merge-level overlap (7+), 18 pairs reviewed (plan 10.4). 53 pages have no stored SERP yet |
| **Length** | DONE (policy) | Plan 11.5-D: no word-count target (Step 13.3). The brief shows the competitor range for reference |
| **"100% covered from all angles"** | DONE (method) / OWNER (content) | Plan 11.5-C defines coverage as five checks. Briefs list competitor subtopics seen on 2+ sites. Each page must still be written and checked against them |
| **Humanised** | DONE (rules) / OWNER (inputs) | Plan 11.5-E: add first-hand specifics, delete filler, prove claims. Each brief has questions to ask the team. The goal is accuracy, not "passing a detector" (Step 13.5) |
| **Keyword in which areas** | DONE | Plan 11.5-B (URL, title, meta, H1, first 100 words, one subheading, body, alt, anchors) plus the audit tests title, H1, first 100 words, meta and subheading placement on every built page |
| **Title and meta lengths** | DONE | `meta-tags.csv`: 51 of 51 titles 50–60 and 51 of 51 descriptions 140–160, regenerated from the running site |
| **Schema** | DONE | Plan 14.2. Emitted today: Organization, WebSite, BreadcrumbList, FAQPage (readers only), Service, Article on 3 guides, LocalBusiness on `/about/` and `/contact/` only. `Dataset` waits for 3+ months of price history |
| **Internal links** | DONE | Audit counts inbound body links for every page (all built pages have at least 2 except the home page, which needs none). Plan section 16 |
| **Facts and claims** | DONE | Claims register, verified-facts table in every brief, `[NEEDS FACT]` rule. Audit scans for superlatives, delivery promises, guarantees, UAE leftovers, research leaks and unproven social proof |
| **Media** | PARTIAL | Rules in 11.5-G. Default social card and favicon exist. **No original photos yet** (OWNER) |
| **Reviewer sign-off** | OWNER | Mechanism built (`data/safety-review.json`); no sign-off recorded; pages do not claim "reviewed" |

## 3. Golden rules

| # | Rule | Status | Evidence |
|---|---|---|---|
| 1 | No page without fulfilment | DONE in code, OWNER for evidence | Gate L; hubs `noindex` until `city-overrides.json` says verified. No city passed |
| 2 | No claim without a source | DONE | Claims register (plan 2.3). Owner-stated facts are labelled as such in every brief. Evidence for licence and cylinder certification is outstanding |
| 3 | 3+ information-gain items per commercial page | **NOT MET today** | 0 of 134 pages. Each brief lists which items are ready and which need data. The gate blocks publishing |
| 4 | No template swapping | PARTIAL | Hub text similarity is 0.54–0.64 (threshold 0.8), but hubs share one template. They stay `noindex` until each has local facts |
| 5 | Research stays internal | DONE | Audit scan added today; 0 hits; patterns tested on positive samples |
| 6 | Third-party metrics are not Google | DONE | Volume "10" flagged as a floor everywhere; the plan lowers the #1 goal for head price queries (OGRA holds #1) |
| 7 | Don't fake local presence | DONE | One real office (Islamabad G-12). `LocalBusiness` only on `/about/` and `/contact/`. No invented branches or partner names |
| 8 | Consent before contact, disclosure before sharing | DONE (lawyer review OWNER) | Consent required, text versioned and stored, three-roles disclosure. Privacy and terms are drafts for a lawyer |
| 9 | Earn links | PARTIAL | Plan 17 (assets, no bought links). Nothing executed yet |
| 10 | Every gate written down | DONE (started today) | `DECISION_LOG.md` |

## 4. Steps 1–27

| Step | Status | Where / what is missing |
|---|---|---|
| 1 Niche screen | DONE | Plan section 1 (demand, ceiling, honest target) |
| 2 Market and archetype | DONE | `en-PK`, PKR, Pakistan phone rules, plan section 3 |
| 3 Revenue model, buyer validation | PARTIAL | Three funnels and three roles described. No margin or buyer-call data (OWNER) |
| 4 Compliance and legal | PARTIAL | Question list for a lawyer (plan 2.4). Privacy, terms, advertising above the OGRA maximum need legal review (OWNER) |
| 5 Demand, competition, economics | DONE with caveats | Click model and SERP weakness score; no backlink data without Ahrefs |
| 6 Competitor discovery | DONE | 837 competitor pages in `intel.db`, 20+ competitor domains from SERPs. JS-rendered sites need Playwright |
| 7 Keyword universe | PARTIAL | Ubersuggest + Serper. Keyword Planner upload, autocomplete wave and Urdu research outstanding |
| 8 Intent and clustering | PARTIAL | Overlap test done on 81 pages; 53 pages (mostly unbuilt) have no stored SERP |
| 9 Prioritisation | DONE | `briefs.csv` priority score and publish order; weights are transparent and editable |
| 10 Domain, brand, trust | PARTIAL | Trust pages built. **Not done:** domain history check (Wayback, Search Console manual actions), real social profiles for `sameAs`, email on the domain (OWNER) |
| 11 Architecture | DONE | URL tree, depth ≤ 3, no `/lpg/` parent, plan section 9 |
| 12 Page briefs | DONE | 134 generated briefs, `templates/PAGE_BRIEF.md`, verified-facts table in each |
| 13 Content and experience | **PARTIAL (the main gap)** | Standard done. Page text is thin because facts and photos are missing (section 1) |
| 14 Conversion and lead capture | MOSTLY DONE | Consent versioned, honeypot, rate limit, duplicate detection, validation, labelled fields, tracked call and WhatsApp clicks. **Not done:** call tracking number, CAPTCHA beyond the honeypot, a stated response time on the thank-you message (needs a true number from the owner), weekly test lead (process starts at launch) |
| 15 Technical SEO | MOSTLY DONE | Registry-driven sitemap, per-page canonical and robots, security headers, 404 page, Open Graph and favicon. **Not done:** deployment and HTTPS check, Search Console and Bing verification, IndexNow, Core Web Vitals on real devices, hreflang (waits for Urdu pages) |
| 16 Local SEO | PARTIAL | Rule documented. Owner to decide on a Google Business Profile for the Islamabad office (service-area listing if no walk-ins) |
| 17 Internal linking | DONE | Audit measures inbound links; two-way price cluster; short footer |
| 18 Backlinks and PR | PLAN ONLY | Plan 17 (tracker, coverage report, safety checklist). No outreach yet |
| 19 AI search | PARTIAL | Answer-first pages, crawler decisions (plan 14.4). No monitoring until the site is live |
| 20 Lead operations | PARTIAL | Lead record has funnel fields; partner routing, `orders` table and verification SOPs are in the plan, not yet built or connected (Supabase) |
| 21 Measurement | PARTIAL | GA4 loader, events, diagnostics and CTR process documented (plan 19.2–19.3). Needs a GA4 id and Search Console |
| 22 Programmatic scaling | DONE (mechanics) | Registry, gates, publication gate, batch rule (plan 19.4). Nothing released yet |
| 23 Maintenance and pruning | DONE (plan) | Plan 19.1. Starts when pages are live |
| 24 Portfolio review | DONE (plan) | Plan 19.4, adapted to one site |
| 25 Checklists | DONE | Plan section 21 and the gate at the end of each brief |
| 26 Roadmaps | DONE | Plan section 18 |
| 27 Automating | DONE | Scripts: Serper runner, crawler, analysis, audit, registry, briefs, meta export. The guardrail prompt block is not wired into a drafting tool, because drafting is human-led |

## 5. Faults found and fixed in this review

Fixed in code or data:

1. Every built page was indexable by default. **Fix:** registry with `draft → review → approved → published`; `noindex` until published and the data gate is open.
2. Titles and metas were scattered, several stale, and hub metas claimed a delivery charge. **Fix:** `data/meta.json`, `fit()` templates, build fails if an entry is missing. `meta-tags.csv` regenerated; the old CSV is archived.
3. Safety pages implied "reviewed" before any sign-off. **Fix:** no "reviewed by" line until a sign-off is recorded.
4. Pages `/lpg-cylinders/` and `/services/` had **no primary keyword**. **Fix:** decided from a new Serper run (cylinder SERPs are catalogue pages, so CY-001 owns the generic terms; "lpg engineering services" is polluted by unrelated companies, so SV-001 uses "lpg installation services in pakistan"). Titles, metas, H1 and intro updated. Seven unbuilt hubs got pattern primaries.
5. Keyword map: off-topic queries on live pages, utility-bill queries on the order page, a city query as a province primary, wrong safety primaries, province hubs without primaries, a PH-005/PH-006 id swap, a missing Burewala row. All fixed in `19_fix_keyword_map.py`.
6. Plan said 131 pages and 10 P1 trust pages; it is 134, with TR-013 and TR-014 added. Starter briefs quoted old titles and a schema the site does not emit. Fixed.
7. No favicon; no social share image, and page-level `openGraph` was dropping the layout's image. **Fix:** `app/icon.tsx`, `app/opengraph-image.tsx`, and the image set in `meta()` with `twitter:card`.
8. Lead record lacked page, consent version and attribution; double submits were stored twice. **Fix:** fields added, duplicate detection added (and released if saving fails so retries still work).
9. Contact-link clicks were untracked; the WhatsApp message did not say which page it came from. **Fix:** `TrackedLink` with `phone_click` and `whatsapp_click`, page path appended to the WhatsApp text.
10. The audit could not see research leakage or unproven social proof. **Fix:** new scan, tested.
11. Audit false positives (plurals, "near", "1 kg"). Fixed in the tokenizer.
12. The brief generator crashed on pages with no competitor match, listed ordinary keywords as "Brand" (the "cylin" match inside "cylinder"), and showed site-wide boilerplate as competitor subtopics. All fixed.
13. Plan was missing: writing standard, briefs, schema rules, technical decisions, maintenance, pruning, diagnostics, CTR process, portfolio decisions, publish order. Added (v4.2).

Found and recorded, not fixable by code alone:

14. **Price-cluster overlap:** PR-001, PR-002, PR-003, CY-002, CY-003 and the city price pages share 4–6 of 10 SERP URLs. CY-003 (11.8 kg) is a merge candidate if it has nothing the price page lacks.
15. Hub pages are template-based (similarity 0.54–0.64).
16. Seven built pages read above grade 12 (for example `/services/` and `/delivery-areas/`, which are mostly lists). They are flagged as "watch" in the audit.

## 6. What only the owner can supply (and what it unlocks)

| Input | Unlocks |
|---|---|
| A verified OGRA notification each month (PDF link, date, per-kg) and a named checker | All price pages (PR-001..005, CY-002). First information-gain item on each |
| Photos: office, cylinders with OGRA markings, a delivery, regulator and hose | Information gain on most pages; media standard |
| 3 verification calls and one test order with measured time, per city | Each city hub passes Gate L (Karachi, Lahore, Islamabad, Rawalpindi first) |
| Licence scan and digit check; proof of cylinder certification | The "Licences" claims; trust pages |
| Mr Rasheed's sign-off per safety page, and consent for his bio | SF-001, SF-002 and the other safety pages |
| One real engineering project with photos and customer consent | Service pages |
| Real stock, supplier and prices for geysers and heaters; sourced news for NW-001/002 | AP-002, AP-003, NW-001, NW-002 (built only then) |
| A true response-time statement for the thank-you message | Step 14 confirmation |
| Supabase project, GA4 id, Search Console and Bing access, hosting | Launch gate C |
| Keyword Planner export (or at least seeds for six pages) | Volumes for PR-009, PR-010, DL-006, NW-003, SP-001, IN-001 |
| Urdu writer's keyword list | The 15 Urdu pages |
| Rotate the Serper key (it was shared in chat); keep it only in `.env.local` | Security |
| Lawyer review of privacy, terms and price advertising | Rule 8 and Step 4 |

## 7. How to re-verify

```
# from lpg-website/
npx tsc --noEmit
npx next build ; npx next start -p 3100
python docs/seo-plan/scripts/18_site_audit.py          # crawl, 0 fix items expected
python docs/seo-plan/scripts/22_export_meta_tags.py    # meta-tags.csv
python docs/seo-plan/scripts/21_build_page_briefs.py   # briefs, overlap pairs, priority
node scripts/page-status.mjs list                      # who is in which state
```
