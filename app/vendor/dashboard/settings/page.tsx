'use client';

import { motion } from 'framer-motion';
import {
    Settings, Store, CreditCard, Bell, Shield, MapPin, CheckCircle2, Save
} from 'lucide-react';

export default function VendorSettingsPage() {
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
                    <button className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
                        <CreditCard className="h-4 w-4" />
                        Payments
                    </button>
                    <button className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
                        <Bell className="h-4 w-4" />
                        Notifications
                    </button>
                    <button className="w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors">
                        <Shield className="h-4 w-4" />
                        Security
                    </button>
                </div>

                {/* Settings Content Area */}
                <div className="md:col-span-3 space-y-6">

                    {/* Store Profile Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border/50 rounded-3xl p-6 md:p-8 shadow-sm"
                    >
                        <h2 className="text-base font-bold text-foreground mb-4 pb-3 border-b border-border/50 flex items-center gap-2">
                            Store Profile Profile
                        </h2>

                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-foreground">Store Name</label>
                                    <input type="text" defaultValue="John Store" className="flex h-9 w-full rounded-xl border border-input bg-background/50 px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-foreground">Contact Email</label>
                                    <input type="email" defaultValue="john@example.com" className="flex h-9 w-full rounded-xl border border-input bg-background/50 px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-foreground">Store Description</label>
                                <textarea rows={4} defaultValue="We provide the best electronics and accessories straight to your doorstep." className="flex w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 resize-none" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-foreground">Registration Number (GST/VAT)</label>
                                <input type="text" defaultValue="27AADCB2230M1Z2" className="flex h-9 w-full md:max-w-md rounded-xl border border-input bg-background/50 px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" />
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-border/50 flex justify-end gap-3">
                            <button className="px-3 py-1.5 rounded-xl text-xs font-medium text-foreground border border-border hover:bg-muted/50 transition-colors">
                                Discard
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors gap-2 shadow-sm shadow-primary/20">
                                <Save className="h-3 w-3" />
                                Save Changes
                            </button>
                        </div>
                    </motion.div>

                    {/* Quick Status Toggles */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-card border border-border/50 rounded-3xl p-6 md:p-8 shadow-sm space-y-6"
                    >
                        <h2 className="text-base font-bold text-foreground pb-4 border-b border-border/50">Store Status</h2>

                        <div className="flex items-center justify-between p-4 rounded-2xl border border-green-500/20 bg-green-500/5">
                            <div>
                                <h3 className="font-medium text-sm text-green-600 dark:text-green-500 flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Accepting Orders
                                </h3>
                                <p className="text-xs text-muted-foreground mt-0.5">Your store is currently visible to customers and accepting new orders.</p>
                            </div>
                            {/* Mock toggle button */}
                            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
                                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
