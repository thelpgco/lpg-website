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

## Facts to confirm (twin-city delivery pages, 30 Oct 2026)

These now appear on `/lpg-in-islamabad/`, `/lpg-in-rawalpindi/`, `/lpg-home-delivery/` and `/llms.txt`. They live in `lib/local-delivery.ts`. Tell Claude what to remove or change.

- [ ] **Islamabad areas:** G-6 to G-15, F-6/F-7/F-8/F-10/F-11, E-7, E-11, D-12, I-8/I-9/I-10/I-11/I-14/I-16, H-8/H-9/H-11/H-13, B-17, Multi Gardens, Bahria Town, Bahria Enclave, DHA 1–2, Gulberg Greens, Gulberg Residencia, PWD, Police Foundation, Jinnah Garden, Soan Garden, Tarnol, Koral, Ghauri Town, Bhara Kahu. Remove any you do not actually reach.
- [ ] **Rawalpindi areas:** Saddar, Raja Bazaar, Commercial Market, Satellite Town, Westridge, Chaklala Scheme III, Askari, Bahria Town 1–8, DHA 1–2, Gulraiz, PWD, Airport Housing Society, Adiala Road, Peshawar Road, Dhok Kala Khan.
- [ ] **Delivery time:** the pages say "target about 60 minutes in covered areas when a local team is available". Is that right for both cities, and is there a typical time you can state (for example "most G-sector orders arrive in 30–60 minutes")?
- [ ] **Payment methods:** the pages say "cash on delivery for home refills; other methods agreed per order". Do you take JazzCash, Easypaisa, bank transfer or card? List them and they go on the page.
- [ ] **Delivery charge:** is there a fixed delivery fee in Islamabad/Rawalpindi (or free delivery)? Competitors state theirs; a stated number gets quoted by Google's AI answers.
- [ ] **Cylinder deposit:** the price of a new 11.8 kg and 45.4 kg cylinder (deposit), so it can be shown next to the gas price.
- [ ] **Composite cylinders:** which composite sizes do you stock (5, 10, 13 kg?).

## Off-site work for Google rankings and AI answers

- [ ] **Google Business Profile** (highest impact for "lpg delivery" near me searches): category "Propane supplier" or "Gas cylinders supplier", service area = Islamabad + Rawalpindi, 24/7 hours, phone, website link to `/lpg-in-islamabad/`, 10+ real photos, products list with cylinder sizes, and a post each month with the new OGRA price.
- [ ] **Reviews:** ask every satisfied customer for a Google review (a WhatsApp message with the review link after delivery). Reply to every review. Never buy or write reviews.
- [ ] **Same name, address and phone everywhere** ("THE LPG CO. PAKISTAN, Office #99, Service Road, Sector G-12, Islamabad, +92 339 4022940"): Facebook page, Instagram, LinkedIn, Bing Places, Apple Business Connect, OLX, Yellow Pages Pakistan, businesslist.pk, Rozee/Zameen-type business directories.
- [ ] **Facebook page:** the AI Overview cites a competitor's Facebook page. Fill in yours fully (hours, phone, areas, prices) and post each month.
- [ ] **Backlinks / mentions:** local news or blog mentions of the monthly OGRA price, housing-society notice boards and Facebook groups (G-13, Bahria Town, DHA), supplier listings on society websites, and partner/distributor sites linking to `/lpg-in-islamabad/`.
- [ ] **Search Console:** after this deploy, URL Inspection → Request indexing for `/lpg-in-islamabad/`, `/lpg-in-rawalpindi/`, `/lpg-home-delivery/` and `/`. Check "Rich results" for FAQ and Service markup.
- [ ] **Bing Webmaster Tools:** add the site and submit the sitemap (ChatGPT search and Copilot use Bing's index).

## AdSense (later)

- [ ] Add an **advertising section to the privacy policy** only once AdSense ads are actually running: Google and its partners use cookies to show ads based on visits, and users can opt out in Google Ads Settings.
- [ ] Add a Google-certified **consent banner** for EEA/UK visitors.
- [ ] Add **`/ads.txt`** with your publisher ID after approval.
- [ ] Show ads only on guides, safety pages and tools, never on order, city, commercial, industry or service pages (see `01_FIX_PLAN.md`, Phase 4).

## Every month

- [ ] Enter the new **OGRA LPG price** in `data/prices.json` on the 1st (the steps are in the file's `_process` note). Every price, table and cost example on the site updates from it.
