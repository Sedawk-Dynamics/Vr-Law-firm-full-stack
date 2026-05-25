'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  {
    number: '45+',
    label: 'Years of Civil Law Experience',
    description: 'Extensive experience handling civil litigation and legal disputes',
  },
  {
    number: '14+',
    label: 'Years of POCSO Experience',
    description: 'Dedicated expertise since the POCSO Act was established in 2012',
  },
  {
    number: '94%',
    label: 'Success Rate',
    description: 'Demonstrated success across complex legal matters and case resolutions',
  },
  {
    number: '80+',
    label: 'POCSO Cases Successfully Handled',
    description: 'Extensive experience representing clients in sensitive criminal matters',
  },
]

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group text-center lg:text-left p-8 border-t border-gold/25 hover:border-gold/60 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/4 transition-colors duration-300" />
      <p
        className="text-gold font-light mb-2 leading-none"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
      >
        {stat.number}
      </p>
      <p className="text-foreground text-lg tracking-wide mb-2 font-medium">{stat.label}</p>
      <p
        className="text-muted-foreground text-sm leading-relaxed"
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        {stat.description}
      </p>
    </motion.div>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-ivory-dark py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Divider text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-col lg:flex-row items-center gap-6 lg:gap-12"
        >
          <div className="h-px flex-1 bg-gold/20 hidden lg:block" />
          <p
            className="text-muted-foreground text-center text-base leading-relaxed max-w-2xl"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            VR Law Firm provides trusted legal representation with deep experience in criminal and civil matters — prioritising POCSO, cyber crime, and financial fraud cases while also offering strong counsel in family, land, and divorce disputes.
          </p>
          <div className="h-px flex-1 bg-gold/20 hidden lg:block" />
        </motion.div>
      </div>
    </section>
  )
}
