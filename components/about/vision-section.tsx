"use client"

import { Target, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
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

export function VisionSection() {
    return (
        <section className="bg-muted/30 py-20 md:py-28 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                            Our Vision
                        </span>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                            The Future of Shopping
                        </h2>
                        <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                ScanMart aims to revolutionize the retail shopping experience by removing checkout lines and empowering customers with mobile self-checkout technology.
                            </p>
                            <p>
                                Our mission is to make supermarket shopping faster, smarter, and more convenient. We believe that technology should simplify life, not complicate it.
                            </p>
                            <p>
                                By putting the power of checkout in customers' hands, we're creating a shopping experience that respects your time and enhances your convenience.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid gap-6 sm:grid-cols-2"
                    >
                        <motion.div variants={itemVariants}>
                            <Card className="border-none bg-card shadow-lg h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                <CardContent className="p-6 h-full flex flex-col">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary transition-transform duration-300 hover:scale-110">
                                        <Target className="h-6 w-6 text-primary-foreground" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold text-foreground">Mission</h3>
                                    <p className="text-sm text-muted-foreground flex-grow">
                                        To eliminate waiting time at supermarket checkouts through innovative mobile technology.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card className="border-none bg-card shadow-lg h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                <CardContent className="p-6 h-full flex flex-col">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary transition-transform duration-300 hover:scale-110">
                                        <Eye className="h-6 w-6 text-black dark:text-black" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold text-foreground">Vision</h3>
                                    <p className="text-sm text-muted-foreground flex-grow">
                                        A world where shopping is seamless, efficient, and enjoyable for everyone.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
