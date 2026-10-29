"""Build lpg-website/data/network.json: the PUBLIC-SAFE aggregate used by the website.

Source of truth for the network = the owner's LPG_dealers_all_regions.xlsx (owner-confirmed real distributors,
26 Oct 2026). Output contains counts and area names only: NO phone numbers, NO business names.
Naming a partner publicly needs that partner's consent (plan section 7.3).

Run from lpg-website/docs/seo-plan/scripts:  python 15_export_site_data.py
"""
import json
import re
from pathlib import Path

import pandas as pd

HERE = Path(__file__).resolve().parent
DATA = HERE.parent / "data"
OUT = HERE.parent.parent.parent / "data" / "network.json"
OUT.parent.mkdir(exist_ok=True)

slug = lambda s: re.sub(r"[^a-z0-9]+", "-", str(s).lower()).strip("-")
PROV_NAME = {"ICT": "Islamabad (ICT)", "KP": "Khyber Pakhtunkhwa", "GB": "Gilgit-Baltistan", "AJK": "Azad Kashmir"}
PROV_SLUG = {"Punjab": "punjab", "Sindh": "sindh", "KP": "khyber-pakhtunkhwa", "Balochistan": "balochistan",
             "AJK": "azad-kashmir", "GB": "gilgit-baltistan", "ICT": "islamabad"}
# city aliases seen in the dealer file that belong to a master city
ALIAS = {"shah-faisal-town": "karachi", "new-mirpur-city": "mirpur"}
MIN_HUB_SUPPLIERS = 5     # threshold for a city hub template (plan Gate L1 uses 3 verified; 5 keeps margin)

d = pd.read_csv(DATA / "dealers_xlsx_classified.csv")
d["phone_n"] = d["phone_n"].astype(str)
cm = pd.read_csv(DATA / "cities_master.csv").drop_duplicates("city")
cm["slug"] = cm.city.map(slug)
master = {r.slug: r for r in cm.itertuples()}

d["cslug"] = d.city.map(slug).replace(ALIAS)
d["is_supplier"] = d["class"].isin(["LPG_DEALER", "REVIEW"])
d["is_auto"] = d["class"].eq("AUTO_CONVERSION")

# localities (area names) from the cleaned Maps data, joined on phone
b = pd.read_csv(DATA / "lpg_businesses_clean.csv", dtype={"phone_e164": str})
b["phone_n"] = b["phone_e164"].astype(str).str[-10:]
loc = b.dropna(subset=["locality"]).drop_duplicates("phone_n").set_index("phone_n")["locality"]
d["locality"] = d["phone_n"].map(loc)
d["open_24h"] = d["phone_n"].map(b.drop_duplicates("phone_n").set_index("phone_n")["open_24h"])

cities = []
for cslug, g in d.groupby("cslug"):
    if cslug not in master:
        continue
    m = master[cslug]
    top = [x for x, _ in g["locality"].dropna().astype(str).str.strip().value_counts().items()
           if 2 < len(x) < 40 and not re.search(r"\d|plus code|pakistan", x, re.I)][:10]
    sup = int(g.is_supplier.sum())
    cities.append({
        "slug": cslug, "name": m.city, "province": m.province, "popTier": m.pop_tier,
        "suppliers": sup, "autoLpg": int(g.is_auto.sum()), "localities": sorted(top),
        "open24h": int(g["open_24h"].astype(str).str.lower().isin(["true", "1", "yes"]).sum()),
        "hub": sup >= MIN_HUB_SUPPLIERS,
    })
cities.sort(key=lambda c: (-c["suppliers"], c["name"]))

# province roll-up (incl. partners in towns that are not in the 250-city master)
provinces = {}
for p, g in d.groupby("province"):
    if p == "UNKNOWN":
        continue
    provinces[PROV_SLUG.get(p, slug(p))] = {
        "name": PROV_NAME.get(p, p), "code": p,
        "suppliers": int(g.is_supplier.sum()), "autoLpg": int(g.is_auto.sum()),
        "cities": [c["slug"] for c in cities if c["province"] == p],
    }

out = {
    "generatedAt": pd.Timestamp.today().strftime("%Y-%m-%d"),
    "source": "Owner-supplied distributor list (LPG_dealers_all_regions.xlsx), confirmed by the owner on 2026-10-26. Counts only.",
    "totals": {"partners": int(len(d)), "suppliers": int(d.is_supplier.sum()), "autoLpg": int(d.is_auto.sum()),
               "citiesWithPartners": len(cities), "hubCities": sum(c["hub"] for c in cities)},
    "provinces": provinces,
    "cities": cities,
}
OUT.write_text(json.dumps(out, indent=1, ensure_ascii=False), encoding="utf-8")
print("wrote", OUT)
print(json.dumps(out["totals"]))
print("hubs:", [(c["name"], c["suppliers"]) for c in cities if c["hub"]])
print({k: (v["suppliers"], v["autoLpg"]) for k, v in provinces.items()})
