'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const galleryImages = [
  { src: '/gallery-office-signage.jpg', alt: 'VR Law Firm Office Signage', category: 'Office' },
  { src: '/gallery-office-entrance.jpg', alt: 'VR Law Firm Entrance', category: 'Office' },
  { src: '/gallery-law-books.jpg', alt: 'Law Case Books Collection', category: 'Resources' },
  { src: '/gallery-office-interior.jpg', alt: 'Professional Office Interior', category: 'Office' },
  { src: '/gallery-scales-justice.jpg', alt: 'Scales of Justice', category: 'Symbols' },
  { src: '/gallery-office-workspace.jpg', alt: 'Office Workspace', category: 'Office' },
]

export function GallerySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section ref={ref} className="py-24 bg-navy text-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-[11px] tracking-[0.35em] uppercase mb-4 font-light"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Office & Practice
          </p>
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            Our Professional <span className="text-gold">Workspace</span>
          </h2>
          <p className="text-ivory/60 max-w-2xl mx-auto text-lg leading-relaxed"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            A glimpse into our state-of-the-art office facility designed to provide the finest legal consultation and case management services.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group cursor-pointer overflow-hidden rounded-lg border border-ivory/10 hover:border-gold/40 transition-all duration-300"
              onClick={() => setSelectedImage(index)}
            >
              {/* Image Container */}
              <div className="relative aspect-video bg-gradient-to-br from-gold/10 to-transparent overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
              </div>

              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-end justify-start p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div>
                  <p className="text-gold text-xs tracking-[0.2em] uppercase mb-1 font-light"
                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                    {image.category}
                  </p>
                  <p className="text-ivory text-sm font-light">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                width={1200}
                height={800}
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-ivory hover:text-gold transition-colors"
                aria-label="Close"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-ivory/80 text-sm"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                <p className="text-gold text-xs tracking-[0.2em] uppercase mb-1 font-light">
                  {galleryImages[selectedImage].category}
                </p>
                <p>{galleryImages[selectedImage].alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-ivory/60 mb-6"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
            Visit us today to experience our world-class legal services firsthand
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 border border-gold text-gold text-[11px] tracking-[0.25em] uppercase hover:bg-gold hover:text-navy transition-all duration-300"
          >
            Schedule Consultation
          </a>
        </motion.div>
      </div>
    </section>
  )
}
