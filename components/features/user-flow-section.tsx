import { UserCheck, ScanBarcode, ShoppingCart, CreditCard, FileText } from "lucide-react"

const flowSteps = [
  {
    icon: UserCheck,
    title: "Login / Signup",
    description: "Secure authentication with email or phone verification.",
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    icon: ScanBarcode,
    title: "Scan Products",
    description: "Instantly scan barcodes with your phone camera.",
    color: "bg-secondary dark:bg-secondary",
    textColor: "text-black dark:text-black"
  },
  {
    icon: ShoppingCart,
    title: "View Cart",
    description: "Real-time cart and running total display.",
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
  {
    icon: CreditCard,
    title: "Process Payment",
    description: "Secure checkout via Razorpay gateway.",
    color: "bg-secondary dark:bg-secondary",
    textColor: "text-black dark:text-black"
  },
  {
    icon: FileText,
    title: "Get Invoice",
    description: "Download digital receipt and exit store.",
    color: "bg-primary dark:bg-primary",
    textColor: "text-white dark:text-white"
  },
]

export function UserFlowSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            User Journey
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            User Experience Flow
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A streamlined journey from entry to exit
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border md:block" />

            <div className="space-y-12">
              {flowSteps.map((step, index) => (
                <div
                  key={step.title}
                  className={`relative flex flex-col items-center gap-8 md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className={`inline-block rounded-xl bg-card p-6 shadow-lg ${index % 2 === 0 ? "md:ml-auto" : ""}`}>
                      <h3 className="mb-2 text-lg font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`relative z-10 mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${step.color} shadow-lg transition-transform duration-300 hover:scale-110`}>
                    <step.icon className={`h-8 w-8 ${step.textColor}`} />
                    <div className="absolute -bottom-8 text-sm font-bold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden flex-1 md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
