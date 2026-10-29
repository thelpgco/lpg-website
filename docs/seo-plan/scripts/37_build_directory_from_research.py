"""Build data/directory/*.json from partners_master, dealers xlsx CSV, and lpg data2.md.

Public site rules (owner 29 Oct 2026: publish names on site):
- Owner network listings (in_owner_list / dealers_xlsx): show name, city, area, address; phone when present.
- National distributor register (parsed from lpg data2): show as market coverage, NOT as THE LPG CO contracted partners.
"""
from __future__ import annotations

import csv
import json
import re
from collections import Counter, defaultdict
from pathlib import Path

SITE = Path(__file__).resolve().parents[3]
OUT_DIR = SITE / "data" / "directory"
RESEARCH = SITE / "keywords and research"


def slugify(s: str) -> str:
    s = (s or "").strip().lower()
    s = s.replace("&", " and ")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def clean_phone(p: str) -> str:
    d = re.sub(r"\D", "", p or "")
    if not d:
        return ""
    if d.startswith("92") and len(d) >= 12:
        return "+" + d
    if d.startswith("0") and len(d) >= 10:
        return "+92" + d[1:]
    if len(d) == 10:
        return "+92" + d
    return "+" + d if not p.startswith("+") else p


def load_partners_master() -> list[dict]:
    path = SITE / "docs" / "seo-plan" / "data" / "partners_master.csv"
    rows = list(csv.DictReader(path.open(encoding="utf-8-sig")))
    out = []
    for r in rows:
        name = (r.get("name") or "").strip()
        if not name:
            continue
        city = (r.get("city_clean") or r.get("city") or "").strip()
        out.append(
            {
                "id": r.get("biz_id") or slugify(name)[:20],
                "name": name,
                "source": "partners_master",
                "tier": "owner_network" if (r.get("in_owner_list") or "").lower() == "true" else "market_listing",
                "role": r.get("role") or "",
                "status": r.get("status") or "",
                "province": (r.get("province") or "").strip(),
                "city": city,
                "citySlug": slugify(city),
                "locality": (r.get("locality") or "").strip(),
                "address": (r.get("address") or "").strip(),
                "phone": clean_phone(r.get("phone_e164") or ""),
                "website": (r.get("website") or "").strip(),
                "rating": r.get("rating") or "",
                "open24h": (r.get("open_24h") or "").lower() == "true",
                "marketer": "",
                "verification": r.get("verification_status") or "",
            }
        )
    return out


def load_dealers_xlsx() -> list[dict]:
    path = SITE / "docs" / "seo-plan" / "data" / "dealers_xlsx_classified.csv"
    if not path.exists():
        return []
    rows = list(csv.DictReader(path.open(encoding="utf-8-sig")))
    out = []
    for i, r in enumerate(rows, 1):
        name = (r.get("name") or r.get("name_for_emails") or "").strip()
        if not name:
            continue
        city = (r.get("city") or "").strip()
        out.append(
            {
                "id": f"DX-{i:04d}",
                "name": name,
                "source": "dealers_xlsx",
                "tier": "owner_network",
                "role": r.get("subtypes") or "dealer",
                "status": "OPERATIONAL",
                "province": (r.get("province") or "").strip(),
                "city": city,
                "citySlug": slugify(city),
                "locality": "",
                "address": (r.get("address") or "").strip(),
                "phone": clean_phone(r.get("phone") or r.get("phone_n") or ""),
                "website": (r.get("website") or "").strip(),
                "rating": "",
                "open24h": False,
                "marketer": "",
                "verification": "owner list",
            }
        )
    return out


def parse_data2_distributors(limit: int | None = None) -> list[dict]:
    """Best-effort parse of jammed OGRA-style distributor lines in lpg data2.md."""
    text = (RESEARCH / "lpg data2.md").read_text(encoding="utf-8", errors="replace")
    # Pattern: N Brand M AGENCY NAME date CITY DISTRICT Province address phone person
    # Many lines start with digits then company then distributor name then date
    line_re = re.compile(
        r"(?P<marketer>[A-Za-z][A-Za-z0-9 &.\-]{1,40}?)\s+(?P<num>\d+)\s+(?P<agency>.+?)\s+"
        r"(?P<date>\d{1,2}[-/][A-Za-z]{3}[-/]\d{2,4}|\d{1,2}-\w{3}-\d{2})\s+"
        r"(?P<city>[A-Za-z][A-Za-z .'\-]{1,40}?)\s+(?P<district>[A-Za-z][A-Za-z .'\-]{1,40}?)\s+"
        r"(?P<province>Punjab|Sindh|KPK|KP|Balochistan|AJK|Gilgit Baltistan|Gilgit-Baltistan|Islamabad)\s+"
        r"(?P<rest>.+)$",
        re.I,
    )
    phone_re = re.compile(r"(0\d{2,4}[-\s]?\d{6,8}|03\d{2}[-\s]?\d{7}|\+?92\d{10})")
    out = []
    seen = set()
    for raw in text.splitlines():
        line = " ".join(raw.split())
        if "LIST OF DISTRIBUTORS" in line.upper():
            continue
        m = line_re.search(line)
        if not m:
            continue
        agency = m.group("agency").strip(" -")
        # strip leading company serial fragments
        agency = re.sub(r"^\d+\s+", "", agency)
        city = m.group("city").strip()
        key = (agency.lower(), city.lower())
        if key in seen or len(agency) < 3:
            continue
        seen.add(key)
        rest = m.group("rest")
        ph = phone_re.search(rest)
        phone = clean_phone(ph.group(1)) if ph else ""
        address = rest
        if ph:
            address = rest[: ph.start()].strip(" ,;-")
        out.append(
            {
                "id": f"D2-{len(out)+1:05d}",
                "name": agency.title() if agency.isupper() else agency,
                "source": "lpg_data2_register",
                "tier": "national_register",
                "role": "distributor_agency",
                "status": "LISTED",
                "province": m.group("province").strip(),
                "city": city,
                "citySlug": slugify(city),
                "locality": m.group("district").strip(),
                "address": address[:180],
                "phone": phone,
                "website": "",
                "rating": "",
                "open24h": False,
                "marketer": m.group("marketer").strip(),
                "verification": "industry distributor register (research file)",
            }
        )
        if limit and len(out) >= limit:
            break
    return out


def parse_marketers_data1() -> list[dict]:
    """Extract marketing company + plant city lines from lpg data.md (simple rows)."""
    text = (RESEARCH / "lpg data.md").read_text(encoding="utf-8", errors="replace")
    # Prefer rows that end: <City> <Province> <d-Mon-yy>
    tail_re = re.compile(
        r"^(?P<head>.+?)\s+(?P<city>[A-Za-z][A-Za-z .'\-]{1,40}?)\s+"
        r"(?P<province>Sindh|Punjab|KPK|Balochistan|AJK|Gilgit[^\s]*)\s+"
        r"(?P<date>\d{1,2}-[A-Za-z]{3}-\d{2})\s*$",
        re.M | re.I,
    )
    out = []
    seen = set()
    for m in tail_re.finditer(text):
        head = " ".join(m.group("head").split())
        city = m.group("city").strip(" .")
        # Drop junk / header-ish rows
        if len(head) < 5 or head.lower().startswith("city"):
            continue
        if re.search(r"\b(Phone|Fax|Chief Executive|Brand Name|Plant Location)\b", head, re.I):
            continue
        # If city accidentally ate "Limited", fold it into company
        if re.match(r"(?i)^limited\.?\s+", city):
            head = f"{head} Limited"
            city = re.sub(r"(?i)^limited\.?\s+", "", city).strip()
        # Prefer corporate-looking heads (Gas / LPG / Limited / Oil)
        if not re.search(r"(?i)\b(Gas|LPG|Oil|Limited|Petroleum|Energy)\b", head):
            continue
        if not city or len(city) > 40:
            continue
        key = (head.lower(), city.lower())
        if key in seen:
            continue
        seen.add(key)
        out.append(
            {
                "company": head,
                "city": city,
                "citySlug": slugify(city),
                "province": m.group("province").strip(),
                "licenceNote": m.group("date"),
            }
        )
    return out


def merge_listings(parts: list[list[dict]]) -> list[dict]:
    """Dedupe by name+citySlug preferring owner_network > market_listing > national_register."""
    rank = {"owner_network": 0, "market_listing": 1, "national_register": 2}
    best: dict[tuple[str, str], dict] = {}
    for group in parts:
        for row in group:
            key = (re.sub(r"\s+", " ", row["name"].lower()), row.get("citySlug") or "")
            prev = best.get(key)
            if prev is None or rank.get(row["tier"], 9) < rank.get(prev["tier"], 9):
                # keep phone from richer record
                if prev and prev.get("phone") and not row.get("phone"):
                    row = {**row, "phone": prev["phone"]}
                if prev and prev.get("address") and not row.get("address"):
                    row = {**row, "address": prev["address"]}
                best[key] = row
            elif prev and not prev.get("phone") and row.get("phone"):
                prev["phone"] = row["phone"]
            elif prev and not prev.get("marketer") and row.get("marketer"):
                prev["marketer"] = row["marketer"]
    return sorted(best.values(), key=lambda r: (r.get("city") or "", r["name"]))


def slim(r: dict) -> dict:
    return {
        "id": r["id"],
        "name": r["name"],
        "tier": r["tier"],
        "city": r["city"],
        "province": r["province"],
        "locality": r.get("locality") or "",
        "address": r.get("address") or "",
        "phone": r.get("phone") or "",
        "marketer": r.get("marketer") or "",
        "role": r.get("role") or "",
    }


def index_by_city(listings: list[dict]) -> dict:
    by = defaultdict(list)
    for r in listings:
        by[r.get("citySlug") or "unknown"].append(slim(r))
    # Keep owner + market + register samples so large cities still show register names.
    caps = {"owner_network": 40, "market_listing": 15, "national_register": 25}
    capped = {}
    for slug, items in by.items():
        picked: list[dict] = []
        for tier, lim in caps.items():
            group = sorted([x for x in items if x["tier"] == tier], key=lambda x: x["name"])
            picked.extend(group[:lim])
        capped[slug] = picked
    return capped


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    partners = load_partners_master()
    dealers = load_dealers_xlsx()
    register = parse_data2_distributors()
    marketers = parse_marketers_data1()
    listings = merge_listings([partners, dealers, register])

    by_city = index_by_city(listings)
    summary = {
        "generatedAt": "2026-10-29",
        "sources": [
            "docs/seo-plan/data/partners_master.csv",
            "docs/seo-plan/data/dealers_xlsx_classified.csv",
            "keywords and research/lpg data2.md",
            "keywords and research/lpg data.md",
        ],
        "counts": {
            "partners_master": len(partners),
            "dealers_xlsx": len(dealers),
            "national_register_parsed": len(register),
            "merged_listings": len(listings),
            "cities_indexed": len(by_city),
            "marketer_plant_rows": len(marketers),
            "owner_network": sum(1 for r in listings if r["tier"] == "owner_network"),
            "market_listing": sum(1 for r in listings if r["tier"] == "market_listing"),
            "national_register": sum(1 for r in listings if r["tier"] == "national_register"),
        },
        "disclosure": {
            "owner_network": "Dealers and agencies in our active supply network for this area.",
            "market_listing": "Dealers and agencies in our active supply network for this area.",
            "national_register": "Additional local distributors listed for this city.",
            "research": "Additional local distributors listed for this city.",
            "network_dealers": "Dealers and agencies in our active supply network for this area.",
        },
        "topCities": Counter(r.get("citySlug") for r in listings if r.get("citySlug")).most_common(25),
    }

    (OUT_DIR / "listings.json").write_text(
        json.dumps({"summary": summary, "listings": listings}, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    # Split city index for lighter imports
    (OUT_DIR / "by-city.json").write_text(json.dumps(by_city, ensure_ascii=False) + "\n", encoding="utf-8")
    (OUT_DIR / "marketers.json").write_text(json.dumps({"rows": marketers}, ensure_ascii=False) + "\n", encoding="utf-8")
    (OUT_DIR / "summary.json").write_text(json.dumps(summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print(json.dumps(summary["counts"], indent=2))
    print("top cities", summary["topCities"][:10])
    print("wrote", OUT_DIR)


if __name__ == "__main__":
    main()
