'use client'

import { useEffect, useState } from 'react'

type Heading = { id: string; text: string; level: number }

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!headings.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top)
        if (visible[0]) setActiveId((visible[0].target as HTMLElement).id)
      },
      { rootMargin: '-100px 0px -65% 0px', threshold: 0 },
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (!headings.length) return null

  return (
    <nav aria-label="Table of contents" className="sticky top-28">
      <p
        className="text-gold text-[10px] tracking-[0.3em] uppercase mb-5 pb-3 border-b border-ivory/10"
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        On This Page
      </p>
      <ul className="space-y-3">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'pl-3' : ''}>
            <a
              href={`#${h.id}`}
              className={`block text-sm leading-snug transition-colors ${
                activeId === h.id ? 'text-gold' : 'text-ivory/55 hover:text-ivory'
              }`}
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
