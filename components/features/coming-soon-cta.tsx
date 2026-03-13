import React from 'react'
import Link from 'next/link'

export default function ComingSoonCTA() {
  return (
    <section className="mt-8 ml-4 mr-4 p-8 rounded-lg bg-gradient-to-r from-[#6A1B9A] to-[#6A1B9A]/80 text-white shadow-lg">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold">ScanMart — Coming Soon</h3>
          <p className="mt-2 text-sm">Scan. Shop. Go. – Skip the Queue. We're launching soon on Android and iOS. Join early access and be the first to try ScanMart.</p>
        </div>

        <div className="flex gap-3">
          <button className="bg-[#FFC107] text-black px-4 py-2 rounded-md font-semibold">Notify Me</button>
          <Link href="#">
            <button className="border border-white px-4 py-2 rounded-md font-semibold">Join Early Access</button>
          </Link>
        </div>
      </div>
    </section>
  )
}
