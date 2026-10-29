# What we need from you (Wave 0)

Until these items are done, money pages stay **`review` / noindex**. We can keep drafting copy; we **cannot** honestly publish price, safety “reviewed by”, or city hubs.

Send files or answers in WhatsApp/email, or drop them into the paths noted. Reply in any order — each item unblocks a different page set.

---

## Priority 1 — unlocks ~20–28K of the traffic model (price pillar)

### W0-1 · Verified OGRA monthly price
**You send:**
1. Screenshot or PDF of the **current** OGRA LPG notified price page/notification  
2. Numbers: **price per kg (PKR)**, **effective from date**, **source URL**  
3. Your name as checker + date you checked  

**We enter into:** `data/prices.json` like:

```json
{
  "month": "2026-10",
  "effectiveFrom": "2026-10-01",
  "perKgPkr": 0,
  "sourceUrl": "https://ogra.org.pk/...",
  "verifiedBy": "Your Name",
  "verifiedOn": "2026-10-26",
  "cities": {}
}
```

Replace `0` with the real per-kg figure. Optional: `cities.karachi` / `cities.lahore` only if the notification (or your checked sheet) really differs by city.

**Unlocks publish for:** PR-001, PR-002, PR-003, CY-002, PR-004, PR-005 (and price numbers on home).

---

## Priority 2 — trust and compliance

### W0-2 · Licence scan
- Clear photo/PDF of OGRA licence showing **09024041999** (or correct number if digits differ)  
- Confirm digits against the public OGRA register once  

**Unlocks:** strong claims on `/licences-and-compliance/`

### W0-3 · Cylinder certification proof
- Photos of **cylinder body markings** (OGRA / manufacturer marks) on stock you actually supply  
- Optional: certificate IDs / letters  

**Unlocks:** firm “certified cylinder” wording (we softened site copy until this exists)

### W0-4 · Original photos (information gain)
At least one usable photo each:
- Office exterior or reception (G-12)  
- Marked cylinder  
- Delivery / vehicle or handoff (no partner face without consent)  
- Regulator / hose setup (safe example)  

Filename tip: descriptive, e.g. `islamabad-g12-office.jpg`

### W0-10 · Lawyer glance (can be short written OK)
Privacy, terms, and that we may show **OGRA-notified** prices (not “our special cheap rate”) without misleading advertising issues.

---

## Priority 3 — safety pages

### W0-5 · Haroon Rasheed
1. Written OK to name him on the site + short bio (years, role)  
2. After each safety page is final: he reads it and you send **page path + sign-off date**  

We record in `data/safety-review.json`, e.g. `"/lpg-safety/": "2026-11-03"`.

**Unlocks:** SF-001, SF-002, reviewer byline, TR-014 bio page.

---

## Priority 4 — city hubs (Islamabad, Rawalpindi, Lahore, Karachi)

### W0-6 · Gate L per city
For **each** city before that hub goes live:
1. **3 partner calls** logged (date, who, can they take orders for us, areas)  
2. **1 timed test order** (request → delivery minutes, date, area)  
3. One local note or photo if possible  

**Unlocks:** `/lpg-in-islamabad/`, `/lpg-in-rawalpindi/`, `/lpg-in-lahore/`, `/lpg-in-karachi/`

Also useful: your **real delivery / deposit / exchange terms** (even a WhatsApp note) so we can stop saying “confirmed per order only”.

---

## Priority 5 — launch plumbing

### W0-7 · Supabase
- Create project, run `supabase/leads.sql`, put URL + service key in `.env.local` / hosting env  
- Without this, production lead form returns errors  

### W0-8 · Search Console + Bing + GA4
- Verify `thelpgco.pk` in Google Search Console and Bing Webmaster  
- GA4 measurement ID → `NEXT_PUBLIC_GA_ID`  

### W0-9 · Serper API key
- **Rotate** the key that was shared in chat  
- Put the new key only in `.env.local` (never in git or chat)

---

## Nice-to-have (Wave 2–3, not needed for first money publish)

| Item | Why |
|---|---|
| Dated news sources for shortage / supply pages | NW-001, NW-002 |
| Real appliance stock + supplier + prices | AP-002, AP-003 |
| Written partner consent to name dealers | Directories / near-me |
| Distributor programme terms | Become-a-distributor page |
| Urdu writer samples | `/ur/` pillar later |

---

## What we already did (you do not need to redo)

- 30K playbook, P1 queue, title/meta bank  
- Wave 0 rows in `DECISION_LOG.md` (all Fail until you send evidence)  
- Expanded copy on flagship price, order, cylinders, sizes, delivery, per-kg, OGRA, cylinder price, Karachi/Lahore price pages  
- Titles/metas aligned to the CTR bank in `data/meta.json` for built P1 pages  
- Pages remain **`review` = noindex** on purpose  

---

## Suggested send order (fastest path to first indexed money pages)

1. **W0-1** OGRA price pack  
2. **W0-2 + W0-3** licence + cylinder marking photos  
3. **W0-7 + W0-8** Supabase + Search Console/GA4  
4. **W0-9** rotate Serper key  
5. **W0-5** Haroon consent + first safety sign-off  
6. **W0-6** city test packs one city at a time  
7. **W0-4** photos + **W0-10** lawyer OK  

When you send an item, say which **W0-ID** it is. We will mark **Pass** in `DECISION_LOG.md` and only then move that page toward `approved` → `published`.
