import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'SNEAKR. - 404 Not Found';
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center pt-20">
            <div className="text-center max-w-md px-6">
                <XCircle size={80} className="mx-auto mb-6 text-red-600" />
                <h1 className="text-6xl font-black italic mb-4">404</h1>
                <h2 className="text-2xl font-black uppercase mb-4">Page Not Found</h2>
                <p className="text-gray-500 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <button 
                    onClick={() => navigate('/')} 
                    className="bg-black text-white px-8 py-4 font-bold uppercase text-sm hover:bg-red-600 transition"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
