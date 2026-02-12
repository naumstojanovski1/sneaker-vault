import React from 'react';
import { Target, Heart, Award } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen pt-20">
            <div className="bg-black text-white py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-black uppercase italic mb-6">About SNEAKR.</h1>
                    <p className="text-xl text-gray-300">Authentic gear, exclusive drops, and the heartbeat of the street.</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="text-center">
                        <Target className="mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-black uppercase mb-2">Our Mission</h3>
                        <p className="text-gray-600">Bringing authentic sneaker culture to everyone, everywhere.</p>
                    </div>
                    <div className="text-center">
                        <Heart className="mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-black uppercase mb-2">Our Passion</h3>
                        <p className="text-gray-600">We live and breathe sneakers. It's not just business, it's lifestyle.</p>
                    </div>
                    <div className="text-center">
                        <Award className="mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-black uppercase mb-2">Our Promise</h3>
                        <p className="text-gray-600">100% authentic products, always. No fakes, no compromises.</p>
                    </div>
                </div>

                <div className="prose max-w-3xl mx-auto space-y-8">
                    <div>
                        <h2 className="text-3xl font-black uppercase mb-4">Our Story</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Founded in 2024, SNEAKR started with a simple idea: make authentic sneaker culture accessible to everyone. 
                            What began as a passion project has grown into a trusted destination for sneaker enthusiasts worldwide.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-black uppercase mb-4">Why Choose Us</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li>✓ 100% Authentic Products - Every pair verified</li>
                            <li>✓ Exclusive Releases - Get access to limited drops</li>
                            <li>✓ Fast Shipping - Your kicks delivered quick</li>
                            <li>✓ Expert Support - Sneakerheads helping sneakerheads</li>
                            <li>✓ Easy Returns - 30-day hassle-free returns</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-3xl font-black uppercase mb-4">Our Values</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Authenticity, community, and passion drive everything we do. We're not just selling sneakers - 
                            we're building a culture where everyone can express themselves through their kicks.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
