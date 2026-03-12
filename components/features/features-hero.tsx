export function FeaturesHero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[400px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-[300px] w-[400px] rounded-full bg-secondary/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Powerful Features
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Everything You Need for
            <span className="text-primary"> Smart Shopping</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Discover the comprehensive feature set that makes ScanMart the ultimate self-checkout solution for modern supermarkets.
          </p>
        </div>
      </div>
    </section>
  )
}
