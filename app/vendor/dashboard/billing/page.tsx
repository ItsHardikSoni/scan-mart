'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ScanLine, Search, Plus, Minus, Trash2, CreditCard,
    IndianRupee, ArrowRight, PackageOpen, CheckCircle2,
    Barcode,
    ShoppingCart, Phone, User, Wallet, DollarSign, Banknote, AlertCircle
} from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

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
    const [showScanner, setShowScanner] = useState(false);
    const [lastInputTime, setLastInputTime] = useState(0);
    const [inputTimeout, setInputTimeout] = useState<NodeJS.Timeout | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [productError, setProductError] = useState<string | null>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(false);

    // Customer and Payment details
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'online' | 'cash' | 'card'>('cash');
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [isSearchingCustomer, setIsSearchingCustomer] = useState(false);
    const [customerSearchTimeout, setCustomerSearchTimeout] = useState<NodeJS.Timeout | null>(null);
    const [customerAutoFilled, setCustomerAutoFilled] = useState(false);

    // Fetch all products for the vendor
    const fetchProducts = async () => {
        setIsLoadingProducts(true);
        setProductError(null);
        try {
            const response = await fetch('/api/v0/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProductError('Failed to load products. Please try again.');
        } finally {
            setIsLoadingProducts(false);
        }
    };

    // Fetch all orders for the vendor (for customer search)
    const fetchOrders = async () => {
        console.log('📥 Fetching orders...');
        setIsLoadingOrders(true);
        try {
            const response = await fetch('/api/v0/orders');
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            console.log('📦 Orders fetched successfully:', data.length, 'orders');
            console.log('📋 First order sample:', data[0]);
            setOrders(data);
        } catch (error) {
            console.error('❌ Error fetching orders:', error);
            // Don't show error for orders fetch, just log it
        } finally {
            setIsLoadingOrders(false);
        }
    };

    // Fetch a specific product by barcode
    const fetchProductByBarcode = async (barcode: string) => {
        try {
            const response = await fetch(`/api/v0/products/${barcode}`);
            if (!response.ok) {
                if (response.status === 404) {
                    return null; // Product not found
                }
                throw new Error('Failed to fetch product');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching product by barcode:', error);
            return null;
        }
    };

    // Search for customer by phone number (local search through orders)
    const searchCustomerByPhone = async (phone: string) => {
        if (phone.length < 10) return;

        setIsSearchingCustomer(true);

        // Simulate API delay for UX consistency
        await new Promise(resolve => setTimeout(resolve, 300));

        try {
            // Search through local orders data
            const matchingOrder = orders.find(order => order.customer_phone === phone);

            if (matchingOrder) {
                setCustomerName(matchingOrder.customer_name);
                setCustomerAutoFilled(true);
            } else {
                setCustomerAutoFilled(false);
                // Don't clear name if user has already typed something
                if (!customerName.trim()) {
                    setCustomerName('');
                }
            }
        } catch (error) {
            console.error('Error searching customer:', error);
            setCustomerAutoFilled(false);
        } finally {
            setIsSearchingCustomer(false);
        }
    };

    // Handle phone number input with debounced customer search
    const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const phone = e.target.value.replace(/\D/g, '').slice(0, 10);
        setCustomerPhone(phone);

        // Clear previous timeout
        if (customerSearchTimeout) {
            clearTimeout(customerSearchTimeout);
        }

        // Debounce customer search (wait 500ms after user stops typing)
        if (phone.length === 10) {
            const timeout = setTimeout(() => {
                searchCustomerByPhone(phone);
            }, 500);
            setCustomerSearchTimeout(timeout);
        } else {
            // Clear customer name if phone is incomplete
            setCustomerName('');
        }
    };

    // Handle successful barcode scan
    const handleScanSuccess = async (decodedText: string) => {
        setBarcodeInput(decodedText);
        setShowScanner(false);
        setIsScanning(true);

        const product = await fetchProductByBarcode(decodedText.trim());
        setIsScanning(false);

        if (product) {
            setSearchQuery(product.product_name);
        } else {
            alert("Product not found! Invalid barcode.");
        }
    };

    // Handle barcode input with auto-detection for physical scanners
    const handleBarcodeInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const now = Date.now();

        // Detect fast input (likely from physical scanner)
        const timeDiff = now - lastInputTime;
        const isFastInput = lastInputTime > 0 && timeDiff < 50; // Less than 50ms between inputs

        setBarcodeInput(value);
        setLastInputTime(now);

        // Clear previous timeout
        if (inputTimeout) {
            clearTimeout(inputTimeout);
        }

        // If fast input detected, auto-search after a short delay
        if (isFastInput && value.trim()) {
            const timeout = setTimeout(async () => {
                setIsScanning(true);
                const product = await fetchProductByBarcode(value.trim());
                setIsScanning(false);

                if (product) {
                    setSearchQuery(product.product_name);
                } else {
                    alert("Product not found! Invalid barcode.");
                }
            }, 300); // Wait 300ms after last input
            setInputTimeout(timeout);
        }
    };

    // Auto-focus barcode input (simulating a physical scanner connection)
    // In a real POS, you'd listen for rapid keyboard events from the scanner

    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!barcodeInput.trim()) return;

        // Simulate scanning delay
        setIsScanning(true);
        const product = await fetchProductByBarcode(barcodeInput.trim());
        setIsScanning(false);

        if (product) {
            // Show product in search details
            setSearchQuery(product.product_name);
        } else {
            // Show error toast in real app
            alert("Product not found! Invalid barcode.");
        }

        // Do not clear barcodeInput to show what was scanned
    };

    const addToCart = (product: any) => {
        setCart(prev => {
            const existing = prev.find(item => item.barcode === product.barcode);
            if (existing) {
                return prev.map(item =>
                    item.barcode === product.barcode ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
                );
            }
            // Transform API product to cart item format
            const cartItem: CartItem = {
                barcode: product.barcode,
                product_data: {
                    name: product.product_name,
                    brand: product.brand,
                    quantity: product.quantity,
                    category: product.category
                },
                price: product.price,
                cartQuantity: 1
            };
            return [...prev, cartItem];
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

    const handleCheckout = async () => {
        // Validation
        if (cart.length === 0) {
            setPaymentError('Cart is empty');
            return;
        }

        if (!customerName.trim()) {
            setPaymentError('Please enter customer name');
            return;
        }

        if (!customerPhone.trim() || !/^\d{10}$/.test(customerPhone.replace(/\D/g, ''))) {
            setPaymentError('Please enter a valid 10-digit phone number');
            return;
        }

        setPaymentError(null);
        setIsProcessingPayment(true);

        try {
            const subtotal = cart.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);
            const tax = subtotal * 0.18;
            const total = subtotal + tax;

            const response = await fetch('/api/v0/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customer_name: customerName.trim(),
                    customer_phone: customerPhone.trim(),
                    items: cart,
                    total: total.toFixed(2),
                    payment_method: paymentMethod
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to process payment');
            }

            setIsProcessingPayment(false);
            setShowCheckoutSuccess(true);

            // Reset form after 3 seconds
            setTimeout(() => {
                setCart([]);
                setCustomerName('');
                setCustomerPhone('');
                setPaymentMethod('cash');
                setShowCheckoutSuccess(false);
                setBarcodeInput('');
                setSearchQuery('');
            }, 3000);
        } catch (error) {
            console.error('Checkout error:', error);
            setPaymentError(error instanceof Error ? error.message : 'Failed to process payment');
            setIsProcessingPayment(false);
        }
    };

    // Initialize scanner when showScanner is true
    useEffect(() => {
        if (showScanner) {
            const scanner = new Html5QrcodeScanner(
                'reader',
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    supportedScanTypes: ['qr_code', 'ean_13', 'code_128', 'code_39', 'code_93', 'codabar', 'ean_8', 'itf', 'upc_a', 'upc_e'],
                },
                false
            );
            scanner.render(handleScanSuccess, (error) => {
                console.warn(error);
            });

            // Cleanup on unmount or when showScanner changes
            return () => {
                scanner.clear().catch(console.error);
            };
        }
    }, [showScanner]);

    // Fetch products and orders on component mount
    useEffect(() => {
        fetchProducts();
        fetchOrders();
    }, []);

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0);
    const tax = subtotal * 0.18; // 18% GST mock
    const total = subtotal + tax;

    const searchResults = searchQuery.trim() === ''
        ? []
        : products.filter(p => p.product_name.toLowerCase().includes(searchQuery.toLowerCase()) || p.barcode.includes(searchQuery) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()));

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
                            <p className="text-muted-foreground mb-6">Order has been processed and saved.</p>
                            <div className="w-full bg-muted/50 rounded-xl p-4 mb-4 text-left space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Customer</span>
                                    <span className="font-medium text-foreground">{customerName}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Phone</span>
                                    <span className="font-medium text-foreground">{customerPhone}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Payment</span>
                                    <span className="font-medium text-foreground capitalize">{paymentMethod}</span>
                                </div>
                                <div className="pt-2 border-t border-border/50 flex justify-between">
                                    <span className="text-muted-foreground text-xs">Amount Paid</span>
                                    <span className="text-lg font-bold text-primary">₹{total.toFixed(2)}</span>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">Ready for next customer...</p>
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
                                onChange={handleBarcodeInputChange}
                                disabled={isScanning || showCheckoutSuccess}
                                placeholder="Scan barcode or enter product ID"
                                className="flex h-10 w-full rounded-2xl border border-input bg-background/50 pl-10 pr-4 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary transition-all disabled:opacity-50"
                                autoFocus
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowScanner(true)}
                            disabled={isScanning || showCheckoutSuccess}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-5"
                        >
                            <ScanLine className="h-4 w-4 mr-2" />
                            Scan
                        </button>
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
                                        <p className="font-semibold text-foreground text-sm truncate">{product.product_name}</p>
                                        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs text-muted-foreground mt-1.5">
                                            <span className="bg-muted px-2 py-0.5 rounded-md whitespace-nowrap">{product.brand}</span>
                                            <span className="bg-muted px-2 py-0.5 rounded-md whitespace-nowrap">{product.quantity}</span>
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
                                {isLoadingProducts ? (
                                    <>
                                        <div className="h-10 w-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                                        <p className="text-sm font-medium">Loading products...</p>
                                    </>
                                ) : productError ? (
                                    <>
                                        <PackageOpen className="h-10 w-10 opacity-20 mb-4" />
                                        <p className="text-sm font-medium text-destructive">{productError}</p>
                                        <button
                                            onClick={fetchProducts}
                                            className="mt-2 text-xs text-primary hover:underline"
                                        >
                                            Try again
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <PackageOpen className="h-10 w-10 opacity-20 mb-4" />
                                        <p className="text-sm font-medium">No details to display</p>
                                        <p className="text-xs mt-1 text-center opacity-70">Search for a product or scan a barcode</p>
                                    </>
                                )}
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
                <div className="bg-muted/20 border-t border-border/50 p-5 shrink-0 rounded-b-3xl flex flex-col gap-4">
                    {/* Error Message */}
                    {paymentError && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-destructive/10 border border-destructive/30 text-destructive text-xs p-3 rounded-xl flex items-start gap-2"
                        >
                            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                            <span>{paymentError}</span>
                        </motion.div>
                    )}

                    {/* Customer Details Section */}
                    <div className="bg-background/50 rounded-2xl p-4 border border-border/50 space-y-3">
                        <h3 className="text-xs font-semibold text-foreground flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            Customer Details
                        </h3>

                        {/* Customer Name Input */}
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={customerName}
                                onChange={(e) => {
                                    setCustomerName(e.target.value);
                                    setCustomerAutoFilled(false); // Reset auto-fill flag when user types
                                }}
                                placeholder="Customer name"
                                disabled={isProcessingPayment}
                                className="w-full h-9 rounded-lg border border-input bg-background/50 pl-10 pr-10 text-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50"
                            />
                            {customerAutoFilled && customerName && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                    <span className="text-[10px] text-green-600 font-medium">Auto-filled</span>
                                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                                </div>
                            )}
                        </div>

                        {/* Customer Phone Input */}
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="tel"
                                value={customerPhone}
                                onChange={handlePhoneInputChange}
                                placeholder="Phone number (10 digits)"
                                maxLength={10}
                                disabled={isProcessingPayment}
                                className="w-full h-9 rounded-lg border border-input bg-background/50 pl-10 pr-10 text-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50"
                            />
                            {isSearchingCustomer && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <div className="h-4 w-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                                </div>
                            )}
                            {customerPhone.length === 10 && !isSearchingCustomer && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Method Section */}
                    <div className="bg-background/50 rounded-2xl p-4 border border-border/50 space-y-3">
                        <h3 className="text-xs font-semibold text-foreground flex items-center gap-2">
                            <Wallet className="h-4 w-4 text-primary" />
                            Payment Method
                        </h3>

                        <div className="grid grid-cols-3 gap-2">
                            {(['cash', 'card', 'online'] as const).map((method) => (
                                <button
                                    key={method}
                                    onClick={() => setPaymentMethod(method)}
                                    disabled={isProcessingPayment}
                                    className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 text-xs font-medium transition-all disabled:opacity-50 ${paymentMethod === method
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'border-border/50 bg-background/50 text-muted-foreground hover:border-primary/50'
                                        }`}
                                >
                                    {method === 'cash' && <Banknote className="h-5 w-5" />}
                                    {method === 'card' && <CreditCard className="h-5 w-5" />}
                                    {method === 'online' && <DollarSign className="h-5 w-5" />}
                                    <span className="capitalize">{method}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-2">
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

                    {/* Checkout Button */}
                    <button
                        onClick={handleCheckout}
                        disabled={cart.length === 0 || isProcessingPayment || !customerName.trim() || !customerPhone.trim()}
                        className="w-full flex items-center justify-between whitespace-nowrap rounded-2xl text-xs font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 h-12 px-4 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        <span className="relative z-10 flex items-center gap-2">
                            {isProcessingPayment ? (
                                <>
                                    <div className="h-4 w-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CreditCard className="h-5 w-5" />
                                    Complete Payment
                                </>
                            )}
                        </span>
                        <span className="relative z-10 flex items-center gap-2">
                            Pay ₹{total.toFixed(0)}
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </div>
            </div>

            {/* Scanner Modal */}
            <AnimatePresence>
                {showScanner && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-card border border-border/50 p-6 rounded-3xl shadow-2xl max-w-md w-full mx-4"
                        >
                            <h3 className="text-lg font-bold text-foreground mb-4">Scan Barcode</h3>
                            <div id="reader" className="w-full"></div>
                            <button
                                onClick={() => setShowScanner(false)}
                                className="mt-4 w-full inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-all bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4"
                            >
                                Close Scanner
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
