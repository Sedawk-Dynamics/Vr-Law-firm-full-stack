-- =====================================================================
-- VR Law Firm — One-shot Supabase setup
-- Copy this entire file and run it in the Supabase Dashboard SQL Editor:
--   https://supabase.com/dashboard/project/whdhezsiymovghjlljzq/sql/new
-- =====================================================================

-- 1. Schema -----------------------------------------------------------

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

-- 2. Row Level Security -----------------------------------------------

alter table public.blogs enable row level security;

drop policy if exists "Public can read published blogs" on public.blogs;
create policy "Public can read published blogs"
  on public.blogs for select
  using (status = 'published');

-- Service role bypasses RLS automatically, so server-side writes work.

-- 3. Seed data --------------------------------------------------------

insert into public.blogs
  (id, slug, title, excerpt, content, category, status, featured_image,
   author, tags, seo_title, meta_description, published_at, featured, reading_minutes, views)
values
(
  'b1',
  'pocso-act-procedural-safeguards-2026',
  'POCSO Act 2026: Procedural Safeguards and the Right to a Fair Trial',
  'An examination of the procedural safeguards courts have reinforced under the POCSO Act, and what defence counsel must consider during cross-examination of vulnerable witnesses.',
  $$<p>The Protection of Children from Sexual Offences (POCSO) Act has, over the last decade, transformed how Indian courts approach child witness testimony. In <em>State v. Anand</em> (2025), the Supreme Court reaffirmed that the right to a fair trial under Article 21 must coexist with the protections owed to child witnesses under Sections 33 and 36 of the POCSO Act.</p>

<h2>The procedural balance</h2>
<p>Defence counsel are frequently caught between two duties: a vigorous cross-examination to test the prosecution's case, and the statutory requirement to avoid intimidation of the child witness.</p>

<blockquote>The dignity of the child witness is not a courtesy — it is a constitutional mandate that runs alongside the accused's right to defend himself fully.</blockquote>

<h2>Three considerations for defence counsel</h2>
<ul>
<li><strong>Pre-trial preparation</strong> — submit a written list of proposed questions to the Special Court for review.</li>
<li><strong>In-camera arrangements</strong> — verify screening and one-way mirror provisions before deposition.</li>
<li><strong>Support persons</strong> — ensure the child has access to a court-appointed support person under Section 39.</li>
</ul>$$,
  'legal-update', 'published',
  'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1600&q=80&auto=format&fit=crop',
  '{"name":"Rahul Raveendran","title":"Lead Counsel","avatar":"/rahul-raveendran-profile.jpg"}'::jsonb,
  array['POCSO','Criminal Defence','Procedure','Supreme Court'],
  'POCSO Act 2026: Procedural Safeguards Explained — VR Law Firm',
  'A practitioner-focused analysis of the 2026 POCSO Act amendments, including procedural safeguards, cross-examination limits, and deposition timelines.',
  '2026-05-12T09:00:00Z', true, 7, 1284
),
(
  'b2',
  'cheque-bounce-section-138-recovery-strategy',
  'Section 138 NI Act: A Recovery Strategy That Actually Works',
  'Most Section 138 complaints stall after the initial summons. We outline a four-stage strategy to convert a cheque dishonour notice into actual recovery.',
  $$<p>The Negotiable Instruments Act offers a powerful remedy for cheque dishonour, but in practice, more than 60% of Section 138 cases are pending for over three years.</p>

<h2>Stage 1: The demand notice</h2>
<p>The 30-day window is non-negotiable. Send the notice by registered post AND speed post AND email.</p>

<h2>Stage 2: The complaint</h2>
<p>File within 30 days of the notice's expiry — but use the time. Annex bank certificates, the original returned cheque, and the dishonour memo.</p>

<h2>Stage 3: Summons and appearance</h2>
<p>If the accused evades service, move for issuance of a non-bailable warrant only after exhausting bailable warrants and proclamation under Section 82 CrPC.</p>

<h2>Stage 4: Settlement leverage</h2>
<p>Most Section 138 cases settle. Frame settlement discussions around realistic recovery — full face value plus 12% interest is the market norm.</p>$$,
  'blog', 'published',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80&auto=format&fit=crop',
  '{"name":"V.R. Raveendran","title":"Supporting Counsel","avatar":"/vr-raveendran-profile.jpg"}'::jsonb,
  array['NI Act','Cheque Bounce','Recovery','Civil Practice'],
  null, null,
  '2026-04-28T09:00:00Z', false, 5, 892
),
(
  'b3',
  'cyber-fraud-fir-registration-kerala-2026',
  'Cyber Fraud Victims in Kerala: A Step-by-Step Guide to FIR Registration',
  'The Kerala Police Cyber Crime cell processes thousands of complaints each month. Here is how to make sure yours actually moves forward.',
  $$<p>If you have lost money to a UPI scam, online investment fraud, or identity theft, the next 72 hours matter more than the next 72 days.</p>

<h2>First hour: freeze the money</h2>
<p>Call the National Cybercrime Helpline (1930) immediately. Funds frozen within 60 minutes are recoverable in roughly 40% of cases; after 24 hours, that drops below 8%.</p>

<h2>Within 24 hours: file the e-FIR</h2>
<p>Use the National Cyber Crime Reporting Portal (cybercrime.gov.in). Attach bank statements, screenshots, UPI transaction IDs, and a short, dated narrative.</p>

<h2>Within 7 days: the section 154 CrPC application</h2>
<p>If the local police station refuses to register an FIR despite the cognizable offence, file a written complaint to the Superintendent of Police under Section 154(3). This is your statutory right, not a favour.</p>$$,
  'blog', 'published',
  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=80&auto=format&fit=crop',
  '{"name":"Rahul Raveendran","title":"Lead Counsel","avatar":"/rahul-raveendran-profile.jpg"}'::jsonb,
  array['Cyber Crime','FIR','IT Act','Victim Support'],
  null, null,
  '2026-04-15T09:00:00Z', false, 6, 2104
),
(
  'b4',
  'case-study-bail-pocso-2025',
  'Securing Bail in a Sensitive POCSO Matter: A Case Study',
  'How structured evidentiary submissions and a focused medical inconsistency argument led to bail in a contested POCSO matter at the Sessions Court.',
  $$<p><em>Names and identifying details have been altered. The narrative is faithful to the legal strategy adopted.</em></p>

<h2>The brief</h2>
<p>A 24-year-old engineering graduate was arrested on a complaint under Sections 7/8 of the POCSO Act. He had been in custody for 47 days when his family approached us.</p>

<h2>What we did differently</h2>
<ol>
<li><strong>Medical record analysis</strong> — the FSL report and the MLR diverged on three material points.</li>
<li><strong>Timeline reconstruction</strong> — call detail records placed the accused 90 km away during the alleged window.</li>
<li><strong>Compliance undertakings</strong> — passport surrender, weekly police reporting, residence within 5 km of the station.</li>
</ol>

<h2>The outcome</h2>
<p>Bail granted on the third application, with conditions. The accused has complied for 11 months and the trial is ongoing.</p>

<blockquote>POCSO bail requires evidentiary specificity, not character submissions.</blockquote>$$,
  'case-study', 'published',
  'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&q=80&auto=format&fit=crop',
  '{"name":"Rahul Raveendran","title":"Lead Counsel","avatar":"/rahul-raveendran-profile.jpg"}'::jsonb,
  array['POCSO','Bail','Case Study','Sessions Court'],
  null, null,
  '2026-03-22T09:00:00Z', false, 6, 1567
),
(
  'b5',
  'family-court-maintenance-2026-amendments',
  'Maintenance Under Section 125 CrPC: What the 2026 Amendments Change',
  'The amended thresholds for interim maintenance, the new evidentiary requirements for income disclosure, and what claimants and respondents need to know.',
  $$<p>The 2026 amendments to Section 125 CrPC introduce three significant procedural changes.</p>

<h2>Interim maintenance ceiling</h2>
<p>The earlier statutory ceiling of Rs 1,500 per month has been replaced with a "reasonable proportion of demonstrated income."</p>

<h2>Income disclosure affidavit</h2>
<p>Both parties must now file a sworn Income Disclosure Affidavit at the first hearing. Concealment carries contempt consequences.</p>

<h2>Timeline for disposal</h2>
<p>The amendments fix a 60-day outer limit for interim orders.</p>$$,
  'legal-update', 'published',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80&auto=format&fit=crop',
  '{"name":"V.R. Raveendran","title":"Supporting Counsel","avatar":"/vr-raveendran-profile.jpg"}'::jsonb,
  array['Family Law','Maintenance','CrPC','Amendments'],
  null, null,
  '2026-03-08T09:00:00Z', false, 5, 743
),
(
  'b6',
  'firm-news-kerala-bar-recognition-2026',
  'VR Law Firm Recognised by the Kerala Bar Council for Excellence in Criminal Practice',
  'The Kerala Bar Council Excellence Awards 2026 named VR Law Firm among the leading criminal practices in the state, citing depth of POCSO work.',
  $$<p>We are honoured to share that VR Law Firm has been recognised by the Kerala Bar Council at its 2026 Excellence Awards.</p>

<h2>The recognition</h2>
<p>The award was conferred at the Kerala Bar Council Convention in Thiruvananthapuram. Lead Counsel Rahul Raveendran received the citation on behalf of the firm.</p>$$,
  'news', 'published',
  'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1600&q=80&auto=format&fit=crop',
  '{"name":"Rahul Raveendran","title":"Lead Counsel","avatar":"/rahul-raveendran-profile.jpg"}'::jsonb,
  array['Firm News','Awards','Kerala Bar Council'],
  null, null,
  '2026-02-18T09:00:00Z', false, 3, 521
),
(
  'b7',
  'land-partition-suit-kerala-procedure',
  'Partition Suits in Kerala: Why So Many Get Stuck at the Preliminary Decree',
  'A partition suit can be in court for fifteen years before anyone sees a metre of land. Here is how the preliminary decree stage gets handled — and mishandled.',
  $$<p>Partition suits are the workhorses of civil practice in Kerala. They are also, statistically, the slowest.</p>

<h2>The two-decree structure</h2>
<p>A partition suit yields two decrees: a preliminary decree determining shares, and a final decree allotting specific land. The preliminary decree alone routinely takes 4-6 years.</p>

<h2>What we recommend</h2>
<p>If your share is clear and you are willing to accept partition by metes and bounds, propose a Mediation Reference under Section 89 CPC at the first hearing.</p>$$,
  'blog', 'published',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80&auto=format&fit=crop',
  '{"name":"V.R. Raveendran","title":"Supporting Counsel","avatar":"/vr-raveendran-profile.jpg"}'::jsonb,
  array['Partition','Civil Practice','Kerala','Mediation'],
  null, null,
  '2026-01-30T09:00:00Z', false, 5, 612
),
(
  'b8',
  'draft-anticipatory-bail-framework-2026',
  'A Practitioner Framework for Anticipatory Bail Applications',
  'Section 438 CrPC is one of the most discretionary provisions in the criminal code. Draft applications that anticipate the court''s concerns.',
  '<p>This is a draft article and is being prepared for publication.</p>',
  'blog', 'draft',
  'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1600&q=80&auto=format&fit=crop',
  '{"name":"Rahul Raveendran","title":"Lead Counsel","avatar":"/rahul-raveendran-profile.jpg"}'::jsonb,
  array['Anticipatory Bail','CrPC'],
  null, null,
  null, false, 4, 0
)
on conflict (id) do nothing;

-- Done. Refresh your /admin/blogs and /insights pages.
