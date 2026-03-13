import React from 'react'

export default function VendorStoreConfigSection() {
  return (
    <section className="mt-6 bg-white p-6 rounded-lg border shadow-sm">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-bold" style={{ color: '#6A1B9A' }}>Vendor Store Configuration</h3>
        <p className="mt-2 text-sm text-muted-foreground">Vendors configure store details and define a geofence that controls where scanning and checkout are allowed.</p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-md border bg-gradient-to-br from-white to-white/50">
            <h4 className="font-semibold">Store Settings</h4>
            <ul className="mt-2 ml-5 list-disc text-sm">
              <li>Store name & description</li>
              <li>Store address or location</li>
              <li>Operating hours</li>
            </ul>
          </div>

          <div className="p-4 rounded-md border bg-gradient-to-br from-white to-white/50">
            <h4 className="font-semibold">Geofence & Payments</h4>
            <ul className="mt-2 ml-5 list-disc text-sm">
              <li>Store operating radius (configurable by vendor)</li>
              <li>Payment settings (UPI, QR, or gateway account)</li>
              <li>Contact & support info</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">Example: If a store sets a 50 meter radius, customers are allowed to scan only while inside the configured store area.</div>
      </div>
    </section>
  )
}
