# THE LPG CO. PAKISTAN (thelpgco.pk)

Lead-generation and SEO site for an OGRA-licensed LPG marketer and distributor in Pakistan. Standalone Next.js 16 app (App Router, TypeScript, Tailwind). Strategy: `docs/seo-plan/THE_LPG_CO_SEO_MASTER_PLAN.md`. **Writing and publishing (30K clicks goal):** `docs/seo-plan/CONTENT_AND_TRAFFIC_PLAN.md` · P1 queue `docs/seo-plan/P1_WRITING_QUEUE.csv`. **What the owner must send next:** `docs/seo-plan/OWNER_WAVE0_CHECKLIST.md`.

## Run

```bash
cd lpg-website
cp .env.example .env.local   # fill in what you have; defaults for phone and licence are in lib/site.ts
npm install
npm run dev                  # http://localhost:3000
npm run build && npx next start
```

## Where things live

| What | Where |
|---|---|
| Name, licence no., phone, WhatsApp, office, reviewer | `lib/site.ts` |
| Network counts by city and province (no names or numbers) | `data/network.json` (built by `docs/seo-plan/scripts/15_export_site_data.py`) |
| Engineering services | `lib/services.ts` |
| Lead form options, validation, storage | `lib/lead-options.ts`, `lib/leads.ts`, `app/api/leads/route.ts` |
| Titles and meta descriptions of static pages (one source of truth) | `data/meta.json` (hub, price-city and service titles are built in their route files with `fitTitle`) |
| Metadata helper (canonical, robots, Open Graph) | `lib/seo.ts` |
| Page registry: every planned page, its status, built flag, lastmod | `data/pages.json` (managed with `scripts/page-status.mjs`) |
| Per-page writing briefs, keyword placement, plan | `docs/seo-plan/briefs/`, `docs/seo-plan/THE_LPG_CO_SEO_MASTER_PLAN.md` |
| What was checked against the method, and what is open | `docs/seo-plan/COMPLIANCE_CHECK.md`, `docs/seo-plan/DECISION_LOG.md` |

## The gates (what makes a page indexable)

The site never publishes a claim it cannot support. **A page is indexable only when BOTH are true:** its status in `data/pages.json` is `published`, and its data gate (below) is open. The sitemap lists only indexable pages. Every built page starts at `review`, so nothing is indexable until you publish it.

```bash
node scripts/page-status.mjs list                     # every page and its state
node scripts/page-status.mjs list review              # only one state
node scripts/page-status.mjs set /lpg-safety/ approved   # one step at a time: draft > review > approved > published
```

Unbuilt pages cannot leave `draft`. The publication checklist for each page is at the end of its brief in `docs/seo-plan/briefs/`.

| File | Opens | What to enter |
|---|---|---|
| `data/prices.json` | The 4 national price pages, and Karachi/Lahore price pages (with city prices) | A monthly OGRA notification, **checked against the official source**: `perKgPkr`, `effectiveFrom`, `sourceUrl`, `verifiedBy`, `verifiedOn` |
| `data/city-overrides.json` | A city hub such as `/lpg-in-karachi/` | `indexable: true`, `verifiedOn`, measured `testOrderMinutes`, `localNotes` |
| `data/projects.json` | `/services/` and the 8 service pages | A real project with client consent |
| `data/safety-review.json` | The "reviewed by Mr Rasheed on {date}" line, per safety page | An entry under `pages` for that path with the date, only after he has read and signed it |

## URL notes

`/lpg-in-{city or province}/` is one dynamic route (`app/lpg-hub/[slug]`) served through a rewrite in `next.config.mjs`. `/lpg-hub/...` redirects to the public URL and is blocked in `robots.txt`.

## Leads

- Production: set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` and run `supabase/leads.sql`. Without them the API returns 503 on purpose, so leads are never lost silently.
- Development: with no Supabase keys, leads are appended to `.data/leads.jsonl`.
- Optional: set the `RESEND_*` variables for an email on every lead.
- The form posts to `/api/leads/` (trailing slash is required because `trailingSlash` is on).
- The in-memory rate limiter and duplicate check (same phone and request within 15 minutes) are per server instance. Swap them for Redis/Upstash if you run several instances.
- Each lead stores the page id, the consent wording version and time, UTM tags and referrer.
- Analytics: set `NEXT_PUBLIC_GA_ID` (GA4 id). Nothing is sent without it. Events: `generate_lead`, `phone_click`, `whatsapp_click`.

## SEO tooling (Python, not part of the website)

`docs/seo-plan/scripts/intel/` holds the Serper runner, competitor crawler and analysis. They read `SERPER_API_KEY` from `.env.local`. Data goes to `docs/seo-plan/intel/intel.db` (git-ignored). Commands are in section 22 of the plan.

With the production server running (`npx next start -p 3100`), these check the site against the method:

```bash
python docs/seo-plan/scripts/18_site_audit.py          # crawl every built page; writes docs/seo-plan/audit/
python docs/seo-plan/scripts/21_build_page_briefs.py   # one brief per page, overlap pairs, priority score
python docs/seo-plan/scripts/22_export_meta_tags.py    # docs/seo-plan/meta-tags.csv from the running site
```

The Serper key is a secret: keep it only in `.env.local`, never in code or docs. Rotate it if it was ever shared.

## Before launch

- Re-check the licence number against the licence document, and keep a scan on file.
- Keep proof for "OGRA-certified cylinders" (marking photos, certificate IDs).
- Get the safety reviewer's sign-off, then set `reviewedOn`.
- Have `/privacy` and `/terms` reviewed by a lawyer.
- Connect Supabase, Search Console, Bing Webmaster Tools and GA4.
- Set `NEXT_PUBLIC_SITE_URL` on the host only if it differs from `https://thelpgco.pk`.
