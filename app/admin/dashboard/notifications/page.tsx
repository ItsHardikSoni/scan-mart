'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    Megaphone,
    Users,
    Send,
    Info,
    AlertTriangle,
    CheckCircle2,
    Search,
    Loader2,
    X
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getAllVendors, sendNotification } from '@/app/actions/admin';
import { toast } from 'sonner';

export default function AdminNotificationsPage() {
    const [vendors, setVendors] = useState<any[]>([]);
    const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'info' | 'warning' | 'success'>('info');

    useEffect(() => {
        const fetchVendors = async () => {
            const res = await getAllVendors();
            if (res.data) setVendors(res.data);
            setIsLoading(false);
        };
        fetchVendors();
    }, []);

    const filteredVendors = vendors.filter(v =>
        v.store_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.username?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleVendor = (id: string) => {
        setSelectedVendors(prev =>
            prev.includes(id)
                ? prev.filter(v => v !== id)
                : [...prev, id]
        );
    };

    const selectAll = () => {
        if (selectedVendors.length === vendors.length) {
            setSelectedVendors([]);
        } else {
            setSelectedVendors(vendors.map(v => v.id));
        }
    };

    const handleSend = async () => {
        if (!title || !message) {
            toast.error('Please fill in both title and message');
            return;
        }
        if (selectedVendors.length === 0) {
            toast.error('Please select at least one recipient');
            return;
        }

        setIsSending(true);
        try {
            const recipientIds = selectedVendors.length === vendors.length ? ['all'] : selectedVendors;
            const res = await sendNotification({
                recipientIds,
                title,
                message,
                type
            });

            if (res.success) {
                toast.success('Notification broadcasted successfully');
                setTitle('');
                setMessage('');
                setSelectedVendors([]);
            } else {
                toast.error(res.error || 'Failed to send notification');
            }
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto w-full space-y-8">
            {/* Header */}
            <div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 mb-2"
                >
                    <div className="p-2 bg-primary/10 rounded-xl text-primary">
                        <Megaphone className="h-6 w-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">Broadcast Center</h1>
                </motion.div>
                <p className="text-muted-foreground text-sm">Send important alerts, system updates, or direct messages to your vendor network.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sticky top-0">
                {/* Recipient Selection */}
                <Card className="lg:col-span-5 border-border/50 bg-card/50 backdrop-blur-xl p-6 rounded-3xl flex flex-col h-[650px] shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <h2 className="font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground">Recipients</h2>
                        </div>
                        <button
                            onClick={selectAll}
                            className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all border ${selectedVendors.length === vendors.length
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-primary/5 text-primary border-primary/20 hover:bg-primary/10'
                                }`}
                        >
                            {selectedVendors.length === vendors.length ? 'Deselect All' : 'Select All Vendors'}
                        </button>
                    </div>

                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by store or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-muted/30 border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                        {isLoading ? (
                            [...Array(8)].map((_, i) => (
                                <div key={i} className="h-14 bg-muted/20 animate-pulse rounded-2xl" />
                            ))
                        ) : filteredVendors.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                                <Search className="h-8 w-8 text-muted-foreground/30" />
                                <p className="text-xs text-muted-foreground">No vendors found matching your search.</p>
                            </div>
                        ) : filteredVendors.map((vendor) => (
                            <div
                                key={vendor.id}
                                onClick={() => toggleVendor(vendor.id)}
                                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${selectedVendors.includes(vendor.id)
                                    ? 'bg-primary/5 border-primary/30 text-primary'
                                    : 'bg-muted/10 border-transparent hover:bg-muted/20 hover:border-border text-muted-foreground'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold border ${selectedVendors.includes(vendor.id) ? 'bg-primary/20 border-primary/20' : 'bg-muted border-border'
                                        }`}>
                                        {vendor.store_name?.charAt(0) || vendor.username?.charAt(0)}
                                    </div>
                                    <div className="truncate max-w-[180px]">
                                        <p className={`text-sm font-bold truncate ${selectedVendors.includes(vendor.id) ? 'text-primary' : 'text-foreground'}`}>
                                            {vendor.store_name}
                                        </p>
                                        <p className="text-[10px] opacity-70 truncate">{vendor.email}</p>
                                    </div>
                                </div>
                                {selectedVendors.includes(vendor.id) && (
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                Selected: <span className="text-primary">{selectedVendors.length}</span> / {vendors.length}
                            </p>
                        </div>
                        {selectedVendors.length > 0 && (
                            <button
                                onClick={() => setSelectedVendors([])}
                                className="text-[10px] text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                            >
                                <X className="h-3 w-3" /> Clear selection
                            </button>
                        )}
                    </div>
                </Card>

                {/* Message Composer */}
                <Card className="lg:col-span-7 border-border/50 bg-card/50 backdrop-blur-xl p-8 rounded-3xl space-y-8 shadow-sm">
                    <div className="flex items-center gap-2">
                        <Send className="h-4 w-4 text-primary" />
                        <h2 className="font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground">Message Details</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] ml-1">Message Subject</label>
                            <input
                                type="text"
                                placeholder="E.g., Dashboard Performance Optimization Schedule"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-5 py-4 bg-muted/30 border border-border/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-semibold placeholder:font-normal"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] ml-1">Body Content</label>
                            <textarea
                                placeholder="Details about this notification..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={8}
                                className="w-full px-5 py-4 bg-muted/30 border border-border/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] ml-1">Message Type</label>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { id: 'info', icon: Info, label: 'Standard', color: 'blue' },
                                    { id: 'warning', icon: AlertTriangle, label: 'Warning', color: 'amber' },
                                    { id: 'success', icon: CheckCircle2, label: 'Success', color: 'emerald' }
                                ].map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => setType(p.id as any)}
                                        className={`flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-2xl border transition-all ${type === p.id
                                            ? `bg-primary/10 border-primary/50 text-foreground shadow-inner`
                                            : 'bg-muted/10 border-transparent text-muted-foreground hover:bg-muted/20 hover:border-border/50'
                                            }`}
                                    >
                                        <p.icon className={`h-5 w-5 ${type === p.id ? 'text-primary' : ''}`} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{p.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={handleSend}
                            disabled={isSending || selectedVendors.length === 0}
                            className={`w-full py-5 rounded-2xl font-bold text-sm tracking-[0.1em] uppercase transition-all flex items-center justify-center gap-3 shadow-xl ${isSending || selectedVendors.length === 0
                                ? 'bg-muted text-muted-foreground cursor-not-allowed shadow-none'
                                : 'bg-primary text-primary-foreground hover:scale-[1.01] active:scale-[0.99] shadow-primary/20'
                                }`}
                        >
                            {isSending ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    Send to {selectedVendors.length} Recipients
                                </>
                            )}
                        </button>
                    </div>

                    <div className="p-5 bg-muted/20 rounded-2xl border border-border/50">
                        <div className="flex gap-4">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Info className="h-4 w-4 text-primary" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-foreground">Global Reach</p>
                                <p className="text-[10px] text-muted-foreground leading-relaxed">
                                    Broadcasting notifications will trigger a real-time event for all selected vendors. They will receive an instant push update in their notification tray.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
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
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(var(--primary), 0.2);
                }
            ` }} />
        </div>
    );
}
