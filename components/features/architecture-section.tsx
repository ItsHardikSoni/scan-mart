import React from 'react'

export default function ArchitectureSection() {
  return (
    <section className="mt-6 p-6 rounded-lg border bg-white shadow-sm">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-xl font-bold" style={{ color: '#6A1B9A' }}>Technical Architecture</h3>
        <p className="mt-2 text-sm text-muted-foreground">High-level components that power ScanMart.</p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-md">
            <h4 className="font-semibold">Mobile App (Customer)</h4>
            <p className="text-sm mt-2">Barcode scanning, cart management, location verification, and payment initiation.</p>
          </div>

          <div className="p-4 border rounded-md">
            <h4 className="font-semibold">Vendor Dashboard</h4>
            <p className="text-sm mt-2">Store configuration, product management, transaction logs, and payouts.</p>
          </div>

          <div className="p-4 border rounded-md">
            <h4 className="font-semibold">Cloud & Payment</h4>
            <p className="text-sm mt-2">Cloud database, APIs, Razorpay gateway, and location verification services.</p>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-md border bg-gradient-to-br from-white to-white/50">
          <h4 className="font-semibold">Components</h4>
          <ul className="mt-2 ml-5 list-disc text-sm">
            <li>Mobile App (iOS / Android)</li>
            <li>Vendor Dashboard & Admin Panel</li>
            <li>Cloud services and databases (catalogs & inventory)</li>
            <li>Payment gateway integration</li>
            <li>Location verification and access control services</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
