import { Metadata } from "next"
import { FeaturesHero } from "@/components/features/features-hero"
import { CustomerAppSection } from "@/components/features/customer-app-section"
import { SecurityLayerSection } from "@/components/features/security-layer-section"
import { AdminPanelSection } from "@/components/features/admin-panel-section"
import { UserFlowSection } from "@/components/features/user-flow-section"

export const metadata: Metadata = {
  title: "Features - ScanMart",
  description: "Explore the powerful features of ScanMart - barcode scanning, secure payments, admin panel, and more.",
}

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <CustomerAppSection />
      <SecurityLayerSection />
      <AdminPanelSection />
      <UserFlowSection />
    </>
  )
}
