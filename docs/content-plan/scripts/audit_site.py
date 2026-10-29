"""Full-site SEO audit of the prerendered build.

Usage (after `npx next build`):
    python -I docs/content-plan/scripts/audit_site.py .next/server/app

Checks every page for: title and description length and duplicates, canonical, robots, Open Graph, one H1,
JSON-LD validity and required/recommended fields per type, image alt text, broken internal links, links to
noindex pages, orphan pages (no inbound links from indexable pages), and banned wording.
"""
import json, os, re, sys
from collections import Counter, defaultdict
from html.parser import HTMLParser

ROOT = sys.argv[1]
SITE = "https://thelpgco.pk"
BANNED = [
    r"\bbest\b(?! (?:to|when|if|for your|practice))", r"#1\b", r"\bnumber one\b", r"\bleading\b", r"\bunmatched\b",
    r"\bcheapest\b", r"\bguaranteed?\b", r"\btrusted by\b", r"\bfastest\b", r"\bDEMO\b", r"\billustrative\b",
    r"network\.json", r"lpg data\.md", r"partners_master", r"by-city\.json", r"\bscrape", r"\bcompetitor",
]
# Schema rules: required (error) and recommended (warning) fields per @type.
RULES = {
    "Organization": (["name", "url"], ["logo", "address", "telephone"]),
    "LocalBusiness": (["name", "address"], ["telephone", "url", "image", "priceRange", "openingHoursSpecification", "geo"]),
    "WebSite": (["name", "url"], []),
    "BreadcrumbList": (["itemListElement"], []),
    "FAQPage": (["mainEntity"], []),
    "Article": (["headline"], ["author", "datePublished", "dateModified", "image"]),
    "Product": (["name"], ["offers", "image", "description", "brand"]),
    "Offer": (["price", "priceCurrency"], ["availability", "url"]),
    "Service": (["name"], ["provider", "areaServed", "description"]),
    "WebPage": (["name"], []),
    "ItemList": (["itemListElement"], []),
    "HowTo": (["name", "step"], []),
}


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""; self.in_title = False; self.meta = {}; self.links = []; self.canonical = None
        self.h1 = []; self.cur_h1 = None; self.imgs = []; self.ld = []; self.in_ld = False; self.ld_buf = ""
        self.lang = None; self.h_order = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html": self.lang = a.get("lang")
        if tag == "title": self.in_title = True
        if tag == "meta":
            k = a.get("name") or a.get("property")
            if k: self.meta[k] = a.get("content", "")
        if tag == "link" and a.get("rel") == "canonical": self.canonical = a.get("href")
        if tag == "a" and a.get("href"): self.links.append(a["href"])
        if tag in ("h1", "h2", "h3", "h4"): self.h_order.append(int(tag[1]))
        if tag == "h1": self.cur_h1 = ""
        if tag == "img": self.imgs.append(a)
        if tag == "script" and a.get("type") == "application/ld+json": self.in_ld = True; self.ld_buf = ""

    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False
        if tag == "h1" and self.cur_h1 is not None: self.h1.append(self.cur_h1.strip()); self.cur_h1 = None
        if tag == "script" and self.in_ld:
            self.in_ld = False; self.ld.append(self.ld_buf)

    def handle_data(self, d):
        if self.in_title: self.title += d
        if self.cur_h1 is not None: self.cur_h1 += d
        if self.in_ld: self.ld_buf += d


def text_of(html):
    html = re.sub(r"<(script|style|svg)[\s\S]*?</\1>", " ", html)
    m = re.search(r"<main[\s\S]*?</main>", html)
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", m.group(0) if m else html))


def nodes(obj):
    if isinstance(obj, list):
        for x in obj: yield from nodes(x)
    elif isinstance(obj, dict):
        if "@graph" in obj: yield from nodes(obj["@graph"])
        if "@type" in obj: yield obj
        for k, v in obj.items():
            if k != "@graph" and isinstance(v, (dict, list)): yield from nodes(v)


def main():
    pages = {}
    for dp, _, fs in os.walk(ROOT):
        for f in fs:
            if not f.endswith(".html"): continue
            rel = os.path.relpath(os.path.join(dp, f), ROOT).replace("\\", "/")[:-5]
            if rel.startswith("_"): continue
            url = "/" if rel == "index" else f"/{rel}/"
            if url.startswith("/lpg-hub/"): url = "/lpg-in-" + url[len("/lpg-hub/"):]
            html = open(os.path.join(dp, f), encoding="utf-8").read()
            p = Page(); p.feed(html); p.text = text_of(html)
            pages[url] = p

    manifest = json.load(open(os.path.join(ROOT, "..", "..", "routes-manifest.json"), encoding="utf-8"))
    redirects = [re.compile("^" + r["regex"].replace("(?:/)?$", "/?$")) if "regex" in r else None for r in manifest.get("redirects", [])]
    extra_ok = {"/sitemap.xml", "/robots.txt", "/logo.png", "/icon", "/opengraph-image", "/opengraph-image/"}
    public = set()
    for dp, _, fs in os.walk(os.path.join(ROOT, "..", "..", "..", "public")):
        for f in fs:
            public.add("/" + os.path.relpath(os.path.join(dp, f), os.path.join(ROOT, "..", "..", "..", "public")).replace("\\", "/"))

    indexable = {u for u, p in pages.items() if "noindex" not in p.meta.get("robots", "")}
    issues = defaultdict(list)
    inbound = Counter()
    titles = defaultdict(list); descs = defaultdict(list)
    schema_types = Counter()

    for url, p in sorted(pages.items()):
        idx = url in indexable
        t, d = p.title.strip(), p.meta.get("description", "")
        if idx:
            titles[t].append(url); descs[d].append(url)
            if not 30 <= len(t) <= 60: issues[url].append(f"title length {len(t)}: {t!r}")
            if not 120 <= len(d) <= 160: issues[url].append(f"description length {len(d)}")
            if p.canonical != SITE + url: issues[url].append(f"canonical {p.canonical} != {SITE + url}")
            for k in ("og:title", "og:description", "og:image", "og:url", "twitter:card"):
                if not p.meta.get(k): issues[url].append(f"missing {k}")
            if len(p.h1) != 1: issues[url].append(f"{len(p.h1)} H1 tags")
            if p.lang != "en-PK" and p.lang != "en": issues[url].append(f"html lang={p.lang}")
            jumps = [(a, b) for a, b in zip(p.h_order, p.h_order[1:]) if b > a + 1]
            if jumps: issues[url].append(f"heading level jump {jumps[0][0]}->{jumps[0][1]}")
            for pat in BANNED:
                m = re.search(pat, p.text, re.I)
                if m: issues[url].append(f"banned wording {m.group(0)!r}: …{p.text[max(0, m.start()-50):m.end()+40]}…")
        for img in p.imgs:
            if not (img.get("alt") or "").strip() and img.get("aria-hidden") != "true":
                issues[url].append(f"image without alt: {img.get('src', '')[:60]}")
        # JSON-LD
        has_breadcrumb = False
        for raw in p.ld:
            try:
                data = json.loads(raw)
            except Exception as e:
                issues[url].append(f"JSON-LD parse error: {e}"); continue
            for n in nodes(data):
                types = n["@type"] if isinstance(n["@type"], list) else [n["@type"]]
                for ty in types:
                    schema_types[ty] += 1
                    if ty == "BreadcrumbList": has_breadcrumb = True
                    req, rec = RULES.get(ty, ([], []))
                    for k in req:
                        if not n.get(k): issues[url].append(f"schema {ty}: missing required {k}")
                    if idx:
                        for k in rec:
                            if not n.get(k) and not (ty == "Organization" and "@id" in n and len(n) <= 3):
                                issues[url].append(f"schema {ty}: missing recommended {k}")
                    if ty == "FAQPage":
                        for q in n.get("mainEntity", []):
                            if not (q.get("acceptedAnswer") or {}).get("text"): issues[url].append("schema FAQ: question without answer")
                    if ty == "BreadcrumbList":
                        for i, it in enumerate(n.get("itemListElement", []), 1):
                            if it.get("position") != i or not it.get("name") or not it.get("item"):
                                issues[url].append(f"schema Breadcrumb item {i} incomplete"); break
        if idx and url != "/" and not has_breadcrumb: issues[url].append("no BreadcrumbList schema")
        # links
        for href in p.links:
            if href.startswith(("http://", "https://")):
                if href.startswith(SITE): href = href[len(SITE):] or "/"
                else: continue
            if href.startswith(("tel:", "mailto:", "#", "javascript:")) or not href.startswith("/"): continue
            path = href.split("#")[0].split("?")[0]
            if not path: continue
            norm = path if path.endswith("/") or "." in path.rsplit("/", 1)[-1] else path + "/"
            if norm in pages:
                if idx and norm != url: inbound[norm] += 1
                if idx and norm not in indexable: issues[url].append(f"links to noindex page {norm}")
                continue
            if norm in extra_ok or path in public or path.rstrip("/") in extra_ok: continue
            if any(r and (r.match(path) or r.match(norm)) for r in redirects):
                issues[url].append(f"links to a redirect {path}"); continue
            issues[url].append(f"broken internal link {href}")

    for t, us in titles.items():
        if len(us) > 1: [issues[u].append(f"duplicate title with {[x for x in us if x != u][:2]}") for u in us]
    for d, us in descs.items():
        if d and len(us) > 1: [issues[u].append(f"duplicate description with {[x for x in us if x != u][:2]}") for u in us]
    for u in indexable:
        if u != "/" and inbound[u] == 0: issues[u].append("orphan: no links from indexable pages")

    kinds = Counter()
    for u, lst in issues.items():
        for i in set(lst): kinds[re.sub(r"[:(].*", "", i).strip()] += 1
    print(f"pages {len(pages)}, indexable {len(indexable)}, pages with issues {sum(1 for u in issues if issues[u])}")
    print("schema types:", dict(schema_types))
    print("\nissue summary:")
    for k, v in kinds.most_common(): print(f"  {v:4d}  {k}")
    print("\nper page:")
    for u in sorted(issues):
        if issues[u]:
            print(u + ("" if u in indexable else "  [noindex]"))
            for i in dict.fromkeys(issues[u]): print("   -", i[:220])


if __name__ == "__main__":
    main()
