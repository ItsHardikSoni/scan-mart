"use client"

import { PackageOpen, BarChart4, TrendingUp, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

const features = [
    {
        icon: PackageOpen,
        title: "Real-Time Stock Tracking",
        description: "Monitor your inventory levels continuously as items are purchased, ensuring you never run out of your best-sellers.",
    },
    {
        icon: BarChart4,
        title: "Comprehensive Analytics",
        description: "Get detailed insights into sales trends, peak hours, and customer preferences to make data-driven decisions.",
    },
    {
        icon: RefreshCw,
        title: "Per-Build Customization",
        description: "Our software is tailored specifically to your store's build and unique requirements, adapting to your workflows.",
    },
    {
        icon: TrendingUp,
        title: "Automated Reordering",
        description: "Set low-stock alerts and generate automated purchase orders to keep your supply chain running smoothly.",
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

export function InventorySoftwareSection() {
    return (
        <section className="py-20 md:py-28 bg-background border-y border-border relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-full mb-6">
                            Empowering Vendors
                        </span>
                        <h2 className="text-3xl font-black tracking-tight text-foreground md:text-5xl leading-tight">
                            Powerful Per-Build <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Inventory Software
                            </span>
                        </h2>
                        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                            We understand that the success of a queue-free supermarket relies heavily on accurate stock management. That's why every vendor on ScanMart gets access to our exclusive, enterprise-grade inventory management software at no additional cost.
                        </p>
                        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                            Tailored to your specific store build, it seamlessly synchronizes with customer scans, instantly updating stock levels and providing deep analytical insights to supercharge your business growth.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center gap-2 text-sm font-bold text-foreground bg-card px-4 py-3 rounded-xl border border-border">
                                <PackageOpen className="w-5 h-5 text-primary" />
                                Unlimited Products
                            </div>
                            <div className="flex items-center gap-2 text-sm font-bold text-foreground bg-card px-4 py-3 rounded-xl border border-border">
                                <BarChart4 className="w-5 h-5 text-secondary" />
                                Real-Time Sync
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid sm:grid-cols-2 gap-6 relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-[3rem] -rotate-3 scale-105 -z-10" />
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                variants={itemVariants}
                                className={`bg-card/80 backdrop-blur-xl p-6 rounded-3xl border border-border shadow-xl hover:-translate-y-1 transition-transform duration-300 ${index % 2 !== 0 ? 'sm:translate-y-8' : ''}`}
                            >
                                <div className="w-12 h-12 bg-background border border-border rounded-2xl flex items-center justify-center mb-5 shadow-inner">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
