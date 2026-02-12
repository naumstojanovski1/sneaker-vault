import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState('');
    const [showSizes, setShowSizes] = useState(false);
    const hasDiscount = product.salePrice && product.salePrice < product.price;
    const displayPrice = hasDiscount ? product.salePrice : product.price;
    const discountPercent = hasDiscount ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;
    const hasSizes = product.sizes && product.sizes.length > 0;
    
    const handleSizeClick = (e, size) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedSize(size);
        addToCart({ ...product, selectedSize: size });
        setTimeout(() => {
            setSelectedSize('');
            setShowSizes(false);
        }, 500);
    };

    const handleQuickAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (hasSizes) {
            setShowSizes(true);
        } else {
            addToCart(product);
        }
    };
    
    return (
        <Link 
            to={`/product/${product.productCode}`} 
            className="group relative flex flex-col h-full bg-white"
            onMouseEnter={() => hasSizes && setShowSizes(true)}
            onMouseLeave={() => !selectedSize && setShowSizes(false)}
        >
            <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
                <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                />
                <div className="absolute top-2 md:top-4 left-2 md:left-4 flex flex-col gap-1 md:gap-2">
                    {hasDiscount && (
                        <span className="bg-red-600 text-white text-[9px] md:text-[10px] font-black uppercase px-1.5 md:px-2 py-0.5 md:py-1 tracking-widest">
                            -{discountPercent}%
                        </span>
                    )}
                </div>
                
                {/* Size Selector or Quick Add */}
                {hasSizes && showSizes ? (
                    <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 bg-white p-2 md:p-3 shadow-lg">
                        <p className="text-[10px] md:text-xs font-bold uppercase mb-1 md:mb-2 text-center">Select Size</p>
                        <div className="flex gap-1 md:gap-2 justify-center flex-wrap">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={(e) => handleSizeClick(e, size)}
                                    className="border-2 border-black px-2 md:px-3 py-1 md:py-2 text-[10px] md:text-xs font-bold hover:bg-black hover:text-white transition"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={handleQuickAdd}
                        className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 bg-black text-white py-3 md:py-4 translate-y-20 group-hover:translate-y-0 transition-transform duration-300 font-bold uppercase text-[10px] md:text-[11px] tracking-[0.1em]"
                    >
                        {hasSizes ? 'Select Size' : 'Quick Add to Bag'}
                    </button>
                )}
            </div>
            <div className="mt-3 md:mt-4 flex flex-col gap-0.5 md:gap-1">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-sm md:text-base lg:text-lg uppercase tracking-tight line-clamp-2">{product.name}</h3>
                    <div className="flex flex-col items-end flex-shrink-0">
                        {hasDiscount ? (
                            <>
                                <p className="font-black text-sm md:text-base lg:text-lg">${displayPrice.toFixed(2)}</p>
                                <p className="text-gray-400 text-xs md:text-sm line-through">${product.price.toFixed(2)}</p>
                            </>
                        ) : (
                            <p className="font-black text-sm md:text-base lg:text-lg">${displayPrice}</p>
                        )}
                    </div>
                </div>
                <p className="text-gray-500 text-xs md:text-sm">{product.category}</p>
                <p className="text-gray-400 text-[10px] md:text-xs">{product.color}</p>
            </div>
        </Link>
    );
};

export default ProductCard;
