import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ArrowUp } from 'lucide-react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import NewReleases from './pages/NewReleases';
import Sale from './pages/Sale';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetail from './pages/ProductDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

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
                <BrowserRouter>
                    <Routes>
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
                                        <Route path="/men" element={<Men />} />
                                        <Route path="/women" element={<Women />} />
                                        <Route path="/new-releases" element={<NewReleases />} />
                                        <Route path="/sale" element={<Sale />} />
                                        <Route path="/checkout" element={<CheckoutPage />} />
                                        <Route path="/product/:slug" element={<ProductDetail />} />
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
            </CartProvider>
        </AuthProvider>
    );
}
