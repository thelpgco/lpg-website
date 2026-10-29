# Owner to-do list

Things only the owner can do. Tick them off as you go; tell Claude when one is done so the site can use it.

## Google and trust

- [ ] **Search Console:** click Verify (the DNS TXT record is already in place), submit `https://thelpgco.pk/sitemap.xml`, and use URL Inspection → Request indexing for the top pages.
- [ ] **Google Business Profile:** create or claim the profile for Office #99, Service Road, Sector G-12, Islamabad, with 24/7 hours and the phone number. Ask real customers to leave reviews there. Never post or buy reviews.
- [ ] **Google Maps pin:** send the office's latitude and longitude (from the Business Profile or Google Maps). Claude adds it as `geo` in the LocalBusiness schema.
- [ ] **GA4:** mark `phone_click`, `whatsapp_click` and `generate_lead` as key events.

## Content to send

- [ ] **Project photos:** 2 or more photos for each of the 8 project pages (the photos can be AI-styled under company policy). Exact year for each project, if known.
- [ ] **Client references:** a client name or quote for any project, only with that client's written consent.
- [ ] **Awards:** if THE LPG CO. has a real award, send its name, the awarding body and the year so it can be featured.
- [ ] **Founding year:** confirm 1999 (the site uses 1999; an older note says "21 years").

## AdSense (later)

- [ ] Add an **advertising section to the privacy policy** only once AdSense ads are actually running: Google and its partners use cookies to show ads based on visits, and users can opt out in Google Ads Settings.
- [ ] Add a Google-certified **consent banner** for EEA/UK visitors.
- [ ] Add **`/ads.txt`** with your publisher ID after approval.
- [ ] Show ads only on guides, safety pages and tools, never on order, city, commercial, industry or service pages (see `01_FIX_PLAN.md`, Phase 4).

## Every month

- [ ] Enter the new **OGRA LPG price** in `data/prices.json` on the 1st (the steps are in the file's `_process` note). Every price, table and cost example on the site updates from it.
