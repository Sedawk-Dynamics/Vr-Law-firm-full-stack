'use client'

import { useState } from 'react'
import { Linkedin, Twitter, Link2, Check, MessageCircle } from 'lucide-react'

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const enc = encodeURIComponent
  const shareLinks = [
    {
      label: 'WhatsApp',
      Icon: MessageCircle,
      href: `https://wa.me/?text=${enc(`${title} — ${url}`)}`,
    },
    {
      label: 'LinkedIn',
      Icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    },
    {
      label: 'Twitter',
      Icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`,
    },
  ]

  return (
    <div className="flex items-center gap-3">
      <span
        className="text-[10px] tracking-[0.28em] uppercase text-ivory/40 mr-2 hidden sm:inline"
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        Share
      </span>
      {shareLinks.map(({ label, Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          className="w-10 h-10 border border-ivory/15 text-ivory/55 hover:border-gold hover:text-gold transition-colors flex items-center justify-center"
        >
          <Icon size={15} />
        </a>
      ))}
      <button
        onClick={copy}
        aria-label="Copy link"
        className="w-10 h-10 border border-ivory/15 text-ivory/55 hover:border-gold hover:text-gold transition-colors flex items-center justify-center"
      >
        {copied ? <Check size={15} className="text-gold" /> : <Link2 size={15} />}
      </button>
    </div>
  )
}
