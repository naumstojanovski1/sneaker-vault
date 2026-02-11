import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
    useEffect(() => {
        document.title = 'SNEAKR.';
    }, []);
    return (
        <>
            <Hero />
            <ProductGrid filter="all" />
            
            <section className="bg-red-600 py-12 overflow-hidden whitespace-nowrap">
                <div className="flex animate-marquee">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="text-white text-5xl md:text-8xl font-black italic uppercase mx-8 opacity-90">
                            Free Delivery for Members • Limited Drops • Authentic Only •
                        </span>
                    ))}
                </div>
            </section>

            <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative aspect-square">
                    <img
                        src="https://images.unsplash.com/photo-1579338559194-a162d19bd842?auto=format&fit=crop&q=80&w=1000"
                        alt="Feature Product"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute -bottom-8 -right-8 bg-black text-white p-10 hidden md:block">
                        <p className="text-4xl font-black italic">1996</p>
                        <p className="uppercase text-[10px] tracking-[0.2em] font-bold">Heritage DNA</p>
                    </div>
                </div>
                <div className="space-y-8">
                    <p className="text-red-600 font-black uppercase tracking-widest text-sm">Tech Innovation</p>
                    <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
                        ENGINEERED <br/>TO MOVE
                    </h2>
                    <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
                        Experience the evolution of traction and responsiveness. Our dual-density foam technology is designed for those who never stop.
                    </p>
                    <button className="bg-black text-white px-12 py-5 rounded-full font-black uppercase text-sm hover:scale-105 transition">
                        Explore Innovation
                    </button>
                </div>
            </section>
        </>
    );
};

export default Home;
