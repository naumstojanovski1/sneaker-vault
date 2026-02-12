import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Calendar, ArrowLeft, User } from 'lucide-react';

const NewsArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadArticle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const loadArticle = async () => {
        try {
            const docRef = doc(db, 'news', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setArticle({ id: docSnap.id, ...docSnap.data() });
            }
        } catch (error) {
            console.error('Error loading article:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <p className="text-xl font-bold uppercase">Loading...</p>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl font-bold uppercase mb-4">Article not found</p>
                    <button onClick={() => navigate('/news')} className="text-red-600 font-bold uppercase text-sm">
                        Back to News
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <button onClick={() => navigate('/news')} className="flex items-center gap-2 mb-8 font-bold uppercase text-sm hover:text-gray-600 transition">
                    <ArrowLeft size={18} /> Back to News
                </button>

                <div className="bg-white border">
                    <img src={article.image} alt={article.title} className="w-full h-96 object-cover" />
                    
                    <div className="p-8 md:p-12">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="text-xs font-bold uppercase bg-black text-white px-3 py-1">{article.category}</span>
                            <span className="text-sm text-gray-500 flex items-center gap-2">
                                <Calendar size={16} /> {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            {article.author && (
                                <span className="text-sm text-gray-500 flex items-center gap-2">
                                    <User size={16} /> {article.author}
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black uppercase italic mb-6">{article.title}</h1>
                        
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">{article.excerpt}</p>
                        
                        <div className="prose max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {article.content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsArticle;
