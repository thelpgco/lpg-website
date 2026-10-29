-- Competitor and SERP intelligence for thelpgco.pk
-- Private schema. Never exposed to the public site. Row level security is enabled with no policies,
-- so only the service role (server-side scripts) can read or write. Run in the Supabase SQL editor.
--
-- What goes in here:
--   * every public page we crawl on competitor sites (analysis only, never republished)
--   * every Serper SERP snapshot (raw JSON plus parsed results)
--   * the topic coverage matrix that tells us what competitors cover and we do not
-- Plan reference: docs/seo-plan/THE_LPG_CO_SEO_MASTER_PLAN.md, section 5.

create schema if not exists intel;

create table if not exists intel.competitors (
  id            bigserial primary key,
  domain        text not null unique,
  owner_listed  boolean not null default false,       -- came from competiators.md
  category      text,                                 -- brand | local agency | marketplace | platform | directory | news | government
  priority      smallint not null default 3,          -- 1 owner list, 2 seen in SERP, 3 from Maps listing websites
  crawl_method  text not null default 'html' check (crawl_method in ('html', 'sitemap', 'playwright', 'sitemap+playwright')),
  robots_ok     boolean,                              -- result of the last robots.txt check
  notes         text,
  added_at      timestamptz not null default now()
);

create table if not exists intel.crawl_runs (
  id               bigserial primary key,
  competitor_id    bigint not null references intel.competitors(id) on delete cascade,
  started_at       timestamptz not null default now(),
  finished_at      timestamptz,
  urls_discovered  int not null default 0,
  urls_fetched     int not null default 0,
  urls_failed      int not null default 0,
  notes            text
);

create table if not exists intel.pages (
  id               bigserial primary key,
  competitor_id    bigint not null references intel.competitors(id) on delete cascade,
  url              text not null,
  canonical_url    text,
  first_seen_run   bigint references intel.crawl_runs(id),
  last_seen_run    bigint references intel.crawl_runs(id),
  http_status      int,
  page_type        text,                               -- home | service | product | city | blog | tool | directory | legal | other
  lang             text,
  title            text,
  meta_description text,
  h1               text,
  headings         jsonb,                              -- [{"level":2,"text":"..."}]
  word_count       int,
  body_text        text,                               -- analysis only. Do not publish or paraphrase closely.
  text_hash        text,                               -- sha256 of normalised body, detects changes between runs
  schema_types     text[],
  internal_links   jsonb,
  external_links   jsonb,
  image_count      int,
  has_price        boolean,
  has_phone        boolean,
  has_form         boolean,
  published_at     timestamptz,
  modified_at      timestamptz,
  fetched_at       timestamptz not null default now(),
  unique (competitor_id, url)
);
create index if not exists pages_type_idx on intel.pages (competitor_id, page_type);
create index if not exists pages_hash_idx on intel.pages (text_hash);

create table if not exists intel.serp_queries (
  id         bigserial primary key,
  query      text not null,
  gl         text not null default 'pk',
  hl         text not null default 'en',
  location   text not null default 'Pakistan',
  city_slug  text,
  intent     text,
  page_id    text,                                     -- page-map.csv id this query serves, if any
  wave       smallint,
  unique (query, gl, hl, location)
);

create table if not exists intel.serp_snapshots (
  id               bigserial primary key,
  query_id         bigint not null references intel.serp_queries(id) on delete cascade,
  captured_at      timestamptz not null default now(),
  raw              jsonb not null,                     -- full Serper response, kept for re-parsing
  paa              jsonb,                              -- People Also Ask
  related          jsonb,                              -- related searches
  has_local_pack   boolean,
  has_ai_overview  boolean
);
create index if not exists snap_query_idx on intel.serp_snapshots (query_id, captured_at desc);

create table if not exists intel.serp_results (
  id           bigserial primary key,
  snapshot_id  bigint not null references intel.serp_snapshots(id) on delete cascade,
  kind         text not null check (kind in ('organic', 'local_pack', 'news', 'video', 'other')),
  position     int,
  url          text,
  domain       text,
  title        text,
  snippet      text,
  result_type  text,                                   -- brand | local_dealer | directory | marketplace | news | government | social | other
  page_id      bigint references intel.pages(id)       -- set when we have crawled that URL
);
create index if not exists results_domain_idx on intel.serp_results (domain);
create index if not exists results_snapshot_idx on intel.serp_results (snapshot_id, kind, position);

create table if not exists intel.topic_coverage (
  id                  bigserial primary key,
  topic               text not null,                   -- e.g. 'composite cylinder price'
  our_page_id         text,                            -- page-map.csv id, null if we have no page yet
  competitor_id       bigint references intel.competitors(id),
  competitor_page_id  bigint references intel.pages(id),
  status              text not null default 'open' check (status in ('open', 'covered', 'skip_thin', 'skip_irrelevant', 'queued')),
  note                text,
  updated_at          timestamptz not null default now()
);

alter table intel.competitors     enable row level security;
alter table intel.crawl_runs      enable row level security;
alter table intel.pages           enable row level security;
alter table intel.serp_queries    enable row level security;
alter table intel.serp_snapshots  enable row level security;
alter table intel.serp_results    enable row level security;
alter table intel.topic_coverage  enable row level security;
