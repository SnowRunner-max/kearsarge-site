create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique,
  display_name text,
  profile jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_users
before update on public.users
for each row execute function public.set_updated_at();

create type if not exists public.lore_source as enum ('dossier', 'history', 'timeline', 'log');

create table public.characters (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  owner_id uuid not null references public.users (id) on delete cascade,
  hero jsonb not null,
  dossier jsonb not null,
  profile jsonb not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger set_updated_at_characters
before update on public.characters
for each row execute function public.set_updated_at();

create table public.character_art (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references public.characters (id) on delete cascade,
  owner_id uuid not null references public.users (id) on delete cascade,
  title text,
  image_url text not null,
  alt_text text,
  metadata jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index character_art_character_id_idx on public.character_art (character_id);
create index character_art_owner_id_idx on public.character_art (owner_id);

create table public.lore_entries (
  id uuid primary key default gen_random_uuid(),
  character_id uuid not null references public.characters (id) on delete cascade,
  slug text not null,
  source public.lore_source not null,
  title text not null,
  content text not null,
  tags text[] not null default '{}',
  order_index integer,
  metadata jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create unique index lore_entries_character_slug_idx on public.lore_entries (character_id, slug);
create index lore_entries_character_source_idx on public.lore_entries (character_id, source, order_index);

create table public.scenarios (
  id uuid primary key default gen_random_uuid(),
  character_id uuid references public.characters (id) on delete set null,
  owner_id uuid not null references public.users (id) on delete cascade,
  name text not null,
  description text,
  metadata jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger set_updated_at_scenarios
before update on public.scenarios
for each row execute function public.set_updated_at();

create table public.scenario_lore (
  scenario_id uuid not null references public.scenarios (id) on delete cascade,
  lore_entry_id uuid not null references public.lore_entries (id) on delete cascade,
  metadata jsonb,
  primary key (scenario_id, lore_entry_id)
);

comment on table public.users is 'Application profiles referencing Supabase auth.users.';
comment on table public.characters is 'Playable/non-playable character dossiers and metadata.';
comment on table public.character_art is 'Artwork records linked to characters and their owners.';
comment on table public.lore_entries is 'Markdown-sourced lore entries and chat context slices.';
comment on table public.scenarios is 'Interactive story or RP scenarios authored by users.';
comment on table public.scenario_lore is 'Join table connecting scenarios to lore entries for context.';
