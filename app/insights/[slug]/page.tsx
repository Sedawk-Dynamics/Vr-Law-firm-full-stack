import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { findAll, findById } from '@/lib/blog-store'
import { CATEGORY_META } from '@/lib/blog-types'
import { formatDate } from '@/lib/blog-api'
import { ShareButtons } from '@/components/insights/share-buttons'
import { RelatedArticles } from '@/components/insights/related-articles'
import { PrevNextNav } from '@/components/insights/prev-next-nav'
import { LegalCTA } from '@/components/insights/legal-cta'
import { ArticleBody } from './article-body'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await findById(slug)
  if (!post || post.status !== 'published') return { title: 'Article not found' }
  return {
    title: post.seoTitle || `${post.title} | VR Law Firm`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      images: post.ogImage ? [post.ogImage] : [post.featuredImage],
      publishedTime: post.publishedAt ?? undefined,
    },
  }
}

export const dynamic = 'force-dynamic'

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = await findById(slug)
  if (!post || post.status !== 'published') notFound()

  const all = (await findAll()).filter((p) => p.status === 'published')
  const sorted = all.sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
  const idx = sorted.findIndex((p) => p.id === post.id)
  const previous = idx > 0 ? sorted[idx - 1] : null
  const next = idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null
  const related = all
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3)

  const shareUrl = `https://vr-lawfirm.com/insights/${post.slug}`

  return (
    <main className="min-h-screen bg-navy text-ivory">
      <Navbar />

      <article>
        <header className="relative pt-36 lg:pt-44 pb-12 overflow-hidden">
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(180deg, oklch(0.14 0.02 255) 0%, oklch(0.14 0.02 255 / 0.4) 60%, oklch(0.14 0.02 255) 100%), url(${post.featuredImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-ivory/55 hover:text-gold text-[11px] tracking-[0.25em] uppercase mb-8 transition-colors"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              <ArrowLeft size={12} /> All Insights
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-7">
              <span
                className="bg-gold text-navy text-[10px] tracking-[0.25em] uppercase px-3 py-1.5"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                {CATEGORY_META[post.category].label}
              </span>
              <span
                className="text-ivory/45 text-[11px] tracking-[0.22em] uppercase"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                {formatDate(post.publishedAt)}
              </span>
              <span className="text-ivory/30">·</span>
              <span
                className="inline-flex items-center gap-1.5 text-ivory/45 text-[11px] tracking-[0.22em] uppercase"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                <Clock size={11} className="text-gold/60" />
                {post.readingMinutes} min read
              </span>
            </div>
            <h1
              className="text-ivory text-balance leading-[1.05] mb-7"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', fontWeight: 300 }}
            >
              {post.title}
            </h1>
            <p
              className="text-ivory/65 text-lg lg:text-xl leading-relaxed max-w-3xl mb-9"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-6 pt-7 border-t border-ivory/10">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full bg-cover bg-center border border-gold/30"
                  style={{ backgroundImage: `url(${post.author.avatar || '/placeholder-user.jpg'})` }}
                  aria-hidden
                />
                <div>
                  <p className="text-ivory text-sm font-medium">{post.author.name}</p>
                  {post.author.title ? (
                    <p
                      className="text-ivory/45 text-xs tracking-wider uppercase"
                      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                      {post.author.title}
                    </p>
                  ) : null}
                </div>
              </div>
              {/* <ShareButtons url={shareUrl} title={post.title} /> */}
            </div>
          </div>
        </header>

        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mb-14 lg:mb-20">
          <div
            className="relative w-full aspect-[16/8] lg:aspect-[16/7] bg-cover bg-center"
            style={{ backgroundImage: `url(${post.featuredImage})` }}
            role="img"
            aria-label={post.title}
          />
        </div>

        <ArticleBody content={post.content} />
      </article>

      <RelatedArticles posts={related} />
      <PrevNextNav previous={previous} next={next} />
      <LegalCTA />
      <Footer />
    </main>
  )
}
