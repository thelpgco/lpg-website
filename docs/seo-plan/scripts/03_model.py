"""Click model. Floor = each distinct volume value counted once (Ubersuggest buckets close variants);
ceiling = raw sum of mapped keywords. CTR at #1 are ASSUMPTIONS, stated in the plan."""
import csv, os, collections
here = os.path.dirname(os.path.abspath(__file__)); out = os.path.dirname(here)
pm = list(csv.DictReader(open(os.path.join(out, "page-map.csv"), encoding="utf-8-sig")))

# assumed CTR when ranking #1 for the page's queries (zero-click, AI Overview, map pack already netted out)
CTR = {"Price": 0.22, "Cylinders": 0.28, "Delivery": 0.25, "Local": 0.10, "Market": 0.25, "Learn": 0.18,
       "Safety": 0.22, "Appliances": 0.22, "Auto": 0.20, "B2B": 0.22, "Home": 0.12,
       # v4 pillars. Locations blends the local pack and organic (ASSUMPTION). Trust and Urdu carry no mapped volume yet:
       # Urdu volume is added after the Keyword Planner Urdu export, so 0 here is "not measured", not "no demand".
       "Locations": 0.12, "Services": 0.15, "Industries": 0.15, "Shop": 0.20, "Trust": 0.0, "Urdu": 0.0}
tot = collections.defaultdict(lambda: [0, 0, 0.0, 0.0])
phase = collections.defaultdict(lambda: [0, 0, 0.0, 0.0])
pm = [p for p in pm if p["phase"] != "MERGED"]
for p in pm:
    f, c = int(p["volume_floor"]), int(p["volume_ceiling"])
    k = CTR[p["pillar"]]
    for d, key in ((tot, p["pillar"]), (phase, p["phase"])):
        d[key][0] += f; d[key][1] += c; d[key][2] += f * k; d[key][3] += c * k

print("By pillar (searches/month, then clicks/month at #1 on everything mapped)")
print(f"{'pillar':12s} {'floor':>7s} {'ceil':>7s} {'ctr':>5s} {'clk_lo':>7s} {'clk_hi':>7s}")
T = [0, 0, 0, 0]
for k, v in sorted(tot.items(), key=lambda kv: -kv[1][1]):
    print(f"{k:12s} {v[0]:7d} {v[1]:7d} {CTR[k]:5.2f} {v[2]:7.0f} {v[3]:7.0f}")
    for i in range(4): T[i] += v[i]
print(f"{'TOTAL':12s} {T[0]:7d} {T[1]:7d} {'':5s} {T[2]:7.0f} {T[3]:7.0f}")

print("\nBy phase (what each release wave unlocks at #1)")
cum = [0, 0, 0, 0]
for k in ("P1", "P2", "P3", "P4"):
    v = phase[k]
    for i in range(4): cum[i] += v[i]
    print(f"{k}: searches {v[0]:6d}-{v[1]:6d}  clicks@#1 {v[2]:6.0f}-{v[3]:6.0f}   | cumulative clicks {cum[2]:6.0f}-{cum[3]:6.0f}")

# top pages by mapped volume
print("\nTop pages by floor volume")
for p in sorted(pm, key=lambda p: -int(p["volume_floor"]))[:15]:
    print(f"  {p['page_id']} {p['url']:50s} floor {p['volume_floor']:>6s} ceil {p['volume_ceiling']:>6s}")

# rank-position realism: expected share of #1 clicks achieved by month (ASSUMPTION curve)
print("\nGap to 100K at saturation:", 100000 - T[3], "to", 100000 - T[2])
