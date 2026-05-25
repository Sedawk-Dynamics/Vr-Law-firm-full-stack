'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, Send } from 'lucide-react'

const offices = [
  {
    city: 'Kottayam',
    address:
      'VR Law Firm Building No 1007 Vedipura Lane Opp Collectorate Kottayam District Kerala – 686002',
    phone: '094471 24150',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=9.5888875,76.5333906&z=17&output=embed',
    mapLink:
      'https://www.google.com/maps/place/HGQM%2BH92,+Collectorate,+Kottayam,+Kerala/',
  },
]

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitted(true)

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: '',
        })
      } else {
        alert(data.message || 'Failed to send')
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="bg-navy py-20 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={
                inView
                  ? { opacity: 1, x: 0 }
                  : {}
              }
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-px w-8 bg-gold" />
              <span className="text-gold text-[11px] tracking-[0.35em] uppercase">
                Get in Touch
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={
                inView
                  ? { opacity: 1, y: 0 }
                  : {}
              }
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="text-ivory leading-[1.1] mb-6"
              style={{
                fontSize:
                  'clamp(2rem, 3.5vw, 3.2rem)',
                fontWeight: 300,
              }}
            >
              Let&apos;s connect.
              <br />
              <em className="text-gold not-italic">
                We&apos;re here to help.
              </em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                inView
                  ? { opacity: 1, y: 0 }
                  : {}
              }
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="text-ivory/60 text-base leading-relaxed mb-12"
            >
              Whether you require urgent legal
              assistance or wish to explore how our
              firm can serve your needs, our team
              is ready to engage with precision and
              care.
            </motion.p>

            {/* Office Info */}
            <div className="border-t border-ivory/10 pt-6">
              <p className="text-gold text-sm tracking-widest uppercase mb-3">
                {offices[0].city}
              </p>

              <div className="flex items-start gap-3 mb-4">
                <MapPin
                  size={14}
                  className="text-gold/60 mt-1"
                />
                <p className="text-ivory/60 text-sm leading-relaxed">
                  {offices[0].address}
                </p>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Phone
                  size={14}
                  className="text-gold/60"
                />
                <p className="text-ivory/60 text-sm">
                  {offices[0].phone}
                </p>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <Mail
                  size={14}
                  className="text-gold/60"
                />
                <a
                  href="mailto:support@vr-lawfirm.com"
                  className="text-ivory/60 hover:text-gold text-sm transition-colors"
                >
                  support@vr-lawfirm.com
                </a>
              </div>

              {/* Map */}
              <a
                href={offices[0].mapLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <iframe
                  width="100%"
                  height="250"
                  frameBorder="0"
                  src={offices[0].mapEmbedUrl}
                  allowFullScreen
                  loading="lazy"
                  className="rounded border border-ivory/10"
                />
              </a>
            </div>
          </div>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={
              inView
                ? { opacity: 1, x: 0 }
                : {}
            }
            transition={{
              duration: 0.9,
              delay: 0.2,
            }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-16 h-16 border-2 border-gold flex items-center justify-center mb-6">
                  <Send
                    size={24}
                    className="text-gold"
                  />
                </div>

                <h3 className="text-ivory text-2xl mb-3">
                  Message Received
                </h3>

                <p className="text-ivory/60 text-sm">
                  A member of our team will
                  respond within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    name="firstName"
                    type="text"
                    required
                    placeholder="First Name"
                    value={
                      formData.firstName
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full bg-transparent border-b border-ivory/20 focus:border-gold pb-3 text-ivory outline-none"
                  />

                  <input
                    name="lastName"
                    type="text"
                    required
                    placeholder="Last Name"
                    value={
                      formData.lastName
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full bg-transparent border-b border-ivory/20 focus:border-gold pb-3 text-ivory outline-none"
                  />
                </div>

                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-ivory/20 focus:border-gold pb-3 text-ivory outline-none"
                />

                <textarea
                  name="message"
                  rows={4}
                  placeholder="Please describe your legal matter..."
                  value={
                    formData.message
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full bg-transparent border-b border-ivory/20 focus:border-gold pb-3 text-ivory outline-none resize-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gold text-navy text-[12px] tracking-[0.25em] uppercase font-medium hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {loading
                    ? 'Sending...'
                    : 'Submit Enquiry'}

                  <Send size={14} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}