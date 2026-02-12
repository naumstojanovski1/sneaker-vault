import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import SEO from '../components/SEO';

const Home = () => {
    return (
        <>
            <SEO />
            <Hero />
            
            <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-16">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase">SHOP BY CATEGORY</h2>
                    <a href="/new-releases" className="text-xs md:text-sm font-bold uppercase tracking-wider hover:text-red-600 transition">View All →</a>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    <a href="/men" className="group relative overflow-hidden aspect-[3/4] rounded-lg md:rounded-xl">
                        <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600" alt="Men" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                            <h3 className="text-white text-xl md:text-2xl font-black uppercase mb-1 md:mb-2">MEN</h3>
                            <p className="text-white/80 text-xs md:text-sm">Latest Styles</p>
                        </div>
                    </a>
                    <a href="/women" className="group relative overflow-hidden aspect-[3/4] rounded-lg md:rounded-xl">
                        <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600" alt="Women" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                            <h3 className="text-white text-xl md:text-2xl font-black uppercase mb-1 md:mb-2">WOMEN</h3>
                            <p className="text-white/80 text-xs md:text-sm">Trending Now</p>
                        </div>
                    </a>
                    <a href="/tech-fleece" className="group relative overflow-hidden aspect-[3/4] rounded-lg md:rounded-xl">
                        <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600" alt="Tech Fleece" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                            <h3 className="text-white text-xl md:text-2xl font-black uppercase mb-1 md:mb-2">TECH FLEECE</h3>
                            <p className="text-white/80 text-xs md:text-sm">Premium Comfort</p>
                        </div>
                    </a>
                    <a href="/air-max" className="group relative overflow-hidden aspect-[3/4] rounded-lg md:rounded-xl">
                        <img src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&q=80&w=600" alt="Air Max" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-red-600 via-red-600/20 to-transparent opacity-80 group-hover:opacity-90 transition" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                            <h3 className="text-white text-xl md:text-2xl font-black uppercase mb-1 md:mb-2">AIR MAX</h3>
                            <p className="text-white/80 text-xs md:text-sm">Iconic Collection</p>
                        </div>
                    </a>
                </div>
            </section>

            <ProductGrid filter="all" limit={3} />
            
            <section className="bg-red-600 py-8 md:py-12 overflow-hidden whitespace-nowrap">
                <div className="flex animate-marquee">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="text-white text-3xl md:text-5xl lg:text-8xl font-black italic uppercase mx-4 md:mx-8 opacity-90">
                            Free Delivery for Members • Limited Drops • Authentic Only •
                        </span>
                    ))}
                </div>
            </section>

            <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1000"
                        alt="Tech Fleece"
                        className="w-full h-full object-cover hover:scale-105 transition duration-700"
                    />
                    <div className="absolute -bottom-8 -right-8 bg-black text-white p-10 hidden md:block shadow-xl">
                        <p className="text-4xl font-black italic">2024</p>
                        <p className="uppercase text-[10px] tracking-[0.2em] font-bold">Premium Comfort</p>
                    </div>
                </div>
                <div className="space-y-6 md:space-y-8">
                    <p className="text-red-600 font-black uppercase tracking-widest text-xs md:text-sm">Tech Innovation</p>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase italic tracking-tighter leading-none">
                        TECH <br/>FLEECE
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-lg">
                        Engineered warmth without the weight. Premium fleece technology meets modern design for ultimate comfort and style.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <button onClick={() => window.location.href='/tech-fleece'} className="bg-black text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase text-xs md:text-sm hover:scale-105 transition shadow-lg">
                            Shop Tech Fleece
                        </button>
                        <button className="border-2 border-black px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase text-xs md:text-sm hover:bg-black hover:text-white transition">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 md:py-20">
                <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-white text-4xl md:text-5xl lg:text-7xl font-black uppercase italic mb-4 md:mb-6">ELEVATE YOUR GAME</h2>
                    <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto">Premium quality. Authentic products. Unmatched style.</p>
                </div>
            </section>

            <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
                    <p className="text-red-600 font-black uppercase tracking-widest text-xs md:text-sm">Iconic Collection</p>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase italic tracking-tighter leading-none">
                        AIR <br/>MAX
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-lg">
                        Revolutionary visible Air cushioning. Experience the legend that changed sneaker culture forever.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <button onClick={() => window.location.href='/air-max'} className="bg-black text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase text-xs md:text-sm hover:scale-105 transition shadow-lg">
                            Shop Air Max
                        </button>
                        <button className="border-2 border-black px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase text-xs md:text-sm hover:bg-black hover:text-white transition">
                            Learn More
                        </button>
                    </div>
                </div>
                <div className="relative aspect-square order-1 lg:order-2 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&q=80&w=1000"
                        alt="Air Max"
                        className="w-full h-full object-cover hover:scale-105 transition duration-700"
                    />
                    <div className="absolute -bottom-8 -left-8 bg-red-600 text-white p-10 hidden md:block shadow-xl">
                        <p className="text-4xl font-black italic">AIR</p>
                        <p className="uppercase text-[10px] tracking-[0.2em] font-bold">Visible Tech</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
