-- Currency Strength Meter API platform schema
-- Run this once in the Supabase project's SQL Editor (Database > SQL Editor > New query).
-- Safe to re-run: uses IF NOT EXISTS / ON CONFLICT guards.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Plans (static reference data)
-- ---------------------------------------------------------------------------
create table if not exists public.plans (
  id text primary key, -- 'free' | 'pro' | 'unlimited'
  name text not null,
  price_usd numeric(10,2) not null default 0,
  monthly_request_limit integer,      -- null = unlimited requests per period
  trial_request_limit integer,        -- lifetime cap for the free plan (null for paid plans)
  is_recurring boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.plans (id, name, price_usd, monthly_request_limit, trial_request_limit, is_recurring)
values
  ('free', 'Free Trial', 0, null, 100, false),
  ('pro', 'Pro', 10, 10000, null, true),
  ('unlimited', 'Unlimited', 50, null, null, true)
on conflict (id) do update set
  name = excluded.name,
  price_usd = excluded.price_usd,
  monthly_request_limit = excluded.monthly_request_limit,
  trial_request_limit = excluded.trial_request_limit,
  is_recurring = excluded.is_recurring;

-- ---------------------------------------------------------------------------
-- Profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Subscriptions (current plan state per user - one row per user)
-- ---------------------------------------------------------------------------
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  plan_id text not null references public.plans(id),
  status text not null default 'active', -- active | expired | cancelled
  paypal_subscription_id text,
  paypal_order_id text,
  current_period_start timestamptz not null default now(),
  current_period_end timestamptz, -- null for free trial (capped by trial_request_limit instead)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- API keys (one active key per user at a time; old ones revoked on regenerate)
-- ---------------------------------------------------------------------------
create table if not exists public.api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  key_prefix text not null,   -- short, safe-to-display prefix e.g. csm_live_ab12cd34
  key_hash text not null,     -- sha256 hex hash of the full key; plaintext is never stored
  status text not null default 'active', -- active | revoked
  created_at timestamptz not null default now(),
  revoked_at timestamptz
);
create index if not exists api_keys_user_id_idx on public.api_keys (user_id);
create unique index if not exists api_keys_key_hash_idx on public.api_keys (key_hash);

-- ---------------------------------------------------------------------------
-- Usage counters (current billing period usage per api key)
-- ---------------------------------------------------------------------------
create table if not exists public.usage_counters (
  api_key_id uuid primary key references public.api_keys(id) on delete cascade,
  period_start timestamptz not null default now(),
  period_end timestamptz,     -- null = lifetime counter (free trial)
  request_count integer not null default 0,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- PayPal webhook idempotency log
-- ---------------------------------------------------------------------------
create table if not exists public.paypal_webhook_events (
  event_id text primary key,
  event_type text not null,
  payload jsonb,
  received_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Role privileges
-- Bypassing RLS (service_role) does not imply table-level access - Postgres
-- still checks GRANTs independently. Without these, admin-client writes fail
-- with "permission denied" (42501) even though RLS would otherwise allow it.
-- ---------------------------------------------------------------------------
grant usage on schema public to anon, authenticated, service_role;

grant select, insert, update, delete on
  public.profiles, public.subscriptions, public.api_keys,
  public.usage_counters, public.paypal_webhook_events, public.plans
  to service_role;

grant select on public.plans to anon, authenticated;
grant select on public.profiles, public.subscriptions, public.api_keys, public.usage_counters to authenticated;
grant update on public.profiles to authenticated;

alter default privileges in schema public grant select, insert, update, delete on tables to service_role;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- All writes (key creation, usage increments, subscription changes) happen
-- server-side using the Supabase service role key, which bypasses RLS.
-- These policies only allow each signed-in user to READ their own rows.
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.api_keys enable row level security;
alter table public.usage_counters enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "subscriptions_select_own" on public.subscriptions;
create policy "subscriptions_select_own" on public.subscriptions
  for select using (auth.uid() = user_id);

drop policy if exists "api_keys_select_own" on public.api_keys;
create policy "api_keys_select_own" on public.api_keys
  for select using (auth.uid() = user_id);

drop policy if exists "usage_counters_select_own" on public.usage_counters;
create policy "usage_counters_select_own" on public.usage_counters
  for select using (
    exists (
      select 1 from public.api_keys k
      where k.id = usage_counters.api_key_id and k.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- Auto-provision a profile + free subscription when a new user signs up
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;

  insert into public.subscriptions (user_id, plan_id, current_period_start, current_period_end)
  values (new.id, 'free', now(), null)
  on conflict (user_id) do nothing;

  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Backfill: the trigger above only fires for NEW signups, so any accounts
-- created before this schema was applied need their rows created manually.
-- ---------------------------------------------------------------------------
insert into public.profiles (id, email, full_name)
select u.id, u.email, u.raw_user_meta_data->>'full_name'
from auth.users u
on conflict (id) do nothing;

insert into public.subscriptions (user_id, plan_id, current_period_start, current_period_end)
select u.id, 'free', now(), null
from auth.users u
on conflict (user_id) do nothing;
