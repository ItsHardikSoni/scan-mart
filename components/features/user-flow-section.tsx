"use client"

import { UserCheck, ScanBarcode, ShoppingCart, CreditCard, FileText } from "lucide-react"
import { motion } from "framer-motion"

const flowSteps = [
  {
    icon: UserCheck,
    title: "Login / Signup",
    description: "Secure authentication with email or phone verification.",
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    icon: ScanBarcode,
    title: "Scan Products",
    description: "Instantly scan barcodes with your phone camera.",
    color: "bg-secondary dark:bg-secondary",
    textColor: "text-black dark:text-black"
  },
  {
    icon: ShoppingCart,
    title: "View Cart",
    description: "Real-time cart and running total display.",
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    icon: CreditCard,
    title: "Process Payment",
    description: "Secure checkout via Razorpay gateway.",
    color: "bg-secondary dark:bg-secondary",
    textColor: "text-black dark:text-black"
  },
  {
    icon: FileText,
    title: "Get Invoice",
    description: "Download digital receipt and exit store.",
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
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

export function UserFlowSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            User Journey
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            User Experience Flow
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A streamlined journey from entry to exit
          </p>
        </motion.div>

        <div className="mt-16">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border md:block" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-12"
            >
              {flowSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  className={`relative flex flex-col items-center gap-8 md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className={`inline-block rounded-xl bg-card p-6 shadow-lg ${index % 2 === 0 ? "md:ml-auto" : ""}`}>
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`relative z-10 mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${step.color} shadow-lg transition-transform duration-300 hover:scale-110`}>
                    <step.icon className={`h-8 w-8 ${step.textColor}`} />
                    <div className="absolute -bottom-8 text-sm font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden flex-1 md:block" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
