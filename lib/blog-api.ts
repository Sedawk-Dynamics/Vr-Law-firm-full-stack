import type {
  BlogFilters,
  BlogInput,
  BlogListResponse,
  BlogPost,
} from './blog-types'

function buildQuery(filters: BlogFilters = {}) {
  const params = new URLSearchParams()
  if (filters.category && filters.category !== 'all') params.set('category', filters.category)
  if (filters.status && filters.status !== 'all') params.set('status', filters.status)
  if (filters.search) params.set('search', filters.search)
  if (filters.page) params.set('page', String(filters.page))
  if (filters.pageSize) params.set('pageSize', String(filters.pageSize))
  if (filters.featured) params.set('featured', '1')
  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

async function safeJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Request failed: ${res.status}`
    try {
      const body = await res.json()
      if (body?.message) message = body.message
    } catch {}
    throw new Error(message)
  }
  return res.json() as Promise<T>
}

export async function listBlogs(filters: BlogFilters = {}): Promise<BlogListResponse> {
  const res = await fetch(`/api/blogs${buildQuery(filters)}`, { cache: 'no-store' })
  return safeJson<BlogListResponse>(res)
}

export async function getBlog(id: string): Promise<BlogPost> {
  const res = await fetch(`/api/blogs/${id}`, { cache: 'no-store' })
  return safeJson<BlogPost>(res)
}

export async function createBlog(input: BlogInput): Promise<BlogPost> {
  const res = await fetch('/api/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return safeJson<BlogPost>(res)
}

export async function updateBlog(id: string, input: Partial<BlogInput>): Promise<BlogPost> {
  const res = await fetch(`/api/blogs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return safeJson<BlogPost>(res)
}

export async function deleteBlog(id: string): Promise<{ success: true }> {
  const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
  return safeJson<{ success: true }>(res)
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export function formatDate(iso: string | null | undefined, opts?: Intl.DateTimeFormatOptions): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...opts,
  })
}

export function estimateReadingMinutes(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').trim()
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}
