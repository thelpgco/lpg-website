"""Writes docs/seo-plan/meta-tags.csv from what the RUNNING site renders (audit/site-audit.csv), so the
document can never drift from the shipped titles and descriptions (data/meta.json + hub templates).
Run 18_site_audit.py first. Replaces the stale meta-tags-p1.csv."""
from pathlib import Path
import pandas as pd

SEO = Path(__file__).resolve().parent.parent
a = pd.read_csv(SEO / "audit" / "site-audit.csv")
if "meta_description" not in a.columns:
    raise SystemExit("re-run 18_site_audit.py first (needs the meta_description column)")
pm = pd.read_csv(SEO / "page-map.csv")
kw = dict(zip(pm.page_id, pm.primary_keyword)) if "primary_keyword" in pm.columns else {}
a = a[a.status == 200]  # unbuilt pages (404) have no tags yet
out = a[["page_id", "url", "title", "title_len", "meta_description", "meta_len", "h1", "indexable"]].copy()
out["primary_keyword"] = out.page_id.map(kw)
out["title_ok_50_60"] = out.title_len.between(50, 60)
out["meta_ok_140_160"] = out.meta_len.between(140, 160)
STOP = {"in", "of", "to", "the", "a", "me", "for", "near"}
out["title"] = out.title.fillna("")
out["title_has_primary"] = [
    isinstance(k, str) and all(w in t.lower() for w in k.lower().replace("-", " ").split() if w not in STOP)
    for k, t in zip(out.primary_keyword, out.title)
]
out.to_csv(SEO / "meta-tags.csv", index=False, encoding="utf-8")
print(f"{len(out)} rows -> meta-tags.csv | title 50-60 ok {int(out.title_ok_50_60.sum())}/{len(out)} | meta 140-160 ok {int(out.meta_ok_140_160.sum())}/{len(out)}")
bad = out[~(out.title_ok_50_60 & out.meta_ok_140_160)]
if len(bad):
    print(bad[["url", "title_len", "meta_len"]].to_string(index=False))
