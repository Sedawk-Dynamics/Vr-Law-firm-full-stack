import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { findAll } from '@/lib/blog-store'
import { InsightsHero } from '@/components/insights/insights-hero'
import { FeaturedInsight } from '@/components/insights/featured-insight'
import { InsightsGrid } from '@/components/insights/insights-grid'
import { LegalCTA } from '@/components/insights/legal-cta'

export const metadata: Metadata = {
  title: 'Insights & Legal Perspectives | VR Law Firm',
  description:
    'Analysis, case studies, and legal updates from VR Law Firm — POCSO, cyber crime, family law, and civil practice in Kerala.',
  openGraph: {
    title: 'Insights & Legal Perspectives | VR Law Firm',
    description: 'Practitioner notes from VR Law Firm.',
    type: 'website',
  },
}

export const dynamic = 'force-dynamic'

export default async function InsightsPage() {
  const all = (await findAll()).filter((p) => p.status === 'published')
  const featured = all.find((p) => p.featured) ?? all[0]
  const rest = all.filter((p) => p.id !== featured?.id)

  return (
    <main className="min-h-screen bg-navy text-ivory">
      <Navbar />
      <InsightsHero />
      {featured ? <FeaturedInsight post={featured} /> : null}
      <InsightsGrid posts={rest} />
      <LegalCTA />
      <Footer />
    </main>
  )
}
