"""Sort competitor URLs, drop pages that don't help our SEO research, group the rest by topic.

Reads:  docs/seo-plan/intel/competitor-urls/ALL.csv
Writes: docs/seo-plan/intel/competitor-urls/sorted/
  INDEX.md
  ALL_useful.csv          domain,url,category,reason_kept
  ALL_dropped.csv         domain,url,reason_dropped
  by-category/<category>.txt
  by-domain/<domain>.txt  (useful only, with category tag)
  CATEGORY_COUNTS.csv

Categories match our topical map (price, cylinders, cities, …) so each group is a research checklist
for the matching pages on thelpgco.pk. Nothing is republished; this is analysis only.
"""
from __future__ import annotations

import csv
import re
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import parse_qs, urlencode, urlparse, urlunparse

ROOT = Path(__file__).resolve().parents[2] / "intel" / "competitor-urls"
IN_CSV = ROOT / "ALL.csv"
OUT = ROOT / "sorted"

# --- drop rules (noise / no research value for our content) -----------------
DROP_PATH = re.compile(
    r"""(?ix)
    (
      wp-login|wp-admin|wp-json|xmlrpc|
      cart|checkout|wishlist|my-account|account/|login|signin|register|forget-password|forgot-password|reset-password|
      add-to-cart|coupon|feed/?$|
      privacy|terms|cookie|refund|shipping-policy|disclaimer|
      wdt_footer|wdt_header|gva_header|rtl-demo|footer-\w|header-\w|
      dt_testimonial|/team/|/author/|/tag/|/listing-tag/|/listing-category/|
      /gallery|/portfolio|/careers|/jobs|/events?(?:/|$)|/event/|
      /docs(?:/|$)|/documentation|/changelog(?:/|$)|/demo(?:/|$)|/platform(?:/|$)|
      (^|/)footer(?:/|$)|(^|/)signup(?:/|$)|shop-\d+(?:/|$)|conventions-events|
      404-?\d*|/(?:error|without-sidebar|landing-page(?:-work)?|media-gallery)(?:/|$)|
      home-\d+(?:-theme)?(?:/|$)|(^|/)listings/|category/uncategorized|
      (^|/)sports(?:/|$)|iftar-dinner|haryali-market|sap-ariba|tenders(?:/|$)|
      life-at-|papco-history|parco|total-parco|ppgl-history|registration(?:/|$)|
      renewable-energy-comes|index\.php/?$|
      /\d{4}/(?:\d{2}/?)?$|          # date archives /2022/08
      comment-page-|replytocom|
      /cdn-cgi/|
      /solutions/drivers|/drivers(?:/|$)
    )
    """
)
DROP_QUERY = re.compile(r"(?i)add-to-cart|utm_|fbclid|gclid|sessionid|replytocom")
# theme / demo junk in the slug itself
DROP_SLUG = re.compile(r"(?i)christine-eve|lorem|demo-|sample-page|hello-world|with-right-sidebar|with-left-sidebar")

# --- category rules (first match wins; order = priority) --------------------
# Each: (category_id, label, path+query pattern)
RULES: list[tuple[str, str, re.Pattern[str]]] = [
    ("urdu", "Urdu / Roman Urdu pages", re.compile(r"(?i)(^|/)ur(/|$)|/urdu|/roman")),
    ("price", "Price / rate / OGRA", re.compile(
        r"(?i)price|pricing|\brate\b|qeemat|qimat|\bogra\b|per[-_]?kg|1kg|today[-_]?rate|cylinder[-_]?price|\bbachat\b"
    )),
    ("tools", "Tools / calculators / bill-check", re.compile(r"(?i)(^|/)tools?(?:/|$)|calculator|bill[-_]?check|converter")),
    ("safety", "Safety / leak / smell / regulator", re.compile(r"(?i)safety|hazard|leak|smell|regulator|blast|emergency|(^|/)hse(?:/|-|$)|for-emergencies")),
    ("cylinders", "Cylinders (steel / composite / sizes)", re.compile(
        r"(?i)cylinder|composite|fiberglass|fibre|fiber|11\.?8|45\.?4|200[-_]?kg|"
        r"(^|/)product/|(^|/)products?/|(^|/)cylinders?|(^|/)domestic(?:/|$)"
    )),
    ("appliances", "Appliances / shop products", re.compile(r"(?i)stove|heater|geyser|burner|hose|accessory|appliance|vaporizer|(^|/)shop(?:/|$)|product-category")),
    ("cities", "City / coverage / location pages", re.compile(
        r"(?i)(^|/)coverage(?:/|$)|karachi|lahore|islamabad|rawalpindi|peshawar|quetta|multan|faisalabad|"
        r"hyderabad|gujranwala|sialkot|abbottabad|gilgit|skardu|murree|muzaffarabad|burewala|"
        r"okara|sargodha|bahawalpur|(^|/)city/|(^|/)cities/|(^|/)locations?(?:/|$)"
    )),
    ("delivery", "Home delivery / order / refill", re.compile(
        r"(?i)delivery|home[-_]?delivery|order|refill|at[-_]?home|for[-_]?your[-_]?home|subscription|"
        r"solutions/households|households|home-solutions"
    )),
    ("commercial", "Commercial / industrial / bulk / HoReCa", re.compile(
        r"(?i)commercial|industrial|bulk|horeca|restaurant|hotel|factory|plant|bowser|"
        r"for[-_]?your[-_]?business|hospitalit|our-business-segment|import-receipts"
    )),
    ("auto", "Auto LPG / kits", re.compile(r"(?i)auto[-_]?lpg|auto[-_]?gas|lpg[-_]?kit|cng|autogas")),
    ("services", "Engineering / installation / services", re.compile(
        r"(?i)service|install|pipeline|manifold|storage|engineering|maintenance|amc|conversion|(^|/)projects(?:/|$)"
    )),
    ("dealers", "Dealers / distributors / network", re.compile(
        r"(?i)dealer|distributor|partner|franchise|frenchiser|network|agency|find[-_]?a|"
        r"marketing-distribution|(^|/)distribution(?:/|$)|our-logistics"
    )),
    ("guides", "Guides / blog / what-is / how-to", re.compile(
        r"(?i)(^|/)blog|/blogs|/news|/guide|how[-_]?to|what[-_]?is|stand[-_]?for|lpg[-_]?at[-_]?home|article|"
        r"load-shedding|winter|ramzan|kahaniyan|reasons-to-choose|tips|"
        r"application-of-lpg|uses?-of-lpg|why[-_]?use[-_]?lpg|why[-_]?choose|benefits|"
        r"calorific|eco-friend|smog|pollution|indoor[-_]?air|preferred[-_]?fuel|"
        r"growing[-_]?use|increasing[-_]?use|ideal[-_]?fuel|alternative[-_]?fuel|"
        r"gas[-_]?shortage|sui[-_]?gas|high[-_]?rise|apartment|crop[-_]?drying|"
        r"choosing[-_]?any[-_]?lpg|right[-_]?lpg[-_]?supplier|right[-_]?choice[-_]?of[-_]?fuel|"
        r"toxic|poisonous|catering|food[-_]?and[-_]?beverage|urban[-_]?centres|"
        r"developing[-_]?countries|main[-_]?uses|lpg-applications|lpg-insights|"
        r"greener-future|choola|campaigns|sustainable|natural-calamit|manufacturing-strategy"
    )),
    ("company", "Home / about / contact (trust patterns)", re.compile(
        r"(?i)^https?://[^/]+/?$|/about|/contact|/company|/who[-_]?we|governance|csr|vision|mission|"
        r"(^|/)the-company(?:/|$)|(^|/)team(?:/|$)|our-team|leadership|board-of-directors|"
        r"(^|/)home(?:/|$)|what-we-do|certifications|quality-assurance|faq|faqs|for-complaints|iacp"
    )),
]


def normalise_url(url: str) -> str:
    p = urlparse(url.strip())
    host = p.netloc.lower()
    if host.startswith("www."):
        host = host[4:]
    q = parse_qs(p.query, keep_blank_values=False)
    keep = {}
    for k, v in q.items():
        if DROP_QUERY.search(k):
            continue
        if k.lower() in ("add-to-cart", "quantity", "removed_item", "coupon_code"):
            continue
        keep[k] = v
    query = urlencode(keep, doseq=True)
    path = p.path.rstrip("/") or "/"
    # strip /index.php prefix (WordPress oddity on noorlpg)
    path = re.sub(r"(?i)^/index\.php(?=/|$)", "", path) or "/"
    return urlunparse((p.scheme, host, path, "", query, ""))


def drop_reason(url: str) -> str | None:
    low = url.lower()
    if DROP_PATH.search(low):
        return "noise_path"
    if DROP_SLUG.search(low):
        return "demo_or_junk_slug"
    if "?add-to-cart=" in low or "add-to-cart=" in low:
        return "cart_param"
    path = urlparse(url).path.rstrip("/") or "/"
    # bare media / empty
    if path in ("/feed", "/feed/"):
        return "feed"
    # WordPress paginated date-like leftovers
    if re.search(r"/\d{4}/?\d{0,2}/?$", path) and not re.search(r"(price|rate|cylinder|lpg)", path, re.I):
        return "date_archive"
    return None


def categorise(url: str) -> tuple[str, str]:
    path = urlparse(url).path + ("?" + urlparse(url).query if urlparse(url).query else "")
    for cid, label, pat in RULES:
        if pat.search(path) or pat.search(url):
            return cid, label
    return "other", "Other (review by hand)"


def main() -> int:
    if not IN_CSV.exists():
        raise SystemExit(f"missing {IN_CSV}; run 24_export_competitor_urls.py first")

    rows = list(csv.DictReader(IN_CSV.open(encoding="utf-8")))
    useful: list[dict] = []
    dropped: list[dict] = []
    seen: set[str] = set()

    for r in rows:
        raw = r["url"]
        url = normalise_url(raw)
        if url in seen:
            dropped.append({"domain": r["domain"], "url": raw, "reason_dropped": "duplicate_after_normalise"})
            continue
        reason = drop_reason(url)
        if reason:
            dropped.append({"domain": r["domain"], "url": url, "reason_dropped": reason})
            continue
        seen.add(url)
        cat, label = categorise(url)
        useful.append({
            "domain": r["domain"],
            "url": url,
            "category": cat,
            "category_label": label,
            "reason_kept": "matches_topic" if cat != "other" else "kept_for_manual_review",
        })

    useful.sort(key=lambda x: (x["category"], x["domain"], x["url"]))
    dropped.sort(key=lambda x: (x["reason_dropped"], x["domain"], x["url"]))

    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "by-category").mkdir(exist_ok=True)
    (OUT / "by-domain").mkdir(exist_ok=True)

    with (OUT / "ALL_useful.csv").open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["domain", "url", "category", "category_label", "reason_kept"])
        w.writeheader()
        w.writerows(useful)
    with (OUT / "ALL_dropped.csv").open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["domain", "url", "reason_dropped"])
        w.writeheader()
        w.writerows(dropped)

    by_cat: dict[str, list[dict]] = defaultdict(list)
    by_dom: dict[str, list[dict]] = defaultdict(list)
    for u in useful:
        by_cat[u["category"]].append(u)
        by_dom[u["domain"]].append(u)

    # category files
    cat_order = [c for c, _, _ in RULES] + ["other"]
    counts = []
    for cat in cat_order:
        items = by_cat.get(cat, [])
        label = next((lab for c, lab, _ in RULES if c == cat), "Other (review by hand)")
        path = OUT / "by-category" / f"{cat}.txt"
        lines = [f"# {label} ({len(items)} URLs)", ""]
        for it in items:
            lines.append(f"{it['url']}  [{it['domain']}]")
        path.write_text("\n".join(lines) + ("\n" if lines else ""), encoding="utf-8")
        counts.append({"category": cat, "label": label, "urls": len(items),
                       "domains": len({i["domain"] for i in items})})

    with (OUT / "CATEGORY_COUNTS.csv").open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["category", "label", "urls", "domains"])
        w.writeheader()
        w.writerows(counts)

    for domain, items in sorted(by_dom.items()):
        lines = [f"# {domain} — {len(items)} useful URLs", ""]
        items_sorted = sorted(items, key=lambda x: (x["category"], x["url"]))
        cur = None
        for it in items_sorted:
            if it["category"] != cur:
                cur = it["category"]
                lines += ["", f"## {it['category']}", ""]
            lines.append(it["url"])
        (OUT / "by-domain" / f"{domain}.txt").write_text("\n".join(lines) + "\n", encoding="utf-8")

    drop_counts = Counter(d["reason_dropped"] for d in dropped)
    lines = [
        "# Sorted competitor URLs",
        "",
        f"Input: {len(rows)} · Useful: **{len(useful)}** · Dropped: **{len(dropped)}**",
        "",
        "## Categories (useful)",
        "",
        "| Category | URLs | Domains | File |",
        "|---|---:|---:|---|",
    ]
    for c in counts:
        if c["urls"]:
            lines.append(f"| {c['label']} | {c['urls']} | {c['domains']} | [by-category/{c['category']}.txt](by-category/{c['category']}.txt) |")
    lines += [
        "",
        "## Dropped (why)",
        "",
        "| Reason | Count |",
        "|---|---:|",
    ]
    for reason, n in drop_counts.most_common():
        lines.append(f"| {reason} | {n} |")
    lines += [
        "",
        "Open `ALL_useful.csv` for the full list. `by-category/` is the research checklist per topic.",
        "Urdu URLs are listed under **urdu** even when they are also a city or price page.",
    ]
    (OUT / "INDEX.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"useful={len(useful)} dropped={len(dropped)} -> {OUT}")
    for c in counts:
        if c["urls"]:
            print(f"  {c['urls']:4d}  {c['category']}")
    print("dropped:")
    for reason, n in drop_counts.most_common():
        print(f"  {n:4d}  {reason}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
