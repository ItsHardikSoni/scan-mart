"use client"

import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 md:px-12 md:py-20">
          {/* Background decorations */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-background/10 blur-3xl" />
          
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-background/10 px-4 py-2">
              <Bell className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                Be the First to Know
              </span>
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl lg:text-5xl">
              Ready to Skip the Queue?
            </h2>
            
            <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
              Join thousands of smart shoppers waiting to experience the future of supermarket checkout. Get notified when ScanMart launches!
            </p>
            
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                asChild
              >
                <Link href="/contact">
                  Get Notified
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/features">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
