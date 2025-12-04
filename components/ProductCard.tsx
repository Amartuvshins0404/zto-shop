
import React from 'react';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { useUI } from '../context/UIContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openQuickView, addToCart, toggleWishlist, isInWishlist } = useUI();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col h-full relative">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.discount && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                -{product.discount}%
            </span>
        )}
        {product.isNew && (
            <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                NEW
            </span>
        )}
      </div>

      {/* Image Area */}
      <div className="relative p-4 flex items-center justify-center h-48 bg-gray-50 group-hover:bg-gray-100 transition-colors">
        <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
            <img 
            src={product.image} 
            alt={product.name} 
            className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" 
            />
        </Link>
        
        {/* Hover Actions */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-20">
             <button 
                onClick={(e) => {
                    e.preventDefault();
                    openQuickView(product);
                }}
                className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-yellow-400 hover:text-white transition-colors" 
                title="Quick View"
             >
                <Eye size={14} />
             </button>
             <button 
                onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product);
                }}
                className={`w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center transition-colors ${inWishlist ? 'text-red-500 hover:bg-red-50' : 'text-gray-600 hover:text-red-500'}`} 
                title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
             >
                <Heart size={14} fill={inWishlist ? "currentColor" : "none"} />
             </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-gray-400 mb-1">{product.brand}</div>
        <Link to={`/product/${product.id}`} className="text-sm font-medium text-slate-800 line-clamp-2 mb-2 hover:text-yellow-500 transition-colors flex-grow">
          {product.name}
        </Link>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
           <div className="flex flex-col">
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through decoration-red-400">{product.originalPrice.toLocaleString()}₮</span>
              )}
              <span className={`font-bold ${product.discount ? 'text-red-500' : 'text-slate-900'}`}>
                {product.price.toLocaleString()}₮
              </span>
           </div>
           
           <button 
             onClick={() => addToCart(product)}
             className="bg-gray-100 hover:bg-slate-900 hover:text-white text-slate-700 p-2 rounded-lg transition-colors flex items-center gap-2 group/btn"
           >
             <ShoppingBag size={16} />
             <span className="text-xs font-bold hidden sm:block">ADD</span>
           </button>
        </div>
      </div>
    </div>
  );
};
