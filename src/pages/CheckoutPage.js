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

    const handleSuccess = () => {
        alert('Order placed successfully! We will contact you soon.');
        clearCart();
        navigate('/');
    };

    return <Checkout cart={cart} onBack={() => navigate('/')} onSuccess={handleSuccess} />;
};

export default CheckoutPage;
