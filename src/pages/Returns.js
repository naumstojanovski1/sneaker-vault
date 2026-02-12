import React from 'react';
import { RotateCcw, Clock, CheckCircle } from 'lucide-react';

const Returns = () => {
    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-black uppercase italic mb-4">Returns & Refunds</h1>
                <p className="text-gray-600 mb-12">Easy 30-day returns on all orders</p>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 border text-center">
                        <Clock className="mx-auto mb-4" size={32} />
                        <h3 className="font-bold uppercase mb-2">30 Days</h3>
                        <p className="text-sm text-gray-600">Return window</p>
                    </div>
                    <div className="bg-white p-6 border text-center">
                        <RotateCcw className="mx-auto mb-4" size={32} />
                        <h3 className="font-bold uppercase mb-2">Free Returns</h3>
                        <p className="text-sm text-gray-600">No questions asked</p>
                    </div>
                    <div className="bg-white p-6 border text-center">
                        <CheckCircle className="mx-auto mb-4" size={32} />
                        <h3 className="font-bold uppercase mb-2">Fast Refund</h3>
                        <p className="text-sm text-gray-600">5-7 business days</p>
                    </div>
                </div>

                <div className="bg-white p-8 border space-y-8">
                    <div>
                        <h2 className="text-2xl font-black uppercase mb-4">Return Policy</h2>
                        <p className="text-gray-600 mb-4">We want you to be completely satisfied with your purchase. If you're not happy, you can return your items within 30 days of delivery.</p>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Items must be unworn and in original condition</li>
                            <li>• Original packaging and tags must be intact</li>
                            <li>• Proof of purchase required</li>
                            <li>• Sale items are final sale</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-black uppercase mb-4">How to Return</h2>
                        <ol className="space-y-4">
                            <li className="flex gap-4">
                                <span className="font-black text-2xl">1</span>
                                <div>
                                    <p className="font-bold">Contact Us</p>
                                    <p className="text-sm text-gray-600">Email us with your order number</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="font-black text-2xl">2</span>
                                <div>
                                    <p className="font-bold">Pack Your Items</p>
                                    <p className="text-sm text-gray-600">Use original packaging if possible</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="font-black text-2xl">3</span>
                                <div>
                                    <p className="font-bold">Ship It Back</p>
                                    <p className="text-sm text-gray-600">Use the prepaid label we provide</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="font-black text-2xl">4</span>
                                <div>
                                    <p className="font-bold">Get Your Refund</p>
                                    <p className="text-sm text-gray-600">Processed within 5-7 business days</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h2 className="text-2xl font-black uppercase mb-4">Exchanges</h2>
                        <p className="text-gray-600">Need a different size? Contact us and we'll help you exchange your item for the perfect fit.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Returns;
