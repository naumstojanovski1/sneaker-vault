import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { CheckCircle, XCircle } from 'lucide-react';

const CancelOrder = () => {
    const { orderNumber } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        document.title = 'SNEAKR. - Cancel Order';
        loadOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderNumber]);

    const loadOrder = async () => {
        try {
            const q = query(collection(db, 'orders'), where('orderNumber', '==', orderNumber));
            const snapshot = await getDocs(q);
            
            if (!snapshot.empty) {
                const orderData = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
                setOrder(orderData);
                
                if (orderData.status === 'cancelled') {
                    setCancelled(true);
                }
            } else {
                setError('Order not found');
            }
        } catch (err) {
            setError('Failed to load order');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (!window.confirm('Are you sure you want to cancel this order?')) {
            return;
        }

        setCancelling(true);
        try {
            const orderRef = doc(db, 'orders', order.id);
            await updateDoc(orderRef, {
                status: 'cancelled',
                cancelledAt: new Date().toISOString()
            });
            setCancelled(true);
        } catch (err) {
            alert('Failed to cancel order. Please contact support.');
        } finally {
            setCancelling(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <p className="text-xl font-bold uppercase">Loading...</p>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="text-center">
                    <XCircle size={64} className="mx-auto mb-4 text-red-600" />
                    <h1 className="text-2xl font-black uppercase mb-4">Order Not Found</h1>
                    <p className="text-gray-500 mb-6">{error || 'The order you are looking for does not exist.'}</p>
                    <button onClick={() => navigate('/')} className="bg-black text-white px-6 py-3 font-bold uppercase text-sm">
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    if (cancelled) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="text-center max-w-md">
                    <CheckCircle size={64} className="mx-auto mb-4 text-green-600" />
                    <h1 className="text-2xl font-black uppercase mb-4">Order Cancelled</h1>
                    <p className="text-gray-500 mb-2">Order {order.orderNumber} has been cancelled.</p>
                    <p className="text-gray-500 mb-6">You will receive a confirmation email shortly.</p>
                    <button onClick={() => navigate('/')} className="bg-black text-white px-6 py-3 font-bold uppercase text-sm">
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    if (order.status === 'shipped' || order.status === 'delivered' || order.status === 'completed') {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="text-center max-w-md">
                    <XCircle size={64} className="mx-auto mb-4 text-red-600" />
                    <h1 className="text-2xl font-black uppercase mb-4">Cannot Cancel Order</h1>
                    <p className="text-gray-500 mb-6">This order has already been {order.status} and cannot be cancelled. Please contact support for assistance.</p>
                    <button onClick={() => navigate('/')} className="bg-black text-white px-6 py-3 font-bold uppercase text-sm">
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="max-w-2xl mx-auto px-6 py-12">
                <h1 className="text-3xl md:text-4xl font-black uppercase italic mb-8">Cancel Order</h1>
                
                <div className="bg-white p-6 border mb-6">
                    <h2 className="text-xl font-black uppercase mb-4">Order Details</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Order Number:</span>
                            <span className="font-bold">{order.orderNumber}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Order Date:</span>
                            <span className="font-bold">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Status:</span>
                            <span className="font-bold uppercase">{order.status}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Total:</span>
                            <span className="font-bold">${order.total}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 border mb-6">
                    <h3 className="font-bold uppercase text-sm mb-4">Items</h3>
                    <div className="space-y-3">
                        {order.items?.map((item, idx) => (
                            <div key={idx} className="flex gap-4">
                                <img src={item.img} alt={item.name} className="w-16 h-16 object-cover bg-gray-100" />
                                <div className="flex-1">
                                    <p className="font-bold text-sm">{item.name}</p>
                                    <p className="text-xs text-gray-500">{item.category}</p>
                                </div>
                                <p className="font-bold">${item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-6 mb-6">
                    <p className="text-sm text-yellow-800">
                        <strong>Warning:</strong> Cancelling this order cannot be undone. If you change your mind, you will need to place a new order.
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="flex-1 px-6 py-4 bg-gray-200 text-black font-bold uppercase text-sm"
                    >
                        Keep Order
                    </button>
                    <button
                        onClick={handleCancel}
                        disabled={cancelling}
                        className="flex-1 px-6 py-4 bg-red-600 text-white font-bold uppercase text-sm disabled:opacity-50"
                    >
                        {cancelling ? 'Cancelling...' : 'Cancel Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelOrder;
