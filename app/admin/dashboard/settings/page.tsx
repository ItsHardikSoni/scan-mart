'use client';

import { motion } from 'framer-motion';
import {
    Save,
    ChevronRight,
    HelpCircle,
    Loader2,
    User,
    Lock,
    Bell,
    Shield
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAdminProfile, updateAdminProfile, changeAdminPassword, getAdminStats, getRecentVendors } from '@/app/actions/admin';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export default function AdminSettingsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [admin, setAdmin] = useState<any>(null);
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

    useEffect(() => {
        const fetchAdmin = async () => {
            const res = await getAdminProfile();
            if (res.data) setAdmin(res.data);
            setIsLoading(false);
        };
        fetchAdmin();
    }, []);

    const handleSaveProfile = async () => {
        setIsSaving(true);
        const res = await updateAdminProfile({
            full_name: admin.full_name,
            email: admin.email
        });
        if (res.success) toast.success("Profile updated!");
        else toast.error(res.error || "Update failed");
        setIsSaving(false);
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setIsSaving(true);
        const res = await changeAdminPassword({
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword
        });
        if (res.success) {
            toast.success("Password changed!");
            setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } else {
            toast.error(res.error || "Failed to change password");
        }
        setIsSaving(false);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
        );
    }

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
                        System Configuration <span className="text-lg">⚙️</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage global platform preferences and security controls.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="h-10 px-6 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Save Changes
                    </button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Side Navigation for Settings */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-card border border-border/50 rounded-3xl p-4 shadow-sm space-y-2">
                        {[
                            { name: 'Profile Information', icon: User, active: true },
                            { name: 'Security & Access', icon: Lock },
                            { name: 'Notifications', icon: Bell },
                            { name: 'Privacy Center', icon: Shield },
                        ].map((item, idx) => (
                            <button
                                key={item.name}
                                className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all group ${item.active
                                    ? 'bg-primary/10 text-primary font-bold'
                                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className={`h-4 w-4 ${item.active ? 'text-primary' : 'group-hover:text-primary/70 transition-colors'}`} />
                                    <span className="text-xs uppercase tracking-widest">{item.name}</span>
                                </div>
                                <ChevronRight className={`h-3 w-3 ${item.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-all`} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Settings Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Profile Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-card border border-border/50 rounded-[2rem] p-8 shadow-sm space-y-8"
                    >
                        <div>
                            <h3 className="text-lg font-bold text-foreground">Profile Information</h3>
                            <p className="text-xs text-muted-foreground mt-1">Update your administrative account details.</p>
                        </div>

                        <div className="flex items-center gap-6 pb-6 border-b border-border/50">
                            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl border border-primary/20 shadow-inner">
                                {admin?.full_name?.charAt(0) || 'A'}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-foreground">{admin?.full_name}</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">{admin?.email}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                                <input
                                    type="text"
                                    value={admin?.full_name || ''}
                                    onChange={(e) => setAdmin({ ...admin, full_name: e.target.value })}
                                    className="w-full h-11 bg-background/50 border border-border/50 rounded-xl px-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
                                <input
                                    type="email"
                                    value={admin?.email || ''}
                                    onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
                                    className="w-full h-11 bg-background/50 border border-border/50 rounded-xl px-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Change Password Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-card border border-border/50 rounded-[2rem] p-8 shadow-sm space-y-8"
                    >
                        <div>
                            <h3 className="text-lg font-bold text-foreground">Change Password</h3>
                            <p className="text-xs text-muted-foreground mt-1">Ensure your account is using a long, random password to stay secure.</p>
                        </div>

                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Current Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwords.oldPassword}
                                    onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                                    className="w-full h-11 bg-background/50 border border-border/50 rounded-xl px-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">New Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={passwords.newPassword}
                                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                        className="w-full h-11 bg-background/50 border border-border/50 rounded-xl px-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Confirm Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={passwords.confirmPassword}
                                        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                        className="w-full h-11 bg-background/50 border border-border/50 rounded-xl px-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
                                    />
                                </div>
                            </div>
                            <div className="pt-2 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-6 py-2 bg-foreground text-background rounded-xl text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
                                >
                                    {isSaving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Lock className="h-3 w-3" />}
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
