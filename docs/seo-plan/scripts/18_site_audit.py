"""Site audit against the master reference (seo-LeadGEN.md): Steps 13.6, 13.7, 15.2, 15.3, 15.7, 17, 22.3, 25.2, 25.4.

Crawls the RUNNING site (default http://localhost:3100) and checks every page it can reach, plus every
URL in page-map.csv that should exist. Writes docs/seo-plan/audit/site-audit.md and site-audit.csv.

  cd lpg-website && npx next start -p 3100     (in another terminal)
  python docs/seo-plan/scripts/18_site_audit.py [base_url]

Heuristics are labelled. Word counts are INFORMATION, not targets (Step 13.3: no word-count targets).
"""
from __future__ import annotations

import csv
import json
import re
import sys
from collections import defaultdict
from itertools import combinations
from pathlib import Path
from urllib.parse import urljoin, urlparse

import pandas as pd
import requests
from bs4 import BeautifulSoup

HERE = Path(__file__).resolve().parent
SEO = HERE.parent
OUT = SEO / "audit"
OUT.mkdir(exist_ok=True)
BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3100").rstrip("/")

pagemap = pd.read_csv(SEO / "page-map.csv")
pm = {r.url: r for r in pagemap.itertuples()}
REG = json.loads((SEO.parent.parent / "data" / "pages.json").read_text(encoding="utf-8"))
GUIDES = {"/what-is-lpg/", "/lpg-safety/", "/what-to-do-if-you-smell-gas/"}   # must carry Article schema
LOCAL_BIZ_PAGES = {"/contact/", "/about/"}                                      # the only pages with LocalBusiness

# ---- crawl
seen: dict[str, dict] = {}
queue = ["/"] + [u for u in pagemap[pagemap.phase.isin(["P1"])].url.tolist()]
net = json.loads((SEO.parent.parent / "data" / "network.json").read_text(encoding="utf-8"))
queue += [f"/lpg-in-{c['slug']}/" for c in net["cities"] if c["hub"]]
queue += [f"/lpg-in-{s}/" for s in net["provinces"] if s != "islamabad"]
queue += ["/lpg-price-in-pakistan/karachi/", "/lpg-price-in-pakistan/lahore/", "/delivery-areas/", "/our-network/"]

while queue:
    path = queue.pop(0)
    if path in seen:
        continue
    r = requests.get(BASE + path, timeout=30, allow_redirects=False)
    rec = {"status": r.status_code, "html": r.text if r.status_code == 200 else ""}
    seen[path] = rec
    if r.status_code == 200:
        soup = BeautifulSoup(r.text, "html.parser")
        for a in soup.find_all("a", href=True):
            h = a["href"]
            if h.startswith("/") and not h.startswith("//") and not re.search(r"\.(png|jpg|ico|xml|txt)$", h):
                p = h.split("#")[0].split("?")[0]
                if p and p not in seen:
                    queue.append(p)

sm = requests.get(BASE + "/sitemap.xml", timeout=20).text
sitemap_urls = {urlparse(u).path for u in re.findall(r"<loc>([^<]+)</loc>", sm)}


def words(s: str) -> list[str]:
    return re.findall(r"[A-Za-z0-9']+", s)


def fk_grade(text: str) -> float:
    sents = max(1, len(re.findall(r"[.!?]+", text)))
    ws = words(text)
    syl = sum(max(1, len(re.findall(r"[aeiouy]+", w.lower()))) for w in ws)
    return round(0.39 * (len(ws) / sents) + 11.8 * (syl / max(1, len(ws))) - 15.59, 1)


def tokens(s: str) -> set[str]:
    """Token set for keyword-placement checks. '1 kg' == '1kg'; simple plural stemming; connector words ignored."""
    s = re.sub(r"(\d)\s+kg\b", r"\1kg", s, flags=re.I)
    stop = {"in", "of", "the", "a", "to", "for", "and", "pakistan", "today", "near", "is", "does", "do", "what", "are", "an", "with"}
    out = set()
    for w in words(s):
        w = w.lower()
        if w in stop:
            continue
        if len(w) > 3 and w.endswith("s") and not w.endswith("ss"):
            w = w[:-1]
        out.add(w)
    return out


rows, issues = [], []
inbound: dict[str, set[str]] = defaultdict(set)
outbound: dict[str, set[str]] = defaultdict(set)
texts: dict[str, str] = {}

for path, rec in seen.items():
    if rec["status"] != 200:
        continue
    soup = BeautifulSoup(rec["html"], "html.parser")
    article = soup.find("article") or soup.find("main")
    for a in (article or soup).find_all("a", href=True):
        h = a["href"].split("#")[0].split("?")[0]
        if h.startswith("/") and h != path:
            inbound[h].add(path)
            outbound[path].add(h)
    texts[path] = re.sub(r"\s+", " ", article.get_text(" ", strip=True)) if article else ""

for path, rec in sorted(seen.items()):
    pg = pm.get(path)
    row = {"url": path, "page_id": getattr(pg, "page_id", ""), "status": rec["status"]}
    if rec["status"] != 200:
        row["problems"] = f"HTTP {rec['status']}"
        rows.append(row)
        if path in pm and pm[path].phase == "P1":
            issues.append((path, "info", "P1 page in page-map is not built (status %s)" % rec["status"]))
        continue
    soup = BeautifulSoup(rec["html"], "html.parser")
    probs = []
    title = (soup.title.string or "").strip() if soup.title else ""
    # (registry invariants are evaluated right after `indexable` is known)
    md = soup.find("meta", attrs={"name": "description"})
    md = (md.get("content") or "").strip() if md else ""
    robots = soup.find("meta", attrs={"name": "robots"})
    robots = robots.get("content") if robots else ""
    canon = soup.find("link", rel="canonical")
    canon = canon.get("href") if canon else ""
    h1s = soup.find_all("h1")
    body = texts[path]
    first100 = " ".join(body.split()[:100])
    indexable = "noindex" not in (robots or "")
    reg_entry = REG.get(path, {})
    built_and_reviewable = reg_entry.get("status") in ("review", "approved", "published")
    # registry invariants (Step 22.3): only 'published' pages may be indexable or listed
    if indexable and reg_entry.get("status") != "published":
        probs.append(f"indexable but registry status is {reg_entry.get('status')!r}")
    if path in sitemap_urls and reg_entry.get("status") != "published":
        probs.append("in sitemap but not published")
    if not reg_entry and path in pm:
        probs.append("built page missing from data/pages.json")

    if not 50 <= len(title) <= 60:
        probs.append(f"title length {len(title)} (want 50-60)")
    if not 140 <= len(md) <= 160:
        probs.append(f"meta length {len(md)} (want 140-160)")
    if len(h1s) != 1:
        probs.append(f"{len(h1s)} H1s")
    if not canon.endswith(path):
        probs.append(f"canonical {canon!r} != path")
    # heading order
    levels = [int(h.name[1]) for h in soup.find_all(re.compile(r"^h[1-6]$"))]
    if any(b - a > 1 for a, b in zip(levels, levels[1:])):
        probs.append("heading level skipped")
    # primary keyword placement
    if pg is not None and isinstance(pg.primary_keyword, str):
        kt = tokens(pg.primary_keyword)
        h1t = h1s[0].get_text(" ", strip=True) if h1s else ""
        missing = []
        for label, txt in (("title", title), ("H1", h1t), ("first 100 words", first100), ("meta", md)):
            if kt and not kt <= tokens(txt):
                missing.append(label)
        if missing:
            probs.append(f"primary '{pg.primary_keyword}' not fully in: {', '.join(missing)}")
    # images
    imgs = soup.find_all("img")
    noalt = [i for i in imgs if not i.get("alt")]
    if noalt:
        probs.append(f"{len(noalt)} images without alt")
    # schema
    types, schema_probs = [], []
    for s in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(s.string or "")
        except Exception:
            schema_probs.append("invalid JSON-LD")
            continue
        for node in data if isinstance(data, list) else [data]:
            t = node.get("@type")
            types.append(t)
            if "priceRange" in node:
                schema_probs.append("priceRange present (not a verified fact)")
            if t == "FAQPage":
                visible = body.lower()
                for q in node.get("mainEntity", []):
                    if q["name"].lower()[:40] not in visible:
                        schema_probs.append("FAQ question not visible on page")
    probs += schema_probs
    if "Organization" not in types:
        probs.append("schema: no Organization")
    if "LocalBusiness" in types and path not in LOCAL_BIZ_PAGES:
        probs.append("schema: LocalBusiness outside /contact/ and /about/")
    if path in LOCAL_BIZ_PAGES and "LocalBusiness" not in types:
        probs.append("schema: LocalBusiness missing on a page with the real office")
    if path in GUIDES and "Article" not in types:
        probs.append("schema: guide page has no Article")
    if "BreadcrumbList" not in types and path != "/":
        probs.append("schema: no BreadcrumbList")
    # keyword in at least one subheading (Step 13.7 placement)
    if pg is not None and isinstance(pg.primary_keyword, str) and pg.primary_keyword.strip():
        kt2 = tokens(pg.primary_keyword)
        subs = [h.get_text(" ", strip=True) for h in soup.find_all(["h2", "h3"])]
        if kt2 and subs and not any(len(kt2 & tokens(s)) >= max(1, len(kt2) - 1) for s in subs):
            issues.append((path, "watch", f"primary '{pg.primary_keyword}' appears in no H2/H3 (close variants are fine)"))
    # claims scan (claims register)
    for pat, why in [(r"within an hour|in an hour|60 minutes", "delivery-time claim"), (r"\bcheapest\b|\bbest price\b|\bfastest\b|lowest price", "superlative"),
                     (r"1000s|thousands of (dealers|distributors)", "network-size claim"), (r"\d+\s+years", "experience claim"), (r"guarantee", "guarantee"),
                     (r"\bAED\b|Dubai|UAE|emirate", "UAE leftover")]:
        if re.search(pat, body, re.I):
            probs.append(f"claims scan: {why}")
    # Golden rule 5: research stays internal. Competitor LPG marketers, tool names, working notes and the word 'keyword'
    # must not appear on a page (utility names such as SSGC/SNGPL/OGRA are legitimate subjects and are not listed).
    for pat, why in [(r"\bkeywords?\b", "the word 'keyword'"), (r"\bcylin\.com|\bcylin\b(?!d)|pearl gas|\bppgl\b|noor lpg|burhan|burshane|friends[- ]gas|gasonline|flamora|sui-gas\.pk", "competitor name"),
                     (r"serper|ubersuggest|ahrefs|semrush|\bserp\b|\bintel\.db\b", "research tool name"),
                     (r"NEEDS FACT|\bTODO\b|\bTBD\b|lorem ipsum|placeholder|\[\s*[A-Z ]{6,}\s*\]", "unfinished marker"),
                     (r"#1\b|number one|\btrusted by\b|happy customers|customers served|orders delivered|5[- ]star|rated \d", "unproven social proof")]:
        m = re.search(pat, body, re.I)
        if m:
            probs.append(f"research/claims leak ({why}): '{m.group(0)}'")
    wc = len(words(body))
    inn = len(inbound.get(path, set()))
    if path != "/" and inn < 2 and built_and_reviewable:
        probs.append(f"only {inn} body-link(s) in (want 2-5)")
    if inn > 12:
        issues.append((path, "watch", f"{inn} pages link to this one: check they are all relevant"))
    if indexable != (path in sitemap_urls):
        probs.append(f"indexable={indexable} but in_sitemap={path in sitemap_urls}")
    fk = fk_grade(body)
    if fk > 12:
        issues.append((path, "watch", f"reading grade {fk} (plain-language target: about 8-10; heuristic)"))
    row.update({"title": title, "title_len": len(title), "meta_len": len(md), "meta_description": md, "h1": h1s[0].get_text(" ", strip=True) if h1s else "",
                "indexable": indexable, "in_sitemap": path in sitemap_urls, "words": wc, "fk_grade": fk_grade(body),
                "inbound_body_links": inn, "schema": ",".join(str(t) for t in types), "problems": "; ".join(probs)})
    rows.append(row)
    for p in probs:
        issues.append((path, "fix", p))

# duplicates
titles = defaultdict(list)
metas = defaultdict(list)
for r in rows:
    if r.get("title"):
        titles[r["title"]].append(r["url"])
for t, us in titles.items():
    if len(us) > 1:
        issues.append((", ".join(us), "fix", f"duplicate title: {t}"))

# sibling similarity (5-word shingles, Jaccard); heuristic threshold 0.8 from Step 13.3
def shingles(t: str, n=5):
    w = t.lower().split()
    return {" ".join(w[i : i + n]) for i in range(max(0, len(w) - n + 1))}

groups = defaultdict(list)
for p in texts:
    if p.startswith("/lpg-in-"):
        groups["city/province hubs"].append(p)
    elif p.startswith("/services/") and p != "/services/":
        groups["service pages"].append(p)
    elif "price" in p:
        groups["price pages"].append(p)
sim_rows = []
for g, ps in groups.items():
    for a, b in combinations(ps, 2):
        sa, sb = shingles(texts[a]), shingles(texts[b])
        if sa and sb:
            j = len(sa & sb) / len(sa | sb)
            sim_rows.append((g, a, b, round(j, 2)))
            if j >= 0.5:
                issues.append((f"{a} vs {b}", "fix" if j >= 0.8 else "watch", f"text similarity {j:.2f} ({g}; threshold 0.8)"))

# page-map coverage
unbuilt = [(r.page_id, r.url, r.phase) for r in pagemap.itertuples() if r.phase == "P1" and (seen.get(r.url, {}).get("status") != 200)]

df = pd.DataFrame(rows)
df.to_csv(OUT / "site-audit.csv", index=False)
# link graph (article links only) for the page briefs
(OUT / "links.json").write_text(
    json.dumps({p: {"in": sorted(inbound.get(p, [])), "out": sorted(outbound.get(p, []))} for p in seen}, indent=1), encoding="utf-8")

fix = [i for i in issues if i[1] == "fix"]
lines = ["# Site audit (reference: seo-LeadGEN.md)", "", f"Base: {BASE} · pages crawled: {len(rows)} · indexable: {int(df.get('indexable', pd.Series([False])).sum())} · in sitemap: {len(sitemap_urls)}", "",
         f"**Problems to fix: {len(fix)}**", ""]
by = defaultdict(list)
for u, k, m in issues:
    by[m.split(" (")[0] if k != "fix" else m].append(u)
lines += ["| Severity | Page(s) | Finding |", "|---|---|---|"]
for u, k, m in issues:
    lines.append(f"| {k} | {u[:90]} | {m} |")
lines += ["", "## P1 pages in page-map.csv that are not built", ""] + [f"- {a} {b} ({c})" for a, b, c in unbuilt]
lines += ["", "## Word count and reading grade (information only)", "", "| URL | Words | FK grade | Inbound body links | Schema |", "|---|---:|---:|---:|---|"]
for r in rows:
    if r.get("words") is not None and r["status"] == 200:
        lines.append(f"| {r['url']} | {r['words']} | {r['fk_grade']} | {r['inbound_body_links']} | {r['schema']} |")
(OUT / "site-audit.md").write_text("\n".join(lines), encoding="utf-8")
print("\n".join(lines[:6]))
print("\nFIX items:", len(fix))
for u, k, m in fix:
    print(f"- {u[:70]} :: {m}")
print("\nUnbuilt P1:", unbuilt)
