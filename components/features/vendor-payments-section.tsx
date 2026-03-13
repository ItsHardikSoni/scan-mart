import React from 'react'

export default function VendorPaymentsSection() {
  return (
    <section className="mt-6 p-6 rounded-lg border bg-gradient-to-r from-white to-white/50 shadow-sm">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-bold" style={{ color: '#6A1B9A' }}>Vendor Payment System</h3>
  <p className="mt-2 text-sm text-muted-foreground">Each vendor configures payment settings (for example: a UPI ID or a payment gateway account). When a customer checks out, ScanMart routes the payment amount to the correct vendor.</p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-md border">
            <h4 className="font-semibold">Vendor UPI/QR</h4>
            <p className="text-sm mt-2">Vendors register UPI IDs or QR codes used for instant routing.</p>
          </div>

          <div className="p-4 bg-white rounded-md border">
            <h4 className="font-semibold">Payment Gateway</h4>
            <p className="text-sm mt-2">Payments are processed through a secure payment gateway. Vendor payout routing is managed automatically by the platform.</p>
          </div>

          <div className="p-4 bg-white rounded-md border">
            <h4 className="font-semibold">Transaction Monitoring</h4>
            <p className="text-sm mt-2">Vendors get real-time transaction reports and reconciliation tools in their dashboard.</p>
          </div>
        </div>

        <div className="mt-4 text-sm">
          <strong className="text-muted-foreground">Example vendor payment setup:</strong>
          <ul className="mt-2 ml-5 list-disc text-sm">
            <li>Vendor A — UPI: vendorA@upi</li>
            <li>Vendor B — UPI: vendorB@upi</li>
            <li>Vendor C — UPI: vendorC@upi</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
