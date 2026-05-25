'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import type { BlogCategory, BlogPost } from '@/lib/blog-types'
import { InsightsFilters } from './insights-filters'
import { InsightCard } from './insight-card'
import { InsightsSidebar } from './insights-sidebar'

type FilterKey = BlogCategory | 'all'

export function InsightsGrid({ posts }: { posts: BlogPost[] }) {
  const [filter, setFilter] = useState<FilterKey>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((p) => {
      if (filter !== 'all' && p.category !== filter) return false
      if (!q) return true
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [posts, filter, query])

  const recent = useMemo(
    () => [...posts].sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || '')).slice(0, 4),
    [posts],
  )

  const topics = useMemo(() => {
    const counts = new Map<string, number>()
    posts.forEach((p) => p.tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)))
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).map(([t]) => t)
  }, [posts])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    posts.forEach((p) => (counts[p.category] = (counts[p.category] || 0) + 1))
    return counts
  }, [posts])

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 lg:py-16">
      <InsightsFilters
        active={filter}
        onChange={setFilter}
        query={query}
        onQueryChange={setQuery}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
        <div>
          {filtered.length === 0 ? (
            <EmptyState query={query} />
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            >
              {filtered.map((post, i) => (
                <InsightCard key={post.id} post={post} index={i} />
              ))}
            </motion.div>
          )}
        </div>

        <InsightsSidebar recent={recent} topics={topics} counts={categoryCounts} />
      </div>
    </section>
  )
}

function EmptyState({ query }: { query: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-dashed border-ivory/15 p-16 text-center"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 border border-gold/40 rounded-full mb-6">
        <Search size={20} className="text-gold/70" />
      </div>
      <h3 className="text-ivory text-xl font-light mb-3">
        {query ? 'No results match your search' : 'Nothing here yet'}
      </h3>
      <p
        className="text-ivory/55 text-sm max-w-md mx-auto"
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        {query
          ? `We couldn't find any insights matching "${query}". Try a different keyword or clear the filter.`
          : 'Articles in this category will appear here once published.'}
      </p>
    </motion.div>
  )
}
