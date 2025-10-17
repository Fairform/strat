import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Strata AI - Meeting Minutes in 10 Minutes | Australian Strata & Body Corporate',
  description:
    'AI-powered strata meeting minutes for NSW, VIC, QLD, SA, WA. Upload your recording, get legally compliant minutes in 10 minutes. From $199 per meeting.',
  keywords: [
    'strata minutes',
    'body corporate minutes',
    'AGM minutes',
    'strata meeting',
    'Australia',
    'NSW strata',
    'VIC body corporate',
    'QLD strata',
    'meeting transcription',
    'AI minutes',
    'strata management',
    'body corporate management',
  ],
  authors: [{ name: 'Strata AI' }],
  creator: 'Strata AI',
  publisher: 'Strata AI',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://strata-ai.com'),
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: '/',
    title: 'Strata AI - Meeting Minutes in 10 Minutes',
    description:
      'AI-powered strata meeting minutes. Upload recordings, get compliant minutes in 10 minutes. All Australian states.',
    siteName: 'Strata AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Strata AI - AI-powered meeting minutes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strata AI - Meeting Minutes in 10 Minutes',
    description:
      'AI-powered strata meeting minutes. Upload recordings, get compliant minutes in 10 minutes.',
    images: ['/og-image.png'],
    creator: '@strataai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  category: 'technology',
  classification: 'Business Software',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366F1" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="font-sans antialiased bg-white text-neutral-900" suppressHydrationWarning>
        {children}

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Strata AI',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '199',
                priceCurrency: 'AUD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '127',
              },
              description:
                'AI-powered strata meeting minutes generator for Australian strata schemes and body corporate meetings.',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Strata AI',
              url: process.env.NEXT_PUBLIC_APP_URL || 'https://strata-ai.com',
              logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://strata-ai.com'}/logo.png`,
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+61-1300-STRATA',
                contactType: 'Customer Service',
                areaServed: 'AU',
                availableLanguage: 'en',
              },
              sameAs: [
                'https://twitter.com/strataai',
                'https://linkedin.com/company/strata-ai',
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
