import React from 'react';

const Hero = () => (
    <section className="relative h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=2000&q=80"
                className="w-full h-full object-cover scale-105"
                alt="Hero Background"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full text-white">
            <p className="text-sm md:text-lg font-bold uppercase tracking-[0.2em] mb-4 text-red-500 animate-pulse">
                Hype Drop: Now Live
            </p>
            <h2 className="text-6xl md:text-9xl font-black italic uppercase leading-[0.85] tracking-tighter mb-8 max-w-2xl">
                BEYOND THE <br/> <span className="text-transparent border-2 border-white px-2">LIMIT</span>
            </h2>
            <div className="flex flex-wrap gap-4">
                <button className="bg-white text-black px-10 py-4 rounded-full font-black uppercase text-sm hover:scale-105 transition active:scale-95">
                    Shop the Collection
                </button>
                <button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-black uppercase text-sm hover:bg-white hover:text-black transition active:scale-95">
                    Watch Trailer
                </button>
            </div>
        </div>
    </section>
);

export default Hero;
