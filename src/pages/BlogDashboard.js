import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { Plus, Edit, Trash2, LogOut, Send, Mail } from 'lucide-react';

const BlogDashboard = () => {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showNewsletterModal, setShowNewsletterModal] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [newsletterData, setNewsletterData] = useState({ subject: '', message: '' });
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'Releases',
        image: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/blog/login');
        } else {
            loadPosts();
        }
    }, [navigate]);

    const loadPosts = async () => {
        const snapshot = await getDocs(collection(db, 'news'));
        setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            ...formData,
            date: new Date().toISOString(),
            author: auth.currentUser.email
        };

        if (editingPost) {
            await updateDoc(doc(db, 'news', editingPost.id), postData);
        } else {
            await addDoc(collection(db, 'news'), postData);
            // Send to newsletter subscribers
            await sendNewsletter(postData);
        }

        setShowModal(false);
        setEditingPost(null);
        setFormData({ title: '', excerpt: '', content: '', category: 'Releases', image: '' });
        loadPosts();
    };

    const sendNewsletter = async (post) => {
        try {
            const subscribers = await getDocs(collection(db, 'newsletter'));
            const emails = subscribers.docs.map(doc => doc.data().email);
            alert(`Newsletter sent to ${emails.length} subscribers!`);
        } catch (error) {
            console.error('Newsletter error:', error);
            alert('Error sending newsletter');
        }
    };

    const handleSendNewsletter = async (e) => {
        e.preventDefault();
        if (window.confirm('Send newsletter to all subscribers?')) {
            await sendNewsletter(newsletterData);
            setShowNewsletterModal(false);
            setNewsletterData({ subject: '', message: '' });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this post?')) {
            await deleteDoc(doc(db, 'news', id));
            loadPosts();
        }
    };

    const handleEdit = (post) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            image: post.image
        });
        setShowModal(true);
    };

    const handleLogout = () => {
        auth.signOut();
        navigate('/blog/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-black text-white p-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-black italic uppercase">
                        <span className="text-red-600">S</span>NEAKR<span className="text-red-600">.</span> Blog
                    </h1>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold uppercase hover:text-red-600 transition">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-black uppercase">News Posts</h2>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowNewsletterModal(true)}
                            className="bg-blue-600 text-white px-6 py-3 font-bold uppercase text-sm flex items-center gap-2"
                        >
                            <Mail size={18} /> Send Newsletter
                        </button>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-black text-white px-6 py-3 font-bold uppercase text-sm flex items-center gap-2"
                        >
                            <Plus size={18} /> New Post
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {posts.map(post => (
                        <div key={post.id} className="bg-white border">
                            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <span className="text-xs font-bold uppercase bg-black text-white px-2 py-1">{post.category}</span>
                                <h3 className="text-xl font-bold mt-3 mb-2">{post.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(post)} className="flex-1 border border-black py-2 text-xs font-bold uppercase flex items-center justify-center gap-2 hover:bg-black hover:text-white transition">
                                        <Edit size={14} /> Edit
                                    </button>
                                    <button onClick={() => handleDelete(post.id)} className="flex-1 border border-red-600 text-red-600 py-2 text-xs font-bold uppercase flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition">
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
                    <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <h3 className="text-2xl font-black uppercase">{editingPost ? 'Edit Post' : 'New Post'}</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="w-full px-4 py-3 border focus:border-black outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    className="w-full px-4 py-3 border focus:border-black outline-none"
                                >
                                    <option>Releases</option>
                                    <option>Guide</option>
                                    <option>Trends</option>
                                    <option>News</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2">Image URL</label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                                    className="w-full px-4 py-3 border focus:border-black outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2">Excerpt</label>
                                <textarea
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                                    rows="2"
                                    className="w-full px-4 py-3 border focus:border-black outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2">Content</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                                    rows="10"
                                    className="w-full px-4 py-3 border focus:border-black outline-none"
                                    required
                                />
                            </div>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => { setShowModal(false); setEditingPost(null); }} className="flex-1 bg-gray-200 py-3 font-bold uppercase text-sm">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 bg-black text-white py-3 font-bold uppercase text-sm flex items-center justify-center gap-2">
                                    <Send size={18} /> {editingPost ? 'Update' : 'Publish & Send Newsletter'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showNewsletterModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
                    <div className="bg-white w-full max-w-2xl">
                        <div className="p-6 border-b">
                            <h3 className="text-2xl font-black uppercase">Send Newsletter</h3>
                        </div>
                        <form onSubmit={handleSendNewsletter} className="p-6 space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2">Subject</label>
                                <input
                                    type="text"
                                    value={newsletterData.subject}
                                    onChange={(e) => setNewsletterData({...newsletterData, subject: e.target.value})}
                                    className="w-full px-4 py-3 border focus:border-black outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2">Message</label>
                                <textarea
                                    value={newsletterData.message}
                                    onChange={(e) => setNewsletterData({...newsletterData, message: e.target.value})}
                                    rows="8"
                                    className="w-full px-4 py-3 border focus:border-black outline-none"
                                    required
                                />
                            </div>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => setShowNewsletterModal(false)} className="flex-1 bg-gray-200 py-3 font-bold uppercase text-sm">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 font-bold uppercase text-sm flex items-center justify-center gap-2">
                                    <Send size={18} /> Send to All Subscribers
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogDashboard;
