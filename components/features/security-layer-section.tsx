import { MapPin, MonitorOff, CreditCard, ShieldCheck } from "lucide-react"

const securityFeatures = [
  {
    icon: MapPin,
    title: "Location Restriction",
    description: "App functionality is geo-fenced to work only within store premises.",
  },
  {
    icon: MonitorOff,
    title: "Screenshot Prevention",
    description: "Built-in protection against screenshots and screen recording.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "PCI-DSS compliant payment processing through Razorpay.",
  },
  {
    icon: ShieldCheck,
    title: "Data Encryption",
    description: "End-to-end encryption for all user data and transactions.",
  },
]

export function SecurityLayerSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Security Layer
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Enterprise-Grade Security
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We take security seriously. ScanMart is built with multiple layers of protection to ensure your data and transactions are always safe.
            </p>

            <div className="mt-10 space-y-6">
              {securityFeatures.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative rounded-2xl bg-muted p-8 lg:p-12">
              {/* Decorative elements */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-secondary/40 blur-2xl" />
              
              <div className="relative flex flex-col items-center justify-center space-y-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-lg">
                  <ShieldCheck className="h-12 w-12 text-primary-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">256-bit</p>
                  <p className="text-sm text-muted-foreground">AES Encryption</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center rounded-lg bg-card p-4 shadow">
                    <p className="text-lg font-bold text-primary">SSL</p>
                    <p className="text-xs text-muted-foreground">Secured</p>
                  </div>
                  <div className="flex flex-col items-center rounded-lg bg-card p-4 shadow">
                    <p className="text-lg font-bold text-primary">PCI</p>
                    <p className="text-xs text-muted-foreground">Compliant</p>
                  </div>
                  <div className="flex flex-col items-center rounded-lg bg-card p-4 shadow">
                    <p className="text-lg font-bold text-primary">2FA</p>
                    <p className="text-xs text-muted-foreground">Enabled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
