'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Store,
    LayoutDashboard,
    Package,
    ShoppingCart,
    Settings,
    Bell,
    Menu,
    X,
    LogOut,
    ChevronDown,
    User
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import NotificationBell from '@/components/vendor/NotificationBell';
import { toast } from 'sonner';

const navItems = [
    { href: '/vendor/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/vendor/dashboard/products', icon: Package, label: 'Products' },
    { href: '/vendor/dashboard/billing', icon: ShoppingCart, label: 'Billing/POS' },
    { href: '/vendor/dashboard/orders', icon: ShoppingCart, label: 'Orders' },
    { href: '/vendor/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function VendorDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const [vendor, setVendor] = useState<any>(null);

    useEffect(() => {
        const fetchVendor = async () => {
            const { getVendorInfo } = await import('@/app/actions/vendor');
            const result = await getVendorInfo();
            if (result.data) {
                setVendor(result.data);
            }
        };
        fetchVendor();
    }, []);

    useEffect(() => {
        if (!vendor?.id) return;

        const channel = supabase
            .channel(`vendor-status-${vendor.id}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'vendors',
                    filter: `id=eq.${vendor.id}`
                },
                (payload) => {
                    console.log('Vendor status update:', payload);
                    if (payload.eventType === 'UPDATE') {
                        const newStatus = payload.new.status;
                        if (newStatus === 'Blocked') {
                            toast.error('Your account has been blocked by an administrator.', {
                                duration: Infinity,
                            });
                            // Clear session and redirect
                            const forceLogout = async () => {
                                const { clearVendorSession } = await import('@/app/actions/auth');
                                await clearVendorSession();
                                setTimeout(() => {
                                    window.location.href = '/vendor/login';
                                }, 3000);
                            };
                            forceLogout();
                        } else {
                            setVendor(payload.new);
                        }
                    } else if (payload.eventType === 'DELETE') {
                        toast.error('Your account has been removed.', {
                            duration: Infinity,
                        });
                        const forceLogout = async () => {
                            const { clearVendorSession } = await import('@/app/actions/auth');
                            await clearVendorSession();
                            setTimeout(() => {
                                window.location.href = '/vendor/login';
                            }, 2000);
                        };
                        forceLogout();
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [vendor?.id, router]);

    const handleLogout = async () => {
        // Mock logout: Clear session and redirect to login
        try {
            const { clearVendorSession } = await import('@/app/actions/auth');
            await clearVendorSession();
            router.push('/vendor/login');
            router.refresh();
        } catch (err) {
            router.push('/vendor/login');
        }
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border/50 shadow-xl shadow-primary/5 transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out lg:static lg:block`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-border/50">
                        <Link href="/vendor/dashboard" className="flex items-center gap-2 group">
                            <div className="bg-primary/10 text-primary p-1.5 rounded-xl group-hover:scale-105 transition-transform">
                                <Store className="h-4 w-4" />
                            </div>
                            <span className="font-bold text-base text-foreground">ScanMart Vendor</span>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="ml-auto lg:hidden text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto hidden-scrollbar">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-2.5 py-2 rounded-xl transition-all group relative text-sm ${isActive
                                        ? 'text-primary bg-primary/10 font-medium'
                                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-indicator"
                                            className="absolute left-0 w-1 h-5 bg-primary rounded-r-full"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <item.icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'group-hover:text-primary/70 transition-colors'}`} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Actions */}
                    <div className="p-4 border-t border-border/50">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-2.5 py-2 w-full rounded-xl text-xs text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors group"
                        >
                            <LogOut className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Top Header */}
                <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-card/50 backdrop-blur-md border-b border-border/50 sticky top-0 z-30">
                    <div className="flex items-center gap-4 hidden lg:flex">
                        <h2 className="text-lg font-semibold text-foreground capitalize">
                            {pathname.split('/').pop() === 'dashboard' ? 'Overview' : pathname.split('/').pop()}
                        </h2>
                    </div>

                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        {/* Notifications */}
                        <NotificationBell vendorId={vendor?.id} />


                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50"
                            >
                                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-primary-foreground shadow-sm">
                                    <User className="h-4 w-4" />
                                </div>
                                <div className="hidden sm:block text-left">
                                    <p className="text-xs font-medium leading-none text-foreground">{vendor?.store_name || 'Loading...'}</p>
                                </div>
                                <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:block" />
                            </button>

                            <AnimatePresence>
                                {profileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 mt-2 w-48 bg-card rounded-xl border border-border pb-1 shadow-lg shadow-primary/5 py-1 z-50 origin-top-right"
                                    >
                                        <div className="px-3 py-2 border-b border-border/50 mb-1">
                                            <p className="text-xs font-medium text-foreground">{vendor?.store_name}</p>
                                            <p className="text-[10px] text-muted-foreground truncate">{vendor?.email}</p>
                                        </div>
                                        <Link
                                            href="/vendor/dashboard/settings"
                                            className="block px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                            onClick={() => setProfileOpen(false)}
                                        >
                                            Store Settings
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setProfileOpen(false);
                                                handleLogout();
                                            }}
                                            className="block w-full text-left px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 transition-colors"
                                        >
                                            Log out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto bg-background/50">
                    {children}
                </div>
            </main>
        </div>
    );
}
