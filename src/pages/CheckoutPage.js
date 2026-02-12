import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Checkout from '../components/Checkout';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'SNEAKR. - Checkout';
    }, []);

    const handleSuccess = (order) => {
        navigate('/order-success', { 
            state: { 
                orderNumber: order.orderNumber,
                email: order.customer.email,
                items: order.items,
                total: order.total
            } 
        });
        clearCart();
    };

    return <Checkout cart={cart} onBack={() => navigate('/')} onSuccess={handleSuccess} />;
};

export default CheckoutPage;
