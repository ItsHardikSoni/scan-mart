"use client"

import { ScanBarcode, ShoppingCart, CreditCard, DoorOpen, Check } from "lucide-react"
import { motion } from "framer-motion"

const capabilities = [
  {
    icon: ScanBarcode,
    text: "Scan product barcodes instantly using mobile camera",
  },
  {
    icon: ShoppingCart,
    text: "Real-time cart updates with running total",
  },
  {
    icon: CreditCard,
    text: "Secure in-app payment processing using Razorpay",
  },
  {
    icon: DoorOpen,
    text: "Exit store directly without visiting the billing counter",
  },
]

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const listItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100
    }
  }
}

export function SolutionSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                The Solution
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Scan & Pay
              </h2>
            </div>

            <p className="text-lg text-muted-foreground">
              Customers transform their smartphones into portable checkout devices, eliminating waiting time entirely.
            </p>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <h3 className="font-semibold text-foreground">Our Objective</h3>
              <p className="mt-2 text-muted-foreground">
                Reduce waiting time and transform the supermarket shopping experience through mobile self-checkout technology.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Key Capabilities</h3>
              <motion.ul
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {capabilities.map((capability) => (
                  <motion.li key={capability.text} variants={listItemVariants} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <capability.icon className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <span className="pt-2 text-muted-foreground">{capability.text}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative rounded-2xl bg-muted p-8 lg:p-12">
              {/* Decorative elements */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-secondary/40 blur-2xl" />

              <div className="relative space-y-6">
                <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <ScanBarcode className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Smart Scanning</p>
                    <p className="text-sm text-muted-foreground">Instant barcode recognition</p>
                  </div>
                  <Check className="ml-auto h-5 w-5 text-green-500" />
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                    <ShoppingCart className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Live Cart</p>
                    <p className="text-sm text-muted-foreground">Real-time price updates</p>
                  </div>
                  <Check className="ml-auto h-5 w-5 text-green-500" />
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <CreditCard className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Secure Payment</p>
                    <p className="text-sm text-muted-foreground">Razorpay integration</p>
                  </div>
                  <Check className="ml-auto h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
