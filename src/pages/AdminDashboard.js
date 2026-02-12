import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useConfirm } from '../context/ConfirmContext';
import { getProducts, deleteProduct, bulkDeleteProducts, bulkUpdateProducts } from '../services/productService';
import { getOrders, updateOrderStatus } from '../services/orderService';
import { LogOut, Plus, Trash2, Upload, Eye, Edit, Search, X } from 'lucide-react';
import AddProductModal from '../components/AddProductModal';
import CSVImport from '../components/CSVImport';
import OrderDetail from '../components/OrderDetail';
import BrandsManagement from '../components/BrandsManagement';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showCSVImport, setShowCSVImport] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showBulkActions, setShowBulkActions] = useState(false);
    const [bulkDiscount, setBulkDiscount] = useState('');
    const [orderFilters, setOrderFilters] = useState({ status: 'all', dateRange: 'all' });
    const [productFilters, setProductFilters] = useState({ gender: 'all', type: 'all', brand: 'all', category: 'all', status: 'all' });
    const [searchQuery, setSearchQuery] = useState('');
    const { logout } = useAuth();
    const { showToast } = useToast();
    const { confirm } = useConfirm();
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    const loadData = async () => {
        if (activeTab === 'products') {
            const data = await getProducts();
            setProducts(data);
        } else {
            const data = await getOrders();
            setOrders(data);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/admin');
    };

    const handleDeleteProduct = async (id) => {
        const confirmed = await confirm('Delete this product?');
        if (!confirmed) return;
        await deleteProduct(id);
        loadData();
    };

    const handleToggleStatus = async (product) => {
        const newStatus = product.status === 'published' ? 'draft' : 'published';
        await bulkUpdateProducts([product.id], { status: newStatus });
        loadData();
    };

    const handleSelectProduct = (id) => {
        setSelectedProducts(prev => 
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedProducts.length === filteredProducts.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(filteredProducts.map(p => p.id));
        }
    };

    const handleBulkDelete = async () => {
        const confirmed = await confirm(`Delete ${selectedProducts.length} products?`);
        if (!confirmed) return;
        await bulkDeleteProducts(selectedProducts);
        setSelectedProducts([]);
        loadData();
    };

    const handleBulkSetPrivate = async () => {
        await bulkUpdateProducts(selectedProducts, { status: 'draft' });
        setSelectedProducts([]);
        loadData();
    };

    const handleBulkSetDiscount = async () => {
        if (!bulkDiscount || isNaN(bulkDiscount)) {
            showToast('Enter a valid discount percentage', 'error');
            return;
        }
        const updates = {};
        selectedProducts.forEach(id => {
            const product = products.find(p => p.id === id);
            if (product) {
                updates[id] = {
                    salePrice: product.price * (1 - bulkDiscount / 100),
                    discount: bulkDiscount
                };
            }
        });
        await Promise.all(
            Object.entries(updates).map(([id, data]) => bulkUpdateProducts([id], data))
        );
        setSelectedProducts([]);
        setBulkDiscount('');
        setShowBulkActions(false);
        loadData();
    };

    const handleUpdateOrderStatus = async (orderId, status) => {
        await updateOrderStatus(orderId, status);
        loadData();
    };

    const filteredOrders = orders.filter(order => {
        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            const matchesSearch = 
                order.orderNumber?.toLowerCase().includes(query) ||
                order.customer?.fullName?.toLowerCase().includes(query) ||
                order.customer?.email?.toLowerCase().includes(query) ||
                order.customer?.phone?.toLowerCase().includes(query) ||
                order.id?.toLowerCase().includes(query);
            if (!matchesSearch) return false;
        }
        
        if (orderFilters.status !== 'all' && order.status !== orderFilters.status) return false;
        
        if (orderFilters.dateRange !== 'all') {
            const orderDate = new Date(order.createdAt);
            const now = new Date();
            const daysDiff = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));
            
            if (orderFilters.dateRange === 'today' && daysDiff > 0) return false;
            if (orderFilters.dateRange === 'week' && daysDiff > 7) return false;
            if (orderFilters.dateRange === 'month' && daysDiff > 30) return false;
        }
        
        return true;
    });

    const availableBrands = useMemo(() => {
        const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
        return brands.sort();
    }, [products]);

    const filteredProducts = products.filter(product => {
        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            const matchesSearch = 
                product.name?.toLowerCase().includes(query) ||
                product.brand?.toLowerCase().includes(query) ||
                product.productCode?.toLowerCase().includes(query) ||
                product.sku?.toLowerCase().includes(query) ||
                product.category?.toLowerCase().includes(query);
            if (!matchesSearch) return false;
        }
        
        if (productFilters.gender !== 'all') {
            if (productFilters.gender === 'men' && !product.forMen) return false;
            if (productFilters.gender === 'women' && !product.forWomen) return false;
        }
        if (productFilters.type !== 'all' && product.type !== productFilters.type) return false;
        if (productFilters.brand !== 'all' && product.brand !== productFilters.brand) return false;
        if (productFilters.category !== 'all' && product.category !== productFilters.category) return false;
        if (productFilters.status !== 'all' && product.status !== productFilters.status) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-black text-white p-4 md:p-6">
                <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Link to="/" className="text-xl md:text-2xl font-black italic uppercase hover:text-red-600 transition">
                        <span className="text-red-600">S</span>NEAKR <span className="text-red-600">.</span> Admin
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase hover:text-red-600 transition">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </nav>

            <div className="max-w-[1440px] mx-auto p-4 md:p-6">
                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab === 'orders' ? 'orders by name, email, phone, order #' : 'products by name, brand, SKU, code'}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black outline-none transition text-sm"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex gap-2 md:gap-4 mb-6 md:mb-8">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`flex-1 px-4 md:px-6 py-3 font-bold uppercase text-xs md:text-sm ${activeTab === 'orders' ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`flex-1 px-4 md:px-6 py-3 font-bold uppercase text-xs md:text-sm ${activeTab === 'products' ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab('brands')}
                        className={`flex-1 px-4 md:px-6 py-3 font-bold uppercase text-xs md:text-sm ${activeTab === 'brands' ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        Brands
                    </button>
                </div>

                {activeTab === 'brands' ? (
                    <BrandsManagement />
                ) : activeTab === 'orders' ? (
                    <div>
                        <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mb-6 bg-white p-4 border">
                            <select
                                value={orderFilters.status}
                                onChange={(e) => setOrderFilters({...orderFilters, status: e.target.value})}
                                className="px-3 md:px-4 py-2 border font-bold text-xs md:text-sm"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            <select
                                value={orderFilters.dateRange}
                                onChange={(e) => setOrderFilters({...orderFilters, dateRange: e.target.value})}
                                className="px-3 md:px-4 py-2 border font-bold text-xs md:text-sm"
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">Last 7 Days</option>
                                <option value="month">Last 30 Days</option>
                            </select>
                            <div className="text-xs md:text-sm font-bold">
                                {filteredOrders.length} of {orders.length}
                            </div>
                        </div>
                        <div className="space-y-4">
                        {filteredOrders.map(order => (
                            <div key={order.id} className="bg-white p-4 md:p-6 border hover:shadow-lg transition">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                                    <div className="flex-1 w-full">
                                        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                                            <p className="font-black text-base md:text-lg">{order.orderNumber || `#${order.id?.slice(-8)}`}</p>
                                            <span className={`px-2 md:px-3 py-1 text-xs font-bold uppercase ${
                                                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="font-bold text-base md:text-lg">{order.customer?.fullName}</p>
                                        <p className="text-xs md:text-sm text-gray-500">{order.customer?.email}</p>
                                        <p className="text-xs md:text-sm text-gray-500">{order.customer?.phone}</p>
                                        <p className="text-xs md:text-sm text-gray-500">{order.customer?.address}, {order.customer?.city}</p>
                                    </div>
                                    <div className="text-left md:text-right w-full md:w-auto">
                                        <p className="text-xl md:text-2xl font-black">${order.total}</p>
                                        <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                                <div className="mb-4 border-t pt-4">
                                    <p className="text-xs font-bold uppercase text-gray-500 mb-2">Items ({order.items?.length}):</p>
                                    <div className="space-y-1">
                                        {order.items?.slice(0, 3).map((item, idx) => (
                                            <p key={idx} className="text-xs md:text-sm">{item.name} - ${item.price}</p>
                                        ))}
                                        {order.items?.length > 3 && (
                                            <p className="text-xs md:text-sm text-gray-500">+{order.items.length - 3} more items</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="flex-1 px-3 md:px-4 py-2 bg-black text-white font-bold uppercase text-xs flex items-center justify-center gap-2 hover:opacity-90 transition"
                                    >
                                        <Eye size={16} /> View
                                    </button>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                        className="px-3 md:px-4 py-2 border font-bold text-xs uppercase"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-4 mb-6">
                            <button
                                onClick={() => setShowAddProduct(true)}
                                className="bg-black text-white px-4 md:px-6 py-3 font-bold uppercase text-xs md:text-sm flex items-center justify-center gap-2"
                            >
                                <Plus size={18} /> Add
                            </button>
                            <button
                                onClick={() => setShowCSVImport(true)}
                                className="bg-gray-800 text-white px-4 md:px-6 py-3 font-bold uppercase text-xs md:text-sm flex items-center justify-center gap-2"
                            >
                                <Upload size={18} /> Import
                            </button>
                            {selectedProducts.length > 0 && (
                                <button
                                    onClick={() => setShowBulkActions(!showBulkActions)}
                                    className="bg-blue-600 text-white px-4 md:px-6 py-3 font-bold uppercase text-xs md:text-sm"
                                >
                                    Bulk ({selectedProducts.length})
                                </button>
                            )}
                            <select
                                value={productFilters.gender}
                                onChange={(e) => setProductFilters({...productFilters, gender: e.target.value})}
                                className="px-3 md:px-4 py-2 border font-bold text-xs md:text-sm"
                            >
                                <option value="all">All Genders</option>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                            </select>
                            <select
                                value={productFilters.type}
                                onChange={(e) => setProductFilters({...productFilters, type: e.target.value})}
                                className="px-3 md:px-4 py-2 border font-bold text-xs md:text-sm"
                            >
                                <option value="all">All Types</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                            <select
                                value={productFilters.brand}
                                onChange={(e) => setProductFilters({...productFilters, brand: e.target.value})}
                                className="px-3 md:px-4 py-2 border font-bold text-xs md:text-sm"
                            >
                                <option value="all">All Brands</option>
                                {availableBrands.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                            <select
                                value={productFilters.category}
                                onChange={(e) => setProductFilters({...productFilters, category: e.target.value})}
                                className="px-3 md:px-4 py-2 border font-bold text-xs md:text-sm"
                            >
                                <option value="all">All Categories</option>
                                <option value="">No Category</option>
                                <option value="New Arrivals">New Arrivals</option>
                                <option value="Best Sellers">Best Sellers</option>
                                <option value="On Sale">On Sale</option>
                                <option value="Outlet">Outlet</option>
                                <option value="Premium Collection">Premium Collection</option>
                            </select>
                            <select
                                value={productFilters.status}
                                onChange={(e) => setProductFilters({...productFilters, status: e.target.value})}
                                className="px-3 md:px-4 py-2 border font-bold text-xs md:text-sm"
                            >
                                <option value="all">All Status</option>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                        {showBulkActions && selectedProducts.length > 0 && (
                            <div className="flex flex-wrap gap-2 items-center bg-white p-4 border mb-4">
                                <button
                                    onClick={handleBulkDelete}
                                    className="bg-red-600 text-white px-3 md:px-4 py-2 font-bold uppercase text-xs"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={handleBulkSetPrivate}
                                    className="bg-gray-600 text-white px-3 md:px-4 py-2 font-bold uppercase text-xs"
                                >
                                    Private
                                </button>
                                <input
                                    type="number"
                                    placeholder="%"
                                    value={bulkDiscount}
                                    onChange={(e) => setBulkDiscount(e.target.value)}
                                    className="px-3 py-2 border w-16 text-sm"
                                />
                                <button
                                    onClick={handleBulkSetDiscount}
                                    className="bg-green-600 text-white px-3 md:px-4 py-2 font-bold uppercase text-xs"
                                >
                                    Apply
                                </button>
                            </div>
                        )}
                        {filteredProducts.length > 0 && (
                            <div className="bg-white p-4 border mb-4">
                                <label className="flex items-center gap-2 font-bold text-sm cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.length === filteredProducts.length}
                                        onChange={handleSelectAll}
                                        className="w-4 h-4"
                                    />
                                    Select All ({filteredProducts.length})
                                </label>
                            </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {filteredProducts.map(product => (
                                <div key={product.id} className={`bg-white p-4 border ${selectedProducts.includes(product.id) ? 'ring-2 ring-blue-600' : ''}`}>
                                    <div className="flex items-start gap-2 mb-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.includes(product.id)}
                                            onChange={() => handleSelectProduct(product.id)}
                                            className="w-4 h-4 mt-1"
                                        />
                                        <div className="flex-1">
                                            <div className="relative">
                                                <img src={product.img} alt={product.name} className="w-full h-48 object-cover mb-4" />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleStatus(product);
                                                    }}
                                                    className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold uppercase cursor-pointer hover:opacity-80 transition ${
                                                        product.status === 'published' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                                                    }`}
                                                >
                                                    {product.status === 'published' ? 'LIVE' : 'DRAFT'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 font-bold mb-1">{product.productCode}</p>
                                    <h3 className="font-bold">{product.name}</h3>
                                    <p className="text-sm text-gray-500">{product.category}</p>
                                    <p className="font-black text-lg">${product.price}</p>
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => setEditingProduct(product)}
                                            className="flex-1 text-black text-sm font-bold uppercase flex items-center justify-center gap-2 border border-black py-2 hover:bg-black hover:text-white transition"
                                        >
                                            <Edit size={16} /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product.id)}
                                            className="flex-1 text-red-600 text-sm font-bold uppercase flex items-center justify-center gap-2 border border-red-600 py-2 hover:bg-red-600 hover:text-white transition"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {showAddProduct && <AddProductModal onClose={() => { setShowAddProduct(false); loadData(); }} />}
            {editingProduct && <AddProductModal editProduct={editingProduct} onClose={() => { setEditingProduct(null); loadData(); }} />}
            {showCSVImport && <CSVImport onClose={() => setShowCSVImport(false)} onComplete={() => { setShowCSVImport(false); loadData(); }} />}
            {selectedOrder && <OrderDetail order={selectedOrder} onClose={() => setSelectedOrder(null)} onUpdate={loadData} />}
        </div>
    );
};

export default AdminDashboard;
