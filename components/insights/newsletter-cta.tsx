'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

export function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="bg-navy py-20 lg:py-28 border-y border-ivory/10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto px-6 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-8 bg-gold" />
          <span
            className="text-gold text-[11px] tracking-[0.35em] uppercase"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            The VR Brief
          </span>
          <span className="h-px w-8 bg-gold" />
        </div>

        <h3
          className="text-ivory leading-[1.1] mb-5 text-balance"
          style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', fontWeight: 300 }}
        >
          Receive our legal analysis,{' '}
          <em className="text-gold not-italic">delivered monthly.</em>
        </h3>

        <p
          className="text-ivory/55 text-sm lg:text-base leading-relaxed mb-9 max-w-xl mx-auto"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          One concise email a month — case law, regulatory shifts, and practitioner notes. No
          marketing, no forwards. Unsubscribe at any click.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-gold/10 border border-gold/30 text-gold">
            <Check size={16} />
            <span
              className="text-[12px] tracking-[0.22em] uppercase"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              You&apos;re subscribed. Watch your inbox.
            </span>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3"
          >
            <input
              type="email"
              required
              placeholder="you@firm.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border border-ivory/20 focus:border-gold px-5 py-3.5 text-ivory text-sm outline-none transition-colors placeholder:text-ivory/35"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              aria-label="Email address"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold text-navy text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-gold-light transition-colors"
            >
              Subscribe
              <ArrowRight size={14} />
            </button>
          </form>
        )}
      </motion.div>
    </section>
  )
}
