"use client"

import { Store, BarChart3, ShieldCheck, Banknote, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const vendorFeatures = [
    {
        icon: BarChart3,
        title: "Free Inventory Software",
        description: "Get a per-build, powerful inventory management system at zero additional cost. Track stock, sales, and analytics in real-time.",
        gradient: "from-primary/20 to-primary/5",
        iconColor: "text-primary",
    },
    {
        icon: Store,
        title: "Zero Hardware Costs",
        description: "No need for expensive barcode scanners or POS systems. Use our admin dashboard on any device.",
        gradient: "from-secondary/20 to-secondary/5",
        iconColor: "text-secondary",
    },
    {
        icon: ShieldCheck,
        title: "Fraud Prevention",
        description: "Smart store detection, location restrictions, and screenshot protection ensure secure, queue-free transactions.",
        gradient: "from-primary/20 to-primary/5",
        iconColor: "text-primary",
    },
    {
        icon: Banknote,
        title: "Split Settlements",
        description: "Integrated with Razorpay Route for automatic, hassle-free revenue splits directly to your bank account.",
        gradient: "from-secondary/20 to-secondary/5",
        iconColor: "text-secondary",
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

export function VendorFeaturesSection() {
    return (
        <section className="py-20 md:py-28 relative overflow-hidden bg-background">
            {/* Background blobs */}
            <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full mb-4">
                        For Business Owners
                    </span>
                    <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground md:text-5xl">
                        Supercharge Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Store</span>
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Join the ScanMart ecosystem and transform your traditional supermarket into a smart, queue-free experience with our comprehensive suite of vendor tools.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
                >
                    {vendorFeatures.map((feature) => (
                        <motion.div key={feature.title} variants={itemVariants}>
                            <Card className="group h-full overflow-hidden border border-border shadow-lg bg-card backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/30">
                                <CardContent className={`bg-gradient-to-br transition-colors duration-500 ${feature.gradient} p-8 h-full flex flex-col group-hover:from-background group-hover:to-muted`}>
                                    <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-background shadow-md border border-border transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                                        <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-foreground">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm flex-grow">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-16 text-center"
                >
                    <Link href="/vendor/apply" className="inline-flex">
                        <button className="group relative h-14 overflow-hidden rounded-full bg-primary px-8 text-primary-foreground font-bold shadow-xl transition-all hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/20 active:scale-95 flex items-center gap-3">
                            <span className="relative z-10 flex items-center gap-2">
                                Become a Vendor
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>
                        </button>
                    </Link>
                    <p className="mt-4 text-sm text-muted-foreground font-medium">
                        Setup takes less than 5 minutes. No credit card required.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
