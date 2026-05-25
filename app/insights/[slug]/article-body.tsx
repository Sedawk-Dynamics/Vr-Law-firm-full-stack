'use client'

import { useState } from 'react'
import { BlogContent } from '@/components/insights/blog-content'
import { TableOfContents } from '@/components/insights/table-of-contents'

type Heading = { id: string; text: string; level: number }

export function ArticleBody({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([])

  return (
    <section className="max-w-7xl mx-auto px-6 pb-20 lg:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr] gap-12 lg:gap-16">
        <div className="hidden lg:block">
          <TableOfContents headings={headings} />
        </div>
        <div className="max-w-3xl">
          <BlogContent html={content} onHeadings={setHeadings} />
        </div>
      </div>
    </section>
  )
}
