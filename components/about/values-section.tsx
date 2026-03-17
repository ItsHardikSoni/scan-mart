"use client"

import { Lightbulb, Users, Rocket, Heart } from "lucide-react"
import { motion } from "framer-motion"

const values = [
    {
        icon: Lightbulb,
        title: "Innovation",
        description: "Constantly pushing boundaries to create cutting-edge solutions.",
        color: "bg-primary dark:bg-primary",
        textColor: "text-white dark:text-white"
    },
    {
        icon: Users,
        title: "Customer Focus",
        description: "Every feature is designed with the customer experience in mind.",
        color: "bg-secondary dark:bg-secondary",
        textColor: "text-black dark:text-black"
    },
    {
        icon: Rocket,
        title: "Efficiency",
        description: "Streamlining processes to save time for everyone.",
        color: "bg-primary dark:bg-primary",
        textColor: "text-white dark:text-white"
    },
    {
        icon: Heart,
        title: "Quality",
        description: "Committed to delivering excellence in every interaction.",
        color: "bg-secondary dark:bg-secondary",
        textColor: "text-black dark:text-black"
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
    hidden: { y: 20, opacity: 0, scale: 0.9 },
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

export function ValuesSection() {
    return (
        <section className="py-20 md:py-28 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                        What Drives Us
                    </span>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Our Core Values
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        The principles that guide everything we do
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {values.map((value) => (
                        <motion.div key={value.title} variants={itemVariants} className="group text-center">
                            <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${value.color} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                                <value.icon className={`h-8 w-8 ${value.textColor}`} />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-foreground">
                                {value.title}
                            </h3>
                            <p className="text-sm text-muted-foreground px-4">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
