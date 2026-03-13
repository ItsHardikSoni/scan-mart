import { FeaturesHero } from "@/components/features/features-hero"
import { CustomerAppSection } from "@/components/features/customer-app-section"
import { SecurityLayerSection } from "@/components/features/security-layer-section"
import { AdminPanelSection } from "@/components/features/admin-panel-section"
import { UserFlowSection } from "@/components/features/user-flow-section"
import MultiVendorSection from '@/components/features/multi-vendor-section'
import VendorStoreConfigSection from '@/components/features/vendor-store-config-section'
import LocationRestrictedSection from '@/components/features/location-restricted-section'
import SmartStoreDetectionSection from '@/components/features/smart-store-detection-section'
import VendorPaymentsSection from '@/components/features/vendor-payments-section'
import RazorpaySplitSection from '@/components/features/razorpay-split-section'
import BenefitsSection from '@/components/features/benefits-section'
import VisualsSection from '@/components/features/visuals-section'
import FeatureCards from '@/components/features/feature-cards'
import ArchitectureSection from '@/components/features/architecture-section'
import ComingSoonCTA from '@/components/features/coming-soon-cta'
import { JsonLd } from "@/components/seo/json-ld"
import {
  featuresMetadata,
  featuresListSchema,
  featuresServiceSchema,
  featuresBreadcrumbSchema
} from "@/lib/seo"

// Export metadata from centralized SEO files
export const metadata = featuresMetadata

export default function FeaturesPage() {
  return (
    <>
      <JsonLd schema={[featuresListSchema, featuresServiceSchema, featuresBreadcrumbSchema]} />
      <FeaturesHero />
      <CustomerAppSection />
      <SecurityLayerSection />
      <AdminPanelSection />
      <UserFlowSection />
      <MultiVendorSection />
      <VendorStoreConfigSection />
      <LocationRestrictedSection />
      <SmartStoreDetectionSection />
      <VendorPaymentsSection />
      <RazorpaySplitSection />
      <FeatureCards />
      <BenefitsSection />
      <VisualsSection />
      <ArchitectureSection />
      <ComingSoonCTA />
    </>
  )
}
