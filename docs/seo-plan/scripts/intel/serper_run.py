"""Serper runner: executes query files against Serper.dev and stores raw + parsed results in intel.db.

Usage (from lpg-website/docs/seo-plan/scripts/intel):
  python serper_run.py --file national --limit 10          # small test
  python serper_run.py --file national                     # wave 0
  python serper_run.py --file cities --wave 1              # wave 1 (top cities)
  python serper_run.py --file cities --wave 2              # wave 2
  python serper_run.py --file autocomplete                 # autocomplete expansion
  python serper_run.py --queries "lpg price today" "gas cylinder lahore"   # ad hoc
  python serper_run.py --file national --dry-run           # show what would run, spend nothing

Rules:
  - Key comes from SERPER_API_KEY (env or lpg-website/.env.local). It is never stored or printed.
  - Queries already stored are skipped (use --refresh to re-run), so re-runs never double-spend.
  - One request at a time with a short pause. Stops on 401/403 (bad key) and 402/429 (credits/rate).
"""
from __future__ import annotations

import argparse
import csv
import json
import os
import string
import sys
import time

import requests

from common import DATA_DIR, classify_domain, competitor_domains, connect, domain_of, load_env

ENDPOINTS = {
    "search": "https://google.serper.dev/search",
    "autocomplete": "https://google.serper.dev/autocomplete",
    "places": "https://google.serper.dev/places",
}


def read_rows(which: str, wave: str | None) -> list[dict]:
    if which == "national":
        rows = list(csv.DictReader((DATA_DIR / "serper_queries_national.csv").open(encoding="utf-8-sig")))
        for r in rows:
            r.setdefault("scope", "national")
            r["intent"] = r.get("intent", "")
    elif which == "cities":
        rows = list(csv.DictReader((DATA_DIR / "serper_queries.csv").open(encoding="utf-8-sig")))
        for r in rows:
            r["scope"] = r.get("city", "")
            r["page_id"] = ""
    elif which == "autocomplete":
        seeds = list(csv.DictReader((DATA_DIR / "serper_autocomplete_seeds.csv").open(encoding="utf-8-sig")))
        rows = []
        for s in seeds:
            for suffix in [""] + list(string.ascii_lowercase):
                q = f"{s['seed']} {suffix}".strip()
                rows.append({"wave": "A", "scope": "autocomplete", "intent": "autocomplete", "query": q,
                             "gl": s["gl"], "hl": s["hl"], "location": "", "num": "10",
                             "endpoint": "autocomplete", "page_id": ""})
    else:
        raise SystemExit(f"unknown --file {which}")
    if wave is not None:
        rows = [r for r in rows if str(r.get("wave")) == str(wave)]
    return rows


def call(endpoint: str, key: str, row: dict) -> requests.Response:
    payload = {"q": row["query"], "gl": row.get("gl") or "pk", "hl": row.get("hl") or "en"}
    if row.get("location") and endpoint != "autocomplete":
        payload["location"] = row["location"]
    if endpoint == "search":
        payload["num"] = int(row.get("num") or 10)
    return requests.post(
        ENDPOINTS[endpoint],
        headers={"X-API-KEY": key, "Content-Type": "application/json"},
        data=json.dumps(payload),
        timeout=30,
    )


def parse(data: dict, endpoint: str) -> list[dict]:
    out: list[dict] = []
    if endpoint == "autocomplete":
        for i, s in enumerate(data.get("suggestions", []), 1):
            out.append({"kind": "autocomplete", "position": i, "title": s.get("value"), "url": None})
        return out
    for o in data.get("organic", []):
        out.append({"kind": "organic", "position": o.get("position"), "title": o.get("title"),
                    "url": o.get("link"), "snippet": o.get("snippet"),
                    "extra": json.dumps({k: o[k] for k in ("date", "sitelinks", "rating", "ratingCount") if k in o})})
    for i, p in enumerate(data.get("peopleAlsoAsk", []), 1):
        out.append({"kind": "paa", "position": i, "title": p.get("question"), "url": p.get("link"),
                    "snippet": p.get("snippet")})
    for i, r in enumerate(data.get("relatedSearches", []), 1):
        out.append({"kind": "related", "position": i, "title": r.get("query"), "url": None})
    for i, p in enumerate(data.get("places", []), 1):
        out.append({"kind": "place", "position": p.get("position") or i, "title": p.get("title"),
                    "url": p.get("website"), "snippet": p.get("address"),
                    "extra": json.dumps({k: p[k] for k in ("rating", "ratingCount", "phoneNumber", "category") if k in p})})
    ab = data.get("answerBox")
    if ab:
        out.append({"kind": "answer", "position": 0, "title": ab.get("title"), "url": ab.get("link"),
                    "snippet": ab.get("snippet") or ab.get("answer")})
    for i, t in enumerate(data.get("topStories", []), 1):
        out.append({"kind": "topstory", "position": i, "title": t.get("title"), "url": t.get("link"),
                    "snippet": t.get("source")})
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--file", choices=["national", "cities", "autocomplete"])
    ap.add_argument("--wave")
    ap.add_argument("--queries", nargs="*")
    ap.add_argument("--limit", type=int)
    ap.add_argument("--sleep", type=float, default=0.4)
    ap.add_argument("--refresh", action="store_true", help="re-run queries that are already stored")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    load_env()
    key = os.environ.get("SERPER_API_KEY", "")
    if not key and not a.dry_run:
        print("SERPER_API_KEY is not set (env or lpg-website/.env.local).")
        return 2

    if a.queries:
        rows = [{"wave": "adhoc", "scope": "adhoc", "intent": "", "query": q, "gl": "pk", "hl": "en",
                 "location": "Pakistan", "num": "10", "endpoint": "search", "page_id": ""} for q in a.queries]
    elif a.file:
        rows = read_rows(a.file, a.wave)
    else:
        ap.error("give --file or --queries")

    con = connect()
    comps = competitor_domains()
    todo = []
    for r in rows:
        ep = r.get("endpoint") or "search"
        if not a.refresh and con.execute(
            "select 1 from serp_queries where q=? and endpoint=? and gl=? and hl=? and location=?",
            (r["query"], ep, r.get("gl") or "pk", r.get("hl") or "en", r.get("location") or ""),
        ).fetchone():
            continue
        todo.append(r)
    if a.limit:
        todo = todo[: a.limit]

    print(f"{len(rows)} queries in set, {len(todo)} to run (the rest are already stored).")
    if a.dry_run:
        for r in todo[:10]:
            print("  would run:", r["query"], "|", r.get("location"))
        return 0

    done = failed = credits = 0
    for n, r in enumerate(todo, 1):
        ep = r.get("endpoint") or "search"
        try:
            resp = call(ep, key, r)
        except requests.RequestException as e:
            print(f"[{n}/{len(todo)}] network error: {type(e).__name__}")
            failed += 1
            time.sleep(2)
            continue

        if resp.status_code in (401, 403):
            print("Serper rejected the key (401/403). Stopping. Check SERPER_API_KEY.")
            return 3
        if resp.status_code in (402, 429):
            print(f"Serper returned {resp.status_code} (credits exhausted or rate limited). Stopping; re-run later to resume.")
            return 4
        if resp.status_code != 200:
            print(f"[{n}/{len(todo)}] HTTP {resp.status_code} for '{r['query']}'")
            failed += 1
            continue

        data = resp.json()
        cr = int(data.get("credits", 1) or 1)
        credits += cr
        with con:
            con.execute("delete from serp_queries where q=? and endpoint=? and gl=? and hl=? and location=?",
                        (r["query"], ep, r.get("gl") or "pk", r.get("hl") or "en", r.get("location") or ""))
            cur = con.execute(
                "insert into serp_queries (q,endpoint,gl,hl,location,num,wave,scope,intent,page_id,http_status,credits,raw_json)"
                " values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                (r["query"], ep, r.get("gl") or "pk", r.get("hl") or "en", r.get("location") or "",
                 int(r.get("num") or 10), str(r.get("wave")), r.get("scope"), r.get("intent"), r.get("page_id"),
                 200, cr, json.dumps(data, ensure_ascii=False)),
            )
            qid = cur.lastrowid
            for item in parse(data, ep):
                d = domain_of(item["url"]) if item.get("url") else None
                con.execute(
                    "insert into serp_results (query_id,kind,position,title,url,domain,snippet,result_type,extra)"
                    " values (?,?,?,?,?,?,?,?,?)",
                    (qid, item["kind"], item.get("position"), item.get("title"), item.get("url"), d,
                     item.get("snippet"), classify_domain(d, comps) if d else None, item.get("extra")),
                )
        done += 1
        if n % 20 == 0 or n == len(todo):
            print(f"[{n}/{len(todo)}] stored. credits used this run: {credits}")
        time.sleep(a.sleep)

    print(f"Done. stored={done} failed={failed} credits={credits}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

