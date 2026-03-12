import type { Metadata } from "next"
import { FeaturesHero } from "@/components/features/features-hero"
import { CustomerAppSection } from "@/components/features/customer-app-section"
import { SecurityLayerSection } from "@/components/features/security-layer-section"
import { AdminPanelSection } from "@/components/features/admin-panel-section"
import { UserFlowSection } from "@/components/features/user-flow-section"

export const metadata: Metadata = {
  title: "Features - Smart Self-Checkout App Features",
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

// JSON-LD for Features Page (ItemList Schema)
const featuresSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'ScanMart Features',
  description: 'Complete list of ScanMart app features',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Barcode Scanning',
      description: 'Scan product barcodes instantly using your smartphone camera',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Real-Time Cart Management',
      description: 'Add, remove, and modify cart items with live price updates',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Secure Payments',
      description: 'Pay securely via UPI, credit cards, debit cards, or wallets',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Geolocation Verification',
      description: 'App activates only when inside partner store locations',
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'QR Code Checkout',
      description: 'Show QR code at exit gate for quick verification',
    },
    {
      '@type': 'ListItem',
      position: 6,
      name: 'Digital Receipts',
      description: 'Receive instant digital receipts via email',
    },
  ],
}

export default function FeaturesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featuresSchema) }}
      />
      <FeaturesHero />
      <CustomerAppSection />
      <SecurityLayerSection />
      <AdminPanelSection />
      <UserFlowSection />
    </>
  )
}
