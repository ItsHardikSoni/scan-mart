"use client"

import { motion } from "framer-motion"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "How does ScanMart work?",
        answer: "ScanMart allows you to scan product barcodes using your smartphone as you shop. You can view your real-time total in the app, pay securely via Razorpay once you're done, and walk out of the store—skipping the checkout line entirely.",
    },
    {
        question: "Is ScanMart available in my city?",
        answer: "We are rapidly expanding to various supermarkets across major cities. Download the app or follow our social media channels to stay updated on new store launches in your area.",
    },
    {
        question: "Is the payment system secure?",
        answer: "Yes, we use Razorpay as our payment gateway, ensuring your transactions are encrypted and secure. We do not store your credit card or sensitive payment information on our servers.",
    },
    {
        question: "Do I need any special hardware to use ScanMart?",
        answer: "No special hardware is required. All you need is a smartphone with a camera and the ScanMart app installed.",
    },
    {
        question: "How do you prevent shoplifting?",
        answer: "We use a combination of location-based verification, random slot checks, and security gates that verify your digital receipt before you exit the premises.",
    },
    {
        question: "What if an item doesn't have a barcode?",
        answer: "For loose items like fruits or vegetables, participating stores have weighing scales that generate a barcode you can scan, or you can manually enter the item code if available.",
    },
]

export function FaqSection() {
    return (
        <section className="bg-background py-20 md:py-28">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-3xl text-center mb-16"
                >
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                        Support
                    </span>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Quick answers to common questions about our platform and services.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mx-auto max-w-3xl"
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-primary hover:no-underline py-6">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    )
}
