import { ContactForm } from "@/components/contact/contact-form"
import { JsonLd } from "@/components/seo/json-ld"
import { contactMetadata, contactPageSchema, contactBreadcrumbSchema } from "@/lib/seo"

// Export metadata from centralized SEO files
export const metadata = contactMetadata

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={[contactPageSchema, contactBreadcrumbSchema]} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-0 h-[400px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-[300px] w-[400px] rounded-full bg-secondary/30 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Get In Touch
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Contact
              <span className="text-primary"> Us</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Have questions about ScanMart? We&apos;d love to hear from you. Get in touch and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  )
}
