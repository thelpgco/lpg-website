import csv, os, collections
here = os.path.dirname(os.path.abspath(__file__)); out = os.path.dirname(here)
pm = list(csv.DictReader(open(os.path.join(out, "page-map.csv"), encoding="utf-8-sig")))
km = list(csv.DictReader(open(os.path.join(out, "keyword-master.csv"), encoding="utf-8-sig")))

print("Pages by phase:", dict(collections.Counter(p["phase"] for p in pm)))
print("Pages by pillar:", dict(collections.Counter(p["pillar"] for p in pm)))
print("Dispositions:", dict(collections.Counter(k["disposition"] for k in km)))
# cannibalization check: a keyword must appear once; each page has exactly one primary
seen = collections.Counter(k["keyword"] for k in km)
print("duplicate keywords:", [k for k, v in seen.items() if v > 1][:5])
prim = collections.Counter(k["target_page"] for k in km if k["role"] == "primary")
print("pages with !=1 primary:", [p for p, v in prim.items() if v != 1])
print("pages with no keyword data yet (need a Keyword Planner seed):", [p["page_id"] for p in pm if int(p["keywords_mapped"]) == 0 and p["phase"] != "MERGED" and p["type"] not in ("TR", "UR")])
tg = [k for k in km if k["disposition"] == "TARGET"]
print("TARGET keywords:", len(tg), " MONITOR (0 vol):", sum(1 for k in km if k["disposition"] == "MONITOR"))
print("SD of target kws: max", max(int(k["seo_difficulty"]) for k in tg), "median", sorted(int(k["seo_difficulty"]) for k in tg)[len(tg) // 2], " share SD<=20:", round(sum(1 for k in tg if int(k["seo_difficulty"]) <= 20) / len(tg), 2))

T = {
 "HP-001": ("The LPG Co. Pakistan: LPG Cylinder Delivery & Prices", "Order LPG cylinder refills and delivery in Pakistan with The LPG Co. Check the current OGRA price per kg, find the right cylinder size and get a callback."),
 "PR-001": ("LPG Rate in Pakistan {Mon YYYY}: Price per kg & Cylinder", "Current LPG rate in Pakistan from the OGRA notification: price per kg, 11.8 kg and 45.4 kg cylinder, change since last month and city rates."),
 "PR-002": ("LPG Price per kg in Pakistan Today ({Mon YYYY})", "LPG price per 1 kg in Pakistan under the latest OGRA notification, with a quick calculator that converts it into a 5, 11.8, 15 or 45.4 kg cylinder cost."),
 "PR-003": ("OGRA LPG Notified Price {Mon YYYY}: Rates & History", "What the OGRA monthly LPG notification says this month, how the price is set, how it differs from market prices, and the past 12 months of rates."),
 "CY-002": ("LPG Cylinder Price in Pakistan: 5, 11.8, 15 & 45.4 kg", "LPG cylinder price in Pakistan by size: gas cost, cylinder deposit and what to check before you buy. Calculated from the current OGRA rate. Updated monthly."),
 "DL-005": ("LPG Gas in Karachi: Cylinder Price, Delivery, Dealers", "Order an LPG cylinder in Karachi. See the price by cylinder size with the delivery charge, the areas we cover and how our partner network delivers."),
 "DL-004": ("LPG Gas in Lahore: Cylinder Price, Delivery, Dealers", "Order an LPG cylinder in Lahore. See the price by cylinder size with the delivery charge, the areas we cover and how our partner network delivers."),
 "DL-002": ("LPG Gas in Islamabad: Cylinder Price, Delivery, Dealers", "Order an LPG cylinder in Islamabad. See the price by cylinder size with the delivery charge, the areas we cover and how our partner network delivers."),
 "DL-003": ("LPG Gas in Rawalpindi: Cylinder Price, Delivery, Dealers", "Order an LPG cylinder in Rawalpindi. See the price by cylinder size with the delivery charge, the areas we cover and how our partner network delivers."),
 "PR-004": ("LPG Price in Karachi Today ({Mon YYYY}): Per kg & Cylinder", "LPG price in Karachi per kg and per cylinder under the latest OGRA notification, plus what Karachi buyers should check before they order a refill."),
 "ED-001": ("LPG Full Form: What LPG Stands For and Its Meaning", "LPG stands for Liquefied Petroleum Gas. Learn what it is made of, how it is used in Pakistani homes and businesses, and how to use it safely."),
 "NW-001": ("LPG Shortage in Pakistan: Live Updates and Prices", "Dated, sourced updates on Pakistan's LPG shortage: supply, border status, price changes and what households and businesses can do right now."),
 "DL-001": ("LPG Home Delivery in Pakistan: Refill & New Cylinders", "Order LPG cylinder home delivery in Pakistan. Choose your city and cylinder size, see the OGRA-based price and get a confirmation call before delivery."),
 "PR-005": ("LPG Price in Lahore Today ({Mon YYYY}): Per kg & Cylinder", "LPG price in Lahore per kg and per cylinder under the latest OGRA notification, plus what Lahore buyers should check before they order a refill."),
}
print()
for k, (t, m) in T.items():
    tt = t.replace("{Mon YYYY}", "Nov 2026")
    print(f"{k}: title {len(tt):2d} {'OK' if len(tt)<=60 else 'LONG'} | meta {len(m):3d} {'OK' if 120<=len(m)<=160 else 'CHECK'} | {tt}")

import csv as _csv
with open(os.path.join(out, "meta-tags-p1.csv"), "w", encoding="utf-8-sig", newline="") as f:
    w = _csv.writer(f); w.writerow(["page_id", "title_template", "title_len_nov2026", "meta_description", "meta_len"])
    for k, (t, m) in T.items():
        w.writerow([k, t, len(t.replace("{Mon YYYY}", "Nov 2026")), m, len(m)])
