"""Map every keyword to ONE target page (cannibalization rule: one cluster, one primary URL).
Inputs : merged.json (from 01_parse.py)
Outputs: ../keyword-master.csv, ../page-map.csv
Rules are ordered; first match wins. Re-run after editing PAGES or RULES.
"""
import csv, json, re, collections, os, sys
here = os.path.dirname(os.path.abspath(__file__))
out = os.path.dirname(here)
data = json.load(open(os.path.join(here, "merged.json"), encoding="utf-8"))

# id: (url, type, phase, pillar, gate/notes)
P = {
 "HP-001": ("/", "HP", "P1", "Home", "Brand + delivery money page. 'lpg' head term is tentative: re-map to ED-001 if SERP is definitional."),
 # PRICE
 "PR-001": ("/lpg-price-in-pakistan/", "SH", "P1", "Price", "Flagship. Live OGRA price, per-kg + per-cylinder table, change vs last month. Updated every notification."),
 "PR-002": ("/lpg-price-per-kg-in-pakistan/", "CO", "P1", "Price", "TEST overlap vs PR-001; merge if >=70% SERP overlap."),
 "PR-003": ("/ogra-lpg-notified-price/", "CO", "P1", "Price", "Regulator notification explained + archive. TEST overlap vs PR-001."),
 "PR-004": ("/lpg-price-in-pakistan/karachi/", "LH", "P1", "Price", "Needs city-specific verified prices (OGRA table) + local facts."),
 "PR-005": ("/lpg-price-in-pakistan/lahore/", "LH", "P1", "Price", "Same gate as PR-004."),
 "PR-006": ("/lpg-price-in-pakistan/islamabad/", "LH", "P1", "Price", "Same gate as PR-004."),
 "PR-007": ("/lpg-price-in-pakistan/rawalpindi/", "LH", "P2", "Price", "Same gate as PR-004."),
 "PR-008": ("/lpg-price-in-pakistan/faisalabad/", "LH", "P3", "Price", "Only if OGRA table or supplier data gives a distinct price."),
 "PR-009": ("/lpg-price-in-pakistan/history/", "GD", "P2", "Price", "Original data: month-by-month series + chart."),
 "PR-010": ("/tools/lpg-cylinder-price-calculator/", "TL", "P2", "Price", "Tool: size x city x month. Link magnet."),
 # CYLINDERS
 "CY-001": ("/lpg-cylinders/", "SH", "P1", "Cylinders", "Hub: types, sizes, which to choose."),
 "CY-002": ("/lpg-cylinder-price-in-pakistan/", "CO", "P1", "Cylinders", "Price by size + deposit + brand notes. TEST overlap vs PR-001."),
 "CY-003": ("/lpg-cylinders/12-kg-domestic-cylinder/", "CT", "P2", "Cylinders", "Covers 11.8 kg (official) and '12 kg' (what people say)."),
 "CY-004": ("/lpg-cylinders/45-kg-commercial-cylinder/", "CT", "P2", "Cylinders", "45.4 kg commercial."),
 "CY-005": ("/lpg-cylinders/5-kg-cylinder/", "CT", "P3", "Cylinders", "Small cylinders."),
 "CY-006": ("/lpg-cylinders/composite-fiber-cylinder/", "CT", "P2", "Cylinders", "Composite cylinders: needs real supplier facts."),
 "CY-007": ("/lpg-cylinder-sizes-in-pakistan/", "GD", "P1", "Cylinders", "Sizes + weights + colour/markings."),
 "CY-008": ("/lpg-cylinder-refill/", "SH", "P2", "Cylinders", "Refill / exchange service page."),
 "CY-009": ("/new-lpg-connection/", "SH", "P2", "Cylinders", "New connection: deposit, documents, steps."),
 "CY-010": ("/tools/lpg-cylinder-duration-calculator/", "TL", "P3", "Cylinders", "How long a cylinder lasts."),
 # DELIVERY (money)
 "DL-001": ("/lpg-home-delivery/", "SH", "P1", "Delivery", "Money page. Needs real fulfilment partners."),
 "DL-002": ("/lpg-home-delivery/islamabad/", "SL", "P1", "Delivery", "Gate: >=5 verified local facts + live fulfilment."),
 "DL-003": ("/lpg-home-delivery/rawalpindi/", "SL", "P1", "Delivery", "Same gate."),
 "DL-004": ("/lpg-home-delivery/lahore/", "SL", "P2", "Delivery", "Same gate."),
 "DL-005": ("/lpg-home-delivery/karachi/", "SL", "P2", "Delivery", "Same gate."),
 "DL-006": ("/commercial-lpg-supply/", "SH", "P2", "Delivery", "Restaurants, hotels, bakeries, factories."),
 "DL-007": ("/bulk-lpg-supply/", "SH", "P3", "Delivery", "Bulk tanks / bowser supply."),
 "DL-008": ("/order-lpg/", "TR", "P1", "Delivery", "Conversion page (order form)."),
 # NEAR ME / DIRECTORIES
 "NM-001": ("/lpg-near-me/", "DR", "P2", "Local", "Finder. Only verified listings. Do not scrape maps."),
 "NM-002": ("/lpg-shops-and-agencies/", "DR", "P3", "Local", "TEST intent vs NM-001."),
 "NM-003": ("/lpg-filling-stations/", "DR", "P3", "Local", "TEST intent: auto-gas stations vs cylinder shops."),
 "NM-004": ("/lpg-companies-in-pakistan/", "DR", "P2", "Local", "Neutral list of OGRA-licensed marketers."),
 # NEWS / SUPPLY
 "NW-001": ("/lpg-shortage-pakistan/", "NW", "P1", "Market", "Live tracker; dated, sourced updates."),
 "NW-002": ("/lpg-supply-in-pakistan/", "GD", "P1", "Market", "Where Pakistan's LPG comes from, who supplies it."),
 "NW-003": ("/why-lpg-prices-change-in-pakistan/", "GD", "P2", "Market", "Price formula explainer."),
 # EDUCATION
 "ED-001": ("/what-is-lpg/", "GD", "P1", "Learn", "Full form, meaning, uses. Absorbs 'uses' queries."),
 "ED-002": ("/lpg-composition-and-properties/", "GD", "P2", "Learn", "Propane/butane, density, calorific value, how it is made."),
 "ED-003": ("/lpg-vs-lng/", "CM", "P2", "Learn", ""),
 "ED-004": ("/lpg-vs-cng/", "CM", "P2", "Learn", "Includes the car section."),
 "ED-005": ("/lpg-vs-sui-gas/", "CM", "P2", "Learn", "LPG vs natural gas / SNGPL / SSGC supply."),
 "ED-006": ("/tools/lpg-litre-to-kg-converter/", "TL", "P2", "Learn", ""),
 # SAFETY
 "SF-001": ("/lpg-safety/", "SH", "P1", "Safety", "Hub (replaces /safety)."),
 "SF-002": ("/what-to-do-if-you-smell-gas/", "GD", "P1", "Safety", "Emergency steps. Reviewed by a qualified person."),
 "SF-003": ("/lpg-cylinder-blast-causes-and-prevention/", "GD", "P2", "Safety", ""),
 "SF-004": ("/lpg-regulators/", "CT", "P3", "Safety", "Buying guide; high vs low pressure."),
 "SF-005": ("/lpg-regulator-problems-and-repair/", "GD", "P3", "Safety", ""),
 "SF-006": ("/lpg-leak-detector/", "GD", "P3", "Safety", ""),
 # APPLIANCES (gated: only if we sell or have a disclosed affiliate)
 "AP-001": ("/lpg-stove-price-in-pakistan/", "CT", "P3", "Appliances", "GATED on selling/affiliate."),
 "AP-002": ("/lpg-geyser-price-in-pakistan/", "CT", "P3", "Appliances", "GATED."),
 "AP-003": ("/lpg-heaters-in-pakistan/", "CT", "P3", "Appliances", "GATED. Publish before winter."),
 "AP-004": ("/lpg-vaporizers/", "GD", "P4", "Appliances", "GATED: validate volume first."),
 # AUTO
 "AU-001": ("/auto-lpg-in-pakistan/", "GD", "P4", "Auto", "GATED: verify legal status and OGRA rules first."),
 "AU-002": ("/lpg-kit-price-in-pakistan/", "CO", "P4", "Auto", "GATED."),
 # B2B
 "BZ-001": ("/lpg-business-in-pakistan/", "GD", "P3", "B2B", "Also recruits distributors/partners."),
 "BZ-002": ("/lpg-plant-in-pakistan/", "GD", "P4", "B2B", ""),
 "BZ-003": ("/lpg-bowser/", "GD", "P4", "B2B", "GATED: validate volume."),
}
CITY = {"karachi": ("PR-004", "DL-005"), "lahore": ("PR-005", "DL-004"), "islamabad": ("PR-006", "DL-002"),
        "rawalpindi": ("PR-007", "DL-003"), "faisalabad": ("PR-008", None)}
OTHER_CITIES = ["multan", "peshawar", "quetta", "sialkot", "gujranwala", "hyderabad", "sahiwal", "okara", "punjab", "johar town", "sargodha", "bahawalpur"]

EXCLUDE = re.compile(
    r"jpg to pdf|opg x ray|^log |log 0|intel xe|endermologie|massage|le male|le beau|\bface\b|muscle|movie|song|tiktok|icon|download|university|\bfilm\b|tablet|lgp qua|904 black|90 even|whatsapp group|"
    r"\bindia\b|indane|bharat|ujjwala|aadhaar|ekyc|subsidy|kenya|nepal|bangladesh|philippines|nigeria|qatar|\buk$|france|america|jharkhand|bengal|koderma|sitapur|daltonganj|faridkot|jamuna|saudi|"
    r"flipkart|amazon|reforms|blackstone|1 lb|propane cylinder|\bnh3\b|\bngl\b|msds|hs code|un number|\blogo\b|drawing|design|\btech$|lpg 2\.0|lpg 3\.0|lpg 360|\b4 u\b|alliance|lpg week|lpg name|jets limited|quotes|"
    r"\bunit$|portal|house faisalabad|ayan lpg|^k lpg|saga lpg|express|monogram|xtralite|solimo|anjali|zepdos|trolley|whirlpool|dryer|maruti|xl6|santro|wagon r|honda city|toyota corolla|"
    r"lpg 2\.0|lpg light|lpg video|lpg 24$|lpg direct|lpg block|lpg 90$|lpg 60$|lpg 1$|lpg 2$|lpg quote|monitor|emulator|lpg room|lpg yard|lpg treatment|lpg management|lpg operation|lpg systems|lpg international|lpg machine|lpg adapter|"
    r"lpg tablet|lpg le |lpg film|lpg update$|jobs|vacanc|training|hyderabad news|lpg america|lpg 904|\bjets\b|lpg jet|lpg whatsapp")

RULES = []
def R(page, pat, flags=re.I, note=""):
    RULES.append((page, re.compile(pat, flags), note))

PRICEW = r"price|rate|kimat|cost|today|retail|market|latest|new price|per kg"
# --- brand navigation: official sites should own these; we only take price-compare queries
R("BRAND-PRICE", r"(pso|noor|sngpl|ssgc|shell|global|parco|burshane).*(price|rate)|(price|rate).*(pso|noor|sngpl|ssgc|shell)")
R("BRAND-NAV", r"\bssgc\b|\bsngpl\b|noor lpg|\bpso\b|burshane|parco|gulf lpg|lpg express")
# --- specialised topics first
R("AP-004", r"vaporizer|vaporiser|vaporization|evaporator|lovato|brc ")
R("ED-004", r"\bcng\b")
R("AU-002", r"\bkit\b|kit price|conversion kit|installation in car|kit fitting|kit ki|kit repair")
R("AU-001", r"autogas|auto gas|lpg car|on car|in car|in cars|for car|for cars|vehicle|mileage|average|bike|fitting|workshop|car starting|petrol to lpg|lpg to petrol|to petrol|vs petrol|vs gasoline|vs diesel|conversion|mechanic|cultus|mehran|vitz|engine oil|lpg for generator|generator|lpg system|pump for car|lpg in bike|car$|lpg cars")
R("AP-001", r"stove|chulha|burner|\bhob\b|oven|cooking range|cooktop|single burner")
R("AP-002", r"geyser|water heater|hot water|on demand water")
R("AP-003", r"heater")
R("SF-005", r"(regulator|hose).*(problem|repair|leak|leakage|issue)|regulator repair")
R("SF-004", r"regulator|\bhose\b|reducer|pressure gauge|quick connect|valve|connector")
R("SF-006", r"detector|alarm|leakage detector")
R("SF-003", r"blast|explode|explosion|\bfire\b|blast video")
R("SF-002", r"smell|kill you|leak\b|leakage|yellow flame")
R("SF-001", r"hazard|\bsafe\b|safety|dangerous|\blaw\b|storage rules|where on site")
R("NW-001", r"shortage|crisis|strike|\bnews\b|latest news|new update|update news|update today|lpg update")
R("NW-003", r"why.*(price|rate).*(increase|change|hike|rise)")
R("BZ-003", r"bowser")
R("BZ-002", r"\bplant\b|bottling|air mix|storage and filling|filling machine|refilling machine|transfer pump|compressor|vacuum pump|hand pump|pump repair")
R("LOGISTICS", r"tanker|\bship\b|vessel|freight|pipeline|truck")
R("NW-002", r"import|production|produce|comes from|come from|where lpg|lpg gas comes")
R("NM-002", r"(distributor|supplier|dealer|dealers|agency|shop|store).*(near me|near)|near me.*(shop|store)")
R("DL-007", r"\btank\b(?! gauge)|\bbulk\b|bullet")
R("BZ-001", r"business|licen[cs]e|dealership|distribution|karobar|distributor|wholesale|supplier|marketing compan")
R("NM-004", r"compan(y|ies)|marketers|list of lpg")
R("ED-003", r"\blng\b")
R("ED-005", r"natural gas|sui gas|\bpng\b|\bng\b|ng gas|\bpng\b")
R("ED-006", r"liter|litre|\bkg to\b|\bto kg\b|1m3|kg/m3")
R("CY-010", r"consumption|per hour|how long|last long|duration|lpg average setting")
R("ED-002", r"composition|consists|mixture|contains|contain|made of|formula|density|calorific|freezing|\bpressure\b|properties|heavier|looks like|look like|extraction|how lpg|70 30|mainly|freeze|flame is blue|blue|weathering|which gas|renewable|is a liquid|an example|hand|evaporat")
R("PR-001", r"how much (is )?lpg|how much lpg gas")
R("ED-001", r"invented|introduced|full form|stand for|stands for|meaning|what is|what are|what lpg|abbreviation|definition|liquefied|liquid petroleum|uses\b|used for|where lpg is used|is liquid or gas|liquid or gas|lpg id\b|lpg is which|lpg is used|lpg stand")
# --- OGRA / per kg
R("PR-003", r"ogra|notified|notification|official rate|sarkari|international price")
# --- cities (price vs delivery)
def city_rule(kw):
    for c, (pp, dp) in CITY.items():
        if c in kw:
            if re.search(PRICEW, kw):
                return pp
            if dp and re.search(r"deliver|cylinder|gas|home|refill|lpg " + c + r"|in " + c, kw):
                return dp
            return dp or pp
    return None
# --- sizes & cylinder
R("CY-004", r"45|47\.5|48 ?kg|50 ?kg|22 ?kg|20 ?kg|commercial|jumbo")
R("CY-003", r"11\.8|11\.67|12 ?kg|11 ?kg|14 ?kg|domestic|home cylinder|home cylinder price")
R("CY-005", r"\b[2-6](\.\d)? ?kg|5kg|4 kg|3 kg|9 ?kg|6kg")
R("CY-006", r"fiber|fibre|composite|plastic")
R("CY-007", r"sizes|bottle size|weight|capacity|how much lpg cylinder")
R("CY-009", r"empty cylinder|new cylinder|new connection|connection|without connection|lpg cylinder with|with cylinder")
R("CY-008", r"refill")
# --- local / delivery
R("NM-003", r"station|filling|\bpump\b|bunk|gas pump")
R("NM-002", r"\bshop|\bstore|agency|dealer|for sale|gas shop")
R("NM-001", r"near me|near my|nearby|near here|near lpg|near me now|my location")
R("DL-008", r"order|online|apply")
R("DL-001", r"deliver|supply|home delivery")
R("PR-002", r"1 ?kg|per kg|kg price|kg rate|kg$|1 kg|litre price|ki price")
R("CY-002", r"cylinder|bottle|\bcylinders\b")
R("PR-001", PRICEW + r"|prices")
# fallback
R("HP-001", r"^(lpg|lpg gas|lpg to gas|lpg gas gas|lpg today|lpg pakistan|lpg in pakistan|lpg lahore|lpg gas lahore)$")

def assign(kw):
    if EXCLUDE.search(kw):
        return "EXCLUDE"
    # Brand rules first, but price-with-city handled later; brand wins
    for page, pat, _ in RULES[:2]:
        if pat.search(kw):
            return page
    # cities beat topical rules ONLY for plain price/delivery phrasing (no topic words)
    topical = re.search(r"kit|vaporiz|stove|chulha|geyser|heater|regulator|station|filling|pump|shop|store|plant|mechanic|cng|business|bowser|conversion", kw)
    if not topical:
        c = city_rule(kw)
        if c:
            return c
    for page, pat, _ in RULES[2:]:
        if pat.search(kw):
            return page
    c = city_rule(kw)
    if c:
        return c
    for oc in OTHER_CITIES:
        if oc in kw:
            return "PR-001" if re.search(PRICEW, kw) else "NOPAGE"
    return "NOPAGE"

rows = []
by_page = collections.defaultdict(list)
for r in data:
    pg = assign(r["kw"])
    disp = ("EXCLUDE" if pg == "EXCLUDE" else "NO-PAGE" if pg in ("NOPAGE","LOGISTICS") else "BRAND-NAV" if pg == "BRAND-NAV" else "TARGET" if r["vol"] > 0 else "MONITOR")
    rec = dict(keyword=r["kw"], volume=r["vol"], seo_difficulty=r["sd"], cpc_pkr=r["cpc"], intent=r["intent"], target_page=pg, disposition=disp)
    rows.append(rec)
    by_page[pg].append(rec)

# primary / secondary
for pg, lst in by_page.items():
    lst.sort(key=lambda x: -x["volume"])
    for i, x in enumerate(lst):
        x["role"] = ("primary" if i == 0 else "secondary") if x["disposition"] in ("TARGET", "MONITOR") and pg in P else ""
        if pg == "BRAND-PRICE":
            x["role"] = "secondary"
            x["target_page"] = "CY-002"
            x["disposition"] = "TARGET" if x["volume"] > 0 else "MONITOR"

rows.sort(key=lambda x: (-x["volume"], x["keyword"]))
with open(os.path.join(out, "keyword-master.csv"), "w", encoding="utf-8-sig", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["keyword", "volume", "seo_difficulty", "cpc_pkr", "intent", "target_page", "role", "disposition"], extrasaction="ignore")
    w.writeheader()
    w.writerows(rows)

# page-map
by_page2 = collections.defaultdict(list)
for x in rows:
    if x["target_page"] in P and x["disposition"] in ("TARGET", "MONITOR"):
        by_page2[x["target_page"]].append(x)
pm = []
for pid, (url, typ, ph, pillar, note) in P.items():
    lst = sorted(by_page2.get(pid, []), key=lambda x: -x["volume"])
    pos = [x for x in lst if x["volume"] > 0]
    pm.append(dict(page_id=pid, url=url, type=typ, phase=ph, pillar=pillar,
                   primary_keyword=lst[0]["keyword"] if lst else "", primary_volume=lst[0]["volume"] if lst else 0,
                   keywords_mapped=len(lst), keywords_with_volume=len(pos),
                   volume_floor=sum(set(x["volume"] for x in pos)), volume_ceiling=sum(x["volume"] for x in pos),
                   avg_sd=round(sum(x["seo_difficulty"] for x in pos) / len(pos), 1) if pos else "", gate_notes=note,
                   top_secondary="; ".join(f"{x['keyword']} ({x['volume']})" for x in lst[1:6])))
with open(os.path.join(out, "page-map.csv"), "w", encoding="utf-8-sig", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(pm[0].keys()))
    w.writeheader()
    w.writerows(pm)

if "--report" in sys.argv or True:
    print(f"{'ID':7s} {'ph':3s} {'primary kw':46s} {'prim':>6s} {'n':>4s} {'floor':>6s} {'ceil':>6s}  url")
    for p in pm:
        print(f"{p['page_id']:7s} {p['phase']:3s} {p['primary_keyword'][:46]:46s} {p['primary_volume']:6d} {p['keywords_mapped']:4d} {p['volume_floor']:6d} {p['volume_ceiling']:6d}  {p['url']}")
    for k in ("EXCLUDE", "NOPAGE", "BRAND-NAV"):
        l = by_page.get(k, [])
        print(f"\n[{k}] {len(l)} kws, vol sum {sum(x['volume'] for x in l)}; top: " + "; ".join(f"{x['keyword']}({x['volume']})" for x in l[:40]))

