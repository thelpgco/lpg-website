# Pending later (post–copy update, 27 Oct 2026)

Work intentionally deferred until launch gates, assets, or rituals are ready. **Do not flip pages to `published` in `data/pages.json` until the matching item is done.**

## E1–E9 — Launch tech

- Search Console / Analytics property verification and baseline export
- Sitemap and robots aligned with published-only registry
- Core Web Vitals pass on home, price, order, and top hub templates
- Structured data validation (LocalBusiness, FAQ, Product/Offer where used)
- Form → CRM / WhatsApp routing and lead logging
- Error monitoring and uptime check on production host
- Redirect map for any URL changes from preview to live
- Security headers, HTTPS, and env secrets on the host
- Pre-launch crawl: noindex drafts, no broken internal links on published set

## I — Engineering projects

- Service / project pages gated on `data/projects.json` (consent + photos)
- Portfolio copy and case studies for pipelines, tanks, manifolds, conversions
- Indexing only after owner sign-off per project

## News and OGRA calendar

- News / OGRA price update posts (not duplicate thin city pages)
- Editorial calendar tied to monthly OGRA notification (see below)
- **Urdu locale cancelled** (27 Oct 2026): no `/ur/` pages, no hreflang — English-only site

## Media — real camera photos

- Replace temporary / AI creatives with real G-12 office, OGRA stamp, licence scan, valve/seal, delivery, and stock markings
- See `MEDIA_STATUS.md` and `OWNER_PHOTO_BRIEF.md`

## Monthly price update ritual (1st of month)

- On or after each OGRA monthly notification (target: **1st**), verify official source
- Update `data/prices.json` with verified per-kg and effective date
- Spot-check price block on home, national price page, and city pages
- Log the update in the SEO decision log if figures changed
