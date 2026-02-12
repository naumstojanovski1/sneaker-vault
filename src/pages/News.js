import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const News = () => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        const snapshot = await getDocs(collection(db, 'news'));
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setArticles(posts.sort((a, b) => new Date(b.date) - new Date(a.date)));
    };

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-black uppercase italic mb-4">News & Updates</h1>
                <p className="text-gray-600 mb-12">Stay updated with the latest sneaker drops and trends</p>

                <div className="grid md:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <div key={article.id} className="bg-white border hover:shadow-lg transition group cursor-pointer" onClick={() => navigate(`/news/${article.id}`)}>
                            <div className="aspect-video overflow-hidden">
                                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-xs font-bold uppercase bg-black text-white px-2 py-1">{article.category}</span>
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <Calendar size={14} /> {new Date(article.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black uppercase mb-2">{article.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{article.excerpt}</p>
                                <button className="text-xs font-bold uppercase flex items-center gap-2 hover:gap-3 transition-all">
                                    Read More <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
