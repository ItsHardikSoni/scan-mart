import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { JsonLd } from '@/components/seo/json-ld'
import ScrollToTop from '@/components/scroll-to-top'
import {
  baseMetadata,
  baseViewport,
  organizationSchema,
  websiteSchema,
  softwareAppSchema,
  developerSchema
} from '@/lib/seo'

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
});

// Export metadata and viewport from centralized SEO files
export const metadata = baseMetadata
export const viewport = baseViewport

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Primary Meta Tags */}
        <meta name="title" content="ScanMart - Scan. Shop. Go. Skip the Queue" />
        <meta name="description" content="ScanMart is a smart self-checkout solution that allows customers to scan products, pay instantly, and exit the store without waiting in billing queues." />
        <meta name="keywords" content="self-checkout, supermarket app, mobile checkout, barcode scanner, skip queue, scan and pay, retail technology, smart shopping, contactless payment, grocery app" />
        <meta name="author" content="Hardik Soni" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://scanmart.app/" />
        <meta property="og:title" content="ScanMart - Scan. Shop. Go. Skip the Queue" />
        <meta property="og:description" content="ScanMart is a smart self-checkout solution for supermarkets. Scan products, pay instantly, and skip the queue." />
        <meta property="og:image" content="https://scanmart.app/og-image.png" />
        <meta property="og:site_name" content="ScanMart" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://scanmart.app/" />
        <meta name="twitter:title" content="ScanMart - Scan. Shop. Go. Skip the Queue" />
        <meta name="twitter:description" content="Smart self-checkout solution for supermarkets. Scan products, pay instantly, and skip the queue." />
        <meta name="twitter:image" content="https://scanmart.app/og-image.png" />
        <meta name="twitter:site" content="@scanmart" />
        <meta name="twitter:creator" content="@itshardiktech" />

        {/* Additional Meta Tags */}
        <meta name="application-name" content="ScanMart" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ScanMart" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#6A1B9A" />
        <meta name="theme-color" content="#6A1B9A" />

        {/* Canonical URL */}
        {/* <link rel="canonical" href="https://scanmart.app/" /> */}

        {/* Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* JSON-LD Structured Data */}
        <JsonLd schema={[organizationSchema, websiteSchema, softwareAppSchema, developerSchema]} />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Navbar />
        <ScrollToTop />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
