'use client';

import { useState } from 'react';
import {
    Users,
    Search,
    Mail,
    Filter,
    MoreVertical,
    Check,
    ShieldAlert,
    ExternalLink,
    Store,
    MapPin,
    Calendar,
    ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// REVERTED: Mock vendors for admin management
const mockVendorsData = [
    { id: '1', store_name: 'Metro Mart', email: 'contact@metromart.com', status: 'Pending', created_at: new Date().toISOString(), category: 'Groceries', location: 'New Delhi' },
    { id: '2', store_name: 'City Supermarket', email: 'city@super.com', status: 'Approved', created_at: new Date().toISOString(), category: 'Daily Needs', location: 'Mumbai' },
    { id: '3', store_name: 'Green Grocers', email: 'orders@green.com', status: 'Approved', created_at: new Date().toISOString(), category: 'Organic', location: 'Bangalore' },
    { id: '4', store_name: 'Daily Needs', email: 'daily@needs.com', status: 'Blocked', created_at: new Date().toISOString(), category: 'General', location: 'Chennai' },
    { id: '5', store_name: 'Mega Store', email: 'admin@megastore.in', status: 'Pending', created_at: new Date().toISOString(), category: 'Hypermarket', location: 'Pune' },
];

export default function AdminVendorsPage() {
    const [vendors, setVendors] = useState(mockVendorsData);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const handleStatusChange = (id: string, newStatus: string) => {
        setVendors(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
    };

    const filteredVendors = vendors.filter(vendor => {
        const matchesSearch = vendor.store_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'All' || vendor.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto w-full">
            {/* Header section - Aligned with the new Overview style */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border/50 p-6 rounded-3xl shadow-sm relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        Vendor Ecosystem <span className="text-lg">🏪</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Review, verify and moderate all registered platform vendors.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="h-10 px-4 bg-background/50 border border-border/50 rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground hover:border-border transition-all flex items-center gap-2 backdrop-blur-md">
                        <ArrowUpRight className="h-4 w-4" />
                        Platform Report
                    </button>
                </div>
            </motion.div>

            {/* Filters and Search Bar - Premium Style */}
            <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search stores, emails, or locations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex h-9 w-full rounded-xl border border-input bg-background/50 pl-9 pr-4 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-all font-medium"
                    />
                </div>

                <div className="flex items-center gap-1.5 bg-muted/30 p-1 rounded-xl border border-border/50 overflow-x-auto w-full sm:w-auto">
                    {['All', 'Pending', 'Approved', 'Blocked'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${filterStatus === status
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Vendor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredVendors.map((vendor, idx) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: idx * 0.05 }}
                            key={vendor.id}
                            className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
                        >
                            <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />

                            <div className="flex items-center justify-between mb-6 relative z-10">
                                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-lg text-primary border border-primary/20 shadow-inner">
                                    {vendor.store_name.charAt(0)}
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${vendor.status === 'Approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                        vendor.status === 'Pending' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                            'bg-destructive/10 text-destructive border-destructive/20'
                                    }`}>
                                    <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${vendor.status === 'Approved' ? 'bg-green-500' :
                                            vendor.status === 'Pending' ? 'bg-orange-500' :
                                                'bg-destructive'
                                        }`} />
                                    {vendor.status}
                                </span>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div>
                                    <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">{vendor.store_name}</h3>
                                    <p className="text-xs text-muted-foreground mt-0.5">{vendor.email}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 py-4 border-y border-border/50">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Category</p>
                                        <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                            <Store className="h-3 w-3 text-primary/60" />
                                            {vendor.category}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Location</p>
                                        <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                            <MapPin className="h-3 w-3 text-primary/60" />
                                            {vendor.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(vendor.created_at).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {vendor.status !== 'Approved' && (
                                            <button
                                                onClick={() => handleStatusChange(vendor.id, 'Approved')}
                                                className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-xl transition-all"
                                                title="Approve"
                                            >
                                                <Check className="h-4 w-4" />
                                            </button>
                                        )}
                                        {vendor.status !== 'Blocked' && (
                                            <button
                                                onClick={() => handleStatusChange(vendor.id, 'Blocked')}
                                                className="p-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white rounded-xl transition-all"
                                                title="Block"
                                            >
                                                <ShieldAlert className="h-4 w-4" />
                                            </button>
                                        )}
                                        <button className="p-2 hover:bg-muted rounded-xl transition-colors">
                                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredVendors.length === 0 && (
                    <div className="col-span-full py-32 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="h-20 w-20 bg-muted/50 rounded-full flex items-center justify-center border-2 border-dashed border-border/50">
                            <Store className="h-10 w-10 text-muted-foreground/30" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">No vendors match your search</h3>
                        <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-1">
                            Adjust your filters or try a different search term in the control center.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
