import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=2000&q=80',
            tag: 'Hype Drop: Now Live',
            title: 'BEYOND THE',
            highlight: 'LIMIT'
        },
        {
            img: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=2000&q=80',
            tag: 'New Collection',
            title: 'STREET',
            highlight: 'CULTURE'
        },
        {
            img: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=2000&q=80',
            tag: 'Limited Edition',
            title: 'PURE',
            highlight: 'FIRE'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section className="relative h-screen flex items-center pt-16 overflow-hidden">
            {slides.map((slide, index) => (
                <div key={index} className={`absolute inset-0 z-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
                    <img src={slide.img} className="w-full h-full object-cover scale-105" alt="Hero" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                </div>
            ))}

            <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full text-white mb-12">
                <p className="text-sm md:text-lg font-bold uppercase tracking-[0.2em] mb-4 text-red-500 animate-pulse h-5 md:h-6">
                    {slides[currentSlide].tag}
                </p>
                <h2 className="text-5xl md:text-9xl font-black italic uppercase leading-[0.85] tracking-tighter mb-8 max-w-2xl h-[120px] md:h-[240px] flex flex-col justify-center">
                    {slides[currentSlide].title} <br/> <span className="text-red-600">{slides[currentSlide].highlight}</span>
                </h2>
                <div className="flex gap-2">
                    {slides.map((_, index) => (
                        <button key={index} onClick={() => setCurrentSlide(index)} className={`h-1 rounded-full transition-all ${currentSlide === index ? 'w-12 bg-white' : 'w-8 bg-white/50'}`} />
                    ))}
                </div>
            </div>

            {/* Scroll Down Indicator - Mobile Only */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 md:hidden">
                <div className="flex flex-col items-center gap-2 animate-bounce">
                    <p className="text-white text-xs font-bold uppercase tracking-wider">Scroll Down</p>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default Hero;
