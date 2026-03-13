"use client"

import React from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  MapPin,
  Search,
  Split,
  ShieldCheck,
  Database,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const capabilities = [
  {
    title: 'Multi-Vendor Marketplace',
    desc: 'Onboard multiple supermarkets and manage separate stores seamlessly.',
    icon: Users,
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    title: 'Geo-Restricted Scanning',
    desc: 'Enable scanning only inside store geofence to prevent off-site abuse.',
    icon: MapPin,
    color: "bg-secondary dark:bg-secondary",
    textColor: "text-black dark:text-black"
  },
  {
    title: 'Smart Store Selection',
    desc: 'Intelligently detect nearby stores and prompt for the correct selection.',
    icon: Search,
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    title: 'Vendor Payment Split',
    desc: 'Automatic split payments across vendors powered by Razorpay.',
    icon: Split,
    color: "bg-secondary dark:bg-secondary",
    textColor: "text-black dark:text-black"
  },
  {
    title: 'Secure Razorpay Integration',
    desc: 'PCI-DSS compliant integrations and encrypted vendor payouts.',
    icon: ShieldCheck,
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    title: 'Independent Databases',
    desc: 'Separate product catalogs and real-time inventories for every vendor.',
    icon: Database,
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

export default function FeatureCards() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Razorpay Integration
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Advanced Capabilities
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A comprehensive suite of enterprise features designed to power
            the next generation of autonomous retail.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {capabilities.map((c) => (
            <motion.div key={c.title} variants={itemVariants}>
              <Card className="group h-full border-none bg-card shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className={`relative z-10 mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${c.color} shadow-lg transition-all duration-300 group-hover:scale-110`}>
                    <c.icon className={`h-6 w-6 ${c.textColor}`} />
                  </div>

                  <h3 className="mb-4 text-xl font-bold text-foreground">
                    {c.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.desc}
                  </p>

                  <div className="mt-6 flex items-center text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    LEARN MORE <ArrowRight className="ml-2 h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
