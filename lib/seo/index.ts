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

// Vendor Dashboard Metadata Exports
export {
  vendorDashboardMetadata,
  vendorProductsMetadata,
  vendorBillingMetadata,
  vendorOrdersMetadata,
  vendorSettingsMetadata,
  // Vendor Apply (public) Metadata
  vendorApplyMetadata,
  // Vendor JSON-LD Schemas
  vendorDashboardWebPageSchema,
  vendorSoftwareAppSchema,
  vendorServiceSchema,
  // Vendor Apply JSON-LD Schemas
  vendorApplyPageSchema,
  vendorPartnerProgramSchema,
  vendorApplyFaqSchema,
  // Vendor Breadcrumbs
  vendorDashboardBreadcrumbSchema,
  vendorProductsBreadcrumbSchema,
  vendorBillingBreadcrumbSchema,
  vendorOrdersBreadcrumbSchema,
  vendorSettingsBreadcrumbSchema,
  vendorApplyBreadcrumbSchema,
} from './vendor'

// JSON-LD Schema Exports
export {
  // Global Schemas
  organizationSchema,
  websiteSchema,
  softwareAppSchema,
  developerSchema,
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
