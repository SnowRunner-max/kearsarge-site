-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Characters Table
create table if not exists characters (
  id text primary key, -- Slug, e.g., 'tundra-seyfert'
  name text not null,
  tagline text,
  dossier jsonb not null default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Character History Table
create table if not exists character_history (
  id uuid primary key default uuid_generate_v4(),
  character_id text references characters(id) on delete cascade not null,
  title text not null,
  body text[] not null default '{}', -- Array of paragraphs
  "order" integer not null default 0,
  created_at timestamptz default now()
);

-- Character Timeline Table
create table if not exists character_timeline (
  id uuid primary key default uuid_generate_v4(),
  character_id text references characters(id) on delete cascade not null,
  title text not null,
  body text[] not null default '{}', -- Array of list items
  "order" integer not null default 0,
  created_at timestamptz default now()
);

-- Character Logs Table
create table if not exists character_logs (
  id uuid primary key default uuid_generate_v4(),
  character_id text references characters(id) on delete cascade not null,
  log_id integer, -- Original ID from frontmatter
  title text not null,
  filed_by text not null,
  date text not null,
  body text not null,
  created_at timestamptz default now()
);

-- RLS Policies (Optional but recommended)
alter table characters enable row level security;
alter table character_history enable row level security;
alter table character_timeline enable row level security;
alter table character_logs enable row level security;

-- Allow public read access
create policy "Public characters are viewable by everyone"
  on characters for select
  using ( true );

create policy "Public history is viewable by everyone"
  on character_history for select
  using ( true );

create policy "Public timeline is viewable by everyone"
  on character_timeline for select
  using ( true );

create policy "Public logs are viewable by everyone"
  on character_logs for select
  using ( true );

-- Allow service role full access (implicit, but good to know)
