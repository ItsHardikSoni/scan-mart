'use client';

import { motion } from 'framer-motion';
import {
    User,
    Shield,
    Bell,
    Mail,
    Lock,
    Globe,
    Monitor,
    Save,
    Settings as SettingsIcon,
    ChevronRight,
    HelpCircle
} from 'lucide-react';

export default function AdminSettingsPage() {
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
                        System Configuration <span className="text-lg">⚙️</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage global platform preferences and security controls.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="h-10 px-6 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 flex items-center gap-2">
                        <Save className="h-4 w-4" />
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
                            { name: 'Ecosystem Logs', icon: Monitor },
                            { name: 'Global Appearance', icon: Globe },
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

                    <div className="bg-primary/5 border border-primary/10 rounded-3xl p-6 text-center space-y-3 group">
                        <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                            <HelpCircle className="h-6 w-6 text-primary" />
                        </div>
                        <h4 className="text-xs font-bold text-foreground">Need technical support?</h4>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">Check the documentation or reach out to the platform developers.</p>
                        <button className="text-[10px] font-extrabold text-primary uppercase tracking-[0.2em] hover:underline">
                            Open Docs
                        </button>
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
                            <div className="h-20 w-20 rounded-[1.5rem] bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl border border-primary/20 shadow-inner">
                                DA
                            </div>
                            <div className="space-y-2">
                                <button className="h-9 px-4 bg-primary text-primary-foreground rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                                    Change Avatar
                                </button>
                                <p className="text-[10px] text-muted-foreground px-1">JPG, PNG or WEBP. Max size 2MB.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue="DeepMind Admin"
                                    className="w-full h-11 bg-background/50 border border-border/50 rounded-xl px-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue="admin@scanmart.com"
                                    className="w-full h-11 bg-background/50 border border-border/50 rounded-xl px-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Platform Config Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-card border border-border/50 rounded-[2rem] p-8 shadow-sm space-y-8"
                    >
                        <div>
                            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                                Platform Controls
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-lg">Demo</span>
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">Configure global store behavior and scanning limits.</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { title: 'Multi-Vendor Integration', desc: 'Allow vendors to list products in shared regions.', enabled: true },
                                { title: 'Real-time Telemetry', desc: 'Sync POS data every 30 seconds across all nodes.', enabled: true },
                                { title: 'Public Store Discovery', desc: 'Show verified stores on the global consumer map.', enabled: false },
                            ].map((config, idx) => (
                                <div key={config.title} className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-border/50 group transition-all hover:bg-muted/30">
                                    <div className="space-y-1">
                                        <p className="text-xs font-extrabold text-foreground tracking-tight">{config.title}</p>
                                        <p className="text-[10px] text-muted-foreground">{config.desc}</p>
                                    </div>
                                    <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors p-1 ${config.enabled ? 'bg-primary' : 'bg-muted'}`}>
                                        <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${config.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
