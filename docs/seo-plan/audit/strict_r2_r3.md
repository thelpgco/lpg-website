# Strict content-quality re-audit: comparison/guide, safety and commercial pages

**Site:** `D:\SparePartsHub-App\lpg-website` · **Audited:** 28 Oct 2026 · **Pages:** 31 · **No provisional grades.**

## How this was done

- I read **every line of `app/<slug>/page.tsx`** for all 31 pages: every paragraph, table cell, list item and FAQ answer.
- I also read what the page pulls in at render time:
  - `lib/site.ts`, `data/commercial-terms.json`, `data/network.json`, `data/prices.json`
  - `components/SafetyReview.tsx` and `data/safety-review.json`
  - the gallery map and alt text in `lib/media.ts`
  - the SERP title and description in `data/meta.json`
- I did **not** run the site in a browser. "What the user sees" comes from reading the code and data.
- Competitor notes under `content-research/` were used only to judge "does a competitor already have this" (information gain).

## Rubric as applied

Criteria are A (answer-first), C (coverage), G (information gain), H (facts honesty), K (on-page craft), D (differentiation) and M (media alts). Each is 0–3. The score order below is **A/C/G/H/K/D/M**.

| Grade | Rule |
|---|---|
| **GOOD** | total ≥ 17 **and** A ≥ 3, G ≥ 3, H ≥ 3, **no draft language**, H1/URL promise kept |
| **BORDERLINE** | 11–16, **or** ≥ 17 but fails a gate (written as "good-but-gated") |
| **WEAK** | ≤ 10, **or** H ≤ 1, **or** A ≤ 1, **or** promise mismatch, **or** structure-only with no numbers, sources or unique substance |

Calls I made, so you can challenge them:

- **Promise mismatch.**
  - If the *headline noun* of the H1 or URL is not delivered (a "price" page with no price, a "companies" page with no companies, a "regulations" page that names no regulation), the page is **WEAK** whatever its score.
  - If only a secondary clause is missing ("…and cost"), the page is capped at BORDERLINE and I say so.
- **Draft language** means any text a visitor or SERP snippet sees that reads as workflow, not content. Examples: "awaiting final team sign-off", "Published after our safety reviewer signs off", "How listings will work… until then", "This log is empty on purpose".
- **G = 3** needs at least three concrete extras that a competitor does not already give. "We confirm before you agree" is not an extra.
- **M (this audit's scale):**
  - M0 = an AI sample document or fake HQ is shown as a real company asset.
  - M1 = AI creatives in a "Photos" gallery with no disclosure, or the image is irrelevant to the page.
  - M2 = honest lead image, relevant objects.
  - M3 = real photos. No page has them, because every file under `public/images` is a "ChatGPT-edited pack … temporary creatives" (`MEDIA_STATUS.md`).

## Result: 0 Good, 24 Borderline, 7 Weak

| # | Page | Grade (score) | A/C/G/H/K/D/M | Prior audit | Verdict |
|---|---|---|---|---|---|
| 1 | `/what-to-do-if-you-smell-gas/` | BORDERLINE, good-but-gated (18) | 3/3/2/3/3/3/1 | Good 18 | keep, add numbers |
| 2 | `/lpg-vs-lng/` | BORDERLINE, good-but-gated (17) | 3/3/2/3/2/3/1 | Borderline (P) | keep |
| 3 | `/propane-vs-butane/` | BORDERLINE, good-but-gated (17) | 3/3/3/2/2/2/2 | Good 18 | keep, fix contradiction |
| 4 | `/lpg-composition-and-properties/` | BORDERLINE, good-but-gated (17) | 3/3/2/3/2/2/2 | Good (P) | keep, add sources |
| 5 | `/lpg-cylinder-blast-causes-and-prevention/` | BORDERLINE, good-but-gated (17) | 3/3/3/2/3/2/1 | Good 19 | keep, clear draft flag |
| 6 | `/lpg-regulator-problems-and-repair/` | BORDERLINE, good-but-gated (17) | 3/3/3/2/2/2/2 | Good (P) | keep, clear draft flag |
| 7 | `/lpg-vs-sui-gas/` | BORDERLINE (16) | 3/3/2/2/2/3/1 | Good 19 | keep, add tariff |
| 8 | `/lpg-regulators/` | BORDERLINE (16) | 3/3/2/2/2/2/2 | Good 17 | keep, add numbers |
| 9 | `/lpg-leak-detector/` | BORDERLINE (15) | 3/2/2/2/2/3/1 | Good (P) | keep, rewrite buy section |
| 10 | `/auto-lpg-in-pakistan/` | BORDERLINE (15) | 3/2/2/3/2/2/1 | Borderline (P) | keep, absorb kit page |
| 11 | `/what-is-lpg/` | BORDERLINE (14) | 3/2/1/3/2/2/1 | Borderline (P) | keep, rewrite for Pakistan |
| 12 | `/how-to-choose-a-licensed-lpg-supplier/` | BORDERLINE (14) | 3/2/2/2/2/2/1 | Good (P) | keep, rewrite |
| 13 | `/lpg-shortage-pakistan/` | BORDERLINE (14) | 2/2/2/2/2/3/1 | Good 16 | keep, fill log |
| 14 | `/lpg-filling-stations/` | BORDERLINE (14) | 3/2/2/2/2/2/1 | Borderline 15 | rewrite |
| 15 | `/lpg-vs-cng/` | BORDERLINE, capped (13) | 3/2/1/2/2/2/1 | Good (P) | rewrite or retitle |
| 16 | `/bulk-lpg-supply/` | BORDERLINE (13) | 3/2/1/2/2/2/1 | Good 16 | rewrite, absorb bowser |
| 17 | `/lpg-plant-in-pakistan/` | BORDERLINE, capped (13) | 3/2/1/2/2/2/1 | Borderline (P) | rewrite |
| 18 | `/lpg-safety/` | BORDERLINE (12) | 3/2/1/2/2/1/1 | Borderline (P) | rewrite |
| 19 | `/how-lpg-is-produced-and-supplied/` | BORDERLINE (12) | 3/2/1/2/2/1/1 | Borderline (P) | merge into supply |
| 20 | `/industrial-lpg-supply/` | BORDERLINE (12) | 2/2/2/2/1/2/1 | Borderline 14 | rewrite |
| 21 | `/commercial-lpg-supply/` | BORDERLINE (11) | 2/3/1/2/1/1/1 | Borderline 15 | rewrite |
| 22 | `/lpg-marketing-company-vs-distributor-vs-dealer/` | BORDERLINE (11) | 3/2/1/2/2/1/0 | Borderline (P) | keep as canonical roles page, rewrite |
| 23 | `/lpg-business-in-pakistan/` | BORDERLINE, capped (11) | 2/2/1/2/2/1/1 | Borderline (P) | merge |
| 24 | `/lpg-shops-and-agencies/` | BORDERLINE (11) | 2/2/1/2/2/1/1 | Borderline (P) | merge |
| 25 | `/ogra-lpg-regulations-pakistan/` | **WEAK**, promise mismatch (11) | 2/2/1/3/2/1/0 | Borderline (P) | rewrite or hold-noindex |
| 26 | `/lpg-kit-price-in-pakistan/` | **WEAK**, promise mismatch (11) | 1/1/2/3/2/2/0 | Borderline (P) | merge into auto-LPG |
| 27 | `/lpg-supply-in-pakistan/` | **WEAK**, structure without numbers (10) | 2/1/1/2/2/1/1 | Borderline (P) | rewrite or merge |
| 28 | `/lpg-companies-in-pakistan/` | **WEAK**, URL mismatch (10) | 2/2/1/3/1/1/0 | Borderline 14 | rewrite or hold-noindex |
| 29 | `/lpg-bowser/` | **WEAK** (10) | 2/1/1/2/2/1/1 | Borderline 13 | merge into bulk |
| 30 | `/lpg-near-me/` | **WEAK** (10) | 2/1/1/2/2/1/1 | Borderline 11 | merge |
| 31 | `/become-an-lpg-distributor/` | **WEAK** (10) | 2/1/1/2/2/2/0 | Borderline (P) | rewrite |

Why the grades dropped from the earlier audit:

1. Four safety pages show "This page is awaiting final team sign-off" to visitors. That is draft language.
2. Several pages state "we work with 347 partners" from a counts-only owner list, and the three counts in `network.json` do not match each other (see cross-cutting issue 3).
3. Sample documents and AI buildings are shown as real company assets.
4. Commercial pages answer nearly every question with "we confirm before you agree" and contain no number.

---

# COMPARISONS / GUIDES

### `/what-is-lpg/` — BORDERLINE (14) 3/2/1/3/2/2/1
- **Intent vs delivery:** The H1 "What does LPG stand for? Full form, meaning and uses" is answered in the first sentence, so intent is met. The page then stays at textbook level.
- **Works:**
  - The intro is answer-first: "LPG stands for Liquefied Petroleum Gas…".
  - Correct figures: "Propane turns to gas at about minus 42… butane at about minus 0.5", "One litre… roughly 250 litres of gas".
  - The "Words you will see on Pakistani LPG pages" glossary (OGRA, marketer, 11.8 kg, 45.4 kg) is useful and local.
- **Fails:**
  - Pakistan content is one sentence: "Some LPG used in Pakistan is made locally and some is imported." There is no share, no consumption and no price. That is **G1**: a competitor (ppgl) already carries a fuller property table.
  - There is no table and no source for any number.
  - It duplicates the propane/butane, composition and production pages in miniature (D2).
  - There is no lead image. The gallery is three AI family/kitchen scenes under a generic "Photos" H2 (M1).
- **Verdict: keep.** Add a Pakistan block with a sourced local-vs-import split, typical household use (kg per month) and the cylinder-size table. Then link out instead of re-explaining.

### `/lpg-vs-sui-gas/` — BORDERLINE (16) 3/3/2/2/2/3/1
- **Intent vs delivery:** "Cost, differences and when to switch". The cost side is only half delivered.
- **Works:**
  - It is the best page in the cluster.
  - The method is correct and live: "roughly 22.9 kg of LPG equals one MMBTU", so at Rs 279.34/kg that is about **Rs 6,407 per MMBTU** (I recomputed it).
  - A seven-step switching checklist.
  - A danger Note against mixing systems.
  - "Usually not [cheaper]" is honest, and the "keep Sui gas if reliable" advice is credible.
- **Fails:**
  - **The Sui side of the comparison has no number.** "Look at your Sui gas bill, find the rate per MMBTU for your slab" hands the key figure back to the reader.
  - Then: "the gap between them is small compared with the price gap". That is a claim with no figure behind it.
  - The Note title says "latest **verified** OGRA price". `prices.json` says the figure is "as reported from … Dawn / The Nation / ARY… Re-check PDF on ogra.org.pk when the file is posted", so it is verified against press, not the OGRA notification (H2).
  - The gallery includes the AI image `kitchen45` (the file name says "unrealistic"). It shows a 45 kg cylinder hooked up in a kitchen, which contradicts the page's own advice: "outside the kitchen if you can". It also includes a sample "OGRA price screen" (M1).
- **Verdict: keep.** Add a dated SNGPL/SSGC slab table with a source. Re-verify the OGRA price from the PDF. Drop the `kitchen45` image. That moves it to Good (about 19).

### `/lpg-vs-cng/` — BORDERLINE, capped by partial promise mismatch (13) 3/2/1/2/2/2/1
- **Intent vs delivery:** The H1 and SERP title both say "…Safety **and Cost**". There is no cost content.
- **Works:**
  - A clear first paragraph ("CNG is mainly a vehicle fuel").
  - A sound chemistry explanation: "Methane does not liquefy at normal temperatures however hard you press it".
  - A good FAQ on never swapping cylinders.
  - Honest "Check the rules first" Note.
- **Fails:**
  - **Cost is never discussed.** The only trace is a table row, "Price basis: Station price set under the gas pricing rules", which says nothing a reader can use.
  - No Rs/kg, no Rs/km, no conversion cost.
  - Numbers are vague: "hundreds of bar", "mild power loss" versus "noticeable power loss in many engines", with no source.
  - The "LPG vs CNG for cars" block overlaps `auto-lpg` and `lpg-kit-price` (D2).
- **Verdict: rewrite.** Either drop "and Cost" from the H1, SERP title and description, or add a sourced Rs-per-100-km comparison.

### `/lpg-vs-lng/` — BORDERLINE, good-but-gated by G2 (17) 3/3/2/3/2/3/1
- **Intent vs delivery:** "What is the difference?" is answered in the intro. Coverage is complete for the intent.
- **Works:**
  - Accurate numbers: "minus 162", "About 250 times smaller / About 600 times smaller".
  - A five-step LNG chain.
  - A "why the two get confused" list.
  - A household conclusion: "You cannot buy LNG for the kitchen."
  - No factual slips.
- **Fails:**
  - Nothing Pakistan-specific: no terminal, no share of the pipeline gas that is LNG. It is a generic explainer (G2).
  - The lead image `bulkTanks` is repeated in the gallery.
  - It is the shortest guide in the group (105 lines of JSX).
- **Verdict: keep.** Low-volume query. If you want G3, add one sourced line on Pakistan's LNG import share.

### `/propane-vs-butane/` — BORDERLINE, good-but-gated by H2 (17) 3/3/3/2/2/2/2
- **Intent vs delivery:** Delivered. The property table is strong, with correct values (about 8 bar versus about 2 bar at 20 °C, 0.50 versus 0.58 kg/L, 1.5 versus 2 times air).
- **Works:**
  - The cold-weather logic is useful and local ("Murree, Gilgit-Baltistan…").
  - A five-step cold-weather checklist, including "regulator outlet frosting".
- **Fails:**
  - **It contradicts itself.**
    - Note: "For a typical Pakistani home cylinder you get a mix, not a choice."
    - FAQ: "Domestic cylinders are… not normally labelled by propane or butane share."
    - But "Which should you use?" says: "ask your supplier for a propane-rich mix".
    - Nothing shows a Pakistani supplier can or will specify a mix. The earlier audit already flagged this.
  - The intro claims "cylinders carry a propane and butane mix" but gives no ratio and no source.
  - The table repeats the composition page (D2).
  - The gallery repeats the lead image and adds an irrelevant `bulkTanks`.
- **Verdict: keep.** Either delete the "ask for propane-rich" advice or source what mixes are sold in Pakistan. That alone takes it to Good.

### `/how-lpg-is-produced-and-supplied/` — BORDERLINE (12) 3/2/1/2/2/1/1
- **Intent vs delivery:** The intro ("two ways… separating propane and butane from natural gas… refinery by-product") is a good answer. Then it stays generic.
- **Works:**
  - A clear seven-step chain.
  - A two-source table (processing versus refinery).
  - "Filled by weight, not by volume".
- **Fails:**
  - The "Imports" section is three sentences that point to another page: "The details are on LPG supply in Pakistan".
  - No Pakistan numbers or names anywhere.
  - "An odorant is added" is stated as a bottling-plant step with no source. Elsewhere in the industry it is often added earlier in the chain.
  - It duplicates `what-is-lpg` ("Where LPG comes from"), `lpg-vs-lng` ("How LPG is made and delivered") and `lpg-supply-in-pakistan`.
  - The gallery includes `warehouseCylinders`, an AI image whose source file is named "…indane-style" (a brand lookalike), and `warehouseStaff`, an AI face image captioned "Warehouse and network stock" (M1).
- **Verdict: merge** into a single "LPG supply chain in Pakistan" page together with `/lpg-supply-in-pakistan/`.

### `/lpg-composition-and-properties/` — BORDERLINE, good-but-gated by G2 (17) 3/3/2/3/2/2/2
- **Intent vs delivery:** Delivered.
- **Works:**
  - The properties table is accurate (flammable range 2–9.5% and 1.8–8.4%).
  - **The cylinder-contents table is derived correctly.** 11.8 kg / 0.53 ≈ 22 L; 11.8 × 46 ≈ 540 MJ; 45.4 kg ≈ 86 L and 2,090 MJ. I recomputed all of them.
  - The FAQ gives "12.8 kWh per kg".
  - "Why a cylinder is not filled completely… below about 85 percent".
- **Fails:**
  - Sources are unnamed: "Typical published figures". A competitor table (ppgl) already has more rows, including litres per tonne and gas volume per kg.
  - The lead image is a generic cylinder label "(illustrative)".
  - Table overlap with `propane-vs-butane` (D2).
- **Verdict: keep.** Name the data source (for example a standard fuel data sheet). Add Pakistan's usual mix once it is known.

### `/how-to-choose-a-licensed-lpg-supplier/` — BORDERLINE (14) 3/2/2/2/2/2/1
- **Intent vs delivery:** H1 and intro are kept (a ten-point checklist).
- **Works:**
  - A practical ten-point list.
  - A red-flag/green-flag table.
  - "Tare plus 11.8 kg".
  - The lead image is the owner-supplied licence graphic.
- **Fails:**
  - **It never says how to verify a licence.**
    - "You can confirm licensing with OGRA directly." There is no link, no list location and no phone.
    - Another place says "check it with OGRA".
    - That is the one actionable thing the page title promises.
  - It never uses the OGRA price it already holds. "Compare… the OGRA notified gas price" could show "11.8 kg ≈ Rs 3,296 gas-only this month".
  - Tare weights are never given.
  - "Depending on your area we supply as marketer, reseller or by referring your order" leaves the reader unsure who the company is (H2).
  - The gallery adds `ograLicence`, an AI **sample** licence (`hold-ai/40-ogra-licence-sample`) next to the real graphic. AI "delivery team" faces are also in there (M1).
- **Verdict: keep, rewrite.** Add a verification route, a worked price check, and remove the sample licence image.

### `/lpg-marketing-company-vs-distributor-vs-dealer/` — BORDERLINE (11) 3/2/1/2/2/1/0
- **Intent vs delivery:** The intro defines the three roles, so intent is met.
- **Works:** A clean four-column role table and a "cylinder journey" list.
- **Fails:**
  - **The role table hedges instead of stating rules.**
    - Distributor: "Appointed by a marketer; rules apply to the role".
    - Dealer: "Usually supplied by a licensed marketer".
    - Caption: "check with OGRA for specifics".
    - This is the reference page for the role question and it states no rule.
  - **The company's own role is incoherent with the definitions on this page.**
    - The page says a marketer "fills and brands cylinders".
    - Then: "We supply as marketer, reseller or by referring your order to a distributor… depending on your area."
    - A marketer that sometimes only refers orders is not a marketer by the page's own table.
  - The gallery shows `officeExt1`, an AI building captioned "Office exterior" with an alt reading "THE LPG CO. PAKISTAN office exterior… brand preview", plus an AI "retail shopfront" (M0).
  - It duplicates the role tables in `lpg-companies`, `lpg-shops-and-agencies` and `lpg-business`.
- **Verdict: keep as the single canonical roles page.** Replace hedges with the actual OGRA role definitions and cite them. Remove the AI building. Link the other three pages here instead of repeating the table.

### `/ogra-lpg-regulations-pakistan/` — **WEAK**, promise mismatch (11) 2/2/1/3/2/1/0
- **Intent vs delivery:** The URL, H1 and title promise "regulations… licences, prices and your rights". The page names **no regulation, rule, section, SRO or date**.
- **Works:**
  - Honest throughout: "This is a plain-language summary, not legal advice".
  - The seven-question supplier checklist is practical.
  - It links to the OGRA site.
- **Fails:**
  - "Who regulates what" is the whole substance:
    - "National standards bodies"
    - "Explosives and pressure-vessel inspection rules"
    - "Provincial and city authorities"
    - Not one of these is named. A reader looking for the rules cannot find them.
  - "Your rights" are never listed. The complaint route is "the complaints process on the official website" with a link only to the OGRA home page.
  - FAQ "Is gas poured from one cylinder into another allowed?" answers "It is dangerous and should never be done" and does not say whether it is legal.
  - **The lead image `ograLicence` is the AI sample** (`hold-ai/40-ogra-licence-sample`) captioned "OGRA licence display". The gallery adds the sample "inspection certificate" and a sample "OGRA price screen" (M0). On a regulation page this is the worst place for a fake document.
  - It overlaps `lpg-companies`, `lpg-supply`, `how-to-choose` and `lpg-shops` on "how to check a supplier" (D1).
- **Verdict: rewrite or hold-noindex.** Cite the actual instruments with year and link, with one sentence on what each means for a buyer. Add the complaint URL and steps. Replace the sample document.

### `/lpg-supply-in-pakistan/` — **WEAK**, structure without numbers (10) 2/1/1/2/2/1/1
- **Intent vs delivery:** "Sources, imports and who delivers". The core of a supply page is who imports, how much and from where. None of that is present.
- **Works:** A tidy six-stage table and a small seasonal table. The page is honest about the gap: "We do not quote exact tonnages here".
- **Fails:**
  - **There is no number, name or source about Pakistan.**
    - "Local gas fields and refineries supply a large part of the demand. Imports cover the rest."
    - "Households… are the largest group."
    - Both are flat claims with no figure.
    - The page admits the gap itself: "check OGRA or industry reports for the current split."
  - The seasonal table ("Winter: Rises… Delivery can take longer") has no data behind it.
  - It duplicates `how-lpg-is-produced` almost line for line (D1).
  - It plugs the company inside the answer: "{site.shortName} is an OGRA-licensed marketer and distributor".
- **Verdict: rewrite or merge** with `how-lpg-is-produced-and-supplied`. Source local-versus-import tonnage from OGRA or Ministry of Energy publications. Name import points only if sourced.

### `/lpg-shortage-pakistan/` — BORDERLINE (14) 2/2/2/2/2/3/1
- **Intent vs delivery:** Searchers want "is there a shortage now". The page honestly says it cannot say.
- **Works:**
  - The "Real shortage or rumour? A quick test" list.
  - A cause table.
  - Practical advice: "Reorder when the cylinder is about a quarter full."
  - Honest "no dated, sourced shortage report" status.
- **Fails:**
  - **The SERP description promises "a dated source log". The log is empty.** The body says: "This log is empty on purpose." That is workflow language shown to users, and the meta text advertises something absent. This is a partial promise mismatch.
  - The "How long it usually lasts" column ("Days to weeks", "Weeks to months", "Several weeks each winter") is unsourced.
  - No past shortage episode is named, even as history. (A competitor note, `noorlpg…gas-shortages-in-summer` from May 2023, discusses a summer gas shortage, in sales tone and about pipeline gas.)
  - "Our approach" repeats the stock-policy sentence also given in the FAQ.
- **Verdict: keep as evergreen.** Add at least three dated, linked past shortage episodes, or remove the empty section and the "source log" claim from the meta description.

### `/lpg-companies-in-pakistan/` — **WEAK**, URL promise mismatch (10) 2/2/1/3/1/1/0
- **Intent vs delivery:** The URL asks for a list of LPG companies. The page says outright: "We do not publish a ranked list… we do not comment on other suppliers."
- **Works:** Honest licensing explanation and a clear "how to check a supplier" list.
- **Fails:**
  - **It gives the visitor no company name at all, and its only company is itself.**
  - The H1 was reworded to "how OGRA licensing works", but the URL and the target keyword still promise a list.
  - The licence section hedges rather than informs: "Exact licence categories and conditions are defined in OGRA's LPG rules and notifications, which change from time to time". It does not say what the categories are.
  - FAQ "How many LPG companies are there?" declines to answer.
  - **The FAQ sends readers to "exchange and deposit terms on the cylinder refill page". That page contains the visible marker "[needs confirmation]" and no amounts.**
  - K1: 13 internal links, a six-item Related list, a local `Table` copy, and no JSON-LD.
  - The gallery shows the AI sample licence and `officeExt1` ("office exterior"). The page also repeats the role table from the marketer/distributor page (M0, D1).
- **Verdict: rewrite or hold-noindex.** Either publish a sourced list of OGRA-licensed LPG marketing companies (with date and link), or retarget the URL. Remove the AI imagery.

---

# SAFETY

### `/lpg-safety/` — BORDERLINE (12) 3/2/1/2/2/1/1
- **Intent vs delivery:** The H1 "LPG hazards and safety guide" and the opening hazards are right. The depth is thin for a pillar.
- **Works:**
  - Correct hazard list ("roughly 2% to 10%", "roughly 250 times its volume", cold burns, carbon monoxide).
  - A clear top Note linking to the smell-gas page.
  - A hand-placed regulator image with honest alt text.
- **Fails:**
  - **The SERP meta description reads "Published after our safety reviewer signs off."** That is draft language in a live snippet.
  - The entire page is bullet lists with no numbers beyond the two above: no storage distances, no cylinder life, no regulator or hose replacement interval ("Do not wait for a fixed date"), no incident data.
  - The FAQ repeats the blast page ("Can an LPG cylinder explode?").
  - The "Reviewed by" block asserts "UK-trained specialists with 12+ years in LPG operations" with no names and no evidence (H2).
  - It is a hub that competes with the smell-gas, blast, regulators and detector pages (D1).
- **Verdict: rewrite.** Make it the router and checklist. Remove the draft line from the meta. Add a short storage-distance and ventilation table with a named source.

### `/what-to-do-if-you-smell-gas/` — BORDERLINE, good-but-gated by G2 (18) 3/3/2/3/3/3/1
- **Intent vs delivery:** A direct emergency answer with six ordered steps.
- **Works:**
  - Action-first with a clear Note: "Do not use the order form in an emergency".
  - A "what not to do" list ("Do not rely on your nose alone").
  - Why LPG smells, whether it can kill, and an after-the-leak step.
  - The Pakistan emergency number **does appear** (1122 and the company line in the review block), though only at the very bottom of the page.
- **Fails:**
  - **The most useful local fact is buried.** Step 5 says "call your local emergency or fire service" with no number. The number sits after the FAQ.
  - No unique substance beyond standard guidance (G2).
  - No lead image.
  - The "Reviewed by… Last reviewed 27 October 2026" claim cannot be verified from the repo.
- **Verdict: keep.** Put "1122" (with the existing "if not active" caveat) into step 5 and the top Note. That is the single highest-value edit in this cluster.

### `/lpg-cylinder-blast-causes-and-prevention/` — BORDERLINE, good-but-gated: draft language + H2 (17) 3/3/3/2/3/2/1
- **Intent vs delivery:** Delivered.
- **Works:**
  - A nine-row cause/effect/prevention table.
  - A five-row myth/fact table ("Gas rises, so open the top of a window" / "LPG sinks").
  - A ten-point checklist.
  - Honest "Not a report on any one event".
- **Fails:**
  - **The page shows "This page is awaiting final team sign-off."** It is not in `safety-review.json`. That is draft language on a safety page, and sits beside a claim of review by "UK-trained specialists".
  - "How often should cylinders be tested?" gets "at set intervals under the safety rules" and no interval. The blast page is where the number belongs.
  - "If the fire is only at a small joint and you can safely close the valve, do so" is risky advice on a safety page. Most guidance simply says leave.
  - The gallery shows the AI "inspection certificate… passed inspection preview" (M1).
- **Verdict: keep.** Add the sign-off date once it is real, remove or soften the fire-fighting line, and state the test interval with a source. Then it is Good.

### `/lpg-regulators/` — BORDERLINE (16) 3/3/2/2/2/2/2
- **Intent vs delivery:** Delivered ("types, how to choose and how to fit one safely").
- **Works:**
  - A four-type table.
  - A five-point checklist.
  - A flow-by-appliance table.
  - Correct "Some fittings use a left-hand thread".
  - Honest "we do not publish a standing regulator price list".
- **Fails:**
  - **A regulator page that never gives a pressure or flow figure.**
    - "Fixed low pressure, rated on the label".
    - "Low flow", "Higher flow", "Moderate flow".
    - No mbar, no kg/h. That is G2, not G3.
  - "Many makers recommend replacing… every 5 to 10 years" has no source.
  - **Shows "This page is awaiting final team sign-off."** (H2, draft language).
  - The fitting steps duplicate `lpg-regulator-problems-and-repair` (D2).
- **Verdict: keep.** Add typical household and commercial pressure and flow ranges with a source, and clear the draft flag.

### `/lpg-regulator-problems-and-repair/` — BORDERLINE, good-but-gated: draft language + H2 (17) 3/3/3/2/2/2/2
- **Intent vs delivery:** The intent "repair" gets a clear answer: replace, do not repair.
- **Works:**
  - **A nine-row symptom → likely cause → action table** (the best asset on the page).
  - A leak-test procedure.
  - "Why a regulator is replaced, not repaired".
  - A "when to stop and call a professional" list.
- **Fails:**
  - **Shows "This page is awaiting final team sign-off."** (H2, draft language.)
  - "Step by step: replacing a regulator" repeats the fitting section of `lpg-regulators` almost step for step (D2).
  - No numbers, no cost: "A new regulator is a small cost" with no figure.
  - It says it is not repairable, then the FAQ adds "or follow the maker's steps if you are experienced".
- **Verdict: keep.** Clear the draft flag and remove the duplicate fitting steps in favour of a link.

### `/lpg-leak-detector/` — BORDERLINE (15) 3/2/2/2/2/3/1
- **Intent vs delivery:** The H1 "types, placement and how to choose one" is delivered, but a Pakistani buyer's next questions (price, where to buy) are not.
- **Works:**
  - A five-method table.
  - Correct "30 cm above the floor" placement.
  - "LPG is mounted low, natural gas high".
  - A "what a detector does not do" list.
- **Fails:**
  - **No price, no local availability and no named standard.**
    - "It has the markings and documents that show the standard it was made to."
    - The commercial answer: "We can advise on detector placement… we will confirm what we can supply."
  - **Shows "This page is awaiting final team sign-off."** (H2, draft language.)
  - There is no detector image anywhere. The lead is "LPG stove in use (illustrative)". The gallery is AI kitchen/chef scenes (M1).
- **Verdict: keep.** Add a PKR range or "not sold by us" statement, one named standard, and a real detector image.

---

# COMMERCIAL

### `/commercial-lpg-supply/` — BORDERLINE (11) 2/3/1/2/1/1/1
- **Intent vs delivery:** The intro describes what the company does and asks the visitor to send details. A buyer's first question is "how much".
- **Works:**
  - A five-row supply options table.
  - A four-step ordering process.
  - A list of what to tell us for a quote.
  - It links to the duration calculator.
- **Fails:**
  - **There is no number the page could have given.** The short answer says "We do not publish a fixed commercial price…". The page knows the OGRA rate (Rs 279.34/kg), so a full 45.4 kg cylinder is about **Rs 12,682 gas-only**. It does not say so, and the FAQ "What is the price for commercial LPG?" gives no figure either.
  - No consumption guidance (how many cylinders a restaurant of a given size uses).
  - **K1:** 16 internal links, a seven-item "Related pages" list, and a repeated "Talk to us now" Note.
  - "We work through 347 gas supply partners listed across 51 cities" (H2: counts-only owner list; see cross-cutting issue 3).
  - The role is vague: "We may supply directly, resell, or pass your order to a distributor in the network".
  - A gallery of AI chef/restaurant scenes. No lead image (M1).
  - Same frame as bulk, industrial and bowser: a "Short answer" that declines to answer, then "we confirm" (D1).
- **Verdict: rewrite.** Put the gas-only cost of 45.4 kg and 11.8 kg on the page (labelled as such), add a sizing table based on burner ratings, and cut the link list.

### `/bulk-lpg-supply/` — BORDERLINE (13) 3/2/1/2/2/2/1
- **Intent vs delivery:** The intro defines bulk supply well.
- **Works:**
  - A three-way table (cylinders / cylinder bank / bulk tank).
  - "Tanks are never filled completely".
  - Useful "What goes into a bulk quotation" list.
  - Pointers to the tank-size calculator and litre-to-kg converter.
- **Fails:**
  - **No tank size, no typical load, no cost basis.** FAQ: "We do not list a fixed catalogue size."
  - A "What we do not claim" Note reads like an internal disclaimer: "We do not list project case studies, tank prices or fixed delivery times on this page."
  - **The page says there are no project case studies, yet the gallery shows "projects" images** (`images/projects/64-bulk-tanks-yard`) with the alt "Bulk LPG supply Pakistan — LPG storage tanks…", which reads as ours (M1).
  - The FAQ cites "347 supply partners in 51 cities".
  - A related-links list of eight.
- **Verdict: rewrite.** Add a worked example from the tank calculator (a sample site, with numbers) and one range of typical tank sizes with a source. Absorb the bowser page.

### `/industrial-lpg-supply/` — BORDERLINE (12) 2/2/2/2/1/2/1
- **Intent vs delivery:** The intro says what the company takes ("boilers, furnaces, ovens"), and a Short answer follows.
- **Works:**
  - The best table in this group: **application → typical equipment → supply route** (boilers, ovens, stenters, kilns, brooders).
  - A "what we ask before quoting" list that includes kW, BTU/hr and kg/hr.
  - A link to the BTU converter and the diesel and Sui comparison calculators.
- **Fails:**
  - **A table titled "Capability and limits, stated plainly" lists "Past projects: No project case studies are published here".** That is an admission shown to users, and reads as internal process.
  - **K1: 19 internal links**, plus a six-item service list and a province list.
  - FAQ "Is LPG cheaper than other fuels?" says to use the calculators with your own figures. It gives no example.
  - FAQ "Is there a minimum quantity?" gives no answer.
  - "A network of 347 partners in 51 cities" in the table.
  - AI "manifold" and "bulk tank" images present as our work (M1).
- **Verdict: rewrite.** Add one worked industrial example (for instance a boiler's kg/h to monthly tonnes), cut the link blocks, and remove the "past projects" row.

### `/lpg-bowser/` — **WEAK** (10) 2/1/1/2/2/1/1
- **Intent vs delivery:** The intro defines a bowser, but the follow-up intents (capacity, buying, price) are declined.
- **Works:** A clear definition and a four-step delivery description.
- **Fails:**
  - **The page declines to answer every sub-intent.**
    - Capacity: "We do not publish a standard size."
    - Buying: "We do not list bowsers for sale on this page."
    - Price: "We do not publish bowser prices."
    - Delivery time: not published.
    - Short answer: "we do not publish bowser prices, capacities or delivery times here."
  - A competitor already publishes a fleet table with capacities from 10 to 30 MT and one 85 MT, with licence numbers (`ppgl.com.pk/bowsers-detail`). A generic "typical road-tanker capacity" with a source would give G.
  - **The delivery steps read as our own procedure** ("Gas is transferred… by trained staff… A delivery record is signed… Your staff know the emergency shut-off"), while the page also says tanker availability is "case by case". The reader cannot tell whether the company runs bowsers (H2).
  - "Regulation and approvals" says only "confirm with OGRA".
  - The gallery shows the generic `bulkTanks` and a cylinder delivery truck. There is no tanker image (M1).
  - The "who uses what" table is the same one as on the bulk page (D1).
- **Verdict: merge** into `/bulk-lpg-supply/` as a section, with a 301. Hold-noindex until then.

### `/lpg-plant-in-pakistan/` — BORDERLINE, capped by partial promise mismatch (13) 3/2/1/2/2/2/1
- **Intent vs delivery:** The H1 says "Types, equipment and licensing". Types and equipment are delivered.
- **Works:**
  - A four-type table (bottling, terminal, on-site, air-LPG/SNG).
  - A seven-item equipment list.
  - A "where we can help" table that is honest about "Turnkey bottling plant: Not offered".
- **Fails:**
  - **Licensing, one of the three promised topics, is one paragraph of deferral.** "Because the rules depend on activity, size and province, check the current position with OGRA". No licence category and no steps.
  - Cost: "There is no single cost… We do not publish figures."
  - The equipment list is generic (G1).
  - "Past plant projects" and "plant prices" are both declined in the short answer.
  - Twelve internal links.
- **Verdict: rewrite.** Add the licence path (named categories and the steps), or retitle to "types and equipment".

### `/lpg-business-in-pakistan/` — BORDERLINE, capped by partial promise mismatch (11) 2/2/1/2/2/1/1
- **Intent vs delivery:** The title says "Roles, Licences and How to Start". Roles are delivered. Licences and "how to start" are deferred.
- **Works:** A six-role table and a five-step "before you invest" list. The advice that "The lowest-barrier route is usually a shop or distributor appointed by a licensed marketer" is useful.
- **Fails:**
  - **Every number a business-starter wants is declined.**
    - Capital: "There is no single figure… we do not publish a number."
    - Profit: "We do not publish profit figures."
    - Licence: "Confirm your exact role and requirements with OGRA".
  - **K1:** 15 internal links, a link list repeated in "Customers who buy in volume", and a recruiting pitch.
  - Fourth copy of the roles table (D1).
  - "Works with 347 supply partners in 51 cities" in the intro (H2).
  - A gallery of AI warehouse staff and a shopfront, on a page about starting an LPG business (M1).
- **Verdict: merge** into the canonical roles page, or rewrite with a licensing path and rough start-up cost ranges (with sources).

### `/auto-lpg-in-pakistan/` — BORDERLINE (15) 3/2/2/3/2/2/1
- **Intent vs delivery:** The intro answers the safety-critical point first ("home or commercial cylinders… must never go in a vehicle").
- **Works:**
  - A six-part system table (tank, multivalve, vaporiser, injectors, hoses, switch).
  - A "checks before you convert" list.
  - A "what auto LPG is not" list.
  - **A unique data block:** 104 listed partners flagged for auto LPG, with the split by province (Sindh 47, KP 21, Punjab 14, Islamabad 14, Balochistan 4, AJK 2, GB 2). The page is careful to say it is "not an endorsement".
  - Honest "we do not give legal clearance".
- **Fails:**
  - **It never says whether auto LPG conversion is allowed in Pakistan today.** FAQ: "Rules… have changed over time. We do not give legal clearance on this page." For the most important question, the answer is "ask OGRA".
  - The images are a domestic regulator close-up and a hose/regulator kit, neither of which shows a vehicle system (M1).
  - It overlaps `lpg-vs-cng`'s car section and `lpg-kit-price` (D2).
- **Verdict: keep.** Add the sourced current legal position, and absorb the kit-price page.

### `/lpg-kit-price-in-pakistan/` — **WEAK**, promise mismatch (11) 1/1/2/3/2/2/0
- **Intent vs delivery:** **The URL and title say "price". The page contains no price and says so.** The intro opens: "we do not publish prices we have not verified."
- **Works:**
  - Honest throughout.
  - A "what changes the price" factor table.
  - A "what a quote should show" list.
  - A red-flag list ("A price given without asking about your vehicle").
- **Fails:**
  - No range, no example and no sourced figure.
  - **The term is ambiguous in Pakistan.** "LPG kit" can also mean the household regulator-and-pipe set. The page chooses the vehicle kit only, **and then shows a home hose-and-regulator image** (`hoseKit`, alt "LPG hose pipe and regulator kit with clamps for LPG cylinder installation"). The image contradicts the page (M0).
  - FAQ "Do you sell LPG kits?" says no.
  - It repeats `auto-lpg` ("What does a conversion cost?").
- **Verdict: merge into `/auto-lpg-in-pakistan/`.** Keep this URL only if you can publish at least a sourced range from three workshops, with date.

### `/lpg-filling-stations/` — BORDERLINE (14) 3/2/2/2/2/2/1
- **Intent vs delivery:** The page tells the visitor up front that it will not list stations.
- **Works:**
  - A useful two-meaning table (cylinder plant versus vehicle station).
  - A "how to check any LPG facility" list.
  - FAQ "Where can I fill my home LPG cylinder? Do not look for a roadside pump…" is a genuinely helpful correction.
- **Fails:**
  - **"How listings will work" is a roadmap.** "We will add a station or plant to a city page only when the owner agrees… Until then…". Planned-future language is draft language.
  - Searchers want addresses. The page lists none (honestly).
  - "Some listed suppliers in published network data are marked as open around the clock" has no source and no number.
  - The gallery shows warehouse and delivery AI scenes unrelated to stations (M1).
- **Verdict: rewrite.** Delete the roadmap section. Either publish a verified small list or reposition the page as "where to refill".

### `/lpg-shops-and-agencies/` — BORDERLINE (11) 2/2/1/2/2/1/1
- **Intent vs delivery:** Mixed intent: choose a shop, or become one. Neither is fully served.
- **Works:** A short "shop, agency, dealer, distributor" naming table and a "what a good shop shows you" list.
- **Fails:**
  - **Third copy of the roles table and a recruiting pitch repeated from `become-an-lpg-distributor`.**
  - "Find a shop near me" intent is declined: "We do not publish shop addresses…".
  - 13 internal links.
  - "We supply a network of 347 partners" (H2).
  - An AI "retail shopfront" and AI warehouse staff (M1).
- **Verdict: merge** into the roles page. Redirect.

### `/lpg-near-me/` — **WEAK** (10) 2/1/1/2/2/1/1
- **Intent vs delivery:** "Near me" wants nearby places. The page gives a form and a process.
- **Works:** Honest about not having a branch everywhere ("do not claim a branch in every city"). It shows partner counts per hub city (for example Karachi 121).
- **Fails:**
  - **There is nothing near anyone on this page.** It is a four-step "how it works" plus city chips duplicating `delivery-areas`, `home-delivery` and `commercial`.
  - FAQ "Why not just show a map of shops?" argues for not showing one.
  - 15 internal links.
  - "We work with 347 supply partners in 51 cities", while the hub counts add up to a different figure (see issue 3).
  - Same frame as five other pages (D1).
  - AI doorstep scenes (M1).
- **Verdict: merge** into `delivery-areas` or `lpg-home-delivery` and redirect. Hold-noindex now.

### `/become-an-lpg-distributor/` — **WEAK** (10) 2/1/1/2/2/2/0
- **Intent vs delivery:** The page is a short recruitment page (about 200 words).
- **Works:** A four-point "what we look for" list. It names where partners are needed: "Azad Kashmir, Gilgit-Baltistan, Balochistan".
- **Fails:**
  - **It has no terms.** FAQ "What does it cost to join?" answers "Tell us about your business in the form and we explain the terms when we call you." FAQ "Do I need an OGRA licence?" answers "Tell us… we explain what applies".
  - No process steps, no timeline, no margin model, no investment, no requirements beyond four generic bullets.
  - **The role statement is contradictory.** "We supply our partners, and they supply customers" sits next to the other pages' "we may… pass your order".
  - **The gallery presents AI imagery as our network** (M0): `officeExt3` ("OGRA-licensed LPG marketer office — building front view"), `shopfront` ("LPG shop and agency… storefront for dealers") and `warehouseStaff` ("LPG distributor network Pakistan — warehouse staff"). On a page asking real distributors to join, this implies real sites and real staff.
  - It repeats the recruiting block on `lpg-business` and `lpg-shops` (D2).
- **Verdict: rewrite.** State the actual application steps and what the company provides. Remove the AI imagery.

---

# Cross-cutting issues (they cap many grades)

1. **Draft language and unverifiable credentials in the safety block.**
   - `SafetyReview` prints "This page is awaiting final team sign-off" on `blast`, `regulators`, `regulator-problems` and `leak-detector`. Only `/lpg-safety/` and `/what-to-do-if-you-smell-gas/` have dates in `safety-review.json`.
   - The `/lpg-safety/` SERP description says "Published after our safety reviewer signs off."
   - All six safety pages carry "UK-trained specialists with 12+ years in LPG operations; the team reviews safety pages before they go live" with no name or evidence.
   - It also contradicts the "awaiting sign-off" line on the same page.
   - Fix: add real dates to the data file after sign-off, or hide the component's "awaiting" branch. Rewrite the credential line to something checkable.
2. **AI imagery presented as real, at scale.**
   - All 31 pages render an `ImageGallery` of AI/temporary creatives under the bare heading **"Photos"**.
   - **Sample documents:**
     - `ograLicence`: the lead image on `ogra-lpg-regulations-pakistan`, and in the gallery on `how-to-choose`, `companies`.
     - `inspectionCert`: on `blast` and `ogra-regs`.
     - `ograPriceScreen`: on `vs-sui-gas` and `ogra-regs`.
   - **AI buildings and people:**
     - `officeExt1` (HQ) on `marketing-vs` and `companies`.
     - `officeExt3`, `shopfront` and `warehouseStaff` on `become`, `business` and `shops`.
   - **Contradictions:**
     - `kitchen45` (file name says "unrealistic"): a 45 kg cylinder in a kitchen on `vs-sui-gas`, against its own advice.
     - Project-style images (`images/projects/…`) on `bulk` and `industrial`, which say no case studies exist.
   - **Irrelevant or wrong-subject images:** `hoseKit` on a vehicle kit-price page, domestic hose images on `auto-lpg`, a cylinder truck on a tanker page.
   - Lead images are labelled "(illustrative)"; the galleries are not.
3. **Partner counts: "we work with 347 partners in 51 cities" on nine pages**
   (`commercial`, `bulk`, `industrial`, `business`, `filling`, `shops`, `near-me`, `become`, `companies`).
   - The source is "Owner-supplied distributor list… Counts only".
   - **Totals disagree inside `network.json`:** 347 suppliers in `totals`, 329 when the province entries are summed, 297 when the 51 city entries are summed. There may be a benign reason (suppliers with no city), but nothing explains it.
   - The wording "we work with" claims a relationship with each listed supplier, not that they are listed.
   - Fix: reconcile the counts, and say "N suppliers listed in our network data".
4. **Role identity is inconsistent.**
   - `marketing-vs` defines a marketer as the one who fills and brands cylinders.
   - The company then describes itself as "marketer, reseller or by referring your order" (also on `companies`, `commercial`, `how-to-choose`, `business`).
   - `become` says "We supply our partners, and they supply customers".
   - The tagline elsewhere says "manufacturer".
   - A reader cannot tell what THE LPG CO. actually is, and the page definitions make the hedge look evasive.
5. **The "we don't publish / we confirm" pattern replaces content.** I counted 38 "do not publish/list/quote/give" statements, 17 "honestly/plainly" and 29 "we confirm…" across these 31 pages. At least eleven pages (`companies`, `commercial`, `bulk`, `industrial`, `bowser`, `plant`, `business`, `auto-lpg`, `kit-price`, `filling`, `shops`, `near-me`) open with a "Short answer" Note that declines to give the answer or says what it will not publish.
   - The honesty is good.
   - But where the page already holds a number it still does not use it:
     - the OGRA rate, which makes 45.4 kg ≈ Rs 12,682 and 11.8 kg ≈ Rs 3,296 gas-only,
     - the Rs 6,407/MMBTU LPG heat cost,
     - the network counts by province.
6. **Cannibalisation clusters** (same intent, same table):
   - Roles table ×4: `marketing-vs`, `companies`, `shops`, `business`.
   - "Check your supplier" lists ×5: `how-to-choose`, `ogra-regs`, `companies`, `marketing-vs`, `lpg-safety` delivery section.
   - Bulk/bowser/plant/industrial/commercial: the same "who uses what" table and the same Notes.
   - Near-me/shops/filling/delivery-areas: no addresses, same chips.
   - Source/supply/what-is: `produced`, `supply`, `what-is-lpg`, `lpg-vs-lng`.
   - Car conversion: `vs-cng`, `auto-lpg`, `kit-price`.
7. **K: link dumps.** Counts of internal links: industrial 19, commercial 16, business 15, near-me 15, bulk 13, shops 13, companies 13, plant 12. Every commercial page repeats "Talk to us now", and every page has a bare "Photos" H2.
8. **A broken cross-reference.** `lpg-companies` FAQ sends readers to "exchange and deposit terms on the cylinder refill page". That page carries the visible text "[needs confirmation]" and no amounts.

---

# Cluster summaries

## Comparisons / guides (13 pages): 0 Good, 10 Borderline, 3 Weak

- **What is solid:**
  - The pure fuel-science pages (`lpg-vs-lng`, `propane-vs-butane`, `composition`) have correct numbers and one useful derived table. Three are good-but-gated at 17 (G2 on `lpg-vs-lng`, H2 on `propane`, G2 on `composition`).
  - `lpg-vs-sui-gas` (16) is the best single page and is one slab table away from Good.
- **What is weak:**
  - The Pakistan-specific pages (`supply`, `produced`, `companies`, `ogra-regs`, `marketing-vs`) read as structure without substance. They contain no figure, name, rule or source about Pakistan, and several of them end by pointing the reader to OGRA instead.
  - Three are Weak on the rubric: `ogra-regs` (names no regulation), `companies` (lists no company), `supply` (no numbers).
- **Fix order:**
  1. `lpg-vs-sui-gas`: slab table and verified price.
  2. `propane-vs-butane`: fix the contradiction.
  3. `ogra-regs`: cite the actual instruments.
  4. Merge `produced` into `supply` and source it.
  5. Make `marketing-vs` the single roles page.
  6. `lpg-vs-cng`: retitle or add cost.
  7. `companies`: list or retarget.

## Safety (6 pages): 0 Good, 6 Borderline (4 good-but-gated)

- **What is solid:**
  - These are the strongest pages on the site for substance: tables of causes, symptoms, myths and types. None contains an invented fact.
  - Three score 17–18 on points alone (smell-gas, blast, regulator-problems).
- **What blocks them:**
  - One data-file fix. Four pages display "awaiting final team sign-off", and `/lpg-safety/` carries "Published after our safety reviewer signs off" in its SERP snippet.
  - With sign-off dates added, blast, regulator-problems and smell-gas become Good-candidates. Smell-gas needs only G3 (put 1122 in step 5), and blast needs only a sourced test interval.
- **Weakest:** `lpg-safety` (12). The pillar is a bullet list that repeats its children.
- **Fix order:**
  1. Clear the draft flags and the credential line.
  2. Put 1122 in smell-gas step 5.
  3. Rewrite `lpg-safety` as the router.
  4. Add pressure and flow ranges to `lpg-regulators`.
  5. Add a price range or "not sold" statement to `leak-detector`.

## Commercial (12 pages): 0 Good, 8 Borderline, 4 Weak

- **The pattern:**
  - Honest and well organised, but built around what the company declines to say. The best-scoring page here, `auto-lpg` (15), is the one with a unique data block.
  - The lowest are pages whose intent the page cannot satisfy by design: `near-me`, `bowser`, `kit-price`, `become`.
  - `commercial-lpg-supply` is the money page and sits at 11. It holds the price data and does not use it.
- **Fix order:**
  1. Merge `bowser` into `bulk`, `kit-price` into `auto-lpg`, and `shops`, `business` and `near-me` into the roles page or `delivery-areas`. That removes 5 of 12 URLs.
  2. On `commercial`, `bulk` and `industrial`, replace the "Short answer: we do not publish" Note with gas-only costs and one worked sizing example, and cut the link lists to five.
  3. Remove every AI building, shopfront and "projects" image from recruiting and commercial pages.
  4. Rewrite `become-an-lpg-distributor` with real steps and terms.

## Overall

- **Zero of 31 pages meet the Good bar.** Six reach 17 or more on points but fail a gate: the draft sign-off flag, an unsourced claim, or a single G2.
- **Seven are Weak:** `ogra-regs`, `kit-price`, `supply`, `companies`, `bowser`, `near-me`, `become`.
- **The cheapest gains, in order of effort:**
  1. One data fix (safety sign-offs) unlocks up to four pages.
  2. Three small content edits (propane contradiction, 1122 in smell-gas, a Sui slab table) move three more pages to Good.
  3. Merging or redirecting five commercial URLs removes duplicates that currently drag the others down.
