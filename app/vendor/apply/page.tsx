'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, User, Mail, Lock, Phone, MapPin, Building2, Globe, Send, Loader2, CheckCircle2, ChevronRight, LayoutDashboard, Clock, Eye, EyeOff } from 'lucide-react';
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { registerVendor } from '@/app/actions/vendor';
import { toast } from 'sonner';

export default function VendorApplyPage() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        username: '',
        store_name: '',
        email: '',
        password: '',
        phone_number: '',
        gst_number: '',
        store_address: '',
        state: '',
        district: '',
        pincode: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear field error when user starts typing again
        if (fieldErrors[e.target.name]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[e.target.name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setFieldErrors({});

        const result = await registerVendor(formData);

        if (result.success) {
            setIsSubmitted(true);
            toast.success('Application submitted successfully!');
        } else if (result.errors) {
            setFieldErrors(result.errors);
            toast.error('Please correct the highlighted errors');
            setIsLoading(false);
        } else {
            toast.error(result.error || 'Failed to submit application');
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-slate-100 text-center space-y-6"
                >
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-10 h-10 animate-pulse" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Application Pending</h1>
                    <p className="text-slate-500 leading-relaxed">
                        Thank you for your interest in ScanMart! Your application for <strong>{formData.store_name}</strong> has been received.
                    </p>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                        <div className="flex items-center gap-3 text-left">
                            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            </div>
                            <span className="text-sm font-bold text-slate-700">Information Received</span>
                        </div>
                        <div className="flex items-center gap-3 text-left">
                            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                                <Loader2 className="w-4 h-4 text-primary animate-spin" />
                            </div>
                            <span className="text-sm font-bold text-slate-700">Verification in Progress</span>
                        </div>
                    </div>
                    <p className="text-xs text-slate-400">
                        Our admin team will review your GST and store details. You will receive an email once approved.
                    </p>
                    <Link href="/vendor/login">
                        <button className="w-full h-12 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                            Back to Login
                        </button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[100px]" />

            <div className="w-full max-w-2xl z-10">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <Store className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                            ScanMart <span className="text-primary font-medium tracking-tight ml-1 text-sm">Partner</span>
                        </span>
                    </Link>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Become a Vendor</h1>
                    <p className="text-slate-500 mt-3 font-medium">Join our ecosystem of zero-queue smart stores.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[2.5rem] shadow-2xl p-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Account Info */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                                <User className="w-3 h-3" />
                                Account Details
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 ml-1">Username</label>
                                    <Input required name="username" value={formData.username} onChange={handleChange} placeholder="unique_handle" className={`rounded-xl bg-slate-50/50 ${fieldErrors.username ? 'border-red-500 ring-red-500' : ''}`} />
                                    {fieldErrors.username && <p className="text-[10px] font-bold text-red-500 ml-1">{fieldErrors.username}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 ml-1">Email</label>
                                    <Input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="owner@store.com" className={`rounded-xl bg-slate-50/50 ${fieldErrors.email ? 'border-red-500 ring-red-500' : ''}`} />
                                    {fieldErrors.email && <p className="text-[10px] font-bold text-red-500 ml-1">{fieldErrors.email}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 ml-1">Password</label>
                                    <div className="relative group">
                                        <Input
                                            required
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="rounded-xl bg-slate-50/50 pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Store Info */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                                <Building2 className="w-3 h-3" />
                                Store Metadata
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 ml-1">Store Name</label>
                                    <Input required name="store_name" value={formData.store_name} onChange={handleChange} placeholder="City Mart" className="rounded-xl bg-slate-50/50" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 ml-1">Mobile Number</label>
                                    <Input required name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className={`rounded-xl bg-slate-50/50 ${fieldErrors.phone_number ? 'border-red-500 ring-red-500' : ''}`} />
                                    {fieldErrors.phone_number && <p className="text-[10px] font-bold text-red-500 ml-1">{fieldErrors.phone_number}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 ml-1">GST Number <span className="text-[10px] text-slate-400">(Optional)</span></label>
                                    <Input name="gst_number" value={formData.gst_number} onChange={handleChange} placeholder="22AAAAA0000A1Z5" className="rounded-xl bg-slate-50/50 uppercase" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* Address Info */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            Location Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 ml-1">Store Address</label>
                                <textarea
                                    required
                                    name="store_address"
                                    value={formData.store_address}
                                    onChange={handleChange}
                                    rows={2}
                                    placeholder="Enter full address..."
                                    className="w-full rounded-xl bg-slate-50/50 border border-input p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 ml-1">State</label>
                                <Input required name="state" value={formData.state} onChange={handleChange} placeholder="Gujarat" className="rounded-xl bg-slate-50/50" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 ml-1">District</label>
                                    <Input required name="district" value={formData.district} onChange={handleChange} placeholder="Ahmadabad" className="rounded-xl bg-slate-50/50" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-700 ml-1">Pincode</label>
                                    <Input required name="pincode" value={formData.pincode} onChange={handleChange} placeholder="380001" className="rounded-xl bg-slate-50/50" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-14 bg-primary text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <>
                                <span>Apply for Approval</span>
                                <Send className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    <p className="text-center text-xs text-slate-400 font-medium">
                        By applying, you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Vendor Agreement</Link>.
                    </p>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm font-bold text-slate-600">
                        Already have an approved store? <Link href="/vendor/login" className="text-primary hover:underline">Log in here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
