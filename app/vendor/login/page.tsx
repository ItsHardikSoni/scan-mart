"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Store, Mail, Lock, ArrowRight, Loader2, Sparkles, CheckCircle2, Eye, EyeOff, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { setVendorSession } from "@/app/actions/auth"
import { checkVendorStatus, sendVendorPasswordResetOtp, verifyVendorPasswordResetOtp, resetVendorPassword } from "@/app/actions/vendor"
import { toast } from "sonner"

export default function VendorLoginPage() {
    const [isRegister, setIsRegister] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [storeName, setStoreName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isForgotMode, setIsForgotMode] = useState(false)
    const [resetOtp, setResetOtp] = useState("")
    const [isSendingResetOtp, setIsSendingResetOtp] = useState(false)
    const [isVerifyingResetOtp, setIsVerifyingResetOtp] = useState(false)
    const [isResetOtpVerified, setIsResetOtpVerified] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [resetCooldown, setResetCooldown] = useState(0)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isResettingPassword, setIsResettingPassword] = useState(false)
    const [resetExpiry, setResetExpiry] = useState(0)
    const [hasRequestedResetOtp, setHasRequestedResetOtp] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (resetCooldown <= 0 && resetExpiry <= 0) return
        const id = setInterval(() => {
            setResetCooldown(prev => (prev > 0 ? prev - 1 : 0))
            setResetExpiry(prev => (prev > 0 ? prev - 1 : 0))
        }, 1000)
        return () => clearInterval(id)
    }, [resetCooldown, resetExpiry])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        if (isForgotMode) {
            setIsLoading(false)
            return
        }

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

    const handleSendResetOtp = async () => {
        setError("")
        if (!email) {
            setError("Please enter your email first.")
            return
        }
        try {
            setIsSendingResetOtp(true)
            const res = await sendVendorPasswordResetOtp(email)
            if ("error" in res && res.error) {
                setError(res.error)
                toast.error(res.error)
            } else {
                setResetCooldown(60)
                setResetExpiry(600) // 10 minutes
                setHasRequestedResetOtp(true)
                setIsResetOtpVerified(false)
                setError("")
            }
        } finally {
            setIsSendingResetOtp(false)
        }
    }

    const handleVerifyResetOtp = async () => {
        setError("")
        if (!email || !resetOtp) {
            setError("Please enter the OTP sent to your email.")
            return
        }
        try {
            setIsVerifyingResetOtp(true)
            const res = await verifyVendorPasswordResetOtp(email, resetOtp)
            if ("error" in res && res.error) {
                setIsResetOtpVerified(false)
                setError(res.error)
            } else {
                setIsResetOtpVerified(true)
                setResetExpiry(0)
                setError("")
            }
        } finally {
            setIsVerifyingResetOtp(false)
        }
    }

    const handleResetPassword = async () => {
        setError("")
        if (!isResetOtpVerified) {
            setError("Please verify OTP first.")
            return
        }
        if (!newPassword || newPassword.length < 6) {
            setError("New password must be at least 6 characters.")
            return
        }
        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.")
            return
        }
        try {
            setIsResettingPassword(true)
            const res = await resetVendorPassword(email, newPassword)
            if ("error" in res && res.error) {
                setError(res.error)
            } else {
                setError("")
                setIsForgotMode(false)
                setIsResetOtpVerified(false)
                setResetOtp("")
                setNewPassword("")
                setConfirmPassword("")
            }
        } finally {
            setIsResettingPassword(false)
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
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 to-slate-700">
                            ScanMart
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        {isForgotMode ? "Reset Password" : isRegister ? "Join as a Partner" : "Vendor Portal"}
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

                            {!isForgotMode && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between ml-1">
                                        <label className="text-sm font-semibold text-slate-700">Password</label>
                                        {!isRegister && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsForgotMode(true)
                                                    setError("")
                                                    setResetOtp("")
                                                    setNewPassword("")
                                                    setConfirmPassword("")
                                                    setIsResetOtpVerified(false)
                                                }}
                                                className="text-xs font-semibold text-primary hover:underline"
                                            >
                                                Forgot?
                                            </button>
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
                            )}

                            {isForgotMode && (
                                <>
                                    {!isResetOtpVerified && (
                                        <>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 ml-1">Reset via OTP</label>
                                                <div className="flex gap-2">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={handleSendResetOtp}
                                                        disabled={isSendingResetOtp || !email || resetCooldown > 0}
                                                        className="flex-1 h-10 text-xs font-bold"
                                                    >
                                                        {isSendingResetOtp ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : resetCooldown > 0 ? (
                                                            `Resend in ${resetCooldown}s`
                                                        ) : (
                                                            "Send OTP"
                                                        )}
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setIsForgotMode(false)
                                                            setError("")
                                                        }}
                                                        className="h-10 text-xs font-semibold"
                                                    >
                                                        Back
                                                    </Button>
                                                </div>
                                                {resetExpiry > 0 && (
                                                    <p className="text-[10px] font-bold text-primary/80 mt-1 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        Code expires in {Math.floor(resetExpiry / 60)}:{(resetExpiry % 60).toString().padStart(2, '0')}
                                                    </p>
                                                )}
                                                {resetExpiry === 0 && hasRequestedResetOtp && !isResetOtpVerified && (
                                                    <p className="text-[10px] font-bold text-destructive mt-1 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        OTP has expired. Please resend.
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 ml-1">Enter OTP</label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        type="text"
                                                        inputMode="numeric"
                                                        maxLength={6}
                                                        value={resetOtp}
                                                        onChange={(e) => setResetOtp(e.target.value.replace(/\D/g, ""))}
                                                        className="h-11"
                                                        placeholder="6-digit code"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={handleVerifyResetOtp}
                                                        disabled={isVerifyingResetOtp || !resetOtp}
                                                        className="h-11 text-xs font-semibold"
                                                    >
                                                        {isVerifyingResetOtp ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify OTP"}
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {isResetOtpVerified && (
                                        <>
                                            <div className="mb-3 flex items-center gap-2 text-emerald-600">
                                                <CheckCircle2 className="w-5 h-5" />
                                                <span className="font-semibold">Verified</span>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 ml-1">New Password</label>
                                                <div className="relative">
                                                    <Input
                                                        type={showNewPassword ? "text" : "password"}
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        className="h-11 pr-10"
                                                        placeholder="Enter new password"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                                    >
                                                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 ml-1">Confirm Password</label>
                                                <div className="relative">
                                                    <Input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        className="h-11 pr-10"
                                                        placeholder="Confirm new password"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                                    >
                                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                    </button>
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                onClick={handleResetPassword}
                                                disabled={isResettingPassword}
                                                className="w-full h-11 rounded-xl text-sm font-bold mt-2"
                                            >
                                                {isResettingPassword ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reset Password"}
                                            </Button>
                                        </>
                                    )}
                                </>
                            )}

                            {!isForgotMode && (
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
                            )}
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
