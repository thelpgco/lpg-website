"""Competitor crawler. Reads public pages for ANALYSIS ONLY (coverage gaps, structure, FAQs).
Nothing crawled is republished; our content is written fresh (see plan section 8).

Usage (from lpg-website/docs/seo-plan/scripts/intel):
  python crawl.py --owner-listed                 # the 8 sites the owner listed
  python crawl.py --domains cylin.com.pk noorlpg.com --max-pages 100
  python crawl.py --from-serp --per-domain 15    # competitor pages that rank in stored SERPs
  python crawl.py --owner-listed --dry-run       # discover URLs only, fetch nothing

Rules (plan section 6): obey robots.txt, identify ourselves, 1 request per `--delay` seconds per domain,
HTML only, cap pages per domain, skip login/cart/search/param URLs, store text + hash for change detection.
JS-only sites (cylin.com.pk, flamora.pk) are flagged needs_js when static HTML is empty; render them with
Playwright later (pip install playwright && playwright install chromium) via --render.
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
import sys
import time
import urllib.robotparser
import xml.etree.ElementTree as ET
from collections import deque
from urllib.parse import urldefrag, urljoin, urlparse

import requests
from bs4 import BeautifulSoup

from common import DATA_DIR, connect, domain_of

UA = "TheLPGCoResearchBot/1.0 (+https://thelpgco.pk; contact via site) analysis-only"
HEADERS = {"User-Agent": UA, "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.5"}
SKIP_EXT = re.compile(r"\.(jpe?g|png|gif|webp|svg|ico|pdf|docx?|xlsx?|zip|mp4|mp3|css|js|woff2?|ttf|xml|json)(\?|$)", re.I)
SKIP_PATH = re.compile(r"/(cart|checkout|login|signin|register|account|my-account|wp-admin|wp-json|feed|tag|author|search|cdn-cgi)(/|$)", re.I)
SESSION = requests.Session()
SESSION.headers.update(HEADERS)


def log(con, domain, url, event, detail=""):
    con.execute("insert into crawl_log (domain,url,event,detail) values (?,?,?,?)", (domain, url, event, str(detail)[:300]))


def normalise(url: str) -> str:
    url, _ = urldefrag(url)
    p = urlparse(url)
    if p.query and re.search(r"(utm_|fbclid|gclid|sessionid|replytocom)", p.query, re.I):
        url = url.split("?")[0]
    return url.rstrip("/") if p.path not in ("", "/") else f"{p.scheme}://{p.netloc}/"


def robots_for(domain: str) -> tuple[urllib.robotparser.RobotFileParser | None, list[str]]:
    rp = urllib.robotparser.RobotFileParser()
    sitemaps: list[str] = []
    for scheme in ("https", "http"):
        try:
            r = SESSION.get(f"{scheme}://{domain}/robots.txt", timeout=15)
            if r.status_code == 200 and "text" in r.headers.get("content-type", "text"):
                rp.parse(r.text.splitlines())
                sitemaps = [ln.split(":", 1)[1].strip() for ln in r.text.splitlines() if ln.lower().startswith("sitemap:")]
                return rp, sitemaps
            if r.status_code in (404, 410):
                return None, []
        except requests.RequestException:
            continue
    return None, []


def read_sitemap(url: str, depth=0, seen=None) -> list[tuple[str, str | None]]:
    seen = seen if seen is not None else set()
    if url in seen or depth > 3:
        return []
    seen.add(url)
    try:
        r = SESSION.get(url, timeout=20)
        if r.status_code != 200:
            return []
        root = ET.fromstring(r.content)
    except Exception:
        return []
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    out: list[tuple[str, str | None]] = []
    for sm in root.findall("s:sitemap", ns):
        loc = sm.findtext("s:loc", default="", namespaces=ns).strip()
        if loc:
            out += read_sitemap(loc, depth + 1, seen)
    for u in root.findall("s:url", ns):
        loc = u.findtext("s:loc", default="", namespaces=ns).strip()
        if loc:
            out.append((loc, u.findtext("s:lastmod", default=None, namespaces=ns)))
    return out


def classify_page(url: str, title: str, h1: str, words: int) -> str:
    s = f"{urlparse(url).path} {title} {h1}".lower()
    path = urlparse(url).path.strip("/")
    if path == "":
        return "home"
    rules = [
        ("price", r"price|rate|qeemat|qimat"),
        ("dealer_finder", r"distributor|dealer|find[- ]?(a[- ])?(dealer|distributor|store)|locat|branch|outlet"),
        ("blog", r"blog|news|article|/post|guide|how[- ]to|tips|what[- ]is|safety"),
        ("product", r"product|cylinder|stove|heater|regulator|burner|geyser|appliance|shop|store|category"),
        ("service", r"service|install|pipeline|bulk|industrial|commercial|engineering|supply|delivery"),
        ("city", r"karachi|lahore|islamabad|rawalpindi|peshawar|quetta|multan|faisalabad|hyderabad|gujranwala"),
        ("contact", r"contact"),
        ("about", r"about|company|who[- ]we|team|vision"),
        ("legal", r"privacy|terms|policy|refund|shipping|cookie"),
    ]
    for label, pat in rules:
        if re.search(pat, s):
            return label
    return "other"


def extract(html: str, url: str) -> dict:
    soup = BeautifulSoup(html, "html.parser")
    for t in soup(["script", "style", "noscript", "svg", "iframe"]):
        if t.name == "script" and t.get("type") == "application/ld+json":
            continue
        t.decompose()
    schema_types: list[str] = []
    for s in BeautifulSoup(html, "html.parser").find_all("script", type="application/ld+json"):
        try:
            data = json.loads(s.string or "")
            for node in data if isinstance(data, list) else [data]:
                for n in node.get("@graph", [node]) if isinstance(node, dict) else []:
                    t = n.get("@type")
                    schema_types += t if isinstance(t, list) else [t] if t else []
        except Exception:
            pass
    title = (soup.title.string or "").strip() if soup.title and soup.title.string else ""
    md = soup.find("meta", attrs={"name": re.compile("^description$", re.I)})
    canon = soup.find("link", rel="canonical")
    h1 = soup.find("h1")
    h2s = [h.get_text(" ", strip=True) for h in soup.find_all("h2")][:40]
    main = soup.find("main") or soup.find("article") or soup.body or soup
    for t in main(["nav", "footer", "header", "form"]):
        t.decompose()
    text = re.sub(r"\s+", " ", main.get_text(" ", strip=True))
    host = domain_of(url)
    links = []
    for a in BeautifulSoup(html, "html.parser").find_all("a", href=True):
        href = urljoin(url, a["href"])
        if domain_of(href) == host and href.startswith("http"):
            links.append(normalise(href))
    return {
        "title": title, "meta_description": (md.get("content", "").strip() if md else ""),
        "canonical": canon.get("href") if canon else "", "h1": h1.get_text(" ", strip=True) if h1 else "",
        "h2s": json.dumps(h2s, ensure_ascii=False), "text": text, "word_count": len(text.split()),
        "schema_types": ",".join(sorted(set(schema_types))), "links": sorted(set(links)),
    }


def crawl_domain(con, domain: str, max_pages: int, delay: float, dry: bool, seeds: list[str] | None = None) -> int:
    print(f"\n== {domain}")
    rp, sitemaps = robots_for(domain)
    base = f"https://{domain}"
    lastmod: dict[str, str | None] = {}
    queue: deque[tuple[str, str]] = deque()
    seen: set[str] = set()

    smaps = sitemaps or [f"{base}/sitemap.xml", f"{base}/sitemap_index.xml", f"{base}/wp-sitemap.xml"]
    for sm in smaps:
        for u, lm in read_sitemap(sm):
            u = normalise(u)
            lastmod[u] = lm
            if u not in seen:
                seen.add(u)
                queue.append((u, "sitemap"))
    print(f"  sitemap URLs: {len(queue)}")
    for s in seeds or []:
        s = normalise(s)
        if s not in seen:
            seen.add(s)
            queue.appendleft((s, "serp"))
    home = normalise(base)
    if home not in seen:
        seen.add(home)
        queue.appendleft((home, "home"))

    fetched = 0
    while queue and fetched < max_pages:
        url, src = queue.popleft()
        if SKIP_EXT.search(url) or SKIP_PATH.search(url) or domain_of(url) != domain:
            continue
        if rp and not rp.can_fetch(UA, url):
            log(con, domain, url, "robots_blocked")
            continue
        if dry:
            fetched += 1
            continue
        try:
            r = SESSION.get(url, timeout=25, allow_redirects=True)
        except requests.RequestException as e:
            log(con, domain, url, "error", type(e).__name__)
            time.sleep(delay)
            continue
        time.sleep(delay)
        ctype = r.headers.get("content-type", "")
        if r.status_code != 200 or "html" not in ctype or len(r.content) > 3_000_000:
            con.execute("insert or replace into pages (url,domain,status,fetched_at,content_type,discovered_from) values (?,?,?,datetime('now'),?,?)",
                        (url, domain, r.status_code, "non-html" if "html" not in ctype else "error", src))
            con.commit()
            continue
        d = extract(r.text, r.url)
        h = hashlib.sha256(d["text"].encode("utf-8")).hexdigest()
        needs_js = int(d["word_count"] < 60 and len(r.text) > 3000)
        old = con.execute("select text_hash from pages where url=?", (url,)).fetchone()
        if old and old[0] == h:
            con.execute("update pages set fetched_at=datetime('now') where url=?", (url,))
        else:
            con.execute(
                "insert or replace into pages (url,domain,status,fetched_at,needs_js,title,meta_description,h1,h2s,word_count,text,text_hash,canonical,lastmod,schema_types,internal_links,content_type,discovered_from)"
                " values (?,?,?,datetime('now'),?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                (url, domain, r.status_code, needs_js, d["title"], d["meta_description"], d["h1"], d["h2s"],
                 d["word_count"], d["text"], h, d["canonical"], lastmod.get(url), d["schema_types"],
                 json.dumps(d["links"][:200]), classify_page(url, d["title"], d["h1"], d["word_count"]), src),
            )
        con.commit()
        fetched += 1
        for l in d["links"]:
            if l not in seen and not SKIP_EXT.search(l) and not SKIP_PATH.search(l):
                seen.add(l)
                queue.append((l, "link"))
        if fetched % 25 == 0:
            print(f"  fetched {fetched} (queue {len(queue)})")
    print(f"  done: {fetched} pages {'(dry run)' if dry else ''}; discovered but not fetched: {len(queue)}")
    return fetched


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--owner-listed", action="store_true")
    ap.add_argument("--domains", nargs="*")
    ap.add_argument("--from-serp", action="store_true", help="crawl competitor URLs seen in stored SERPs")
    ap.add_argument("--per-domain", type=int, default=15)
    ap.add_argument("--max-pages", type=int, default=300)
    ap.add_argument("--delay", type=float, default=2.0)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    con = connect()
    plan: dict[str, list[str]] = {}
    if a.owner_listed:
        for r in csv.DictReader((DATA_DIR / "competitors_v4.csv").open(encoding="utf-8-sig")):
            if r.get("owner_listed", "").strip().lower() == "yes":
                plan.setdefault(r["domain"].strip().lower(), [])
    for d in a.domains or []:
        plan.setdefault(d.lower(), [])
    if a.from_serp:
        rows = con.execute(
            "select domain,url,count(*) c from serp_results where kind='organic' and result_type='competitor' "
            "and url is not null group by domain,url order by c desc").fetchall()
        for dom, url, _ in rows:
            if len(plan.setdefault(dom, [])) < a.per_domain:
                plan[dom].append(url)
        if not (a.owner_listed or a.domains):
            a.max_pages = a.per_domain
    if not plan:
        ap.error("nothing to crawl: use --owner-listed, --domains or --from-serp")

    total = 0
    for dom, seeds in plan.items():
        try:
            total += crawl_domain(con, dom, a.max_pages, a.delay, a.dry_run, seeds)
        except KeyboardInterrupt:
            print("Interrupted; progress is saved.")
            break
        except Exception as e:  # keep going with other domains
            print(f"  ERROR on {dom}: {type(e).__name__}: {e}")
            log(con, dom, "", "domain_error", f"{type(e).__name__}: {e}")
    print(f"\nTotal pages processed: {total}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
