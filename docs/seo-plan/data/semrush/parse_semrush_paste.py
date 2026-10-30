"""Turn a copy-paste of the Semrush keyword table into a clean CSV.

Usage:  python parse_semrush_paste.py semrush-keywords-2026-10-30-raw.txt semrush-keywords-2026-10-30.csv

Each keyword row in the paste is: keyword (ends with a zero-width space), one or two intent letters,
volume, KD %, CPC (USD), then "1 month". Page headers and totals are skipped.
"""
import csv
import sys

INTENTS = {"I": "Informational", "N": "Navigational", "T": "Transactional", "C": "Commercial", "n/a": ""}


def parse(path):
    lines = [l.strip() for l in open(path, encoding="utf-8")]
    rows, i = [], 0
    while i < len(lines):
        if lines[i].endswith("​"):
            kw, i = lines[i].rstrip("​").strip(), i + 1
            vals = []
            while i < len(lines) and lines[i] != "1 month":
                if lines[i]:
                    vals.append(lines[i])
                i += 1
            intents = [v for v in vals if v in INTENTS]
            nums = [v for v in vals if v not in INTENTS]
            vol, kd, cpc = nums[:3]
            rows.append({
                "keyword": kw,
                "intent": " + ".join(INTENTS[v] for v in intents if INTENTS[v]),
                "volume": int(vol.replace(",", "")),
                "kd_percent": int(kd),
                "cpc_usd": float(cpc),
            })
        i += 1
    return rows


def main(src, out):
    rows = parse(src)
    seen, unique = set(), []
    for r in rows:
        if r["keyword"] not in seen:
            seen.add(r["keyword"])
            unique.append(r)
    unique.sort(key=lambda r: (-r["volume"], r["keyword"]))
    with open(out, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(unique[0]))
        w.writeheader()
        w.writerows(unique)
    print(f"{len(rows)} rows, {len(unique)} unique, total volume {sum(r['volume'] for r in unique):,}")


if __name__ == "__main__":
    main(*sys.argv[1:3])
