import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Atrio — The Operating System for Build-to-Rent Developers',
  description:
    'Atrio helps boutique developers manage leasing, rent, maintenance, and tenants from one elegant platform. The modern operating system for build-to-rent property management.',
  keywords: [
    'build-to-rent',
    'property management',
    'real estate software',
    'developer tools',
    'BTR management',
    'rental portfolio',
    'property operations',
    'tenant management',
    'lease management',
    'Australia property',
    'property tech',
    'proptech',
  ],
  authors: [{ name: 'Atrio' }],
  creator: 'Atrio',
  publisher: 'Atrio',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://atrio.com'),
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: '/',
    title: 'Atrio — The Operating System for Build-to-Rent Developers',
    description:
      'Manage leasing, rent, maintenance, and tenants from one elegant platform. The modern operating system for build-to-rent property management.',
    siteName: 'Atrio',
    images: [
      {
        url: '/og-atrio.png',
        width: 1200,
        height: 630,
        alt: 'Atrio - The Operating System for Build-to-Rent Developers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atrio — The Operating System for Build-to-Rent Developers',
    description:
      'Manage leasing, rent, maintenance, and tenants from one elegant platform.',
    images: ['/og-atrio.png'],
    creator: '@atrio',
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
        <meta name="theme-color" content="#C4733A" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="font-sans antialiased bg-background text-primary" suppressHydrationWarning>
        {children}

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Atrio',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '99',
                priceCurrency: 'AUD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '127',
              },
              description:
                'The operating system for build-to-rent developers. Manage leasing, rent, maintenance, and tenants from one elegant platform.',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Atrio',
              url: process.env.NEXT_PUBLIC_APP_URL || 'https://atrio.com',
              logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://atrio.com'}/atrio-logo.svg`,
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+61-1300-ATRIO',
                contactType: 'Customer Service',
                areaServed: 'AU',
                availableLanguage: 'en',
              },
              sameAs: [
                'https://twitter.com/atrio',
                'https://linkedin.com/company/atrio',
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
