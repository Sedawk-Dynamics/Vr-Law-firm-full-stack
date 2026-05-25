'use client'

import { useEffect, useState } from 'react'

export function BlogContent({ html, onHeadings }: { html: string; onHeadings?: (h: { id: string; text: string; level: number }[]) => void }) {
  const [processedHtml, setProcessedHtml] = useState(html)

  useEffect(() => {
    const headings: { id: string; text: string; level: number }[] = []
    const processed = html.replace(/<h([23])>(.*?)<\/h\1>/gi, (_m, level, text) => {
      const plain = String(text).replace(/<[^>]+>/g, '').trim()
      const id =
        plain
          .toLowerCase()
          .replace(/['"`]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '') || `h-${headings.length}`
      headings.push({ id, text: plain, level: Number(level) })
      return `<h${level} id="${id}">${text}</h${level}>`
    })
    setProcessedHtml(processed)
    onHeadings?.(headings)
  }, [html, onHeadings])

  return (
    <div
      className="
        text-ivory/80 text-left max-w-[760px]
        [&_h1]:text-ivory [&_h1]:font-serif [&_h1]:text-4xl [&_h1]:lg:text-5xl [&_h1]:font-light [&_h1]:mt-0 [&_h1]:mb-6 [&_h1]:leading-tight [&_h1]:tracking-tight
        [&_h2]:text-ivory [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:lg:text-4xl [&_h2]:font-light [&_h2]:mt-14 [&_h2]:mb-6 [&_h2]:leading-[1.2] [&_h2]:scroll-mt-28
        [&_h3]:text-ivory [&_h3]:font-serif [&_h3]:text-2xl [&_h3]:font-light [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:leading-snug [&_h3]:scroll-mt-28
        [&_p]:text-[16px] [&_p]:lg:text-[17px] [&_p]:leading-[1.85] [&_p]:mb-6 [&_p]:text-ivory/75
        [&_a]:text-gold [&_a]:underline [&_a]:decoration-gold/40 [&_a]:underline-offset-4 hover:[&_a]:decoration-gold
        [&_strong]:text-ivory [&_strong]:font-medium
        [&_em]:italic
        [&_ul]:my-7 [&_ul]:space-y-3 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:marker:text-gold/60
        [&_ol]:my-7 [&_ol]:space-y-3 [&_ol]:pl-5 [&_ol]:list-decimal [&_ol]:marker:text-gold/60
        [&_li]:text-ivory/75 [&_li]:leading-[1.8] [&_li]:pl-1
        [&_blockquote]:border-l-2 [&_blockquote]:border-gold [&_blockquote]:pl-6 [&_blockquote]:py-3 [&_blockquote]:my-10 [&_blockquote]:text-xl [&_blockquote]:lg:text-2xl [&_blockquote]:text-ivory/85 [&_blockquote]:italic [&_blockquote]:font-light [&_blockquote]:leading-relaxed
        [&_table]:w-full [&_table]:my-10 [&_table]:border-collapse
        [&_th]:text-left [&_th]:text-gold [&_th]:text-[10px] [&_th]:tracking-[0.2em] [&_th]:uppercase [&_th]:font-medium [&_th]:py-3 [&_th]:border-b [&_th]:border-gold/30
        [&_td]:py-3 [&_td]:border-b [&_td]:border-ivory/10 [&_td]:text-ivory/75 [&_td]:text-sm
        [&_img]:my-10 [&_img]:w-full [&_img]:rounded
        [&_code]:bg-ivory/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-gold [&_code]:text-sm
        [&_hr]:my-14 [&_hr]:border-ivory/10
        [&>*:first-child]:mt-0
      "
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  )
}
