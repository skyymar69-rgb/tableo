-- ============================================================================
-- Tableo — Initial schema (Phase 2: core tables + auth)
-- Run this in the Supabase SQL Editor
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. profiles (extends auth.users with public info)
-- ----------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  avatar_url text,
  locale text default 'fr',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile when a user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 2. restaurants
-- ----------------------------------------------------------------------------
create table public.restaurants (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  address text,
  city text,
  country_code text default 'FR',
  phone text,
  email text,
  logo_url text,
  cover_url text,
  currency text not null default 'EUR',
  timezone text not null default 'Europe/Paris',
  default_locale text not null default 'fr',
  enabled_locales text[] not null default array['fr']::text[],
  theme jsonb default '{}'::jsonb,
  is_published boolean not null default false,
  plan text not null default 'starter' check (plan in ('starter','pro','business')),
  owner_id uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index restaurants_owner_idx on public.restaurants(owner_id);
create index restaurants_slug_idx on public.restaurants(slug);

alter table public.restaurants enable row level security;

-- Public restaurants (is_published=true) are viewable by anyone for menu pages
create policy "Published restaurants are public"
  on public.restaurants for select
  using (is_published = true);

-- Owners + members can see their restaurants (even unpublished)
create policy "Members can view their restaurants"
  on public.restaurants for select
  using (
    auth.uid() = owner_id
    or exists (
      select 1 from public.restaurant_members rm
      where rm.restaurant_id = restaurants.id and rm.user_id = auth.uid()
    )
  );

create policy "Owners can insert restaurants"
  on public.restaurants for insert
  with check (auth.uid() = owner_id);

create policy "Owners and admins can update restaurants"
  on public.restaurants for update
  using (
    auth.uid() = owner_id
    or exists (
      select 1 from public.restaurant_members rm
      where rm.restaurant_id = restaurants.id
        and rm.user_id = auth.uid()
        and rm.role in ('owner','admin')
    )
  );

create policy "Owners can delete restaurants"
  on public.restaurants for delete
  using (auth.uid() = owner_id);

-- ----------------------------------------------------------------------------
-- 3. restaurant_members (multi-user per restaurant, roles)
-- ----------------------------------------------------------------------------
create table public.restaurant_members (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'staff' check (role in ('owner','admin','manager','staff')),
  invited_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  unique(restaurant_id, user_id)
);

create index rm_restaurant_idx on public.restaurant_members(restaurant_id);
create index rm_user_idx on public.restaurant_members(user_id);

alter table public.restaurant_members enable row level security;

create policy "Members can view their memberships"
  on public.restaurant_members for select
  using (
    auth.uid() = user_id
    or exists (
      select 1 from public.restaurants r
      where r.id = restaurant_members.restaurant_id and r.owner_id = auth.uid()
    )
  );

create policy "Restaurant owners can manage members"
  on public.restaurant_members for all
  using (
    exists (
      select 1 from public.restaurants r
      where r.id = restaurant_members.restaurant_id and r.owner_id = auth.uid()
    )
  );

-- Auto-create owner membership when a restaurant is created
create or replace function public.handle_new_restaurant()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.restaurant_members (restaurant_id, user_id, role)
  values (new.id, new.owner_id, 'owner')
  on conflict (restaurant_id, user_id) do nothing;
  return new;
end;
$$;

create trigger on_restaurant_created
  after insert on public.restaurants
  for each row execute function public.handle_new_restaurant();

-- ----------------------------------------------------------------------------
-- 4. updated_at triggers
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger restaurants_set_updated_at
  before update on public.restaurants
  for each row execute function public.set_updated_at();

-- ============================================================================
-- Done. Next migration will add: categories, menu_items, variants, allergens,
-- tables, qr_codes, orders, customers, reviews, analytics, translations.
-- ============================================================================
