'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell,
    X,
    Info,
    AlertTriangle,
    CheckCircle2,
    Clock,
    Check
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getVendorNotifications, markNotificationAsRead } from '@/app/actions/vendor';

export default function NotificationBell({ vendorId }: { vendorId: string }) {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        const res = await getVendorNotifications();
        if (res.data) {
            setNotifications(res.data);
            setUnreadCount(res.data.filter((n: any) => !n.is_read).length);
        }
    };

    useEffect(() => {
        if (!vendorId) return;
        fetchNotifications();

        // Subscribe to real-time notifications
        const channel = supabase
            .channel(`vendor-notifications-${vendorId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'vendor_notifications'
                },
                (payload) => {
                    const newNotif = payload.new;
                    // Check if targeted to this vendor or broadcast (null)
                    if (newNotif.vendor_id === vendorId || newNotif.vendor_id === null) {
                        fetchNotifications();
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [vendorId]);

    const handleMarkAsRead = async (id: string) => {
        await markNotificationAsRead(id);
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, is_read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'warning': return { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' };
            case 'success': return { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
            default: return { icon: Info, color: 'text-blue-500', bg: 'bg-blue-500/10' };
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-muted-foreground hover:bg-muted/50 rounded-full transition-colors group"
            >
                <Bell className={`h-5 w-5 transition-transform group-active:scale-95 ${unreadCount > 0 ? 'animate-pulse' : ''}`} />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-destructive text-[10px] font-bold text-white flex items-center justify-center rounded-full ring-2 ring-background ring-offset-0">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40 bg-background/20 backdrop-blur-[2px]"
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-[350px] sm:w-[400px] bg-card/95 backdrop-blur-2xl border border-border shadow-2xl rounded-3xl overflow-hidden z-50 flex flex-col max-h-[600px] origin-top-right shadow-primary/5"
                        >
                            <div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/20">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-sm tracking-tight">Activity Feed</h3>
                                    {unreadCount > 0 && (
                                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full">
                                            {unreadCount} New
                                        </span>
                                    )}
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-muted rounded-full transition-colors">
                                    <X className="h-4 w-4 text-muted-foreground" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
                                {notifications.length === 0 ? (
                                    <div className="p-12 text-center flex flex-col items-center justify-center space-y-3 opacity-50">
                                        <Bell className="h-12 w-12 text-muted-foreground/30" />
                                        <p className="text-xs text-muted-foreground font-medium">All quiet here. No notifications yet.</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-border/30">
                                        {notifications.map((notif) => {
                                            const styles = getTypeStyles(notif.type);
                                            return (
                                                <motion.div
                                                    key={notif.id}
                                                    layout
                                                    className={`p-5 flex gap-4 hover:bg-muted/30 transition-colors group relative ${!notif.is_read ? 'bg-primary/5' : ''}`}
                                                >
                                                    <div className={`shrink-0 h-10 w-10 rounded-2xl ${styles.bg} flex items-center justify-center`}>
                                                        <styles.icon className={`h-5 w-5 ${styles.color}`} />
                                                    </div>

                                                    <div className="flex-1 min-w-0 space-y-1">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <h4 className={`text-sm font-bold truncate ${!notif.is_read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                                {notif.title}
                                                            </h4>
                                                            <div className="flex items-center gap-1.5 shrink-0 opacity-60">
                                                                <Clock className="h-3 w-3" />
                                                                <span className="text-[10px] font-medium whitespace-nowrap">
                                                                    {new Date(notif.created_at).toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <p className={`text-xs leading-relaxed ${!notif.is_read ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                                                            {notif.message}
                                                        </p>

                                                        {!notif.is_read && (
                                                            <button
                                                                onClick={() => handleMarkAsRead(notif.id)}
                                                                className="mt-2 text-[10px] font-bold text-primary flex items-center gap-1 hover:gap-1.5 transition-all"
                                                            >
                                                                <Check className="h-3 w-3" /> Mark as Read
                                                            </button>
                                                        )}
                                                    </div>

                                                    {!notif.is_read && (
                                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border-t border-border/50 text-center bg-muted/20">
                                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">End of Stream</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(var(--primary), 0.1);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}
