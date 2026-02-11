import React from 'react';
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="bg-black text-white pt-20 pb-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-20">
            <div className="space-y-6">
                <Link to="/" className="font-black text-lg uppercase italic tracking-tighter inline-block hover:text-red-600 transition">
                    <span className="text-red-600">S</span>NEAKR.
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                    Authentic gear, exclusive drops, and the heartbeat of the street. Your journey starts from the ground up.
                </p>
                <div className="flex gap-4">
                    <Instagram size={20} className="text-gray-400 hover:text-white cursor-pointer transition" />
                    <Twitter size={20} className="text-gray-400 hover:text-white cursor-pointer transition" />
                    <Facebook size={20} className="text-gray-400 hover:text-white cursor-pointer transition" />
                </div>
            </div>
            <div>
                <h5 className="font-bold uppercase text-sm mb-6 tracking-widest">Support</h5>
                <ul className="space-y-4 text-sm text-gray-400 font-medium">
                    <li><a href="/" className="hover:text-white transition">Order Status</a></li>
                    <li><a href="/" className="hover:text-white transition">Shipping & Delivery</a></li>
                    <li><a href="/" className="hover:text-white transition">Returns</a></li>
                    <li><a href="/" className="hover:text-white transition">Contact Us</a></li>
                </ul>
            </div>
            <div>
                <h5 className="font-bold uppercase text-sm mb-6 tracking-widest">About SNEAKR</h5>
                <ul className="space-y-4 text-sm text-gray-400 font-medium">
                    <li><a href="/" className="hover:text-white transition">News</a></li>
                    <li><a href="/" className="hover:text-white transition">Careers</a></li>
                    <li><a href="/" className="hover:text-white transition">Sustainability</a></li>
                </ul>
            </div>
            <div>
                <h5 className="font-bold uppercase text-sm mb-6 tracking-widest">Newsletter</h5>
                <p className="text-sm text-gray-400 mb-4 italic">Get hype notifications first.</p>
                <div className="flex border-b border-gray-600 pb-2">
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="bg-transparent border-none outline-none flex-1 text-sm text-white"
                    />
                    <button className="text-white hover:text-red-500 transition"><ArrowRight size={18}/></button>
                </div>
            </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">© 2026 SNEAKR INC. ALL RIGHTS RESERVED</p>
            <div className="flex gap-8 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                <a href="/" className="hover:text-white">Privacy Policy</a>
                <a href="/" className="hover:text-white">Terms of Sale</a>
            </div>
        </div>
    </footer>
);

export default Footer;
