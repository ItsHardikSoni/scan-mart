// Server Component — safe to export metadata here even though the child page.tsx is 'use client'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { JsonLd } from '@/components/seo/json-ld'
import {
    vendorOrdersMetadata,
    vendorOrdersBreadcrumbSchema,
    vendorSoftwareAppSchema,
} from '@/lib/seo/vendor'

export const metadata: Metadata = vendorOrdersMetadata

export default function VendorOrdersLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <JsonLd schema={[vendorSoftwareAppSchema, vendorOrdersBreadcrumbSchema]} />
            {children}
        </>
    )
}
