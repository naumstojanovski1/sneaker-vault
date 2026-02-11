import React, { useState } from 'react';
import Papa from 'papaparse';
import { addProduct } from '../services/productService';
import { getNextProductNumber } from '../services/counterService';
import { Upload, Download, X } from 'lucide-react';

const CSVImport = ({ onClose, onComplete }) => {
    const [importing, setImporting] = useState(false);
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const [csvText, setCsvText] = useState('');

    const downloadTemplate = () => {
        const template = `name,shortDescription,description,category,productType,brand,sku,tags,price,salePrice,costPrice,stock,stockStatus,lowStockWarning,allowBackorders,img,galleryImages,color,forMen,forWomen,sizes,weight,length,width,height,freeShipping,status,featured,visibility,seoTitle,metaDescription,warranty,returnPolicy
Air Max Pulse,Comfortable daily wear,The next generation of Air Max is here with enhanced cushioning,Lifestyle,Trainers,Nike,AM-PULSE-001,"running,lifestyle,comfort",160,140,100,50,in-stock,5,false,https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800,"https://example.com/img1.jpg,https://example.com/img2.jpg",Phantom/White,true,false,"40,41,42,43,44",0.5,30,20,15,true,published,true,public,Air Max Pulse - Premium Trainers,Buy Air Max Pulse trainers with free shipping,1 year warranty,30 days`;

        const blob = new Blob([template], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'products_template.csv';
        a.click();
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                await processCSVData(results.data);
            }
        });
    };

    const handleTextImport = () => {
        if (!csvText.trim()) {
            alert('Please paste CSV data');
            return;
        }

        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                await processCSVData(results.data);
            }
        });
    };

    const processCSVData = async (data) => {
        setImporting(true);
        setProgress({ current: 0, total: data.length });

        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            try {
                const slug = row.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                const productCode = await getNextProductNumber();
                
                const productData = {
                    name: row.name,
                    slug,
                    productCode,
                    shortDescription: row.shortDescription || '',
                    description: row.description,
                    category: row.category,
                    productType: row.productType,
                    brand: row.brand || '',
                    sku: row.sku,
                    tags: row.tags ? row.tags.split(',').map(t => t.trim()) : [],
                    price: Number(row.price),
                    salePrice: row.salePrice ? Number(row.salePrice) : null,
                    costPrice: row.costPrice ? Number(row.costPrice) : null,
                    stock: Number(row.stock),
                    stockStatus: row.stockStatus || 'in-stock',
                    lowStockWarning: Number(row.lowStockWarning) || 5,
                    allowBackorders: row.allowBackorders === 'true',
                    img: row.img,
                    galleryImages: row.galleryImages ? row.galleryImages.split(',').map(t => t.trim()) : [],
                    color: row.color,
                    forMen: row.forMen === 'true',
                    forWomen: row.forWomen === 'true',
                    sizes: row.sizes ? row.sizes.split(',').map(t => t.trim()) : [],
                    weight: row.weight || '',
                    length: row.length || '',
                    width: row.width || '',
                    height: row.height || '',
                    freeShipping: row.freeShipping === 'true',
                    status: row.status || 'published',
                    featured: row.featured === 'true',
                    visibility: row.visibility || 'public',
                    seoTitle: row.seoTitle || '',
                    metaDescription: row.metaDescription || '',
                    warranty: row.warranty || '',
                    returnPolicy: row.returnPolicy || '30 days',
                    createdAt: new Date().toISOString()
                };

                await addProduct(productData);
                setProgress({ current: i + 1, total: data.length });
            } catch (error) {
                console.error(`Error importing row ${i + 1}:`, error);
            }
        }

        setImporting(false);
        alert(`Successfully imported ${data.length} products!`);
        onComplete();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[300] p-4 overflow-y-auto">
            <div className="bg-white p-6 md:p-8 max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black uppercase">Import Products from CSV</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X size={24} />
                    </button>
                </div>

                {importing ? (
                    <div className="text-center py-12">
                        <p className="text-xl font-bold mb-4">Importing Products...</p>
                        <p className="text-gray-500 mb-4">
                            {progress.current} of {progress.total} products imported
                        </p>
                        <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                            <div 
                                className="bg-black h-full transition-all duration-300"
                                style={{ width: `${(progress.current / progress.total) * 100}%` }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                            <p className="font-bold mb-2">Upload CSV File</p>
                            <p className="text-sm text-gray-500 mb-4">
                                Select a CSV file with your product data
                            </p>
                            <label className="inline-block bg-black text-white px-6 py-3 font-bold uppercase text-sm cursor-pointer hover:opacity-90 transition">
                                Choose File
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="text-center text-gray-400 font-bold text-sm">OR</div>

                        <div className="border-2 border-gray-300 rounded-lg p-6">
                            <p className="font-bold mb-3">Paste CSV Data</p>
                            <textarea
                                value={csvText}
                                onChange={(e) => setCsvText(e.target.value)}
                                placeholder="Paste your CSV data here...&#10;name,description,category,price,stock,img...&#10;Product 1,Description,Category,100,50,https://..."
                                className="w-full h-40 p-3 border font-mono text-xs resize-none"
                            />
                            <button
                                onClick={handleTextImport}
                                className="w-full mt-3 bg-black text-white px-6 py-3 font-bold uppercase text-sm hover:opacity-90 transition"
                            >
                                Import from Text
                            </button>
                        </div>

                        <div className="border-t pt-6">
                            <p className="font-bold mb-3 text-sm uppercase">CSV Format Guide:</p>
                            <div className="bg-gray-50 p-4 rounded text-xs space-y-2">
                                <p><strong>Required fields:</strong> name, description, category, productType, sku, price, stock, img, color</p>
                                <p><strong>Boolean fields:</strong> Use "true" or "false" for: forMen, forWomen, allowBackorders, freeShipping, featured</p>
                                <p><strong>Array fields:</strong> Use comma-separated values for: tags, galleryImages, sizes</p>
                                <p><strong>Stock status:</strong> in-stock, out-of-stock, or pre-order</p>
                                <p><strong>Visibility:</strong> public, private, or hidden</p>
                            </div>
                        </div>

                        <button
                            onClick={downloadTemplate}
                            className="w-full bg-gray-200 text-black px-6 py-3 font-bold uppercase text-sm flex items-center justify-center gap-2 hover:bg-gray-300 transition"
                        >
                            <Download size={18} /> Download CSV Template
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CSVImport;
