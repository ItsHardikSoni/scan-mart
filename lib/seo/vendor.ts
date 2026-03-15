import type { Metadata } from 'next'
import { siteConfig } from './config'
import type { JsonLdSchema } from './json-ld'
import { generateBreadcrumbSchema } from './json-ld'

// ============================================================
// VENDOR DASHBOARD — METADATA
// ============================================================
// Note: These pages are protected (noindex/nofollow) because
// they are authenticated, vendor-only portal pages. They are
// still given rich metadata for share previews & app-like UX.
// ============================================================

const VENDOR_BASE_URL = `${siteConfig.url}/vendor/dashboard`
const VENDOR_OG_IMAGE = `${siteConfig.url}/og-vendor-dashboard.png`

// Shared Open Graph base for all dashboard pages
const vendorOgBase = {
    type: 'website' as const,
    siteName: `${siteConfig.name} Vendor Portal`,
    locale: 'en_IN',
    images: [
        {
            url: VENDOR_OG_IMAGE,
            width: 1200,
            height: 630,
            alt: `${siteConfig.name} Vendor Dashboard`,
            type: 'image/png',
        },
    ],
}

// Shared robots directive — private portal pages must NOT be indexed
const vendorRobots = {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
        index: false,
        follow: false,
    },
}

// ============================================================
// VENDOR DASHBOARD — OVERVIEW
// ============================================================
export const vendorDashboardMetadata: Metadata = {
    title: 'Vendor Dashboard | ScanMart',
    description:
        'Manage your ScanMart store — monitor revenue, active orders, store visits, and conversion metrics all from one unified dashboard.',
    keywords: [
        'vendor dashboard',
        'store management',
        'revenue overview',
        'order management',
        'scanmart vendor',
        'retail analytics',
    ],
    alternates: {
        canonical: `${VENDOR_BASE_URL}`,
    },
    openGraph: {
        ...vendorOgBase,
        url: VENDOR_BASE_URL,
        title: 'Vendor Dashboard — ScanMart Store Overview',
        description:
            'Your all-in-one store command centre. Track revenue, orders, visits, and conversions in real time.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ScanMart Vendor Dashboard',
        description: 'Monitor your store performance and manage orders with the ScanMart Vendor Portal.',
        images: [VENDOR_OG_IMAGE],
    },
    robots: vendorRobots,
}

// ============================================================
// VENDOR PRODUCTS / INVENTORY
// ============================================================
export const vendorProductsMetadata: Metadata = {
    title: 'Inventory Management | ScanMart Vendor',
    description:
        'Add, edit and manage your product inventory with barcode scanning. Real-time stock tracking and bulk product management for your ScanMart store.',
    keywords: [
        'inventory management',
        'product management',
        'barcode inventory',
        'stock management',
        'vendor products',
        'scanmart inventory',
        'retail inventory',
    ],
    alternates: {
        canonical: `${VENDOR_BASE_URL}/products`,
    },
    openGraph: {
        ...vendorOgBase,
        url: `${VENDOR_BASE_URL}/products`,
        title: 'Inventory Management — ScanMart Vendor Portal',
        description:
            'Manage your store inventory with barcode auto-fill, real-time stock levels, and instant product updates.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Inventory Management | ScanMart Vendor',
        description: 'Add and manage products with barcode scanning in the ScanMart Vendor Portal.',
        images: [VENDOR_OG_IMAGE],
    },
    robots: vendorRobots,
}

// ============================================================
// VENDOR BILLING / POS
// ============================================================
export const vendorBillingMetadata: Metadata = {
    title: 'Billing & POS | ScanMart Vendor',
    description:
        'Point-of-sale and billing management for your ScanMart store. Process transactions, track payments, and manage billing workflows seamlessly.',
    keywords: [
        'point of sale',
        'POS system',
        'billing management',
        'store billing',
        'scanmart POS',
        'retail billing',
        'in-store payments',
    ],
    alternates: {
        canonical: `${VENDOR_BASE_URL}/billing`,
    },
    openGraph: {
        ...vendorOgBase,
        url: `${VENDOR_BASE_URL}/billing`,
        title: 'Billing & POS — ScanMart Vendor Portal',
        description:
            'A streamlined point-of-sale system designed for ScanMart partner stores. Process payments quickly and accurately.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Billing & POS | ScanMart Vendor',
        description: 'Manage in-store transactions and billing with the ScanMart POS system.',
        images: [VENDOR_OG_IMAGE],
    },
    robots: vendorRobots,
}

// ============================================================
// VENDOR ORDERS
// ============================================================
export const vendorOrdersMetadata: Metadata = {
    title: 'Order Management | ScanMart Vendor',
    description:
        'View and manage all customer orders placed at your ScanMart store. Track order status, history, and fulfilment in real time.',
    keywords: [
        'order management',
        'vendor orders',
        'order tracking',
        'store orders',
        'scanmart orders',
        'retail order management',
    ],
    alternates: {
        canonical: `${VENDOR_BASE_URL}/orders`,
    },
    openGraph: {
        ...vendorOgBase,
        url: `${VENDOR_BASE_URL}/orders`,
        title: 'Order Management — ScanMart Vendor Portal',
        description:
            'Track and fulfil customer orders from your ScanMart store with real-time status updates.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Order Management | ScanMart Vendor',
        description: 'Manage customer orders in real time with the ScanMart Vendor Portal.',
        images: [VENDOR_OG_IMAGE],
    },
    robots: vendorRobots,
}

// ============================================================
// VENDOR SETTINGS
// ============================================================
export const vendorSettingsMetadata: Metadata = {
    title: 'Store Settings | ScanMart Vendor',
    description:
        'Configure your ScanMart store settings — update store profile, payment preferences, notifications, and integration options.',
    keywords: [
        'store settings',
        'vendor settings',
        'store configuration',
        'payment settings',
        'scanmart settings',
        'store profile',
    ],
    alternates: {
        canonical: `${VENDOR_BASE_URL}/settings`,
    },
    openGraph: {
        ...vendorOgBase,
        url: `${VENDOR_BASE_URL}/settings`,
        title: 'Store Settings — ScanMart Vendor Portal',
        description:
            'Customise your store profile, payment preferences, and notification settings for your ScanMart store.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Store Settings | ScanMart Vendor',
        description: 'Configure your ScanMart store profile and preferences.',
        images: [VENDOR_OG_IMAGE],
    },
    robots: vendorRobots,
}

// ============================================================
// JSON-LD SCHEMAS — VENDOR DASHBOARD
// ============================================================

/**
 * Vendor Portal WebPage Schema (overview)
 * Represents the authenticated vendor dashboard as a WebPage entity.
 */
export const vendorDashboardWebPageSchema: JsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${VENDOR_BASE_URL}#webpage`,
    name: 'ScanMart Vendor Dashboard',
    description:
        'Authenticated portal for ScanMart store vendors to manage inventory, orders, billing, and store settings.',
    url: VENDOR_BASE_URL,
    inLanguage: 'en-IN',
    isPartOf: {
        '@id': `${siteConfig.url}/#website`,
    },
    breadcrumb: {
        '@id': `${VENDOR_BASE_URL}#breadcrumb`,
    },
    potentialAction: {
        '@type': 'ViewAction',
        target: VENDOR_BASE_URL,
        name: 'View Vendor Dashboard',
    },
}

/**
 * Vendor Software Application Schema
 * Describes the Vendor Dashboard as a SaaS/WebApplication product.
 */
export const vendorSoftwareAppSchema: JsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${siteConfig.url}/#vendor-app`,
    name: 'ScanMart Vendor Portal',
    url: VENDOR_BASE_URL,
    description:
        'A multi-page vendor management portal built for ScanMart partner stores. Includes real-time inventory management, POS billing, order tracking, and analytics.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    browserRequirements: 'Requires JavaScript. Works on modern browsers.',
    featureList: [
        'Real-time inventory management with barcode auto-fill',
        'Point-of-sale (POS) billing system',
        'Order tracking and fulfilment',
        'Revenue and conversion analytics',
        'Push notifications via Supabase Realtime',
        'Store settings and profile management',
        'Account status and access control',
    ],
    screenshot: [
        `${siteConfig.url}/screenshots/vendor-dashboard.png`,
        `${siteConfig.url}/screenshots/vendor-inventory.png`,
        `${siteConfig.url}/screenshots/vendor-orders.png`,
    ],
    provider: {
        '@id': `${siteConfig.url}/#organization`,
    },
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        description: 'Free for approved ScanMart partner vendors',
    },
    author: {
        '@id': `${siteConfig.url}/#organization`,
    },
}

/**
 * Vendor Service Schema
 * Describes the vendor-facing service as a B2B offering.
 */
export const vendorServiceSchema: JsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteConfig.url}/#vendor-service`,
    name: 'ScanMart Vendor Management Service',
    description:
        'A complete store management solution for retail vendors — enabling smart inventory, billing, and order management.',
    serviceType: 'Retail Vendor Management Platform',
    provider: {
        '@id': `${siteConfig.url}/#organization`,
    },
    areaServed: {
        '@type': 'Country',
        name: 'India',
    },
    audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Retail Store Owners and Managers',
    },
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Vendor Portal Features',
        itemListElement: [
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Inventory Management',
                    description: 'Barcode-powered product and stock management',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Point Of Sale',
                    description: 'In-store POS billing and transaction processing',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Order Management',
                    description: 'Real-time order tracking and fulfilment',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Analytics Dashboard',
                    description: 'Revenue, visit, and conversion metrics',
                },
            },
        ],
    },
}

// ============================================================
// PRE-GENERATED BREADCRUMB SCHEMAS
// ============================================================
export const vendorDashboardBreadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Vendor Portal', url: '/vendor/dashboard' },
])

export const vendorProductsBreadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Vendor Portal', url: '/vendor/dashboard' },
    { name: 'Inventory', url: '/vendor/dashboard/products' },
])

export const vendorBillingBreadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Vendor Portal', url: '/vendor/dashboard' },
    { name: 'Billing & POS', url: '/vendor/dashboard/billing' },
])

export const vendorOrdersBreadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Vendor Portal', url: '/vendor/dashboard' },
    { name: 'Orders', url: '/vendor/dashboard/orders' },
])

export const vendorSettingsBreadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Vendor Portal', url: '/vendor/dashboard' },
    { name: 'Settings', url: '/vendor/dashboard/settings' },
])

// ============================================================
// VENDOR APPLY — METADATA & SCHEMAS
// ============================================================
// This is a PUBLIC page — should be indexed by search engines.
// It's the main acquisition funnel for new vendor partners.
// ============================================================

const APPLY_URL = `${siteConfig.url}/vendor/apply`
const APPLY_OG_IMAGE = `${siteConfig.url}/og-vendor-apply.png`

/**
 * Metadata for /vendor/apply
 * Public-facing page — index:true, rich OG + Twitter cards.
 */
export const vendorApplyMetadata: Metadata = {
    title: 'Become a Vendor Partner | ScanMart',
    description:
        'Apply to become a ScanMart vendor partner. Register your store on India\'s smartest self-checkout platform — no queue, real-time inventory management, and instant billing.',
    keywords: [
        'become a vendor',
        'vendor registration',
        'scanmart partner',
        'sell on scanmart',
        'store registration',
        'retail partner program',
        'smart store partner',
        'self-checkout vendor',
        'apply scanmart',
        'vendor onboarding india',
        'GST store registration',
        'zero queue retail partner',
    ],
    alternates: {
        canonical: APPLY_URL,
    },
    openGraph: {
        type: 'website',
        siteName: `${siteConfig.name} Partner Program`,
        locale: 'en_IN',
        url: APPLY_URL,
        title: 'Become a ScanMart Vendor Partner — Join India\'s Smart Retail Network',
        description:
            'Register your store on ScanMart and give your customers a zero-queue, self-checkout shopping experience. Fast approval, free onboarding.',
        images: [
            {
                url: APPLY_OG_IMAGE,
                width: 1200,
                height: 630,
                alt: 'ScanMart — Become a Vendor Partner',
                type: 'image/png',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Become a ScanMart Vendor Partner',
        description:
            'Join India\'s smartest retail network. Register your store for zero-queue self-checkout technology.',
        images: [APPLY_OG_IMAGE],
        site: siteConfig.twitterHandle,
        creator: siteConfig.twitterHandle,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
        },
    },
}

/**
 * RegistrationPage Schema for /vendor/apply
 * Communicates to Google that this is a sign-up/registration page.
 */
export const vendorApplyPageSchema: JsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${APPLY_URL}#webpage`,
    name: 'ScanMart Vendor Partner Application',
    description:
        'Register your retail store as a ScanMart vendor partner to enable self-checkout, inventory management, and real-time billing for your customers.',
    url: APPLY_URL,
    inLanguage: 'en-IN',
    isPartOf: {
        '@id': `${siteConfig.url}/#website`,
    },
    about: {
        '@id': `${siteConfig.url}/#vendor-service`,
    },
    potentialAction: {
        '@type': 'RegisterAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: APPLY_URL,
            actionPlatform: ['https://schema.org/DesktopWebPlatform', 'https://schema.org/MobileWebPlatform'],
        },
        name: 'Apply as a Vendor Partner',
        description: 'Submit your store details to become a ScanMart partner vendor',
        agent: {
            '@type': 'Organization',
            name: 'Retail Store Owner',
        },
    },
    breadcrumb: {
        '@id': `${APPLY_URL}#breadcrumb`,
    },
}

/**
 * Service Schema — Vendor Partner Program
 * Articulates the partner program as a B2B service offering.
 */
export const vendorPartnerProgramSchema: JsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteConfig.url}/#vendor-partner-program`,
    name: 'ScanMart Vendor Partner Program',
    description:
        'A free onboarding program for retail store owners to integrate ScanMart\'s self-checkout technology. Includes product inventory management, POS billing, real-time order tracking, and customer analytics.',
    serviceType: 'Retail Technology Partnership',
    provider: {
        '@id': `${siteConfig.url}/#organization`,
    },
    areaServed: {
        '@type': 'Country',
        name: 'India',
    },
    audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Independent Retail Store Owners, Supermarket Managers',
    },
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        description: 'Free to apply — approval required. No setup fee for approved vendors.',
        eligibleRegion: {
            '@type': 'Country',
            name: 'India',
        },
    },
    termsOfService: `${siteConfig.url}/terms`,
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'What Vendor Partners Get',
        itemListElement: [
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Vendor Dashboard Portal',
                    description: 'Full-featured store management dashboard',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Inventory Management',
                    description: 'Barcode-powered product and stock management',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Self-Checkout Integration',
                    description: 'Enable customers to scan and pay without queuing',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Real-time Order Notifications',
                    description: 'Instant alerts for new customer orders via Supabase Realtime',
                },
            },
        ],
    },
}

/**
 * FAQ Schema for /vendor/apply
 * Answers common questions vendors have before applying.
 */
export const vendorApplyFaqSchema: JsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'How do I become a ScanMart vendor partner?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Fill out the vendor application form with your store name, contact details, GST number, and location. Our admin team will review and approve your application within 1–3 business days.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is there a fee to join ScanMart as a vendor?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Joining the ScanMart vendor partner program is completely free. There are no setup charges or monthly fees for approved vendors.',
            },
        },
        {
            '@type': 'Question',
            name: 'What do I need to apply as a ScanMart vendor?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'You need a valid store name, your contact email and mobile number, your store\'s full address (state, district, pincode), and optionally a GST number.',
            },
        },
        {
            '@type': 'Question',
            name: 'How long does vendor approval take?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Our admin team typically reviews and approves vendor applications within 1–3 business days. You will receive an email confirmation once your account is approved.',
            },
        },
        {
            '@type': 'Question',
            name: 'What happens after my vendor account is approved?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'After approval, you can log in to the ScanMart Vendor Portal to manage your product inventory, view customer orders, process billing, and configure your store settings.',
            },
        },
    ],
}

// Breadcrumb for /vendor/apply
export const vendorApplyBreadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Become a Vendor', url: '/vendor/apply' },
])
