import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, Flame, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProducts } from '../services/productService';

const Nav = ({ onOpenCart }) => {
    const { cart } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogoClick = (e) => {
        if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const products = await getProducts();
        setAllProducts(products);
    };

    useEffect(() => {
        if (searchQuery.trim()) {
            const results = allProducts.filter(p => 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category?.toLowerCase().includes(searchQuery.toLowerCase())
            ).slice(0, 5);
            setSearchResults(results);
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    }, [searchQuery, allProducts]);

    const handleProductClick = (slug) => {
        setSearchQuery('');
        setShowResults(false);
        setMobileMenuOpen(false);
        navigate(`/product/${slug}`);
    };

    const handleNavClick = () => {
        setMobileMenuOpen(false);
    };
    
    return (
        <nav className="fixed w-full top-0 bg-white/95 backdrop-blur-md z-[100] border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center h-16 md:h-20">
            <div className="flex-1 flex items-center">
                <Link to="/" onClick={handleLogoClick} className="text-xl md:text-2xl font-black italic tracking-tighter leading-none cursor-pointer">
                    <span style={{color: '#dc2626'}}>S</span>NEAKR<span style={{color: '#dc2626'}} className="italic">.</span>
                </Link>
            </div>

            <div className="hidden lg:flex flex-1 justify-center space-x-8 text-[13px] font-bold uppercase tracking-tight">
                <Link to="/new-releases" className="hover:text-gray-400 transition">New Releases</Link>
                <Link to="/men" className="hover:text-gray-400 transition">Men</Link>
                <Link to="/women" className="hover:text-gray-400 transition">Women</Link>
                <Link to="/sale" className="hover:text-gray-400 transition text-red-600 flex items-center gap-1">
                    <Flame size={14} fill="currentColor" /> SALE
                </Link>
            </div>

            <div className="flex-1 flex justify-end items-center gap-6">
                <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full group relative">
                    <Search size={18} className="text-gray-400 group-hover:text-black transition" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-24 focus:w-40 transition-all duration-300 outline-none"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="ml-1">
                            <X size={16} className="text-gray-400 hover:text-black" />
                        </button>
                    )}
                    {showResults && searchResults.length > 0 && (
                        <div className="absolute top-full right-0 mt-2 w-96 bg-white border shadow-lg rounded-lg overflow-hidden z-50">
                            {searchResults.map(product => {
                                const hasDiscount = product.salePrice && product.salePrice < product.price;
                                const discountPercent = hasDiscount ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;
                                return (
                                    <button
                                        key={product.id}
                                        onClick={() => handleProductClick(product.slug)}
                                        className="w-full flex items-start gap-4 p-4 hover:bg-gray-50 transition text-left border-b last:border-b-0"
                                    >
                                        <img src={product.img} alt={product.name} className="w-20 h-20 object-cover rounded" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-sm mb-1 truncate">{product.name}</p>
                                            <p className="text-xs text-gray-500 mb-1">{product.brand} • {product.category}</p>
                                            <p className="text-xs text-gray-400 mb-2">{product.color}</p>
                                            <div className="flex items-center gap-2">
                                                {hasDiscount ? (
                                                    <>
                                                        <p className="font-black text-sm">${product.salePrice.toFixed(2)}</p>
                                                        <p className="text-xs text-gray-400 line-through">${product.price.toFixed(2)}</p>
                                                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">-{discountPercent}%</span>
                                                    </>
                                                ) : (
                                                    <p className="font-black text-sm">${product.price}</p>
                                                )}
                                            </div>
                                            {product.stock && (
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                                </p>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
                <button onClick={onOpenCart} className="relative group p-2">
                    <ShoppingCart size={22} strokeWidth={1.5} />
                    {cart.length > 0 && (
                        <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            {cart.length}
                        </span>
                    )}
                </button>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden bg-white border-t overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
            <div className="px-6 py-4 space-y-4">
                <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full outline-none"
                    />
                </div>
                {showResults && searchResults.length > 0 && (
                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                        {searchResults.map(product => (
                            <button
                                key={product.id}
                                onClick={() => handleProductClick(product.slug)}
                                className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 transition text-left border-b last:border-b-0"
                            >
                                <img src={product.img} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                <div className="flex-1">
                                    <p className="font-bold text-sm">{product.name}</p>
                                    <p className="text-xs text-gray-500">${product.salePrice || product.price}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
                <div className="space-y-3 pt-2">
                    <Link to="/new-releases" onClick={handleNavClick} className="block py-2 font-bold uppercase text-sm hover:text-gray-400 transition">
                        New Releases
                    </Link>
                    <Link to="/men" onClick={handleNavClick} className="block py-2 font-bold uppercase text-sm hover:text-gray-400 transition">
                        Men
                    </Link>
                    <Link to="/women" onClick={handleNavClick} className="block py-2 font-bold uppercase text-sm hover:text-gray-400 transition">
                        Women
                    </Link>
                    <Link to="/sale" onClick={handleNavClick} className="block py-2 font-bold uppercase text-sm text-red-600 hover:text-red-400 transition flex items-center gap-2">
                        <Flame size={16} fill="currentColor" /> SALE
                    </Link>
                </div>
            </div>
        </div>
        </nav>
    );
};

export default Nav;
