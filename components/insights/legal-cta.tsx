'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'

export function LegalCTA() {
  return (
    <section className="bg-navy-mid py-20 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
      >
        <div>
          <p
            className="text-gold text-[11px] tracking-[0.35em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Need Legal Assistance?
          </p>
          <h3
            className="text-ivory leading-[1.1] text-balance"
            style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 300 }}
          >
            Schedule a confidential consultation today.
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <a
            href="tel:09447124150"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-gold/40 text-gold text-[11px] tracking-[0.25em] uppercase hover:bg-gold/10 transition-colors"
          >
            <Phone size={14} />
            094471 24150
          </a>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold text-navy text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-gold-light transition-colors"
          >
            Get in Touch
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
