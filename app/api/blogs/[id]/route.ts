import { NextResponse } from 'next/server'
import { findById, remove, update } from '@/lib/blog-store'

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_req: Request, ctx: RouteContext) {
  const { id } = await ctx.params
  const post = await findById(id)
  if (!post) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: Request, ctx: RouteContext) {
  try {
    const { id } = await ctx.params
    const patch = await req.json()
    const updated = await update(id, patch)
    if (!updated) return NextResponse.json({ message: 'Not found' }, { status: 404 })
    return NextResponse.json(updated)
  } catch (err) {
    console.error('PUT /api/blogs/[id] failed', err)
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 })
  }
}

export async function DELETE(_req: Request, ctx: RouteContext) {
  const { id } = await ctx.params
  const ok = await remove(id)
  if (!ok) return NextResponse.json({ message: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
