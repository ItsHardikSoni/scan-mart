import React from 'react'

export default function RazorpaySplitSection() {
  return (
    <section className="mt-6 p-6 rounded-lg border bg-white shadow-sm">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-bold" style={{ color: '#6A1B9A' }}>Razorpay Split Payment System</h3>
  <p className="mt-2 text-sm text-muted-foreground">When a customer buys items from multiple vendors in one session, ScanMart automatically splits the payment so each vendor receives their share. The platform integrates with secure gateway features to handle routing and settlement.</p>

        <div className="mt-4 p-4 rounded-md border bg-gradient-to-br from-white to-white/50">
          <h4 className="font-semibold">Example</h4>
          <p className="mt-2 text-sm">Cart total ₹500 — Vendor A ₹200, Vendor B ₹300. ScanMart splits and routes the funds to the respective vendors without manual settlement steps.</p>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-md border bg-white">
            <h4 className="font-semibold">Benefits</h4>
            <ul className="mt-2 ml-5 list-disc text-sm">
              <li>Vendor payouts are automated</li>
              <li>Reduces reconciliation overhead</li>
              <li>Clear reporting for vendors and platform admins</li>
            </ul>
          </div>

          <div className="p-4 rounded-md border bg-white">
            <h4 className="font-semibold">Notes</h4>
            <ul className="mt-2 ml-5 list-disc text-sm">
              <li>Payments are handled through secure gateway capabilities.</li>
              <li>Vendor payout details are stored and managed securely by the platform.</li>
              <li>Transactions include logs for reconciliation and auditability.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
