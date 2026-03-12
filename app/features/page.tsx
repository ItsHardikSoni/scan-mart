import { FeaturesHero } from "@/components/features/features-hero"
import { CustomerAppSection } from "@/components/features/customer-app-section"
import { SecurityLayerSection } from "@/components/features/security-layer-section"
import { AdminPanelSection } from "@/components/features/admin-panel-section"
import { UserFlowSection } from "@/components/features/user-flow-section"
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
    </>
  )
}
