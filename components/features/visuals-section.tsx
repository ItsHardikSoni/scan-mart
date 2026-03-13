import React from 'react'

export default function VisualsSection() {
  return (
    <section className="mt-6 p-6 rounded-lg border bg-white shadow-sm">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-xl font-bold" style={{ color: '#6A1B9A' }}>Visuals & Mockups</h3>
        <p className="mt-2 text-sm text-muted-foreground">Quick mockups to illustrate store selection, payment flow, and geofence radius visuals.</p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-md bg-gradient-to-br from-white to-white/50">
            <div className="h-40 flex items-center justify-center text-sm text-muted-foreground">Store selection UI mockup (placeholder)</div>
          </div>

          <div className="p-4 border rounded-md bg-gradient-to-br from-white to-white/50">
            <div className="h-40 flex items-center justify-center text-sm text-muted-foreground">Payment flow diagram (placeholder)</div>
          </div>

          <div className="p-4 border rounded-md bg-gradient-to-br from-white to-white/50">
            <div className="h-40 flex items-center justify-center text-sm text-muted-foreground">Location radius map visualization (placeholder)</div>
          </div>
        </div>
      </div>
    </section>
  )
}
