'use client'

import { useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, Linkedin } from 'lucide-react'

const team = [
  {
    name: 'Vikram R. Sharma',
    title: 'Senior Partner',
    focus: 'Corporate & M&A',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80&auto=format&fit=crop',
    experience: '22 years',
  },
  {
    name: 'Reena Kapoor',
    title: 'Partner',
    focus: 'Dispute Resolution',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop',
    experience: '16 years',
  },
  {
    name: 'Arjun Mehta',
    title: 'Partner',
    focus: 'Banking & Finance',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop',
    experience: '14 years',
  },
  {
    name: 'Priya Nair',
    title: 'Senior Associate',
    focus: 'Intellectual Property',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop',
    experience: '9 years',
  },
  {
    name: 'Rahul Desai',
    title: 'Partner',
    focus: 'Regulatory Affairs',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80&auto=format&fit=crop',
    experience: '18 years',
  },
  {
    name: 'Anika Verma',
    title: 'Senior Associate',
    focus: 'Employment Law',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=600&q=80&auto=format&fit=crop',
    experience: '8 years',
  },
]

function TeamCard({ member }: { member: typeof team[0] }) {
  return (
    <div className="relative group overflow-hidden bg-navy flex-shrink-0 w-72 lg:w-80">
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${member.image})` }}
        />
        <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/10 transition-colors duration-500" />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <button
            className="flex items-center gap-2 text-ivory text-sm tracking-widest uppercase"
            aria-label={`Connect with ${member.name} on LinkedIn`}
          >
            <Linkedin size={16} className="text-gold" />
            <span style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Connect</span>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 border-t border-gold/20">
        <h3 className="text-ivory text-xl font-medium mb-1">{member.name}</h3>
        <p
          className="text-gold text-[11px] tracking-[0.2em] uppercase mb-2"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          {member.title}
        </p>
        <p
          className="text-ivory/50 text-xs"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          {member.focus} · {member.experience} exp.
        </p>
      </div>
    </div>
  )
}

export function TeamSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  const autoplay = Autoplay({ delay: 3500, stopOnInteraction: true })
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [autoplay],
  )

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section id="people" className="bg-navy py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
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
                Our People
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-ivory text-balance leading-[1.1]"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3.5rem)', fontWeight: 300 }}
            >
              Home to inspired{' '}
              <em className="text-gold not-italic">performances</em>
            </motion.h2>
          </div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-3"
          >
            <button
              onClick={prev}
              className="w-12 h-12 border border-ivory/20 text-ivory hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center"
              aria-label="Previous team member"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 border border-ivory/20 text-ivory hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center"
              aria-label="Next team member"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Carousel (full-bleed) */}
      <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing" role="region" aria-label="Team members carousel">
        <div className="flex gap-4 pl-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2))]">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
