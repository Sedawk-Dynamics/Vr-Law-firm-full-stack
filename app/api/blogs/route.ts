import { NextResponse } from 'next/server'
import { findAll, insert } from '@/lib/blog-store'
import type { BlogCategory, BlogStatus } from '@/lib/blog-types'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const category = url.searchParams.get('category') as BlogCategory | null
  const status = url.searchParams.get('status') as BlogStatus | null
  const search = url.searchParams.get('search')?.toLowerCase().trim() || ''
  const featuredOnly = url.searchParams.get('featured') === '1'
  const page = Math.max(1, Number(url.searchParams.get('page') || 1))
  const pageSize = Math.min(50, Math.max(1, Number(url.searchParams.get('pageSize') || 12)))

  let rows = await findAll()

  if (category) rows = rows.filter((r) => r.category === category)
  if (status) rows = rows.filter((r) => r.status === status)
  if (featuredOnly) rows = rows.filter((r) => r.featured)
  if (search) {
    rows = rows.filter(
      (r) =>
        r.title.toLowerCase().includes(search) ||
        r.excerpt.toLowerCase().includes(search) ||
        r.tags.some((t) => t.toLowerCase().includes(search)),
    )
  }

  rows = rows.slice().sort((a, b) => {
    const aTime = a.publishedAt ? new Date(a.publishedAt).getTime() : new Date(a.updatedAt).getTime()
    const bTime = b.publishedAt ? new Date(b.publishedAt).getTime() : new Date(b.updatedAt).getTime()
    return bTime - aTime
  })

  const total = rows.length
  const start = (page - 1) * pageSize
  const data = rows.slice(start, start + pageSize)

  return NextResponse.json({ data, total, page, pageSize })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    if (!body?.title) {
      return NextResponse.json({ message: 'Title is required' }, { status: 400 })
    }
    const created = await insert(body)
    return NextResponse.json(created, { status: 201 })
  } catch (err) {
    console.error('POST /api/blogs failed', err)
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })
  }
}
