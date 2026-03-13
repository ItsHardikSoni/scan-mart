import React from 'react'

const cards = [
  { title: 'Multi-Vendor Marketplace', desc: 'Onboard multiple supermarkets and manage separate stores.' },
  { title: 'Geo-Restricted Scanning', desc: 'Enable scanning only inside store geofence to prevent misuse.' },
  { title: 'Smart Store Selection', desc: 'Detect nearby stores and prompt the user to select the right one.' },
  { title: 'Vendor Payment Split', desc: 'Automatic split payments across vendors using Razorpay.' },
  { title: 'Secure Razorpay Integration', desc: 'PCI-ready integrations and encrypted vendor payouts.' },
  { title: 'Independent Store Databases', desc: 'Separate product databases and inventories per vendor.' },
]

export default function FeatureCards() {
  return (
    <section className="mt-6 p-6 rounded-lg border bg-gradient-to-r from-white to-white/50 shadow-sm">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-xl font-bold" style={{ color: '#6A1B9A' }}>Advanced Capabilities</h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c) => (
            <div key={c.title} className="p-4 border rounded-md bg-white shadow-sm hover:shadow-md transition">
              <h4 className="font-semibold">{c.title}</h4>
              <p className="text-sm mt-2 text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
