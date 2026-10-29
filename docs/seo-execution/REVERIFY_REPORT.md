# Full re-verification report

**Date:** 29 Oct 2026 · **Scope:** code, data, honesty, demo isolation, registry, price math, critical routes

## Overall: PASS (with notes)

No blocking integrity failures found in automated checks.

### Builds

| Check | Result |
|---|---|
| `tsc --noEmit` | **PASS** (exit 0) |
| `next build` production | **PASS** (exit 0) |
| `next build` demo (earlier) | **PASS** (DEMO project routes prerendered) |
| Draft-phrase scan (non-comment) | **0 hits** |
| Missing static meta (excl. dynamic) | **0** |

### Post-reverify fixes applied immediately

- Removed production FAQ strings that mentioned “demonstration mode / DEMO figures” (12 kg, 45 kg, composite, new connection, shop).
- Home hero: “Operating since 1999 · OGRA licence …” (no longer “OGRA-licensed since 1999”).
- `/management-review/`: instruct host restriction instead of “no password required”.

### Content quality re-sample (20 URLs, strict rubric)

See [`REVERIFY_CONTENT_SAMPLE.md`](REVERIFY_CONTENT_SAMPLE.md).

| | Same 20 URLs in V2 | Now |
|---|---:|---:|
| Good | 1 | **1** |
| Borderline | 3 | **15** |
| Weak | 15 | **4** |

Honesty failures mostly cleared; **information gain** (real deposit/delivery/tare numbers) is still the main blocker to Good.

## Registry

- Pages in `pages.json`: **119**
- Built: **119**
- Statuses: {'review': 119}
- `page.tsx` route files: **101**
- Meta entries: **108**
- Built URLs missing static meta (excl. known dynamic): **0**

## Demo vs production isolation

- `demo_project_count`: **3**
- `prod_project_count`: **0**
- `mode_module`: **True**
- `products_gated`: **True**
- `projects_gated`: **True**
- `demo_leaked_into_production_file`: **False**

## Price arithmetic

- Latest: `{'month': '2026-10', 'perKg': 279.34, 'sourceNote': 'October 2026 OGRA consumer price as reported from the official notification cycl'}`
- PASS: 5kg gas = Rs 1397
- PASS: 11.8kg gas = Rs 3296
- PASS: 15kg gas = Rs 4190
- PASS: 45.4kg gas = Rs 12682
- MoM: 258.65 → 279.34 (Δ 20.69, 8.0%)

## Critical files

- `PASS` lib/mode.ts
- `PASS` lib/company/profile.ts
- `PASS` lib/products.ts
- `PASS` lib/projects.ts
- `PASS` lib/money.ts
- `PASS` components/DemoBanner.tsx
- `PASS` components/PriceBlock.tsx
- `PASS` components/CylinderCostBlock.tsx
- `PASS` components/GasCostWorked.tsx
- `PASS` app/management-review/page.tsx
- `PASS` app/projects/[slug]/page.tsx
- `PASS` data/demo/products.json
- `PASS` data/demo/projects.json
- `PASS` data/production/projects.json
- `PASS` docs/seo-execution/MANAGEMENT_INSPECTION.md
- `PASS` docs/seo-execution/RESEARCH_INDEX.json
- `PASS` docs/seo-execution/EXECUTION_PROGRESS.md

## Honesty / draft-language scan

- Hits (non-comment): **0**

## Key page sample

| File | Draft scan | Approx token words |
|---|---|---:|
| `app/lpg-price-in-pakistan/page.tsx` | OK | 1421 |
| `app/lpg-cylinders/12-kg-domestic-cylinder/page.tsx` | OK | 845 |
| `app/management-review/page.tsx` | OK | 832 |
| `app/projects/page.tsx` | OK | 520 |
| `app/lpg-hub/[slug]/page.tsx` | OK | 1470 |
| `app/page.tsx` | OK | 961 |

## Notes (not automatic fails)

- All registry pages remain `review` / noindex until publish ladder.
- Content quality Good-bar for all 116 URLs still requires editorial V3 pass; this report is integrity + honesty + systems.
- OGRA price still sourced via press coverage note until PDF attached.
- Illustrative AI images remain; captions should mark illustrative.

## How to spot-check manually

1. `NEXT_PUBLIC_SITE_MODE=demo npm run dev` → `/management-review/`
2. Confirm amber demo banner + DEMO project badges on `/projects/`
3. `NEXT_PUBLIC_SITE_MODE=production npm run dev` → `/projects/` empty honest state, no DEMO prices
4. Price flagship shows 279.34 and MoM table

