import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ConfirmProvider } from './context/ConfirmContext';
import { ArrowUp } from 'lucide-react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Shoes from './pages/collections/Shoes';
import Clothing from './pages/collections/Clothing';
import AllProducts from './pages/collections/AllProducts';
import Home from './pages/Home';
import Collection from './pages/collections/Collection';
import NewReleases from './pages/collections/NewReleases';
import Sale from './pages/collections/Sale';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetail from './pages/ProductDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import OrderStatus from './pages/OrderStatus';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Contact from './pages/Contact';
import About from './pages/About';
import News from './pages/News';
import Careers from './pages/Careers';
import Sustainability from './pages/Sustainability';
import BlogLogin from './pages/BlogLogin';
import BlogDashboard from './pages/BlogDashboard';
import NewsArticle from './pages/NewsArticle';
import OrderSuccess from './pages/OrderSuccess';
import CancelOrder from './pages/CancelOrder';
import NotFound from './pages/NotFound';

function PageTransition({ children }) {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-white z-[200] flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-3xl font-black italic animate-pulse mb-4">
                            <span className="text-red-600">S</span>NEAKR<span className="text-red-600">.</span>
                        </div>
                        <div className="flex justify-center gap-2">
                            <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                </div>
            )}
            <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                {children}
            </div>
        </>
    );
}

export default function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AuthProvider>
            <CartProvider>
                <ToastProvider>
                    <ConfirmProvider>
                        <HelmetProvider>
                            <BrowserRouter>
                    <Routes>
                        <Route path="/blog" element={<BlogLogin />} />
                        <Route path="/blog/dashboard" element={<BlogDashboard />} />
                        <Route path="/admin" element={<AdminLogin />} />
                        <Route path="/admin/dashboard" element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/order/:orderNumber/cancel" element={<CancelOrder />} />
                        <Route path="/*" element={
                            <PageTransition>
                                <div className="bg-white min-h-screen font-sans selection:bg-black selection:text-white">
                                    <Nav onOpenCart={() => setIsCartOpen(true)} />
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/terms-of-service" element={<TermsOfService />} />
                                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                        <Route path="/collection/shoes" element={<Shoes />} />
                                        <Route path="/collection/clothing" element={<Clothing />} />
                                        <Route path="/collection/all-products" element={<AllProducts />} />
                                        <Route path="/collection/new-releases" element={<NewReleases />} />
                                        <Route path="/collection/sale" element={<Sale />} />
                                        <Route path="/collection/:gender/:category" element={<Collection />} />
                                        <Route path="/checkout" element={<CheckoutPage />} />
                                        <Route path="/product/:productCode" element={<ProductDetail />} />
                                        <Route path="/order-status" element={<OrderStatus />} />
                                        <Route path="/shipping" element={<Shipping />} />
                                        <Route path="/returns" element={<Returns />} />
                                        <Route path="/contact" element={<Contact />} />
                                        <Route path="/about" element={<About />} />
                                        <Route path="/news" element={<News />} />
                                        <Route path="/news/:id" element={<NewsArticle />} />
                                        <Route path="/careers" element={<Careers />} />
                                        <Route path="/sustainability" element={<Sustainability />} />
                                        <Route path="/order-success" element={<OrderSuccess />} />
                                        <Route path="*" element={<NotFound />} />
                                    </Routes>
                                    <Footer />
                                    <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                                    {showBackToTop && (
                                        <button
                                            onClick={scrollToTop}
                                            className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition z-50"
                                            aria-label="Back to top"
                                        >
                                            <ArrowUp size={24} />
                                        </button>
                                    )}
                                    <style>{`
                                    @keyframes marquee {
                                        0% { transform: translateX(0); }
                                        100% { transform: translateX(-50%); }
                                    }
                                    .animate-marquee {
                                        display: flex;
                                        animation: marquee 30s linear infinite;
                                        width: fit-content;
                                    }
                                    .animate-fade-in {
                                        animation: fadeIn 0.4s ease-out forwards;
                                    }
                                    @keyframes fadeIn {
                                        from { opacity: 0; transform: translateY(10px); }
                                        to { opacity: 1; transform: translateY(0); }
                                    }
                                    `}</style>
                                </div>
                            </PageTransition>
                        } />
                    </Routes>
                </BrowserRouter>
                </HelmetProvider>
                    </ConfirmProvider>
                </ToastProvider>
            </CartProvider>
        </AuthProvider>
    );
}
