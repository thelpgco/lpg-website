"""Builds data/pages.json: the page registry the website reads.

  path -> { id, type, phase, status, built, lastmod }

status:  draft -> review -> approved -> published     (Method Step 22.3: publication gate = checks + human approval)
Only 'published' pages are indexable and listed in the sitemap. Existing statuses and lastmod values are PRESERVED
when this script is re-run, so it is safe to run again after the page map changes.

'built' is derived from the app/ folder. 'lastmod' must be set by a person when the page content really changes.

Run:  python docs/seo-plan/scripts/20_build_page_registry.py
"""
import json
import os

import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
APP = os.path.join(SITE, "app")
OUT = os.path.join(SITE, "data", "pages.json")

pm = pd.read_csv(os.path.join(HERE, "..", "page-map.csv"))
net = json.load(open(os.path.join(SITE, "data", "network.json"), encoding="utf-8"))

hub_slugs = {c["slug"] for c in net["cities"] if c.get("hub")} | set(net["provinces"].keys())
service_slugs = set()
txt = open(os.path.join(SITE, "lib", "services.ts"), encoding="utf-8").read()
import re
service_slugs = set(re.findall(r'slug:\s*"([a-z0-9\-]+)"', txt))


def built(url: str) -> bool:
    if url == "/":
        return os.path.exists(os.path.join(APP, "page.tsx"))
    seg = url.strip("/")
    if os.path.exists(os.path.join(APP, *seg.split("/"), "page.tsx")):
        return True
    if seg.startswith("lpg-in-") and seg[len("lpg-in-"):] in hub_slugs:
        return True
    if seg.startswith("services/") and seg.split("/", 1)[1] in service_slugs:
        return True
    if seg.startswith("lpg-price-in-pakistan/") and seg.split("/", 1)[1] in {"karachi", "lahore"}:
        return True
    return False


old = {}
if os.path.exists(OUT):
    old = json.load(open(OUT, encoding="utf-8-sig"))

reg = {}
for r in pm.itertuples():
    if r.phase == "MERGED":
        continue
    b = built(r.url)
    prev = old.get(r.url, {})
    status = prev.get("status") or ("review" if b else "draft")
    if b and status == "draft":
        status = "review"         # a page that now exists is ready for review
    if not b:
        status = "draft"          # an unbuilt page can never be above draft
    reg[r.url] = {"id": r.page_id, "type": r.type, "phase": r.phase, "status": status, "built": b,
                  **({"lastmod": prev["lastmod"]} if prev.get("lastmod") else {})}

# built pages that are not in the page map (should be none: every page needs a cluster and an owner)
orphans = []
for slug in sorted(hub_slugs):
    u = f"/lpg-in-{slug}/"
    if u not in reg:
        orphans.append(u)
for u in orphans:
    prev = old.get(u, {})
    reg[u] = {"id": "UNMAPPED", "type": "LC", "phase": "P2", "status": prev.get("status", "review"), "built": True}

with open(OUT, "w", encoding="utf-8", newline="\n") as f:       # UTF-8 without BOM
    json.dump(dict(sorted(reg.items())), f, indent=2, ensure_ascii=False)
    f.write("\n")

n_built = sum(1 for v in reg.values() if v["built"])
print(f"registry: {len(reg)} pages | built {n_built} | statuses {pd.Series([v['status'] for v in reg.values()]).value_counts().to_dict()}")
print("built pages with no page-map row:", orphans or "none")
