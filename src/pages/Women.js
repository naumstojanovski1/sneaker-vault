import React, { useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';

const Women = () => {
    useEffect(() => {
        document.title = 'SNEAKR. - Women';
    }, []);
    return (
        <div className="pt-20">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-2">
                    Women's <span className="text-red-600">Collection</span>
                </h1>
                <p className="text-gray-500 mb-6">Lifestyle & Urban</p>
            </div>
            <ProductGrid filter="women" />
        </div>
    );
};

export default Women;
