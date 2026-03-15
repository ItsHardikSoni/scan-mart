'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Search, Edit2, Trash2, PackageOpen, Filter, X
} from 'lucide-react';

const mockInventory: any[] = [];

export default function VendorProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Filter inventory based on search
    const filteredInventory = mockInventory.filter(item =>
        item.product_data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.barcode.includes(searchQuery) ||
        item.product_data.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 max-w-7xl mx-auto w-full space-y-8">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <PackageOpen className="h-5 w-5 text-primary" />
                        Products
                    </h1>
                    <p className="text-muted-foreground mt-1 text-xs">Manage your store inventory and product catalog.</p>
                </div>

                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 h-9 px-3 py-1.5 gap-2 w-full sm:w-auto"
                >
                    <Plus className="h-3 w-3" />
                    Add Product
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search products by name, brand, or barcode..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex h-9 w-full rounded-xl border border-input bg-background/50 pl-9 pr-4 py-1.5 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary transition-all"
                    />
                </div>

                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-medium ring-offset-background transition-all hover:bg-muted/50 h-9 px-3 py-1.5 gap-2 border border-border text-foreground w-full sm:w-auto">
                    <Filter className="h-3 w-3" />
                    Filters
                </button>
            </div>

            {/* Products Table */}
            <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                        <thead className="bg-muted/50 text-muted-foreground border-b border-border/50">
                            <tr>
                                <th className="px-6 py-4 font-medium">Product</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Price</th>
                                <th className="px-6 py-4 font-medium">Stock</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
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
                                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                <PackageOpen className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.product_data.name}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{item.product_data.brand}</span>
                                                    <span className="text-[10px] text-muted-foreground">{item.product_data.quantity}</span>
                                                    <span className="text-[10px] text-muted-foreground opacity-50 ml-1">#{item.barcode}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-secondary">
                                            {item.product_data.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">₹{item.price}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className={`font-medium ${item.stock < 10 && item.stock > 0 ? 'text-orange-500' : item.stock === 0 ? 'text-destructive' : ''}`}>
                                                {item.stock} units
                                            </span>
                                            {item.stock < 10 && item.stock > 0 && <span className="text-[10px] text-orange-500">Low Stock</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${item.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                            item.status === 'Out of Stock' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                                                'bg-muted text-muted-foreground border-border'
                                            }`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${item.status === 'Active' ? 'bg-green-500' :
                                                item.status === 'Out of Stock' ? 'bg-destructive' :
                                                    'bg-muted-foreground'
                                                }`} />
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit Product">
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors" title="Delete Product">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}

                            {filteredInventory.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                        <div className="flex flex-col items-center gap-2">
                                            <Search className="h-8 w-8 opacity-20" />
                                            <p>No products found matching "{searchQuery}"</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Product Modal Overlay (Mock) */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
                            onClick={() => setIsAddModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-lg"
                        >
                            <div className="bg-card border border-border/50 rounded-3xl shadow-2xl p-6 m-4 relative overflow-hidden">
                                {/* Decorative background blur */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -z-10" />

                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-foreground">Add New Product</h2>
                                        <p className="text-sm text-muted-foreground mt-1">Fill in the details for your new item.</p>
                                    </div>
                                    <button
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="p-2 text-muted-foreground hover:bg-muted/50 rounded-full transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); }}>
                                    <div className="bg-muted/30 p-4 rounded-2xl border border-border/50 space-y-4 mb-2">
                                        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Global Product Details</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">Barcode ID</label>
                                                <input required type="text" className="w-full flex h-10 rounded-xl border border-input bg-background/50 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" placeholder="e.g. 8901030911246" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">Product Name</label>
                                                <input required type="text" className="w-full flex h-10 rounded-xl border border-input bg-background/50 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" placeholder="e.g., Green Tea" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">Brand</label>
                                                <input required type="text" className="w-full flex h-10 rounded-xl border border-input bg-background/50 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" placeholder="e.g., Nature Valley" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">Quantity <span className="text-xs font-normal text-muted-foreground">(1kg, 500ml)</span></label>
                                                <input required type="text" className="w-full flex h-10 rounded-xl border border-input bg-background/50 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" placeholder="e.g. 250g" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">Category</label>
                                            <select required className="w-full flex h-10 rounded-xl border border-input bg-background/50 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 text-foreground">
                                                <option value="">Select a category</option>
                                                <option value="electronics">Electronics</option>
                                                <option value="groceries">Groceries</option>
                                                <option value="clothing">Clothing</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 space-y-4">
                                        <h3 className="text-xs font-semibold text-primary uppercase tracking-wider">Your Inventory Details</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">Price (₹)</label>
                                                <input required type="number" className="w-full flex h-10 rounded-xl border border-input bg-background/50 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" placeholder="0.00" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">Stock Availability</label>
                                                <input required type="number" className="w-full flex h-10 rounded-xl border border-input bg-background/50 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" placeholder="Quantity in stock" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex justify-end gap-3 mt-6 border-t border-border/50">
                                        <button
                                            type="button"
                                            onClick={() => setIsAddModalOpen(false)}
                                            className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                                        >
                                            Save Product
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
