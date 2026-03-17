"use client"

import { ScanBarcode, Plus, CreditCard, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    icon: ScanBarcode,
    title: "Scan",
    description: "Scan product barcodes using your phone camera.",
    color: "bg-primary",
    textColor: "text-primary-foreground",
  },
  {
    number: "02",
    icon: Plus,
    title: "Add to Cart",
    description: "Products are instantly added with real-time pricing.",
    color: "bg-secondary",
    textColor: "text-secondary-foreground",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Pay",
    description: "Secure payment using Razorpay gateway.",
    color: "bg-primary",
    textColor: "text-primary-foreground",
  },
  {
    number: "04",
    icon: ArrowRight,
    title: "Go",
    description: "Walk out of the store without standing in a queue.",
    color: "bg-secondary",
    textColor: "text-secondary-foreground",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
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

export function HowItWorksSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Simple Process
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Four simple steps to a queue-free shopping experience
          </p>
        </motion.div>

        <div className="mt-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((step, index) => (
              <motion.div key={step.title} variants={itemVariants} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-16 hidden h-0.5 w-full bg-border lg:block" />
                )}

                <div className="relative flex flex-col items-center text-center">
                  {/* Step number */}
                  <div className="mb-4 text-sm font-bold text-muted-foreground">
                    Step {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} shadow-lg`}>
                    <step.icon className={`h-8 w-8 ${step.textColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
