"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Split, ArrowRightLeft, ShieldCheck, CheckCircle2, ListChecks, Info, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const splitFeatures = [
  {
    title: "Automated Payouts",
    description: "Vendor payouts are calculated and triggered automatically upon successful checkout.",
    icon: Split,
    items: [
      "Zero manual intervention",
      "Instant settlement routing",
      "Verified tax calculations"
    ],
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    title: "Secure Reconciliation",
    description: "Clear audit logs and reporting for both vendors and platform administrators.",
    icon: ShieldCheck,
    items: [
      "Transparent fee breakdown",
      "Real-time auditability",
      "Fraud-resistant mapping"
    ],
    color: "bg-secondary dark:bg-secondary",
    textColor: "text-black dark:text-black"
  }
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

export default function RazorpaySplitSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Checkout Intelligence
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Razorpay Split Payment System
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Multi-vendor carts processed seamlessly. ScanMart automatically splits the
            total amount and routes funds to each respective vendor in real-time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 p-8 rounded-2xl bg-primary/5 border border-primary/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <ArrowRightLeft className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-foreground">Intelligent Fund Routing</h4>
                <p className="mt-1 text-muted-foreground">Cart Total: <span className="font-bold text-foreground">₹500</span></p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="px-4 py-2 rounded-lg bg-card border border-border flex items-center gap-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Vendor A: ₹200
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <div className="px-4 py-2 rounded-lg bg-card border border-border flex items-center gap-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Vendor B: ₹300
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2"
        >
          {splitFeatures.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants} className="h-full">
              <Card className="group h-full border-none bg-card shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className={`relative z-10 mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${feature.color} shadow-lg transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon className={`h-6 w-6 ${feature.textColor}`} />
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>

                  <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  <ul className="space-y-3">
                    {feature.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle2 className="mr-3 h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex items-center gap-3 text-muted-foreground text-sm italic"
        >
          <Info className="h-4 w-4 text-primary" />
          Note: Transactions include comprehensive logs for tax reconciliation and automated audits.
        </motion.div>
      </div>
    </section>
  )
}
