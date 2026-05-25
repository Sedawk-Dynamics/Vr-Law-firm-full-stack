import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter-var',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VR Law Firm | Expert Legal Counsel',
  description:
    'VR Law Firm delivers authoritative legal counsel across corporate, litigation, intellectual property, and regulatory matters with decades of excellence.',
  keywords: ['law firm', 'legal services', 'corporate law', 'litigation', 'VR Law Firm'],
  openGraph: {
    title: 'VR Law Firm | Expert Legal Counsel',
    description: 'Authoritative legal expertise in criminal litigation and civil matters.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0f1628',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} bg-background`} suppressHydrationWarning>
      <body className="font-serif antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}
