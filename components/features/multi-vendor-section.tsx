"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Store, ShieldCheck, Zap, ArrowRight, LayoutDashboard, Settings2, PackagePlus, ReceiptText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    title: "Vendor Account Creation",
    description: "Launch your digital presence with sophisticated store management tools.",
    icon: Store,
    items: [
      { text: "Separate login dashboard", icon: LayoutDashboard },
      { text: "Store management tools", icon: Settings2 },
      { text: "Product management system", icon: PackagePlus },
      { text: "Order & transaction monitoring", icon: ReceiptText },
    ],
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    title: "Independent Vendor Control",
    description: "Full autonomy over your listings, pricing, and inventory management.",
    icon: ShieldCheck,
    content: "Each vendor has full control over their listings, pricing and inventory. ScanMart enforces isolation between vendor stores to avoid data conflict.",
    color: "bg-secondary dark:bg-secondary",
    textColor: "text-black dark:text-black"
  },
  {
    title: "Onboarding & Verification",
    description: "Streamlined registration designed for rapid business scale-up.",
    icon: Zap,
    content: "Fast onboarding flows with verification steps to register business details, UPI/QR setup, and store configuration.",
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

export default function MultiVendorSection() {
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
            For Supermarkets & Stores
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Multi-Vendor Smart Platform
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            ScanMart is a marketplace-grade platform designed for retail evolution.
            Onboard as a vendor and operate your independent store within our ecosystem.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants} className="h-full">
              <Card className="group h-full border-none bg-card shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className={`relative z-10 mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${feature.color} shadow-lg transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon className={`h-6 w-6 ${feature.textColor}`} />
                  </div>

                  <h3 className="mb-4 text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>

                  <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {feature.items ? (
                    <ul className="space-y-3 border-t border-border pt-6">
                      {feature.items.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          <item.icon className="mr-3 h-4 w-4 text-primary" />
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="border-t border-border pt-6">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.content}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 text-center"
        >
          <button className="inline-flex items-center rounded-full bg-secondary px-8 py-3.5 text-sm font-semibold text-black shadow-lg shadow-primary/20 transition-all hover:bg-secondary/90 group">
            Become a Vendor Today
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
