import React from 'react';
import { Briefcase, Users, TrendingUp } from 'lucide-react';

const Careers = () => {
    const jobs = [
        { title: 'Store Manager', location: 'New York, NY', type: 'Full-time' },
        { title: 'Customer Service Rep', location: 'Remote', type: 'Full-time' },
        { title: 'Social Media Manager', location: 'Los Angeles, CA', type: 'Full-time' },
        { title: 'Warehouse Associate', location: 'Chicago, IL', type: 'Part-time' }
    ];

    return (
        <div className="min-h-screen pt-20">
            <div className="bg-black text-white py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-black uppercase italic mb-6">Join Our Team</h1>
                    <p className="text-xl text-gray-300">Build your career with SNEAKR</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="text-center">
                        <Users className="mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-black uppercase mb-2">Great Team</h3>
                        <p className="text-gray-600">Work with passionate sneaker enthusiasts</p>
                    </div>
                    <div className="text-center">
                        <TrendingUp className="mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-black uppercase mb-2">Growth</h3>
                        <p className="text-gray-600">Opportunities to advance your career</p>
                    </div>
                    <div className="text-center">
                        <Briefcase className="mx-auto mb-4" size={48} />
                        <h3 className="text-xl font-black uppercase mb-2">Benefits</h3>
                        <p className="text-gray-600">Competitive pay and employee discounts</p>
                    </div>
                </div>

                <h2 className="text-3xl font-black uppercase mb-8">Open Positions</h2>
                <div className="space-y-4">
                    {jobs.map((job, idx) => (
                        <div key={idx} className="bg-white border p-6 flex justify-between items-center hover:shadow-lg transition">
                            <div>
                                <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                                <p className="text-sm text-gray-600">{job.location} • {job.type}</p>
                            </div>
                            <button className="bg-black text-white px-6 py-3 font-bold uppercase text-xs hover:bg-gray-800 transition">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Careers;
