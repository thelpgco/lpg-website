"""Discover and store every public page URL for the 8 owner-listed competitors.

Sources, in order:
  1. robots.txt Sitemap: lines and common sitemap paths
  2. URLs already in intel.pages (previous crawls)
  3. Competitor URLs that appeared in stored Serper results
  4. For sites with a thin sitemap (< 20 URLs): follow internal links from the home page
     (HTML only, robots.txt obeyed, capped)

Writes (UTF-8):
  docs/seo-plan/intel/competitor-urls/
    INDEX.md
    ALL.csv
    ALL.txt
    <domain>.txt          one URL per line
    <domain>.csv          url,source,lastmod

Does not re-fetch page bodies. Analysis-only; nothing is republished.
"""
from __future__ import annotations

import csv
import re
import time
from collections import deque
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse

from crawl import SKIP_EXT, SKIP_PATH, normalise, read_sitemap, robots_for, SESSION
from common import connect, domain_of

OUT = Path(__file__).resolve().parents[2] / "intel" / "competitor-urls"
OWNER = [
    "flamora.pk",
    "gasonline.pk",
    "noorlpg.com",
    "ppgl.com.pk",
    "friends-gas.pk",
    "bostanlpg.com",
    "cylin.com.pk",
    "paklpg.com",
]


def discover_sitemap(domain: str) -> dict[str, dict]:
    """url -> {source, lastmod}"""
    found: dict[str, dict] = {}
    rp, sitemaps = robots_for(domain)
    base = f"https://{domain}"
    smaps = list(sitemaps) if sitemaps else []
    for guess in (f"{base}/sitemap.xml", f"{base}/sitemap_index.xml", f"{base}/wp-sitemap.xml",
                  f"{base}/sitemap_index.xml.gz", f"{base}/page-sitemap.xml", f"{base}/post-sitemap.xml"):
        if guess not in smaps:
            smaps.append(guess)
    for sm in smaps:
        for u, lm in read_sitemap(sm):
            u = normalise(u)
            if domain_of(u) != domain:
                continue
            if SKIP_EXT.search(u) or SKIP_PATH.search(u):
                continue
            if rp and not rp.can_fetch("TheLPGCoResearchBot/1.0", u):
                continue
            found[u] = {"source": "sitemap", "lastmod": lm or ""}
    return found


def seed_from_db(con, domain: str) -> dict[str, dict]:
    out: dict[str, dict] = {}
    for (u,) in con.execute("select url from pages where domain=?", (domain,)):
        out[normalise(u)] = {"source": "crawl_db", "lastmod": ""}
    for (u,) in con.execute(
        "select distinct url from serp_results where kind='organic' and url like ?",
        (f"%{domain}%",),
    ):
        if domain_of(u) == domain:
            out.setdefault(normalise(u), {"source": "serp", "lastmod": ""})
    return out


def expand_links(domain: str, seeds: list[str], max_pages: int = 80, delay: float = 1.0) -> dict[str, dict]:
    """BFS a few pages when the sitemap is thin. Returns newly found URLs (not the seeds themselves)."""
    rp, _ = robots_for(domain)
    q: deque[str] = deque(seeds[:5] or [f"https://{domain}/"])
    seen: set[str] = set(q)
    found: dict[str, dict] = {}
    fetched = 0
    while q and fetched < max_pages:
        url = q.popleft()
        if SKIP_EXT.search(url) or SKIP_PATH.search(url):
            continue
        if rp and not rp.can_fetch("TheLPGCoResearchBot/1.0", url):
            continue
        try:
            r = SESSION.get(url, timeout=20, allow_redirects=True)
        except Exception:
            time.sleep(delay)
            continue
        time.sleep(delay)
        fetched += 1
        if r.status_code != 200 or "html" not in r.headers.get("content-type", ""):
            continue
        # light link extract (no BeautifulSoup dependency beyond what's already imported in crawl)
        from bs4 import BeautifulSoup
        soup = BeautifulSoup(r.text, "html.parser")
        for a in soup.find_all("a", href=True):
            href = normalise(urljoin(url, a["href"]))
            if domain_of(href) != domain:
                continue
            if SKIP_EXT.search(href) or SKIP_PATH.search(href):
                continue
            if href not in seen:
                seen.add(href)
                q.append(href)
                found[href] = {"source": "link_expand", "lastmod": ""}
    return found


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    con = connect()
    all_rows: list[dict] = []
    summary: list[tuple[str, int, dict[str, int]]] = []

    for domain in OWNER:
        print(f"\n== {domain}")
        urls: dict[str, dict] = {}
        sm = discover_sitemap(domain)
        print(f"  sitemap: {len(sm)}")
        for u, meta in sm.items():
            urls[u] = meta
        db = seed_from_db(con, domain)
        print(f"  from db/serp: {len(db)}")
        for u, meta in db.items():
            if u not in urls:
                urls[u] = meta
            elif urls[u]["source"] == "sitemap" and meta["source"] != "sitemap":
                pass  # keep sitemap as primary source
            else:
                # keep first source; note both via no overwrite
                pass
        if len(sm) < 20:
            print(f"  thin sitemap -> expanding links (up to 80 fetches)...")
            extra = expand_links(domain, list(urls)[:10] or [f"https://{domain}/"])
            print(f"  link-expand added: {len([u for u in extra if u not in urls])}")
            for u, meta in extra.items():
                urls.setdefault(u, meta)

        # drop non-http junk
        clean = {u: m for u, m in urls.items() if u.startswith("http") and domain_of(u) == domain}
        ordered = sorted(clean)
        # write per-domain files
        (OUT / f"{domain}.txt").write_text("\n".join(ordered) + ("\n" if ordered else ""), encoding="utf-8")
        with (OUT / f"{domain}.csv").open("w", encoding="utf-8", newline="") as f:
            w = csv.DictWriter(f, fieldnames=["url", "source", "lastmod"])
            w.writeheader()
            for u in ordered:
                row = {"url": u, "source": clean[u]["source"], "lastmod": clean[u].get("lastmod") or ""}
                w.writerow(row)
                all_rows.append({"domain": domain, **row})
        src_counts: dict[str, int] = {}
        for m in clean.values():
            src_counts[m["source"]] = src_counts.get(m["source"], 0) + 1
        summary.append((domain, len(ordered), src_counts))
        print(f"  total unique: {len(ordered)}  {src_counts}")

    with (OUT / "ALL.csv").open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["domain", "url", "source", "lastmod"])
        w.writeheader()
        w.writerows(all_rows)
    (OUT / "ALL.txt").write_text("\n".join(r["url"] for r in all_rows) + "\n", encoding="utf-8")

    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = [
        "# Competitor page URLs",
        "",
        f"Generated: {now}. Sources: sitemap, previous crawl DB, Serper results, and link-expand for thin sitemaps.",
        f"Total unique URLs across 8 sites: **{len(all_rows)}**.",
        "",
        "| Domain | URLs | Sources |",
        "|---|---:|---|",
    ]
    for domain, n, src in summary:
        lines.append(f"| [{domain}]({domain}.txt) | {n} | {', '.join(f'{k} {v}' for k,v in sorted(src.items()))} |")
    lines += ["", "Files: one `.txt` and `.csv` per domain, plus `ALL.txt` / `ALL.csv`."]
    (OUT / "INDEX.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"\nWrote {len(all_rows)} URLs -> {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
