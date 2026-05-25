'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Scale, Building2, Globe, Landmark, Briefcase, ShieldCheck, FileText, Users } from 'lucide-react'

const areas = [
  {
    icon: ShieldCheck,
    title: 'POCSO Cases',
    description:
      'Strong legal representation in POCSO matters, ensuring sensitive handling, victim protection, and strategic legal defence or prosecution support.',
    tags: ['POCSO Act', 'Child Protection', 'Criminal Defence'],
  },
  {
    icon: Globe,
    title: 'Cyber Crime Cases',
    description:
      'Legal assistance in cyber fraud, online scams, hacking, digital harassment, identity theft, and technology-related offences.',
    tags: ['Cyber Fraud', 'Online Scam', 'Digital Crime'],
  },
  {
    icon: Landmark,
    title: 'Financial Fraud Cases',
    description:
      'Representation in cheque bounce, financial fraud, money laundering, banking disputes, and white-collar criminal matters.',
    tags: ['Fraud', 'Cheque Bounce', 'White Collar Crime'],
  },
  {
    icon: Scale,
    title: 'Criminal Litigation',
    description:
      'Comprehensive legal defence and representation in criminal cases, bail matters, FIR disputes, and trial proceedings.',
    tags: ['Bail Matters', 'FIR', 'Criminal Defence'],
  },
  {
    icon: Users,
    title: 'Family Law',
    description:
      'Guidance and representation in family disputes including maintenance, custody, domestic disputes, and legal settlements.',
    tags: ['Child Custody', 'Maintenance', 'Family Disputes'],
  },
  {
    icon: Building2,
    title: 'Divorce Cases',
    description:
      'Professional legal support for mutual and contested divorce proceedings, alimony, settlements, and family mediation.',
    tags: ['Mutual Divorce', 'Alimony', 'Settlement'],
  },
  {
    icon: FileText,
    title: 'Land & Property Disputes',
    description:
      'Legal assistance for land disputes, property ownership conflicts, registry issues, partition suits, and possession matters.',
    tags: ['Land Disputes', 'Property Law', 'Registry Issues'],
  },
  {
    icon: Briefcase,
    title: 'Civil Litigation',
    description:
      'Representation in civil disputes involving contracts, recovery matters, injunctions, property conflicts, and legal claims.',
    tags: ['Civil Cases', 'Recovery', 'Injunction'],
  },
]

function AreaCard({ area, index }: { area: typeof areas[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = area.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative p-8 bg-ivory border border-border hover:border-gold/40 transition-all duration-400 cursor-pointer overflow-hidden"
    >
      {/* Hover fill */}
      <motion.div
        className="absolute inset-0 bg-navy"
        initial={{ y: '100%' }}
        animate={{ y: hovered ? '0%' : '100%' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10">
        {/* Number */}
        <p
          className={`text-[10px] tracking-[0.3em] uppercase mb-4 transition-colors duration-300 ${hovered ? 'text-gold/60' : 'text-gold/40'
            }`}
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          {String(index + 1).padStart(2, '0')}
        </p>

        {/* Icon */}
        <div
          className={`mb-5 transition-colors duration-300 ${hovered ? 'text-gold' : 'text-gold/70'
            }`}
        >
          <Icon size={28} strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3
          className={`text-xl mb-3 font-medium leading-snug transition-colors duration-300 ${hovered ? 'text-ivory' : 'text-foreground'
            }`}
        >
          {area.title}
        </h3>

        {/* Description */}
        <p
          className={`text-sm leading-relaxed mb-5 transition-colors duration-300 ${hovered ? 'text-ivory/70' : 'text-muted-foreground'
            }`}
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          {area.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {area.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] px-2.5 py-1 border tracking-widest uppercase transition-colors duration-300 ${hovered
                  ? 'border-gold/40 text-gold/80'
                  : 'border-border text-muted-foreground'
                }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute bottom-8 right-8 text-gold text-xl"
            >
              →
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function PracticeAreas() {
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="expertise" className="bg-background py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-px w-8 bg-gold" />
            <span
              className="text-gold text-[11px] tracking-[0.35em] uppercase"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              Our Expertise
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-16"
          >
            <h2
              className="text-balance leading-[1.1] text-foreground"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', fontWeight: 300 }}
            >
              Expert Legal Representation{' '}
              <em className="text-gold not-italic">Across All Matters</em>
            </h2>
            <p
              className="text-muted-foreground text-base leading-relaxed max-w-md lg:mb-2"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
                Our expertise focuses on criminal litigation including POCSO, cyber crime,
  and financial fraud cases, alongside civil matters such as family disputes,
  land conflicts, and divorce proceedings.
            </p>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {areas.map((area, i) => (
            <AreaCard key={area.title} area={area} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
