import React from 'react';
import { Truck, Clock, MapPin } from 'lucide-react';

const Shipping = () => {
    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-black uppercase italic mb-4">Shipping & Delivery</h1>
                <p className="text-gray-600 mb-12">Fast, reliable delivery to your door</p>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 border text-center">
                        <Truck className="mx-auto mb-4" size={32} />
                        <h3 className="font-bold uppercase mb-2">Free Shipping</h3>
                        <p className="text-sm text-gray-600">On orders over $150</p>
                    </div>
                    <div className="bg-white p-6 border text-center">
                        <Clock className="mx-auto mb-4" size={32} />
                        <h3 className="font-bold uppercase mb-2">Fast Delivery</h3>
                        <p className="text-sm text-gray-600">2-4 business days</p>
                    </div>
                    <div className="bg-white p-6 border text-center">
                        <MapPin className="mx-auto mb-4" size={32} />
                        <h3 className="font-bold uppercase mb-2">Track Order</h3>
                        <p className="text-sm text-gray-600">Real-time tracking</p>
                    </div>
                </div>

                <div className="bg-white p-8 border space-y-8">
                    <div>
                        <h2 className="text-2xl font-black uppercase mb-4">Delivery Options</h2>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 font-bold uppercase text-sm">Method</th>
                                    <th className="text-left py-3 font-bold uppercase text-sm">Time</th>
                                    <th className="text-left py-3 font-bold uppercase text-sm">Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-4">Standard Delivery</td>
                                    <td className="py-4">3-5 business days</td>
                                    <td className="py-4 font-bold">$5.99</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-4">Express Delivery</td>
                                    <td className="py-4">1-2 business days</td>
                                    <td className="py-4 font-bold">$12.99</td>
                                </tr>
                                <tr>
                                    <td className="py-4">Free Shipping</td>
                                    <td className="py-4">3-5 business days</td>
                                    <td className="py-4 font-bold text-green-600">FREE (over $150)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <h2 className="text-2xl font-black uppercase mb-4">Processing Time</h2>
                        <p className="text-gray-600">Orders are processed within 1-2 business days. Orders placed on weekends will be processed on the next business day.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-black uppercase mb-4">Shipping Partners</h2>
                        <p className="text-gray-600">We work with trusted carriers including FedEx, UPS, and USPS to ensure your order arrives safely.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
