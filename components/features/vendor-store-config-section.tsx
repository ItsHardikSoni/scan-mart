"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Store, MapPin, Gauge, ShieldCheck, CreditCard, Info, LayoutDashboard, Settings2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const configFeatures = [
  {
    title: "Store Settings",
    description: "Define your store's digital identity and basic operational parameters.",
    icon: Settings2,
    items: [
      { text: "Store name & description", icon: Store },
      { text: "Store address or location", icon: MapPin },
      { text: "Operating hours", icon: Gauge },
    ],
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    title: "Geofence & Payments",
    description: "Secure your store perimeter and configure instant payout methods.",
    icon: ShieldCheck,
    items: [
      { text: "Configurable Geofence Radius", icon: MapPin },
      { text: "UPI & Gateway Integration", icon: CreditCard },
      { text: "Vendor Support Profile", icon: Info },
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

export default function VendorStoreConfigSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Store Management
          </span>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Vendor Store Configuration
          </h3>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Take full control of your store's operational boundaries and configuration.
            Define exactly where your customers can scan and shop.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2"
        >
          {configFeatures.map((feature, index) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="group border-none bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className={`relative z-10 mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${feature.color} shadow-lg transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon className={`h-6 w-6 ${feature.textColor}`} />
                  </div>

                  <h4 className="mb-3 text-xl font-bold text-foreground transition-colors">
                    {feature.title}
                  </h4>

                  <p className="mb-8 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  <ul className="space-y-4 pt-6 border-t border-border/50">
                    {feature.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        <item.icon className="mr-3 h-4 w-4 text-primary" />
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
            <Info className="h-5 w-5" />
          </div>
          <div>
            <h5 className="font-semibold text-foreground">Smart Geofencing Protection</h5>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Example: If a store sets a 50-meter radius, customers are automatically restricted to scanning only while physically inside the configured store area. This prevents unauthorized off-site scanning.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
