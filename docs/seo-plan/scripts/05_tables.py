import csv, os
here = os.path.dirname(os.path.abspath(__file__)); out = os.path.dirname(here)
km = list(csv.DictReader(open(os.path.join(out, "keyword-master.csv"), encoding="utf-8-sig")))
pm = {p["page_id"]: p for p in csv.DictReader(open(os.path.join(out, "page-map.csv"), encoding="utf-8-sig"))}
tg = [k for k in km if k["disposition"] == "TARGET"]
tg.sort(key=lambda k: -int(k["volume"]))
print("| # | Keyword | Volume | SD | Intent (tool) | Page |")
print("|---|---|---:|---:|---|---|")
for i, k in enumerate(tg[:40], 1):
    print(f"| {i} | {k['keyword']} | {int(k['volume']):,} | {k['seo_difficulty']} | {k['intent'] or '-'} | {k['target_page']} |")
print()
print("| Page | URL | Primary keyword (vol) | Keywords mapped | Searches floor-ceiling |")
print("|---|---|---|---:|---:|")
for pid, p in pm.items():
    if p["phase"] == "P1":
        pk = f"{p['primary_keyword']} ({int(p['primary_volume']):,})" if p["primary_keyword"] else "seed in Ahrefs/Semrush"
        print(f"| {pid} | `{p['url']}` | {pk} | {p['keywords_mapped']} | {int(p['volume_floor']):,}-{int(p['volume_ceiling']):,} |")
