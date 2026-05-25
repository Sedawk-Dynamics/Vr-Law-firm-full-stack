'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

const heroWords = ['Corporate', 'Litigation', 'Regulatory', 'Transactions', 'Arbitration']

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  const scrollDown = () => {
    document.querySelector('#expertise')?.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section ref={ref} className="relative h-screen min-h-[680px] overflow-hidden" aria-label="Hero">
      {/* Background image with parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0 bg-navy/70 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80&auto=format&fit=crop')",
          }}
        />
      </motion.div>

      {/* Gold diagonal accent */}
      <div className="absolute bottom-0 right-0 w-1/3 h-full z-10 opacity-10"
        style={{
          background: 'linear-gradient(135deg, transparent 40%, oklch(0.65 0.12 70) 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 h-full flex flex-col items-start justify-center max-w-7xl mx-auto px-6 lg:px-16"
      >
        {/* Tag line */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="h-px w-10 bg-gold" />
          <span className="text-gold text-[11px] tracking-[0.35em] uppercase font-light">
            Excellence in Legal Counsel
          </span>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.h1
            variants={itemVariants}
            className="text-ivory text-balance leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 300 }}
          >
            Trusted Legal{' '}
            <em className="text-gold not-italic font-normal">Partners</em>
            <br />
            for Complex Matters
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-ivory/65 text-lg lg:text-xl leading-relaxed max-w-xl mb-10 font-light"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            VR Law Firm delivers authoritative legal counsel with precision,
            integrity, and an unwavering commitment to client success in criminal
            litigation and civil matters.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gold text-navy text-[13px] tracking-[0.2em] uppercase font-medium hover:bg-gold-light transition-all duration-300 group flex items-center gap-2"
            >
              Consult With Us
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
            <button
              onClick={() => document.querySelector('#expertise')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border border-ivory/40 text-ivory text-[13px] tracking-[0.2em] uppercase font-light hover:border-gold hover:text-gold transition-all duration-300"
            >
              Our Expertise
            </button>
          </motion.div>
        </motion.div>

        {/* Rotating words */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-24 right-6 lg:right-16 hidden md:flex flex-col items-end gap-2"
        >
          <p className="text-[10px] tracking-[0.3em] text-ivory/40 uppercase mb-2">We cover</p>
          {heroWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
              className="text-ivory/50 text-sm tracking-widest"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Logo watermark */}
      <div className="absolute bottom-8 right-8 z-20 opacity-10 hidden lg:block">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VR_Law_Firm_Logo-removebg-preview-QMrjt2koZEe7znOFjsarBi9bI3I56W.png"
          alt=""
          width={120}
          height={120}
          className="invert"
        />
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-ivory/50 hover:text-gold transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  )
}
