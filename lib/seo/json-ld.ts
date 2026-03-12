import { siteConfig } from './config'

// Type definitions for JSON-LD schemas
export type JsonLdSchema = Record<string, unknown>

// ============================================
// GLOBAL SCHEMAS (Used in Root Layout)
// ============================================

/**
 * Organization Schema
 * Provides structured data about the company/organization
 */
export const organizationSchema: JsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: {
    '@type': 'ImageObject',
    url: `${siteConfig.url}/logo.png`,
    width: 512,
    height: 512,
  },
  description: 'Smart self-checkout solution for supermarkets',
  foundingDate: '2024',
  sameAs: [
    siteConfig.links.twitter,
    siteConfig.links.facebook,
    siteConfig.links.linkedin,
    siteConfig.links.instagram,
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: siteConfig.contact.phone,
    contactType: 'customer service',
    email: siteConfig.contact.email,
    availableLanguage: ['English'],
    areaServed: 'Worldwide',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.contact.address.locality,
    addressRegion: siteConfig.contact.address.region,
    addressCountry: siteConfig.contact.address.country,
  },
}

/**
 * WebSite Schema
 * Provides structured data about the website
 */
export const websiteSchema: JsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: {
    '@id': `${siteConfig.url}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'en-US',
}

/**
 * Software Application Schema
 * Provides structured data about the mobile app
 */
export const softwareAppSchema: JsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${siteConfig.url}/#app`,
  name: siteConfig.name,
  operatingSystem: ['Android', 'iOS'],
  applicationCategory: 'ShoppingApplication',
  description: 'Smart self-checkout mobile app for supermarkets. Scan products, pay instantly, and skip the queue.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/PreOrder',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1000',
    bestRating: '5',
    worstRating: '1',
  },
  author: {
    '@id': `${siteConfig.url}/#organization`,
  },
  screenshot: [
    `${siteConfig.url}/screenshots/app-home.png`,
    `${siteConfig.url}/screenshots/app-scan.png`,
    `${siteConfig.url}/screenshots/app-cart.png`,
  ],
  featureList: [
    'Barcode Scanning',
    'Real-time Cart Management',
    'Secure Payments',
    'QR Code Checkout',
    'Digital Receipts',
  ],
}

// ============================================
// PAGE-SPECIFIC SCHEMAS
// ============================================

/**
 * Home Page - FAQ Schema
 * Provides structured data for frequently asked questions
 */
export const homeFaqSchema: JsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is ScanMart?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ScanMart is a smart self-checkout mobile app that allows customers to scan products, manage their cart, pay instantly, and exit the store without waiting in billing queues.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does ScanMart work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Simply open the app at a partner store, scan product barcodes using your phone camera, review your cart, pay securely through multiple payment options, and show your QR code at the exit gate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is ScanMart secure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! ScanMart uses 256-bit encryption, geolocation verification to ensure in-store usage, screenshot prevention, and secure payment processing.',
      },
    },
    {
      '@type': 'Question',
      name: 'When will ScanMart be available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ScanMart is coming soon to both Android and iOS platforms. Sign up for notifications to be the first to know when we launch.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment methods does ScanMart support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ScanMart supports multiple payment methods including UPI, credit cards, debit cards, and digital wallets for a seamless checkout experience.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I exit the store after using ScanMart?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'After completing your payment, you will receive a unique QR code. Simply show this QR code at the exit gate for verification, and you can walk out of the store.',
      },
    },
  ],
}

/**
 * Home Page - HowTo Schema
 * Provides step-by-step instructions for using the app
 */
export const homeHowToSchema: JsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use ScanMart Self-Checkout',
  description: 'Step-by-step guide to using ScanMart for queue-free shopping',
  totalTime: 'PT5M',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'USD',
    value: '0',
  },
  step: [
    {
      '@type': 'HowToStep',
      name: 'Open App',
      text: 'Open ScanMart when you enter a partner supermarket',
      position: 1,
      image: `${siteConfig.url}/steps/step-1.png`,
    },
    {
      '@type': 'HowToStep',
      name: 'Scan Products',
      text: 'Use your phone camera to scan product barcodes as you shop',
      position: 2,
      image: `${siteConfig.url}/steps/step-2.png`,
    },
    {
      '@type': 'HowToStep',
      name: 'Review Cart',
      text: 'Review your cart and make any adjustments before checkout',
      position: 3,
      image: `${siteConfig.url}/steps/step-3.png`,
    },
    {
      '@type': 'HowToStep',
      name: 'Pay & Exit',
      text: 'Pay securely and show your QR code at the exit gate',
      position: 4,
      image: `${siteConfig.url}/steps/step-4.png`,
    },
  ],
}

/**
 * Features Page - ItemList Schema
 * Provides structured data for the list of features
 */
export const featuresListSchema: JsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'ScanMart Features',
  description: 'Complete list of ScanMart app features',
  numberOfItems: 6,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Barcode Scanning',
      description: 'Scan product barcodes instantly using your smartphone camera with high accuracy',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Real-Time Cart Management',
      description: 'Add, remove, and modify cart items with live price updates and running total',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Secure Payments',
      description: 'Pay securely via UPI, credit cards, debit cards, or digital wallets',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Geolocation Verification',
      description: 'App activates only when inside partner store locations for security',
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'QR Code Checkout',
      description: 'Show QR code at exit gate for quick and easy verification',
    },
    {
      '@type': 'ListItem',
      position: 6,
      name: 'Digital Receipts',
      description: 'Receive instant digital receipts via email for easy record keeping',
    },
  ],
}

/**
 * Features Page - Service Schema
 * Provides structured data about the service offerings
 */
export const featuresServiceSchema: JsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'ScanMart Self-Checkout Service',
  description: 'Mobile self-checkout solution for supermarkets and retail stores',
  provider: {
    '@id': `${siteConfig.url}/#organization`,
  },
  serviceType: 'Self-Checkout Technology',
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'ScanMart Solutions',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Customer Mobile App',
          description: 'Self-checkout mobile app for shoppers',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Store Admin Dashboard',
          description: 'Management dashboard for store administrators',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Security Integration',
          description: 'Exit gate verification system integration',
        },
      },
    ],
  },
}

/**
 * About Page - AboutPage Schema
 * Provides structured data about the about page
 */
export const aboutPageSchema: JsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${siteConfig.url}/about#webpage`,
  name: `About ${siteConfig.name}`,
  description: `Learn about ${siteConfig.name}'s mission to revolutionize the retail shopping experience`,
  url: `${siteConfig.url}/about`,
  isPartOf: {
    '@id': `${siteConfig.url}/#website`,
  },
  about: {
    '@id': `${siteConfig.url}/#organization`,
  },
  mainEntity: {
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
    foundingDate: '2024',
    slogan: siteConfig.tagline,
    knowsAbout: [
      'Self-checkout technology',
      'Mobile payment solutions',
      'Retail innovation',
      'Barcode scanning technology',
      'Contactless payments',
      'Queue management',
      'Customer experience optimization',
    ],
    award: [
      'Innovative Retail Technology 2024',
    ],
  },
}

/**
 * Contact Page - ContactPage Schema
 * Provides structured data about the contact page
 */
export const contactPageSchema: JsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${siteConfig.url}/contact#webpage`,
  name: `Contact ${siteConfig.name}`,
  description: `Get in touch with the ${siteConfig.name} team`,
  url: `${siteConfig.url}/contact`,
  isPartOf: {
    '@id': `${siteConfig.url}/#website`,
  },
  mainEntity: {
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.contact.address.locality,
      addressRegion: siteConfig.contact.address.region,
      addressCountry: siteConfig.contact.address.country,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        availableLanguage: ['English'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'partnerships@scanmart.app',
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'technical support',
        email: 'tech@scanmart.app',
        availableLanguage: ['English'],
      },
    ],
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.facebook,
      siteConfig.links.linkedin,
      siteConfig.links.instagram,
    ],
  },
}

/**
 * Breadcrumb Schema Generator
 * Creates breadcrumb schema for any page
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

// Pre-generated breadcrumbs for static pages
export const homeBreadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
])

export const featuresBreadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Features', url: '/features' },
])

export const aboutBreadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
])

export const contactBreadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Contact', url: '/contact' },
])
