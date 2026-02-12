import React from 'react';
import ProductGrid from '../components/ProductGrid';
import SEO from '../components/SEO';

const Sale = () => {
    return (
        <div className="pt-20">
            <SEO 
                title="Sale - 30% OFF"
                description="Limited time offers on sneakers and streetwear. Save up to 30% off."
                keywords="sale, discount, sneakers sale, streetwear sale, clearance"
            />
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-2">
                    <span className="text-red-600">SALE</span> - 30% OFF
                </h1>
                <p className="text-gray-500 mb-6">Limited time offers</p>
            </div>
            <ProductGrid filter="sale" />
        </div>
    );
};

export default Sale;
