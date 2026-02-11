import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const hasDiscount = product.salePrice && product.salePrice < product.price;
    const displayPrice = hasDiscount ? product.salePrice : product.price;
    const discountPercent = hasDiscount ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;
    
    const handleAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };
    
    return (
        <Link to={`/product/${product.slug}`} className="group relative flex flex-col h-full bg-white">
            <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
                <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {hasDiscount && (
                        <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-1 tracking-widest">
                            -{discountPercent}%
                        </span>
                    )}
                    <span className="bg-white text-black text-[10px] font-black uppercase px-2 py-1 tracking-widest">
                        {product.status}
                    </span>
                </div>
                <button
                    onClick={handleAdd}
                    className="absolute bottom-4 left-4 right-4 bg-black text-white py-4 translate-y-20 group-hover:translate-y-0 transition-transform duration-300 font-bold uppercase text-[11px] tracking-[0.1em]"
                >
                    Quick Add to Bag
                </button>
            </div>
            <div className="mt-4 flex flex-col gap-1">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-base md:text-lg uppercase tracking-tight">{product.name}</h3>
                    <div className="flex flex-col items-end">
                        {hasDiscount ? (
                            <>
                                <p className="font-black text-base md:text-lg">${displayPrice.toFixed(2)}</p>
                                <p className="text-gray-400 text-sm line-through">${product.price.toFixed(2)}</p>
                            </>
                        ) : (
                            <p className="font-black text-base md:text-lg">${displayPrice}</p>
                        )}
                    </div>
                </div>
                <p className="text-gray-500 text-sm">{product.category}</p>
                <p className="text-gray-400 text-xs">{product.color}</p>
            </div>
        </Link>
    );
};

export default ProductCard;
