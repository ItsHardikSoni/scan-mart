"use client"

import { motion } from "framer-motion"

export function ContactHero() {
    return (
        <section className="relative overflow-hidden bg-background py-20 md:py-28">
            <div className="absolute inset-0 -z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute left-1/4 top-0 h-[400px] w-[600px] rounded-full bg-primary/10 blur-3xl"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="absolute right-1/4 bottom-0 h-[300px] w-[400px] rounded-full bg-secondary/30 blur-3xl"
                />
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-sm font-semibold uppercase tracking-wider text-primary"
                    >
                        Get In Touch
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
                    >
                        Contact
                        <span className="text-primary"> Us</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-6 text-lg text-muted-foreground md:text-xl"
                    >
                        Have questions about ScanMart? We&apos;d love to hear from you. Get in touch and we&apos;ll respond as soon as possible.
                    </motion.p>
                </div>
            </div>
        </section>
    )
}
