import type { Metadata } from "next"
import { HeroSection } from "@/components/home/hero-section"
import { ProblemSection } from "@/components/home/problem-section"
import { SolutionSection } from "@/components/home/solution-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { BenefitsSection } from "@/components/home/benefits-section"
import { SecuritySection } from "@/components/home/security-section"
import { CTASection } from "@/components/home/cta-section"

export const metadata: Metadata = {
  title: 'ScanMart - Scan. Shop. Go. Skip the Queue | Smart Self-Checkout App',
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
    title: 'ScanMart - Scan. Shop. Go. Skip the Queue',
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
    title: 'ScanMart - Scan. Shop. Go. Skip the Queue',
    description: 'Revolutionize your supermarket shopping with mobile self-checkout.',
    images: ['/og-image.png'],
  },
}

// JSON-LD for Home Page (FAQ Schema)
const faqSchema = {
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
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <BenefitsSection />
      <SecuritySection />
      <CTASection />
    </>
  )
}
