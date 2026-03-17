"use client"

import { ScanBarcode, ShoppingCart, Receipt, CreditCard } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const customerFeatures = [
  {
    icon: ScanBarcode,
    title: "Barcode Scanning",
    description: "Instantly scan product barcodes using your smartphone camera with high accuracy and speed.",
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    icon: ShoppingCart,
    title: "Cart Management",
    description: "Add, remove, and modify items in your cart with real-time quantity and price updates.",
    color: "bg-secondary dark:bg-secondary",
    textColor: "text-black dark:text-black"
  },
  {
    icon: Receipt,
    title: "Real-Time Billing",
    description: "See your running total as you shop with instant price calculations and tax breakdown.",
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    icon: CreditCard,
    title: "Online Payment",
    description: "Secure payment processing through Razorpay with multiple payment options available.",
    color: "bg-secondary dark:bg-secondary",
    textColor: "text-black dark:text-black"
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100
    }
  }
}

export function CustomerAppSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            For Customers
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Customer App Features
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            A seamless mobile experience designed to make your shopping faster and more convenient.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {customerFeatures.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card
                className="group h-full border-none bg-card shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="p-6">
                  <div className={`relative z-10 mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${feature.color} shadow-lg transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon className={`h-6 w-6 ${feature.textColor}`} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
