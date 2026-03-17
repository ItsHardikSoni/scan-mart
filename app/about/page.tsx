import { InventorySoftwareSection } from "@/components/about/inventory-software-section"
import { VisionSection } from "@/components/about/vision-section"
import { ValuesSection } from "@/components/about/values-section"
import { CtaSection } from "@/components/about/cta-section"
import { JsonLd } from "@/components/seo/json-ld"
import { aboutMetadata, aboutPageSchema, aboutBreadcrumbSchema } from "@/lib/seo"

// Export metadata from centralized SEO files
export const metadata = aboutMetadata

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={[aboutPageSchema, aboutBreadcrumbSchema]} />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 md:py-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-0 h-[400px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-[300px] w-[400px] rounded-full bg-secondary/30 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              About Us
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Revolutionizing
              <span className="text-primary"> Retail Shopping</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              We're on a mission to eliminate checkout queues and make supermarket shopping faster, smarter, and more convenient.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <VisionSection />

      {/* Values Section */}
      <ValuesSection />

      {/* Inventory Software Section */}
      <InventorySoftwareSection />

      {/* Stats Section */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-4xl font-bold text-primary-foreground md:text-5xl">15+</p>
              <p className="mt-2 text-primary-foreground/80">Minutes Saved Per Trip</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-foreground md:text-5xl">100%</p>
              <p className="mt-2 text-primary-foreground/80">Queue-Free Shopping</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-foreground md:text-5xl">256-bit</p>
              <p className="mt-2 text-primary-foreground/80">Encryption Security</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-foreground md:text-5xl">24/7</p>
              <p className="mt-2 text-primary-foreground/80">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </>
  )
}
