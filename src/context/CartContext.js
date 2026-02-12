import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prev => {
            const existingIndex = prev.findIndex(item => 
                item.id === product.id && item.selectedSize === product.selectedSize
            );
            if (existingIndex > -1) {
                const newCart = [...prev];
                newCart[existingIndex] = {
                    ...newCart[existingIndex],
                    quantity: (newCart[existingIndex].quantity || 1) + 1
                };
                return newCart;
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id, selectedSize, quantity) => {
        if (quantity < 1) return;
        setCart(prev => prev.map(item => 
            item.id === id && item.selectedSize === selectedSize
                ? { ...item, quantity }
                : item
        ));
    };

    const removeFromCart = (id, selectedSize) => {
        setCart(prev => prev.filter(item => 
            !(item.id === id && item.selectedSize === selectedSize)
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
