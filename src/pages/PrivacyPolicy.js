import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ChevronRight } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="pt-20">
            <SEO title="Privacy Policy" description="SNEAKR Privacy Policy" />
            
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Link to="/" className="hover:text-black">Home</Link>
                    <ChevronRight size={16} />
                    <span className="text-black font-bold">Privacy Policy</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-8">
                    Privacy <span className="text-red-600">Policy</span>
                </h1>

                <div className="max-w-4xl space-y-8 text-gray-700">
                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">1. Information We Collect</h2>
                        <p className="leading-relaxed mb-4">
                            We collect information that you provide directly to us, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Name, email address, phone number, and shipping address</li>
                            <li>Payment information (processed securely through third-party providers)</li>
                            <li>Order history and preferences</li>
                            <li>Communications with customer service</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">2. How We Use Your Information</h2>
                        <p className="leading-relaxed mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Process and fulfill your orders</li>
                            <li>Send order confirmations and shipping updates</li>
                            <li>Respond to your questions and provide customer support</li>
                            <li>Send marketing communications (with your consent)</li>
                            <li>Improve our website and services</li>
                            <li>Prevent fraud and enhance security</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">3. Information Sharing</h2>
                        <p className="leading-relaxed">
                            We do not sell your personal information. We may share your information with:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Service providers who assist in order fulfillment and shipping</li>
                            <li>Payment processors for secure transaction processing</li>
                            <li>Analytics providers to improve our services</li>
                            <li>Law enforcement when required by law</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">4. Cookies and Tracking</h2>
                        <p className="leading-relaxed">
                            We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can control cookies through your browser settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">5. Data Security</h2>
                        <p className="leading-relaxed">
                            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">6. Your Rights</h2>
                        <p className="leading-relaxed mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Access your personal information</li>
                            <li>Correct inaccurate information</li>
                            <li>Request deletion of your information</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Object to processing of your information</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">7. Children's Privacy</h2>
                        <p className="leading-relaxed">
                            Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">8. International Data Transfers</h2>
                        <p className="leading-relaxed">
                            Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">9. Changes to Privacy Policy</h2>
                        <p className="leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black uppercase mb-4">10. Contact Us</h2>
                        <p className="leading-relaxed">
                            If you have questions about this Privacy Policy or our data practices, please contact us through our Contact page.
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

export default PrivacyPolicy;
