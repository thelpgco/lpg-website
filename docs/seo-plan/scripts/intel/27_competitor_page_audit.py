"""Content audit of the competitor pages that rank for our target keywords, side by side with our own pages.

Run:  python docs/seo-plan/scripts/intel/27_competitor_page_audit.py
Reads  docs/seo-plan/intel/keyword-rankings-<latest>/top-pages.csv (from 26_keyword_serp_rankings.py).
Writes to the same folder:
  page-audit.csv    one row per page: words, headings, tables, prices, dates, schema, FAQ, forms, images
  page-audit.json   the same plus every H2/H3 and table header, for reading the outlines
Analysis only: pages are fetched once, nothing is republished.
"""
from __future__ import annotations

import csv
import json
import re
from pathlib import Path

import requests
from bs4 import BeautifulSoup

from common import INTEL_DIR

SKIP_DOMAINS = {"facebook.com", "youtube.com", "google.com", "instagram.com", "tiktok.com", "x.com", "twitter.com",
                "play.google.com", "apps.apple.com", "yandex.com"}
OURS = [
    "https://thelpgco.pk/lpg-price-in-pakistan/", "https://thelpgco.pk/lpg-price-per-kg-in-pakistan/",
    "https://thelpgco.pk/lpg-cylinder-price-in-pakistan/", "https://thelpgco.pk/lpg-price-in-pakistan/history/",
    "https://thelpgco.pk/ogra-lpg-notified-price/", "https://thelpgco.pk/what-is-lpg/",
    "https://thelpgco.pk/lpg-cylinders/", "https://thelpgco.pk/lpg-near-me/", "https://thelpgco.pk/lpg-filling-stations/",
    "https://thelpgco.pk/lpg-price-in-pakistan/karachi/", "https://thelpgco.pk/lpg-in-islamabad/",
]
EXTRA = ["https://cylin.com.pk/coverage/islamabad", "https://friends-gas.pk/"]
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"}


def latest_dir() -> Path:
    return sorted(INTEL_DIR.glob("keyword-rankings-*"))[-1]


def audit(url: str) -> dict:
    out = {"url": url}
    try:
        r = requests.get(url, headers=UA, timeout=25)
    except requests.RequestException as e:
        return {**out, "status": f"error {type(e).__name__}"}
    out["status"] = r.status_code
    if r.status_code != 200 or "html" not in r.headers.get("content-type", ""):
        return out
    soup = BeautifulSoup(r.text, "html.parser")
    ld_types, faq_q, dates = [], 0, []
    for s in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(s.string or "")
        except (json.JSONDecodeError, TypeError):
            continue
        stack = data if isinstance(data, list) else [data]
        while stack:
            o = stack.pop()
            if isinstance(o, dict):
                t = o.get("@type")
                if t:
                    ld_types += t if isinstance(t, list) else [t]
                if t == "FAQPage":
                    faq_q += len(o.get("mainEntity", []) or [])
                for k in ("dateModified", "datePublished"):
                    if isinstance(o.get(k), str):
                        dates.append(f"{k}={o[k][:10]}")
                stack += [v for v in o.values() if isinstance(v, (dict, list))]
            elif isinstance(o, list):
                stack += o
    for t in soup(["script", "style", "noscript", "svg"]):
        t.decompose()
    main = soup.find("main") or soup.find("article") or soup.body or soup
    text = re.sub(r"\s+", " ", main.get_text(" ", strip=True))
    tables = main.find_all("table")
    out.update({
        "title": (soup.title.string or "").strip() if soup.title else "",
        "meta_description": (soup.find("meta", attrs={"name": "description"}) or {}).get("content", ""),
        "h1": " | ".join(h.get_text(" ", strip=True) for h in soup.find_all("h1"))[:200],
        "words": len(text.split()),
        "h2_count": len(main.find_all("h2")),
        "h3_count": len(main.find_all("h3")),
        "tables": len(tables),
        "table_rows": sum(len(t.find_all("tr")) for t in tables),
        "price_mentions": len(re.findall(r"(?:Rs\.?|PKR)\s?[\d,]+", text, re.I)),
        "years_mentioned": " ".join(sorted(set(re.findall(r"\b20(?:1\d|2\d)\b", text)))),
        "images": len(main.find_all("img")),
        "forms": len(main.find_all("form")),
        "faq_schema_questions": faq_q,
        "question_headings": sum(1 for h in main.find_all(["h2", "h3", "h4", "summary"]) if h.get_text().strip().endswith("?")),
        "schema_types": " ".join(sorted(set(map(str, ld_types)))),
        "schema_dates": " ".join(dates[:4]),
        "phone_shown": bool(re.search(r"(\+92|03\d{2})[\s-]?\d{3,4}[\s-]?\d{3,7}", text)),
        "whatsapp": "wa.me" in r.text or "whatsapp" in r.text.lower(),
        "outline": [f"{h.name}: {h.get_text(' ', strip=True)[:110]}" for h in main.find_all(["h2", "h3"])][:60],
        "table_headers": [" / ".join(c.get_text(" ", strip=True)[:30] for c in t.find_all(["th", "td"])[:8]) for t in tables[:6]],
        "first_words": text[:400],
    })
    return out


def main() -> None:
    d = latest_dir()
    rows = list(csv.DictReader((d / "top-pages.csv").open(encoding="utf-8-sig")))
    comp = [r for r in rows if r["domain"] not in SKIP_DOMAINS
            and not re.search(r"\.(pdf|xlsx?|docx?)(\?|$)", r["url"], re.I) and "/download/" not in r["url"]][:40]
    targets = [(r["url"], "competitor", r["keywords_ranked"], r["best_position"], r["est_monthly_clicks"]) for r in comp]
    targets += [(u, "competitor", "", "", "") for u in EXTRA if u not in {t[0] for t in targets}]
    targets += [(u, "ours", "", "", "") for u in OURS]
    results = []
    for url, who, kws, best, clicks in targets:
        a = audit(url)
        a.update({"who": who, "keywords_ranked": kws, "best_position": best, "est_monthly_clicks": clicks})
        results.append(a)
        print(f"{who:10s} {str(a.get('status')):5s} {a.get('words', 0):>6} words  {url[:90]}")
    (d / "page-audit.json").write_text(json.dumps(results, ensure_ascii=False, indent=1), encoding="utf-8")
    cols = ["who", "url", "status", "keywords_ranked", "best_position", "est_monthly_clicks", "title", "h1", "words",
            "h2_count", "h3_count", "tables", "table_rows", "price_mentions", "years_mentioned", "images", "forms",
            "faq_schema_questions", "question_headings", "schema_types", "schema_dates", "phone_shown", "whatsapp",
            "meta_description"]
    with (d / "page-audit.csv").open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        w.writerows(results)
    print(f"\nWrote {d / 'page-audit.csv'}")


if __name__ == "__main__":
    main()
