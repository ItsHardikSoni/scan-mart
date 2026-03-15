"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Store, Mail, Lock, ArrowRight, Loader2, Sparkles, CheckCircle2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { setVendorSession } from "@/app/actions/auth"
import { checkVendorStatus } from "@/app/actions/vendor"

export default function VendorLoginPage() {
    const [isRegister, setIsRegister] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [storeName, setStoreName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            // 1. Check vendor status and verify password hash in DB
            const { data, error: statusError } = await checkVendorStatus(email, password);

            if (statusError) {
                setError(statusError);
                setIsLoading(false);
                return;
            }

            if (!data) {
                setError("Account not found. Please apply first.");
                setIsLoading(false);
                return;
            }

            // 2. If approved, set session
            const success = await setVendorSession(data);
            if (success) {
                router.push("/vendor/dashboard")
                router.refresh()
            } else {
                setError("Failed to create session")
            }
        } catch (err) {
            setError("System error. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[450px] z-10"
            >
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <Store className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                            ScanMart
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        {isRegister ? "Join as a Partner" : "Vendor Portal"}
                    </h1>
                    <p className="text-slate-500 mt-2">
                        {isRegister
                            ? "Start your journey to zero-queue shopping today."
                            : "Manage your store inventory and business analytics."}
                    </p>
                </div>

                <Card className="border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden bg-white/80 backdrop-blur-xl">
                    <CardContent className="p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-bold rounded-2xl">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <AnimatePresence mode="wait">
                                {isRegister && (
                                    <motion.div
                                        key="register-fields"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-2"
                                    >
                                        <label className="text-sm font-semibold text-slate-700 ml-1">Store Name</label>
                                        <div className="relative group">
                                            <Input
                                                required
                                                value={storeName}
                                                onChange={(e) => setStoreName(e.target.value)}
                                                className="pl-11 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                                                placeholder="ScanMart Supermarket"
                                            />
                                            <Store className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Work Email</label>
                                <div className="relative group">
                                    <Input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-11 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                                        placeholder="partner@store.com"
                                    />
                                    <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-sm font-semibold text-slate-700">Password</label>
                                    {!isRegister && (
                                        <Link href="#" className="text-xs font-semibold text-primary hover:underline">
                                            Forgot?
                                        </Link>
                                    )}
                                </div>
                                <div className="relative group">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-11 pr-11 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                                        placeholder="••••••••"
                                    />
                                    <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 rounded-xl text-md font-bold shadow-lg shadow-primary/20 mt-2 transition-all active:scale-[0.98]"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <span className="flex items-center gap-2">
                                        {isRegister ? "Launch Store" : "Secure Sign In"}
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                )}
                            </Button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                            <p className="text-sm text-slate-500 font-medium">
                                New to ScanMart?{" "}
                                <Link
                                    href="/vendor/apply"
                                    className="text-primary font-bold hover:underline"
                                >
                                    Apply Now
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {isRegister && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 flex flex-wrap justify-center gap-4"
                    >
                        {[
                            "Verified Store",
                            "Instant Approval",
                            "Admin Review Required"
                        ].map((text, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/50 px-3 py-1.5 rounded-full border border-slate-200/50">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                {text}
                            </div>
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </div>
    )
}
