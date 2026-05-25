'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import { CATEGORY_META, type BlogPost } from '@/lib/blog-types'
import { formatDate } from '@/lib/blog-api'

export function InsightCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group h-full"
    >
      <Link
        href={`/insights/${post.slug}`}
        className="flex h-full flex-col bg-navy-mid border border-ivory/10 hover:border-gold/40 transition-colors duration-400 overflow-hidden"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ backgroundImage: `url(${post.featuredImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
          <span
            className="absolute top-4 left-4 bg-gold/95 text-navy text-[10px] tracking-[0.25em] uppercase px-3 py-1.5"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            {CATEGORY_META[post.category].label}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 lg:p-7">
          <div
            className="flex items-center gap-3 mb-4 text-[10px] tracking-[0.22em] uppercase text-ivory/40"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            <span>{formatDate(post.publishedAt)}</span>
            <span className="w-1 h-1 rounded-full bg-gold/60" />
            <span className="flex items-center gap-1.5">
              <Clock size={11} className="text-gold/60" />
              {post.readingMinutes} min
            </span>
          </div>

          <h3 className="text-ivory text-lg lg:text-xl leading-snug font-medium mb-3 group-hover:text-gold transition-colors duration-300 text-balance">
            {post.title}
          </h3>

          <p
            className="text-ivory/55 text-sm leading-relaxed mb-6 line-clamp-3 flex-1"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            {post.excerpt}
          </p>

          <div className="flex items-center gap-2 text-gold text-xs tracking-[0.2em] uppercase">
            Read More
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
