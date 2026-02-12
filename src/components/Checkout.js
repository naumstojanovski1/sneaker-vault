import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { createOrder } from '../services/orderService';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';

const Checkout = ({ cart, onBack, onSuccess }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showToast } = useToast();

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const order = await createOrder({
                items: cart,
                total,
                customer: formData,
                paymentMethod: 'Cash on Delivery'
            });
            
            // Update stock for each product
            for (const item of cart) {
                const productRef = doc(db, 'products', item.id);
                await updateDoc(productRef, {
                    stock: increment(-(item.quantity || 1))
                });
            }
            
            onSuccess(order);
        } catch (error) {
            showToast('Failed to place order. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
                <button onClick={onBack} className="flex items-center gap-2 mb-8 font-bold uppercase text-sm hover:text-gray-600 transition">
                    <ArrowLeft size={18} /> Back to Home
                </button>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black uppercase italic mb-8">Checkout</h1>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Phone</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Address</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.address}
                                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                                    className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none transition"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest mb-2">City</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.city}
                                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                                        className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest mb-2">Zip Code</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.zipCode}
                                        onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                                        className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none transition"
                                    />
                                </div>
                            </div>

                            <div className="bg-black text-white p-6 mt-8">
                                <p className="text-sm font-bold uppercase tracking-widest mb-2">Payment Method</p>
                                <p className="text-2xl font-black italic">Cash on Delivery</p>
                                <p className="text-xs text-gray-400 mt-2">Pay when you receive your order</p>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-black text-white py-5 rounded-full font-black uppercase text-sm tracking-widest hover:opacity-90 transition disabled:opacity-50"
                            >
                                {isSubmitting ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </form>
                    </div>

                    <div className="bg-white p-8 h-fit sticky top-24">
                        <h2 className="text-xl font-black uppercase mb-6">Order Summary</h2>
                        
                        <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex gap-4 pb-4 border-b last:border-0">
                                    <Link to={`/product/${item.productCode}`} className="w-20 h-20 bg-gray-100 flex-shrink-0 hover:opacity-75 transition">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                    </Link>
                                    <div className="flex-1">
                                        <Link to={`/product/${item.productCode}`} className="hover:underline">
                                            <p className="font-bold text-sm uppercase">{item.name}</p>
                                        </Link>
                                        {item.brand && <p className="text-xs text-gray-400 uppercase mt-1">{item.brand}</p>}
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <p className="text-xs text-gray-500 uppercase">{item.type}</p>
                                            {item.category && <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 uppercase">{item.category}</span>}
                                        </div>
                                        {item.sku && <p className="text-xs text-gray-400 mt-0.5">{item.sku}</p>}
                                        {item.selectedSize && <p className="text-xs text-gray-500 mt-1">Size: {item.selectedSize}</p>}
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                                            <p className="font-bold">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Shipping</span>
                                <span className="text-green-600 font-bold">FREE</span>
                            </div>
                            <div className="flex justify-between text-xl font-black pt-4 border-t">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
