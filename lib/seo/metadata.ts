import type { Metadata, Viewport } from 'next'
import { siteConfig } from './config'

// ============================================
// BASE METADATA - Root Layout
// ============================================
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  generator: 'Next.js',
  applicationName: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  keywords: siteConfig.keywords,
  authors: [
    { name: siteConfig.creator, url: siteConfig.url },
    { name: siteConfig.developer.name, url: siteConfig.developer.social.portfolio },
  ],
  creator: siteConfig.developer.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Smart Self-Checkout App`,
        type: 'image/png',
      },
      {
        url: '/og-image-square.png',
        width: 600,
        height: 600,
        alt: `${siteConfig.name} Logo`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: 'Smart self-checkout solution for supermarkets. Scan products, pay instantly, and skip the queue.',
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    images: {
      url: siteConfig.ogImage,
      alt: `${siteConfig.name} - Smart Self-Checkout App`,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
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
  classification: 'Business/Retail Technology',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': siteConfig.name,
    'msapplication-TileColor': '#6A1B9A',
    'msapplication-config': '/browserconfig.xml',
  },
}

// ============================================
// VIEWPORT CONFIGURATION
// ============================================
export const baseViewport: Viewport = {
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

// ============================================
// HOME PAGE METADATA
// ============================================
export const homeMetadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline} | Smart Self-Checkout App`,
  description: 'ScanMart revolutionizes supermarket shopping with mobile self-checkout. Scan products with your phone, pay instantly, and skip long billing queues. Coming soon to Android & iOS.',
  keywords: [
    'self-checkout app',
    'supermarket mobile app',
    'scan and pay',
    'skip queue shopping',
    'contactless checkout',
    'smart retail app',
    'grocery shopping app',
    'barcode scanner app'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: 'Revolutionize your supermarket shopping. Scan products, pay instantly, and skip the queue with ScanMart.',
    url: '/',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ScanMart - Smart Self-Checkout App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: 'Revolutionize your supermarket shopping with mobile self-checkout.',
    images: ['/og-image.png'],
  },
}

// ============================================
// FEATURES PAGE METADATA
// ============================================
export const featuresMetadata: Metadata = {
  title: 'Features - Smart Self-Checkout App Features',
  description: "Discover ScanMart's powerful features: barcode scanning, real-time cart management, secure payments, geolocation verification, admin dashboard, and seamless checkout experience.",
  keywords: [
    'barcode scanner app',
    'mobile checkout features',
    'secure payment app',
    'cart management',
    'admin dashboard',
    'geolocation verification',
    'QR code checkout',
    'retail app features'
  ],
  alternates: {
    canonical: '/features',
  },
  openGraph: {
    title: 'ScanMart Features - Powerful Self-Checkout Technology',
    description: 'Explore the innovative features that make ScanMart the future of supermarket shopping.',
    url: '/features',
    type: 'website',
    images: [
      {
        url: '/og-features.png',
        width: 1200,
        height: 630,
        alt: 'ScanMart Features Overview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScanMart Features - Smart Self-Checkout Technology',
    description: 'Barcode scanning, secure payments, real-time cart management, and more.',
    images: ['/og-features.png'],
  },
}

// ============================================
// ABOUT PAGE METADATA
// ============================================
export const aboutMetadata: Metadata = {
  title: 'About Us - Our Mission to Transform Retail Shopping',
  description: "Learn about ScanMart's mission to revolutionize retail shopping. We're eliminating checkout queues with innovative mobile self-checkout technology for a faster, smarter shopping experience.",
  keywords: [
    'about scanmart',
    'retail technology company',
    'self-checkout innovation',
    'shopping app company',
    'mobile checkout startup',
    'retail innovation',
    'queue-free shopping mission'
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About ScanMart - Revolutionizing Retail Shopping',
    description: 'Discover our mission to eliminate checkout queues and transform the supermarket shopping experience.',
    url: '/about',
    type: 'website',
    images: [
      {
        url: '/og-about.png',
        width: 1200,
        height: 630,
        alt: 'About ScanMart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ScanMart - Our Mission & Vision',
    description: 'Learn how we are transforming the future of retail shopping.',
    images: ['/og-about.png'],
  },
}

// ============================================
// CONTACT PAGE METADATA
// ============================================
export const contactMetadata: Metadata = {
  title: 'Contact Us - Get in Touch with ScanMart',
  description: 'Have questions about ScanMart? Contact our team for support, partnerships, or general inquiries. We are here to help you with your self-checkout needs.',
  keywords: [
    'contact scanmart',
    'scanmart support',
    'self-checkout help',
    'customer service',
    'partnership inquiries',
    'retail app support'
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact ScanMart - We Would Love to Hear From You',
    description: 'Get in touch with the ScanMart team for support, partnerships, or general inquiries.',
    url: '/contact',
    type: 'website',
    images: [
      {
        url: '/og-contact.png',
        width: 1200,
        height: 630,
        alt: 'Contact ScanMart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact ScanMart',
    description: 'Have questions? Get in touch with our team.',
    images: ['/og-contact.png'],
  },
}
