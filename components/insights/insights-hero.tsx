'use client'

import { motion } from 'framer-motion'

export function InsightsHero() {
  return (
    <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden bg-navy">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, oklch(0.65 0.12 70) 0%, transparent 40%), radial-gradient(circle at 80% 80%, oklch(0.65 0.12 70) 0%, transparent 40%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 mb-7"
        >
          <span className="h-px w-10 bg-gold" />
          <span
            className="text-gold text-[11px] tracking-[0.35em] uppercase"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Insights & Legal Perspectives
          </span>
          <span className="h-px w-10 bg-gold" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-ivory text-balance leading-[1.05]"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)', fontWeight: 300 }}
        >
          Considered counsel,{' '}
          <em className="text-gold not-italic font-normal">in writing.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-ivory/60 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mt-7"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          Analysis, case studies, and legal updates from the practice — written for clients,
          counsel, and the courts that read us.
        </motion.p>
      </div>
    </section>
  )
}
