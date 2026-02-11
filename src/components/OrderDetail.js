import React, { useState } from 'react';
import { X, Package, Truck, DollarSign, User, MessageSquare, Printer } from 'lucide-react';
import { sendOrderUpdateEmail } from '../services/emailService';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const OrderDetail = ({ order, onClose, onUpdate }) => {
    const [activeTab, setActiveTab] = useState('details');
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        status: order.status,
        paymentStatus: order.paymentStatus || 'pending',
        shippingStatus: order.shippingStatus || 'not-shipped',
        trackingNumber: order.trackingNumber || '',
        shippingCarrier: order.shippingCarrier || '',
        internalNotes: order.internalNotes || '',
        customerNotes: order.customerNotes || ''
    });

    const tabs = [
        { id: 'details', label: 'Order Details', icon: Package },
        { id: 'payment', label: 'Payment', icon: DollarSign },
        { id: 'shipping', label: 'Shipping', icon: Truck },
        { id: 'customer', label: 'Customer', icon: User },
        { id: 'notes', label: 'Notes', icon: MessageSquare }
    ];

    const handleUpdate = async () => {
        try {
            const oldStatus = order.status;
            const orderRef = doc(db, 'orders', order.id);
            await updateDoc(orderRef, {
                ...formData,
                updatedAt: new Date().toISOString()
            });
            
            // Send update email if status changed
            if (oldStatus !== formData.status) {
                try {
                    await sendOrderUpdateEmail(
                        { ...order, ...formData },
                        order.customer,
                        oldStatus,
                        formData.status
                    );
                } catch (emailError) {
                    console.error('Failed to send update email:', emailError);
                }
            }
            
            alert('Order updated successfully!');
            setEditMode(false);
            onUpdate();
        } catch (error) {
            alert('Failed to update order');
        }
    };

    const handlePrint = (type) => {
        window.print();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[300] p-6">
            <div className="bg-white w-full max-w-6xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-black uppercase">Order {order.orderNumber || `#${order.id?.slice(-8)}`}</h2>
                        <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => handlePrint('invoice')} className="p-2 hover:bg-gray-100 rounded">
                            <Printer size={20} />
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b overflow-x-auto">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 font-bold uppercase text-xs whitespace-nowrap flex items-center gap-2 ${
                                    activeTab === tab.id ? 'bg-black text-white' : 'bg-white text-gray-500 hover:text-black'
                                }`}
                            >
                                <Icon size={16} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'details' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-2">Order Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                                        disabled={!editMode}
                                        className="w-full px-4 py-2 border font-bold"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="refunded">Refunded</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-2">Payment Status</label>
                                    <select
                                        value={formData.paymentStatus}
                                        onChange={(e) => setFormData({...formData, paymentStatus: e.target.value})}
                                        disabled={!editMode}
                                        className="w-full px-4 py-2 border font-bold"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="failed">Failed</option>
                                        <option value="refunded">Refunded</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-2">Shipping Status</label>
                                    <select
                                        value={formData.shippingStatus}
                                        onChange={(e) => setFormData({...formData, shippingStatus: e.target.value})}
                                        disabled={!editMode}
                                        className="w-full px-4 py-2 border font-bold"
                                    >
                                        <option value="not-shipped">Not Shipped</option>
                                        <option value="preparing">Preparing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="in-transit">In Transit</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="font-bold uppercase text-sm mb-4">Order Items</h3>
                                <div className="space-y-4">
                                    {order.items?.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 border p-4">
                                            <img src={item.img} alt={item.name} className="w-20 h-20 object-cover bg-gray-100" />
                                            <div className="flex-1">
                                                <p className="font-bold">{item.name}</p>
                                                <p className="text-sm text-gray-500">{item.category}</p>
                                                {item.selectedSize && <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>}
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">${item.price}</p>
                                                <p className="text-xs text-gray-500">Qty: 1</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <div className="max-w-sm ml-auto space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-bold">${order.total}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="font-bold text-green-600">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-black border-t pt-2">
                                        <span>Total</span>
                                        <span>${order.total}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'payment' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs font-bold uppercase text-gray-500 mb-2">Payment Method</p>
                                    <p className="text-lg font-bold">{order.paymentMethod || 'Cash on Delivery'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase text-gray-500 mb-2">Payment Status</p>
                                    <span className={`inline-block px-3 py-1 text-xs font-bold uppercase ${
                                        formData.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                                        formData.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {formData.paymentStatus}
                                    </span>
                                </div>
                            </div>
                            <div className="border-t pt-6">
                                <h3 className="font-bold uppercase text-sm mb-4">Transaction Details</h3>
                                <div className="bg-gray-50 p-4 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Order Total</span>
                                        <span className="font-bold">${order.total}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Payment Date</span>
                                        <span className="font-bold">{formData.paymentStatus === 'paid' ? new Date(order.createdAt).toLocaleDateString() : 'Pending'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'shipping' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-2">Tracking Number</label>
                                    <input
                                        type="text"
                                        value={formData.trackingNumber}
                                        onChange={(e) => setFormData({...formData, trackingNumber: e.target.value})}
                                        disabled={!editMode}
                                        className="w-full px-4 py-2 border"
                                        placeholder="Enter tracking number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase mb-2">Shipping Carrier</label>
                                    <select
                                        value={formData.shippingCarrier}
                                        onChange={(e) => setFormData({...formData, shippingCarrier: e.target.value})}
                                        disabled={!editMode}
                                        className="w-full px-4 py-2 border"
                                    >
                                        <option value="">Select carrier</option>
                                        <option value="fedex">FedEx</option>
                                        <option value="ups">UPS</option>
                                        <option value="dhl">DHL</option>
                                        <option value="usps">USPS</option>
                                    </select>
                                </div>
                            </div>
                            <div className="border-t pt-6">
                                <h3 className="font-bold uppercase text-sm mb-4">Shipping Address</h3>
                                <div className="bg-gray-50 p-4">
                                    <p className="font-bold">{order.customer?.fullName}</p>
                                    <p className="text-sm">{order.customer?.address}</p>
                                    <p className="text-sm">{order.customer?.city}, {order.customer?.zipCode}</p>
                                    <p className="text-sm mt-2">{order.customer?.phone}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'customer' && (
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6">
                                <h3 className="font-bold uppercase text-sm mb-4">Customer Information</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Name</p>
                                        <p className="font-bold">{order.customer?.fullName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Email</p>
                                        <p className="font-bold">{order.customer?.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Phone</p>
                                        <p className="font-bold">{order.customer?.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Address</p>
                                        <p className="font-bold">{order.customer?.address}</p>
                                        <p className="font-bold">{order.customer?.city}, {order.customer?.zipCode}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notes' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2">Internal Notes (Admin Only)</label>
                                <textarea
                                    value={formData.internalNotes}
                                    onChange={(e) => setFormData({...formData, internalNotes: e.target.value})}
                                    disabled={!editMode}
                                    className="w-full px-4 py-3 border"
                                    rows="4"
                                    placeholder="Add internal notes..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2">Customer Notes (Visible to Customer)</label>
                                <textarea
                                    value={formData.customerNotes}
                                    onChange={(e) => setFormData({...formData, customerNotes: e.target.value})}
                                    disabled={!editMode}
                                    className="w-full px-4 py-3 border"
                                    rows="4"
                                    placeholder="Add customer-facing notes..."
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t flex justify-between">
                    <button onClick={onClose} className="px-6 py-3 bg-gray-200 font-bold uppercase text-sm">
                        Close
                    </button>
                    <div className="flex gap-4">
                        {!editMode ? (
                            <button onClick={() => setEditMode(true)} className="px-6 py-3 bg-black text-white font-bold uppercase text-sm">
                                Edit Order
                            </button>
                        ) : (
                            <>
                                <button onClick={() => setEditMode(false)} className="px-6 py-3 bg-gray-200 font-bold uppercase text-sm">
                                    Cancel
                                </button>
                                <button onClick={handleUpdate} className="px-6 py-3 bg-black text-white font-bold uppercase text-sm">
                                    Save Changes
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
