import React from 'react';
import ProductGrid from '../components/ProductGrid';
import SEO from '../components/SEO';

const AirMax = () => {
    return (
        <div className="pt-20">
            <SEO 
                title="Air Max"
                description="Revolutionary visible Air cushioning. Shop the iconic Air Max collection."
                keywords="air max, nike air max, air max shoes, visible air, air cushioning"
            />
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
                <h1 className="text-4xl md:text-6xl font-black uppercase italic mb-4">AIR MAX</h1>
                <p className="text-gray-500 text-lg mb-8">Revolutionary visible Air cushioning</p>
            </div>
            <ProductGrid filter="air-max" />
        </div>
    );
};

export default AirMax;
