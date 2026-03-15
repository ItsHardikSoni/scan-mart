'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Settings, Store, CreditCard, Bell, Shield, MapPin, CheckCircle2, Save, Loader2
} from 'lucide-react';
import { getVendorInfo } from '@/app/actions/vendor';
import { toast } from 'sonner';

export default function VendorSettingsPage() {
    const [vendor, setVendor] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchVendor = async () => {
            const result = await getVendorInfo();
            if (result.data) {
                setVendor(result.data);
            }
            setIsLoading(false);
        };
        fetchVendor();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!vendor?.id) return;

        setIsSaving(true);
        const { updateVendor } = await import('@/app/actions/vendor');

        // Prepare data to update
        const updateData = {
            store_name: vendor.store_name,
            phone_number: vendor.phone_number,
            username: vendor.username,
            gst_number: vendor.gst_number,
            store_address: vendor.store_address,
            district: vendor.district,
            state: vendor.state,
            pincode: vendor.pincode
        };

        const result = await updateVendor(vendor.id, updateData);

        if (result.success) {
            toast.success("Profile updated successfully!");
        } else {
            toast.error(result.error || "Failed to update profile");
        }
        setIsSaving(false);
    };

    const handleChange = (field: string, value: string) => {
        setVendor((prev: any) => ({ ...prev, [field]: value }));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto w-full space-y-8 pb-20">
            {/* Header section */}
            <div>
                <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Store Settings
                </h1>
                <p className="text-muted-foreground mt-1 text-xs">Manage your store profile, payments, and preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar Settings Nav */}
                <div className="md:col-span-1 space-y-1">
                    <button className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium bg-primary/10 text-primary transition-colors">
                        <Store className="h-4 w-4" />
                        Store Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
                        <MapPin className="h-4 w-4" />
                        Locations
                    </button>
                    <button className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors" disabled>
                        <CreditCard className="h-4 w-4" />
                        Payments
                    </button>
                    <button className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors" disabled>
                        <Bell className="h-4 w-4" />
                        Notifications
                    </button>
                    <button className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors" disabled>
                        <Shield className="h-4 w-4" />
                        Security
                    </button>
                </div>

                {/* Settings Content Area */}
                <div className="md:col-span-3 space-y-6">

                    {/* Store Profile Section */}
                    <motion.form
                        onSubmit={handleSave}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border/50 rounded-3xl p-6 md:p-8 shadow-sm"
                    >
                        <h2 className="text-base font-bold text-foreground mb-4 pb-3 border-b border-border/50 flex items-center gap-2">
                            Store Profile
                        </h2>

                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-foreground">Store Name</label>
                                    <input
                                        type="text"
                                        value={vendor?.store_name || ''}
                                        onChange={(e) => handleChange('store_name', e.target.value)}
                                        className="flex h-9 w-full rounded-xl border border-input bg-background/50 px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-foreground">Contact Email</label>
                                    <input
                                        type="email"
                                        value={vendor?.email || ''}
                                        disabled
                                        className="flex h-9 w-full rounded-xl border border-input bg-muted/50 px-3 py-1.5 text-xs focus-visible:outline-none opacity-80 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-foreground">Phone Number</label>
                                    <input
                                        type="text"
                                        value={vendor?.phone_number || ''}
                                        onChange={(e) => handleChange('phone_number', e.target.value)}
                                        className="flex h-9 w-full rounded-xl border border-input bg-background/50 px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-foreground">Username</label>
                                    <input
                                        type="text"
                                        value={vendor?.username || ''}
                                        onChange={(e) => handleChange('username', e.target.value)}
                                        className="flex h-9 w-full rounded-xl border border-input bg-background/50 px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-foreground">GST Certificate (Optional)</label>
                                    <input
                                        type="text"
                                        value={vendor?.gst_number || ''}
                                        onChange={(e) => handleChange('gst_number', e.target.value)}
                                        className="flex h-9 w-full rounded-xl border border-input bg-background/50 px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-medium text-foreground">Store Address</label>
                                    <input
                                        type="text"
                                        value={vendor?.store_address || ''}
                                        onChange={(e) => handleChange('store_address', e.target.value)}
                                        className="flex h-9 w-full rounded-xl border border-input bg-background/50 px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-foreground">Pincode</label>
                                    <input
                                        type="text"
                                        value={vendor?.pincode || ''}
                                        onChange={(e) => handleChange('pincode', e.target.value)}
                                        className="flex h-9 w-full rounded-xl border border-input bg-background/50 px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-foreground">District</label>
                                    <input
                                        type="text"
                                        value={vendor?.district || ''}
                                        onChange={(e) => handleChange('district', e.target.value)}
                                        className="flex h-9 w-full rounded-xl border border-input bg-background/50 px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-foreground">State</label>
                                    <input
                                        type="text"
                                        value={vendor?.state || ''}
                                        onChange={(e) => handleChange('state', e.target.value)}
                                        className="flex h-9 w-full rounded-xl border border-input bg-background/50 px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-border/50 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLoading(true);
                                    getVendorInfo().then(res => {
                                        if (res.data) setVendor(res.data);
                                        setIsLoading(false);
                                    });
                                }}
                                className="px-3 py-1.5 rounded-xl text-xs font-medium text-foreground border border-border hover:bg-muted/50 transition-colors"
                            >
                                Discard
                            </button>
                            <button type="submit" disabled={isSaving} className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors gap-2 shadow-sm shadow-primary/20">
                                {isSaving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
                                Save Changes
                            </button>
                        </div>
                    </motion.form>

                    {/* Quick Status Toggles */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-card border border-border/50 rounded-3xl p-6 md:p-8 shadow-sm space-y-6"
                    >
                        <h2 className="text-base font-bold text-foreground pb-4 border-b border-border/50">Account Status</h2>

                        <div className={`flex items-center justify-between p-4 rounded-2xl border ${vendor?.is_approved ? 'border-green-500/20 bg-green-500/5' : 'border-amber-500/20 bg-amber-500/5'}`}>
                            <div>
                                <h3 className={`font-medium text-sm flex items-center gap-2 ${vendor?.is_approved ? 'text-green-600 dark:text-green-500' : 'text-amber-600 dark:text-amber-500'}`}>
                                    {vendor?.is_approved ? <CheckCircle2 className="h-4 w-4" /> : <Loader2 className="h-4 w-4 animate-spin" />}
                                    {vendor?.status}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {vendor?.is_approved
                                        ? "Your store is verified and active on ScanMart."
                                        : "Your account is currently under review by our admin team."}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
