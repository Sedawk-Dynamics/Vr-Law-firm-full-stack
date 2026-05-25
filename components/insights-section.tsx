'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, BookOpen, Newspaper, Mic } from 'lucide-react'

const insights = [
  {
    type: 'Article',
    icon: BookOpen,
    date: 'May 2026',
    tag: 'M&A',
    title: 'Evolving Landscape of Cross-Border Mergers: Key Regulatory Considerations',
    excerpt:
      'An in-depth analysis of the regulatory frameworks shaping international M&A transactions in 2026, with strategic guidance for deal participants.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80&auto=format&fit=crop',
  },
  {
    type: 'News',
    icon: Newspaper,
    date: 'April 2026',
    tag: 'Dispute Resolution',
    title: 'Supreme Court Clarifies Arbitration Clause Enforceability in Commercial Disputes',
    excerpt:
      'VR Law Firm analyses the landmark Supreme Court judgment and its far-reaching implications for arbitration agreements.',
    image: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=600&q=80&auto=format&fit=crop',
  },
  {
    type: 'Podcast',
    icon: Mic,
    date: 'March 2026',
    tag: 'Banking & Finance',
    title: 'Navigating Fintech Regulation: A Practitioner\'s Perspective',
    excerpt:
      'Our Banking & Finance partners discuss emerging regulatory challenges for fintech companies operating in multiple jurisdictions.',
    image: 'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?w=600&q=80&auto=format&fit=crop',
  },
]

function InsightCard({ insight, index }: { insight: typeof insights[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = insight.icon

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer bg-ivory border border-border hover:border-gold/40 transition-all duration-400 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${insight.image})` }}
        />
        <div className="absolute inset-0 bg-navy/30" />
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-gold/90 px-3 py-1.5">
          <Icon size={12} className="text-navy" />
          <span
            className="text-navy text-[10px] tracking-[0.25em] uppercase font-medium"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            {insight.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            {insight.date}
          </span>
          <span className="w-1 h-1 rounded-full bg-gold" />
          <span
            className="text-[10px] tracking-[0.2em] uppercase text-gold"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            {insight.tag}
          </span>
        </div>

        <h3 className="text-foreground text-xl leading-snug mb-3 font-medium group-hover:text-gold transition-colors duration-300 text-balance">
          {insight.title}
        </h3>

        <p
          className="text-muted-foreground text-sm leading-relaxed mb-5"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          {insight.excerpt}
        </p>

        <div className="flex items-center gap-2 text-gold text-sm group-hover:gap-3 transition-all duration-300">
          <span style={{ fontFamily: 'var(--font-inter), sans-serif' }} className="text-xs tracking-widest uppercase">
            Read More
          </span>
          <ArrowUpRight size={16} />
        </div>
      </div>
    </motion.article>
  )
}

export function InsightsSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="insights" className="bg-background py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="h-px w-8 bg-gold" />
              <span
                className="text-gold text-[11px] tracking-[0.35em] uppercase"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                Thought Leadership
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-foreground text-balance leading-[1.1]"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', fontWeight: 300 }}
            >
              Leveraging insight to{' '}
              <em className="text-gold not-italic">script legal discourse</em>
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-shrink-0 flex items-center gap-2 text-foreground text-[12px] tracking-[0.2em] uppercase border-b border-foreground/30 pb-0.5 hover:border-gold hover:text-gold transition-all duration-300"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            All Publications
            <ArrowUpRight size={14} />
          </motion.button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {insights.map((insight, i) => (
            <InsightCard key={insight.title} insight={insight} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
