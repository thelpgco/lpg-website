"""Shared helpers for the intel tools (Serper runner, competitor crawler, analysis).

Storage: a local SQLite file (docs/seo-plan/intel/intel.db). The tables mirror
supabase/intel.sql so the data can be loaded into Supabase later.

Secrets: SERPER_API_KEY is read from the environment or from lpg-website/.env.local.
It is never written to the database, logs or docs.
"""
from __future__ import annotations

import os
import re
import sqlite3
from pathlib import Path
from urllib.parse import urlparse

HERE = Path(__file__).resolve().parent
SEO_DIR = HERE.parent.parent            # docs/seo-plan
SITE_DIR = SEO_DIR.parent.parent        # lpg-website
DATA_DIR = SEO_DIR / "data"
INTEL_DIR = SEO_DIR / "intel"
DB_PATH = INTEL_DIR / "intel.db"

SCHEMA = """
create table if not exists serp_queries (
  id integer primary key autoincrement,
  q text not null, endpoint text not null default 'search',
  gl text, hl text, location text, num integer,
  wave text, scope text, intent text, page_id text,
  status text not null default 'ok', http_status integer, credits integer,
  fetched_at text not null default (datetime('now')),
  raw_json text,
  unique (q, endpoint, gl, hl, location)
);
create table if not exists serp_results (
  id integer primary key autoincrement,
  query_id integer not null references serp_queries(id) on delete cascade,
  kind text not null,            -- organic | paa | related | place | answer | autocomplete | topstory
  position integer, title text, url text, domain text, snippet text,
  result_type text,              -- classified: competitor | marketplace | brand | directory | news | gov | forum | other
  extra text
);
create index if not exists serp_results_q on serp_results(query_id);
create index if not exists serp_results_domain on serp_results(domain);

create table if not exists pages (
  url text primary key,
  domain text not null,
  status integer, fetched_at text, robots_ok integer default 1, needs_js integer default 0,
  title text, meta_description text, h1 text, h2s text, word_count integer,
  text text, text_hash text, canonical text, lastmod text, schema_types text,
  internal_links text, content_type text,   -- classified page type
  discovered_from text
);
create index if not exists pages_domain on pages(domain);

create table if not exists crawl_log (
  id integer primary key autoincrement, at text default (datetime('now')),
  domain text, url text, event text, detail text
);
"""


def connect() -> sqlite3.Connection:
    INTEL_DIR.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(DB_PATH)
    con.execute("pragma foreign_keys = on")
    con.executescript(SCHEMA)
    return con


def load_env() -> None:
    """Load KEY=VALUE pairs from lpg-website/.env.local without overriding real env vars."""
    f = SITE_DIR / ".env.local"
    if not f.exists():
        return
    for line in f.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def domain_of(url: str) -> str:
    try:
        host = urlparse(url).netloc.lower()
    except Exception:
        return ""
    return re.sub(r"^www\.", "", host)


# Domain classification used for SERP-weakness scoring (see plan section 5.4).
MARKETPLACES = {"daraz.pk", "olx.com.pk", "pakwheels.com", "facebook.com", "instagram.com", "youtube.com",
                "tiktok.com", "linkedin.com", "twitter.com", "x.com", "pinterest.com"}
DIRECTORIES = {"yellowpages.com.pk", "pakistanyellowpages.com", "justdial.com", "find.pk", "mapquest.com",
               "tripadvisor.com", "yelp.com", "cybo.com", "pk.kompass.com", "mapcarta.com", "foursquare.com"}
NEWS = {"dawn.com", "tribune.com.pk", "geo.tv", "thenews.com.pk", "brecorder.com", "arynews.tv", "samaa.tv",
        "propakistani.pk", "profit.pakistantoday.com.pk", "pakistantoday.com.pk", "bolnews.com", "express.pk",
        "urdupoint.com", "hamariweb.com", "mashriq.com.pk", "dunyanews.tv", "nation.com.pk", "business-standard.com",
        "dailytimes.com.pk", "thefridaytimes.com", "urdu.geo.tv", "jang.com.pk", "aajnews.tv", "24newshd.tv"}
FORUMS = {"reddit.com", "quora.com", "medium.com", "wikipedia.org", "en.wikipedia.org", "ur.wikipedia.org",
          "wikihow.com", "britannica.com"}
GOV_SUFFIX = (".gov.pk", ".gov", ".edu.pk", ".edu")
GOV_DOMAINS = {"ogra.org.pk", "sngpl.com.pk", "ssgc.com.pk", "pbs.gov.pk", "nepra.org.pk", "pakistan.gov.pk",
               "ppra.org.pk", "rescue.gov.pk", "nadra.gov.pk"}
BRANDS = {"cylin.com.pk", "flamora.pk", "gasonline.pk", "noorlpg.com", "ppgl.com.pk", "friends-gas.pk",
          "bostanlpg.com", "paklpg.com"}


def classify_domain(domain: str, competitor_domains: set[str] | None = None) -> str:
    d = domain.lower()
    comp = competitor_domains or set()
    if d in GOV_DOMAINS or d.endswith(GOV_SUFFIX):
        return "gov"
    if d in comp or d in BRANDS:
        return "competitor"
    if d in MARKETPLACES or any(d.endswith("." + m) for m in MARKETPLACES):
        return "marketplace"
    if d in DIRECTORIES:
        return "directory"
    if d in NEWS:
        return "news"
    if d in FORUMS or d.endswith("wikipedia.org"):
        return "forum"
    return "other"


def competitor_domains() -> set[str]:
    import csv
    f = DATA_DIR / "competitors_v4.csv"
    if not f.exists():
        return set()
    with f.open(encoding="utf-8-sig") as fh:
        return {r["domain"].strip().lower() for r in csv.DictReader(fh) if r.get("domain")}

