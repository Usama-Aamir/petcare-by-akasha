-- ============================================================
-- Pet Care by Akasha — Supabase Database Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New Query)
-- ============================================================

-- ---------- PROFILES ----------
-- Extends Supabase auth.users with optional admin flag
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  phone       text,
  is_admin    boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Auto-create a profile row when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- PETS ----------
-- Linked to profile (nullable — guests can book without saving a pet profile)
create table if not exists public.pets (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid references public.profiles(id) on delete set null,
  name        text not null,
  species     text not null check (species in ('dog', 'cat', 'small_pet')),
  breed       text,
  age         text,
  weight      text,
  allergies   text,
  notes       text,
  created_at  timestamptz not null default now()
);

-- ---------- CATEGORIES ----------
-- Species → category → subcategory taxonomy (matches requirements doc §11)
create table if not exists public.categories (
  id           uuid primary key default gen_random_uuid(),
  species      text not null check (species in ('cat', 'dog', 'small_pets')),
  category     text not null,
  subcategory  text not null,
  created_at   timestamptz not null default now(),
  unique (species, category, subcategory)
);

-- ---------- PRODUCTS ----------
create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  description  text,
  price        numeric(10, 2) not null check (price >= 0),
  category_id  uuid references public.categories(id) on delete set null,
  stock_qty    integer not null default 0 check (stock_qty >= 0),
  image_url    text,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now()
);

-- ---------- ORDERS ----------
-- Guest checkout: profile_id nullable, customer info stored directly
create table if not exists public.orders (
  id             uuid primary key default gen_random_uuid(),
  profile_id     uuid references public.profiles(id) on delete set null,
  customer_name  text not null,
  customer_phone text not null,
  customer_address text not null,
  status         text not null default 'pending'
                 check (status in ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  payment_method text not null default 'cod' check (payment_method = 'cod'),
  total          numeric(10, 2) not null check (total >= 0),
  created_at     timestamptz not null default now()
);

-- ---------- ORDER ITEMS ----------
create table if not exists public.order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references public.orders(id) on delete cascade,
  product_id  uuid references public.products(id) on delete set null,
  quantity    integer not null check (quantity > 0),
  price       numeric(10, 2) not null check (price >= 0)
);

-- ---------- BOOKINGS ----------
-- Guest booking: profile_id and pet_id nullable
create table if not exists public.bookings (
  id             uuid primary key default gen_random_uuid(),
  profile_id     uuid references public.profiles(id) on delete set null,
  pet_id         uuid references public.pets(id) on delete set null,
  customer_name  text not null,
  customer_phone text not null,
  customer_address text not null,
  pet_name       text,
  pet_species    text check (pet_species in ('dog', 'cat', 'small_pet')),
  preferred_date date not null,
  preferred_time text not null,
  status         text not null default 'requested'
                 check (status in ('requested', 'confirmed', 'completed', 'cancelled')),
  notes          text,
  created_at     timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles    enable row level security;
alter table public.pets        enable row level security;
alter table public.categories  enable row level security;
alter table public.products    enable row level security;
alter table public.orders      enable row level security;
alter table public.order_items enable row level security;
alter table public.bookings    enable row level security;

-- Helper: check if current user is admin
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

-- ---------- PROFILES policies ----------
-- Users can view and update their own profile; admins can see all
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- ---------- PETS policies ----------
-- Users can CRUD their own pets; admins can see all
create policy "pets_select_own_or_admin" on public.pets
  for select using (auth.uid() = profile_id or public.is_admin());

create policy "pets_insert_own" on public.pets
  for insert with check (auth.uid() = profile_id);

create policy "pets_update_own" on public.pets
  for update using (auth.uid() = profile_id);

create policy "pets_delete_own" on public.pets
  for delete using (auth.uid() = profile_id);

-- ---------- CATEGORIES policies ----------
-- Public read (needed for shop browsing); admin write
create policy "categories_select_all" on public.categories
  for select using (true);

create policy "categories_write_admin" on public.categories
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- PRODUCTS policies ----------
-- Public read for active products; admin can manage all
create policy "products_select_active_or_admin" on public.products
  for select using (is_active = true or public.is_admin());

create policy "products_write_admin" on public.products
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- ORDERS policies ----------
-- Users can see their own orders; admins see all
-- Guest orders (profile_id null) are only visible to admin
create policy "orders_select_own_or_admin" on public.orders
  for select using (auth.uid() = profile_id or public.is_admin());

-- Anyone (including guests) can create orders
create policy "orders_insert_anyone" on public.orders
  for insert with check (true);

-- Only admin can update orders (status changes)
create policy "orders_update_admin" on public.orders
  for update using (public.is_admin());

-- ---------- ORDER ITEMS policies ----------
-- Visible if the parent order is visible to the user
create policy "order_items_select_own_or_admin" on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_id
      and (auth.uid() = o.profile_id or public.is_admin())
    )
  );

-- Anyone can create order items (during checkout)
create policy "order_items_insert_anyone" on public.order_items
  for insert with check (true);

-- ---------- BOOKINGS policies ----------
-- Users can see their own bookings; admins see all
-- Guest bookings (profile_id null) are only visible to admin
create policy "bookings_select_own_or_admin" on public.bookings
  for select using (auth.uid() = profile_id or public.is_admin());

-- Anyone (including guests) can create bookings
create policy "bookings_insert_anyone" on public.bookings
  for insert with check (true);

-- Only admin can update bookings (confirm/reschedule/cancel)
create policy "bookings_update_admin" on public.bookings
  for update using (public.is_admin());

-- ============================================================
-- SEED DATA: Product Categories (from requirements doc §11)
-- ============================================================

insert into public.categories (species, category, subcategory) values
  -- Cat
  ('cat', 'Food & Treats', 'Dry Cat Food'),
  ('cat', 'Food & Treats', 'Wet Cat Food'),
  ('cat', 'Food & Treats', 'Cat Treats'),
  ('cat', 'Food & Treats', 'Milk'),
  ('cat', 'Food & Treats', 'Catnip & Cat Grass'),
  ('cat', 'Hygiene & Litter', 'Cat Litter'),
  ('cat', 'Hygiene & Litter', 'Litter Boxes & Scoops'),
  ('cat', 'Hygiene & Litter', 'Shampoo & Conditioner'),
  ('cat', 'Hygiene & Litter', 'Grooming Tools'),
  ('cat', 'Hygiene & Litter', 'Pet Wipes'),
  ('cat', 'Healthcare', 'Flea & Tick'),
  ('cat', 'Healthcare', 'Supplements & Vitamins'),
  ('cat', 'Healthcare', 'Dental Care'),
  ('cat', 'Accessories & Toys', 'Cat Toys'),
  ('cat', 'Accessories & Toys', 'Bowls & Feeders'),
  ('cat', 'Accessories & Toys', 'Beds & Mats'),
  ('cat', 'Accessories & Toys', 'Collars & Leashes'),
  ('cat', 'Accessories & Toys', 'Carriers & Cages'),
  ('cat', 'Accessories & Toys', 'Cat Trees & Scratchers'),
  -- Dog
  ('dog', 'Food & Treats', 'Dry Dog Food'),
  ('dog', 'Food & Treats', 'Wet Dog Food'),
  ('dog', 'Food & Treats', 'Dog Treats'),
  ('dog', 'Food & Treats', 'Milk'),
  ('dog', 'Hygiene', 'Pet Wipes'),
  ('dog', 'Hygiene', 'Poop Bags & Dispenser'),
  ('dog', 'Hygiene', 'Shampoo & Conditioner'),
  ('dog', 'Hygiene', 'Grooming Tools'),
  ('dog', 'Healthcare', 'Flea & Tick'),
  ('dog', 'Healthcare', 'Supplements & Vitamins'),
  ('dog', 'Healthcare', 'Dental Care'),
  ('dog', 'Accessories & Toys', 'Beds & Mats'),
  ('dog', 'Accessories & Toys', 'Bowls & Feeders'),
  ('dog', 'Accessories & Toys', 'Collar & Harness'),
  ('dog', 'Accessories & Toys', 'Leashes'),
  ('dog', 'Accessories & Toys', 'Toys'),
  ('dog', 'Accessories & Toys', 'Carriers & Cages'),
  -- Small Pets
  ('small_pets', 'Accessories', 'Cages & Playpens'),
  ('small_pets', 'Accessories', 'Cage Accessories'),
  ('small_pets', 'Accessories', 'Bowls & Feeders'),
  ('small_pets', 'Accessories', 'Hideouts'),
  ('small_pets', 'Accessories', 'Toys'),
  ('small_pets', 'Food & Treats', 'Hay/Seed Mix'),
  ('small_pets', 'Food & Treats', 'Pellets'),
  ('small_pets', 'Food & Treats', 'Treats'),
  ('small_pets', 'Healthcare', 'Vitamins & Supplements'),
  ('small_pets', 'Hygiene', 'Bedding & Litter'),
  ('small_pets', 'Hygiene', 'Cleaners & Sprays')
on conflict (species, category, subcategory) do nothing;
