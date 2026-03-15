'use client';

import { useState, useEffect } from 'react';
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
    ArrowUpRight,
    Trash2,
    Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export default function AdminVendorsPage() {
    const [vendors, setVendors] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        fetchVendors();

        // Set up real-time subscription
        const channel = supabase
            .channel('admin-vendors-realtime')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'vendors'
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setVendors((prev) => [payload.new, ...prev]);
                    } else if (payload.eventType === 'UPDATE') {
                        setVendors((prev) =>
                            prev.map((v) => (v.id === payload.new.id ? payload.new : v))
                        );
                    } else if (payload.eventType === 'DELETE') {
                        setVendors((prev) => prev.filter((v) => v.id === payload.old.id));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchVendors = async () => {
        try {
            const res = await fetch('/api/v0/admin/vendors');
            const data = await res.json();
            if (Array.isArray(data)) {
                setVendors(data);
            }
        } catch (err) {
            toast.error('Failed to load vendors');
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            const { updateVendorStatus } = await import('@/app/actions/admin');
            const result = await updateVendorStatus(id, newStatus, newStatus === 'Approved');

            if (result.success) {
                toast.success(`Vendor status updated to ${newStatus}`);
            } else {
                toast.error(result.error || 'Failed to update status');
            }
        } catch (err) {
            toast.error('System error');
        }
    };

    const handleDeleteVendor = async (id: string) => {
        if (!confirm('Are you sure you want to delete this vendor? This action is permanent.')) return;

        try {
            const { deleteVendor } = await import('@/app/actions/admin');
            const result = await deleteVendor(id);

            if (result.success) {
                toast.success('Vendor deleted successfully');
            } else {
                toast.error(result.error || 'Failed to delete vendor');
            }
        } catch (err) {
            toast.error('System error');
        }
    };

    const filteredVendors = vendors.filter(vendor => {
        const matchesSearch = (vendor.store_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (vendor.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (vendor.district?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'All' || vendor.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto w-full">
            {/* Header section */}
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
                    <button onClick={fetchVendors} className="h-10 px-4 bg-background/50 border border-border/50 rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground hover:border-border transition-all flex items-center gap-2 backdrop-blur-md">
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUpRight className="h-4 w-4" />}
                        Refresh List
                    </button>
                </div>
            </motion.div>

            {/* Filters and Search Bar */}
            <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search stores, emails, or districts..."
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
                    {!isLoading && filteredVendors.map((vendor, idx) => (
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
                                    {(vendor.store_name || 'V').charAt(0)}
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
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Username</p>
                                        <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                            <Users className="h-3 w-3 text-primary/60" />
                                            {vendor.username}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">District</p>
                                        <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                            <MapPin className="h-3 w-3 text-primary/60" />
                                            {vendor.district}
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
                                                className="p-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white rounded-xl transition-all"
                                                title="Block"
                                            >
                                                <ShieldAlert className="h-4 w-4" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteVendor(vendor.id)}
                                            className="p-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white rounded-xl transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {!isLoading && filteredVendors.length === 0 && (
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
                {isLoading && (
                    <div className="col-span-full py-32 flex flex-col items-center justify-center text-center">
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                        <p className="text-muted-foreground text-sm mt-4">Loading vendor ecosystem...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
