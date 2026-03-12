import { Target, Eye, Lightbulb, Users, Rocket, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { JsonLd } from "@/components/seo/json-ld"
import { aboutMetadata, aboutPageSchema, aboutBreadcrumbSchema } from "@/lib/seo"

// Export metadata from centralized SEO files
export const metadata = aboutMetadata

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Constantly pushing boundaries to create cutting-edge solutions.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Every feature is designed with the customer experience in mind.",
  },
  {
    icon: Rocket,
    title: "Efficiency",
    description: "Streamlining processes to save time for everyone.",
  },
  {
    icon: Heart,
    title: "Quality",
    description: "Committed to delivering excellence in every interaction.",
  },
]

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
      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Our Vision
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                The Future of Shopping
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  ScanMart aims to revolutionize the retail shopping experience by removing checkout lines and empowering customers with mobile self-checkout technology.
                </p>
                <p>
                  Our mission is to make supermarket shopping faster, smarter, and more convenient. We believe that technology should simplify life, not complicate it.
                </p>
                <p>
                  By putting the power of checkout in customers' hands, we're creating a shopping experience that respects your time and enhances your convenience.
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="border-none bg-card shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <Target className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Mission</h3>
                  <p className="text-sm text-muted-foreground">
                    To eliminate waiting time at supermarket checkouts through innovative mobile technology.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none bg-card shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                    <Eye className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Vision</h3>
                  <p className="text-sm text-muted-foreground">
                    A world where shopping is seamless, efficient, and enjoyable for everyone.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              What Drives Us
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="group text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <value.icon className="h-8 w-8 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Join the Revolution
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Be part of the future of retail shopping. ScanMart is coming soon to Android and iOS devices.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-6 py-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
              </span>
              <span className="font-medium text-primary">Coming Soon on Android & iOS</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
