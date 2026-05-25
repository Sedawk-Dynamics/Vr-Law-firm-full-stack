import type { BlogInput, BlogPost } from './blog-types'
import { MOCK_BLOGS } from './mock-blogs'
import { estimateReadingMinutes, slugify } from './blog-api'
import { getSupabaseAdmin, isSupabaseConfigured } from './supabase'

const TABLE = 'blogs'

declare global {
  // eslint-disable-next-line no-var
  var __VR_BLOG_STORE__: BlogPost[] | undefined
  // eslint-disable-next-line no-var
  var __VR_BLOG_TABLE_WARNED__: boolean | undefined
}

function getMemoryStore(): BlogPost[] {
  if (!globalThis.__VR_BLOG_STORE__) {
    globalThis.__VR_BLOG_STORE__ = [...MOCK_BLOGS]
  }
  return globalThis.__VR_BLOG_STORE__
}

function isMissingTable(error: { code?: string; message?: string } | null | undefined): boolean {
  if (!error) return false
  if (error.code === 'PGRST205' || error.code === '42P01') return true
  return Boolean(error.message?.includes("Could not find the table"))
}

function warnMissingTableOnce() {
  if (globalThis.__VR_BLOG_TABLE_WARNED__) return
  globalThis.__VR_BLOG_TABLE_WARNED__ = true
  console.warn(
    '\n[VR Law Firm] The Supabase `blogs` table does not exist yet.\n' +
      '              Falling back to the in-memory mock store.\n' +
      '              To enable persistence, run supabase/migrations/setup.sql\n' +
      '              in your Supabase Dashboard SQL Editor.\n',
  )
}

type Row = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: BlogPost['category']
  status: BlogPost['status']
  featured_image: string
  og_image: string | null
  author: BlogPost['author']
  tags: string[]
  seo_title: string | null
  meta_description: string | null
  published_at: string | null
  scheduled_for: string | null
  views: number
  featured: boolean
  reading_minutes: number
  created_at: string
  updated_at: string
}

function toPost(row: Row): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    status: row.status,
    featuredImage: row.featured_image,
    ogImage: row.og_image ?? undefined,
    author: row.author,
    tags: row.tags ?? [],
    seoTitle: row.seo_title ?? undefined,
    metaDescription: row.meta_description ?? undefined,
    publishedAt: row.published_at,
    scheduledFor: row.scheduled_for,
    views: row.views,
    featured: row.featured,
    readingMinutes: row.reading_minutes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function toRow(post: Partial<BlogPost> & { id?: string }): Partial<Row> {
  const row: Partial<Row> = {}
  if (post.id !== undefined) row.id = post.id
  if (post.slug !== undefined) row.slug = post.slug
  if (post.title !== undefined) row.title = post.title
  if (post.excerpt !== undefined) row.excerpt = post.excerpt
  if (post.content !== undefined) row.content = post.content
  if (post.category !== undefined) row.category = post.category
  if (post.status !== undefined) row.status = post.status
  if (post.featuredImage !== undefined) row.featured_image = post.featuredImage
  if (post.ogImage !== undefined) row.og_image = post.ogImage || null
  if (post.author !== undefined) row.author = post.author
  if (post.tags !== undefined) row.tags = post.tags
  if (post.seoTitle !== undefined) row.seo_title = post.seoTitle || null
  if (post.metaDescription !== undefined) row.meta_description = post.metaDescription || null
  if (post.publishedAt !== undefined) row.published_at = post.publishedAt
  if (post.scheduledFor !== undefined) row.scheduled_for = post.scheduledFor ?? null
  if (post.featured !== undefined) row.featured = post.featured
  if (post.readingMinutes !== undefined) row.reading_minutes = post.readingMinutes
  if (post.views !== undefined) row.views = post.views
  return row
}

function genId() {
  return `b${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`
}

export async function findAll(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) return getMemoryStore()
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('updated_at', { ascending: false })
  if (error) {
    if (isMissingTable(error)) {
      warnMissingTableOnce()
      return getMemoryStore()
    }
    console.error('Supabase findAll error:', error)
    return getMemoryStore()
  }
  return (data as Row[]).map(toPost)
}

export async function findById(idOrSlug: string): Promise<BlogPost | undefined> {
  if (!isSupabaseConfigured()) {
    return getMemoryStore().find((b) => b.id === idOrSlug || b.slug === idOrSlug)
  }
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
    .limit(1)
    .maybeSingle()
  if (error) {
    if (isMissingTable(error)) {
      warnMissingTableOnce()
      return getMemoryStore().find((b) => b.id === idOrSlug || b.slug === idOrSlug)
    }
    console.error('Supabase findById error:', error)
    return undefined
  }
  return data ? toPost(data as Row) : undefined
}

export async function insert(input: BlogInput): Promise<BlogPost> {
  const id = genId()
  const slug = input.slug?.trim() || slugify(input.title)
  const readingMinutes = input.readingMinutes || estimateReadingMinutes(input.content || '')

  function fallbackInsert(): BlogPost {
    const store = getMemoryStore()
    const now = new Date().toISOString()
    const post: BlogPost = {
      ...input,
      id,
      slug,
      readingMinutes,
      createdAt: now,
      updatedAt: now,
      views: 0,
    }
    store.unshift(post)
    return post
  }

  if (!isSupabaseConfigured()) return fallbackInsert()

  const supabase = getSupabaseAdmin()
  const row = toRow({ ...input, id, slug, readingMinutes })
  const { data, error } = await supabase.from(TABLE).insert(row).select('*').single()
  if (error || !data) {
    if (isMissingTable(error)) {
      warnMissingTableOnce()
      return fallbackInsert()
    }
    console.error('Supabase insert error:', error)
    throw new Error(error?.message || 'Failed to insert blog')
  }
  return toPost(data as Row)
}

export async function update(
  id: string,
  patch: Partial<BlogInput>,
): Promise<BlogPost | undefined> {
  function fallbackUpdate(): BlogPost | undefined {
    const store = getMemoryStore()
    const idx = store.findIndex((b) => b.id === id)
    if (idx === -1) return undefined
    const existing = store[idx]
    const merged: BlogPost = {
      ...existing,
      ...patch,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
      readingMinutes:
        patch.content !== undefined
          ? estimateReadingMinutes(patch.content)
          : existing.readingMinutes,
    }
    store[idx] = merged
    return merged
  }

  if (!isSupabaseConfigured()) return fallbackUpdate()

  const supabase = getSupabaseAdmin()
  const row = toRow(patch)
  if (patch.content !== undefined) {
    row.reading_minutes = estimateReadingMinutes(patch.content)
  }
  const { data, error } = await supabase
    .from(TABLE)
    .update(row)
    .eq('id', id)
    .select('*')
    .maybeSingle()
  if (error) {
    if (isMissingTable(error)) {
      warnMissingTableOnce()
      return fallbackUpdate()
    }
    console.error('Supabase update error:', error)
    return undefined
  }
  return data ? toPost(data as Row) : undefined
}

export async function remove(id: string): Promise<boolean> {
  function fallbackRemove(): boolean {
    const store = getMemoryStore()
    const idx = store.findIndex((b) => b.id === id)
    if (idx === -1) return false
    store.splice(idx, 1)
    return true
  }

  if (!isSupabaseConfigured()) return fallbackRemove()

  const supabase = getSupabaseAdmin()
  const { error, count } = await supabase
    .from(TABLE)
    .delete({ count: 'exact' })
    .eq('id', id)
  if (error) {
    if (isMissingTable(error)) {
      warnMissingTableOnce()
      return fallbackRemove()
    }
    console.error('Supabase remove error:', error)
    return false
  }
  return (count ?? 0) > 0
}
