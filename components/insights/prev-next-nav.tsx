'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/lib/blog-types'

export function PrevNextNav({
  previous,
  next,
}: {
  previous?: BlogPost | null
  next?: BlogPost | null
}) {
  if (!previous && !next) return null
  return (
    <section className="border-t border-ivory/10 py-14">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {previous ? (
          <Link
            href={`/insights/${previous.slug}`}
            className="group block p-6 border border-ivory/10 hover:border-gold/40 transition-colors"
          >
            <span
              className="inline-flex items-center gap-2 text-ivory/40 text-[10px] tracking-[0.28em] uppercase mb-3 group-hover:text-gold transition-colors"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              <ArrowLeft size={12} /> Previous
            </span>
            <p className="text-ivory text-base leading-snug group-hover:text-gold transition-colors line-clamp-2">
              {previous.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/insights/${next.slug}`}
            className="group block p-6 border border-ivory/10 hover:border-gold/40 transition-colors md:text-right"
          >
            <span
              className="inline-flex items-center gap-2 text-ivory/40 text-[10px] tracking-[0.28em] uppercase mb-3 group-hover:text-gold transition-colors md:justify-end"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              Next <ArrowRight size={12} />
            </span>
            <p className="text-ivory text-base leading-snug group-hover:text-gold transition-colors line-clamp-2">
              {next.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
  )
}
