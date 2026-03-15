// Server Component — wraps the entire /vendor/** segment
// This layout sits above dashboard/layout.tsx and lets us export metadata
// for the root /vendor/dashboard page without touching the 'use client' layout.
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { JsonLd } from '@/components/seo/json-ld'
import {
    vendorDashboardMetadata,
    vendorDashboardBreadcrumbSchema,
    vendorDashboardWebPageSchema,
    vendorServiceSchema,
} from '@/lib/seo/vendor'

// This is the metadata that applies to /vendor/dashboard (the overview page).
// Sub-routes override it by exporting their own metadata from their own layout.tsx.
export const metadata: Metadata = vendorDashboardMetadata

export default function VendorRootLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <JsonLd
                schema={[vendorDashboardWebPageSchema, vendorServiceSchema, vendorDashboardBreadcrumbSchema]}
            />
            {children}
        </>
    )
}
