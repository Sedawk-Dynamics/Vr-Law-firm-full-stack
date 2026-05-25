'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const expertiseHighlights = [
  {
    icon: '⚖️',
    label: '80+ POSCO Cases',
    value: 'Successfully handled',
  },
  {
    icon: '📊',
    label: '94% Success Rate',
    value: 'In criminal matters',
  },
  {
    icon: '🎓',
    label: '14 Years',
    value: 'POSCO Experience',
  },
]

export function ExpertiseSection() {
  const ref = useRef<HTMLElement>(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-navy py-20 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-10 bg-gold" />

          <span
            className="text-gold text-[11px] tracking-[0.35em] uppercase"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Legal Expertise
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-ivory leading-[1.1] mb-16 max-w-4xl"
          style={{
            fontSize: 'clamp(2rem, 4vw, 4rem)',
            fontWeight: 300,
          }}
        >
          Leading Criminal Law{' '}
          <span className="text-gold">Specialist</span>
        </motion.h2>

        {/* MAIN CONTENT */}
        <div className="grid lg:grid-cols-[420px_1fr] gap-14 lg:gap-24 items-start">
          {/* LEFT - PROFILE IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-24"
          >
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] shadow-xl">
              <div className="relative h-[520px] w-full">
                <Image
                  src="/rahul-raveendran-profile.jpg"
                  alt="Rahul Raveendran"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07101D] via-[#07101D]/85 to-transparent p-8">
                <span
                  className="inline-block text-gold text-[10px] tracking-[0.25em] uppercase mb-3"
                  style={{
                    fontFamily:
                      'var(--font-inter), sans-serif',
                  }}
                >
                  Lead Counsel
                </span>

                <h3 className="text-ivory text-3xl font-light">
                  Rahul Raveendran
                </h3>

                <p
                  className="text-ivory/70 text-sm mt-3 leading-relaxed"
                  style={{
                    fontFamily:
                      'var(--font-inter), sans-serif',
                  }}
                >
                  Distinguished criminal law advocate with
                  extensive experience in high-profile
                  litigation, complex criminal matters,
                  appeals, and victim representation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-10"
          >
            {/* Intro */}
            <motion.div variants={itemVariants}>
              <h3 className="text-ivory text-3xl lg:text-5xl font-light leading-tight mb-5">
                Strategic Legal Representation with{' '}
                <span className="text-gold">
                  Proven Expertise
                </span>
              </h3>

              <p
                className="text-ivory/65 text-base leading-relaxed max-w-3xl"
                style={{
                  fontFamily:
                    'var(--font-inter), sans-serif',
                }}
              >
                Rahul Raveendran specializes in criminal
                law with extensive courtroom experience in
                high-stakes litigation, POSCO matters,
                appeals, and victim representation. Every
                case is approached with legal precision,
                strategic advocacy, and a commitment to
                justice.
              </p>
            </motion.div>

            {/* HIGHLIGHTS */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5"
            >
              {expertiseHighlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-gold/40 hover:bg-white/[0.05]"
                >
                  <div className="text-3xl mb-4">
                    {item.icon}
                  </div>

                  <h4
                    className="text-gold text-xs uppercase tracking-[0.18em] mb-2"
                    style={{
                      fontFamily:
                        'var(--font-inter), sans-serif',
                    }}
                  >
                    {item.label}
                  </h4>

                  <p
                    className="text-ivory/60 text-sm"
                    style={{
                      fontFamily:
                        'var(--font-inter), sans-serif',
                    }}
                  >
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* SECONDARY COUNSEL */}
            <motion.div
              variants={itemVariants}
              className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] hover:border-gold/30 transition-all duration-300"
            >
              <div className="grid md:grid-cols-[220px_1fr]">
                {/* Image */}
                <div className="relative h-[260px] md:h-full">
                  <Image
                    src="/vr-raveendran-profile.jpg"
                    alt="V.R. Raveendran"
                    fill
                    className="object-cover object-top"
                  />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <span
                    className="text-gold text-[10px] uppercase tracking-[0.25em] mb-3"
                    style={{
                      fontFamily:
                        'var(--font-inter), sans-serif',
                    }}
                  >
                    Supporting Counsel
                  </span>

                  <h4 className="text-ivory text-2xl font-light mb-3">
                    V.R. Raveendran
                  </h4>

                  <p
                    className="text-ivory/60 text-sm leading-relaxed mb-6"
                    style={{
                      fontFamily:
                        'var(--font-inter), sans-serif',
                    }}
                  >
                    Veteran civil law specialist with over
                    45 years of expertise in contract law,
                    commercial disputes, and complex civil
                    litigation.
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <span className="text-2xl">🏆</span>

                    <div>
                      <p className="text-gold text-sm">
                        45+ Years Experience
                      </p>

                      <p className="text-ivory/50 text-xs">
                        Extensive courtroom practice
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
