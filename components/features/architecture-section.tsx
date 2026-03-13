"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Smartphone, LayoutDashboard, Cloud, Layers, CheckCircle2, Server, Database, ShieldCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const systemLayers = [
  {
    title: "Mobile App (Customer)",
    description: "The primary touchpoint for users, providing scanning and secure checkout.",
    icon: Smartphone,
    features: [
      "Barcode scanning & cart mgmt",
      "Real-time location verification",
      "Secure payment orchestration"
    ],
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    title: "Vendor Dashboard",
    description: "A centralized command center for store owners to manage operations.",
    icon: LayoutDashboard,
    features: [
      "Dynamic catalog management",
      "Automated payout configuration",
      "Deep transaction analytics"
    ],
    color: "bg-secondary dark:bg-secondary",
    textColor: "text-black dark:text-black"
  },
  {
    title: "Cloud & Payment Engine",
    description: "The intelligent backend powering the entire platform ecosystem.",
    icon: Cloud,
    features: [
      "Razorpay gateway orchestration",
      "Multi-vendor inventory routing",
      "Secure store geo-fencing"
    ],
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

export default function ArchitectureSection() {
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
            System Infrastructure
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Technical Architecture
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            A distributed and high-concurrency system designed to provide
            enterprise-grade reliability and seamless merchant integration.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {systemLayers.map((layer) => (
            <motion.div key={layer.title} variants={itemVariants}>
              <Card className="group h-full border-none bg-muted/30 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className={`relative z-10 mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${layer.color} shadow-lg transition-all duration-300 group-hover:scale-110`}>
                    <layer.icon className={`h-6 w-6 ${layer.textColor}`} />
                  </div>

                  <h3 className="mb-4 text-xl font-bold text-foreground">
                    {layer.title}
                  </h3>

                  <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                    {layer.description}
                  </p>

                  <ul className="space-y-3">
                    {layer.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs text-muted-foreground">
                        <CheckCircle2 className="mr-2 h-3.5 w-3.5 text-primary" />
                        {feature}
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
          className="mt-12 p-8 rounded-2xl border border-dashed border-border flex flex-wrap justify-between items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-secondary text-black">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Core Components</p>
              <p className="text-sm font-medium text-foreground">End-to-end Retail Stack</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {[Server, Database, ShieldCheck].map((Icon, i) => (
              <div key={i} className="px-4 py-2 rounded-lg bg-muted/50 border border-border flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground font-medium">
                  {i === 0 ? "Cloud APIs" : i === 1 ? "Cloud DB" : "PCI-DSS Gateway"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
