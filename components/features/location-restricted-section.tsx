"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, ShieldCheck, Zap, Info, Pointer, Navigation, Lock, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const locationFeatures = [
  {
    title: "How it works",
    description: "Multi-layered validation to ensure every scan happens exactly where it should.",
    icon: Zap,
    type: "step",
    items: [
      { text: "Request device location permission", icon: Pointer },
      { text: "Check against vendor's geofence", icon: Navigation },
      { text: "Enable scanning inside allowed area", icon: Lock },
      { text: "Auto-disable scanner if user exits", icon: ShieldCheck },
    ],
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    title: "Security Benefits",
    description: "Enterprise-grade protection for inventory and transaction integrity.",
    icon: ShieldCheck,
    type: "benefit",
    items: [
      { text: "Eliminates off-site scanning fraud", icon: CheckCircle2 },
      { text: "Protects real-time inventory data", icon: CheckCircle2 },
      { text: "Ties receipts to physical sessions", icon: CheckCircle2 },
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

export default function LocationRestrictedSection() {
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
            Fraud Prevention
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Location-Restricted Scanning
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            ScanMart uses advanced GPS and geofencing to ensure that shopping happens
            only within the physical boundaries of the store.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 lg:grid-cols-2"
        >
          {locationFeatures.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="group h-full border-none bg-card shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className={`relative z-10 mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${feature.color} shadow-lg transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon className={`h-6 w-6 ${feature.textColor}`} />
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>

                  <p className="mb-8 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  <ul className="space-y-4 pt-6 border-t border-border">
                    {feature.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {feature.type === "step" && <span className="mr-3 font-mono text-xs font-bold text-primary/50">{idx + 1}.</span>}
                        <item.icon className={`mr-3 h-4 w-4 ${feature.type === "benefit" ? "text-primary" : "text-primary/70"}`} />
                        {item.text}
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
          className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4"
        >
          <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h5 className="font-semibold text-foreground">Precision Geofencing</h5>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Our system enforces transactions only within verified business coordinates, eliminating the risk of off-site cart manipulation or mock-location fraud.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
