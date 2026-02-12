import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle } from 'lucide-react';

const OrderStatus = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [email, setEmail] = useState('');

    const handleTrack = (e) => {
        e.preventDefault();
        alert('Order tracking feature coming soon!');
    };

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="max-w-2xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-black uppercase italic mb-4">Track Your Order</h1>
                <p className="text-gray-600 mb-8">Enter your order details to track your shipment</p>

                <form onSubmit={handleTrack} className="bg-white p-8 border space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase mb-2">Order Number</label>
                        <input
                            type="text"
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                            placeholder="e.g. ORD-12345"
                            className="w-full px-4 py-3 border focus:border-black outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 border focus:border-black outline-none"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-4 font-bold uppercase text-sm flex items-center justify-center gap-2">
                        <Search size={18} /> Track Order
                    </button>
                </form>

                <div className="mt-12 bg-white p-8 border">
                    <h2 className="text-xl font-black uppercase mb-6">Order Timeline</h2>
                    <div className="space-y-6">
                        {[
                            { icon: Package, label: 'Order Received', active: true },
                            { icon: Package, label: 'Processing', active: true },
                            { icon: Truck, label: 'Shipped', active: false },
                            { icon: Truck, label: 'Out for Delivery', active: false },
                            { icon: CheckCircle, label: 'Delivered', active: false }
                        ].map((step, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <step.icon className={step.active ? 'text-black' : 'text-gray-300'} size={24} />
                                <span className={`font-bold ${step.active ? 'text-black' : 'text-gray-300'}`}>{step.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderStatus;
