'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ScanLine, Search, Plus, Minus, Trash2, CreditCard,
    IndianRupee, ArrowRight, PackageOpen, CheckCircle2,
    Barcode,
    ShoppingCart
} from 'lucide-react';

const availableInventory: any[] = [];

type CartItem = {
    barcode: string;
    product_data: {
        name: string;
        brand: string;
        quantity: string;
        category: string;
    };
    price: number;
    cartQuantity: number;
};

export default function VendorBillingPage() {
    const [barcodeInput, setBarcodeInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isScanning, setIsScanning] = useState(false);
    const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

    // Auto-focus barcode input (simulating a physical scanner connection)
    // In a real POS, you'd listen for rapid keyboard events from the scanner

    const handleScan = (e: React.FormEvent) => {
        e.preventDefault();
        if (!barcodeInput.trim()) return;

        // Simulate scanning delay
        setIsScanning(true);
        setTimeout(() => {
            const product = availableInventory.find(p => p.barcode === barcodeInput.trim());

            if (product) {
                // Show product in search details
                setSearchQuery(product.product_data.name);
            } else {
                // Show error toast in real app
                alert("Product not found! Invalid barcode.");
            }

            setBarcodeInput('');
            setIsScanning(false);
        }, 400); // 400ms delay for visual effect
    };

    const addToCart = (product: typeof availableInventory[0]) => {
        setCart(prev => {
            const existing = prev.find(item => item.barcode === product.barcode);
            if (existing) {
                return prev.map(item =>
                    item.barcode === product.barcode ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
                );
            }
            return [...prev, { ...product, cartQuantity: 1 }];
        });
    };

    const updateQuantity = (barcode: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.barcode === barcode) {
                const newQuantity = Math.max(0, item.cartQuantity + delta);
                return { ...item, cartQuantity: newQuantity };
            }
            return item;
        }).filter(item => item.cartQuantity > 0));
    };

    const removeItem = (barcode: string) => {
        setCart(prev => prev.filter(item => item.barcode !== barcode));
    };

    const handleCheckout = () => {
        if (cart.length === 0) return;

        // Simulate payment processing
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            setShowCheckoutSuccess(true);

            // Reset after 3 seconds
            setTimeout(() => {
                setCart([]);
                setShowCheckoutSuccess(false);
            }, 3000);
        }, 1500);
    };

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);
    const tax = subtotal * 0.18; // 18% GST mock
    const total = subtotal + tax;

    const searchResults = searchQuery.trim() === ''
        ? []
        : availableInventory.filter(p => p.product_data.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.barcode.includes(searchQuery) || p.product_data.brand.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] p-4 sm:p-5 gap-4 relative items-start">

            {/* Checkout Success Overlay */}
            <AnimatePresence>
                {showCheckoutSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center rounded-2xl"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-card border border-border/50 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-sm"
                        >
                            <div className="h-20 w-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="h-10 w-10" />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
                            <p className="text-muted-foreground mb-6">Order has been processed and receipt sent.</p>
                            <div className="w-full bg-muted/50 rounded-xl p-4 mb-6">
                                <p className="text-sm font-medium text-foreground">Amount Paid</p>
                                <p className="text-3xl font-bold text-primary mt-1">₹{total.toFixed(2)}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">Ready for next customer sequence...</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Left Area: Scanner, Search and Preview */}
            <div className="flex-1 flex flex-col gap-4 max-w-2xl mx-auto w-full">

                {/* 1. Scanner Input */}
                <div className="bg-card border border-border/50 rounded-3xl p-5 shadow-sm shrink-0 relative overflow-hidden">
                    {isScanning && <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-shimmer" />}

                    <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                        <ScanLine className="h-4 w-4 text-primary" />
                        Scanner Input
                    </h2>

                    <form onSubmit={handleScan} className="flex gap-3">
                        <div className="relative flex-1">
                            <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={barcodeInput}
                                onChange={(e) => setBarcodeInput(e.target.value)}
                                disabled={isScanning || showCheckoutSuccess}
                                placeholder="Scan barcode or enter product ID"
                                className="flex h-10 w-full rounded-2xl border border-input bg-background/50 pl-10 pr-4 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary transition-all disabled:opacity-50"
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isScanning || !barcodeInput.trim() || showCheckoutSuccess}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 h-10 px-5"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* 2. Search Product by Name */}
                <div className="bg-card border border-border/50 rounded-3xl p-5 shadow-sm shrink-0 relative">
                    <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                        <Search className="h-4 w-4 text-primary" />
                        Search Product
                    </h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            disabled={isScanning || showCheckoutSuccess}
                            placeholder="Type product name or ID to search..."
                            className="flex h-10 w-full rounded-2xl border border-input bg-background/50 pl-10 pr-4 py-2 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary transition-all disabled:opacity-50"
                        />
                    </div>
                </div>

                {/* 3. Product Details / Search Results */}
                <div className="bg-card border border-border/50 rounded-3xl p-5 shadow-sm flex-1 flex flex-col min-h-[300px]">
                    <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2 shrink-0">
                        <PackageOpen className="h-4 w-4 text-primary" />
                        Product Details
                    </h2>
                    <div className="flex-1 space-y-3">
                        {searchResults.length > 0 ? (
                            searchResults.map(product => (
                                <div key={product.barcode} className="flex items-center justify-between p-4 rounded-2xl border border-border/50 bg-background/50 hover:border-primary/30 transition-colors">
                                    <div className="min-w-0 pr-4">
                                        <p className="font-semibold text-foreground text-sm truncate">{product.product_data.name}</p>
                                        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs text-muted-foreground mt-1.5">
                                            <span className="bg-muted px-2 py-0.5 rounded-md whitespace-nowrap">{product.product_data.brand}</span>
                                            <span className="bg-muted px-2 py-0.5 rounded-md whitespace-nowrap">{product.product_data.quantity}</span>
                                            <span className="bg-muted px-2 py-0.5 rounded-md whitespace-nowrap">ID: {product.barcode}</span>
                                            <span className="bg-primary/10 text-primary font-medium px-2 py-0.5 rounded-md whitespace-nowrap">Stock: {product.stock}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 shrink-0">
                                        <span className="font-bold text-primary text-base">₹{product.price}</span>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-sm shadow-primary/10"
                                            title="Add to Cart"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                                <PackageOpen className="h-10 w-10 opacity-20 mb-4" />
                                <p className="text-sm font-medium">No details to display</p>
                                <p className="text-xs mt-1 text-center opacity-70">Search for a product or scan a barcode</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Area: Cart and Checkout */}
            <div className="lg:w-96 flex flex-col bg-card border border-border/50 rounded-3xl shadow-sm shrink-0 h-[calc(100vh-6rem)] lg:sticky lg:top-4 overflow-hidden">
                {/* Cart Header */}
                <div className="p-5 border-b border-border/50 bg-muted/20 shrink-0">
                    <h2 className="text-lg font-bold text-foreground">Current Order</h2>
                    <p className="text-xs text-muted-foreground mt-1">{cart.length} item(s) • Desk #1</p>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-2">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                            <ShoppingCart className="h-12 w-12 opacity-20 mb-4" />
                            <p>Cart is empty</p>
                            <p className="text-sm text-center max-w-[200px] mt-2 opacity-70">Scan a barcode or add an item from the catalog</p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    key={item.barcode}
                                    className="flex items-center gap-3 p-4 rounded-2xl hover:bg-muted/30 transition-colors group border border-transparent hover:border-border/50"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold text-foreground text-xs truncate">{item.product_data.name}</p>
                                            <p className="font-semibold text-foreground text-xs shrink-0 text-right">
                                                ₹{item.price * item.cartQuantity}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <p className="text-[10px] text-muted-foreground">{item.product_data.brand} • {item.product_data.quantity} • ₹{item.price} each</p>
                                            <div className="flex items-center gap-2 bg-background/50 rounded-lg border border-border/50 p-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => updateQuantity(item.barcode, -1)}
                                                    className="p-1 text-muted-foreground hover:bg-muted rounded-md transition-colors"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="text-xs font-medium w-4 text-center">{item.cartQuantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.barcode, 1)}
                                                    className="p-1 text-primary hover:bg-primary/10 rounded-md transition-colors"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <span className="text-[10px] text-muted-foreground mr-1">Qty: {item.cartQuantity}</span>
                                            <button
                                                onClick={() => removeItem(item.barcode)}
                                                className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors ml-auto opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[10px]"
                                            >
                                                <Trash2 className="h-3 w-3" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>

                {/* Checkout Summary Footer */}
                <div className="bg-muted/20 border-t border-border/50 p-5 shrink-0 rounded-b-3xl">
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="font-medium text-foreground">₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">GST (18%)</span>
                            <span className="font-medium text-foreground">₹{tax.toFixed(2)}</span>
                        </div>
                        <div className="pt-2 border-t border-border/50 flex justify-between items-end">
                            <span className="font-medium text-foreground text-xs">Total Amount</span>
                            <div className="text-right">
                                <span className="text-2xl font-bold text-primary">₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={cart.length === 0 || isScanning}
                        className="w-full flex items-center justify-between whitespace-nowrap rounded-2xl text-xs font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 h-12 px-4 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        <span className="relative z-10 flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Charge Customer
                        </span>
                        <span className="relative z-10 flex items-center gap-2">
                            Pay ₹{total.toFixed(0)}
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
