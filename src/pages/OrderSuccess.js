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
            <div className="max-w-2xl mx-auto px-6 py-12">
                <div className="bg-white border p-8 md:p-12 text-center">
                    <CheckCircle className="mx-auto mb-6 text-green-600" size={80} />
                    
                    <h1 className="text-4xl font-black uppercase italic mb-4">Order Confirmed!</h1>
                    <p className="text-gray-600 mb-8">Thank you for your order. We'll contact you soon.</p>

                    <div className="bg-gray-50 p-6 mb-8 text-left">
                        <div className="flex items-center gap-3 mb-4">
                            <Package size={24} />
                            <div>
                                <p className="text-xs font-bold uppercase text-gray-500">Order Number</p>
                                <p className="text-2xl font-black">{orderData.orderNumber}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={24} />
                            <div>
                                <p className="text-xs font-bold uppercase text-gray-500">Confirmation Sent To</p>
                                <p className="font-bold">{orderData.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-6 mb-8">
                        <h3 className="font-bold uppercase text-sm mb-4">Order Summary</h3>
                        <div className="space-y-3 mb-4">
                            {orderData.items?.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                    <span>{item.name}</span>
                                    <span className="font-bold">${item.price}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4 flex justify-between text-xl font-black">
                            <span>Total</span>
                            <span>${orderData.total}</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-black text-white py-4 font-bold uppercase text-sm flex items-center justify-center gap-2"
                        >
                            <Home size={18} /> Continue Shopping
                        </button>
                        <button
                            onClick={() => navigate('/order-status')}
                            className="w-full border-2 border-black py-4 font-bold uppercase text-sm"
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
