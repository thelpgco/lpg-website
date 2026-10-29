# Execution progress — THE LPG CO. complete website

**Started:** 29 Oct 2026 · **Working dir:** `lpg-website/`  
**Baseline audit:** CONTENT_QUALITY_AUDIT_V2 — 1 Good / 59 Borderline / 56 Weak  
**Rule:** finish the site for management inspection; demo fixtures separate from production claims.

## Checkpoint

| Field | Value |
|---|---|
| Last update | 29 Oct 2026 — money/cylinders/projects/demo mode/management dashboard + polish passes; demo `next build` OK |
| Mode system | `lib/mode.ts` + `data/demo/*` + `data/production/*` |
| Company SoT | `lib/company/profile.ts` |
| Research index | `docs/seo-execution/RESEARCH_INDEX.json` (1099 manifest rows) |
| Inspection package | `docs/seo-execution/MANAGEMENT_INSPECTION.md` |
| Dashboard | `/management-review/` (noindex) |

## Completed

- [x] Phase 1: inventory, progress file, research manifest index (1099)
- [x] Phase 2: company profile module
- [x] Phase 3: demo vs production mode + DemoBanner
- [x] Honesty sweep (placeholders, Gate L, awaiting sign-off, partner-preview copy)
- [x] Money cluster rewrite (flagship + siblings + delivery/order/home/cylinders hub)
- [x] Cylinder/product data model + SKU/refill/connection pages
- [x] Projects portfolio + 3 DEMO case studies (demo mode only)
- [x] Management dashboard
- [x] Guides/safety/commercial polish + cities/services/trust/media polish
- [ ] Remaining deep rewrites: every thin province hub, every industry sector unique load estimate, every tool worked-example pass, full LeadGEN SERP re-tear for each URL
- [ ] Re-run strict content audit V3 after management fact pack

## URL status (rolling)

| Cluster | Done | Pending | Notes |
|---|---:|---:|---|
| Foundation systems | done | — | mode, company, products, projects, demo fixtures |
| Honesty / shared defects | done | residual illustrative media | |
| Money / price | done | OGRA PDF attach | |
| Cylinders / products | done | real tare/deposit from owner | |
| Guides / safety / commercial | polished | optional depth | |
| Cities / provinces / services / trust | polished | more local facts | |
| Tools / shop | usable | more worked examples | |

## Next tasks

1. Owner fact pack → production deposits, photos, OGRA PDF, real projects  
2. Optional V3 quality re-audit on rendered pages  
3. Publish ladder page-by-page when management approves  
4. Continue any remaining thin pages called out in MANAGEMENT_INSPECTION walkthrough feedback

## Changed files (this session)

_Updated as work lands._

### 29 Oct 2026 - cylinders, projects, dashboard, shop (tsc --noEmit clean; `next build` OK in production and demo modes)

- Cylinder SKU pages rewritten on `lib/products.ts` (`cylinderByGasKg`, `gasCostLabel`, `shellCostLabel`, `deliveryFeeLabel`, `isDemo`); no `[needs confirmation]` left on them. Demo: DEMO deposit / new-empty / delivery / tare figures under a "DEMO demonstration catalogue" note. Production: "quoted before you agree" plus `data/commercial-terms.json` terms.
  - `app/lpg-cylinders/12-kg-domestic-cylinder`, `45-kg-commercial-cylinder`, `5-kg-cylinder`, `composite-fiber-cylinder`
  - `app/lpg-cylinder-refill`, `app/new-lpg-connection`
  - New shared `components/CylinderCostBlock.tsx` (single-size block, all-sizes table, spec rows)
- Projects: `app/projects/page.tsx` lists `projects()`; new `app/projects/[slug]/page.tsx` (`generateStaticParams`, `dynamicParams=false`). Demo shows DEMO-badged case studies (noindex); production shows an honest empty state with a quote CTA. New `components/DemoBadge.tsx`.
- Management dashboard: `app/management-review/page.tsx` (robots index:false, follow:false, not in sitemap, no password yet). Mode banner, company profile, systems checklist (prices, products, projects, leads, calculators), all `data/pages.json` URLs with status and localhost links (`NEXT_PUBLIC_LOCAL_ORIGIN` overrides host).
- Shop and appliances: `app/shop/page.tsx` and `components/r4plus/ApplianceInfoPage.tsx` use `appliances()`. Demo: DEMO prices labelled. Production: H1 says "price on request" (stove, geyser, heaters pages pass `category`, `demoH1`, `productionH1`).
- Not done here: `/projects/[slug]/` and `/management-review/` are not in `data/pages.json` (so never sitemap-listed, by design); other `[needs confirmation]` strings elsewhere in the site remain for the honesty sweep.


### 29 Oct 2026 - polish pass: cities / services / trust / media (tsc --noEmit clean)

- Dynamic hub `app/lpg-hub/[slug]/page.tsx`: FAQ delivery answer uses `deliveryNote` / target minutes, else "we confirm on the call, no fixed time published" (removed "tested it ourselves"). "We work with N distributors" softened to "N suppliers listed in our network data" in FAQ, intro, body and section headings. Province hubs with empty city arrays (Azad Kashmir, Gilgit-Baltistan, Khyber Pakhtunkhwa) now show guidance, links to `/delivery-areas/`, `/order-lpg/`, nearest city pages and the six biggest city hubs, plus an extra FAQ.
- Static city pages (Skardu, Murree, Muzaffarabad, any city with 0 listed suppliers) via `components/r4plus/CityHubStatic.tsx`: when `hasPartners` is false the H1 is "LPG in X: guidance, price and supply inquiry", the intro says no supplier is listed and no delivery is promised, the form heading is "Send an LPG inquiry", and a CTA to `/order-lpg/` is added. Fixed "0 distributors" bullet and partner-locality list showing for cities with no suppliers.
- `lib/services.ts`: removed shared `stdProcess`; pipeline, storage tank, manifold, LPG-air and boiler conversion each have 4 service-specific steps. Cylinder testing: `data/meta.json` no longer promises hydrostatic testing; the page now says hydrostatic re-test is done at a licensed test station and we advise on due dates (scope, process, FAQ). `docs/seo-plan/briefs/SV-009.md` still holds the old meta line (brief only, not shipped).
- Media: `lib/media.ts` gets `isIllustrativeSrc` (paths with `hold-ai`, `-ai-`, `-ai.`, `sample`) and `illustrativeCaption`; `components/ContentImage.tsx` and `components/ImageGallery.tsx` append "(illustrative)" for those images, show "Illustrative image" when a caption is missing in demo mode, and `ImageGallery` has an `illustrative` prop (never applied to `/images/trust/`).
- Trust pages: contact gallery titled "Images (illustrative)"; about draft-style sentence about replacing images with camera photos replaced by a plain illustrative disclosure; licences gallery retitled. No draft Notes remain on these three pages.
- `/gallery/` and `/shop-preview/`: still `index: false`; retitled, re-headed and described as illustrative galleries, partner-preview wording removed, all images labelled illustrative.
- Files: `app/lpg-hub/[slug]/page.tsx`, `components/r4plus/CityHubStatic.tsx`, `lib/services.ts`, `data/meta.json`, `lib/media.ts`, `components/ContentImage.tsx`, `components/ImageGallery.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, `app/licences-and-compliance/page.tsx`, `app/gallery/page.tsx`, `app/shop-preview/page.tsx`.


### 29 Oct 2026 - polish pass: guides / safety / commercial (tsc --noEmit clean)

- Draft-language sweep over the guide, safety and commercial pages: no `awaiting sign-off`, `Searchers ask`, `Gate L` or `needs confirmation` text is left in any page body. The one `Gate L` string left is a code comment in `lib/network.ts`.
- New `components/GasCostWorked.tsx`: worked gas cost from `lib/prices.ts` (price per kg, one 45.4 kg cylinder, 4/8/16 cylinders a month, change since the previous notified month). Gas only; deposit, exchange and delivery stay "quoted before you agree". Falls back to the formula when no verified price is on file.
- `/commercial-lpg-supply/`, `/bulk-lpg-supply/`, `/industrial-lpg-supply/`: worked 45.4 kg example added. Link dumps cut: commercial 6 related links (hub-city chips removed), bulk 6, industrial 4 service links (sector link list, province list and extra note links removed). 1122 added to the commercial safety paragraph.
- `/lpg-companies-in-pakistan/`: still no ranked list. Added a six-step "how to verify an OGRA licence" list with a link to ogra.org.pk (no invented OGRA page paths), a not-legal-advice line, and a THE LPG CO. licence section built from `lib/company/profile.ts` (licence number, legal name, years operating, activities, office).
- `/ogra-lpg-regulations-pakistan/`: marketer vs distributor table at high level, link to ogra.org.pk, not-legal-advice note kept, no named regulations. The lead image is now the real licence graphic (`licenceOfficial`) instead of the AI "licence sample".
- `/lpg-near-me/`: H1 and intro reframed as "how we match you to a supplier near you"; steps rewritten, map FAQ rewritten, form CTA reworded, shop/filling-station link removed. Meta title updated in `data/meta.json`.
- `/lpg-kit-price-in-pakistan/`: H1 is now "LPG kit cost in Pakistan: what to compare and how to get a written quote". Form CTA reworded. In demo mode it shows a DEMO band for appliances with `category: "kit"` (the demo catalogue has none today, so nothing shows). Production never shows a kit price.
- `/lpg-shortage-pakistan/`: "This log is empty on purpose" replaced with a "how we post dated updates" paragraph (date, what was reported, named source, link) and a local-stock route; status note and FAQ reworded.
- `/propane-vs-butane/`: removed the "ask for propane-rich" advice (cylinders are a mix you cannot order by ratio). The short answer and use-case bullets now give cold-weather handling advice.
- Safety: `SafetyReview` renders on all six safety pages (dates and 1122 come from `data/safety-review.json`). 1122 added explicitly to `/what-to-do-if-you-smell-gas/` (step 5 and danger note), `/lpg-safety/`, `/lpg-leak-detector/`, `/lpg-regulator-problems-and-repair/` and `/lpg-cylinder-blast-causes-and-prevention/` (danger notes, fire steps and FAQ).
- Files: `components/GasCostWorked.tsx` (new), `app/commercial-lpg-supply/page.tsx`, `app/bulk-lpg-supply/page.tsx`, `app/industrial-lpg-supply/page.tsx`, `app/lpg-companies-in-pakistan/page.tsx`, `app/ogra-lpg-regulations-pakistan/page.tsx`, `app/lpg-near-me/page.tsx`, `app/lpg-kit-price-in-pakistan/page.tsx`, `app/lpg-shortage-pakistan/page.tsx`, `app/propane-vs-butane/page.tsx`, `app/what-to-do-if-you-smell-gas/page.tsx`, `app/lpg-safety/page.tsx`, `app/lpg-leak-detector/page.tsx`, `app/lpg-regulator-problems-and-repair/page.tsx`, `app/lpg-cylinder-blast-causes-and-prevention/page.tsx`, `data/meta.json`.
