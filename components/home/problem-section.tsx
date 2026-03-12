import { Clock, Timer, Users, Frown, ScanLine } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const problems = [
  {
    icon: Users,
    title: "Long Queues",
    description: "Customers wait 10-15 minutes during peak hours even when buying a few items.",
  },
  {
    icon: Timer,
    title: "Time Wasted",
    description: "Checkout lines consume valuable shopping time that could be spent elsewhere.",
  },
  {
    icon: Clock,
    title: "Limited Staff",
    description: "Insufficient billing counters create bottlenecks during busy hours.",
  },
  {
    icon: Frown,
    title: "Customer Frustration",
    description: "Slow billing leads to abandoned purchases and negative experiences.",
  },
  {
    icon: ScanLine,
    title: "Slow Manual Scanning",
    description: "Traditional checkout scanning and billing are inefficient and outdated.",
  },
]

export function ProblemSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            The Problem with Traditional Checkout
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Traditional supermarket checkout systems are broken. Here's why customers are frustrated:
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <Card
              key={problem.title}
              className="group border-none bg-card shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive transition-colors group-hover:bg-destructive group-hover:text-white">
                  <problem.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {problem.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
