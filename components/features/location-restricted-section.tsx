import React from 'react'

export default function LocationRestrictedSection() {
  return (
    <section className="mt-6 p-6 rounded-lg border bg-gradient-to-r from-white to-white/50 shadow-sm">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-bold" style={{ color: '#6A1B9A' }}>Location-Restricted Scanning</h3>
        <p className="mt-2 text-sm text-muted-foreground">ScanMart uses device GPS and location services to ensure scanning happens only inside a vendor's configured store radius. This reduces fraud and enforces in-store transactions.</p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-md border bg-white">
            <h4 className="font-semibold">How it works</h4>
            <ol className="mt-2 ml-5 list-decimal text-sm">
              <li>The app requests location permission from the device.</li>
              <li>ScanMart checks whether the user is within the vendor-configured store area.</li>
              <li>Scanning and checkout are enabled only while inside the allowed area.</li>
              <li>If the user exits the allowed area, the scanner is disabled and the current session is ended.</li>
            </ol>
          </div>

          <div className="p-4 rounded-md border bg-white">
            <h4 className="font-semibold">Benefits</h4>
            <ul className="mt-2 ml-5 list-disc text-sm">
              <li>Prevents misuse by ensuring scans happen in-store</li>
              <li>Protects inventory integrity and reduces fraud</li>
              <li>Keeps payments and receipts tied to in-store sessions</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
