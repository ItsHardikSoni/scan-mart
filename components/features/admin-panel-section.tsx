"use client"

import { Package, Database, BarChart3, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const adminFeatures = [
  {
    icon: Package,
    title: "Product Management",
    description: "Easily add, update, and manage product catalog with bulk import support.",
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    icon: Database,
    title: "CRUD Operations",
    description: "Full create, read, update, delete functionality for all store data.",
    color: "bg-secondary dark:bg-secondary",
    textColor: "text-black dark:text-black"
  },
  {
    icon: BarChart3,
    title: "Inventory Tracking",
    description: "Real-time inventory monitoring with low stock alerts and reports.",
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    icon: MapPin,
    title: "Location-Based Access",
    description: "Control store boundaries for geo-fenced app functionality.",
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

export function AdminPanelSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            For Store Owners
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Admin Panel Features
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A powerful dashboard to manage your store operations efficiently.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2"
        >
          {adminFeatures.map((feature, index) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card
                className="group overflow-hidden border-none shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="flex items-start gap-6 p-6">
                  <div className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${feature.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <feature.icon className={`h-7 w-7 ${feature.textColor}`} />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
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
