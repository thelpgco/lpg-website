"""Extract lightweight content metrics for every page.tsx (strict audit support)."""
from __future__ import annotations

import csv
import json
import re
from pathlib import Path

SITE = Path(__file__).resolve().parents[3]
APP = SITE / "app"
OUT = SITE / "docs" / "seo-plan" / "audit" / "content_metrics.csv"

DRAFT_MARKERS = [
    r"needs confirmation",
    r"Gate L",
    r"owner photos",
    r"partner preview",
    r"until the owner",
    r"when available",
    r"being updated",
    r"Searchers ask",
    r"will live on",
    r"No case studies yet",
    r"we do not publish",
    r"we do not list a rupee",
    r"stock and prices are confirmed on request",
]

SEO_VOICE = [
    r"Searchers ask",
    r"people ask for the price of",
    r"aaj ka rate",
    r"LPG ki kimat",
]


def extract_strings(src: str) -> list[str]:
    # string literals in TSX (simple)
    return re.findall(r"""(?:`|\"|')((?:\\.|(?!\1).)*?)(?:`|\"|')""", src)


def visible_text(src: str) -> str:
    # strip imports and obvious code-ish lines
    lines = []
    for line in src.splitlines():
        if line.strip().startswith(("import ", "export ", "const faqs", "type ", "//")):
            continue
        lines.append(line)
    blob = "\n".join(lines)
    parts = extract_strings(blob)
    return " ".join(parts)


def count_h2(src: str) -> int:
    return len(re.findall(r"<H2>|h2:|title:\s*[\"']", src)) + src.count("<H2>")


def metrics_for(path: Path) -> dict:
    src = path.read_text(encoding="utf-8", errors="replace")
    text = visible_text(src)
    words = len(re.findall(r"[A-Za-z0-9']+", text))
    h2 = src.count("<H2>")
    faq = len(re.findall(r"\bq:\s*[\"'`]", src)) + len(re.findall(r"\bquestion:\s*[\"'`]", src))
    links = src.count("<Link") + src.count("href=")
    price = "PriceBlock" in src
    markers = 0
    for pat in DRAFT_MARKERS:
        markers += len(re.findall(pat, src, re.I))
    seo = sum(len(re.findall(pat, src, re.I)) for pat in SEO_VOICE)
    imgs = src.count("<ContentImage") + src.count("ImageGallery")
    # route
    rel = path.relative_to(APP).as_posix()
    if rel == "page.tsx":
        url = "/"
    elif rel.endswith("/page.tsx"):
        url = "/" + rel[: -len("/page.tsx")] + "/"
    else:
        url = rel
    url = url.replace("/lpg-hub/[slug]/", "/lpg-hub/[slug]/")
    url = url.replace("/services/[slug]/", "/services/[slug]/")
    url = url.replace("/lpg-price-in-pakistan/[city]/", "/lpg-price-in-pakistan/[city]/")
    return {
        "file": rel,
        "url": url,
        "words_literals": words,
        "h2": h2,
        "faq": faq,
        "link_ish": links,
        "price_block": int(price),
        "draft_marker_hits": markers,
        "seo_voice_hits": seo,
        "content_img_components": imgs,
        "bytes": path.stat().st_size,
    }


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    rows = [metrics_for(p) for p in sorted(APP.rglob("page.tsx"))]
    with OUT.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)
    print(f"wrote {OUT} rows={len(rows)}")
    weakish = [r for r in rows if r["words_literals"] < 250 or r["draft_marker_hits"] >= 3]
    print("low-word or draft-heavy:", len(weakish))
    for r in sorted(weakish, key=lambda x: (x["words_literals"], -x["draft_marker_hits"]))[:25]:
        print(f"  {r['url']:55} words={r['words_literals']:4} draft={r['draft_marker_hits']} seo={r['seo_voice_hits']}")


if __name__ == "__main__":
    main()
