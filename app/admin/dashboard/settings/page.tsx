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
    Shield,
    Eye,
    EyeOff
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
    const [passwordErrors, setPasswordErrors] = useState<{ oldPassword?: string; confirmPassword?: string }>({});
    const [showPasswords, setShowPasswords] = useState({ oldPassword: false, newPassword: false, confirmPassword: false });
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    const toggleShow = (field: keyof typeof showPasswords) =>
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));

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
        const errors: { oldPassword?: string; confirmPassword?: string } = {};

        if (passwords.newPassword !== passwords.confirmPassword) {
            errors.confirmPassword = 'New password and confirm password do not match.';
        }

        if (Object.keys(errors).length > 0) {
            setPasswordErrors(errors);
            return;
        }

        setPasswordErrors({});
        setIsSaving(true);
        const res = await changeAdminPassword({
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword
        });
        if (res.success) {
            toast.success("Password changed successfully!");
            setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
            setPasswordErrors({});
            setShowPasswords({ oldPassword: false, newPassword: false, confirmPassword: false });
            setPasswordSuccess(true);
            setTimeout(() => setPasswordSuccess(false), 4000);
        } else {
            // Surface wrong-password error inline under the Current Password field
            const msg = res.error || 'Failed to change password';
            const isWrongPassword = msg.toLowerCase().includes('incorrect') ||
                msg.toLowerCase().includes('wrong') ||
                msg.toLowerCase().includes('invalid') ||
                msg.toLowerCase().includes('mismatch') ||
                msg.toLowerCase().includes('old password') ||
                msg.toLowerCase().includes('current password');
            if (isWrongPassword) {
                setPasswordErrors({ oldPassword: 'Current password is incorrect. Please try again.' });
            } else {
                toast.error(msg);
            }
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
                                <div className="relative">
                                    <input
                                        type={showPasswords.oldPassword ? 'text' : 'password'}
                                        required
                                        value={passwords.oldPassword}
                                        onChange={(e) => {
                                            setPasswords({ ...passwords, oldPassword: e.target.value });
                                            if (passwordErrors.oldPassword) setPasswordErrors(prev => ({ ...prev, oldPassword: undefined }));
                                        }}
                                        className={`w-full h-11 bg-background/50 border rounded-xl px-4 pr-10 text-xs font-medium focus:outline-none focus:ring-2 transition-all shadow-inner ${passwordErrors.oldPassword
                                            ? 'border-destructive/70 focus:ring-destructive/20 focus:border-destructive'
                                            : 'border-border/50 focus:ring-primary/20 focus:border-primary'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleShow('oldPassword')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPasswords.oldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {passwordErrors.oldPassword && (
                                    <p className="text-[11px] font-medium text-destructive ml-1 flex items-center gap-1">
                                        <span>⚠</span> {passwordErrors.oldPassword}
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">New Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPasswords.newPassword ? 'text' : 'password'}
                                            required
                                            value={passwords.newPassword}
                                            onChange={(e) => {
                                                setPasswords({ ...passwords, newPassword: e.target.value });
                                                if (passwordErrors.confirmPassword) setPasswordErrors(prev => ({ ...prev, confirmPassword: undefined }));
                                            }}
                                            className="w-full h-11 bg-background/50 border border-border/50 rounded-xl px-4 pr-10 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => toggleShow('newPassword')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                            tabIndex={-1}
                                        >
                                            {showPasswords.newPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPasswords.confirmPassword ? 'text' : 'password'}
                                            required
                                            value={passwords.confirmPassword}
                                            onChange={(e) => {
                                                setPasswords({ ...passwords, confirmPassword: e.target.value });
                                                if (passwordErrors.confirmPassword) setPasswordErrors(prev => ({ ...prev, confirmPassword: undefined }));
                                            }}
                                            className={`w-full h-11 bg-background/50 border rounded-xl px-4 pr-10 text-xs font-medium focus:outline-none focus:ring-2 transition-all shadow-inner ${passwordErrors.confirmPassword
                                                ? 'border-destructive/70 focus:ring-destructive/20 focus:border-destructive'
                                                : 'border-border/50 focus:ring-primary/20 focus:border-primary'
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => toggleShow('confirmPassword')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                            tabIndex={-1}
                                        >
                                            {showPasswords.confirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {passwordErrors.confirmPassword && (
                                        <p className="text-[11px] font-medium text-destructive ml-1 flex items-center gap-1">
                                            <span>⚠</span> {passwordErrors.confirmPassword}
                                        </p>
                                    )}
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
