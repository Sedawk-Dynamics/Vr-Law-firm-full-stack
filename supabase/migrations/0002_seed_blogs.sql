-- Optional seed data for VR Law Firm.
-- Run after 0001_create_blogs.sql if you want sample posts.

insert into public.blogs (id, slug, title, excerpt, content, category, status, featured_image, author, tags, published_at, featured, reading_minutes)
values
(
  'b1',
  'pocso-act-procedural-safeguards-2026',
  'POCSO Act 2026: Procedural Safeguards and the Right to a Fair Trial',
  'An examination of the procedural safeguards courts have reinforced under the POCSO Act, and what defence counsel must consider during cross-examination of vulnerable witnesses.',
  '<p>The Protection of Children from Sexual Offences (POCSO) Act has, over the last decade, transformed how Indian courts approach child witness testimony.</p>',
  'legal-update',
  'published',
  'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1600&q=80&auto=format&fit=crop',
  '{"name":"Rahul Raveendran","title":"Lead Counsel","avatar":"/rahul-raveendran-profile.jpg"}'::jsonb,
  array['POCSO','Criminal Defence','Procedure','Supreme Court'],
  '2026-05-12T09:00:00Z',
  true,
  7
),
(
  'b2',
  'cheque-bounce-section-138-recovery-strategy',
  'Section 138 NI Act: A Recovery Strategy That Actually Works',
  'Most Section 138 complaints stall after the initial summons. We outline a four-stage strategy.',
  '<p>The Negotiable Instruments Act offers a powerful remedy for cheque dishonour.</p>',
  'blog',
  'published',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80&auto=format&fit=crop',
  '{"name":"V.R. Raveendran","title":"Supporting Counsel","avatar":"/vr-raveendran-profile.jpg"}'::jsonb,
  array['NI Act','Cheque Bounce','Recovery'],
  '2026-04-28T09:00:00Z',
  false,
  5
)
on conflict (id) do nothing;
