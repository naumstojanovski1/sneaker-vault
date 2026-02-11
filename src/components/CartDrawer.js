import React from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();
    const total = cart.reduce((acc, item) => acc + item.price, 0);

    const handleCheckout = () => {
        onClose();
        navigate('/checkout');
    };

    return (
        <>
            <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
            <div className={`fixed right-0 top-0 h-full w-full max-w-[450px] bg-white z-[201] transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 md:p-8 flex justify-between items-center border-b">
                    <h2 className="text-2xl font-black uppercase tracking-tight">Your Bag ({cart.length})</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition"><X size={24} /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <ShoppingCart size={24} className="text-gray-400" />
                            </div>
                            <p className="font-bold text-gray-500 uppercase text-xs tracking-widest">There are no items in your bag.</p>
                        </div>
                    ) : (
                        cart.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="flex gap-6 animate-fade-in">
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 flex-shrink-0">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between">
                                            <h4 className="font-bold uppercase text-sm md:text-base">{item.name}</h4>
                                            <p className="font-bold">${item.price}</p>
                                        </div>
                                        <p className="text-xs text-gray-500 uppercase mt-1">{item.category}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-[10px] font-bold underline uppercase tracking-widest text-gray-400 hover:text-black text-left"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 md:p-8 border-t bg-gray-50 space-y-4">
                        <div className="flex justify-between font-bold text-lg">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 uppercase leading-relaxed">
                            Standard Shipping: Free on orders over $150. Delivery within 2-4 business days.
                        </p>
                        <button 
                            onClick={handleCheckout}
                            className="w-full bg-black text-white py-5 rounded-full font-black uppercase text-sm tracking-widest hover:opacity-90 transition"
                        >
                            Checkout Now
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
