"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Eye, Monitor, Smartphone, Layout } from 'lucide-react'

const mockups = [
  {
    title: "Store Selection",
    description: "Elegant nearby store detection with distance and status indicators.",
    src: "/mockups/store-selection.png",
    type: "Mobile Mockup"
  },
  {
    title: "Payment Flow",
    description: "Sleek transaction breakdown with multi-vendor split visualization.",
    src: "/mockups/payment-flow.png",
    type: "Transaction Flow"
  },
  {
    title: "Geofence Radius",
    description: "Visual security boundaries integrated directly into the map view.",
    src: "/mockups/geofence-map.png",
    type: "Map Visualization"
  }
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
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15
    }
  }
}

export default function VisualsSection() {
  return (
    <section className="bg-muted/30 py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Visual Experience
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Visuals & Mockups
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A glimpse into the high-fidelity user interface and intelligent
            visualizations that define the ScanMart experience.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          {mockups.map((mockup) => (
            <motion.div key={mockup.title} variants={itemVariants} className="group">
              <Card className="h-full border-none bg-card shadow-xl transition-all duration-300 hover:shadow-2xl">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-t-xl bg-muted">
                    <Image
                      src={mockup.src}
                      alt={mockup.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
                      {mockup.type}
                    </span>
                    <h3 className="mt-1 text-xl font-bold text-foreground">
                      {mockup.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {mockup.description}
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
