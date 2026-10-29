"""Audit fixes for keyword-master.csv and page-map.csv (26 Oct 2026). Idempotent.

Problems found when the keyword-to-page mapping was re-checked against seo-LeadGEN.md Step 8.4 / 9.1:
  1. Off-topic queries were mapped to live pages (e.g. 'lpg 1 weight loss' on the sizes page).
  2. 'bill' queries (almost certainly gas utility bills) were mapped to the order page.
  3. The Punjab hub had a CITY query ('okara lpg') as its primary keyword.
  4. Two safety pages had primaries that did not match what the page is about.
  5. Province hubs had no primary keyword at all.
  6. Trust-page set was missing a provider-standards page and a reviewer profile page.

Run:  python docs/seo-plan/scripts/19_fix_keyword_map.py
"""
import os
import re

import pandas as pd

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
P = lambda *p: os.path.join(BASE, *p)

K = pd.read_csv(P("keyword-master.csv"))
pm = pd.read_csv(P("page-map.csv"))
log = []


def set_kw(mask, **cols):
    n = int(mask.sum())
    for k, v in cols.items():
        K.loc[mask, k] = v
    return n


# 1. off-topic or foreign queries -> EXCLUDE
junk = K.keyword.str.contains(r"weight loss|australian|indiamart|\buae\b|\bkyc\b|lpg apply|online apply", regex=True, case=False)
junk &= K.disposition.isin(["TARGET", "MONITOR"])
log.append(("excluded off-topic/foreign", set_kw(junk, disposition="EXCLUDE", role="excluded", target_page="EXCLUDE")))

# 2. bill queries -> NO-PAGE (probably utility bills; revisit only if Search Console shows demand)
bill = K.keyword.str.contains(r"\bbill\b", regex=True, case=False) & K.target_page.eq("DL-008")
log.append(("bill queries moved to NO-PAGE", set_kw(bill, disposition="NO-PAGE", role="none", target_page="NOPAGE")))


# 3-5. primaries
def make_primary(pid, kw, vol=0):
    """Make `kw` the primary for page `pid`. Adds the row if the keyword is not in the master."""
    global K
    K.loc[(K.target_page == pid) & (K.role == "primary"), "role"] = "secondary"
    m = K.keyword.eq(kw) & K.target_page.eq(pid)
    if m.any():
        K.loc[m, ["role", "disposition"]] = ["primary", "TARGET"]
    else:
        row = {c: "" for c in K.columns}
        row.update(keyword=kw, volume=vol, seo_difficulty="", cpc_pkr=0.0, intent="", target_page=pid, role="primary", disposition="TARGET")
        K = pd.concat([K, pd.DataFrame([row])], ignore_index=True)
    return 1


n = 0
n += make_primary("SF-001", "lpg hazards")                      # already primary; kept explicit
n += make_primary("SF-002", "why lpg gas smell", 10)
PROV_URL = {"/lpg-in-punjab/": "punjab", "/lpg-in-sindh/": "sindh", "/lpg-in-khyber-pakhtunkhwa/": "khyber pakhtunkhwa",
            "/lpg-in-balochistan/": "balochistan", "/lpg-in-gilgit-baltistan/": "gilgit baltistan",
            "/lpg-in-azad-kashmir/": "azad kashmir"}
PH_IDS = {}
for r in pm.itertuples():
    if r.url in PROV_URL:
        PH_IDS[r.page_id] = PROV_URL[r.url]
# remove rows added by an earlier run that paired the wrong id and province
bad = (K.keyword.isin([f"lpg in {v}" for v in PROV_URL.values()]) & K.target_page.str.startswith("PH-")
       & ~K.apply(lambda r: PH_IDS.get(r.target_page) == r.keyword.replace("lpg in ", ""), axis=1))
K = K[~bad].copy()
for pid, name in PH_IDS.items():
    n += make_primary(pid, f"lpg in {name}", 0)
# 'okara lpg' is a city: keep as a secondary of the Punjab hub (Okara is in Punjab), never as primary
K.loc[K.keyword.eq("okara lpg") & K.target_page.eq("PH-001"), "role"] = "secondary"
log.append(("primaries set", n))

# 3a. hubs whose primary was a PRICE query ("lpg 1kg price today near islamabad"). A hub page is a supply/delivery page; the
# 1kg-price intent belongs to the price pages (PR-002) and is covered inside the hub as a section. Use the hub pattern.
for pid, kw in [("DL-002", "lpg gas islamabad"), ("LC-003", "lpg gas faisalabad")]:
    if pid in set(pm.page_id):
        make_primary(pid, kw, 0)
        log.append((f"{pid} primary -> {kw}", 1))

# 3b. city hubs that are built but had no primary keyword: use the plain local pattern. Volume is UNKNOWN (Ubersuggest had
# no data), so it is stored as 0 and the brief says "seed in Keyword Planner / check Serper autocomplete before launch".
for url, city in [("/lpg-in-peshawar/", "peshawar"), ("/lpg-in-quetta/", "quetta"), ("/lpg-in-hyderabad/", "hyderabad"),
                  ("/lpg-in-burewala/", "burewala"), ("/lpg-in-multan/", "multan"), ("/lpg-in-gujranwala/", "gujranwala"),
                  ("/lpg-in-gilgit/", "gilgit"), ("/lpg-in-skardu/", "skardu"), ("/lpg-in-murree/", "murree"),
                  ("/lpg-in-muzaffarabad/", "muzaffarabad"), ("/lpg-in-abbottabad/", "abbottabad")]:
    rows = pm.index[pm.url == url]
    if len(rows) and not (isinstance(pm.at[rows[0], "primary_keyword"], str) and pm.at[rows[0], "primary_keyword"].strip()):
        make_primary(pm.at[rows[0], "page_id"], f"lpg gas {city}", 0)
        touched_hubs = True

# 6a. Burewala hub is built (wave-2 city, 5 listed suppliers) but had no page-map row. Add it BEFORE the primaries above run.
if "/lpg-in-burewala/" not in set(pm.url):
    pm = pd.concat([pm, pd.DataFrame([dict(
        page_id="LC-012", url="/lpg-in-burewala/", type="LC", phase="P2", pillar="Locations", primary_keyword="",
        gate_notes="City hub. Gate L. 5 listed suppliers in the owner's network (unverified). Verify 3+ by call and run one test order before launch.",
        v4_change="AUDIT")])], ignore_index=True)
    make_primary("LC-012", "lpg gas burewala", 0)
    log.append(("added LC-012 Burewala", 1))

# 3c. /lpg-cylinders/ (CY-001) is built but had no primary keyword, because every generic cylinder query was parked on the
# price page. A Serper run on 27 Oct 2026 for 'lpg cylinder' and 'lpg cylinders' shows PRODUCT and CATALOGUE results
# (brand cylinder pages, composite cylinders, Wikipedia, Daraz), not price pages. So the generic cylinder terms belong to
# the cylinders hub, and CY-002 keeps the price terms. This also lowers the CY-001/CY-002 overlap risk.
GENERIC_CYL = ["lpg cylinder", "lpg cylinders", "lpg gas cylinder", "lpg gas cylinders", "gas cylinder lpg", "cylinder lpg"]
moved = K.keyword.isin(GENERIC_CYL) & K.target_page.eq("CY-002")
log.append(("generic cylinder terms CY-002 -> CY-001", set_kw(moved, target_page="CY-001", role="secondary")))
make_primary("CY-001", "lpg cylinder", 1300)

# 3d. /services/ (SV-001) had no primary. 'lpg engineering services' is NOT used: its SERP is full of unrelated companies
# named 'LPG Engineering' (a CNC shop, a Sri Lankan firm). 'lpg installation services in pakistan' returns the right
# intent (suppliers, installers, associations). Volume unknown (stored as 0).
make_primary("SV-001", "lpg installation services in pakistan", 0)
log.append(("SV-001 primary set", 1))

K.to_csv(P("keyword-master.csv"), index=False)

# page-map: refresh primary + secondary text for pages whose keywords changed
touched = {"CY-007", "DL-008", "SF-001", "SF-002", "CY-001", "CY-002", "SV-001", "LC-004", "LC-005", "LC-007", "LC-008", "LC-009", "LC-010", "LC-011"} \
    | set(PH_IDS) | {"LC-001", "LC-002", "LC-003", "LC-006", "LC-012", "DL-002"}
for pid in touched:
    i = pm.index[pm.page_id == pid]
    if not len(i):
        continue
    g = K[(K.target_page == pid) & K.disposition.isin(["TARGET", "MONITOR"])].copy()
    g["volume"] = pd.to_numeric(g.volume, errors="coerce").fillna(0)
    prim = g[g.role == "primary"]
    if len(prim):
        pm.loc[i[0], ["primary_keyword", "primary_volume"]] = [prim.iloc[0].keyword, int(prim.iloc[0].volume)]
    sec = g[g.role != "primary"].sort_values("volume", ascending=False).head(12)
    pm.loc[i[0], "top_secondary"] = "; ".join(f"{r.keyword} ({int(r.volume)})" for r in sec.itertuples())

# 6. new rows (idempotent)
new_rows = [
    dict(page_id="TR-013", url="/partner-standards/", type="TR", phase="P1", pillar="Trust", primary_keyword="",
         gate_notes="What a distributor or supplier must meet to receive our orders: licence, cylinder condition, safety, price list, delivery target, complaint handling. Built from the standards the owner confirms; no invented SLA numbers.",
         v4_change="AUDIT"),
    dict(page_id="TR-014", url="/about/haroon-rasheed/", type="TR", phase="P2", pillar="Trust", primary_keyword="",
         gate_notes="Reviewer profile (Method Step 13.4 / E-E-A-T). Needs Mr Rasheed's written consent, his real qualifications and the dates he reviewed each page. Person schema only after that. Do not publish a bio with invented credentials.",
         v4_change="AUDIT"),
]
for r in new_rows:
    if r["page_id"] not in set(pm.page_id):
        pm = pd.concat([pm, pd.DataFrame([r])], ignore_index=True)
        log.append((f"added {r['page_id']}", 1))

pm.to_csv(P("page-map.csv"), index=False)
assert pm.page_id.is_unique and pm.url.is_unique

for k, v in log:
    print(f"{k:34s} {v}")
live = pm[pm.phase != "MERGED"]
print("active pages:", len(live), "| by phase:", live.phase.value_counts().sort_index().to_dict())
