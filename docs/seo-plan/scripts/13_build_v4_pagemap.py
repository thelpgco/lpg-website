"""Builds page-map.csv (v4) from the archived v3.5 map + v4 decisions, and
data/serper_queries_national.csv + data/serper_autocomplete_seeds.csv.
Run:  python docs/seo-plan/scripts/13_build_v4_pagemap.py
"""
import os
import re

import pandas as pd

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
P = lambda *p: os.path.join(BASE, *p)

pm = pd.read_csv(P("archive", "page-map_v3.5.csv"))
cr = pd.read_csv(P("data", "city_readiness.csv"))
partners = dict(zip(cr.city.str.lower(), cr.partners_phone_listed))
pm["v4_change"] = ""


def note(pid, text, change="GATE", phase=None):
    i = pm.index[pm.page_id == pid]
    assert len(i) == 1, pid
    i = i[0]
    pm.at[i, "gate_notes"] = (str(pm.at[i, "gate_notes"]) if pd.notna(pm.at[i, "gate_notes"]) else "") + " | v4: " + text
    pm.at[i, "v4_change"] = change
    if phase:
        pm.at[i, "phase"] = phase


# ---- 1. price pages for small cities fold into the city hub (demand too small, one cluster = one URL)
for pid, city in [("PR-006", "Islamabad"), ("PR-007", "Rawalpindi"), ("PR-008", "Faisalabad")]:
    note(pid, f"city price searches are {int(pm.loc[pm.page_id == pid, 'volume_floor'].iloc[0])}/mo. Folded into /lpg-in-{city.lower()}/ as the price section. "
              "Re-open only if the Serper overlap test shows under 40% shared URLs with the hub query.", "MERGED", phase="MERGED")
note("PR-004", "keep as a separate page only if the Serper overlap test vs /lpg-in-karachi/ is under 70% (price intent 2,340/mo).", "GATE")
note("PR-005", "keep as a separate page only if the Serper overlap test vs /lpg-in-lahore/ is under 70% (price intent 2,700/mo).", "GATE")

# ---- 2. location hubs: add today's measured supply to the gate note
for pid in pm.index[pm.page_id.str.match(r"^(DL-00[2-5]|LC-\d+)$")]:
    row = pm.loc[pid]
    m = re.search(r"/lpg-in-([a-z\-]+)/", row.url)
    if not m:
        continue
    city = m.group(1).replace("-", " ")
    n = partners.get(city)
    if n is None:
        continue
    if n >= 5:
        msg = f"supply today: {n} phone-listed partners (Maps data, unverified). Verify >=3 by call and run one real test order before launch."
    elif n >= 3:
        msg = f"supply today: {n} phone-listed partners. Needs verification of 3+ before it can launch."
    else:
        msg = f"BLOCKED: only {n} phone-listed partner(s) in the data. Recruit and verify 3+ partners first (Gate L1)."
    note(row.page_id, msg, "GATE")

# ---- 3. owner answers: appliances sold, composite cylinders supplied with gas
for pid in ["AP-001", "AP-002", "AP-003", "AP-004"]:
    note(pid, "owner confirmed (26 Oct 2026) that appliances are sold. Still needs real stock, prices and a named supplier in the facts table.", "GATE")
note("CY-006", "owner confirmed composite/fibre cylinders are supplied with gas. Needs supplier name, specs and weights. Competitor burhangas.com ranks for this.", "GATE")
note("BZ-004", "owner confirmed a distributor/supplier network. Also carries wholesale supply to dealers (no separate wholesale page).", "GATE")

# ---- 4. new rows
new = []


def add(pid, url, typ, phase, pillar, kw, notes):
    new.append(dict(page_id=pid, url=url, type=typ, phase=phase, pillar=pillar, primary_keyword=kw,
                    gate_notes=notes, v4_change="NEW"))


SV = "Owner must confirm who carries out the work (own team or a named partner) and supply at least one real project or reference. No stock photos, no invented project counts. Volume not in the Ubersuggest exports: seed in Keyword Planner first."
add("SV-001", "/services/", "SH", "P3", "Services", "", "Hub for the engineering services below. " + SV)
add("SV-002", "/services/lpg-pipeline-installation/", "CO", "P3", "Services", "lpg pipeline installation", SV)
add("SV-003", "/services/lpg-storage-tank-installation/", "CO", "P3", "Services", "lpg storage tank installation", SV)
add("SV-004", "/services/lpg-manifold-and-cylinder-bank-installation/", "CO", "P3", "Services", "lpg manifold installation", SV)
add("SV-005", "/services/lpg-air-sng-systems/", "CO", "P4", "Services", "lpg air mixing system", SV)
add("SV-006", "/services/boiler-and-furnace-conversion-to-lpg/", "CO", "P4", "Services", "boiler conversion to lpg", SV)
add("SV-007", "/services/lpg-safety-audit-and-inspection/", "CO", "P3", "Services", "lpg safety inspection", SV + " Needs a named qualified inspector.")
add("SV-008", "/services/lpg-maintenance-and-amc/", "CO", "P3", "Services", "lpg maintenance services", SV)
add("SV-009", "/services/lpg-cylinder-testing-and-inspection/", "CO", "P3", "Services", "lpg cylinder testing", SV + " Competitor friends-gas.pk offers cylinder testing.")
add("DL-009", "/industrial-lpg-supply/", "CO", "P2", "Delivery", "industrial lpg supplier", "Supply to factories. Gate: written supply capacity and at least one named supply route. Pairs with DL-006 and DL-007.")
IN = "Gate: a named customer or partner-delivered job in this sector, and consumption figures from real accounts. No generic sector copy."
add("IN-001", "/industries/", "SH", "P3", "Industries", "", "Hub for industry pages. " + IN)
for i, (slug, kw, ph) in enumerate([
    ("restaurants", "restaurant lpg supply", "P3"), ("hotels", "hotel lpg supply", "P3"),
    ("textile", "lpg for textile industry", "P4"), ("food-processing", "lpg for food processing", "P4"),
    ("poultry-farms", "lpg poultry farm heating", "P3"), ("hospitals", "hospital lpg supply", "P4"),
    ("housing-societies", "lpg supply for housing society", "P3"), ("manufacturing", "industrial lpg supply factory", "P4"),
    ("weddings-and-events", "lpg for wedding catering", "P3")], start=2):
    add(f"IN-{i:03d}", f"/industries/{slug}/", "CO", ph, "Industries", kw, IN)
add("SP-002", "/shop/lpg-hoses-and-accessories/", "CO", "P3", "Shop", "lpg hose pipe price", "Gate: real stock and prices. Regulator and stove pages already exist under SF-004 and AP-001.")
add("SP-003", "/shop/commercial-lpg-burners/", "CO", "P4", "Shop", "commercial lpg burner", "Gate: real stock or a named supplier.")
add("TL-002", "/tools/lpg-vs-sui-gas-cost-calculator/", "TL", "P3", "Learn", "lpg vs sui gas cost", "Tool. Uses OGRA price row plus user-entered Sui tariff. Links to ED-005.")
add("TL-003", "/tools/lpg-vs-diesel-cost-calculator/", "TL", "P4", "Learn", "lpg vs diesel cost", "Tool for industrial buyers. Discloses assumptions. Estimate only, not an engineering design.")
add("TL-004", "/tools/lpg-tank-size-calculator/", "TL", "P4", "Learn", "lpg tank size calculator", "Tool. Estimate only. Final sizing by a qualified engineer.")
add("TL-005", "/tools/lpg-btu-kwh-converter/", "TL", "P4", "Learn", "lpg btu to kwh", "Tool. States the calorific value assumption and its source.")
KNOW = "Include only if Keyword Planner or the Serper People-Also-Ask capture shows real demand; otherwise fold into the page named in the note."
add("ED-007", "/propane-vs-butane/", "GD", "P3", "Learn", "propane vs butane", KNOW + " Fallback: section in ED-002.")
add("ED-008", "/how-lpg-is-produced-and-supplied/", "GD", "P3", "Learn", "how is lpg produced", KNOW + " Fallback: section in NW-002.")
add("ED-009", "/ogra-lpg-regulations-pakistan/", "GD", "P2", "Learn", "ogra lpg rules", "Regulatory explainer. Primary sources only. Subject reviewer signs it. Supports trust for the whole site.")
add("ED-010", "/how-to-choose-a-licensed-lpg-supplier/", "GD", "P2", "Learn", "licensed lpg supplier pakistan", "Trust plus conversion page. Links to /licences-and-compliance/.")
add("ED-011", "/lpg-marketing-company-vs-distributor-vs-dealer/", "GD", "P3", "Learn", "lpg marketing company vs distributor", KNOW + " Fallback: section in BZ-004.")

TR = [("TR-001", "/about/", "P1"), ("TR-002", "/contact/", "P1"), ("TR-003", "/how-it-works/", "P1"),
      ("TR-004", "/licences-and-compliance/", "P1"), ("TR-005", "/editorial-policy/", "P1"),
      ("TR-006", "/pricing-policy/", "P1"), ("TR-007", "/delivery-areas/", "P1"), ("TR-008", "/our-network/", "P2"),
      ("TR-009", "/projects/", "P3"), ("TR-010", "/privacy/", "P1"), ("TR-011", "/terms/", "P1"), ("TR-012", "/complaints/", "P1")]
TRN = {
    "TR-001": "Real company story. The '21 years' claim needs the registration year and a document (claims register, plan section 2.3).",
    "TR-004": "OGRA licence numbers (owner to supply). Display only verified numbers.",
    "TR-007": "Coverage index: every city with status Live / On request. 'Live' only after Gate L passes.",
    "TR-008": "How the partner network works, how partners are verified, how to join. Never show a partner count that is not in the CRM.",
    "TR-009": "Real case studies only. Empty until real projects are documented.",
}
for pid, url, ph in TR:
    add(pid, url, "TR", ph, "Trust", "", TRN.get(pid, "Trust page."))

UR = [("UR-001", "/ur/", "HP-001", "P2"), ("UR-002", "/ur/lpg-price-in-pakistan/", "PR-001", "P2"),
      ("UR-003", "/ur/lpg-cylinder-price-in-pakistan/", "CY-002", "P2"), ("UR-004", "/ur/lpg-home-delivery/", "DL-001", "P2"),
      ("UR-005", "/ur/what-to-do-if-you-smell-gas/", "SF-002", "P2"), ("UR-006", "/ur/lpg-near-me/", "NM-001", "P3"),
      ("UR-007", "/ur/what-is-lpg/", "ED-001", "P3"), ("UR-008", "/ur/lpg-price-per-kg-in-pakistan/", "PR-002", "P3"),
      ("UR-009", "/ur/lpg-in-karachi/", "DL-005", "P3"), ("UR-010", "/ur/lpg-in-lahore/", "DL-004", "P3"),
      ("UR-011", "/ur/lpg-in-islamabad/", "DL-002", "P3"), ("UR-012", "/ur/lpg-safety/", "SF-001", "P3"),
      ("UR-013", "/ur/lpg-cylinders/composite-fiber-cylinder/", "CY-006", "P3"), ("UR-014", "/ur/lpg-shortage-pakistan/", "NW-001", "P3"),
      ("UR-015", "/ur/become-an-lpg-distributor/", "BZ-004", "P3")]
for pid, url, src, ph in UR:
    add(pid, url, "UR", ph, "Urdu", "", f"Urdu page for {src}. Written by the Urdu writer, not machine-translated. hreflang en-PK and ur-PK. Urdu-script and Roman Urdu keywords come from Keyword Planner and the Serper Urdu queries.")

out = pd.concat([pm, pd.DataFrame(new)], ignore_index=True)
for c in ["primary_volume", "keywords_mapped", "keywords_with_volume", "volume_floor", "volume_ceiling"]:
    out[c] = out[c].fillna(0).astype(int)

# ---- keyword-master: re-point keywords of merged pages, then recompute demand per page
REMAP = {"PR-006": "DL-002", "PR-007": "DL-003", "PR-008": "LC-003"}
K = pd.read_csv(P("archive", "keyword-master_v3.5.csv"))
K["target_page"] = K.target_page.replace(REMAP)
# a hub that received keywords from a merged page must still have exactly one primary: keep the highest volume
for hub in set(REMAP.values()):
    m = K.target_page == hub
    prim = K[m & (K.role == "primary")]
    if len(prim) > 1:
        keep = prim.sort_values("volume", ascending=False).index[0]
        K.loc[prim.index.difference([keep]), "role"] = "secondary"
K.to_csv(P("keyword-master.csv"), index=False)
T = K[K.disposition == "TARGET"].copy()
T["volume"] = T.volume.fillna(0)
for pid, g in T.groupby("target_page"):
    v = g[g.volume > 0]
    i = out.index[out.page_id == pid]
    if len(i):
        out.loc[i[0], ["keywords_mapped", "keywords_with_volume", "volume_floor", "volume_ceiling"]] = [
            len(g), len(v), int(v.drop_duplicates("volume").volume.sum()), int(v.volume.sum())]
out.loc[out.phase == "MERGED", ["keywords_mapped", "keywords_with_volume", "volume_floor", "volume_ceiling"]] = 0
# keep primary keyword columns in step with keyword-master (hubs may have a new primary after a merge)
prim = K[K.role == "primary"].drop_duplicates("target_page").set_index("target_page")
changed_primary = []
for i, r in out.iterrows():
    if r.page_id in prim.index and r.phase != "MERGED":
        kw, vol = prim.loc[r.page_id, "keyword"], int(prim.loc[r.page_id, "volume"] or 0)
        if r.primary_keyword != kw:
            changed_primary.append((r.page_id, r.primary_keyword, kw))
            out.loc[i, ["primary_keyword", "primary_volume"]] = [kw, vol]
print("primary keyword changed on:", changed_primary)
out.to_csv(P("page-map.csv"), index=False)
print(f"page-map v4: {len(out)} rows (was {len(pm)}); NEW {len(new)}; MERGED {(out.v4_change == 'MERGED').sum()}; GATE {(out.v4_change == 'GATE').sum()}")

# ---- integrity checks
assert out.page_id.is_unique, "duplicate page_id"
assert out.url.is_unique, "duplicate url"
assert out.url.str.startswith("/").all() and out.url.str.endswith("/").sum() >= len(out) - 1
depth = out.url.str.strip("/").str.count("/") + 1
print("max URL depth:", depth.max(), "| over 3:", out.loc[(depth > 3) & (out.url != "/"), "url"].tolist())
live = out[out.phase != "MERGED"]
print("by phase:", live.phase.value_counts().sort_index().to_dict())
print("by pillar:", live.pillar.value_counts().to_dict())

# ---- Serper national queries ----------------------------------------------------------
rows = []


def q(intent, query, hl="en", page_id="", note_=""):
    rows.append(dict(wave=0, scope="national", intent=intent, query=query, gl="pk", hl=hl, location="Pakistan", num=10,
                     endpoint="search", page_id=page_id, note=note_))


for r in live.itertuples():
    if isinstance(r.primary_keyword, str) and r.primary_keyword.strip():
        q(r.pillar.lower(), r.primary_keyword.strip(), page_id=r.page_id, note_="page primary keyword")
    if isinstance(r.top_secondary, str):
        for s in r.top_secondary.split(";")[:2]:
            kw = re.sub(r"\s*\(\d+\)\s*$", "", s).strip()
            if kw:
                q(r.pillar.lower(), kw, page_id=r.page_id, note_="top secondary keyword")

EXTRA = {
    "supply": ["lpg supplier in pakistan", "lpg gas supplier", "bulk lpg supplier pakistan", "industrial lpg supplier pakistan",
               "commercial lpg supply pakistan", "wholesale lpg price pakistan", "lpg gas company in pakistan", "licensed lpg marketer pakistan"],
    "network": ["how to become lpg distributor in pakistan", "lpg distributorship pakistan", "ogra lpg marketing licence", "lpg dealer licence pakistan",
                "lpg agency kaise len", "lpg gas agency business pakistan", "lpg dealer near me"],
    "cylinders": ["fiber lpg cylinder price pakistan", "composite gas cylinder pakistan", "gas cylinder 11.8 kg price", "gas cylinder 45 kg price",
                  "lpg cylinder exchange pakistan", "lpg cylinder expiry date", "lpg cylinder hydro test pakistan", "new gas cylinder connection price"],
    "appliances": ["lpg regulator price in pakistan", "lpg hose pipe price", "lpg stove price in pakistan", "lpg geyser price in pakistan",
                   "lpg gas heater price", "commercial lpg burner price", "lpg gas leak detector price"],
    "services": ["lpg pipeline installation pakistan", "gas pipeline installation cost pakistan", "lpg storage tank installation pakistan",
                 "lpg manifold system for restaurant", "lpg vaporizer price pakistan", "lpg air mixing plant pakistan",
                 "boiler conversion to lpg pakistan", "lpg filling plant setup pakistan", "lpg safety audit pakistan", "gas system maintenance contract"],
    "industries": ["lpg for restaurant kitchen", "hotel lpg gas supply", "lpg for textile mill", "lpg for poultry farm", "lpg for wedding hall",
                   "lpg supply housing society", "hospital lpg supply", "lpg supply for marquee"],
    "learn": ["propane vs butane", "lpg vs sui gas cost", "how long does a 12 kg cylinder last", "how is lpg produced", "ogra lpg regulations",
              "difference between lpg marketing company and distributor", "lpg cylinder safety tips"],
    "price_ru": ["lpg gas ka rate aaj ka", "gas cylinder ki qeemat", "aaj lpg ka rate", "gas cylinder ka rate", "12 kg cylinder ka rate"],
    "buy_ru": ["gas cylinder home delivery", "gas cylinder kahan se milega", "lpg gas agency kaise len", "gas cylinder lene ka tareeqa"],
}
for k, lst in EXTRA.items():
    for s in lst:
        q(k, s, note_="v4 scope query")
URDU = ["ایل پی جی کی قیمت", "گیس سلنڈر کی قیمت", "ایل پی جی گیس ریٹ آج", "گیس سلنڈر ہوم ڈیلیوری", "ایل پی جی گیس ایجنسی",
        "گیس سلنڈر کہاں سے ملے گا", "ایل پی جی سلنڈر کا وزن"]
for s in URDU:
    q("urdu_script", s, hl="ur", note_="Urdu-script query. Writer to review spelling variants.")
nat = pd.DataFrame(rows).drop_duplicates(subset=["query", "hl"]).reset_index(drop=True)
nat.to_csv(P("data", "serper_queries_national.csv"), index=False, encoding="utf-8-sig")
print("serper_queries_national:", len(nat), "queries")

seeds = ["lpg gas", "lpg cylinder", "gas cylinder", "lpg rate", "lpg price", "gas cylinder price", "lpg delivery", "lpg supplier",
         "lpg distributor", "lpg regulator", "lpg stove", "lpg geyser"]
pd.DataFrame({"seed": seeds, "expand": "seed + ' ' + a..z and seed + ' in ' + city", "endpoint": "autocomplete", "gl": "pk", "hl": "en"}).to_csv(
    P("data", "serper_autocomplete_seeds.csv"), index=False)
