# What each checklist item means (plain language)

This is the A–L list explained so a non-technical owner knows *why* we asked and *what you already answered* (27 Oct 2026).

---

## A — Money pages (price on Google)

**A1 — OGRA price**  
OGRA publishes the official LPG **rupees per kg** most months (usually from the **1st**). Without that number on our site, Google sees empty or guessed prices and we look weak.  
**Done for now:** October 2026 = **Rs 279.34 / kg** (same for every city), checked into `data/prices.json`.  
**Your job every month:** on/after the 1st, send screenshot of OGRA notification OR we update from ogra.org.pk and you confirm.

**A2 — Different city rates?**  
Sometimes cities add delivery on top, but the **notified per-kg** is national.  
**Your answer:** all cities same OGRA per-kg. **Applied.**

**A3–A4 — Licence**  
Scan proves the number `09024041999` is real; digit check stops typos.  
**Status:** you will attach scan / confirm match. Site already shows the number.

**A5–A6 — Cylinder markings + partner rule**  
Photos of stamps + “partners only send marked cylinders” = honest “certified” language.  
**Your answer:** yes to partner rule; marking photos in the pack. **Applied.**

**A7 — Deposit / exchange / delivery terms**  
Stops every page saying only “ask us”.  
**Your answer:** you offer deposit, exchange, new empty, delivery. **Applied** in `commercial-terms.json`.

**A8 — Serper key**  
Old key was in chat (security).  
**Your answer:** no need. **Skipped.**

---

## B — Safety trust

**B1–B3** were about naming Haroon publicly.  
**Your answer:** he OK’d review, but **do not put his name on the site** — use **THE LPG CO. team**; UK-related training + 12 years experience in team wording.  
**Applied:** public byline = safety team; safety pages marked reviewed 27 Oct 2026.

**B4 — Emergency numbers**  
**Applied:** 1122 + company number for non-emergency.

---

## C — Photos

Google likes real photos of *your* business.  
**Your answer:** use current pack now; replace later with camera shots if needed.  
**Applied:** all 72 images live for boss/partner preview.

---

## D — Cities (“3 partner calls” explained)

**What “3 partner calls” meant:**  
Before Google trusts “LPG in Lahore”, we normally *phone three local shops* and do *one timed delivery* so we are not inventing coverage. That is Gate L in the SEO method.

**What you said instead:**  
Your Excel/list *is* the partner network; one partner can cover a whole city with a team; you take orders and deliver ~1 hour or the distributor calls the lead; 24/7 intake; write local service facts.

**What we did:**  
Enabled Islamabad, Rawalpindi, Lahore, Karachi in `city-overrides.json` with your delivery target and local notes. We still **do not publish partner phone numbers** on the site (privacy) — counts and coverage yes, named phones only with listing consent when you want directories.

---

## E — Launch tech (later)

Supabase, hosting, Search Console, Bing, GA4, email, Google Business, call tracking, response SLA.  
**Your answer:** later; reply within minutes (already on site).  
**Listed in** `PENDING_LATER.md`.

---

## F — Legal

Privacy, terms, showing OGRA prices, lead sharing with distributors.  
**Your answer:** OK. Competitor sites (flamora, cylin, ppgl, etc.) also show prices/policies — we keep ours clearer and OGRA-sourced.  
**Applied** as owner OK in decision log; drafts stay until a lawyer deep-review if you want.

---

## G — Business facts

**Your answers applied:** registered **1999**; legal name = company name; **all three roles** (marketer/distributor, reseller, referral); WhatsApp = same number, few minutes; socials **@thelpgco**.

---

## H — Products

**Your answers:** you manufacture; standard sizes; inventory; same-day where network can; photos attached; competitive/manufacturer pricing (we avoid unverifiable “cheapest in Pakistan” for Google trust).  
**Engineering (I)** stays pending. **Urdu (K) cancelled** 27 Oct 2026 — English-only site; news/OGRA ritual remains under PENDING_LATER.

---

## J — Network

**Your answer:** consent for network data; enforce rules on partners.  
**Applied** in partner-standards; still no public phone book until you ask for near-me listings.

---

## L — “Forbidden” list

You asked not to forbid claims. We write **confidently** with your policies (1-hour target, nationwide network, manufacturer). We still avoid **fake stock SKUs with invented rupee prices** until you send a price list — gas price is OGRA-real; product rupee stickers can wait.

---

## Monthly price ritual (for you + us)

1. On the **1st** (or when OGRA posts), open ogra.org.pk LPG notified prices.  
2. Update `data/prices.json` (new row at top: perKgPkr, dates, sourceUrl, verifiedBy).  
3. Redeploy. Cylinder table recalculates automatically.  
4. Keep old months for history.
