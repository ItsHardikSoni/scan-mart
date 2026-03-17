"use client"

import { motion } from "framer-motion"

export function CtaSection() {
    return (
        <section className="py-20 md:py-28 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Join the Revolution
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Be part of the future of retail shopping. ScanMart is coming soon to Android and iOS devices.
                    </p>
                    <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-6 py-3 transition-colors hover:bg-primary/10">
                        <span className="relative flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
                        </span>
                        <span className="font-medium text-primary">Coming Soon on Android & iOS</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
