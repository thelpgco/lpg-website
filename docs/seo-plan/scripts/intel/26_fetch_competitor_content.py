"""Fetch useful competitor pages and save clean text by topic for CONTENT RESEARCH.

Reads:  docs/seo-plan/intel/competitor-urls/sorted/ALL_useful.csv
Writes: lpg-website/content-research/competitors/
  README.md                 how to use (analysis only — never copy)
  INDEX.md
  ALL_PAGES.csv
  by-category/<cat>/_TOPIC_ANGLES.md   headings across sites = coverage checklist
  by-category/<cat>/<nn>_<domain>__<slug>.md
  by-domain/<domain>/...

Uses intel.db when a page already has enough text (>= MIN_WORDS). Otherwise fetches
HTML (robots.txt obeyed, delay between requests). Optional Playwright for JS shells
when --render is set and playwright is installed.

This material is for reading and planning. Our published pages are written fresh from
our own facts table. Competitor text must never be pasted into the site.
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
import time
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

from bs4 import BeautifulSoup

from common import connect, domain_of
from crawl import SKIP_EXT, SKIP_PATH, SESSION, extract, normalise, robots_for

ROOT = Path(__file__).resolve().parents[4]  # lpg-website/
USEFUL = Path(__file__).resolve().parents[2] / "intel" / "competitor-urls" / "sorted" / "ALL_useful.csv"
OUT = ROOT / "content-research" / "competitors"
MIN_WORDS = 60
DELAY = 1.2

LABELS = {
    "urdu": "Urdu / Roman Urdu",
    "price": "Price / rate / OGRA",
    "tools": "Tools / calculators",
    "safety": "Safety",
    "cylinders": "Cylinders",
    "appliances": "Appliances",
    "cities": "Cities / coverage",
    "delivery": "Delivery / order",
    "commercial": "Commercial / industrial",
    "auto": "Auto LPG",
    "services": "Engineering / services",
    "dealers": "Dealers / network",
    "guides": "Guides / blog",
    "company": "Company / trust",
    "other": "Other",
}


def slug_of(url: str) -> str:
    p = urlparse(url).path.strip("/") or "home"
    s = re.sub(r"[^a-zA-Z0-9]+", "-", p).strip("-").lower()
    return (s or "home")[:80]


def file_stem(domain: str, url: str) -> str:
    return f"{domain.replace('.', '-')}__{slug_of(url)}"


def lookup_db(con, url: str):
    u = url.rstrip("/")
    return con.execute(
        "select url, title, h1, h2s, word_count, text, needs_js, status, fetched_at "
        "from pages where rtrim(url, '/') = ?",
        (u,),
    ).fetchone()


def fetch_html(url: str, rp) -> tuple[int, str, str]:
    if rp and not rp.can_fetch("TheLPGCoResearchBot/1.0", url):
        return 0, "", "robots_blocked"
    try:
        r = SESSION.get(url, timeout=25, allow_redirects=True)
    except Exception as e:
        return 0, "", type(e).__name__
    ctype = r.headers.get("content-type", "")
    if r.status_code != 200 or "html" not in ctype:
        return r.status_code, "", f"status_{r.status_code}"
    return r.status_code, r.text, "ok"


class Browser:
    """One Chromium for the whole run (opening a browser per URL was too slow)."""

    def __init__(self):
        self._pw = None
        self._browser = None
        self._page = None

    def start(self):
        from playwright.sync_api import sync_playwright
        self._pw = sync_playwright().start()
        self._browser = self._pw.chromium.launch(headless=True)
        self._page = self._browser.new_page(user_agent="TheLPGCoResearchBot/1.0 (+https://thelpgco.pk)")

    def get(self, url: str) -> tuple[int, str, str]:
        if self._page is None:
            return 0, "", "playwright_not_started"
        try:
            self._page.goto(url, wait_until="domcontentloaded", timeout=35000)
            self._page.wait_for_timeout(2000)
            return 200, self._page.content(), "rendered"
        except Exception as e:
            return 0, "", f"render_{type(e).__name__}"

    def close(self):
        try:
            if self._browser:
                self._browser.close()
            if self._pw:
                self._pw.stop()
        except Exception:
            pass


def bad_url(url: str) -> bool:
    # Broken sitemap leftovers with smart quotes or truncated hosts
    if any(ch in url for ch in ('"', "'", "\u201c", "\u201d", "\u2018", "\u2019")):
        return True
    if "https:/ppgl" in url or "http:/ppgl" in url:
        return True
    return False


def page_to_dict(url: str, domain: str, category: str, title, h1, h2s, text, word_count, needs_js, source: str):
    if isinstance(h2s, str):
        try:
            h2s = json.loads(h2s)
        except Exception:
            h2s = []
    return {
        "url": url,
        "domain": domain,
        "category": category,
        "title": title or "",
        "h1": h1 or "",
        "h2s": h2s or [],
        "text": (text or "").strip(),
        "word_count": int(word_count or 0),
        "needs_js": bool(needs_js),
        "source": source,
        "fetched_at": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
    }


def write_md(path: Path, d: dict, n: int):
    lines = [
        f"# Research note {n}: {d['title'] or d['h1'] or d['url']}",
        "",
        "> **Analysis only.** Do not copy this text onto thelpgco.pk. Use it to find angles, "
        "gaps and questions, then write from our own verified facts.",
        "",
        "| | |",
        "|---|---|",
        f"| Source | {d['url']} |",
        f"| Domain | {d['domain']} |",
        f"| Topic | {d['category']} — {LABELS.get(d['category'], d['category'])} |",
        f"| Words | {d['word_count']} |",
        f"| Captured | {d['fetched_at']} ({d['source']}) |",
        f"| JS shell? | {'yes — content may be incomplete' if d['needs_js'] or d['word_count'] < MIN_WORDS else 'no'} |",
        "",
        "## Title",
        "",
        d["title"] or "_(none)_",
        "",
        "## H1",
        "",
        d["h1"] or "_(none)_",
        "",
        "## Headings (H2)",
        "",
    ]
    if d["h2s"]:
        lines += [f"- {h}" for h in d["h2s"]]
    else:
        lines.append("_(none extracted)_")
    lines += ["", "## Body text", ""]
    if d["text"]:
        # keep readable paragraphs
        paras = re.split(r"\n{2,}|(?<=[.!?])\s{2,}", d["text"])
        body = d["text"]
        # write as wrapped blocks of ~500 chars for readability if one blob
        if "\n" not in body:
            chunks = []
            words = body.split()
            buf = []
            for w in words:
                buf.append(w)
                if len(" ".join(buf)) > 480:
                    chunks.append(" ".join(buf))
                    buf = []
            if buf:
                chunks.append(" ".join(buf))
            lines += chunks
        else:
            lines.append(body)
    else:
        lines.append("_(no text extracted — page may need a browser render)_")
    lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")


def write_topic_angles(cat_dir: Path, cat: str, pages: list[dict]):
    h2c = Counter()
    entities = Counter()
    for p in pages:
        for h in p["h2s"]:
            h = re.sub(r"\s+", " ", h).strip()
            if 3 < len(h) < 100:
                h2c[h.lower()] += 1
        # crude entity tokens from title+h1+h2
        blob = " ".join([p["title"], p["h1"], *p["h2s"]]).lower()
        for tok in re.findall(
            r"\b(ogra|cylinder|composite|fibre|fiber|11\.?8|45\.?4|delivery|refill|safety|"
            r"regulator|karachi|lahore|islamabad|price|rate|dealer|distributor|pipeline|"
            r"industrial|commercial|stove|heater|geyser|urdu)\b",
            blob,
        ):
            entities[tok] += 1
    lines = [
        f"# Topic angles: {LABELS.get(cat, cat)}",
        "",
        f"{len(pages)} competitor pages in this group. Use the lists below as a **coverage checklist** "
        "when writing our page: every angle a searcher needs, answered with our own facts.",
        "",
        "## Pages in this group",
        "",
    ]
    for p in sorted(pages, key=lambda x: (-x["word_count"], x["domain"])):
        flag = " ⚠️ thin" if p["word_count"] < MIN_WORDS else ""
        lines.append(f"- [{p['domain']}] {p['title'] or p['h1'] or p['url']} ({p['word_count']}w){flag}")
        lines.append(f"  {p['url']}")
    lines += ["", "## Headings that appear across these pages", ""]
    if h2c:
        for h, n in h2c.most_common(40):
            lines.append(f"- ({n}) {h}")
    else:
        lines.append("_(few headings extracted — open the page files)_")
    lines += ["", "## Recurring topic words", "", ", ".join(f"{k} ({v})" for k, v in entities.most_common(25)) or "_(none)_", ""]
    lines += [
        "## How to write from this",
        "",
        "1. Read 2–3 of the strongest pages (highest word count) in this folder.",
        "2. Tick every heading above that a real customer would ask — that is your outline draft.",
        "3. Open our brief in `docs/seo-plan/briefs/` for this topic and fill the facts table.",
        "4. Write only from our facts. Add at least 3 things competitors do not have "
        "(our licence, measured delivery, dated OGRA table, real photo, local note).",
        "5. Never paste sentences from these files onto the site.",
        "",
    ]
    (cat_dir / "_TOPIC_ANGLES.md").write_text("\n".join(lines), encoding="utf-8")


def upsert_page(con, url, domain, status, needs_js, ex):
    h = hashlib.sha256(ex["text"].encode("utf-8")).hexdigest()
    con.execute(
        "insert or replace into pages (url,domain,status,fetched_at,needs_js,title,meta_description,h1,h2s,"
        "word_count,text,text_hash,canonical,schema_types,internal_links,content_type,discovered_from) "
        "values (?,?,?,datetime('now'),?,?,?,?,?,?,?,?,?,?,?,?,?)",
        (url, domain, status or 200, needs_js, ex["title"], ex["meta_description"], ex["h1"], ex["h2s"],
         ex["word_count"], ex["text"], h, ex["canonical"], ex["schema_types"],
         json.dumps(ex["links"][:200]), "other", "content_research"),
    )
    con.commit()


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--render", action="store_true", help="use Playwright for thin/JS pages")
    ap.add_argument("--delay", type=float, default=DELAY)
    ap.add_argument("--limit", type=int, default=0, help="optional cap for testing")
    ap.add_argument("--refetch", action="store_true", help="ignore DB cache and fetch everything")
    ap.add_argument("--only-thin", action="store_true",
                    help="skip URLs that already have >= MIN_WORDS in the DB (faster re-render pass)")
    a = ap.parse_args()

    rows = list(csv.DictReader(USEFUL.open(encoding="utf-8")))
    rows = [r for r in rows if not bad_url(r["url"])]
    if a.limit:
        rows = rows[: a.limit]
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "by-category").mkdir(exist_ok=True)
    (OUT / "by-domain").mkdir(exist_ok=True)

    con = connect()
    robots_cache: dict = {}
    saved: list[dict] = []
    stats = Counter()
    browser = None
    if a.render:
        try:
            browser = Browser()
            browser.start()
            print("Playwright browser started")
        except Exception as e:
            print(f"Playwright failed to start ({e}); continuing without render")
            browser = None

    try:
        for i, r in enumerate(rows, 1):
            url, domain, cat = r["url"], r["domain"], r["category"]
            print(f"[{i}/{len(rows)}] {cat} {url}", flush=True)
            d = None
            if not a.refetch:
                row = lookup_db(con, url)
                if row and (row[4] or 0) >= MIN_WORDS and row[5]:
                    d = page_to_dict(url, domain, cat, row[1], row[2], row[3], row[5], row[4], row[6], "db_cache")
                    stats["from_db"] += 1
                    if a.only_thin:
                        saved.append(d)
                        continue

            if d is None:
                if domain not in robots_cache:
                    robots_cache[domain] = robots_for(domain)[0]
                rp = robots_cache[domain]
                status, html, note = fetch_html(url, rp)
                time.sleep(a.delay)
                ex = None
                needs_js = 0
                if html:
                    ex = extract(html, url)
                    needs_js = int(ex["word_count"] < MIN_WORDS and len(html) > 2500)
                # Prefer browser render when asked, or when static HTML is a JS shell / empty
                if browser and (needs_js or not html or (ex and ex["word_count"] < MIN_WORDS)):
                    status2, html2, note2 = browser.get(url)
                    time.sleep(0.3)
                    if html2:
                        ex = extract(html2, url)
                        needs_js = int(ex["word_count"] < MIN_WORDS)
                        note = note2
                        status = status2
                        html = html2
                if ex:
                    d = page_to_dict(url, domain, cat, ex["title"], ex["h1"], json.loads(ex["h2s"]), ex["text"],
                                     ex["word_count"], needs_js, f"fetch:{note}")
                    stats["fetched"] += 1
                    try:
                        upsert_page(con, url, domain, status, needs_js, ex)
                    except Exception as e:
                        print(f"  db upsert skip: {e}", flush=True)
                    print(f"  -> {d['word_count']}w ({note})", flush=True)
                else:
                    d = page_to_dict(url, domain, cat, "", "", "[]", "", 0, True, f"fail:{note}")
                    stats["failed"] += 1
                    print(f"  -> FAIL {note}", flush=True)

            if d["word_count"] < MIN_WORDS:
                stats["thin"] += 1
            saved.append(d)
    finally:
        if browser:
            browser.close()

    # write files grouped by category (wipe previous trees so renumbered files don't leave orphans)
    import shutil
    for sub in ("by-category", "by-domain"):
        p = OUT / sub
        if p.exists():
            shutil.rmtree(p)
        p.mkdir(parents=True, exist_ok=True)

    by_cat: dict[str, list[dict]] = defaultdict(list)
    for d in saved:
        by_cat[d["category"]].append(d)

    index_rows = []
    for cat, pages in sorted(by_cat.items(), key=lambda kv: -len(kv[1])):
        cat_dir = OUT / "by-category" / cat
        cat_dir.mkdir(parents=True, exist_ok=True)
        pages_sorted = sorted(pages, key=lambda x: (-x["word_count"], x["domain"], x["url"]))
        for n, d in enumerate(pages_sorted, 1):
            stem = f"{n:02d}_{file_stem(d['domain'], d['url'])}"
            md = cat_dir / f"{stem}.md"
            write_md(md, d, n)
            # also by domain
            dom_dir = OUT / "by-domain" / d["domain"] / cat
            dom_dir.mkdir(parents=True, exist_ok=True)
            write_md(dom_dir / f"{stem}.md", d, n)
            index_rows.append({
                "category": cat,
                "domain": d["domain"],
                "url": d["url"],
                "title": d["title"],
                "word_count": d["word_count"],
                "source": d["source"],
                "file": f"by-category/{cat}/{stem}.md",
            })
        write_topic_angles(cat_dir, cat, pages_sorted)

    with (OUT / "ALL_PAGES.csv").open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["category", "domain", "url", "title", "word_count", "source", "file"])
        w.writeheader()
        w.writerows(index_rows)

    # INDEX
    lines = [
        "# Competitor content research library",
        "",
        f"Generated: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')} · "
        f"**{len(saved)}** pages · from_db={stats['from_db']} fetched={stats['fetched']} "
        f"thin={stats['thin']} failed={stats['failed']}",
        "",
        "> For writing research only. Do not republish. See README.md.",
        "",
        "## By topic",
        "",
        "| Topic | Pages | Median words | Open |",
        "|---|---:|---:|---|",
    ]
    for cat, pages in sorted(by_cat.items(), key=lambda kv: -len(kv[1])):
        words = sorted(p["word_count"] for p in pages)
        med = words[len(words) // 2] if words else 0
        lines.append(
            f"| {LABELS.get(cat, cat)} | {len(pages)} | {med} | "
            f"[folder](by-category/{cat}/) · [angles](by-category/{cat}/_TOPIC_ANGLES.md) |"
        )
    lines += [
        "",
        "## How to use for a page",
        "",
        "1. Open the matching `by-category/<topic>/_TOPIC_ANGLES.md`.",
        "2. Read the strongest 2–3 page files in that folder.",
        "3. Open our brief in `docs/seo-plan/briefs/`.",
        "4. Write from our facts; cover every angle the competitors cover, plus 3 of our own.",
        "",
    ]
    (OUT / "INDEX.md").write_text("\n".join(lines), encoding="utf-8")

    readme = """# Content research (competitors)

This folder holds **cleaned text from competitor pages**, grouped by topic.

## Rules

1. **Analysis only.** Read these files to see what angles a topic needs.
2. **Never copy** sentences, paragraphs or structure into thelpgco.pk.
3. Our live pages are written from the verified-facts table in each page brief
   (`docs/seo-plan/briefs/`).
4. Every commercial page must still add **3+ information-gain items** competitors do not have.

## Layout

- `by-category/<topic>/` — all competitor pages on that topic, strongest first
- `by-category/<topic>/_TOPIC_ANGLES.md` — heading checklist across sites
- `by-domain/<site>/` — same files grouped by competitor
- `ALL_PAGES.csv` — index

## Writing workflow

Topic → open `_TOPIC_ANGLES.md` → read 2–3 pages → fill our brief facts → draft → humanise → publish gate.
"""
    (OUT / "README.md").write_text(readme, encoding="utf-8")
    # also a short pointer at content-research root
    (OUT.parent / "README.md").write_text(
        "# Content research\n\nCompetitor page text for writing research lives in "
        "[competitors/](competitors/). Analysis only — never republish.\n",
        encoding="utf-8",
    )

    print(f"\nDone. {len(saved)} pages -> {OUT}")
    print(dict(stats))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
