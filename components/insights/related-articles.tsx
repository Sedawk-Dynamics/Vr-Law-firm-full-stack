'use client'

import { motion } from 'framer-motion'
import type { BlogPost } from '@/lib/blog-types'
import { InsightCard } from './insight-card'

export function RelatedArticles({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null
  return (
    <section className="border-t border-ivory/10 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <p
              className="text-gold text-[11px] tracking-[0.35em] uppercase mb-3"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              Related Reading
            </p>
            <h3
              className="text-ivory leading-[1.1]"
              style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', fontWeight: 300 }}
            >
              You may also like
            </h3>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((p, i) => (
            <InsightCard key={p.id} post={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
