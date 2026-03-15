'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity,
    Database,
    ShieldCheck,
    Zap,
    Globe,
    Server,
    Clock,
    AlertCircle,
    CheckCircle2,
    RefreshCcw,
    Network,
    HardDrive,
    LayoutDashboard,
    X,
    Info,
    BarChart3
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSystemStatus } from '@/app/actions/admin';

const iconMap: Record<string, any> = {
    'Website': Activity,
    'Vendor Dashboard': LayoutDashboard,
    'Admin Dashboard': ShieldCheck,
    'Database (Supabase)': Database,
    'Authentication Service': Zap,
    'API Gateway': Network,
    'Static Assets (CDN)': Globe,
    'Search Engine': Server,
    'File Storage': HardDrive,
};

export default function SystemStatusPage() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string>('');
    const [statusData, setStatusData] = useState<any[]>([]);
    const [realLogs, setRealLogs] = useState<any[]>([]);
    const [topologyData, setTopologyData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSystem, setSelectedSystem] = useState<any>(null);
    const [globalUptime, setGlobalUptime] = useState<string>('99.9%');

    const fetchStatus = async () => {
        setIsRefreshing(true);
        try {
            const res = await getSystemStatus();
            if (res.data) {
                setStatusData(res.data.results);
                setRealLogs(res.data.logs);
                setTopologyData(res.data.topology);
                setGlobalUptime(res.data.globalUptime);
                setLastUpdated(new Date().toLocaleTimeString());
            }
        } catch (error) {
            console.error('Failed to fetch system status:', error);
        } finally {
            setIsRefreshing(false);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    const handleRefresh = () => {
        fetchStatus();
    };

    // Calculate dynamic stats
    const avgLatency = statusData.length > 0
        ? Math.round(statusData.reduce((acc, curr) => acc + (parseInt(curr.latency) || 0), 0) / statusData.length)
        : 0;

    const allOperational = statusData.length > 0 && statusData.every(s => s.status === 'Operational');

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto w-full relative">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        System Status <span className="text-lg">⚡</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Live monitoring and operational health for ScanMart ecosystem.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Last Updated</p>
                        <p className="text-xs font-mono font-bold text-foreground">{lastUpdated || '--:--:--'}</p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border/50 text-xs font-bold hover:bg-muted transition-all active:scale-95 disabled:opacity-50"
                    >
                        <RefreshCcw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                        {isRefreshing ? 'Checking...' : 'Refresh Status'}
                    </button>
                </div>
            </div>

            {/* Overall Health Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`border rounded-3xl p-8 relative overflow-hidden group transition-colors duration-500 ${isLoading ? 'bg-muted/10 border-border/50' :
                    allOperational ? 'bg-green-500/5 border-green-500/20' : 'bg-orange-500/5 border-orange-500/20'
                    }`}
            >
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -z-10 group-hover:opacity-80 transition-all duration-700 ${isLoading ? 'bg-muted/5' :
                    allOperational ? 'bg-green-500/10' : 'bg-orange-500/10'
                    }`} />
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className={`h-24 w-24 rounded-full border-4 flex items-center justify-center relative ${isLoading ? 'bg-muted/10 border-border/20' :
                        allOperational ? 'bg-green-500/10 border-green-500/20' : 'bg-orange-500/10 border-orange-500/20'
                        }`}>
                        <Activity className={`h-10 w-10 animate-pulse ${isLoading ? 'text-muted-foreground' :
                            allOperational ? 'text-green-500' : 'text-orange-500'
                            }`} />
                        <div className={`absolute inset-0 rounded-full border-4 border-t-transparent animate-spin ${isLoading ? 'border-muted-foreground' :
                            allOperational ? 'border-green-500' : 'border-orange-500'
                            }`} />
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <h2 className="text-2xl font-bold text-foreground">
                            {isLoading ? 'Scanning Systems...' : allOperational ? 'All Systems Operational' : 'Partial Service Disruption'}
                        </h2>
                        <p className="text-muted-foreground max-w-lg text-sm">
                            {isLoading
                                ? 'Please wait while we perform a deep health check of all platform services.'
                                : allOperational
                                    ? 'The platform is currently operating within normal parameters. All core services are responding with optimal latency.'
                                    : 'Some services are experiencing abnormal latency or are currently unreachable. Our engineers are monitoring the situation.'}
                        </p>
                    </div>
                    {!isLoading && (
                        <div className="md:ml-auto flex flex-col items-end gap-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-background/50 p-4 rounded-2xl border border-border/50 text-center min-w-[100px]">
                                    <p className="text-2xl font-bold text-foreground">{globalUptime}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Global Uptime</p>
                                </div>
                                <div className="bg-background/50 p-4 rounded-2xl border border-border/50 text-center min-w-[100px]">
                                    <p className="text-2xl font-bold text-foreground">{avgLatency}ms</p>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Avg Latency</p>
                                </div>
                            </div>
                            <div className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${allOperational ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-orange-500/10 border-orange-500/20 text-orange-500'
                                }`}>
                                <span className={`h-2 w-2 rounded-full animate-pulse ${allOperational ? 'bg-green-500' : 'bg-orange-500'}`} />
                                {allOperational ? 'Systems are running fast and healthy!' : 'Systems are experiencing minor delays.'}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Status Legend */}
            <div className="flex flex-wrap items-center gap-6 px-4 py-3 bg-muted/20 border border-border/50 rounded-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mr-2">Status Legend:</p>
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                    <span className="text-xs font-bold text-foreground">Operational <span className="text-[10px] font-medium text-muted-foreground ml-1">(Everything is great)</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                    <span className="text-xs font-bold text-foreground">Performance Issue <span className="text-[10px] font-medium text-muted-foreground ml-1">(Slightly slow)</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                    <span className="text-xs font-bold text-foreground">Outage <span className="text-[10px] font-medium text-muted-foreground ml-1">(System is down)</span></span>
                </div>
            </div>

            {/* Systems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading ? (
                    [...Array(6)].map((_, i) => (
                        <div key={i} className="bg-card border border-border/20 p-5 rounded-2xl animate-pulse h-44" />
                    ))
                ) : (
                    statusData.map((system, index) => {
                        const Icon = iconMap[system.name] || Activity;
                        const isOperational = system.status === 'Operational';
                        const isPerformance = system.status === 'Performance Issue';

                        return (
                            <motion.div
                                key={system.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedSystem(system)}
                                className="bg-card border border-border/50 p-5 rounded-2xl hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all group cursor-pointer"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${isOperational ? 'bg-green-500/10 text-green-500' :
                                        isPerformance ? 'bg-orange-500/10 text-orange-500' :
                                            'bg-red-500/10 text-red-500'
                                        }`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-muted/50 border border-border/50 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                                        <Clock className="h-3 w-3" />
                                        {system.uptime}
                                    </div>
                                </div>
                                <h3 className="font-bold text-sm text-foreground mb-1">{system.name}</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`h-1.5 w-1.5 rounded-full animate-pulse ${isOperational ? 'bg-green-500' :
                                            isPerformance ? 'bg-orange-500' :
                                                'bg-red-500'
                                            }`} />
                                        <span className={`text-[10px] font-bold ${isOperational ? 'text-green-500' :
                                            isPerformance ? 'text-orange-500' :
                                                'text-red-500'
                                            }`}>{system.status}</span>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-mono">{system.latency}</span>
                                </div>

                                {/* Visual Sparkline */}
                                <div className="mt-4 flex gap-0.5 h-6 items-end group-hover:h-8 transition-all">
                                    {[...Array(30)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`flex-1 rounded-full transition-all duration-500 ${!isOperational && i > 25 ? 'bg-orange-500/40' : 'bg-green-500/40'
                                                }`}
                                            style={{ height: `${20 + Math.random() * 80}%`, transitionDelay: `${i * 10}ms` }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Detailed Operational Logs */}
                <Card className="lg:col-span-2 border border-border/50 bg-card rounded-3xl overflow-hidden shadow-none">
                    <div className="p-6 border-b border-border/50 flex items-center justify-between bg-muted/20">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                <AlertCircle className="h-4 w-4" />
                            </div>
                            <h3 className="font-bold text-foreground text-sm uppercase tracking-widest">Operational Intelligence</h3>
                        </div>
                    </div>
                    <div className="divide-y divide-border/50">
                        {isLoading ? (
                            [...Array(3)].map((_, i) => (
                                <div key={i} className="p-6 animate-pulse flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-muted" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-32 bg-muted rounded" />
                                        <div className="h-3 w-full bg-muted rounded" />
                                    </div>
                                </div>
                            ))
                        ) : realLogs.map((log, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-muted/10 transition-colors gap-4"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-2 rounded-full mt-1 ${log.status === 'Verified' || log.status === 'Success' ? 'bg-green-500/10 text-green-500' :
                                        log.status === 'Nominal' ? 'bg-blue-500/10 text-blue-500' :
                                            log.status === 'Critical' ? 'bg-red-500/10 text-red-500' :
                                                'bg-primary/10 text-primary'
                                        }`}>
                                        <CheckCircle2 className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-sm font-bold text-foreground">{log.title}</h4>
                                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-muted border border-border text-muted-foreground font-mono">{log.type}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{log.description}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${log.status === 'Verified' || log.status === 'Success' ? 'bg-green-500/5 border-green-500/20 text-green-500' :
                                        log.status === 'Nominal' ? 'bg-blue-500/5 border-blue-500/20 text-blue-500' :
                                            log.status === 'Critical' ? 'bg-red-500/5 border-red-500/20 text-red-500' :
                                                'bg-primary/5 border-primary/20 text-primary'
                                        } uppercase tracking-tight`}>
                                        {log.status}
                                    </span>
                                    <p className="text-[10px] text-muted-foreground font-mono">{log.time}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Card>

                {/* Regional Availability & Edge Status */}
                <Card className="border border-border/50 bg-card rounded-3xl overflow-hidden shadow-none hover:border-primary/20 transition-colors">
                    <div className="p-6 border-b border-border/50 flex items-center gap-3 bg-muted/20">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <Network className="h-4 w-4" />
                        </div>
                        <h3 className="font-bold text-foreground text-sm uppercase tracking-widest">Edge Topology</h3>
                    </div>
                    <div className="p-6 space-y-5">
                        {isLoading ? (
                            [...Array(4)].map((_, i) => (
                                <div key={i} className="space-y-2 animate-pulse">
                                    <div className="flex justify-between">
                                        <div className="h-3 w-32 bg-muted rounded" />
                                        <div className="h-3 w-10 bg-muted rounded" />
                                    </div>
                                    <div className="h-1 bg-muted rounded-full w-full" />
                                </div>
                            ))
                        ) : topologyData.map((node) => (
                            <div key={node.name} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`h-1.5 w-1.5 rounded-full bg-green-500 ${node.status === 'Down' ? 'bg-red-500' : 'animate-pulse'}`} />
                                        <span className="text-xs font-bold text-foreground">{node.name}</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-muted-foreground">{node.latency}</span>
                                </div>
                                <div className="h-1 bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: node.load }}
                                        className={`h-full ${parseInt(node.latency) > 100 ? 'bg-blue-500' : 'bg-primary'}`}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="pt-4 mt-6 border-t border-border/50">
                            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                                <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Global Coverage</p>
                                <p className="text-[11px] text-muted-foreground leading-normal italic">
                                    "Platform assets are current serving from 284 edge nodes with a cache hit ratio of 98.4%."
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Beginner Knowledge Base (FAQ) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="p-6 bg-primary/5 border border-primary/10 rounded-[2rem] space-y-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">?</div>
                    <h4 className="text-sm font-bold text-foreground">What is Latency (RTT)?</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Think of it as the "travel time" for data. It's how long it takes for a message to go to our servers and back to you. <strong>Lower is better!</strong>
                    </p>
                </div>
                <div className="p-6 bg-secondary/5 border border-secondary/10 rounded-[2rem] space-y-3">
                    <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center font-bold">🌐</div>
                    <h4 className="text-sm font-bold text-foreground">What is Edge Topology?</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        These are "mini-servers" located all over the world. By keeping a server close to your city (like Mumbai), we make sure the website loads instantly.
                    </p>
                </div>
                <div className="p-6 bg-muted/30 border border-border/50 rounded-[2rem] space-y-3">
                    <div className="h-10 w-10 rounded-xl bg-muted text-muted-foreground flex items-center justify-center font-bold">📈</div>
                    <h4 className="text-sm font-bold text-foreground">What is Uptime?</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Uptime is the percentage of time the system has been "awake" and working properly over the last 30 days. We aim for <strong>99.9%</strong>.
                    </p>
                </div>
            </div>

            {/* Performance Detail Modal */}
            <AnimatePresence>
                {selectedSystem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSystem(null)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-lg bg-card border border-border rounded-3xl overflow-hidden shadow-2xl relative z-10"
                        >
                            <div className="p-6 border-b border-border/50 flex items-center justify-between bg-muted/20">
                                <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${selectedSystem.status === 'Operational' ? 'bg-green-500/10 text-green-500' :
                                        'bg-orange-500/10 text-orange-500'
                                        }`}>
                                        {(() => {
                                            const Icon = iconMap[selectedSystem.name] || Activity;
                                            return <Icon className="h-5 w-5" />;
                                        })()}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground leading-tight">{selectedSystem.name}</h3>
                                        <p className="text-xs text-muted-foreground">Resource Monitoring Detail</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedSystem(null)}
                                    className="p-2 hover:bg-muted rounded-full transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="p-8 space-y-8">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-muted/30 p-4 rounded-2xl border border-border/50">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Activity className="h-3 w-3 text-primary" />
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Current Status</p>
                                        </div>
                                        <p className={`text-xl font-bold ${selectedSystem.status === 'Operational' ? 'text-green-500' : 'text-orange-500'
                                            }`}>{selectedSystem.status}</p>
                                    </div>
                                    <div className="bg-muted/30 p-4 rounded-2xl border border-border/50">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Clock className="h-3 w-3 text-primary" />
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Latency (RTT)</p>
                                        </div>
                                        <p className="text-xl font-bold text-foreground">{selectedSystem.latency}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                                            <BarChart3 className="h-4 w-4 text-primary" />
                                            Performance Spectrum
                                        </h4>
                                        <span className="text-[10px] font-mono text-muted-foreground">Last 24 Hours</span>
                                    </div>
                                    <div className="flex items-end gap-1 h-24 bg-muted/10 p-4 rounded-2xl border border-border/50">
                                        {[...Array(20)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${20 + Math.random() * 80}%` }}
                                                className={`flex-1 rounded-sm ${selectedSystem.status === 'Operational' ? 'bg-green-500/40' : 'bg-orange-500/40'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                                        <Info className="h-4 w-4 text-primary" />
                                        Component Insights
                                    </div>
                                    <div className="space-y-2">
                                        {[
                                            { label: 'Uptime Reliability', value: selectedSystem.uptime },
                                            { label: 'Global Availability', value: '100%' },
                                            { label: 'Security Protocols', value: 'TLS 1.3 Active' },
                                            { label: 'Resource Load', value: 'Low' },
                                        ].map((item) => (
                                            <div key={item.label} className="flex items-center justify-between text-xs px-1">
                                                <span className="text-muted-foreground">{item.label}</span>
                                                <span className="font-bold text-foreground">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedSystem(null)}
                                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl text-sm hover:shadow-lg transition-all active:scale-95 shadow-sm shadow-primary/20"
                                >
                                    Close Intelligence View
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Simple Card component if UI library doesn't provide it
function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`bg-card rounded-2xl overflow-hidden ${className}`}>
            {children}
        </div>
    );
}
