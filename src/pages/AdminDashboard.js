import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProducts, deleteProduct, bulkDeleteProducts, bulkUpdateProducts } from '../services/productService';
import { getOrders, updateOrderStatus } from '../services/orderService';
import { LogOut, Plus, Trash2, Upload, Eye, Edit } from 'lucide-react';
import AddProductModal from '../components/AddProductModal';
import CSVImport from '../components/CSVImport';
import OrderDetail from '../components/OrderDetail';

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
    const [productFilters, setProductFilters] = useState({ category: 'all', status: 'all' });
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
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
        if (window.confirm('Delete this product?')) {
            await deleteProduct(id);
            loadData();
        }
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
        if (window.confirm(`Delete ${selectedProducts.length} products?`)) {
            await bulkDeleteProducts(selectedProducts);
            setSelectedProducts([]);
            loadData();
        }
    };

    const handleBulkSetPrivate = async () => {
        await bulkUpdateProducts(selectedProducts, { status: 'draft' });
        setSelectedProducts([]);
        loadData();
    };

    const handleBulkSetDiscount = async () => {
        if (!bulkDiscount || isNaN(bulkDiscount)) {
            alert('Enter a valid discount percentage');
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

    const filteredProducts = products.filter(product => {
        if (productFilters.category !== 'all' && product.category !== productFilters.category) return false;
        if (productFilters.status !== 'all' && product.status !== productFilters.status) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-black text-white p-6">
                <div className="max-w-[1440px] mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-black italic uppercase hover:text-red-600 transition">
                        <span className="text-red-600">S</span>NEAKR <span className="text-red-600">.</span> Admin
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold uppercase hover:text-red-600 transition">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </nav>

            <div className="max-w-[1440px] mx-auto p-6">
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-6 py-3 font-bold uppercase text-sm ${activeTab === 'orders' ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`px-6 py-3 font-bold uppercase text-sm ${activeTab === 'products' ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        Products
                    </button>
                </div>

                {activeTab === 'orders' ? (
                    <div>
                        <div className="flex gap-4 mb-6 bg-white p-4 border">
                            <select
                                value={orderFilters.status}
                                onChange={(e) => setOrderFilters({...orderFilters, status: e.target.value})}
                                className="px-4 py-2 border font-bold text-sm"
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
                                className="px-4 py-2 border font-bold text-sm"
                            >
                                <option value="all">All Time</option>
                                <option value="today">Today</option>
                                <option value="week">Last 7 Days</option>
                                <option value="month">Last 30 Days</option>
                            </select>
                            <div className="ml-auto text-sm font-bold">
                                Showing {filteredOrders.length} of {orders.length} orders
                            </div>
                        </div>
                        <div className="space-y-4">
                        {filteredOrders.map(order => (
                            <div key={order.id} className="bg-white p-6 border hover:shadow-lg transition">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <p className="font-black text-lg">{order.orderNumber || `#${order.id?.slice(-8)}`}</p>
                                            <span className={`px-3 py-1 text-xs font-bold uppercase ${
                                                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="font-bold text-lg">{order.customer?.fullName}</p>
                                        <p className="text-sm text-gray-500">{order.customer?.email}</p>
                                        <p className="text-sm text-gray-500">{order.customer?.phone}</p>
                                        <p className="text-sm text-gray-500">{order.customer?.address}, {order.customer?.city}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black">${order.total}</p>
                                        <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                                <div className="mb-4 border-t pt-4">
                                    <p className="text-xs font-bold uppercase text-gray-500 mb-2">Items ({order.items?.length}):</p>
                                    <div className="space-y-1">
                                        {order.items?.slice(0, 3).map((item, idx) => (
                                            <p key={idx} className="text-sm">{item.name} - ${item.price}</p>
                                        ))}
                                        {order.items?.length > 3 && (
                                            <p className="text-sm text-gray-500">+{order.items.length - 3} more items</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="flex-1 px-4 py-2 bg-black text-white font-bold uppercase text-xs flex items-center justify-center gap-2 hover:opacity-90 transition"
                                    >
                                        <Eye size={16} /> View Details
                                    </button>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                        className="px-4 py-2 border font-bold text-xs uppercase"
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
                        <div className="flex gap-4 mb-6">
                            <button
                                onClick={() => setShowAddProduct(true)}
                                className="bg-black text-white px-6 py-3 font-bold uppercase text-sm flex items-center gap-2"
                            >
                                <Plus size={18} /> Add Product
                            </button>
                            <button
                                onClick={() => setShowCSVImport(true)}
                                className="bg-gray-800 text-white px-6 py-3 font-bold uppercase text-sm flex items-center gap-2"
                            >
                                <Upload size={18} /> Import CSV
                            </button>
                            {selectedProducts.length > 0 && (
                                <>
                                    <button
                                        onClick={() => setShowBulkActions(!showBulkActions)}
                                        className="bg-blue-600 text-white px-6 py-3 font-bold uppercase text-sm"
                                    >
                                        Bulk Actions ({selectedProducts.length})
                                    </button>
                                    {showBulkActions && (
                                        <div className="flex gap-2 items-center">
                                            <button
                                                onClick={handleBulkDelete}
                                                className="bg-red-600 text-white px-4 py-2 font-bold uppercase text-xs"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={handleBulkSetPrivate}
                                                className="bg-gray-600 text-white px-4 py-2 font-bold uppercase text-xs"
                                            >
                                                Set Private
                                            </button>
                                            <input
                                                type="number"
                                                placeholder="Discount %"
                                                value={bulkDiscount}
                                                onChange={(e) => setBulkDiscount(e.target.value)}
                                                className="px-3 py-2 border w-24 text-sm"
                                            />
                                            <button
                                                onClick={handleBulkSetDiscount}
                                                className="bg-green-600 text-white px-4 py-2 font-bold uppercase text-xs"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                            <select
                                value={productFilters.category}
                                onChange={(e) => setProductFilters({...productFilters, category: e.target.value})}
                                className="px-4 py-2 border font-bold text-sm ml-auto"
                            >
                                <option value="all">All Categories</option>
                                <option value="New Arrivals">New Arrivals</option>
                                <option value="Best Sellers">Best Sellers</option>
                                <option value="On Sale">On Sale</option>
                                <option value="Outlet">Outlet</option>
                                <option value="Premium Collection">Premium Collection</option>
                            </select>
                            <select
                                value={productFilters.status}
                                onChange={(e) => setProductFilters({...productFilters, status: e.target.value})}
                                className="px-4 py-2 border font-bold text-sm"
                            >
                                <option value="all">All Status</option>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                            <img src={product.img} alt={product.name} className="w-full h-48 object-cover mb-4" />
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
