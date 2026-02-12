import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Mail, Home } from 'lucide-react';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const orderData = location.state;

    useEffect(() => {
        if (!orderData) {
            navigate('/');
        }
    }, [orderData, navigate]);

    if (!orderData) return null;

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="bg-white p-8 md:p-12">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="text-green-600" size={48} />
                        </div>
                        <h1 className="text-4xl font-black uppercase italic mb-2">Order Confirmed!</h1>
                        <p className="text-gray-600">Thank you for your order. We'll contact you soon.</p>
                    </div>

                    <div className="bg-gray-50 p-6 mb-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-3">
                                <Package size={24} className="text-gray-600" />
                                <div>
                                    <p className="text-xs font-bold uppercase text-gray-500">Order Number</p>
                                    <p className="text-xl font-black">{orderData.orderNumber}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={24} className="text-gray-600" />
                                <div>
                                    <p className="text-xs font-bold uppercase text-gray-500">Confirmation Sent To</p>
                                    <p className="font-bold text-sm">{orderData.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-black uppercase text-sm mb-6 pb-3 border-b">Order Summary</h3>
                        <div className="space-y-6 mb-6">
                            {orderData.items?.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold uppercase text-sm mb-1">{item.name}</p>
                                        {item.brand && <p className="text-xs text-gray-400 uppercase">{item.brand}</p>}
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-xs text-gray-500 uppercase">{item.type}</p>
                                            {item.category && <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 uppercase">{item.category}</span>}
                                        </div>
                                        {item.sku && <p className="text-xs text-gray-400 mt-1">{item.sku}</p>}
                                        {item.selectedSize && <p className="text-xs text-gray-500 mt-1">Size: {item.selectedSize}</p>}
                                        <div className="flex items-center justify-between mt-3">
                                            <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                                            <p className="font-black text-lg">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-bold">${orderData.total?.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="text-green-600 font-bold">FREE</span>
                            </div>
                            <div className="flex justify-between text-2xl font-black pt-3 border-t">
                                <span>Total</span>
                                <span>${orderData.total?.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-black text-white py-4 rounded-full font-bold uppercase text-sm flex items-center justify-center gap-2 hover:opacity-90 transition"
                        >
                            <Home size={18} /> Continue Shopping
                        </button>
                        <button
                            onClick={() => navigate('/order-status')}
                            className="w-full border-2 border-black py-4 rounded-full font-bold uppercase text-sm hover:bg-black hover:text-white transition"
                        >
                            Track Your Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
