import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { FaqSection } from "@/components/contact/faq-section"
import { JsonLd } from "@/components/seo/json-ld"
import { contactMetadata, contactPageSchema, contactBreadcrumbSchema } from "@/lib/seo"

// Export metadata from centralized SEO files
export const metadata = contactMetadata

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={[contactPageSchema, contactBreadcrumbSchema]} />

      <ContactHero />
      <ContactForm />
      <FaqSection />
    </>
  )
}
