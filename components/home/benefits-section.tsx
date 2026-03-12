import { Zap, Smartphone, Shield, BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const benefits = [
  {
    icon: Zap,
    title: "Time Efficiency",
    description: "Eliminates waiting time at checkout counters. Shop faster and get back to what matters.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Experience",
    description: "Designed for smartphone users with smooth scanning and intuitive interface.",
    gradient: "from-secondary/40 to-secondary/10",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Location restriction and screenshot protection ensure secure transactions.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: BarChart3,
    title: "Real-Time Data",
    description: "Accurate price updates and inventory tracking for seamless shopping.",
    gradient: "from-secondary/40 to-secondary/10",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why Choose Us
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Key Features & Benefits
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Experience the future of supermarket shopping with these powerful features
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {benefits.map((benefit) => (
            <Card
              key={benefit.title}
              className="group overflow-hidden border-none shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className={`bg-gradient-to-br ${benefit.gradient} p-8`}>
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-card shadow-md">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
