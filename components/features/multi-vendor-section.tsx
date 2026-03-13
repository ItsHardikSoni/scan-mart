import React from 'react'

export default function MultiVendorSection() {
  return (
    <section className="bg-gradient-to-r from-white to-white/50 p-6 rounded-lg border shadow-sm">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold" style={{ color: '#6A1B9A' }}>Multi-Vendor Smart Supermarket Platform</h2>
        <p className="mt-3 text-muted-foreground">ScanMart is designed as a marketplace-grade, multi-vendor platform — not just a checkout app. Supermarkets and independent stores can onboard as vendors and operate their own stores inside the platform.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-md bg-white">
            <h3 className="font-semibold">Vendor Account Creation</h3>
            <ul className="mt-2 list-disc ml-5 text-sm">
              <li>Separate login dashboard</li>
              <li>Store management tools</li>
              <li>Product management system</li>
              <li>Order & transaction monitoring</li>
            </ul>
          </div>

          <div className="p-4 border rounded-md bg-white">
            <h3 className="font-semibold">Independent Vendor Control</h3>
            <p className="mt-2 text-sm">Each vendor has full control over their listings, pricing and inventory. ScanMart enforces isolation between vendor stores to avoid data conflict.</p>
          </div>

          <div className="p-4 border rounded-md bg-white">
            <h3 className="font-semibold">Onboarding & Verification</h3>
            <p className="mt-2 text-sm">Fast onboarding flows with verification steps to register business details, UPI/QR setup, and store configuration.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
