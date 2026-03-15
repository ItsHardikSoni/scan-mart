// Server Component — exports metadata for /vendor/apply
// The child page.tsx is 'use client', so metadata must live here.
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { JsonLd } from '@/components/seo/json-ld'
import {
    vendorApplyMetadata,
    vendorApplyPageSchema,
    vendorPartnerProgramSchema,
    vendorApplyFaqSchema,
    vendorApplyBreadcrumbSchema,
} from '@/lib/seo/vendor'

export const metadata: Metadata = vendorApplyMetadata

export default function VendorApplyLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <JsonLd
                schema={[
                    vendorApplyPageSchema,
                    vendorPartnerProgramSchema,
                    vendorApplyFaqSchema,
                    vendorApplyBreadcrumbSchema,
                ]}
            />
            {children}
        </>
    )
}
