import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message sent! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-black uppercase italic mb-4">Contact Us</h1>
                <p className="text-gray-600 mb-12">We're here to help</p>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <form onSubmit={handleSubmit} className="bg-white p-8 border space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full px-4 py-3 border focus:border-black outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-4 py-3 border focus:border-black outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2">Subject</label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                    className="w-full px-4 py-3 border focus:border-black outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2">Message</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    rows="5"
                                    className="w-full px-4 py-3 border focus:border-black outline-none"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-black text-white py-4 font-bold uppercase text-sm">
                                Send Message
                            </button>
                        </form>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 border">
                            <Mail className="mb-4" size={32} />
                            <h3 className="font-bold uppercase mb-2">Email</h3>
                            <p className="text-gray-600">stojanovski.nano@gmail.com</p>
                        </div>
                        <div className="bg-white p-6 border">
                            <Phone className="mb-4" size={32} />
                            <h3 className="font-bold uppercase mb-2">Phone</h3>
                            <p className="text-gray-600">+1 (555) 123-4567</p>
                        </div>
                        <div className="bg-white p-6 border">
                            <Clock className="mb-4" size={32} />
                            <h3 className="font-bold uppercase mb-2">Hours</h3>
                            <p className="text-gray-600">Mon-Fri: 9AM - 6PM</p>
                            <p className="text-gray-600">Sat-Sun: 10AM - 4PM</p>
                        </div>
                        <div className="bg-white p-6 border">
                            <MapPin className="mb-4" size={32} />
                            <h3 className="font-bold uppercase mb-2">Location</h3>
                            <p className="text-gray-600">123 Sneaker Street</p>
                            <p className="text-gray-600">New York, NY 10001</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
