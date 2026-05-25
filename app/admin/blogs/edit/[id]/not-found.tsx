import Link from 'next/link'
import { ArrowLeft, FileQuestion } from 'lucide-react'

export default function EditBlogNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-14 h-14 border border-gold/40 rounded-full mb-6">
          <FileQuestion size={20} className="text-gold" />
        </div>
        <h1 className="text-ivory text-2xl font-light mb-3">Article not found</h1>
        <p
          className="text-ivory/55 text-sm mb-7"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          The article you are looking for may have been deleted or moved.
        </p>
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-navy rounded text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-gold-light transition-colors"
        >
          <ArrowLeft size={13} />
          All Articles
        </Link>
      </div>
    </div>
  )
}
