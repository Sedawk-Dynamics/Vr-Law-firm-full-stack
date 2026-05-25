'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Edit3,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
  FileText,
} from 'lucide-react'
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  type BlogCategory,
  type BlogPost,
} from '@/lib/blog-types'
import {
  createBlog,
  deleteBlog,
  formatDate,
  listBlogs,
  updateBlog,
} from '@/lib/blog-api'

type FilterCat = BlogCategory | 'all'

export function BlogTable() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState<FilterCat>('all')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const pageSize = 8

  useEffect(() => {
    const q = searchParams.get('q') ?? ''
    setQuery(q)
    setPage(1)
  }, [searchParams])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const res = await listBlogs({ pageSize: 100 })
      setPosts(res.data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (!q) return true
      return p.title.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
    })
  }, [posts, query, category])

  const total = filtered.length
  const pages = Math.max(1, Math.ceil(total / pageSize))
  const view = filtered.slice((page - 1) * pageSize, page * pageSize)

  useEffect(() => {
    if (page > pages) setPage(1)
  }, [pages, page])

  async function togglePublish(p: BlogPost) {
    const next = p.status === 'published' ? 'draft' : 'published'
    await updateBlog(p.id, {
      status: next,
      publishedAt: next === 'published' ? p.publishedAt ?? new Date().toISOString() : p.publishedAt,
    })
    load()
  }

  async function duplicate(p: BlogPost) {
    await createBlog({
      ...p,
      title: `${p.title} (Copy)`,
      slug: `${p.slug}-copy`,
      status: 'draft',
      publishedAt: null,
      featured: false,
    })
    load()
  }

  async function remove(id: string) {
    await deleteBlog(id)
    setConfirmDelete(null)
    setSelected((s) => {
      const next = new Set(s)
      next.delete(id)
      return next
    })
    load()
  }

  async function bulkDelete() {
    await Promise.all([...selected].map((id) => deleteBlog(id)))
    setSelected(new Set())
    load()
  }

  async function bulkPublish() {
    await Promise.all(
      [...selected].map((id) => {
        const p = posts.find((x) => x.id === id)
        if (!p) return Promise.resolve()
        return updateBlog(id, {
          status: 'published',
          publishedAt: p.publishedAt ?? new Date().toISOString(),
        })
      }),
    )
    setSelected(new Set())
    load()
  }

  function toggleSelectAll() {
    if (view.every((p) => selected.has(p.id))) {
      const next = new Set(selected)
      view.forEach((p) => next.delete(p.id))
      setSelected(next)
    } else {
      const next = new Set(selected)
      view.forEach((p) => next.add(p.id))
      setSelected(next)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory/40"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or tag…"
            className="w-full bg-[oklch(0.12_0.018_255)] border border-ivory/10 focus:border-gold rounded pl-10 pr-4 py-2.5 text-ivory text-sm outline-none placeholder:text-ivory/35"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-ivory/40" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as FilterCat)}
            className="bg-[oklch(0.12_0.018_255)] border border-ivory/10 focus:border-gold rounded px-3 py-2.5 text-ivory text-sm outline-none"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            <option value="all" className="bg-navy">All categories</option>
            {CATEGORY_ORDER.map((c) => (
              <option key={c} value={c} className="bg-navy">
                {CATEGORY_META[c].label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selected.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-3 bg-gold/10 border border-gold/30 px-4 py-3 rounded"
        >
          <span className="text-gold text-sm">
            {selected.size} selected
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={bulkPublish}
              className="px-3 py-1.5 border border-gold/40 text-gold hover:bg-gold/10 transition-colors rounded text-[11px] tracking-[0.22em] uppercase"
            >
              Publish
            </button>
            <button
              onClick={bulkDelete}
              className="px-3 py-1.5 border border-red-400/30 text-red-300 hover:bg-red-400/10 transition-colors rounded text-[11px] tracking-[0.22em] uppercase"
            >
              Delete
            </button>
          </div>
        </motion.div>
      )}

      <div className="bg-[oklch(0.12_0.018_255)] border border-ivory/10 rounded overflow-hidden">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={load} />
        ) : view.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ivory/10 bg-ivory/[0.02]">
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={view.length > 0 && view.every((p) => selected.has(p.id))}
                        onChange={toggleSelectAll}
                        className="accent-gold"
                        aria-label="Select all on this page"
                      />
                    </th>
                    {['Thumbnail', 'Title', 'Category', 'Status', 'Date', 'Author', 'Actions'].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-gold text-[10px] tracking-[0.25em] uppercase font-medium"
                          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {view.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-ivory/5 hover:bg-ivory/[0.02] transition-colors"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selected.has(p.id)}
                          onChange={(e) => {
                            const next = new Set(selected)
                            if (e.target.checked) next.add(p.id)
                            else next.delete(p.id)
                            setSelected(next)
                          }}
                          className="accent-gold"
                          aria-label={`Select ${p.title}`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div
                          className="w-14 h-10 bg-cover bg-center border border-ivory/10"
                          style={{ backgroundImage: `url(${p.featuredImage})` }}
                        />
                      </td>
                      <td className="px-4 py-3 max-w-md">
                        <Link
                          href={`/admin/blogs/edit/${p.id}`}
                          className="text-ivory hover:text-gold transition-colors line-clamp-1 font-medium"
                        >
                          {p.title}
                        </Link>
                        <p
                          className="text-ivory/40 text-xs mt-0.5"
                          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                        >
                          /{p.slug}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-ivory/65 text-xs tracking-wider uppercase"
                          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                        >
                          {CATEGORY_META[p.category].label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={p.status} />
                      </td>
                      <td
                        className="px-4 py-3 text-ivory/55 text-xs"
                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                      >
                        {formatDate(p.publishedAt ?? p.updatedAt)}
                      </td>
                      <td
                        className="px-4 py-3 text-ivory/65 text-xs"
                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                      >
                        {p.author.name}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <RowAction
                            label={p.status === 'published' ? 'Unpublish' : 'Publish'}
                            Icon={p.status === 'published' ? EyeOff : Eye}
                            onClick={() => togglePublish(p)}
                          />
                          <RowAction label="Duplicate" Icon={Copy} onClick={() => duplicate(p)} />
                          <Link
                            href={`/admin/blogs/edit/${p.id}`}
                            className="w-8 h-8 rounded text-ivory/55 hover:text-gold hover:bg-gold/10 transition-colors flex items-center justify-center"
                            aria-label="Edit"
                          >
                            <Edit3 size={14} />
                          </Link>
                          <RowAction
                            label="Delete"
                            Icon={Trash2}
                            onClick={() => setConfirmDelete(p.id)}
                            danger
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-ivory/10 text-xs text-ivory/55">
              <span style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-8 h-8 rounded text-ivory/55 hover:text-gold disabled:opacity-30 disabled:hover:text-ivory/55 transition-colors flex items-center justify-center"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={14} />
                </button>
                <span className="px-3 text-ivory">{page} / {pages}</span>
                <button
                  onClick={() => setPage((p) => Math.min(pages, p + 1))}
                  disabled={page === pages}
                  className="w-8 h-8 rounded text-ivory/55 hover:text-gold disabled:opacity-30 disabled:hover:text-ivory/55 transition-colors flex items-center justify-center"
                  aria-label="Next page"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(confirmDelete)}
        title="Delete this article?"
        description="This will permanently remove the article. This action cannot be undone."
        onCancel={() => setConfirmDelete(null)}
        onConfirm={() => confirmDelete && remove(confirmDelete)}
      />
    </div>
  )
}

function RowAction({
  label,
  Icon,
  onClick,
  danger,
}: {
  label: string
  Icon: typeof Edit3
  onClick: () => void
  danger?: boolean
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`w-8 h-8 rounded transition-colors flex items-center justify-center ${
        danger
          ? 'text-ivory/55 hover:text-red-300 hover:bg-red-400/10'
          : 'text-ivory/55 hover:text-gold hover:bg-gold/10'
      }`}
    >
      <Icon size={14} />
    </button>
  )
}

function StatusBadge({ status }: { status: BlogPost['status'] }) {
  const isPublished = status === 'published'
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] tracking-[0.2em] uppercase ${
        isPublished
          ? 'bg-gold/10 text-gold border border-gold/30'
          : 'bg-ivory/5 text-ivory/65 border border-ivory/15'
      }`}
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? 'bg-gold' : 'bg-ivory/55'}`} />
      {status}
    </span>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-ivory/45">
      <Loader2 size={20} className="animate-spin text-gold" />
      <p className="text-sm" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        Loading articles…
      </p>
    </div>
  )
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center px-6">
      <p className="text-red-300 text-sm">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 border border-gold/40 text-gold rounded text-[11px] tracking-[0.22em] uppercase hover:bg-gold/10 transition-colors"
      >
        Retry
      </button>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-5 text-center px-6">
      <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center text-gold">
        <FileText size={20} />
      </div>
      <h3 className="text-ivory text-lg font-light">No articles match these filters</h3>
      <Link
        href="/admin/blogs/create"
        className="px-5 py-2.5 bg-gold text-navy text-[11px] tracking-[0.22em] uppercase font-medium rounded hover:bg-gold-light transition-colors"
      >
        Create Article
      </Link>
    </div>
  )
}

function ConfirmDialog({
  open,
  title,
  description,
  onCancel,
  onConfirm,
}: {
  open: boolean
  title: string
  description: string
  onCancel: () => void
  onConfirm: () => void
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md bg-[oklch(0.12_0.018_255)] border border-ivory/10 rounded p-6"
      >
        <h3 className="text-ivory text-lg font-light mb-2">{title}</h3>
        <p
          className="text-ivory/55 text-sm mb-6"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          {description}
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-ivory/15 text-ivory/65 hover:text-ivory rounded text-[11px] tracking-[0.22em] uppercase transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500/90 text-white hover:bg-red-500 rounded text-[11px] tracking-[0.22em] uppercase font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  )
}
