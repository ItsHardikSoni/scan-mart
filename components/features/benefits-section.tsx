"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, Users, CheckCircle2, Zap, Shield, LineChart, LayoutDashboard } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const benefits = [
  {
    category: "For Supermarkets",
    title: "Operational Excellence",
    icon: Rocket,
    items: [
      "No need for multiple billing counters",
      "Faster checkout & reduced staffing costs",
      "Real-time inventory management",
      "Automated payments via Razorpay"
    ],
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    category: "For Customers",
    title: "Enhanced Experience",
    icon: Users,
    items: [
      "Skip conventional checkout queues",
      "Real-time cart updates while shopping",
      "Secure digital payments and receipts",
      "Early access to exclusive programs"
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

export default function BenefitsSection() {
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
            Value Proposition
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Platform Benefits
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            A win-win ecosystem designed to empower retailers with efficiency and
            delight customers with a frictionless shopping journey.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2"
        >
          {benefits.map((benefit) => (
            <motion.div key={benefit.category} variants={itemVariants}>
              <Card className="group h-full border-none bg-muted/30 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className={`relative z-10 mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${benefit.color} shadow-lg transition-all duration-300 group-hover:scale-110`}>
                    <benefit.icon className={`h-6 w-6 ${benefit.textColor}`} />
                  </div>

                  <span className="p-4 text-xs font-bold uppercase tracking-[0.2em] text-primary/60">
                    {benefit.category}
                  </span>
                  <h3 className="mt-1 mb-6 text-2xl font-bold text-foreground">
                    {benefit.title}
                  </h3>

                  <ul className="space-y-4">
                    {benefit.items.map((item, idx) => (
                      <li key={idx} className="flex items-start text-muted-foreground">
                        <CheckCircle2 className="mr-3 mt-1 h-5 w-5 shrink-0 text-primary" />
                        <span className="text-sm leading-relaxed">{item}</span>
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
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: "Efficiency", icon: Zap },
            { label: "Security", icon: Shield },
            { label: "Insights", icon: LineChart },
            { label: "Sleek UI", icon: LayoutDashboard }
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <stat.icon className="mb-2 h-6 w-6 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
