-- VR Law Firm — Blogs table
-- Run this in the Supabase SQL editor (Project → SQL → New query)
-- or via `supabase db push` if using the Supabase CLI.

create table if not exists public.blogs (
  id              text primary key,
  slug            text unique not null,
  title           text not null,
  excerpt         text not null default '',
  content         text not null default '',
  category        text not null check (category in ('blog','case-study','legal-update','news')),
  status          text not null check (status in ('draft','published')) default 'draft',
  featured_image  text not null default '',
  og_image        text,
  author          jsonb not null default '{}'::jsonb,
  tags            text[] not null default '{}',
  seo_title       text,
  meta_description text,
  published_at    timestamptz,
  scheduled_for   timestamptz,
  views           integer not null default 0,
  featured        boolean not null default false,
  reading_minutes integer not null default 1,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists blogs_status_idx        on public.blogs (status);
create index if not exists blogs_category_idx      on public.blogs (category);
create index if not exists blogs_published_at_idx  on public.blogs (published_at desc);
create index if not exists blogs_featured_idx      on public.blogs (featured) where featured = true;

-- updated_at trigger
create or replace function public.set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists blogs_set_updated_at on public.blogs;
create trigger blogs_set_updated_at
before update on public.blogs
for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.blogs enable row level security;

-- Public can read only published articles.
drop policy if exists "Public can read published blogs" on public.blogs;
create policy "Public can read published blogs"
  on public.blogs for select
  using (status = 'published');

-- The service role bypasses RLS automatically, so writes from the API routes work.
-- For authenticated admin users (when you wire Supabase Auth), grant them broader access:
--
-- create policy "Admins can do everything"
--   on public.blogs for all
--   using (auth.jwt() ->> 'role' = 'admin')
--   with check (auth.jwt() ->> 'role' = 'admin');
