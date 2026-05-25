'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import { CATEGORY_META, type BlogPost } from '@/lib/blog-types'
import { formatDate } from '@/lib/blog-api'

export function FeaturedInsight({ post }: { post: BlogPost }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-7xl mx-auto px-6 py-12 lg:py-16"
    >
      <div className="flex items-center gap-3 mb-7">
        <span className="h-px w-8 bg-gold" />
        <span
          className="text-gold text-[11px] tracking-[0.35em] uppercase"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          Featured Insight
        </span>
      </div>

      <Link
        href={`/insights/${post.slug}`}
        className="group block border border-ivory/10 hover:border-gold/40 transition-colors duration-500 bg-navy-mid overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden order-1 lg:order-2">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-[1.04]"
              style={{ backgroundImage: `url(${post.featuredImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/10 to-transparent lg:bg-gradient-to-l" />
          </div>

          <div className="p-8 lg:p-14 flex flex-col justify-center order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="bg-gold/95 text-navy text-[10px] tracking-[0.25em] uppercase px-3 py-1.5"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                {CATEGORY_META[post.category].label}
              </span>
              <span
                className="text-ivory/45 text-[10px] tracking-[0.25em] uppercase"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                {formatDate(post.publishedAt)}
              </span>
            </div>

            <h2
              className="text-ivory leading-[1.1] mb-5 text-balance group-hover:text-gold transition-colors duration-500"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300 }}
            >
              {post.title}
            </h2>

            <p
              className="text-ivory/65 text-base leading-relaxed mb-8 max-w-xl"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              {post.excerpt}
            </p>

            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-2 text-gold text-[11px] tracking-[0.25em] uppercase border-b border-gold/40 pb-1 group-hover:border-gold transition-colors duration-300">
                Read Article
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-ivory/45 text-xs"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                <Clock size={12} className="text-gold/60" />
                {post.readingMinutes} min read
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.section>
  )
}
