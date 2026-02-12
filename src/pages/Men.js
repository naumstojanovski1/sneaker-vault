import React from 'react';
import ProductGrid from '../components/ProductGrid';
import SEO from '../components/SEO';

const Men = () => {
    return (
        <div className="pt-20">
            <SEO 
                title="Men's Collection"
                description="Shop men's sneakers, streetwear, and accessories. Performance, training & heritage styles."
                keywords="men's sneakers, men's shoes, men's streetwear, nike men, jordan men"
            />
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-2">
                    Men's <span className="text-red-600">Collection</span>
                </h1>
                <p className="text-gray-500 mb-6">Performance, Training & Heritage</p>
            </div>
            <ProductGrid filter="men" />
        </div>
    );
};

export default Men;
