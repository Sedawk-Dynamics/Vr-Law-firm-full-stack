'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const pillars = [
  { number: '01', title: 'Integrity', body: 'Every engagement is grounded in honesty, transparency, and unwavering ethical standards.' },
  { number: '02', title: 'Excellence', body: 'We relentlessly pursue the highest quality of legal work, leaving no detail unexamined.' },
  { number: '03', title: 'Client Focus', body: 'Our clients\' interests drive every decision. We measure success by theirs.' },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="about" ref={sectionRef} className="bg-navy py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div className="relative aspect-[4/5] overflow-hidden order-2 lg:order-1">
            <motion.div style={{ y: imgY }} className="absolute inset-[-10%] will-change-transform">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/images/about-section-hero.jpg')",
                }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-navy/30" />

            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gold" />

            {/* Floating logo card */}
            <div className="absolute bottom-8 left-8 bg-navy/90 backdrop-blur-sm border border-gold/30 p-5">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2026-05-13_121536-removebg-preview-zMYizjd8nuQdcaSDIDDAlmkzKgBwaP.png"
                alt="VR Law Firm"
                width={60}
                height={60}
                className="mb-3"
              />
              <p className="text-ivory text-sm font-light tracking-wide">VR Law Firm</p>
              <p
                className="text-gold/70 text-xs tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                Est. 1999
              </p>
            </div>
          </div>

          {/* Text side */}
          <div ref={titleRef} className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-px w-8 bg-gold" />
              <span
                className="text-gold text-[11px] tracking-[0.35em] uppercase"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                Our Legacy
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-ivory text-balance leading-[1.1] mb-6"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 300 }}
            >
              Shaping legal outcomes with{' '}
              <em className="text-gold not-italic">purpose and precision</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-ivory/60 leading-relaxed mb-10 text-base"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              Founded on the principles of rigour and integrity, VR Law Firm has grown into
              a full-service legal practice advising corporations, financial institutions,
              and high-net-worth individuals on matters of critical importance. Our heritage
              is our strength; our vision is our compass.
            </motion.p>

            {/* Pillars */}
            <div className="space-y-6">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, x: 30 }}
                  animate={titleInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                  className="flex gap-5 group"
                >
                  <span className="text-gold/40 text-sm font-light mt-0.5 flex-shrink-0">
                    {pillar.number}
                  </span>
                  <div>
                    <h4 className="text-ivory text-lg mb-1 font-medium group-hover:text-gold transition-colors duration-300">
                      {pillar.title}
                    </h4>
                    <p
                      className="text-ivory/55 text-sm leading-relaxed"
                      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                      {pillar.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
