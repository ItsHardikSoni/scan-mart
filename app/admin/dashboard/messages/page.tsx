'use client';

import { useState } from 'react';
import {
    MessageSquare,
    Search,
    Mail,
    Calendar,
    Trash2,
    Inbox,
    ArrowUpRight,
    Star,
    Reply,
    Filter,
    Clock,
    Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// REVERTED: Mock messages for admin dashboard
const mockMessagesData = [
    { id: '1', name: 'Rohan Verma', email: 'rohan@example.com', message: 'I am interested in partnering with ScanMart for my grocery store chain. Please send more details regarding the SDK integration and hardware requirements for scanning terminals.', created_at: new Date().toISOString(), category: 'Partnership', priority: 'High' },
    { id: '2', name: 'Sara Khan', email: 'sara.k@gmail.com', message: 'The app experience is absolutely wonderful! However, I noticed a minor calibration bug in the scanning process at Sector 18 store. It sometimes requires double scans for glossy packaging.', created_at: new Date().toISOString(), category: 'Support', priority: 'Medium' },
    { id: '3', name: 'Hardik Soni', email: 'hardik@design.com', message: 'I love the new layout! Can you add dark mode support to the vendor dashboard as well? It would be much easier for night-shift inventory managers.', created_at: new Date().toISOString(), category: 'Feedback', priority: 'Low' },
];

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState(mockMessagesData);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto w-full">
            {/* Header section - Aligned with the new Overview style */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border/50 p-6 rounded-3xl shadow-sm relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        Inquiry Center <span className="text-lg">💬</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Read and respond to inquiries from potential customers and vendors.</p>
                </div>
                <div className="flex items-center gap-3 bg-background/50 p-3 rounded-2xl border border-border/50 shrink-0">
                    <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Inbox className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-foreground">Pending Action</p>
                        <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                            {messages.length} New Messages
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Premium Search Bar */}
            <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by sender, email or content..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex h-9 w-full rounded-xl border border-input bg-background/50 pl-9 pr-4 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-all font-medium"
                    />
                </div>

                <button className="h-9 px-4 bg-background border border-border/50 rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground hover:border-border transition-all flex items-center gap-2">
                    <Filter className="h-3 w-3" />
                    Sort by Recent
                </button>
            </div>

            {/* Messages Feed */}
            <div className="grid grid-cols-1 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredMessages.map((msg, idx) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ delay: idx * 0.1 }}
                            key={msg.id}
                            className="bg-card border border-border/50 rounded-[2.5rem] p-8 shadow-sm hover:shadow-md transition-all relative group"
                        >
                            <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 relative z-10">
                                <div className="space-y-6 flex-1">
                                    <div className="flex flex-wrap items-center gap-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20 shadow-inner group-hover:scale-105 transition-transform">
                                                {msg.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-foreground text-lg tracking-tight group-hover:text-primary transition-colors">{msg.name}</h3>
                                                <p className="text-xs text-muted-foreground font-medium">{msg.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="flex items-center gap-1.5 px-3 py-1 bg-muted/50 rounded-full text-[10px] font-bold text-muted-foreground border border-border/50 uppercase tracking-widest leading-none">
                                                <Tag className="h-3 w-3" />
                                                {msg.category}
                                            </span>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border ${msg.priority === 'High' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                                                    msg.priority === 'Medium' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                                        'bg-green-500/10 text-green-500 border-green-500/20'
                                                }`}>
                                                {msg.priority} Priority
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-muted/30 p-6 rounded-3xl border border-border/50 text-base text-foreground leading-relaxed whitespace-pre-wrap font-medium shadow-inner italic relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
                                        "{msg.message}"
                                    </div>

                                    <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                                        <Calendar className="h-3 w-3" />
                                        Received: {new Date(msg.created_at).toLocaleString()}
                                    </div>
                                </div>

                                <div className="flex sm:flex-row lg:flex-col gap-3 shrink-0">
                                    <a href={`mailto:${msg.email}`} className="flex-1 inline-flex items-center justify-center gap-2 px-6 h-11 rounded-2xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95">
                                        <Reply className="h-4 w-4" />
                                        Email Reply
                                    </a>
                                    <button
                                        onClick={() => setMessages(prev => prev.filter(m => m.id !== msg.id))}
                                        className="inline-flex items-center justify-center gap-2 px-6 h-11 rounded-2xl bg-background border border-border/50 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/20 text-xs font-bold transition-all active:scale-95"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Archive
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredMessages.length === 0 && (
                    <div className="py-40 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="h-24 w-24 bg-muted/50 rounded-full flex items-center justify-center border-2 border-dashed border-border/50">
                            <Inbox className="h-12 w-12 text-muted-foreground opacity-20" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-foreground">All caught up!</h3>
                            <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-1">
                                No messages currently need attention. Your response rate is $100\%$.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
