// Server Component — safe to export metadata here even though the child page.tsx is 'use client'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { JsonLd } from '@/components/seo/json-ld'
import {
    vendorBillingMetadata,
    vendorBillingBreadcrumbSchema,
    vendorSoftwareAppSchema,
} from '@/lib/seo/vendor'

export const metadata: Metadata = vendorBillingMetadata

export default function VendorBillingLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <JsonLd schema={[vendorSoftwareAppSchema, vendorBillingBreadcrumbSchema]} />
            {children}
        </>
    )
}
