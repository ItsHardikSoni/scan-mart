// SEO Configuration - Central configuration for all SEO-related settings
export const siteConfig = {
  name: 'ScanMart',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://scanmart.app',
  ogImage: '/og-image.png',
  favicon: '/favicon.ico',
  description: 'ScanMart is a smart self-checkout solution that allows customers to scan products, pay instantly, and exit the store without waiting in billing queues.',
  tagline: 'Scan. Shop. Go. Skip the Queue',
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
  links: {
    twitter: 'https://twitter.com/scanmart',
    facebook: 'https://facebook.com/scanmart',
    linkedin: 'https://linkedin.com/company/scanmart',
    instagram: 'https://instagram.com/scanmart',
  },
  contact: {
    email: 'support@scanmart.app',
    phone: '+1-555-123-4567',
    address: {
      locality: 'San Francisco',
      region: 'CA',
      country: 'US',
    },
  },
  creator: 'ScanMart Team',
  twitterHandle: '@scanmart',
  
  // Developer Information
  developer: {
    name: 'Hardik Soni',
    role: 'Full Stack Developer',
    image: '/developer.jpg',
    bio: 'Passionate developer creating innovative solutions for modern retail experiences.',
    social: {
      instagram: 'https://instagram.com/itshardiktech',
      twitter: 'https://twitter.com/itshardiktech',
      github: 'https://github.com/ItsHardikSoni',
      portfolio: 'https://hardiks.tech',
    },
  },
}
