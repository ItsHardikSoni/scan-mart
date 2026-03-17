"use client"

import { Zap, Smartphone, Shield, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const benefits = [
  {
    icon: Zap,
    title: "Time Efficiency",
    description: "Eliminates waiting time at checkout counters. Shop faster and get back to what matters.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Experience",
    description: "Designed for smartphone users with smooth scanning and intuitive interface.",
    gradient: "from-secondary/40 to-secondary/10",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Location restriction and screenshot protection ensure secure transactions.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: BarChart3,
    title: "Real-Time Data",
    description: "Accurate price updates and inventory tracking for seamless shopping.",
    gradient: "from-secondary/40 to-secondary/10",
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

export function BenefitsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Why Choose Us
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Key Features & Benefits
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Experience the future of supermarket shopping with these powerful features
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid gap-8 md:grid-cols-2"
        >
          {benefits.map((benefit) => (
            <motion.div key={benefit.title} variants={itemVariants}>
              <Card
                className="group h-full overflow-hidden border-none shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className={`h-full bg-gradient-to-br ${benefit.gradient} p-8 flex flex-col`}>
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-card shadow-md transition-transform duration-300 group-hover:scale-110">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
