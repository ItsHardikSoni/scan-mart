"use client"

import { Building2, UserCheck, LayoutDashboard, QrCode } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
    {
        number: "01",
        icon: Building2,
        title: "Submit Application",
        description: "Fill out the vendor application form with your store metadata, location, and GST details (optional).",
        color: "bg-primary",
        textColor: "text-primary-foreground",
        glowColor: "shadow-primary/30",
    },
    {
        number: "02",
        icon: UserCheck,
        title: "Admin Verification",
        description: "Our admin team reviews your application to ensure platform safety and quality.",
        color: "bg-secondary",
        textColor: "text-secondary-foreground",
        glowColor: "shadow-secondary/30",
    },
    {
        number: "03",
        icon: LayoutDashboard,
        title: "Access Dashboard",
        description: "Once approved, dive into your dedicated dashboard with our per-build inventory management software.",
        color: "bg-primary",
        textColor: "text-primary-foreground",
        glowColor: "shadow-primary/30",
    },
    {
        number: "04",
        icon: QrCode,
        title: "Go Live",
        description: "Add your products, generate your store QR, and start accepting zero-queue transactions.",
        color: "bg-secondary",
        textColor: "text-secondary-foreground",
        glowColor: "shadow-secondary/30",
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

export default function HowVendorsApplySection() {
    return (
        <section className="bg-background py-20 md:py-28 relative border-t border-border">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-full mb-4">
                        Vendor Onboarding
                    </span>
                    <h2 className="mt-2 text-3xl font-black tracking-tight text-foreground md:text-4xl">
                        How to Join ScanMart
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        A simple, transparent process to get your store online and equipped with our powerful software.
                    </p>
                </motion.div>

                <div className="mt-20">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative"
                    >
                        {/* Connecting line for desktop */}
                        <div className="absolute top-10 left-[10%] right-[10%] hidden h-0.5 bg-gradient-to-r from-primary/20 via-primary/20 to-secondary/20 lg:block" />

                        {steps.map((step, index) => (
                            <motion.div key={step.title} variants={itemVariants} className="relative flex flex-col items-center text-center group">
                                {/* Step number */}
                                <span className="absolute -top-6 text-5xl font-black text-muted/30 z-0">
                                    {step.number}
                                </span>

                                {/* Icon Circle */}
                                <div className={`relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${step.color} shadow-xl ${step.glowColor} transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                                    <step.icon className={`h-10 w-10 ${step.textColor}`} />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 bg-card/50 backdrop-blur-sm p-4 rounded-2xl">
                                    <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
