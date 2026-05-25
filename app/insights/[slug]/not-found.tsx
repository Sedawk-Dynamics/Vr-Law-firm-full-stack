import Link from 'next/link'
import { ArrowLeft, FileQuestion } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function ArticleNotFound() {
  return (
    <main className="min-h-screen bg-navy text-ivory flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 py-32 text-center">
        <div className="max-w-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 border border-gold/40 rounded-full mb-8">
            <FileQuestion size={24} className="text-gold" />
          </div>
          <p
            className="text-gold text-[11px] tracking-[0.35em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            404 — Article Not Found
          </p>
          <h1
            className="text-ivory leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300 }}
          >
            This piece may have been{' '}
            <em className="text-gold not-italic">withdrawn or moved.</em>
          </h1>
          <p
            className="text-ivory/60 text-base leading-relaxed mb-10"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Return to the Insights index for the latest analysis, case studies, and legal
            updates from the firm.
          </p>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-navy text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-gold-light transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Insights
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
