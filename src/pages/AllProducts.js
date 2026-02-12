import React from 'react';
import ProductGrid from '../components/ProductGrid';
import SEO from '../components/SEO';

const AllProducts = () => {
    return (
        <div className="pt-20">
            <SEO 
                title="All Products"
                description="Explore our complete collection of sneakers, streetwear, and accessories."
                keywords="all products, shop all, sneakers, streetwear, accessories"
            />
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
                <h1 className="text-4xl md:text-6xl font-black uppercase italic mb-4">ALL PRODUCTS</h1>
                <p className="text-gray-500 text-lg mb-8">Explore our complete collection</p>
            </div>
            <ProductGrid filter="all" />
        </div>
    );
};

export default AllProducts;
