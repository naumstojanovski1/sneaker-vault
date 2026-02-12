import React, { useState, useEffect } from 'react';
import { addProduct } from '../services/productService';
import { getNextProductNumber } from '../services/counterService';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const AddProductModal = ({ onClose, editProduct = null }) => {
    const [activeTab, setActiveTab] = useState('general');
    const [formData, setFormData] = useState({
        name: '',
        shortDescription: '',
        description: '',
        type: 'Shoes',
        category: 'New Arrivals',
        brand: '',
        sku: '',
        tags: '',
        price: '',
        salePrice: '',
        costPrice: '',
        stock: '',
        stockStatus: 'in-stock',
        lowStockWarning: '5',
        allowBackorders: false,
        img: '',
        galleryImages: '',
        color: '',
        forMen: true,
        forWomen: false,
        sizes: [],
        weight: '',
        length: '',
        width: '',
        height: '',
        freeShipping: false,
        status: 'published',
        featured: false,
        visibility: 'public',
        seoTitle: '',
        metaDescription: '',
        warranty: '',
        returnPolicy: '30 days'
    });

    useEffect(() => {
        if (editProduct) {
            setFormData({
                ...editProduct,
                tags: Array.isArray(editProduct.tags) ? editProduct.tags.join(', ') : '',
                galleryImages: Array.isArray(editProduct.galleryImages) ? editProduct.galleryImages.join(', ') : '',
                sizes: editProduct.sizes || [],
                salePrice: editProduct.salePrice || '',
                costPrice: editProduct.costPrice || ''
            });
        }
    }, [editProduct]);

    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46'];

    const toggleSize = (size) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size) 
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const productData = {
                ...formData,
                price: Number(formData.price),
                salePrice: formData.salePrice ? Number(formData.salePrice) : null,
                costPrice: formData.costPrice ? Number(formData.costPrice) : null,
                stock: Number(formData.stock),
                lowStockWarning: Number(formData.lowStockWarning),
                tags: formData.tags.split(',').map(t => t.trim()),
                galleryImages: formData.galleryImages.split(',').map(t => t.trim()).filter(Boolean)
            };

            if (editProduct) {
                // Update existing product
                const productRef = doc(db, 'products', editProduct.id);
                await updateDoc(productRef, {
                    ...productData,
                    updatedAt: new Date().toISOString()
                });
                alert('Product updated successfully!');
            } else {
                // Create new product
                const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                const productCode = await getNextProductNumber();
                await addProduct({
                    ...productData,
                    slug,
                    productCode,
                    createdAt: new Date().toISOString()
                });
                alert('Product added successfully!');
            }
            onClose();
        } catch (error) {
            alert('Failed to save product');
        }
    };

    const tabs = [
        { id: 'general', label: 'General' },
        { id: 'pricing', label: 'Pricing' },
        { id: 'inventory', label: 'Inventory' },
        { id: 'media', label: 'Media' },
        { id: 'variants', label: 'Variants' },
        { id: 'shipping', label: 'Shipping' },
        { id: 'seo', label: 'SEO' }
    ];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[300] p-6">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-black uppercase">{editProduct ? 'Edit Product' : 'Add Product'}</h2>
                </div>

                <div className="flex border-b overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 font-bold uppercase text-xs whitespace-nowrap ${
                                activeTab === tab.id ? 'bg-black text-white' : 'bg-white text-gray-500 hover:text-black'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'general' && (
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Product Name *"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-4 py-3 border"
                            />
                            <input
                                type="text"
                                placeholder="Short Description"
                                value={formData.shortDescription}
                                onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                                className="w-full px-4 py-3 border"
                            />
                            <textarea
                                placeholder="Full Description *"
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full px-4 py-3 border"
                                rows="4"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                                    className="w-full px-4 py-3 border"
                                >
                                    <option value="Shoes">Shoes</option>
                                    <option value="Clothing">Clothing</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    className="w-full px-4 py-3 border"
                                >
                                    <option>New Arrivals</option>
                                    <option>Best Sellers</option>
                                    <option>On Sale</option>
                                    <option>Outlet</option>
                                    <option>Premium Collection</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Brand"
                                    value={formData.brand}
                                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                                    className="w-full px-4 py-3 border"
                                />
                                <input
                                    type="text"
                                    placeholder="SKU *"
                                    required
                                    value={formData.sku}
                                    onChange={(e) => setFormData({...formData, sku: e.target.value})}
                                    className="w-full px-4 py-3 border"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Tags (comma separated)"
                                value={formData.tags}
                                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                                className="w-full px-4 py-3 border"
                            />
                        </div>
                    )}

                    {activeTab === 'pricing' && (
                        <div className="space-y-4">
                            <input
                                type="number"
                                placeholder="Regular Price *"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                className="w-full px-4 py-3 border"
                            />
                            <input
                                type="number"
                                placeholder="Sale Price"
                                value={formData.salePrice}
                                onChange={(e) => setFormData({...formData, salePrice: e.target.value})}
                                className="w-full px-4 py-3 border"
                            />
                            <input
                                type="number"
                                placeholder="Cost Price (for profit tracking)"
                                value={formData.costPrice}
                                onChange={(e) => setFormData({...formData, costPrice: e.target.value})}
                                className="w-full px-4 py-3 border"
                            />
                        </div>
                    )}

                    {activeTab === 'inventory' && (
                        <div className="space-y-4">
                            <input
                                type="number"
                                placeholder="Stock Quantity *"
                                required
                                value={formData.stock}
                                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                                className="w-full px-4 py-3 border"
                            />
                            <select
                                value={formData.stockStatus}
                                onChange={(e) => setFormData({...formData, stockStatus: e.target.value})}
                                className="w-full px-4 py-3 border"
                            >
                                <option value="in-stock">In Stock</option>
                                <option value="out-of-stock">Out of Stock</option>
                                <option value="pre-order">Pre-order</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Low Stock Warning Level"
                                value={formData.lowStockWarning}
                                onChange={(e) => setFormData({...formData, lowStockWarning: e.target.value})}
                                className="w-full px-4 py-3 border"
                            />
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.allowBackorders}
                                    onChange={(e) => setFormData({...formData, allowBackorders: e.target.checked})}
                                    className="w-4 h-4"
                                />
                                <span className="font-bold text-sm">Allow Backorders</span>
                            </label>
                        </div>
                    )}

                    {activeTab === 'media' && (
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Main Product Image URL *"
                                required
                                value={formData.img}
                                onChange={(e) => setFormData({...formData, img: e.target.value})}
                                className="w-full px-4 py-3 border"
                            />
                            <textarea
                                placeholder="Gallery Images (comma separated URLs)"
                                value={formData.galleryImages}
                                onChange={(e) => setFormData({...formData, galleryImages: e.target.value})}
                                className="w-full px-4 py-3 border"
                                rows="3"
                            />
                            <input
                                type="text"
                                placeholder="Color *"
                                required
                                value={formData.color}
                                onChange={(e) => setFormData({...formData, color: e.target.value})}
                                className="w-full px-4 py-3 border"
                            />
                        </div>
                    )}

                    {activeTab === 'variants' && (
                        <div className="space-y-4">
                            <div className="border p-4">
                                <p className="text-xs font-bold uppercase mb-3">Available For:</p>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.forMen}
                                            onChange={(e) => setFormData({...formData, forMen: e.target.checked})}
                                            className="w-4 h-4"
                                        />
                                        <span className="font-bold text-sm">Men</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.forWomen}
                                            onChange={(e) => setFormData({...formData, forWomen: e.target.checked})}
                                            className="w-4 h-4"
                                        />
                                        <span className="font-bold text-sm">Women</span>
                                    </label>
                                </div>
                            </div>
                            <div className="border p-4">
                                <p className="text-xs font-bold uppercase mb-3">Available Sizes:</p>
                                <div className="flex flex-wrap gap-2">
                                    {availableSizes.map(size => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => toggleSize(size)}
                                            className={`px-4 py-2 text-sm font-bold border transition ${
                                                formData.sizes.includes(size)
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-black border-gray-300 hover:border-black'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'shipping' && (
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Weight (kg)"
                                value={formData.weight}
                                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                                className="w-full px-4 py-3 border"
                            />
                            <div className="grid grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    placeholder="Length (cm)"
                                    value={formData.length}
                                    onChange={(e) => setFormData({...formData, length: e.target.value})}
                                    className="w-full px-4 py-3 border"
                                />
                                <input
                                    type="text"
                                    placeholder="Width (cm)"
                                    value={formData.width}
                                    onChange={(e) => setFormData({...formData, width: e.target.value})}
                                    className="w-full px-4 py-3 border"
                                />
                                <input
                                    type="text"
                                    placeholder="Height (cm)"
                                    value={formData.height}
                                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                                    className="w-full px-4 py-3 border"
                                />
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.freeShipping}
                                    onChange={(e) => setFormData({...formData, freeShipping: e.target.checked})}
                                    className="w-4 h-4"
                                />
                                <span className="font-bold text-sm">Free Shipping</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Warranty Information"
                                value={formData.warranty}
                                onChange={(e) => setFormData({...formData, warranty: e.target.value})}
                                className="w-full px-4 py-3 border"
                            />
                            <input
                                type="text"
                                placeholder="Return Policy"
                                value={formData.returnPolicy}
                                onChange={(e) => setFormData({...formData, returnPolicy: e.target.value})}
                                className="w-full px-4 py-3 border"
                            />
                        </div>
                    )}

                    {activeTab === 'seo' && (
                        <div className="space-y-4">
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                className="w-full px-4 py-3 border"
                            >
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                                    className="w-4 h-4"
                                />
                                <span className="font-bold text-sm">Featured Product</span>
                            </label>
                            <input
                                type="text"
                                placeholder="SEO Title"
                                value={formData.seoTitle}
                                onChange={(e) => setFormData({...formData, seoTitle: e.target.value})}
                                className="w-full px-4 py-3 border"
                            />
                            <textarea
                                placeholder="Meta Description"
                                value={formData.metaDescription}
                                onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
                                className="w-full px-4 py-3 border"
                                rows="3"
                            />
                        </div>
                    )}
                </form>

                <div className="p-6 border-t flex gap-4">
                    <button type="button" onClick={handleSubmit} className="flex-1 bg-black text-white py-3 font-bold uppercase">
                        {editProduct ? 'Update Product' : 'Add Product'}
                    </button>
                    <button type="button" onClick={onClose} className="flex-1 bg-gray-200 py-3 font-bold uppercase">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;
