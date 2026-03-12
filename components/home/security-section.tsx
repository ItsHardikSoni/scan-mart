import { MapPin, MonitorOff, LogOut, Lock } from "lucide-react"

const securityFeatures = [
  {
    icon: MapPin,
    title: "Location-Based Access",
    description: "Scanning works only inside store premises for secure transactions.",
  },
  {
    icon: MonitorOff,
    title: "Screenshot Protection",
    description: "Prevents screen recording and screenshots to protect your data.",
  },
  {
    icon: LogOut,
    title: "Session Management",
    description: "Automatic logout when user exits store location for safety.",
  },
  {
    icon: Lock,
    title: "Secure Authentication",
    description: "Encrypted login system and secure Razorpay payment gateway.",
  },
]

export function SecuritySection() {
  return (
    <section className="bg-foreground py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Your Security Matters
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-background md:text-4xl">
            Security Implementation
          </h2>
          <p className="mt-4 text-lg text-background/70">
            We've built robust security measures to protect your shopping experience
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {securityFeatures.map((feature) => (
            <div key={feature.title} className="group text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary transition-transform duration-300 group-hover:scale-110">
                <feature.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-background">
                {feature.title}
              </h3>
              <p className="text-sm text-background/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
