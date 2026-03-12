"use client"

import { Button } from "@/components/ui/button"
import { Smartphone, ScanBarcode, ShoppingCart, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-[300px] w-[400px] rounded-full bg-secondary/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Coming Soon
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                <span className="text-primary">Scan.</span>{" "}
                <span className="text-secondary">Shop.</span>{" "}
                <span className="text-primary">Go.</span>
              </h1>
              <p className="text-xl font-medium text-muted-foreground md:text-2xl">
                Skip the Queue
              </p>
            </div>

            <p className="max-w-lg text-lg text-muted-foreground">
              ScanMart is a smart self-checkout solution that allows customers to scan products, pay instantly, and exit the store without waiting in billing queues.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-1.4-.59-2.94-.92-4.52-.92s-3.12.33-4.52.93L5.55 5.67c-.18-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85L6.3 9.48C3.32 11.25 1.18 14.13 1 17.5h22c-.18-3.37-2.32-6.25-5.4-8.02zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
                </svg>
                Coming Soon on Android
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Coming Soon on iOS
              </Button>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative flex items-center justify-center lg:justify-center">
            <div className="relative">
              {/* Phone mockup */}
              <div className="relative z-10 rounded-[3rem] border-8 border-foreground/10 bg-card p-4 shadow-2xl">
                <div className="h-[400px] w-[200px] overflow-hidden rounded-[2rem] bg-muted">
                  <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
                    <div className="rounded-full bg-primary/10 p-4">
                      <ScanBarcode className="h-12 w-12 text-primary" />
                    </div>
                    <p className="text-center text-sm font-medium text-foreground">
                      Scan Products
                    </p>
                    <div className="mt-4 space-y-3 w-full">
                      <div className="flex items-center gap-3 rounded-lg bg-background p-3">
                        <ShoppingCart className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-foreground">Cart Total</p>
                          <p className="text-sm font-bold text-primary">$24.99</p>
                        </div>
                      </div>
                      <Button className="w-full bg-primary text-primary-foreground text-sm">
                        Pay Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -left-12 top-20 animate-bounce rounded-xl bg-secondary p-3 shadow-lg">
                <Smartphone className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div className="absolute -right-12 bottom-32 animate-pulse rounded-xl bg-primary p-3 shadow-lg">
                <ArrowRight className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
