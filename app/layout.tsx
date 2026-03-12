import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://scanmart.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ScanMart - Scan. Shop. Go. Skip the Queue',
    template: '%s | ScanMart'
  },
  description: 'ScanMart is a smart self-checkout solution that allows customers to scan products, pay instantly, and exit the store without waiting in billing queues. Coming soon to Android & iOS.',
  generator: 'Next.js',
  applicationName: 'ScanMart',
  keywords: [
    'self-checkout',
    'supermarket app',
    'mobile checkout',
    'barcode scanner',
    'skip queue',
    'scan and pay',
    'retail technology',
    'smart shopping',
    'contactless payment',
    'grocery app',
    'queue-free shopping',
    'mobile payment app'
  ],
  authors: [{ name: 'ScanMart Team', url: siteUrl }],
  creator: 'ScanMart',
  publisher: 'ScanMart',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'ScanMart',
    title: 'ScanMart - Scan. Shop. Go. Skip the Queue',
    description: 'ScanMart is a smart self-checkout solution that allows customers to scan products, pay instantly, and exit the store without waiting in billing queues.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ScanMart - Smart Self-Checkout App',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScanMart - Scan. Shop. Go. Skip the Queue',
    description: 'Smart self-checkout solution for supermarkets. Scan products, pay instantly, and skip the queue.',
    site: '@scanmart',
    creator: '@scanmart',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#6A1B9A' },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#6A1B9A' },
    { media: '(prefers-color-scheme: dark)', color: '#6A1B9A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light',
}

// JSON-LD Structured Data for Organization
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ScanMart',
  url: 'https://scanmart.app',
  logo: 'https://scanmart.app/logo.png',
  description: 'Smart self-checkout solution for supermarkets',
  foundingDate: '2024',
  sameAs: [
    'https://twitter.com/scanmart',
    'https://facebook.com/scanmart',
    'https://linkedin.com/company/scanmart',
    'https://instagram.com/scanmart',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-123-4567',
    contactType: 'customer service',
    email: 'support@scanmart.app',
    availableLanguage: ['English'],
  },
}

// JSON-LD Structured Data for WebSite
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ScanMart',
  url: 'https://scanmart.app',
  description: 'ScanMart is a smart self-checkout solution that allows customers to scan products, pay instantly, and exit the store without waiting in billing queues.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://scanmart.app/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

// JSON-LD Structured Data for Software Application
const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ScanMart',
  operatingSystem: ['Android', 'iOS'],
  applicationCategory: 'ShoppingApplication',
  description: 'Smart self-checkout mobile app for supermarkets. Scan products, pay instantly, and skip the queue.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1000',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
