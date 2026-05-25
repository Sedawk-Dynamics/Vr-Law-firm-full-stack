'use client'

import Link from 'next/link'
import { CATEGORY_META, CATEGORY_ORDER, type BlogPost } from '@/lib/blog-types'
import { formatDate } from '@/lib/blog-api'

export function InsightsSidebar({
  recent,
  topics,
  counts,
}: {
  recent: BlogPost[]
  topics: string[]
  counts: Record<string, number>
}) {
  return (
    <aside className="space-y-12 sticky top-28">
      <div>
        <h3
          className="text-gold text-[11px] tracking-[0.32em] uppercase mb-6 pb-3 border-b border-ivory/10"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          Recent Posts
        </h3>
        <ul className="space-y-5">
          {recent.map((post) => (
            <li key={post.id}>
              <Link href={`/insights/${post.slug}`} className="group flex gap-4">
                <div
                  className="relative w-16 h-16 flex-shrink-0 bg-cover bg-center border border-ivory/10 group-hover:border-gold/40 transition-colors"
                  style={{ backgroundImage: `url(${post.featuredImage})` }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-ivory text-sm leading-snug line-clamp-2 group-hover:text-gold transition-colors">
                    {post.title}
                  </p>
                  <p
                    className="text-ivory/40 text-[10px] tracking-[0.2em] uppercase mt-2"
                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                  >
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3
          className="text-gold text-[11px] tracking-[0.32em] uppercase mb-6 pb-3 border-b border-ivory/10"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          Popular Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <span
              key={t}
              className="text-[10px] tracking-[0.18em] uppercase border border-ivory/15 text-ivory/55 px-2.5 py-1 hover:border-gold/40 hover:text-gold transition-colors"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3
          className="text-gold text-[11px] tracking-[0.32em] uppercase mb-6 pb-3 border-b border-ivory/10"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          Categories
        </h3>
        <ul className="space-y-3">
          {CATEGORY_ORDER.map((c) => (
            <li
              key={c}
              className="flex items-center justify-between text-ivory/65 text-sm hover:text-gold transition-colors cursor-pointer"
            >
              <span>{CATEGORY_META[c].label}</span>
              <span
                className="text-ivory/35 text-xs"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                {counts[c] ?? 0}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
