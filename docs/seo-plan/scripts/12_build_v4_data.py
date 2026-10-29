"""v4 data layer: partner master, city readiness, competitor set, national Serper queries.
Run from anywhere:  python docs/seo-plan/scripts/12_build_v4_data.py
Inputs : data/lpg_businesses_clean.csv, data/dealers_xlsx_classified.csv, data/location-master.csv,
         data/city_keyword_demand.csv, data/competitor_seeds.csv, data/competitor_recon.json
Outputs: data/partners_master.csv, data/city_readiness.csv, data/competitors_v4.csv
"""
import json
import os
import re

import pandas as pd

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
D = lambda *p: os.path.join(BASE, "data", *p)

PROV_FIX = {
    "ICT": "Islamabad (ICT)", "KP": "Khyber Pakhtunkhwa", "GB": "Gilgit-Baltistan",
    "AJK": "Azad Jammu & Kashmir", "Sindh": "Sindh", "Punjab": "Punjab",
    "Balochistan": "Balochistan", "UNKNOWN": "UNKNOWN",
}


def phone_key(p):
    d = re.sub(r"\D", "", str(p)) if pd.notna(p) else ""
    if d.startswith("92"):
        d = d[2:]
    return d.lstrip("0")


# ---------------------------------------------------------------- partners master
B = pd.read_csv(D("lpg_businesses_clean.csv"), dtype=str)
X = pd.read_csv(D("dealers_xlsx_classified.csv"), dtype=str)
B["phone_key"] = B.phone_e164.map(phone_key)
X["phone_key"] = X.phone.map(phone_key)

have = set(B.phone_key) - {""}
extra = X[(~X.phone_key.isin(have)) & (X["class"].isin(["LPG_DEALER", "REVIEW"]))].copy()
extra_rows = pd.DataFrame({
    "biz_id": [f"X{i + 1:04d}" for i in range(len(extra))],
    "name": extra.name.values,
    "role": "review_from_dealers_xlsx",
    "status": "UNKNOWN",
    "province": extra.province.map(PROV_FIX).values,
    "city_clean": extra.city.values,
    "locality": "",
    "address": extra.address.values,
    "phone_e164": extra.phone.values,
    "phone_type": "",
    "website": extra.website.values,
    "rating": "", "reviews": "", "open_24h": "",
    "source_file": "LPG_dealers_all_regions.xlsx",
})
B["source_file"] = B.source_file
cols = ["biz_id", "name", "role", "status", "province", "city_clean", "locality", "address", "phone_e164",
        "phone_type", "website", "rating", "reviews", "open_24h", "source_file"]
P = pd.concat([B[cols], extra_rows[cols]], ignore_index=True)
P["verification_status"] = "unverified"   # unverified -> contacted -> verified -> agreed -> live
P["consent_to_list"] = "none"             # none -> asked -> opted_in
P["listing_eligible"] = "no"              # becomes yes only when verified AND opted_in
P.to_csv(D("partners_master.csv"), index=False, encoding="utf-8-sig")
print(f"partners_master: {len(P)} rows ({len(B)} cleaned + {len(extra_rows)} extra from dealers xlsx)")

# ---------------------------------------------------------------- city readiness
L = pd.read_csv(D("location-master.csv"))
KW = pd.read_csv(D("city_keyword_demand.csv"))[["city", "kw_floor", "kw_ceil"]].drop_duplicates("city")
ok = B[(B.status == "OPERATIONAL") & B.phone_e164.notna()].copy()
ok["city_l"] = ok.city_clean.str.lower().str.strip()
g = ok.groupby("city_l")
agg = pd.DataFrame({
    "partners_phone_listed": g.size(),
    "filling_points": g.apply(lambda d: (d.role == "lpg_filling_point").sum()),
    "open_24h": g.apply(lambda d: (d.open_24h == "True").sum()),
    "avg_rating": g.apply(lambda d: pd.to_numeric(d.rating, errors="coerce").mean()).round(2),
}).reset_index()

L = L.drop(columns=[c for c in ["filling_points", "open_24h", "avg_rating"] if c in L.columns])
L["city_l"] = L.city.str.replace(r"\s*\(.*\)", "", regex=True).str.lower().str.strip()
R = L.merge(agg, on="city_l", how="left").merge(KW, on="city", how="left")
for c in ["partners_phone_listed", "filling_points", "open_24h"]:
    R[c] = R[c].fillna(0).astype(int)
R["kw_floor"] = R.kw_floor.fillna(0).astype(int)
R["supply_tier"] = pd.cut(R.partners_phone_listed, [-1, 0, 2, 4, 10 ** 6], labels=["D", "C", "B", "A"]).astype(str)


def decide(r):
    strategic = bool(r.cold_region_assumed) or bool(r.remote_assumed)
    big = r.pop_tier in ("T1", "T2")
    if r.supply_tier == "A" and (big or r.kw_floor > 0):
        return "HUB: launch candidate"
    if r.supply_tier == "A":
        return "HUB: P2 candidate"
    if r.supply_tier == "B":
        return "HUB: P3 candidate (verify partners first)"
    if strategic:
        return "WATCH: recruit partners, then re-score"
    return "PROVINCE HUB section only"


R["v4_decision"] = R.apply(decide, axis=1)
keep = ["city", "slug", "province", "pop_2023", "pop_tier", "partners_phone_listed", "filling_points", "open_24h",
        "avg_rating", "kw_floor", "supply_tier", "cold_region_assumed", "remote_assumed", "serper_wave",
        "v4_decision", "url_planned"]
R[keep].sort_values(["supply_tier", "partners_phone_listed"], ascending=[True, False]).to_csv(
    D("city_readiness.csv"), index=False)
print(R.v4_decision.value_counts().to_string())
print("tiers:", R.supply_tier.value_counts().to_dict())

# ---------------------------------------------------------------- competitors
recon = json.load(open(D("competitor_recon.json")))
seeds = pd.read_csv(D("competitor_seeds.csv"))
owner = {
    "flamora.pk": ("customer app / marketplace, JS-rendered", "playwright", "Only ~6 URLs in sitemap. App-like site."),
    "gasonline.pk": ("marketplace", "html", "No sitemap found. ~15 internal links, numeric product-category ids."),
    "noorlpg.com": ("brand + distributor network", "html", "No sitemap found. ~45 pages by link crawl: services, products, blogs, find-distributors."),
    "ppgl.com.pk": ("brand (PARCO Pearl Gas)", "sitemap", "129 sitemap URLs, mostly WordPress listings and blog posts."),
    "friends-gas.pk": ("local delivery agency (Rawalpindi/Islamabad)", "html", "One long page (~216 KB) plus testimonials. Rich single-page content."),
    "bostanlpg.com": ("local agency (Islamabad)", "html", "Single page."),
    "cylin.com.pk": ("platform + tools + Urdu", "sitemap+playwright", "144 sitemap URLs (81 English, 63 /ur). Tools, coverage, bill-check, Urdu. Strongest site in the list."),
    "paklpg.com": ("small WordPress", "sitemap", "7 URLs."),
}
rows = []
for dom, (cat, how, note) in owner.items():
    key = [k for k in recon if dom in k]
    urls = recon[key[0]]["urls"] if key else ""
    rows.append(dict(domain=dom, source="owner list (competiators.md)", owner_listed="yes", category=cat,
                     urls_found=urls, crawl_method=how, priority="1", notes=note))
seen = set(owner)
for r in seeds.itertuples():
    if r.domain in seen or r.domain.replace("www.", "") in seen:
        continue
    seen.add(r.domain)
    src = r.source
    pr = "2" if "SERP" in src else "3"
    rows.append(dict(domain=r.domain, source=src, owner_listed="no", category=r.type_guess, urls_found="",
                     crawl_method="html", priority=pr, notes="Seen in Islamabad SERP capture" if pr == "2" else "From Google Maps listing website. Verify it is a live LPG business."))
pd.DataFrame(rows).to_csv(D("competitors_v4.csv"), index=False)
print(f"competitors_v4: {len(rows)} domains ({sum(1 for r in rows if r['priority']=='1')} owner, "
      f"{sum(1 for r in rows if r['priority']=='2')} from SERP, {sum(1 for r in rows if r['priority']=='3')} from Maps)")
