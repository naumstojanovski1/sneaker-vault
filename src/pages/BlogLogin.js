import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { LogIn } from 'lucide-react';

const BlogLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/blog/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full mx-6">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black uppercase italic mb-2">
                        <span className="text-red-600">S</span>NEAKR<span className="text-red-600">.</span> Blog
                    </h1>
                    <p className="text-gray-600">Login to manage news & updates</p>
                </div>

                <form onSubmit={handleLogin} className="bg-white p-8 border space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 text-sm border border-red-200">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold uppercase mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border focus:border-black outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border focus:border-black outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-4 font-bold uppercase text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <LogIn size={18} /> {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BlogLogin;
