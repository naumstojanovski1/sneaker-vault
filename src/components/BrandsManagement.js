import React, { useState, useEffect } from 'react';
import { getBrands, addBrand, deleteBrand } from '../services/brandService';
import { useToast } from '../context/ToastContext';
import { useConfirm } from '../context/ConfirmContext';
import { Trash2, Plus } from 'lucide-react';

const BrandsManagement = () => {
    const [brands, setBrands] = useState([]);
    const [newBrand, setNewBrand] = useState('');
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();
    const { confirm } = useConfirm();

    useEffect(() => {
        loadBrands();
    }, []);

    const loadBrands = async () => {
        const data = await getBrands();
        setBrands(data);
        setLoading(false);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newBrand.trim()) {
            showToast('Please enter a brand name', 'error');
            return;
        }
        try {
            const uppercaseBrand = newBrand.trim().toUpperCase();
            await addBrand(uppercaseBrand);
            showToast('Brand added successfully!', 'success');
            setNewBrand('');
            loadBrands();
        } catch (error) {
            console.error('Error adding brand:', error);
            showToast(`Failed to add brand: ${error.message}`, 'error');
        }
    };

    const handleDelete = async (id) => {
        const confirmed = await confirm('Delete this brand?');
        if (!confirmed) return;
        try {
            await deleteBrand(id);
            showToast('Brand deleted successfully!', 'success');
            loadBrands();
        } catch (error) {
            showToast('Failed to delete brand', 'error');
        }
    };

    return (
        <div className="bg-white p-6 border">
            <h2 className="text-2xl font-black uppercase mb-6">Brand Management</h2>
            
            <form onSubmit={handleAdd} className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="New brand name"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="flex-1 px-4 py-2 border"
                />
                <button type="submit" className="px-6 py-2 bg-black text-white font-bold uppercase flex items-center gap-2">
                    <Plus size={16} /> Add Brand
                </button>
            </form>

            {loading ? (
                <p className="text-gray-400">Loading...</p>
            ) : brands.length === 0 ? (
                <p className="text-gray-400">No brands yet. Add your first brand above.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {brands.map(brand => (
                        <div key={brand.id} className="border p-4 flex items-center justify-between">
                            <span className="font-bold">{brand.name}</span>
                            <button
                                onClick={() => handleDelete(brand.id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BrandsManagement;
