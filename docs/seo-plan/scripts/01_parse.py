import csv, json, sys
base = r"D:\SparePartsHub-App\lpg-website\keywords and research"

f1 = []
with open(base + r"\ubersuggest lpg.csv", encoding="utf-8-sig", newline="") as fh:
    for r in csv.DictReader(fh):
        f1.append(dict(kw=r["Keyword"].strip().lower(), vol=int(r["Volume"] or 0), cpc=float(r["CPC"] or 0), sd=int(r["SEO Difficulty"] or 0), intent=""))

f2 = []
with open(base + r"\ubersuggest lpg (1).csv", encoding="utf-8-sig", newline="") as fh:
    for r in csv.DictReader(fh):
        cpc = r["CPC"].replace("\u20a8", "").replace(",", "").strip() or "0"
        f2.append(dict(kw=r["Keyword"].strip().lower(), vol=int(r["Search Volume"] or 0), cpc=float(cpc),
                       sd=int(r["Search Difficulty"] or 0), intent=r["Search Intent"].strip()))

print("file1", len(f1), "file2", len(f2), file=sys.stderr)
merged = {}
for src, rows in (("f2", f2), ("f1", f1)):
    for r in rows:
        k = r["kw"]
        if k not in merged:
            merged[k] = dict(r, src=src)
        else:
            m = merged[k]
            if r["intent"] and not m["intent"]:
                m["intent"] = r["intent"]
            m["vol"] = max(m["vol"], r["vol"])
            m["src"] = "both"
json.dump(list(merged.values()), open(r"D:\SparePartsHub-App\lpg-website\docs\seo-plan\scripts\merged.json", "w", encoding="utf-8"), ensure_ascii=False)
print("merged unique", len(merged), file=sys.stderr)
print("in f1 not f2:", len({r['kw'] for r in f1} - {r['kw'] for r in f2}), file=sys.stderr)
print("zero-vol:", sum(1 for r in merged.values() if r['vol']==0), file=sys.stderr)
print("total vol (sum, not additive):", sum(r['vol'] for r in merged.values()), file=sys.stderr)

