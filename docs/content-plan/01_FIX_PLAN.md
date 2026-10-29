# Fix plan: all audit issues (29 Oct 2026)

Source: full audit of 132 rendered URLs (fresh `next build`, main-content text only).
Measure again at any time with `scripts/measure_pages.py` (see the bottom of this file).

Goal order: **1. get indexed → 2. remove thin and duplicate pages → 3. make the money pages the best result → 4. AdSense approval → 5. grow traffic.**
Do the phases in order. Phase 0 blocks everything else.

---

## Status (29 Oct 2026)

| Item | Status |
|---|---|
| 0.1 Publish status | **Waiting on owner.** No page status was changed. City pages also need `"indexable": true` in `data/city-overrides.json` (`isCityIndexable`). |
| 0.2 Founding year | **Waiting on owner.** |
| 0.3 Listing counts | Done. Per-city counts come from `listedCount()` in `lib/directory.ts` (hub, near-me and delivery-areas pages). Sitewide totals still come from `network.json`. |
| 0.4 `/management-review/` | Done. Disallowed in robots; it had no inbound links. |
| 0.5 Search Console / GA4 | **Waiting on owner** (account access). |
| 1.1 / 1.2 Redirects | Done. Routes deleted, 301s added in `next.config.mjs`, removed from `pages.json` and `meta.json`, footer link removed. |
| 1.3 Gallery | Unchanged (noindex). |
| 1.4 / 1.5 Boilerplate | Done. Repeated sentences dropped from 62 pages to 0. Templates changed: `IndustryPage`, `services/[slug]`, `CityHubStatic`, `PriceBlock`, `CylinderCostBlock`. Duplicate FAQ answers on 25 pages were rewritten. |
| 1.6 Lead form | Not needed. The form already sits in `<aside>`. The measurement script now ignores `<aside>`. `id="lead-form"` was added for in-page CTAs. |
| 1.7 Encoding | False alarm: the HTML is valid UTF-8; the `�` was terminal display only. |

---

## Phase 0: blockers (day 1–2)

| # | Issue | Fix | Where |
|---|---|---|---|
| 0.1 | **All 119 pages are `noindex` and the sitemap is empty.** Every entry in the registry is `"status": "review"`. | Move the pages that pass the Phase 2 gate to `"published"`. Keep all others at `review` (noindex) until they are rewritten. Never publish everything at once just to "get indexed": thin pages indexed together with good ones pull down the whole site. | `data/pages.json` |
| 0.2 | Years in business conflict. The site says "operating since 1999", but the owner blueprint and `lib/company/profile.ts:15` say "~21 years" (1999 → 2026 is 27). | Owner confirms **one** founding year. Use it everywhere. | `lib/company/profile.ts`, `keywords and research/company details.md` |
| 0.3 | Listing counts conflict. The Sindh hub shows Karachi as "66 named listings" and also "121 listed"; Hyderabad shows 13 and 8. | Take headline counts from one source (`data/directory/by-city.json`). Stop reading `data/network.json` counts for headlines. | `app/lpg-hub/[slug]/page.tsx`, `lib/network.ts`, `lib/directory.ts` |
| 0.4 | `/management-review/` is an internal page served publicly. | Keep it noindex. Add `Disallow: /management-review/` to robots, remove it from all nav and footer links, or gate it behind `NEXT_PUBLIC_SITE_MODE=demo`. | `app/management-review/`, `app/robots.ts` |
| 0.5 | No measurement. | Verify `thelpgco.pk` in Google Search Console (domain property) and submit `/sitemap.xml`. In GA4, mark the existing events `phone_click`, `whatsapp_click` and `generate_lead` as key events. | — |

---

## Phase 1: quick cleanup (week 1)

| # | Page / issue | Action |
|---|---|---|
| 1.1 | `/shop-preview/` (78 words, captions only, duplicates gallery and shop) | 301 → `/shop/`. Delete the route. |
| 1.2 | `/about/haroon-rasheed/` (186 words; says it "is not a personal biography") | 301 → `/about/`. Delete the route. |
| 1.3 | `/gallery/` (captions only) | Keep it noindex. Link to it only from About. Optionally add a 1–2 line real caption per photo (what, where, when). |
| 1.4 | **Repeated boilerplate.** "Target in covered city areas: about one hour…" is on 83 pages (up to 3× on one page). The company blurb is on 40, the certified-cylinder rule on 41 and the response-time line on 28. | Show each `commercial-terms.json` sentence **at most once per page**, in a shared trust box or the footer strip. In the body, write a page-specific sentence instead. Example for Murree: "On snowfall days the road above Ghora Gali can close, so we confirm the window first." Remove the duplicates inside `lib/services.ts` FAQs and the industry and service templates. |
| 1.5 | Murree and Skardu repeat the same delivery paragraph twice on the page. | Remove the second copy. |
| 1.6 | The lead form's 60-city `<select>` sits inside `<main>`, which adds about 190 identical words to every page. | Move the form outside `<main>` or into an `<aside>`, or load the city list on focus. This raises every page's unique-text share. |
| 1.7 | Stray/encoding characters (`�` for an en dash in titles and body). | Check that the `<meta charset>` and source files are UTF-8. Replace `–` with plain `-` or `—` written as a real character in the JSON data. |

---

## Phase 2: publish the strong pages (week 1–2)

A page may be set to `published` only after it passes the **Index gate** in `02_CONTENT_PLAYBOOK.md` §9. These pages already pass or come close:

**Wave A (publish first):**
`/`, `/about/`, `/contact/`, `/privacy/`, `/terms/`, `/editorial-policy/`, `/licences-and-compliance/`, `/pricing-policy/`, `/complaints/`, `/how-it-works/`, `/delivery-areas/`, `/our-network/`,
`/lpg-price-in-pakistan/`, `/lpg-safety/`, `/what-to-do-if-you-smell-gas/`, `/lpg-cylinder-blast-causes-and-prevention/`, `/what-is-lpg/`, `/lpg-vs-cng/`, `/lpg-vs-sui-gas/`, `/lpg-vs-lng/`, `/propane-vs-butane/`, `/lpg-composition-and-properties/`, `/why-lpg-prices-change-in-pakistan/`, `/lpg-companies-in-pakistan/`, `/ogra-lpg-regulations-pakistan/`, `/bulk-lpg-supply/`, `/commercial-lpg-supply/`, `/industrial-lpg-supply/`, `/lpg-bowser/`,
`/lpg-in-lahore/`, `/lpg-in-karachi/`, `/lpg-in-islamabad/`, `/lpg-in-rawalpindi/`, `/lpg-in-peshawar/`, `/lpg-in-multan/`, `/lpg-in-faisalabad/`, `/lpg-in-quetta/`, `/lpg-in-gujranwala/`, `/lpg-in-hyderabad/`, `/lpg-in-gilgit/`

**Wave B (after one proofreading pass):**
the remaining guides (`/lpg-supply-in-pakistan/`, `/lpg-shortage-pakistan/`, `/lpg-business-in-pakistan/`, `/lpg-marketing-company-vs-distributor-vs-dealer/`, `/how-lpg-is-produced-and-supplied/`, `/how-to-choose-a-licensed-lpg-supplier/`, `/auto-lpg-in-pakistan/`, `/lpg-leak-detector/`, `/lpg-regulators/`, `/lpg-regulator-problems-and-repair/`, `/new-lpg-connection/`, `/become-an-lpg-distributor/`) and the 7 `/tools/*` pages.

Then: submit the sitemap in Search Console, and use **URL Inspection → Request indexing** for the 10 most important URLs.

---

## Phase 3: rewrite the thin / templated groups (weeks 2–6)

Rewrite each page with the playbook (`02_CONTENT_PLAYBOOK.md`), one page at a time. The targets come from the audit:

| Group | Now | Target | Decision |
|---|---|---|---|
| **6 province hubs** (`/lpg-in-punjab/` …) | 25–32% unique, 86–87% identical to each other | ≥ 55% unique, ≤ 30% sibling overlap | **Rewrite** with real provincial content: the OGRA notified price applies everywhere, but winter demand, cylinder prices in hill areas, regional plants, ports and import routes (e.g. Port Qasim for Sindh), Sui gas load-shedding patterns and major towns differ. If owner time is short, **merge** them into `/delivery-areas/` sections and 301 the hubs instead. |
| **9 industry pages** | ~35% unique, 66–68% overlap | ≥ 55% unique, ≤ 30% overlap | Rewrite each with sector-only content: the load calculation (kg/hour per burner type), the typical setup (a 45.4 kg bank vs a bulk tank), sector-specific safety (poultry: litter + brooders; hospitals: backup supply + autoclaves; textile: stenters and dryers), a worked monthly-consumption example, and a real photo. Remove the shared "What we can do" block. Replace it with 3 sector-specific lines. |
| **8 service pages** | 39–48% unique, ~65% overlap | ≥ 55% unique, ≤ 30% overlap | Rewrite with the real method: steps, materials (pipe grade, regulator stages), tests (pressure test duration), documents handed over, what the customer must prepare, common faults found. AMC and safety-audit come first (they are the thinnest). |
| **8 project pages** | ~100 unique words each | ≥ 400 unique words + ≥ 2 real photos | **Owner input needed:** site photos, load before/after, number of cylinders/tank size, duration, a problem solved and a quote from the client (with written consent). Without that data, **noindex** the project pages and show them only as a list on `/projects/`. Never invent details. |
| **Thin city pages** (Murree, Skardu: 1 listing each; Abbottabad 3; Muzaffarabad 5) | template-heavy | ≥ 2 genuinely local sections | Write real local sections: winter road closures and snow season, altitude and the butane vaporisation problem in cold weather (why propane-rich gas matters above ~1,500 m), tourist-season hotel demand and the nearest supply towns. Keep them noindex until done. |
| **Big city pages** (Lahore, Karachi, Islamabad, Peshawar, Rawalpindi, Multan, Faisalabad, Quetta, Gujranwala, Hyderabad, Gilgit) | 61–66% unique, but **30–46% overlap** with a sibling city (shared section frames and sentences) | ≤ 30% overlap | They are still publishable (Wave A) because the dealer listings are real. Then de-template one city a week: rewrite the "How supply works", "Delivery", "Cylinder sizes" and FAQ sections in that city's own words and facts (areas, roads, winter, industries, Sui gas situation). Use a different section order where it reads better. |
| **2 city price pages** (`/lpg-price-in-pakistan/lahore/`, `/karachi/`) | 52–53% identical to each other | ≤ 30% | Add city-only content: the local shop price range vs the notified price, delivery charges and the local reasons for differences. |
| `/lpg-price-per-kg-in-pakistan/` (813 words, the main money keyword) | short | ≥ 1,500 words | Add: a monthly history table, a cost-per-cylinder table (5 / 11.8 / 15 / 45.4 kg), why shop prices exceed the notified price, how to check a cylinder's weight, a Roman-Urdu FAQ. |
| Product / appliance price pages | 60–70% unique | ≥ 65% unique | Add buying checks, failure causes and a comparison table. Drop the boilerplate. |

---

## Phase 4: AdSense readiness (start after Phase 2 is live and indexed for 3–4 weeks)

AdSense reviewers reject sites for **thin or low-value content, under-construction pages, missing policies and poor navigation**. Checklist:

- [ ] ≥ 30 indexed pages, each with substantial original text (Waves A + B cover this).
- [ ] No noindexed or under-construction pages in the main nav (gallery and projects only appear once they are real).
- [ ] `/privacy/` adds an **advertising section**: Google and third-party vendors use cookies to serve ads based on prior visits; users can opt out via Google Ads Settings. Link to Google's "How Google uses data when you use our partners' sites".
- [ ] A consent banner with a Google-certified CMP (needed for EEA/UK visitors).
- [ ] `/ads.txt` at the root, after approval: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`.
- [ ] About, contact (real address and phone) and the editorial policy are linked from the footer (already present).
- [ ] No pages that only show images or forms.

**Ad placement strategy (protects conversions):**
- Show ads **only on informational pages**: guides, comparisons, safety, tools and price history.
- **No ads** on money pages: `/order-lpg/`, city pages, `/commercial-lpg-supply/`, `/bulk-lpg-supply/`, industries, services, shop. A competitor's LPG ad there sends your lead away.
- In AdSense → Blocking controls, block the URLs of competing LPG marketers and distributors, and block the sensitive "gas/energy suppliers" categories where possible.
- Never place an ad above the first CTA or inside the lead form area. Turn off Auto ads "anchor" on mobile if it covers the WhatsApp button.

---

## Phase 5: growth (ongoing, from week 6)

1. **Monthly price refresh (the biggest traffic driver).** When OGRA notifies the new LPG price (usually on the last day or the 1st of the month), update `data/prices.json` the same day. This updates `/lpg-price-in-pakistan/`, the city price pages, the history page and the calculators. Change the visible "updated" date only when the data changes.
2. **City price pages.** Only 2 exist (`/lpg-price-in-pakistan/lahore/`, `/karachi/`). Add Islamabad, Rawalpindi, Peshawar, Quetta, Multan and Faisalabad **only when** each page can carry real local content (local shop price range vs notified, delivery charges, winter spikes).
3. **New pages from the keyword gaps.** Use `docs/seo-plan/keyword-master.csv` (1,721 keywords) mapped to URLs. Any keyword cluster with volume and no URL gets a brief. Candidates: Roman-Urdu queries ("gas cylinder ki qeemat", "LPG cylinder rate today"), "LPG cylinder weight check", "LPG for generator", "LPG cylinder expiry date / testing", "how long does an 11.8 kg cylinder last".
4. **Search Console loop (monthly):**
   - pages with > 500 impressions and CTR < 2% → rewrite the title and description;
   - queries ranking 8–20 → add a section answering that query to the page;
   - two URLs ranking for the same query → merge them (cannibalization).
5. **Links.** Pitch the price-history table and the calculators to Pakistani news and business sites when prices move. Get listed in Google Business Profile for the Islamabad office.

---

## Owner inputs needed (list them once, collect them in one go)

1. Founding year (0.2).
2. 10–30 real photos per group: deliveries, the warehouse, the cylinder testing, engineering jobs, the office.
3. Real project data plus written consent (Phase 3 projects).
4. Delivery charges and deposits per city, if they can be stated.
5. One staff member who can be named as the safety reviewer (a role and experience; a name is optional but helps E-E-A-T on safety pages).
6. 3–5 field anecdotes per industry ("a hotel in Murree ran out on 2 Jan because…") for the industry pages.

---

## Measuring progress

```bash
npx next build
```

```bash
python -I docs/content-plan/scripts/measure_pages.py .next/server/app
```

The script prints, per URL: total words, unique words, unique %, and the closest sibling with % overlap. Targets: unique ≥ 55% on money pages, sibling overlap ≤ 30%.
