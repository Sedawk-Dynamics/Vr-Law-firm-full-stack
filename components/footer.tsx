'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from 'lucide-react'

const footerLinks = {
  Expertise: [
    'Corporate & Commercial',
    'Dispute Resolution',
    'Banking & Finance',
    'Intellectual Property',
    'Regulatory Affairs',
    'M&A',
  ],
  'The Firm': [
    'About Us',
    'Our People',
    'Offices',
    'Careers',
    'Pro Bono',
  ],
  Resources: [
    'Publications',
    'Newsletters',
    'News & Events',
    'Client Portal',
  ],
}

const socialLinks = [
  {
    Icon: Linkedin,
    url: 'https://www.linkedin.com/company/vr-law-firmm',
    label: 'LinkedIn',
  },
  {
    Icon: Twitter,
    url: 'https://x.com/vrlawfirm_/',
    label: 'Twitter/X',
  },
  {
    Icon: Instagram,
    url: 'https://www.instagram.com/vrlawfirmofficial/',
    label: 'Instagram',
  },
  {
    Icon: Facebook,
    url: 'https://www.facebook.com/vrlawfirm',
    label: 'Facebook',
  },
]

export function Footer() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-[oklch(0.09_0.015_255)] text-ivory">
      {/* CTA Banner */}
      <div className="border-b border-ivory/8 bg-navy-mid">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex-1">
            <p
              className="text-gold text-[11px] tracking-[0.35em] uppercase mb-2"
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
              }}
            >
              Ready to work with us?
            </p>

            <p className="text-ivory text-xl font-light mb-4">
              Schedule a confidential consultation today.
            </p>

            <div className="flex flex-col gap-2">
              <a
                href="tel:09447124150"
                className="text-gold text-sm hover:text-gold/80 transition-colors"
              >
                📞 094471 24150
              </a>

              <a
                href="mailto:support@vr-lawfirm.com"
                className="text-gold text-sm hover:text-gold/80 transition-colors"
              >
                📧 support@vr-lawfirm.com
              </a>
            </div>
          </div>

          <button
            onClick={() =>
              document
                .querySelector('#contact')
                ?.scrollIntoView({
                  behavior: 'smooth',
                })
            }
            className="flex-shrink-0 px-8 py-3 border border-gold text-gold text-[11px] tracking-[0.25em] uppercase hover:bg-gold hover:text-navy transition-all duration-300"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <button
              onClick={scrollToTop}
              className="block mb-6 group"
              aria-label="Back to top"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2026-05-13_121536-removebg-preview-zMYizjd8nuQdcaSDIDDAlmkzKgBwaP.png"
                alt="VR Law Firm"
                width={180}
                height={90}
                className="object-contain group-hover:brightness-110 transition-all duration-300"
              />
            </button>

            <p
              className="text-ivory/45 text-sm leading-relaxed max-w-xs mb-8"
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
              }}
            >
              A full-service law firm delivering authoritative
              legal counsel with precision, integrity, and an
              unwavering commitment to client success.
            </p>

            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(
                ({ Icon, url, label }, index) => (
                  <motion.a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 border border-ivory/15 rounded-full flex items-center justify-center text-ivory/40 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </motion.a>
                )
              )}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(
            ([category, links]) => (
              <div key={category}>
                <p
                  className="text-gold/80 text-[10px] tracking-[0.3em] uppercase mb-5 font-medium"
                  style={{
                    fontFamily:
                      'var(--font-inter), sans-serif',
                  }}
                >
                  {category}
                </p>

                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-ivory/45 text-sm hover:text-ivory transition-colors duration-300"
                        style={{
                          fontFamily:
                            'var(--font-inter), sans-serif',
                        }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/6">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-ivory/30 text-xs"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
            }}
          >
            © {new Date().getFullYear()} VR Law Firm.
            All rights reserved.
          </p>

          <div className="flex gap-6">
            {[
              'Privacy Policy',
              'Terms of Use',
              'Disclaimer',
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="text-ivory/30 text-xs hover:text-ivory/60 transition-colors"
                style={{
                  fontFamily:
                    'var(--font-inter), sans-serif',
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
