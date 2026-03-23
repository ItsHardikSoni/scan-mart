'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ShoppingCart, Search, Filter, ChevronRight, Download, Eye, ExternalLink, Phone, AlertCircle,
    X, Package, Calendar, CreditCard, User, Receipt, IndianRupee
} from 'lucide-react';

const tabs = ['All Orders'];

export default function VendorOrdersPage() {
    const [activeTab, setActiveTab] = useState('All Orders');
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [showOrderModal, setShowOrderModal] = useState(false);

    // Fetch orders from API
    const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/v0/orders');
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Please log in to view orders');
                }
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError(err instanceof Error ? err.message : 'Failed to load orders');
            setOrders([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch orders on component mount
    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer_name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const handleOrderClick = (order: any) => {
        setSelectedOrder(order);
        setShowOrderModal(true);
    };

    const closeOrderModal = () => {
        setShowOrderModal(false);
        setSelectedOrder(null);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto w-full space-y-8">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5 text-primary" />
                        Orders
                    </h1>
                    <p className="text-muted-foreground mt-1 text-xs">View and manage customer orders.</p>
                </div>

                <button
                    onClick={fetchOrders}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-medium ring-offset-background transition-all hover:bg-muted/50 h-9 px-3 py-1.5 gap-2 border border-border text-foreground w-full sm:w-auto disabled:opacity-50"
                    disabled={isLoading}
                >
                    <Download className="h-4 w-4" />
                    {isLoading ? 'Loading...' : 'Refresh'}
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search orders by ID or customer name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex h-9 w-full rounded-xl border border-input bg-background/50 pl-10 pr-4 py-1.5 text-xs ring-offset-background md:w-96 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    />
                </div>

                <div className="text-xs text-muted-foreground">
                    {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-destructive/10 border border-destructive/30 text-destructive text-xs p-4 rounded-xl flex items-start gap-3"
                >
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium">{error}</p>
                        <button
                            onClick={fetchOrders}
                            className="text-xs mt-2 underline hover:no-underline"
                        >
                            Try again
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Loading State */}
            {isLoading && !error && (
                <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center gap-3">
                        <div className="h-8 w-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <p className="text-xs text-muted-foreground">Loading orders...</p>
                    </div>
                </div>
            )}

            {/* Orders Table */}
            {!isLoading && (
                <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
                    {filteredOrders.length === 0 ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <ShoppingCart className="h-12 w-12 mx-auto opacity-20 mb-4" />
                                <p className="text-foreground font-medium">No orders found</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {orders.length === 0 ? 'You haven\'t created any orders yet.' : 'No orders match your search.'}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left">
                                <thead className="bg-muted/50 text-muted-foreground border-b border-border/50">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Order ID</th>
                                        <th className="px-6 py-4 font-medium">Date</th>
                                        <th className="px-6 py-4 font-medium">Customer</th>
                                        <th className="px-6 py-4 font-medium">Phone</th>
                                        <th className="px-6 py-4 font-medium">Payment</th>
                                        <th className="px-6 py-4 font-medium">Total</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50 text-foreground">
                                    {filteredOrders.map((order, index) => (
                                        <motion.tr
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            key={order.id}
                                            className="hover:bg-muted/30 transition-colors group cursor-pointer"
                                            onClick={() => handleOrderClick(order)}
                                        >
                                            <td className="px-6 py-4 font-semibold text-primary">{order.order_id}</td>
                                            <td className="px-6 py-4">{formatDate(order.created_at)}</td>
                                            <td className="px-6 py-4 font-medium">{order.customer_name}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1">
                                                    <Phone className="h-3 w-3 text-muted-foreground" />
                                                    {order.customer_phone}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${order.payment_method === 'cash'
                                                    ? 'bg-orange-500/10 text-orange-600'
                                                    : order.payment_method === 'card'
                                                        ? 'bg-blue-500/10 text-blue-600'
                                                        : 'bg-green-500/10 text-green-600'
                                                    }`}>
                                                    {order.payment_method.charAt(0).toUpperCase() + order.payment_method.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-semibold">₹{parseFloat(order.total).toFixed(2)}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                                                    {order.status}
                                                </span>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* Order Details Modal */}
            {showOrderModal && selectedOrder && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={closeOrderModal}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-card border border-border/50 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border/50">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                                    <Receipt className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-foreground">Order Details</h2>
                                    <p className="text-xs text-muted-foreground">Order #{selectedOrder.order_id}</p>
                                </div>
                            </div>
                            <button
                                onClick={closeOrderModal}
                                className="h-8 w-8 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                            {/* Order Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-muted/30 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-xs font-medium text-muted-foreground">Order Date</span>
                                    </div>
                                    <p className="text-sm font-semibold">{formatDate(selectedOrder.created_at)}</p>
                                </div>
                                <div className="bg-muted/30 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-xs font-medium text-muted-foreground">Payment Method</span>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${selectedOrder.payment_method === 'cash'
                                            ? 'bg-orange-500/10 text-orange-600'
                                            : selectedOrder.payment_method === 'card'
                                                ? 'bg-blue-500/10 text-blue-600'
                                                : 'bg-green-500/10 text-green-600'
                                        }`}>
                                        {selectedOrder.payment_method.charAt(0).toUpperCase() + selectedOrder.payment_method.slice(1)}
                                    </span>
                                </div>
                            </div>

                            {/* Customer Details */}
                            <div className="bg-muted/30 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium text-muted-foreground">Customer Information</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Name</p>
                                        <p className="text-sm font-semibold">{selectedOrder.customer_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Phone</p>
                                        <p className="text-sm font-semibold flex items-center gap-1">
                                            <Phone className="h-3 w-3" />
                                            {selectedOrder.customer_phone}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium text-muted-foreground">Items Purchased</span>
                                </div>
                                <div className="space-y-2">
                                    {selectedOrder.items && selectedOrder.items.map((item: any, index: number) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate">{item.product_data.name}</p>
                                                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                                    <span>{item.product_data.brand}</span>
                                                    <span>•</span>
                                                    <span>{item.product_data.quantity}</span>
                                                    <span>•</span>
                                                    <span>ID: {item.barcode}</span>
                                                </div>
                                            </div>
                                            <div className="text-right ml-4">
                                                <p className="text-sm font-semibold">₹{item.price.toFixed(2)} × {item.cartQuantity}</p>
                                                <p className="text-xs text-muted-foreground">₹{(item.price * item.cartQuantity).toFixed(2)}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Order Total</p>
                                        <p className="text-lg font-bold text-primary">₹{parseFloat(selectedOrder.total).toFixed(2)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-muted-foreground">Status</p>
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                                            {selectedOrder.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
