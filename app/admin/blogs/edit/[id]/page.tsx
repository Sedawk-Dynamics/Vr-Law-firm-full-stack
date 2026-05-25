import { notFound } from 'next/navigation'
import { findById } from '@/lib/blog-store'
import { BlogForm } from '@/components/admin/blog-form'

export const dynamic = 'force-dynamic'

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await findById(id)
  if (!post) notFound()
  return <BlogForm initial={post} />
}
