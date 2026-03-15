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
    Loader2,
    X,
    Phone,
    Hash,
    Building2,
    CreditCard,
    Globe,
    FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export default function AdminVendorsPage() {
    const [vendors, setVendors] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedVendor, setSelectedVendor] = useState<any>(null);

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
                            onClick={() => setSelectedVendor(vendor)}
                            className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group cursor-pointer"
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

            {/* Vendor Detail Modal */}
            <AnimatePresence>
                {selectedVendor && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedVendor(null)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-card border border-border/50 rounded-[2.5rem] shadow-2xl shadow-primary/10 overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="p-8 border-b border-border/50 flex items-center justify-between bg-muted/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
                                <div className="flex items-center gap-5">
                                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-2xl text-primary border border-primary/20 shadow-inner">
                                        {selectedVendor.store_name?.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-foreground tracking-tight">{selectedVendor.store_name}</h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${selectedVendor.status === 'Approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                selectedVendor.status === 'Pending' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                                    'bg-destructive/10 text-destructive border-destructive/20'
                                                }`}>
                                                {selectedVendor.status}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1.5 ml-2">
                                                <Calendar className="h-3 w-3" />
                                                Joined {new Date(selectedVendor.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedVendor(null)}
                                    className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                                {/* Store Info Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                                                <Building2 className="h-3 w-3" />
                                                General Information
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="p-4 bg-muted/30 border border-border/50 rounded-2xl space-y-1">
                                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Username / Handle</p>
                                                    <p className="text-sm font-semibold text-foreground">@{selectedVendor.username}</p>
                                                </div>
                                                <div className="p-4 bg-muted/30 border border-border/50 rounded-2xl space-y-1">
                                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Store Email</p>
                                                    <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                                                        <Mail className="h-4 w-4 text-primary/60" />
                                                        {selectedVendor.email}
                                                    </p>
                                                </div>
                                                <div className="p-4 bg-muted/30 border border-border/50 rounded-2xl space-y-1">
                                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Contact Phone</p>
                                                    <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                                                        <Phone className="h-4 w-4 text-primary/60" />
                                                        {selectedVendor.phone_number || 'Not provided'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                                                <CreditCard className="h-3 w-3" />
                                                Compliance & Tax
                                            </h3>
                                            <div className="p-4 bg-muted/30 border border-border/50 rounded-2xl space-y-1">
                                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">GST Number</p>
                                                <p className="text-sm font-black text-foreground tracking-widest font-mono">
                                                    {selectedVendor.gst_number || 'UNREGISTERED'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                                                <MapPin className="h-3 w-3" />
                                                Operational Location
                                            </h3>
                                            <div className="p-5 bg-muted/30 border border-border/50 rounded-3xl space-y-4">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Full Address</p>
                                                    <p className="text-sm font-medium leading-relaxed italic text-foreground/80">
                                                        &ldquo;{selectedVendor.store_address || 'Address information missing'}&rdquo;
                                                    </p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/30">
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">District</p>
                                                        <p className="text-sm font-bold">{selectedVendor.district}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">State</p>
                                                        <p className="text-sm font-bold">{selectedVendor.state}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Pincode</p>
                                                        <p className="text-sm font-bold font-mono tracking-widest">{selectedVendor.pincode}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-primary/5 border border-primary/20 rounded-3xl space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-primary/10 rounded-xl">
                                                    <ShieldAlert className="h-4 w-4 text-primary" />
                                                </div>
                                                <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Intelligence View</h4>
                                            </div>
                                            <p className="text-[10px] text-muted-foreground leading-relaxed">
                                                Verify the GST and Store address before approval. Blocked vendors will lose all access to their dashboard and POS systems immediately.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer (Actions) */}
                            <div className="p-8 border-t border-border/50 bg-muted/10 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleDeleteVendor(selectedVendor.id)}
                                        className="h-12 px-6 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Delete Vendor
                                    </button>
                                </div>
                                <div className="flex items-center gap-3">
                                    {selectedVendor.status !== 'Approved' && (
                                        <button
                                            onClick={() => {
                                                handleStatusChange(selectedVendor.id, 'Approved');
                                                setSelectedVendor(null);
                                            }}
                                            className="h-12 px-8 bg-green-500 text-white hover:bg-green-600 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-green-500/20 flex items-center gap-2"
                                        >
                                            <Check className="h-4 w-4" />
                                            Approve Store
                                        </button>
                                    )}
                                    {selectedVendor.status !== 'Blocked' && (
                                        <button
                                            onClick={() => {
                                                handleStatusChange(selectedVendor.id, 'Blocked');
                                                setSelectedVendor(null);
                                            }}
                                            className="h-12 px-8 bg-amber-500 text-white hover:bg-amber-600 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
                                        >
                                            <ShieldAlert className="h-4 w-4" />
                                            Block Access
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
