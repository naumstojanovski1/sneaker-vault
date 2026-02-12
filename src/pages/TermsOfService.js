import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ChevronRight } from 'lucide-react';

const TermsOfService = () => {
    return (
        <div className="pt-20">
            <SEO title="Terms of Service" description="SNEAKR Terms of Service" />
            
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Link to="/" className="hover:text-black">Home</Link>
                    <ChevronRight size={16} />
                    <span className="text-black font-bold">Terms of Service</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8">
                    Terms of <span className="text-red-600">Service</span>
                </h1>

                <div className="max-w-4xl space-y-8 text-gray-700">
                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">1. Acceptance of Terms</h2>
                        <p className="leading-relaxed">
                            By accessing and using SNEAKR, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">2. Use License</h2>
                        <p className="leading-relaxed mb-4">
                            Permission is granted to temporarily download one copy of the materials on SNEAKR's website for personal, non-commercial transitory viewing only.
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Modify or copy the materials</li>
                            <li>Use the materials for any commercial purpose</li>
                            <li>Attempt to decompile or reverse engineer any software</li>
                            <li>Remove any copyright or proprietary notations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">3. Product Information</h2>
                        <p className="leading-relaxed">
                            We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">4. Orders and Payments</h2>
                        <p className="leading-relaxed">
                            All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason. Payment must be received before order processing.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">5. Shipping and Delivery</h2>
                        <p className="leading-relaxed">
                            Shipping times are estimates and not guaranteed. SNEAKR is not responsible for delays caused by shipping carriers or customs.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">6. Returns and Refunds</h2>
                        <p className="leading-relaxed">
                            Please refer to our Returns Policy for detailed information about returns, exchanges, and refunds.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">7. Limitation of Liability</h2>
                        <p className="leading-relaxed">
                            SNEAKR shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">8. Governing Law</h2>
                        <p className="leading-relaxed">
                            These terms shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">9. Changes to Terms</h2>
                        <p className="leading-relaxed">
                            SNEAKR reserves the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the modified terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">10. Contact Information</h2>
                        <p className="leading-relaxed">
                            For questions about these Terms of Service, please contact us through our Contact page.
                        </p>
                    </section>

                    <p className="text-sm text-gray-500 pt-8 border-t">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
