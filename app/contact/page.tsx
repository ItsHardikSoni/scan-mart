import type { Metadata } from "next"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with ScanMart",
  description: "Have questions about ScanMart? Contact our team for support, partnerships, or general inquiries. We are here to help you with your self-checkout needs.",
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

// JSON-LD for Contact Page (ContactPage Schema)
const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact ScanMart',
  description: 'Get in touch with the ScanMart team',
  mainEntity: {
    '@type': 'Organization',
    name: 'ScanMart',
    email: 'support@scanmart.app',
    telephone: '+1-555-123-4567',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@scanmart.app',
        telephone: '+1-555-123-4567',
        availableLanguage: ['English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'partnerships@scanmart.app',
      },
    ],
    sameAs: [
      'https://twitter.com/scanmart',
      'https://facebook.com/scanmart',
      'https://linkedin.com/company/scanmart',
      'https://instagram.com/scanmart',
    ],
  },
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-0 h-[400px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-[300px] w-[400px] rounded-full bg-secondary/30 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Get In Touch
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Contact
              <span className="text-primary"> Us</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Have questions about ScanMart? We&apos;d love to hear from you. Get in touch and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  )
}
