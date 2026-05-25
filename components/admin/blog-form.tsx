'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Eye,
  Save,
  Send,
  X,
  CheckCircle2,
  Loader2,
  Tag,
} from 'lucide-react'
import { slugify, createBlog, updateBlog } from '@/lib/blog-api'
import { CATEGORY_ORDER, CATEGORY_META, type BlogPost, type BlogCategory, type BlogStatus } from '@/lib/blog-types'
import { RichTextEditor } from './rich-text-editor'
import { ImageUploader } from './image-uploader'
import { BlogContent } from '@/components/insights/blog-content'

const DEFAULTS: BlogPost = {
  id: '',
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  category: 'blog',
  status: 'draft',
  featuredImage: '',
  ogImage: '',
  author: { name: 'Rahul Raveendran', title: 'Lead Counsel', avatar: '/rahul-raveendran-profile.jpg' },
  tags: [],
  seoTitle: '',
  metaDescription: '',
  publishedAt: null,
  scheduledFor: null,
  createdAt: '',
  updatedAt: '',
  views: 0,
  featured: false,
  readingMinutes: 1,
}

export function BlogForm({ initial }: { initial?: BlogPost }) {
  const router = useRouter()
  const [form, setForm] = useState<BlogPost>(initial ?? DEFAULTS)
  const [tagInput, setTagInput] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [saving, setSaving] = useState<false | 'draft' | 'publish' | 'auto'>(false)
  const [error, setError] = useState<string | null>(null)
  const [lastSaved, setLastSaved] = useState<Date | null>(initial ? new Date(initial.updatedAt) : null)
  const slugTouched = useRef(Boolean(initial?.slug))
  const isEdit = Boolean(initial?.id)

  useEffect(() => {
    if (!slugTouched.current) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }))
    }
  }, [form.title])

  useEffect(() => {
    if (!isEdit || !form.id) return
    const t = setTimeout(async () => {
      try {
        setSaving('auto')
        await updateBlog(form.id, asPayload(form))
        setLastSaved(new Date())
      } catch {
      } finally {
        setSaving(false)
      }
    }, 4000)
    return () => clearTimeout(t)
  }, [form, isEdit])

  const wordCount = useMemo(() => {
    const text = form.content.replace(/<[^>]+>/g, ' ').trim()
    return text ? text.split(/\s+/).length : 0
  }, [form.content])

  function setField<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function addTag() {
    const t = tagInput.trim()
    if (!t || form.tags.includes(t)) return
    setField('tags', [...form.tags, t])
    setTagInput('')
  }

  async function save(status: BlogStatus) {
    setError(null)
    if (!form.title.trim()) {
      setError('Title is required')
      return
    }
    if (!form.slug.trim()) {
      setError('Slug is required')
      return
    }
    setSaving(status === 'published' ? 'publish' : 'draft')
    try {
      const payload = asPayload({ ...form, status })
      if (status === 'published' && !payload.publishedAt) {
        payload.publishedAt = new Date().toISOString()
      }
      if (isEdit && form.id) {
        await updateBlog(form.id, payload)
      } else {
        const created = await createBlog(payload)
        router.push(`/admin/blogs/edit/${created.id}`)
        return
      }
      setLastSaved(new Date())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-8">
      <div className="space-y-6">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p
              className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              {isEdit ? 'Edit Article' : 'New Article'}
            </p>
            <h1 className="text-ivory text-2xl lg:text-3xl font-light">
              {form.title || 'Untitled draft'}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <AutoSaveIndicator status={saving} lastSaved={lastSaved} />
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-ivory/15 text-ivory/75 hover:border-gold hover:text-gold transition-colors rounded text-[11px] tracking-[0.22em] uppercase"
            >
              <Eye size={13} /> Preview
            </button>
            <button
              type="button"
              onClick={() => save('draft')}
              disabled={Boolean(saving)}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-gold/40 text-gold hover:bg-gold/10 transition-colors rounded text-[11px] tracking-[0.22em] uppercase disabled:opacity-50"
            >
              <Save size={13} /> Save Draft
            </button>
            <button
              type="button"
              onClick={() => save('published')}
              disabled={Boolean(saving)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold text-navy hover:bg-gold-light transition-colors rounded text-[11px] tracking-[0.22em] uppercase font-medium disabled:opacity-50"
            >
              <Send size={13} /> {form.status === 'published' ? 'Update' : 'Publish'}
            </button>
          </div>
        </header>

        {error && (
          <div className="p-4 border border-red-400/30 bg-red-400/5 text-red-300 text-sm rounded">
            {error}
          </div>
        )}

        <FormCard label="Title">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setField('title', e.target.value)}
            placeholder="An elegant, considered title…"
            className="w-full bg-transparent text-ivory text-2xl lg:text-3xl font-light outline-none placeholder:text-ivory/30"
          />
        </FormCard>

        <FormCard label="Short Description">
          <textarea
            value={form.excerpt}
            onChange={(e) => setField('excerpt', e.target.value)}
            rows={3}
            placeholder="A one-paragraph summary used in cards and meta tags."
            className="w-full bg-transparent text-ivory text-base outline-none placeholder:text-ivory/30 resize-none"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          />
        </FormCard>

        <FormCard label="Content" extra={`${wordCount} words`}>
          <RichTextEditor value={form.content} onChange={(html) => setField('content', html)} />
        </FormCard>

        <FormCard label="SEO Title" hint="Falls back to article title if empty.">
          <input
            type="text"
            value={form.seoTitle || ''}
            onChange={(e) => setField('seoTitle', e.target.value)}
            placeholder="Optimised for search engines"
            className="w-full bg-transparent text-ivory text-base outline-none placeholder:text-ivory/30"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          />
        </FormCard>

        <FormCard label="Meta Description" hint="Recommended 150–160 characters.">
          <textarea
            value={form.metaDescription || ''}
            onChange={(e) => setField('metaDescription', e.target.value)}
            rows={2}
            placeholder="Concise description for search engines."
            className="w-full bg-transparent text-ivory text-sm outline-none placeholder:text-ivory/30 resize-none"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          />
        </FormCard>

      </div>

      <aside className="space-y-6">
        <FormCard label="Slug">
          <div className="flex items-center gap-2">
            <span className="text-ivory/35 text-sm">/insights/</span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => {
                slugTouched.current = true
                setField('slug', slugify(e.target.value))
              }}
              className="flex-1 bg-transparent text-ivory text-sm outline-none"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            />
          </div>
        </FormCard>

        <FormCard label="Category">
          <select
            value={form.category}
            onChange={(e) => setField('category', e.target.value as BlogCategory)}
            className="w-full bg-[oklch(0.12_0.018_255)] border border-ivory/15 focus:border-gold rounded px-3 py-2.5 text-ivory text-sm outline-none"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            {CATEGORY_ORDER.map((c) => (
              <option key={c} value={c} className="bg-navy">
                {CATEGORY_META[c].label}
              </option>
            ))}
          </select>
        </FormCard>

        <FormCard label="Publish Status">
          <div className="flex gap-2">
            {(['draft', 'published'] as BlogStatus[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setField('status', s)}
                className={`flex-1 px-3 py-2 rounded text-[11px] tracking-[0.22em] uppercase transition-colors ${
                  form.status === s
                    ? s === 'published'
                      ? 'bg-gold text-navy'
                      : 'bg-ivory/10 text-ivory border border-ivory/20'
                    : 'border border-ivory/10 text-ivory/45 hover:text-ivory'
                }`}
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                {s}
              </button>
            ))}
          </div>
        </FormCard>

        <FormCard label="Featured Image">
          <ImageUploader
            value={form.featuredImage}
            onChange={(url) => setField('featuredImage', url)}
            label="Upload Featured Image"
            aspect="16/9"
          />
        </FormCard>

        <FormCard label="Tags">
          <div className="flex flex-wrap gap-2 mb-3">
            {form.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold/10 border border-gold/25 text-gold text-[11px] tracking-wider"
              >
                <Tag size={10} />
                {t}
                <button
                  type="button"
                  onClick={() => setField('tags', form.tags.filter((x) => x !== t))}
                  className="text-gold/55 hover:text-gold"
                  aria-label={`Remove ${t}`}
                >
                  <X size={11} />
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTag()
              }
            }}
            placeholder="Add tag and press Enter"
            className="w-full bg-[oklch(0.12_0.018_255)] border border-ivory/15 focus:border-gold rounded px-3 py-2 text-ivory text-sm outline-none placeholder:text-ivory/30"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          />
        </FormCard>

        <FormCard label="Featured On Insights">
          <label className="flex items-center justify-between gap-3 cursor-pointer">
            <span
              className="text-ivory/65 text-sm"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              Show as hero article
            </span>
            <span
              className={`relative w-10 h-6 rounded-full transition-colors ${
                form.featured ? 'bg-gold' : 'bg-ivory/15'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-navy transition-transform ${
                  form.featured ? 'translate-x-4' : ''
                }`}
              />
              <input
                type="checkbox"
                className="sr-only"
                checked={form.featured ?? false}
                onChange={(e) => setField('featured', e.target.checked)}
              />
            </span>
          </label>
        </FormCard>
      </aside>

      <PreviewPanel open={previewOpen} onClose={() => setPreviewOpen(false)} post={form} />
    </div>
  )
}

function FormCard({
  label,
  hint,
  extra,
  children,
}: {
  label: string
  hint?: string
  extra?: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[oklch(0.12_0.018_255)] border border-ivory/10 rounded p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <label
          className="text-gold text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          {label}
        </label>
        {extra && (
          <span
            className="text-ivory/35 text-[10px] tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            {extra}
          </span>
        )}
      </div>
      {children}
      {hint && (
        <p
          className="text-ivory/40 text-xs mt-3"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          {hint}
        </p>
      )}
    </motion.div>
  )
}

function AutoSaveIndicator({
  status,
  lastSaved,
}: {
  status: false | 'draft' | 'publish' | 'auto'
  lastSaved: Date | null
}) {
  if (status === 'auto')
    return (
      <span className="inline-flex items-center gap-1.5 text-ivory/55 text-xs">
        <Loader2 size={12} className="animate-spin text-gold" />
        Auto-saving…
      </span>
    )
  if (status === 'draft' || status === 'publish')
    return (
      <span className="inline-flex items-center gap-1.5 text-ivory/55 text-xs">
        <Loader2 size={12} className="animate-spin text-gold" />
        Saving…
      </span>
    )
  if (lastSaved)
    return (
      <span className="inline-flex items-center gap-1.5 text-ivory/45 text-xs">
        <CheckCircle2 size={12} className="text-gold/70" />
        Saved {timeAgo(lastSaved)}
      </span>
    )
  return null
}

function timeAgo(d: Date) {
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000)
  if (seconds < 5) return 'just now'
  if (seconds < 60) return `${seconds}s ago`
  const m = Math.floor(seconds / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return d.toLocaleDateString()
}

function asPayload(post: BlogPost) {
  const { id, createdAt, updatedAt, views, ...rest } = post
  void id
  void createdAt
  void updatedAt
  void views
  return rest
}

function PreviewPanel({
  open,
  onClose,
  post,
}: {
  open: boolean
  onClose: () => void
  post: BlogPost
}) {
  if (!open) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/70 z-50 flex justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl h-full bg-navy border-l border-ivory/10 overflow-y-auto"
      >
        <div className="sticky top-0 bg-navy/95 backdrop-blur-md border-b border-ivory/10 px-6 py-4 flex items-center justify-between z-10">
          <span
            className="text-gold text-[11px] tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Live Preview
          </span>
          <button
            onClick={onClose}
            aria-label="Close preview"
            className="w-9 h-9 text-ivory/55 hover:text-gold transition-colors flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>
        <article className="px-6 lg:px-10 py-10">
          {post.featuredImage && (
            <div
              className="aspect-[16/9] bg-cover bg-center mb-8 border border-ivory/10"
              style={{ backgroundImage: `url(${post.featuredImage})` }}
            />
          )}
          <p
            className="text-gold text-[10px] tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            {CATEGORY_META[post.category].label}
          </p>
          <h1
            className="text-ivory leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300 }}
          >
            {post.title || 'Untitled draft'}
          </h1>
          {post.excerpt && (
            <p
              className="text-ivory/65 text-lg leading-relaxed mb-8"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              {post.excerpt}
            </p>
          )}
          {post.content ? (
            <BlogContent html={post.content} />
          ) : (
            <p className="text-ivory/40 italic">No content yet.</p>
          )}
        </article>
      </motion.div>
    </motion.div>
  )
}
