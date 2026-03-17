"use client"

import { MapPin, MonitorOff, LogOut, Lock } from "lucide-react"
import { motion } from "framer-motion"

const securityFeatures = [
  {
    icon: MapPin,
    title: "Location-Based Access",
    description: "Scanning works only inside store premises for secure transactions.",
  },
  {
    icon: MonitorOff,
    title: "Screenshot Protection",
    description: "Prevents screen recording and screenshots to protect your data.",
  },
  {
    icon: LogOut,
    title: "Session Management",
    description: "Automatic logout when user exits store location for safety.",
  },
  {
    icon: Lock,
    title: "Secure Authentication",
    description: "Encrypted login system and secure Razorpay payment gateway.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100
    }
  }
}

export function SecuritySection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Your Security Matters
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Security Implementation
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We've built robust security measures to protect your shopping experience
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {securityFeatures.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants} className="group text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <feature.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed px-4">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
