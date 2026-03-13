import React from 'react'

export default function BenefitsSection() {
  return (
    <section className="mt-6 p-6 rounded-lg border bg-gradient-to-r from-white to-white/50 shadow-sm">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-bold" style={{ color: '#6A1B9A' }}>Platform Benefits</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-md border">
            <h4 className="font-semibold">For Supermarkets</h4>
            <ul className="mt-2 ml-5 list-disc text-sm">
              <li>No need for multiple billing counters</li>
              <li>Faster checkout & reduced staffing costs</li>
              <li>Real-time inventory management</li>
              <li>Automated payments through Razorpay</li>
            </ul>
          </div>

          <div className="p-4 bg-white rounded-md border">
            <h4 className="font-semibold">For Customers</h4>
            <ul className="mt-2 ml-5 list-disc text-sm">
              <li>Skip checkout queues</li>
              <li>Faster shopping with real-time cart updates</li>
              <li>Secure digital payments and receipts</li>
              <li>Join early access programs</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
