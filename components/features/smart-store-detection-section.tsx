"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Search, Map, ShieldCheck, Zap, Store, Layers, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const detectionFeatures = [
  {
    title: "Detection",
    description: "The app intelligently identifies and ranks nearby registered stores for selection.",
    icon: Search,
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    title: "Store Selection UI",
    description: "Users select their specific store to load relevant vendor-specific catalogs.",
    icon: Store,
    color: "bg-secondary dark:bg-secondary",
    textColor: "text-black dark:text-black"
  },
  {
    title: "Safety & Accuracy",
    description: "Ensures correct pricing and stock integrity by preventing cross-store scanning.",
    icon: ShieldCheck,
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

export default function SmartStoreDetectionSection() {
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
            AI-Powered Detection
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Smart Store Detection
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            In dense retail environments like malls or multi-floor buildings, ScanMart
            automatically suggests the exact store you are in for a seamless shopping start.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {detectionFeatures.map((feature) => (
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
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Layers className="h-7 w-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground">Multi-Floor Resolving</h4>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                Using a combination of location signals and store density mapping, we ensure that even in malls with overlapping footprints, customers are prompted with the correct vendor profile immediately upon entry.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
