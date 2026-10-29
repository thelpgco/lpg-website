-- Lead table for THE LPG CO. PAKISTAN. Run in the Supabase SQL editor.
-- It records what the visitor agreed to (consent version and time), which page and source produced the lead, and what
-- happened to it afterwards (Method Step 14 and Step 20). If you already created an earlier version of this table,
-- run the ALTER block at the bottom instead.
create table if not exists public.lpg_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- what the visitor sent
  name text not null,
  phone text not null,            -- normalised +92XXXXXXXXXX
  city text not null,             -- city slug or 'other: <text>'
  request_type text not null,     -- cylinder_delivery | composite_cylinder | new_connection | commercial_supply | bulk_industrial | appliances | engineering | distributor | other
  kind text not null default 'customer',   -- customer | engineering | distributor (routes to separate queues)
  cylinder_size text,
  details text,

  -- consent record
  consent boolean not null default false,
  consent_version text,           -- wording version shown at submit time (lib/lead-options.ts CONSENT_VERSION)
  consent_at timestamptz,

  -- where it came from
  source_page text,               -- path of the page with the form
  page_id text,                   -- page-map id, e.g. PR-001
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer_host text,
  landing_path text,              -- first page of the session

  -- what happened next (filled by staff)
  status text not null default 'new',     -- new | contacted | qualified | assigned | delivered | lost | spam
  first_contact_at timestamptz,           -- speed-to-lead = first_contact_at - created_at
  assigned_partner text,                  -- who fulfils it: own supply, a partner, or a referral
  role_played text,                       -- marketer | reseller | referral (the "three hats" disclosure)
  outcome_at timestamptz,
  order_value_pkr numeric,
  lost_reason text,
  notes text
);

-- The API route uses the service role key, which bypasses RLS.
-- Enabling RLS with no policies blocks all access from the public anon key.
alter table public.lpg_leads enable row level security;

create index if not exists lpg_leads_created_at_idx on public.lpg_leads (created_at desc);
create index if not exists lpg_leads_status_idx on public.lpg_leads (status);
create index if not exists lpg_leads_kind_idx on public.lpg_leads (kind);
create index if not exists lpg_leads_page_id_idx on public.lpg_leads (page_id);

-- Upgrade block for an earlier version of the table (run only the lines for columns you do not have):
-- alter table public.lpg_leads add column if not exists consent_version text;
-- alter table public.lpg_leads add column if not exists consent_at timestamptz;
-- alter table public.lpg_leads add column if not exists page_id text;
-- alter table public.lpg_leads add column if not exists utm_source text;
-- alter table public.lpg_leads add column if not exists utm_medium text;
-- alter table public.lpg_leads add column if not exists utm_campaign text;
-- alter table public.lpg_leads add column if not exists referrer_host text;
-- alter table public.lpg_leads add column if not exists landing_path text;
-- alter table public.lpg_leads add column if not exists first_contact_at timestamptz;
-- alter table public.lpg_leads add column if not exists outcome_at timestamptz;
-- alter table public.lpg_leads add column if not exists order_value_pkr numeric;
-- alter table public.lpg_leads add column if not exists lost_reason text;
-- alter table public.lpg_leads add column if not exists notes text;
