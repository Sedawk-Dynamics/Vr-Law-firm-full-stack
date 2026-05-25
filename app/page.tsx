import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { MarqueeStrip } from '@/components/marquee-strip'
import { StatsSection } from '@/components/stats-section'
import { PracticeAreas } from '@/components/practice-areas'
import { AboutSection } from '@/components/about-section'
import { TeamSection } from '@/components/team-section'
import { ExpertiseSection } from '@/components/expertise-section'
import { GallerySection } from '@/components/gallery-section'
import { InsightsSection } from '@/components/insights-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <StatsSection />
      <PracticeAreas />
      <AboutSection />
      {/* <TeamSection /> */}
      <ExpertiseSection />
      <GallerySection />
      <InsightsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
