# Page Content Factory — using research data

**Purpose:** Every money, city, network and company page is written from the same research stack, not invented copy.

**Owner instruction (29 Oct 2026):** Use our network dealers **and** `lpg data.md` / `lpg data2.md` on the website. Two source labels only — both are published content.

**Owner writing rules (29 Oct 2026 — supersede earlier “minimal claim” hedge):**
- Write for **trust**: OGRA licence, years operating, certified cylinders, partner standards, complaints path.
- Use **delivery times, locations and coverage** from `commercial-terms.json`, `city-overrides.json` and network/directory data (e.g. ~1 hour target in covered areas; confirm window on order).
- Position services as **nationwide across Pakistan** (all provinces + ICT) with the densest coverage in major cities — still confirm each street on the order.
- Cover **all angles** on every page (what / cost / how / where / who / safety / next step). A visitor should leave knowing we are a full-service, trustworthy LPG company.
- Use **pictures we have** (`lib/media.ts` / gallery maps) on trust, services, projects and city pages.
- Write **original project / case-study profiles** for the projects section. They must feel specific and professional.
- Do **not** invent fake OGRA licence numbers, fake phone numbers, or competitor defamation. Numbers for deposits/fees still come from owner terms or stay “confirmed on quote” when not set.

**Public UI ban list (never on customer pages):**
- Words: `illustrative`, `DEMO`, `demo layout`, `management demonstration`, `showcase` (as a disclaimer)
- File / system names: `lpg data.md`, `lpg data2.md`, `network.json`, `partners_master`, `dealer workbook`, `by-city.json`
- Meta lines: “Named directory rebuilt…”, “partners in network.json”, “from research files”
- Image captions must be plain product/scene captions — never “(illustrative)”
- Internal source labels stay in docs/scripts only; on-page buckets are **Our network dealers** and **Local distributors** only.

---

## 1. Data map (what feeds which pages)

| Source | Path | Use on site |
|--------|------|-------------|
| Owner dealer workbook | `keywords and research/LPG_dealers_all_regions.xlsx` → dealers CSV | **Our network dealers** on city + `/our-network/` |
| Partners master | `docs/seo-plan/data/partners_master.csv` | **Our network dealers** (city, near-me, shops) |
| Distributor / industry rows | `keywords and research/lpg data2.md` | **LPG research data** on city hubs |
| Marketers / plants | `keywords and research/lpg data.md` | **LPG research data** on companies + city pages |
| Built JSON | `data/directory/by-city.json`, `listings.json`, `marketers.json`, `summary.json` | Runtime via `lib/directory.ts` |
| Counts / hubs | `data/network.json` | Headline counts; must reconcile with directory over time |
| Prices | `data/prices.json` | All price pages + city `PriceBlock` |

**Rebuild directory after research edits:**

```bash
python docs/seo-plan/scripts/37_build_directory_from_research.py
```

---

## 2. Source labels (two only)

1. **Our network dealers** — dealer workbook + partners master. Name, area, address, listed phone.
2. **From LPG research data (lpg data.md / lpg data2.md)** — distributors, marketers, plant cities published on the site.

Street coverage is still “confirmed on each order” (ops), not a reason to hide research names.

---

## 3. SOP — one page = one pass

### Step A — Intent + URL
Confirm primary keyword, page type (money / city / trust / guide), and which data buckets apply.

### Step B — Pull research for this page
1. Open `lib/directory.ts` helpers: `listingsForCity`, `namedSuppliersForCity`, `marketersForCity`, `marketerSample`.
2. Pull price month from `data/prices.json`.
3. Pull city override notes from `data/city-overrides.json`.
4. Skim competitor / keyword notes only for gaps (Serper teardown if page is still Weak).

### Step C — Brief (5 bullets max)
- H1 promise
- 3 information-gain facts (named suppliers, OGRA rate, local logistics)
- What we will **not** claim
- FAQs to update (remove “we never publish names” where names are now shown)
- Internal links (price, order, network, near-me)

### Step D — Write / wire
- City hubs: render `<SupplierDirectory cityName listings={listingsForCity(slug)} />`.
- Network / near-me / shops: sample owner names + link to city pages.
- Companies page: marketer sample table from `lpg data.md` + licence how-to (not a ranking).
- Money pages: OGRA numbers + worked examples; link to city supplier lists, do not invent deposits.

### Step E — Gate
- Labels correct?
- Counts reconcile with on-page tables?
- Phones only from research rows (no invented numbers)?
- No “we deliver everywhere” / fake minutes?
- Rebuild + smoke the URL.

---

## 4. Page type recipes

### City hub (`/lpg-in-{city}/`)
1. Intro with order path + honesty.
2. How supply works + localities.
3. **Named suppliers** (`SupplierDirectory`).
4. Local angles / season note.
5. `PriceBlock` + commercial CTA.
6. FAQ: who delivers → name 3–5 example listings + “we confirm who fulfils your order”.

### `/our-network/`
1. Totals from `directorySummary` + `network.json` (explain both if they differ).
2. Province table.
3. Sample of owner-network names by city.
4. Link to city hubs for full lists.

### `/lpg-near-me/`
1. Match flow.
2. Main cities with **example named shops** (3–5 per hub).
3. Form CTA.

### `/lpg-companies-in-pakistan/`
1. Licensing explainer (keep).
2. Sample marketing companies / plant cities from `marketers.json`.
3. Point to OGRA for full licence check — not a complete official directory.

### `/lpg-shops-and-agencies/`
1. Role explainer.
2. Named shop samples from owner_network + market_listing.
3. Become-a-partner CTA.

### Money pages (price / cylinder / kit)
1. OGRA figure + date + provisional note if PDF missing.
2. Worked kg examples.
3. Link “suppliers in Karachi / Lahore / …” — do not dump full national register on money pages.

---

## 5. Batch order (enrichment)

1. `/our-network/`, `/lpg-near-me/`, `/lpg-shops-and-agencies/`, `/lpg-companies-in-pakistan/`
2. Dynamic hubs: Karachi, Lahore, Islamabad, Faisalabad, Peshawar, Quetta, Multan, Gujranwala, Rawalpindi
3. Static city hubs (Muzaffarabad, Murree, Gilgit, Skardu, Abbottabad, …)
4. Money cluster cross-links to city directories
5. Re-score Weak trust pages after names + captions fixed

---

## 6. Voice checklist (every page)

- [ ] Nationwide / multi-province coverage stated where relevant
- [ ] Delivery target or city `deliveryNote` used (not invented minutes beyond overrides)
- [ ] Licence + certified-cylinder trust line
- [ ] Named dealers / research listings where the page type calls for them
- [ ] Gallery / media from existing assets
- [ ] Clear CTA (order / WhatsApp / engineering quote)
- [ ] FAQ covers cost, speed, coverage, safety

## 7. Still stronger with owner pack (optional upgrades)

- Official OGRA price PDF attachment
- Exact deposit / exchange fee schedule (PKR)
- Replace AI creatives with phone photos when available
- Reconcile `network.json` totals vs `data/directory` counts
