'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Search, Edit2, Trash2, PackageOpen, Filter, X, Loader2, Barcode, CheckCircle2, AlertCircle, RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { getVendorInfo } from '@/app/actions/vendor';

// Initial state for new product
const initialProductState = {
    barcode: '',
    product_name: '',
    brand: '',
    quantity: '',
    category: '',
    price: '',
    stock: '',
    status: 'Active'
};

export default function VendorProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingBarcode, setIsCheckingBarcode] = useState(false);
    const [formData, setFormData] = useState(initialProductState);
    const [inventory, setInventory] = useState<any[]>([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

    // Fetch local inventory on mount
    const fetchInventory = async (isManual = false) => {
        if (isManual) setIsRefreshing(true);
        try {
            const res = await fetch('/api/v0/products');
            if (res.ok) {
                const data = await res.json();
                setInventory(data);
            }
        } catch (err) {
            console.error('Failed to fetch inventory', err);
        } finally {
            setIsInitialLoading(false);
            if (isManual) setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchInventory();

        // Real-time synchronization
        let channel: any;

        const setupRealtime = async () => {
            const { data: vendor } = await getVendorInfo();
            if (!vendor || !vendor.username) return;

            channel = supabase
                .channel(`inventory_changes_${vendor.username}`)
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'vendor_inventory',
                        filter: `vendor_id=eq.${vendor.username}`
                    },
                    () => {
                        console.log('Inventory change detected, refreshing...');
                        fetchInventory();
                    }
                )
                .subscribe();
        };

        setupRealtime();

        return () => {
            if (channel) supabase.removeChannel(channel);
        };
    }, []);

    // Handle barcode lookup
    const handleBarcodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const barcode = e.target.value;
        setFormData(prev => ({ ...prev, barcode }));

        if (barcode.length >= 8) { // Typical barcode length
            setIsCheckingBarcode(true);
            try {
                const res = await fetch(`/api/v0/products/${barcode}.json`);
                if (res.ok) {
                    const data = await res.json();
                    setFormData(prev => ({
                        ...prev,
                        product_name: data.product_name || prev.product_name,
                        brand: data.brand || prev.brand,
                        quantity: data.quantity || prev.quantity,
                        category: data.category || prev.category,
                        price: data.price !== undefined ? data.price.toString() : prev.price,
                        stock: data.stock !== undefined ? data.stock.toString() : prev.stock,
                    }));

                    if (data.source === 'local') {
                        toast.success('Product found in your inventory', {
                            icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
                        });
                    } else {
                        toast.info('Product details found in global API', {
                            icon: <PackageOpen className="h-4 w-4 text-blue-500" />
                        });
                    }
                }
            } catch (err) {
                console.error('Barcode lookup failed', err);
            } finally {
                setIsCheckingBarcode(false);
            }
        }
    };

    const handleEditProduct = (item: any) => {
        setFormData({
            barcode: item.barcode,
            product_name: item.product_name,
            brand: item.brand,
            quantity: item.quantity,
            category: item.category,
            price: item.price.toString(),
            stock: item.stock.toString(),
            status: item.status
        });
        setModalMode('edit');
        setIsAddModalOpen(true);
    };

    const handleSaveProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(`/api/v0/products/${formData.barcode}.json`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock)
                })
            });

            if (res.ok) {
                setFormData(initialProductState);
                fetchInventory(); // Refresh after save
                setIsAddModalOpen(false);
                // In a real app, we'd refetch inventory here
            } else {
                const error = await res.json();
                toast.error('Failed to save product', { description: error.error });
            }
        } catch (err) {
            toast.error('System error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteProduct = async (barcode: string) => {
        if (!confirm('Are you sure you want to remove this product from your inventory?')) return;

        try {
            const res = await fetch(`/api/v0/products/${barcode}.json`, {
                method: 'DELETE'
            });

            if (res.ok) {
                toast.success('Product removed from inventory');
                fetchInventory();
            } else {
                toast.error('Failed to remove product');
            }
        } catch (err) {
            toast.error('System error');
        }
    };

    // Filter local inventory display
    const filteredInventory = inventory.filter(item =>
        item.product_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.barcode?.includes(searchQuery) ||
        item.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 max-w-7xl mx-auto w-full space-y-8">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <PackageOpen className="h-5 w-5 text-primary" />
                        Inventory
                    </h1>
                    <p className="text-muted-foreground mt-1 text-xs">Manage your store products and stock levels.</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                        onClick={() => fetchInventory(true)}
                        disabled={isRefreshing}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border text-foreground hover:bg-muted/50 h-9 px-3 py-1.5 gap-2 flex-1 sm:flex-none"
                    >
                        <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                    <button
                        onClick={() => {
                            setFormData(initialProductState);
                            setModalMode('add');
                            setIsAddModalOpen(true);
                        }}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 h-9 px-3 py-1.5 gap-2 flex-1 sm:flex-none"
                    >
                        <Plus className="h-3 w-3" />
                        New Product
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by name, brand, or barcode..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex h-9 w-full rounded-xl border border-input bg-background/50 pl-9 pr-4 py-1.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-medium h-9 px-3 py-1.5 gap-2 border border-border text-foreground hover:bg-muted/50 transition-colors">
                        <Filter className="h-3 w-3" />
                        Category
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {isInitialLoading ? (
                <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden flex flex-col items-center justify-center p-24 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary opacity-50" />
                    <p className="mt-4 text-sm text-muted-foreground">Loading your inventory...</p>
                </div>
            ) : inventory.length === 0 ? (
                <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                    <PackageOpen className="h-12 w-12 opacity-20 mb-4" />
                    <h3 className="text-lg font-semibold text-foreground">No inventory data yet</h3>
                    <p className="max-w-xs mx-auto mt-2 text-sm">Add products using their barcode to start managing your store inventory.</p>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="mt-6 text-primary font-bold hover:underline inline-flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Add your first product
                    </button>
                </div>
            ) : (
                <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden border-collapse">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-muted/50 text-muted-foreground border-b border-border/50 font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Product Info</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Stock</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50 text-foreground">
                                {filteredInventory.map((item, index) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        key={item.barcode}
                                        className="hover:bg-muted/30 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                                    <PackageOpen className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">{item.product_name}</p>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">{item.brand}</span>
                                                        <span className="h-1 w-1 rounded-full bg-border" />
                                                        <span className="text-[10px] text-muted-foreground">{item.quantity}</span>
                                                        <span className="text-[10px] text-primary/50 font-mono ml-1">#{item.barcode}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-secondary/30 text-secondary-foreground border border-secondary/20">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-sm">₹{item.price}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className={`font-bold ${item.stock < 10 ? 'text-orange-500' : ''}`}>
                                                    {item.stock} <span className="font-normal text-[10px] text-muted-foreground ml-0.5">units</span>
                                                </span>
                                                {item.stock < 10 && <span className="text-[9px] font-bold text-orange-500 uppercase tracking-tighter">Low Inventory</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-destructive/10 text-destructive border-destructive/20'
                                                }`}>
                                                <span className={`h-1 w-1 rounded-full ${item.status === 'Active' ? 'bg-emerald-500' : 'bg-destructive'}`} />
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEditProduct(item)}
                                                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all h-9 w-9 flex items-center justify-center border border-transparent hover:border-primary/20"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(item.barcode)}
                                                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all h-9 w-9 flex items-center justify-center border border-transparent hover:border-destructive/20"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Add Product Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
                            onClick={() => !isLoading && setIsAddModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-lg"
                        >
                            <div className="bg-card border border-border/50 rounded-3xl shadow-2xl p-6 m-4 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -z-10" />

                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-foreground">
                                            {modalMode === 'edit' ? 'Edit Product' : 'Add Product'}
                                        </h2>
                                        <p className="text-sm text-muted-foreground mt-1 text-xs">
                                            {modalMode === 'edit' ? 'Update your product details and inventory.' : 'Enter barcode to auto-fill details.'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsAddModalOpen(false)}
                                        disabled={isLoading}
                                        className="p-2 text-muted-foreground hover:bg-muted/50 rounded-full transition-colors disabled:opacity-50"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <form className="space-y-4" onSubmit={handleSaveProduct}>
                                    <div className="bg-muted/30 p-4 rounded-2xl border border-border/50 space-y-4 mb-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Global Metadata</h3>
                                            {isCheckingBarcode && <Loader2 className="h-3 w-3 animate-spin text-primary" />}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground ml-1">Barcode ID</label>
                                            <div className="relative group">
                                                <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.barcode}
                                                    onChange={handleBarcodeChange}
                                                    disabled={modalMode === 'edit'}
                                                    className="w-full flex h-10 rounded-xl border border-input bg-background/50 pl-10 pr-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    placeholder="Scan or type barcode..."
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground ml-1">Product Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.product_name}
                                                    onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                                                    className="w-full flex h-10 rounded-xl border border-input bg-background/50 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                                    placeholder="e.g., Green Tea"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground ml-1">Brand</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.brand}
                                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                                    className="w-full flex h-10 rounded-xl border border-input bg-background/50 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                                    placeholder="e.g., Nature Valley"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground ml-1">Quantity</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.quantity}
                                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                                    className="w-full flex h-10 rounded-xl border border-input bg-background/50 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                                    placeholder="e.g. 500g"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground ml-1">Category</label>
                                                <select
                                                    required
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                    className="w-full flex h-10 rounded-xl border border-input bg-background/50 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 text-foreground"
                                                >
                                                    <option value="">Category</option>
                                                    <option value="Groceries">Groceries</option>
                                                    <option value="Electronics">Electronics</option>
                                                    <option value="Personal Care">Personal Care</option>
                                                    <option value="Home Essentials">Home Essentials</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 space-y-4">
                                        <h3 className="text-xs font-semibold text-primary uppercase tracking-wider">Your Store Inventory</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground ml-1">Price (₹)</label>
                                                <input
                                                    required
                                                    type="number"
                                                    step="0.01"
                                                    value={formData.price}
                                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                    className="w-full flex h-10 rounded-xl border border-input bg-background/50 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground ml-1">Stock</label>
                                                <input
                                                    required
                                                    type="number"
                                                    value={formData.stock}
                                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                                    className="w-full flex h-10 rounded-xl border border-input bg-background/50 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                                    placeholder="units"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex justify-end gap-3 mt-6 border-t border-border/50">
                                        <button
                                            type="button"
                                            disabled={isLoading}
                                            onClick={() => setIsAddModalOpen(false)}
                                            className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading || isCheckingBarcode}
                                            className="px-6 py-2 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center gap-2"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <CheckCircle2 className="h-4 w-4" />
                                                    {modalMode === 'edit' ? 'Update Changes' : 'Sync & Save'}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
