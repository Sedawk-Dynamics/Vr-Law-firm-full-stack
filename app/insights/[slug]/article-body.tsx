'use client'

import { useState } from 'react'
import { BlogContent } from '@/components/insights/blog-content'
import { TableOfContents } from '@/components/insights/table-of-contents'

type Heading = { id: string; text: string; level: number }

export function ArticleBody({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([])

  return (
    <section className="max-w-[1200px] mx-auto px-6 lg:px-10 pb-20 lg:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] xl:grid-cols-[minmax(0,1fr)_280px] gap-12 lg:gap-16 items-start">
        <div className="min-w-0 text-left">
          <BlogContent html={content} onHeadings={setHeadings} />
        </div>
        <div className="hidden lg:block">
          <TableOfContents headings={headings} />
        </div>
      </div>
    </section>
  )
}
