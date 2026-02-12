import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, Flame, X, ChevronDown } from 'lucide-react';
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
    const [menDropdown, setMenDropdown] = useState(false);
    const [womenDropdown, setWomenDropdown] = useState(false);
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

            <div className="hidden lg:flex flex-1 justify-center space-x-6 text-[13px] font-bold uppercase tracking-tight">
                <Link to="/collection/new-releases" className="hover:text-gray-400 transition whitespace-nowrap">NEW RELEASES</Link>
                <Link to="/collection/all-products" className="hover:text-gray-400 transition whitespace-nowrap">ALL PRODUCTS</Link>
                
                <div className="relative group">
                    <Link to="/collection/men/all" className="hover:text-gray-400 transition flex items-center gap-1">
                        MEN <ChevronDown size={14} />
                    </Link>
                    <div className="absolute top-full left-0 mt-2 bg-white border shadow-lg w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        <Link to="/collection/men/shoes" className="block px-6 py-3 hover:bg-gray-50 text-xs">Shoes</Link>
                        <Link to="/collection/men/clothing" className="block px-6 py-3 hover:bg-gray-50 text-xs">Clothing</Link>
                        <Link to="/collection/men/accessories" className="block px-6 py-3 hover:bg-gray-50 text-xs">Accessories</Link>
                        <Link to="/collection/men/all" className="block px-6 py-3 hover:bg-gray-50 text-xs font-black">View All</Link>
                    </div>
                </div>

                <div className="relative group">
                    <Link to="/collection/women/all" className="hover:text-gray-400 transition flex items-center gap-1">
                        WOMEN <ChevronDown size={14} />
                    </Link>
                    <div className="absolute top-full left-0 mt-2 bg-white border shadow-lg w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        <Link to="/collection/women/shoes" className="block px-6 py-3 hover:bg-gray-50 text-xs">Shoes</Link>
                        <Link to="/collection/women/clothing" className="block px-6 py-3 hover:bg-gray-50 text-xs">Clothing</Link>
                        <Link to="/collection/women/accessories" className="block px-6 py-3 hover:bg-gray-50 text-xs">Accessories</Link>
                        <Link to="/collection/women/all" className="block px-6 py-3 hover:bg-gray-50 text-xs font-black">View All</Link>
                    </div>
                </div>

                <Link to="/collection/sale" className="hover:text-gray-400 transition text-red-600 flex items-center gap-1">
                    <Flame size={14} fill="currentColor" /> SALE
                </Link>
            </div>

            <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
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
                    <ShoppingCart size={20} strokeWidth={1.5} className="md:w-[22px] md:h-[22px]" />
                    {cart.length > 0 && (
                        <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            {cart.length}
                        </span>
                    )}
                </button>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2">
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
                    <Link to="/collection/new-releases" onClick={handleNavClick} className="block py-2 font-bold uppercase text-sm hover:text-gray-400 transition">
                        NEW RELEASES
                    </Link>
                    <Link to="/collection/all-products" onClick={handleNavClick} className="block py-2 font-bold uppercase text-sm hover:text-gray-400 transition">
                        ALL PRODUCTS
                    </Link>
                    
                    <div className="relative">
                        <div className="flex items-center justify-between">
                            <Link to="/collection/men/all" onClick={handleNavClick} className="flex-1 py-2 font-bold uppercase text-sm hover:text-gray-400 transition">
                                MEN
                            </Link>
                            <button onClick={(e) => { e.stopPropagation(); setMenDropdown(!menDropdown); }} className="p-2">
                                <ChevronDown size={16} className={`transition-transform ${menDropdown ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                        {menDropdown && (
                            <div className="pl-4 space-y-2 mt-2">
                                <Link to="/collection/men/shoes" onClick={handleNavClick} className="block py-1 text-sm">Shoes</Link>
                                <Link to="/collection/men/clothing" onClick={handleNavClick} className="block py-1 text-sm">Clothing</Link>
                                <Link to="/collection/men/accessories" onClick={handleNavClick} className="block py-1 text-sm">Accessories</Link>
                                <Link to="/collection/men/all" onClick={handleNavClick} className="block py-1 text-sm font-bold">View All</Link>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <div className="flex items-center justify-between">
                            <Link to="/collection/women/all" onClick={handleNavClick} className="flex-1 py-2 font-bold uppercase text-sm hover:text-gray-400 transition">
                                WOMEN
                            </Link>
                            <button onClick={(e) => { e.stopPropagation(); setWomenDropdown(!womenDropdown); }} className="p-2">
                                <ChevronDown size={16} className={`transition-transform ${womenDropdown ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                        {womenDropdown && (
                            <div className="pl-4 space-y-2 mt-2">
                                <Link to="/collection/women/shoes" onClick={handleNavClick} className="block py-1 text-sm">Shoes</Link>
                                <Link to="/collection/women/clothing" onClick={handleNavClick} className="block py-1 text-sm">Clothing</Link>
                                <Link to="/collection/women/accessories" onClick={handleNavClick} className="block py-1 text-sm">Accessories</Link>
                                <Link to="/collection/women/all" onClick={handleNavClick} className="block py-1 text-sm font-bold">View All</Link>
                            </div>
                        )}
                    </div>

                    <Link to="/collection/sale" onClick={handleNavClick} className="block py-2 font-bold uppercase text-sm text-red-600 hover:text-red-400 transition flex items-center gap-2">
                        <Flame size={16} fill="currentColor" /> SALE
                    </Link>
                </div>
            </div>
        </div>
        </nav>
    );
};

export default Nav;
