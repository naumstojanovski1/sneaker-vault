import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../services/productService';
import { getBrands } from '../../services/brandService';
import SEO from '../../components/SEO';
import { SlidersHorizontal, ChevronRight } from 'lucide-react';

const Shoes = () => {
    const [products, setProducts] = useState([]);
    const [allBrands, setAllBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('featured');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedGenders, setSelectedGenders] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [showFilters, setShowFilters] = useState(false);
    const [displayCount, setDisplayCount] = useState(12);

    useEffect(() => {
        loadProducts();
        loadBrands();
    }, []);

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data.filter(p => p.status === 'published' && p.type === 'Shoes'));
        setLoading(false);
    };

    const loadBrands = async () => {
        try {
            const data = await getBrands();
            setAllBrands(data.map(b => b.name).sort());
        } catch (error) {
            console.error(error);
        }
    };

    const availableBrands = useMemo(() => {
        return allBrands.length > 0 ? allBrands : [...new Set(products.map(p => p.brand).filter(Boolean))].sort();
    }, [allBrands, products]);

    const filteredProducts = useMemo(() => {
        let filtered = products;

        if (selectedBrands.length > 0) {
            filtered = filtered.filter(p => selectedBrands.includes(p.brand));
        }

        if (selectedGenders.length > 0) {
            filtered = filtered.filter(p => 
                (selectedGenders.includes('Men') && p.forMen) || 
                (selectedGenders.includes('Women') && p.forWomen)
            );
        }

        filtered = filtered.filter(p => {
            const price = p.salePrice || p.price;
            return price >= priceRange[0] && price <= priceRange[1];
        });

        if (sortBy === 'price-low') {
            filtered = [...filtered].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        } else if (sortBy === 'price-high') {
            filtered = [...filtered].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        } else if (sortBy === 'newest') {
            filtered = [...filtered].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        }

        return filtered;
    }, [products, selectedBrands, selectedGenders, priceRange, sortBy]);

    const toggleBrand = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const toggleGender = (gender) => {
        setSelectedGenders(prev =>
            prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
        );
    };

    return (
        <div className="pt-20">
            <SEO title="All Shoes" description="Shop all shoes collection" />
            
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Link to="/" className="hover:text-black">Home</Link>
                    <ChevronRight size={16} />
                    <span className="text-black font-bold">Shoes</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-2">
                    All <span className="text-red-600">Shoes</span>
                </h1>
                <p className="text-gray-500 mb-6">{filteredProducts.length} Products</p>

                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 border font-bold text-sm uppercase hover:bg-black hover:text-white transition"
                    >
                        <SlidersHorizontal size={16} />
                        Filters {(selectedBrands.length + selectedGenders.length) > 0 && `(${selectedBrands.length + selectedGenders.length})`}
                    </button>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border font-bold text-xs uppercase bg-white"
                    >
                        <option value="featured">Featured</option>
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>

                {showFilters && (
                    <div className="bg-gray-50 p-6 mb-8 border">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="font-black uppercase text-sm mb-4">Gender</h3>
                                <div className="space-y-2">
                                    {['Men', 'Women'].map(gender => (
                                        <label key={gender} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedGenders.includes(gender)}
                                                onChange={() => toggleGender(gender)}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-sm">{gender}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-black uppercase text-sm mb-4">Brand</h3>
                                <div className="space-y-2">
                                    {availableBrands.map(brand => (
                                        <label key={brand} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => toggleBrand(brand)}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-sm">{brand}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-black uppercase text-sm mb-4">Price Range</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="number"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                                            className="w-24 px-3 py-2 border"
                                            placeholder="Min"
                                        />
                                        <span>-</span>
                                        <input
                                            type="number"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                                            className="w-24 px-3 py-2 border"
                                            placeholder="Max"
                                        />
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedBrands([]);
                                            setSelectedGenders([]);
                                            setPriceRange([0, 500]);
                                        }}
                                        className="text-sm underline hover:no-underline"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 uppercase text-sm">Loading...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 uppercase text-sm">No products found</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-x-8 md:gap-y-16">
                            {filteredProducts.slice(0, displayCount).map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        {displayCount < filteredProducts.length && (
                            <div className="text-center mt-12">
                                <button
                                    onClick={() => setDisplayCount(prev => prev + 12)}
                                    className="bg-black text-white px-12 py-4 rounded-full font-black uppercase text-sm hover:scale-105 transition"
                                >
                                    Show More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Shoes;
