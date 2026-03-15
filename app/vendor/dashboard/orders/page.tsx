'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ShoppingCart, Search, Filter, ChevronRight, Download, Eye, ExternalLink
} from 'lucide-react';

const mockOrders: any[] = [];

const tabs = ['All Orders', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function VendorOrdersPage() {
    const [activeTab, setActiveTab] = useState('All Orders');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredOrders = mockOrders.filter(order => {
        const matchesTab = activeTab === 'All Orders' || order.status === activeTab;
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="p-6 max-w-7xl mx-auto w-full space-y-8">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5 text-primary" />
                        Orders
                    </h1>
                    <p className="text-muted-foreground mt-1 text-xs">View and manage customer orders.</p>
                </div>

                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-medium ring-offset-background transition-all hover:bg-muted/50 h-9 px-3 py-1.5 gap-2 border border-border text-foreground w-full sm:w-auto">
                    <Download className="h-4 w-4" />
                    Export CSV
                </button>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto hidden-scrollbar gap-2 pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${activeTab === tab
                            ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                            : 'bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Filters and Search */}
            <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex h-9 w-full rounded-xl border border-input bg-background/50 pl-10 pr-4 py-1.5 text-xs ring-offset-background md:w-96 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    />
                </div>

                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-medium ring-offset-background transition-all hover:bg-muted/50 h-9 px-3 py-1.5 gap-2 border border-border text-foreground w-full sm:w-auto">
                    <Filter className="h-4 w-4" />
                    Filters
                </button>
            </div>

            {/* Orders Table */}
            <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                        <thead className="bg-muted/50 text-muted-foreground border-b border-border/50">
                            <tr>
                                <th className="px-6 py-4 font-medium">Order ID</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Payment</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Total</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50 text-foreground">
                            {filteredOrders.map((order, index) => (
                                <motion.tr
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={order.id}
                                    className="hover:bg-muted/30 transition-colors group cursor-pointer"
                                >
                                    <td className="px-6 py-4 font-medium text-foreground group-hover:text-primary transition-colors">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium">{order.customer}</span>
                                        <p className="text-xs text-muted-foreground">{order.items} Items</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${order.payment === 'Paid' ? 'bg-green-500/10 text-green-500' :
                                            order.payment === 'Refunded' ? 'bg-muted text-muted-foreground' :
                                                'bg-orange-500/10 text-orange-500'
                                            }`}>
                                            {order.payment}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                            order.status === 'Processing' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                order.status === 'Shipped' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                                                    'bg-destructive/10 text-destructive border-destructive/20'
                                            }`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' :
                                                order.status === 'Processing' ? 'bg-blue-500' :
                                                    order.status === 'Shipped' ? 'bg-purple-500' :
                                                        'bg-destructive'
                                                }`} />
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold">{order.total}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="View Details">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Open Customer">
                                                <ExternalLink className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}

                            {filteredOrders.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                                        <div className="flex flex-col items-center gap-2">
                                            <ShoppingCart className="h-8 w-8 opacity-20" />
                                            <p>No orders found matching your criteria</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
