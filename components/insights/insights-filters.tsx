'use client'

import { Search } from 'lucide-react'
import { CATEGORY_META, type BlogCategory } from '@/lib/blog-types'

type FilterKey = BlogCategory | 'all'

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'blog', label: CATEGORY_META.blog.label + 's' },
  { key: 'case-study', label: 'Case Studies' },
  { key: 'legal-update', label: 'Legal Updates' },
  { key: 'news', label: 'News' },
]

export function InsightsFilters({
  active,
  onChange,
  query,
  onQueryChange,
}: {
  active: FilterKey
  onChange: (key: FilterKey) => void
  query: string
  onQueryChange: (q: string) => void
}) {
  return (
    <div className="border-t border-b border-ivory/10 py-6 mb-12">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex flex-wrap gap-2 lg:gap-1">
          {FILTERS.map((f) => {
            const isActive = f.key === active
            return (
              <button
                key={f.key}
                onClick={() => onChange(f.key)}
                className={`px-5 py-2 text-[11px] tracking-[0.22em] uppercase transition-colors duration-300 border ${
                  isActive
                    ? 'bg-gold text-navy border-gold'
                    : 'border-ivory/15 text-ivory/55 hover:text-gold hover:border-gold/40'
                }`}
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        <div className="relative w-full lg:w-80">
          <Search
            size={15}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/35"
          />
          <input
            type="search"
            placeholder="Search insights…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="w-full bg-navy-mid border border-ivory/15 focus:border-gold pl-11 pr-4 py-2.5 text-ivory text-sm outline-none transition-colors duration-300 placeholder:text-ivory/35"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          />
        </div>
      </div>
    </div>
  )
}
