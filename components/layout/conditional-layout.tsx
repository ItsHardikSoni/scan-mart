'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import ScrollToTop from '@/components/scroll-to-top';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Pages where we want to hide the global Navbar and Footer
    const isDashboard = pathname.startsWith('/admin') || pathname.startsWith('/vendor');

    if (isDashboard) {
        return <main>{children}</main>;
    }

    return (
        <>
            <Navbar />
            <ScrollToTop />
            <main>{children}</main>
            <Footer />
        </>
    );
}
