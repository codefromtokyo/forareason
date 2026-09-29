-- For a Reason — Supabase schema. This exact schema is already applied to the live project.
-- Profiles are PUBLIC by default. Enable the Google provider in Supabase Auth to allow sign-in.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  handle text unique, display_name text, home text, bio text,
  reasons text[] not null default '{}', badges jsonb not null default '{}'::jsonb,
  honest_pledge boolean not null default false, is_public boolean not null default true,
  locale text, terms_accepted_at timestamptz, email_opt_in boolean not null default false, last_seen_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.declared_languages (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  language text not null, test text, level text, goal text, note text);
create table public.places (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  country text not null, city text, status text not null check (status in ('living','visited','planned','origin')), reason text, language text);
create table public.progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  course text not null, data jsonb not null, updated_at timestamptz not null default now(),
  primary key (user_id, course));
alter table public.profiles enable row level security;
alter table public.declared_languages enable row level security;
alter table public.places enable row level security;
alter table public.progress enable row level security;
create policy "own profile" on public.profiles for all using (auth.uid()=id) with check (auth.uid()=id);
create policy "own languages" on public.declared_languages for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "own places" on public.places for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "own progress" on public.progress for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "public profiles" on public.profiles for select using (is_public);
create policy "public languages" on public.declared_languages for select using (exists (select 1 from public.profiles p where p.id=user_id and p.is_public));
create policy "public places" on public.places for select using (exists (select 1 from public.profiles p where p.id=user_id and p.is_public));
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into public.profiles (id, display_name, is_public)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name',''), true)
  on conflict (id) do nothing; return new; end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
create or replace view public.public_profiles as select id, handle, display_name, home, locale, updated_at from public.profiles where is_public;
create unique index if not exists profiles_handle_key on public.profiles (handle);
create or replace function public.profile_id_by_handle(h text) returns uuid language sql security definer stable set search_path=public as $$ select id from public.profiles where lower(handle)=lower(h) and is_public limit 1; $$;
grant execute on function public.profile_id_by_handle(text) to anon, authenticated;
grant select on public.public_profiles to anon, authenticated;
