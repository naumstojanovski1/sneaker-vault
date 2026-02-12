import React from 'react';
import ProductGrid from '../components/ProductGrid';
import SEO from '../components/SEO';

const NewReleases = () => {
    return (
        <div className="pt-20">
            <SEO 
                title="New Releases"
                description="Latest drops & new arrivals. Shop the newest sneakers and streetwear."
                keywords="new releases, latest drops, new sneakers, new arrivals, latest shoes"
            />
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-2">
                    New <span className="text-red-600">Releases</span>
                </h1>
                <p className="text-gray-500 mb-6">Latest drops & arrivals</p>
            </div>
            <ProductGrid filter="new-releases" />
        </div>
    );
};

export default NewReleases;
