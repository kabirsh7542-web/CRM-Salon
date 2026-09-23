-- ==============================================================================
-- Migration: 001_initial_schema.sql
-- Description: Hardened Single-Owner Schema for StyleSalon CRM
-- Security: Strict RLS (Owner-only CRUD), security definer with empty search_path
-- Note: Execute this migration in your Supabase SQL Editor.
-- ==============================================================================

-- 1. Helper function for updated_at timestamps (hardened search_path)
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql
security definer
set search_path = '';

-- 2. Profiles table (Authenticated salon personnel / owner)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user' check (role in ('owner', 'user')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger to maintain updated_at on profiles
drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Automatic trigger function to populate profile on new auth user creation (hardened)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Salon User'),
    'user'
  )
  on conflict (id) do update
  set full_name = coalesce(excluded.full_name, public.profiles.full_name),
      updated_at = now();
  return new;
end;
$$ language plpgsql
security definer
set search_path = '';

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. Customers table (Single-salon CRM database)
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null check (trim(name) <> ''),
  phone text not null check (trim(phone) <> ''),
  email text,
  gender text check (gender in ('Female', 'Male', 'Non-binary', 'Other', 'Prefer not to say') or gender is null),
  tags text[] not null default '{}'::text[],
  status text not null default 'active' check (status in ('active', 'blocked', 'opted_out')),
  marketing_consent boolean not null default false,
  consent_date timestamptz,
  last_visit date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint customers_phone_unique unique (phone)
);

-- Trigger to maintain updated_at on customers
drop trigger if exists set_customers_updated_at on public.customers;
create trigger set_customers_updated_at
  before update on public.customers
  for each row execute function public.set_updated_at();

-- Indexes for fast searching, filtering, and ordering
create index if not exists idx_customers_phone on public.customers (phone);
create index if not exists idx_customers_status on public.customers (status);
create index if not exists idx_customers_created_at on public.customers (created_at desc);
create index if not exists idx_customers_name on public.customers using gin (to_tsvector('simple', name));

-- 4. Enable Row Level Security (Mandatory)
alter table public.profiles enable row level security;
alter table public.customers enable row level security;

-- 5. Drop existing policies to ensure idempotent re-runs
drop policy if exists "Authenticated users can read own profile" on public.profiles;
drop policy if exists "Authenticated users can update own profile" on public.profiles;
drop policy if exists "Authenticated users can insert own profile" on public.profiles;

drop policy if exists "Authenticated staff can view customers" on public.customers;
drop policy if exists "Authenticated staff can insert customers" on public.customers;
drop policy if exists "Authenticated staff can update customers" on public.customers;
drop policy if exists "Authenticated staff can delete customers" on public.customers;

drop policy if exists "Owners can view customers" on public.customers;
drop policy if exists "Owners can insert customers" on public.customers;
drop policy if exists "Owners can update customers" on public.customers;
drop policy if exists "Owners can delete customers" on public.customers;

-- 6. RLS Policies: Profiles
-- Authenticated user can read their own profile
create policy "Authenticated users can read own profile"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

-- Authenticated user can update their own profile (cannot self-promote role)
create policy "Authenticated users can update own profile"
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check (
    (select auth.uid()) = id
    and role = (select p.role from public.profiles p where p.id = (select auth.uid()))
  );

-- Authenticated user can insert their own profile
create policy "Authenticated users can insert own profile"
  on public.profiles
  for insert
  to authenticated
  with check ((select auth.uid()) = id);

-- 7. RLS Policies: Customers
-- Strict Single-Owner Model: Access is granted ONLY when the authenticated user
-- has a profile record with role = 'owner'.

-- Owners can view CRM customers
create policy "Owners can view customers"
  on public.customers
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.profiles
      where public.profiles.id = (select auth.uid())
        and public.profiles.role = 'owner'
    )
  );

-- Owners can insert new CRM customers
create policy "Owners can insert customers"
  on public.customers
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.profiles
      where public.profiles.id = (select auth.uid())
        and public.profiles.role = 'owner'
    )
  );

-- Owners can update CRM customers
create policy "Owners can update customers"
  on public.customers
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.profiles
      where public.profiles.id = (select auth.uid())
        and public.profiles.role = 'owner'
    )
  )
  with check (
    exists (
      select 1
      from public.profiles
      where public.profiles.id = (select auth.uid())
        and public.profiles.role = 'owner'
    )
  );

-- Owners can delete CRM customers
create policy "Owners can delete customers"
  on public.customers
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.profiles
      where public.profiles.id = (select auth.uid())
        and public.profiles.role = 'owner'
    )
  );
