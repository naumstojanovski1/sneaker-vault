import React from 'react';
import { Leaf, Recycle, Package, Heart } from 'lucide-react';

const Sustainability = () => {
    return (
        <div className="min-h-screen pt-20">
            <div className="bg-green-600 text-white py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-black uppercase italic mb-6">Sustainability</h1>
                    <p className="text-xl">Our commitment to a better planet</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-4 gap-8 mb-16">
                    <div className="text-center">
                        <Leaf className="mx-auto mb-4 text-green-600" size={48} />
                        <h3 className="text-xl font-black uppercase mb-2">Eco Materials</h3>
                        <p className="text-sm text-gray-600">Sustainable packaging</p>
                    </div>
                    <div className="text-center">
                        <Recycle className="mx-auto mb-4 text-green-600" size={48} />
                        <h3 className="text-xl font-black uppercase mb-2">Recycling</h3>
                        <p className="text-sm text-gray-600">Shoe recycling program</p>
                    </div>
                    <div className="text-center">
                        <Package className="mx-auto mb-4 text-green-600" size={48} />
                        <h3 className="text-xl font-black uppercase mb-2">Minimal Waste</h3>
                        <p className="text-sm text-gray-600">Reduced packaging</p>
                    </div>
                    <div className="text-center">
                        <Heart className="mx-auto mb-4 text-green-600" size={48} />
                        <h3 className="text-xl font-black uppercase mb-2">Ethical</h3>
                        <p className="text-sm text-gray-600">Fair labor practices</p>
                    </div>
                </div>

                <div className="space-y-12">
                    <div className="bg-white p-8 border">
                        <h2 className="text-3xl font-black uppercase mb-4">Our Goals</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li>✓ 100% recyclable packaging by 2025</li>
                            <li>✓ Carbon neutral shipping by 2026</li>
                            <li>✓ Partner only with ethical manufacturers</li>
                            <li>✓ Reduce waste by 50% in operations</li>
                            <li>✓ Plant a tree for every order</li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 border">
                        <h2 className="text-3xl font-black uppercase mb-4">What We're Doing</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We're committed to reducing our environmental impact. All our packaging is made from recycled materials, 
                            and we're working with partners who share our values of sustainability and ethical production.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Every step counts. From the materials we use to the way we ship, we're constantly looking for ways 
                            to minimize our footprint and maximize our positive impact on the planet.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sustainability;
