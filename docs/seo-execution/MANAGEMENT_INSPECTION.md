# Management inspection package — THE LPG CO. PAKISTAN

**Site:** thelpgco.pk · **App:** `lpg-website/` · **Updated:** 29 Oct 2026

## How to run the management demo

1. In `.env.local` set:
   ```
   NEXT_PUBLIC_SITE_MODE=demo
   ```
2. From `lpg-website/`:
   ```
   npm run dev
   ```
3. Open:
   - Home: http://localhost:3000/
   - **Inspection dashboard:** http://localhost:3000/management-review/ (noindex)
4. Amber banner = demo mode. DEMO badges on sample projects/prices are **not** public claims.

For a public-shaped build, set `NEXT_PUBLIC_SITE_MODE=production` (default). Demo catalogues and case studies will not render as real work.

## What is finished for inspection

| System | Status | Where |
|---|---|---|
| Company profile (SoT) | Ready | `lib/company/profile.ts` |
| Demo vs production mode | Ready | `lib/mode.ts`, `data/demo/*`, `data/production/*` |
| OGRA price + MoM history | Ready | `data/prices.json`, price pages, `PriceBlock` |
| Cylinder catalogue + DEMO deposits | Ready | `lib/products.ts`, cylinder SKU pages |
| Projects portfolio layouts | Ready | `/projects/`, `/projects/[slug]/` (3 DEMO cases in demo mode) |
| Lead forms / WhatsApp / phone | Ready | existing lead flow + sticky bar |
| Calculators | Ready | `/tools/*` |
| Management dashboard | Ready | `/management-review/` |
| Research index (1099 sources) | Ready | `docs/seo-execution/RESEARCH_INDEX.json` |
| Honesty sweep (draft/Gate L/placeholders) | Largely done | no public `[needs confirmation]` / Gate L / awaiting sign-off |

## What management still finalises (does not block the demo)

1. Attach official OGRA monthly PDF and re-verify `prices.json`
2. Replace illustrative images with camera photos (G-12, stock markings, delivery)
3. Confirm real deposit / delivery fee schedule (replace DEMO catalogue)
4. Add consented real projects into `data/production/projects.json`
5. Confirm appliance SKU price list for production shop pages
6. Flip pages from `review` → `published` in `data/pages.json` when ready to index
7. Search Console / Analytics / Supabase production keys

## Suggested walkthrough order

1. `/management-review/` — inventory  
2. `/` and `/lpg-price-in-pakistan/` — price flagship + MoM  
3. `/lpg-cylinders/12-kg-domestic-cylinder/` — DEMO deposit vs production quote language  
4. `/projects/` — DEMO case studies (demo mode)  
5. `/lpg-in-islamabad/` — city hub wording  
6. `/commercial-lpg-supply/` — worked 45.4 kg gas cost  
7. `/what-to-do-if-you-smell-gas/` — safety + 1122  
8. `/tools/lpg-cylinder-duration-calculator/` — interactive tool  
9. `/order-lpg/` — lead form  

## Progress log

See [`EXECUTION_PROGRESS.md`](EXECUTION_PROGRESS.md). Baseline quality audit: [`../seo-plan/CONTENT_QUALITY_AUDIT_V2.md`](../seo-plan/CONTENT_QUALITY_AUDIT_V2.md).
