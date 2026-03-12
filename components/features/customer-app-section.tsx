import { ScanBarcode, ShoppingCart, Receipt, CreditCard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const customerFeatures = [
  {
    icon: ScanBarcode,
    title: "Barcode Scanning",
    description: "Instantly scan product barcodes using your smartphone camera with high accuracy and speed.",
  },
  {
    icon: ShoppingCart,
    title: "Cart Management",
    description: "Add, remove, and modify items in your cart with real-time quantity and price updates.",
  },
  {
    icon: Receipt,
    title: "Real-Time Billing",
    description: "See your running total as you shop with instant price calculations and tax breakdown.",
  },
  {
    icon: CreditCard,
    title: "Online Payment",
    description: "Secure payment processing through Razorpay with multiple payment options available.",
  },
]

export function CustomerAppSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            For Customers
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Customer App Features
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            A seamless mobile experience designed to make your shopping faster and more convenient.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {customerFeatures.map((feature) => (
            <Card
              key={feature.title}
              className="group border-none bg-card shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
