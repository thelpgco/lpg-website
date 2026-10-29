"""Measure page-specific text and sibling overlap for every prerendered page.

Usage (after `npx next build`):
    python -I docs/content-plan/scripts/measure_pages.py .next/server/app [--csv out.csv] [--only /industries/]

Counts text inside <main> only (header, footer, nav, aside lead form, scripts and styles excluded).
  unique %  = share of words covered by an 8-word run that appears on at most 2 pages
  overlap % = share of this page's runs also found on its closest other page,
              ignoring runs that appear on more than 25% of pages (sitewide strips)
"""
import csv, os, re, sys
from collections import Counter
from html.parser import HTMLParser

K = 8
SKIP = {"script", "style", "noscript", "svg", "template", "aside", "nav"}


class MainText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.skip = 0
        self.inmain = 0
        self.parts = []

    def handle_starttag(self, tag, attrs):
        if tag in SKIP:
            self.skip += 1
        if tag == "main":
            self.inmain += 1

    def handle_endtag(self, tag):
        if tag in SKIP:
            self.skip = max(0, self.skip - 1)
        if tag == "main":
            self.inmain -= 1

    def handle_data(self, data):
        if self.inmain and not self.skip:
            self.parts.append(data)


def load(root):
    pages = {}
    for dirpath, _, files in os.walk(root):
        for f in files:
            if not f.endswith(".html"):
                continue
            rel = os.path.relpath(os.path.join(dirpath, f), root).replace("\\", "/")[:-5]
            if rel.startswith("_"):
                continue
            url = "/" if rel == "index" else f"/{rel}/"
            p = MainText()
            p.feed(open(os.path.join(dirpath, f), encoding="utf-8").read())
            pages[url] = re.findall(r"[a-z0-9%.,'-]+", " ".join(p.parts).lower())
    return pages


def main():
    args = sys.argv[1:]
    root = args[0]
    out = args[args.index("--csv") + 1] if "--csv" in args else None
    only = args[args.index("--only") + 1] if "--only" in args else ""

    pages = load(root)
    runs = {u: [" ".join(w[i:i + K]) for i in range(max(0, len(w) - K + 1))] for u, w in pages.items()}
    seen = Counter(r for rs in runs.values() for r in set(rs))
    sitewide = len(pages) * 0.25
    sets = {u: {r for r in rs if seen[r] <= sitewide} for u, rs in runs.items()}

    rows = []
    for url, words in pages.items():
        if only and not url.startswith(only):
            continue
        own = [False] * len(words)
        for i, r in enumerate(runs[url]):
            if seen[r] <= 2:
                own[i:i + K] = [True] * K
        uniq = sum(own)
        a, best, best_url = sets[url], 0.0, ""
        for other, b in sets.items():
            if other != url and a and b:
                ov = len(a & b) / len(a)
                if ov > best:
                    best, best_url = ov, other
        rows.append((url, len(words), uniq, uniq / max(len(words), 1), best, best_url))

    rows.sort(key=lambda r: r[3])
    print(f"{'unique%':>7} {'unique':>6} {'words':>6} {'overlap':>7}  url  (closest sibling)")
    for url, n, uniq, pct, ov, ov_url in rows:
        flag = "  <-- thin" if pct < 0.40 or ov > 0.30 else ""
        print(f"{pct:7.0%} {uniq:6d} {n:6d} {ov:7.0%}  {url}  ({ov_url}){flag}")
    if out:
        with open(out, "w", newline="", encoding="utf-8") as fh:
            w = csv.writer(fh)
            w.writerow(["url", "words", "unique_words", "unique_pct", "overlap_pct", "closest_sibling"])
            for url, n, uniq, pct, ov, ov_url in rows:
                w.writerow([url, n, uniq, f"{pct:.3f}", f"{ov:.3f}", ov_url])


if __name__ == "__main__":
    main()
