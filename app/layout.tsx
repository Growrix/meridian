import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Meridian Estates',
    default: 'Meridian Estates | Luxury Real Estate',
  },
  description:
    'Meridian Estates specializes in luxury residential properties $500k and above. Find your perfect home in the most sought-after neighborhoods of Los Angeles.',
  keywords: [
    'luxury real estate Los Angeles',
    'Bel Air homes',
    'Beverly Hills properties',
    'Malibu estates',
    'luxury homes for sale',
    'Meridian Estates',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Meridian Estates',
    title: 'Meridian Estates | Luxury Real Estate',
    description:
      'Exclusive luxury properties curated by Meridian Estates. $500k+ residential specialists in Los Angeles.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meridian Estates | Luxury Real Estate',
    description:
      'Exclusive luxury properties curated by Meridian Estates. $500k+ residential specialists in Los Angeles.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'Meridian Estates',
              description: 'Luxury residential real estate specialists serving the $500k+ market.',
              url: 'https://meridianestates.com',
              telephone: '+1-310-555-0190',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '9200 Sunset Boulevard, Suite 800',
                addressLocality: 'Los Angeles',
                addressRegion: 'CA',
                postalCode: '90069',
                addressCountry: 'US',
              },
            }),
          }}
        />
      </head>
      <body className="font-body bg-bg text-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-dark-bg focus:font-body focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
