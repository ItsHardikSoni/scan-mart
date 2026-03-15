'use client';

import { motion } from 'framer-motion';
import {
    IndianRupee,
    Users,
    TrendingUp,
    Store,
    ArrowUpRight,
    ArrowDownRight,
    Shield,
    MessageSquare,
    Clock,
    Activity,
    ChevronRight,
    ChevronDown
} from 'lucide-react';

const stats = [
    {
        name: 'Total Revenue',
        value: '₹1.25L',
        change: '+12.5%',
        trend: 'up',
        icon: IndianRupee,
    },
    {
        name: 'Total Vendors',
        value: '42',
        change: '+8%',
        trend: 'up',
        icon: Store,
    },
    {
        name: 'Pending Tasks',
        value: '8',
        change: '-2%',
        trend: 'down',
        icon: Clock,
    },
    {
        name: 'User Messages',
        value: '15',
        change: '+4%',
        trend: 'up',
        icon: MessageSquare,
    },
];

const mockRecentVendors = [
    { id: '1', store_name: 'Metro Mart', email: 'contact@metromart.com', status: 'Pending', created_at: new Date().toISOString() },
    { id: '2', store_name: 'City Supermarket', email: 'city@super.com', status: 'Approved', created_at: new Date().toISOString() },
    { id: '3', store_name: 'Green Grocers', email: 'orders@green.com', status: 'Approved', created_at: new Date().toISOString() },
];

export default function AdminDashboardPage() {
    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto w-full">
            {/* Welcome Section - Aligned with Vendor Dashboard */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border/50 p-6 rounded-3xl shadow-sm relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        Welcome back, Admin! <span className="text-lg">🛡️</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Global platform statistics and ecosystem monitoring.
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-background/50 p-3 rounded-2xl border border-border/50 shrink-0">
                    <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Activity className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">System Status</p>
                        <p className="text-xs text-primary flex items-center gap-1 font-semibold">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Core Operational
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid - Aligned with Vendor Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card border border-border/50 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
                    >
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />

                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                            <div className="p-2 bg-primary/10 text-primary rounded-xl">
                                <stat.icon className="h-4 w-4" />
                            </div>
                        </div>

                        <div className="flex items-baseline gap-2 relative z-10">
                            <h2 className="text-2xl font-bold text-foreground">{stat.value}</h2>
                            <span className={`flex items-center text-[10px] font-semibold ${stat.trend === 'up' ? 'text-green-500' : 'text-destructive'}`}>
                                {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                                {stat.change}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Growth Chart Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-card border border-border/50 p-6 rounded-3xl shadow-sm min-h-[400px] flex flex-col"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-base font-semibold text-foreground">Platform Growth</h3>
                            <p className="text-xs text-muted-foreground">Ecosystem expansion metrics</p>
                        </div>
                        <select className="bg-background border border-border/50 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground">
                            <option>Monthly</option>
                            <option>Quarterly</option>
                            <option>Yearly</option>
                        </select>
                    </div>

                    <div className="flex-1 border-2 border-dashed border-border/50 rounded-2xl flex items-center justify-center bg-background/30 text-muted-foreground flex-col gap-3 group hover:bg-background/40 transition-colors">
                        <TrendingUp className="h-10 w-10 text-primary/40 group-hover:scale-110 transition-transform" />
                        <p className="font-medium">Global analytics rendering ready.</p>
                        <p className="text-xs max-w-xs text-center text-muted-foreground/60">System is processing real-time telemetry from all connected storefronts.</p>
                    </div>
                </motion.div>

                {/* Recent Vendor Requests */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-card border border-border/50 p-6 rounded-3xl shadow-sm flex flex-col"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                            <Store className="h-4 w-4 text-primary" />
                            New Requests
                        </h3>
                        <a href="/admin/dashboard/vendors" className="text-xs text-primary hover:underline font-medium">Moderate</a>
                    </div>

                    <div className="space-y-4 flex-1">
                        {mockRecentVendors.map((vendor) => (
                            <div key={vendor.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted/50 transition-colors group cursor-pointer border border-transparent hover:border-border/50">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                                        {vendor.store_name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{vendor.store_name}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none mt-1">{vendor.status}</p>
                                    </div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-3 bg-primary text-primary-foreground font-bold rounded-2xl text-xs hover:shadow-lg transition-all active:scale-95 shadow-sm shadow-primary/20">
                        View Directory
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
