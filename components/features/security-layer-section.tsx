"use client"

import { MapPin, MonitorOff, CreditCard, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

const securityFeatures = [
  {
    icon: MapPin,
    title: "Location Restriction",
    description: "App functionality is geo-fenced to work only within store premises.",
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    icon: MonitorOff,
    title: "Screenshot Prevention",
    description: "Built-in protection against screenshots and screen recording.",
    color: "bg-secondary dark:bg-secondary",
    textColor: "text-black dark:text-black"
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "PCI-DSS compliant payment processing through Razorpay.",
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    icon: ShieldCheck,
    title: "Data Encryption",
    description: "End-to-end encryption for all user data and transactions.",
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

export function SecurityLayerSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Security Layer
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Enterprise-Grade Security
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We take security seriously. ScanMart is built with multiple layers of protection to ensure your data and transactions are always safe.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 space-y-8"
            >
              {securityFeatures.map((feature) => (
                <motion.div key={feature.title} variants={itemVariants} className="flex gap-6 items-start">
                  {/* Icon */}
                  <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${feature.color} shadow-lg transition-transform duration-300 hover:scale-110`}>
                    <feature.icon className={`h-6 w-6 ${feature.textColor}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative rounded-2xl bg-muted p-8 lg:p-12">
              {/* Decorative elements */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-secondary/40 blur-2xl" />

              <div className="relative flex flex-col items-center justify-center space-y-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-lg">
                  <ShieldCheck className="h-12 w-12 text-primary-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">256-bit</p>
                  <p className="text-sm text-muted-foreground">AES Encryption</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center rounded-lg bg-card p-4 shadow">
                    <p className="text-lg font-bold text-primary">SSL</p>
                    <p className="text-xs text-muted-foreground">Secured</p>
                  </div>
                  <div className="flex flex-col items-center rounded-lg bg-card p-4 shadow">
                    <p className="text-lg font-bold text-primary">PCI</p>
                    <p className="text-xs text-muted-foreground">Compliant</p>
                  </div>
                  <div className="flex flex-col items-center rounded-lg bg-card p-4 shadow">
                    <p className="text-lg font-bold text-primary">2FA</p>
                    <p className="text-xs text-muted-foreground">Enabled</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
