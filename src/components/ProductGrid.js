import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '../services/productService';

// Fallback products if Firebase is not configured yet
const FALLBACK_PRODUCTS = [
    {
        id: 1,
        name: "Air Max Pulse",
        price: 160,
        category: "New Arrivals",
        img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
        color: "Phantom/White",
        status: "New Arrival",
        description: "The next generation of Air Max is here."
    },
    {
        id: 2,
        name: "Jordan Retro 4",
        price: 210,
        category: "Best Sellers",
        img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
        color: "Cement Grey",
        status: "Hype Drop",
        description: "Classic silhouette meets modern materials."
    },
    {
        id: 3,
        name: "Buzz Edition X",
        price: 145,
        category: "Premium Collection",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
        color: "Hyper Royal",
        status: "Limited",
        description: "Street-ready design for the bold."
    },
    {
        id: 4,
        name: "Dunk Low Retro",
        price: 115,
        category: "On Sale",
        img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800",
        color: "Panda Black/White",
        status: "Trending",
        description: "The icon that started it all."
    },
    {
        id: 5,
        name: "Zoom Vomero 5",
        price: 175,
        category: "Best Sellers",
        img: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800",
        color: "Vibrant Orange",
        status: "New",
        description: "Unmatched comfort for the daily run."
    },
    {
        id: 6,
        name: "Metcon 9 Pro",
        price: 150,
        category: "Outlet",
        img: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=800",
        color: "Midnight Blue",
        status: "Stable",
        description: "The gold standard of weightlifting."
    }
];

const ProductGrid = ({ filter = 'all' }) => {
    const [products, setProducts] = useState(FALLBACK_PRODUCTS);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('featured');
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const fetchedProducts = await getProducts();
            if (fetchedProducts.length > 0) {
                setProducts(fetchedProducts);
            }
        } catch (error) {
            console.log('Using fallback products:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = useMemo(() => {
        let filtered = products;
        
        if (filter === 'new-releases') {
            filtered = products.filter(p => p.category === 'New Arrivals');
        } else if (filter === 'men') {
            filtered = products.filter(p => p.forMen === true);
        } else if (filter === 'women') {
            filtered = products.filter(p => p.forWomen === true);
        } else if (filter === 'sale') {
            filtered = products.filter(p => {
                if (!p.salePrice || !p.price) return false;
                const discountPercent = ((p.price - p.salePrice) / p.price) * 100;
                return discountPercent >= 30;
            });
        }
        
        if (activeCategory !== 'All') {
            filtered = filtered.filter(p => p.category === activeCategory);
        }

        // Price filter
        filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Size filter
        if (selectedSizes.length > 0) {
            filtered = filtered.filter(p => 
                p.sizes && p.sizes.some(size => selectedSizes.includes(size))
            );
        }

        // Sorting
        if (sortBy === 'price-low') {
            filtered = [...filtered].sort((a, b) => {
                const priceA = a.salePrice || a.price;
                const priceB = b.salePrice || b.price;
                return priceA - priceB;
            });
        } else if (sortBy === 'price-high') {
            filtered = [...filtered].sort((a, b) => {
                const priceA = a.salePrice || a.price;
                const priceB = b.salePrice || b.price;
                return priceB - priceA;
            });
        } else if (sortBy === 'discount') {
            filtered = [...filtered].filter(p => p.salePrice).sort((a, b) => 
                ((b.price - b.salePrice) / b.price) - ((a.price - a.salePrice) / a.price)
            );
        }
        
        return filtered;
    }, [activeCategory, products, filter, sortBy, priceRange, selectedSizes]);

    const categories = ['All', ...new Set(products.map(p => p.category))];
    const allSizes = [...new Set(products.flatMap(p => p.sizes || []))].sort();

    const toggleSize = (size) => {
        setSelectedSizes(prev => 
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    return (
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                <div className="flex flex-wrap gap-4">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition border ${
                                activeCategory === cat
                                    ? 'bg-black text-white border-black'
                                    : 'bg-transparent text-gray-400 border-gray-200 hover:border-black hover:text-black'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="flex gap-4 items-center">
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-6 py-2 border-2 border-black font-bold uppercase text-xs hover:bg-black hover:text-white transition"
                    >
                        {showFilters ? 'Hide' : 'Show'} Filters
                    </button>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border-2 border-black font-bold text-xs uppercase"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="discount">Biggest Discount</option>
                    </select>
                </div>
            </div>

            {showFilters && (
                <div className="bg-gray-50 p-6 mb-8 border">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <p className="font-bold uppercase text-xs mb-3">Price Range</p>
                            <div className="space-y-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="500"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                                    className="w-full"
                                />
                                <p className="text-sm font-bold">${priceRange[0]} - ${priceRange[1]}</p>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <p className="font-bold uppercase text-xs mb-3">Sizes</p>
                            <div className="flex flex-wrap gap-2">
                                {allSizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => toggleSize(size)}
                                        className={`px-4 py-2 text-xs font-bold border transition ${
                                            selectedSizes.includes(size)
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-black border-gray-300 hover:border-black'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            setPriceRange([0, 500]);
                            setSelectedSizes([]);
                        }}
                        className="mt-4 text-xs font-bold uppercase underline hover:text-red-600"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}

            {loading ? (
                <div className="text-center py-20">
                    <p className="text-gray-400 uppercase text-sm tracking-widest">Loading products...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProductGrid;
