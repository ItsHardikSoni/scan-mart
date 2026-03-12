// SEO Barrel Export
// Central export for all SEO-related configurations

// Site Configuration
export { siteConfig } from './config'

// Metadata Exports
export {
  baseMetadata,
  baseViewport,
  homeMetadata,
  featuresMetadata,
  aboutMetadata,
  contactMetadata,
} from './metadata'

// JSON-LD Schema Exports
export {
  // Global Schemas
  organizationSchema,
  websiteSchema,
  softwareAppSchema,
  // Home Page Schemas
  homeFaqSchema,
  homeHowToSchema,
  homeBreadcrumbSchema,
  // Features Page Schemas
  featuresListSchema,
  featuresServiceSchema,
  featuresBreadcrumbSchema,
  // About Page Schemas
  aboutPageSchema,
  aboutBreadcrumbSchema,
  // Contact Page Schemas
  contactPageSchema,
  contactBreadcrumbSchema,
  // Utility Functions
  generateBreadcrumbSchema,
} from './json-ld'

// Type Exports
export type { JsonLdSchema } from './json-ld'
