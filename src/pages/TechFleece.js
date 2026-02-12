import React from 'react';
import ProductGrid from '../components/ProductGrid';
import SEO from '../components/SEO';

const TechFleece = () => {
    return (
        <div className="pt-20">
            <SEO 
                title="Tech Fleece"
                description="Premium comfort meets modern design. Shop Tech Fleece collection."
                keywords="tech fleece, nike tech fleece, fleece clothing, premium fleece"
            />
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
                <h1 className="text-4xl md:text-6xl font-black uppercase italic mb-4">TECH FLEECE</h1>
                <p className="text-gray-500 text-lg mb-8">Premium comfort meets modern design</p>
            </div>
            <ProductGrid filter="tech-fleece" />
        </div>
    );
};

export default TechFleece;
