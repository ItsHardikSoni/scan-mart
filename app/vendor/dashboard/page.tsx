'use client';

import { motion } from 'framer-motion';
import {
    IndianRupee,
    ShoppingCart,
    Users,
    TrendingUp,
    Package,
    ArrowUpRight,
    ArrowDownRight,
    Store
} from 'lucide-react';

const stats = [
    {
        name: 'Total Revenue',
        value: '₹0',
        change: '0%',
        trend: 'up',
        icon: IndianRupee,
    },
    {
        name: 'Active Orders',
        value: '0',
        change: '0%',
        trend: 'up',
        icon: ShoppingCart,
    },
    {
        name: 'Store Visits',
        value: '0',
        change: '0%',
        trend: 'up',
        icon: Users,
    },
    {
        name: 'Conversion Rate',
        value: '0%',
        change: '0%',
        trend: 'up',
        icon: TrendingUp,
    },
];

const recentOrders: any[] = [];

export default function VendorDashboardPage() {
    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto w-full">
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border/50 p-6 rounded-3xl shadow-sm relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        Welcome back, Store Owner! <span className="text-lg">👋</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Here's what's happening with your store today.
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-background/50 p-3 rounded-2xl border border-border/50 shrink-0">
                    <div className="h-8 w-8 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
                        <Store className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">Store Status</p>
                        <p className="text-xs text-green-500 flex items-center gap-1 font-semibold">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Accepting Orders
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
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
                {/* Placeholder for Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-card border border-border/50 p-6 rounded-3xl shadow-sm min-h-[400px] flex flex-col"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-base font-semibold text-foreground">Revenue Overview</h3>
                            <p className="text-xs text-muted-foreground">Monthly earning performance</p>
                        </div>
                        <select className="bg-background border border-border/50 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>This Year</option>
                        </select>
                    </div>

                    <div className="flex-1 border-2 border-dashed border-border/50 rounded-2xl flex items-center justify-center bg-background/30 text-muted-foreground flex-col gap-3">
                        <TrendingUp className="h-10 w-10 text-primary/40" />
                        <p>Interactive Revenue chart will render here</p>
                        <p className="text-xs max-w-xs text-center">Using placeholder to establish layout. We will integrate recharts library for actual data visualization.</p>
                    </div>
                </motion.div>

                {/* Recent Orders List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-card border border-border/50 p-6 rounded-3xl shadow-sm"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                            <Package className="h-4 w-4 text-primary" />
                            Recent Orders
                        </h3>
                        <a href="#" className="text-xs text-primary hover:underline font-medium">View all</a>
                    </div>

                    <div className="space-y-4">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted/50 transition-colors group cursor-pointer border border-transparent hover:border-border/50">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                                        {order.customer.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{order.customer}</p>
                                        <p className="text-xs text-muted-foreground">{order.product}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-foreground">{order.amount}</p>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                                        order.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' :
                                            'bg-orange-500/10 text-orange-500'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
