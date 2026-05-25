'use client'

const items = [
  'Corporate Law',
  'Mergers & Acquisitions',
  'Regulatory Affairs',
  'Intellectual Property',
  'Dispute Resolution',
  'Banking & Finance',
  'Real Estate',
  'Employment Law',
  'Tax Advisory',
  'International Arbitration',
]

export function MarqueeStrip() {
  const repeated = [...items, ...items]

  return (
    <div className="bg-gold overflow-hidden py-3 relative" aria-hidden="true">
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 mx-6 text-navy text-[11px] tracking-[0.3em] uppercase font-medium"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-navy/40 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
