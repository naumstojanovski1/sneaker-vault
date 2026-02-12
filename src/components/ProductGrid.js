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

const ProductGrid = ({ filter = 'all', limit = null }) => {
    const [products, setProducts] = useState(FALLBACK_PRODUCTS);
    const [activeType, setActiveType] = useState('All');
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('featured');

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
        
        // Filter out draft products
        filtered = filtered.filter(p => p.status === 'published');
        
        // Type filter (Shoes, Clothing, Accessories)
        if (activeType !== 'All') {
            filtered = filtered.filter(p => p.type === activeType);
        }
        
        if (filter === 'new-releases') {
            filtered = filtered.filter(p => p.category === 'New Arrivals');
        } else if (filter === 'men') {
            filtered = filtered.filter(p => p.forMen === true);
        } else if (filter === 'women') {
            filtered = filtered.filter(p => p.forWomen === true);
        } else if (filter === 'sale') {
            filtered = filtered.filter(p => {
                if (!p.salePrice || !p.price) return false;
                const discountPercent = ((p.price - p.salePrice) / p.price) * 100;
                return discountPercent >= 30;
            });
        } else if (filter === 'tech-fleece') {
            filtered = filtered.filter(p => p.type === 'Clothing' && p.name.toLowerCase().includes('fleece'));
        } else if (filter === 'air-max') {
            filtered = filtered.filter(p => p.type === 'Shoes' && p.name.toLowerCase().includes('air'));
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
    }, [activeType, products, filter, sortBy]);

    const types = ['All', 'Shoes', 'Clothing', 'Accessories'];

    return (
        <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    {types.map(type => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`px-4 md:px-6 py-2 text-xs md:text-sm font-bold uppercase transition whitespace-nowrap ${
                                activeType === type
                                    ? 'text-black border-b-2 border-black'
                                    : 'text-gray-400 hover:text-black'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 md:px-4 py-2 border font-bold text-xs uppercase bg-white w-full md:w-auto"
                >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center py-20">
                    <p className="text-gray-400 uppercase text-sm tracking-widest">Loading products...</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-x-8 md:gap-y-16">
                        {(limit ? filteredProducts.slice(0, limit) : filteredProducts).map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                    {limit && filteredProducts.length > limit && (
                        <div className="text-center mt-12">
                            <a href="/collection/all-products" className="inline-block bg-black text-white px-12 py-4 rounded-full font-black uppercase text-sm hover:scale-105 transition">
                                See More
                            </a>
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default ProductGrid;
