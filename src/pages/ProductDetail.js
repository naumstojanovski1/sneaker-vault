import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useCart } from '../context/CartContext';
import { ChevronLeft, Check } from 'lucide-react';

const ProductDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProduct();
    }, [slug]);

    useEffect(() => {
        if (product) {
            document.title = `SNEAKR. - ${product.name}`;
        }
    }, [product]);

    const loadProduct = async () => {
        try {
            const q = query(collection(db, 'products'), where('slug', '==', slug));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                const data = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
                setProduct(data);
                setSelectedImage(data.img);
            }
        } catch (error) {
            console.error('Error loading product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (product.sizes?.length > 0 && !selectedSize) {
            alert('Please select a size');
            return;
        }
        addToCart({ ...product, selectedSize });
        alert('Added to cart!');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <p className="text-xl font-bold uppercase">Loading...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="text-center">
                    <p className="text-xl font-bold uppercase mb-4">Product not found</p>
                    <button onClick={() => navigate('/')} className="text-red-600 font-bold uppercase text-sm">
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    const images = [product.img, ...(product.galleryImages || [])].filter(Boolean);

    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-8 font-bold uppercase text-sm hover:text-gray-600 transition">
                    <ChevronLeft size={18} /> Back
                </button>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Images */}
                    <div>
                        <div className="aspect-square bg-gray-100 mb-4">
                            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`aspect-square bg-gray-100 border-2 ${selectedImage === img ? 'border-black' : 'border-transparent'}`}
                                    >
                                        <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm font-bold uppercase text-gray-500 mb-2">{product.brand || product.category}</p>
                            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
                                {product.name}
                            </h1>
                            {product.shortDescription && (
                                <p className="text-lg text-gray-600">{product.shortDescription}</p>
                            )}
                        </div>

                        <div className="flex items-baseline gap-4">
                            {product.salePrice ? (
                                <>
                                    <p className="text-3xl font-black">${product.salePrice}</p>
                                    <p className="text-xl text-gray-400 line-through">${product.price}</p>
                                    <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase">
                                        Sale
                                    </span>
                                </>
                            ) : (
                                <p className="text-3xl font-black">${product.price}</p>
                            )}
                        </div>

                        {product.color && (
                            <div>
                                <p className="text-xs font-bold uppercase mb-2">Color</p>
                                <p className="text-lg font-bold">{product.color}</p>
                            </div>
                        )}

                        {product.sizes?.length > 0 && (
                            <div>
                                <p className="text-xs font-bold uppercase mb-3">Select Size</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-6 py-3 border-2 font-bold transition ${
                                                selectedSize === size
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-black border-gray-300 hover:border-black'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-black text-white py-5 rounded-full font-black uppercase text-sm tracking-widest hover:opacity-90 transition"
                        >
                            Add to Bag
                        </button>

                        {product.description && (
                            <div className="border-t pt-6">
                                <p className="text-xs font-bold uppercase mb-3">Description</p>
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            </div>
                        )}

                        {product.productType && (
                            <div className="border-t pt-6">
                                <p className="text-xs font-bold uppercase mb-3">Product Details</p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Type</span>
                                        <span className="font-bold">{product.productType}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Category</span>
                                        <span className="font-bold">{product.category}</span>
                                    </div>
                                    {product.sku && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">SKU</span>
                                            <span className="font-bold">{product.sku}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {(product.freeShipping || product.returnPolicy) && (
                            <div className="border-t pt-6 space-y-3">
                                {product.freeShipping && (
                                    <div className="flex items-center gap-2">
                                        <Check size={18} className="text-green-600" />
                                        <span className="text-sm font-bold">Free Shipping</span>
                                    </div>
                                )}
                                {product.returnPolicy && (
                                    <div className="flex items-center gap-2">
                                        <Check size={18} className="text-green-600" />
                                        <span className="text-sm font-bold">{product.returnPolicy} Return Policy</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
