import React from 'react'

export default function SmartStoreDetectionSection() {
  return (
    <section className="mt-6 p-6 rounded-lg border bg-white shadow-sm">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-bold" style={{ color: '#6A1B9A' }}>Smart Store Detection</h3>
        <p className="mt-2 text-sm text-muted-foreground">When multiple supermarkets are nearby (for example inside a mall or multi-floor building), ScanMart helps users select the exact store they are in to avoid confusion and ensure the correct product catalog is loaded.</p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-md">
            <h4 className="font-semibold">Detection</h4>
            <p className="text-sm mt-2">The app finds nearby registered stores and ranks likely matches so customers can select the exact store they are in.</p>
          </div>

          <div className="p-4 border rounded-md">
            <h4 className="font-semibold">Store Selection UI</h4>
            <p className="text-sm mt-2">Users select the store they're shopping in; the app then loads that vendor's catalog and inventory for the session.</p>
          </div>

          <div className="p-4 border rounded-md">
            <h4 className="font-semibold">Safety</h4>
            <p className="text-sm mt-2">Selecting the correct store prevents cross-store scanning and ensures accurate pricing and stock information.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
