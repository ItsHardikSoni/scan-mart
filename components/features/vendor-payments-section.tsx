"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Wallet, LineChart, CheckCircle2, QrCode, ArrowRightLeft, ShieldCheck, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const paymentFeatures = [
  {
    title: "Vendor UPI/QR",
    description: "Accept payments directly via your registered UPI ID or customizable QR codes.",
    icon: QrCode,
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    title: "Payment Gateway",
    description: "Secure enterprise-grade processing with automated vendor payout routing.",
    icon: ArrowRightLeft,
    color: "bg-secondary dark:bg-secondary",
    textColor: "text-black dark:text-black"
  },
  {
    title: "Real-time Monitoring",
    description: "Deep insights and reconciliation tools directly in your vendor dashboard.",
    icon: LineChart,
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
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

export default function VendorPaymentsSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Financial Infrastructure
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Vendor Payment System
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            A flexible and secure payout system designed to route customer payments
            instantly to your preferred gateway or UPI account.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          {paymentFeatures.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants} className="h-full">
              <Card className="group h-full border-none bg-card shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className={`relative z-10 mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${feature.color} shadow-lg transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon className={`h-6 w-6 ${feature.textColor}`} />
                  </div>

                  <h3 className="mb-4 text-xl font-bold text-foreground">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-8 rounded-2xl bg-primary/5 border border-primary/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Dynamic Routing Example</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground border border-border">
                    Vendor A → <span className="text-primary ml-1">vendorA@upi</span>
                  </span>
                  <span className="inline-flex items-center rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground border border-border">
                    Vendor B → <span className="text-primary ml-1">vendorB@upi</span>
                  </span>
                </div>
              </div>
            </div>
            <p className="md:max-w-xs text-sm text-muted-foreground italic">
              "ScanMart automatically routes payments based on the active store session, ensuring zero-latency payouts."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
