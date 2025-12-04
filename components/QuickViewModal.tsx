
import React from 'react';
import { useUI } from '../context/UIContext';
import { Modal } from './Modal';
import { Star, ShoppingBag, Heart, Check } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isInWishlist } = useUI();
  
  if (!quickViewProduct) return null;
  
  const inWishlist = isInWishlist(quickViewProduct.id);

  return (
    <Modal isOpen={!!quickViewProduct} onClose={closeQuickView} title="Quick View" maxWidth="max-w-4xl">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 bg-gray-50 rounded-xl p-8 flex items-center justify-center">
            <img 
                src={quickViewProduct.image} 
                alt={quickViewProduct.name} 
                className="max-h-[300px] object-contain mix-blend-multiply" 
            />
        </div>
        <div className="md:w-1/2 flex flex-col">
            <div className="text-blue-500 font-bold text-xs tracking-wider mb-2">{quickViewProduct.brand.toUpperCase()}</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{quickViewProduct.name}</h2>
            
            <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                </div>
                <span className="text-gray-400 text-xs">(25 Reviews)</span>
            </div>

            <div className="flex items-end gap-3 mb-6">
                <span className="text-3xl font-bold text-slate-900">{quickViewProduct.price.toLocaleString()}₮</span>
                {quickViewProduct.originalPrice && (
                    <span className="text-lg text-gray-400 line-through decoration-red-400 mb-1">{quickViewProduct.originalPrice.toLocaleString()}₮</span>
                )}
            </div>

            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                {quickViewProduct.description || "Fresh and high quality product sourced directly from the best producers. Perfect for your daily needs."}
            </p>

            <div className="flex gap-4 mt-auto">
                <button 
                    onClick={() => {
                        addToCart(quickViewProduct);
                        closeQuickView();
                    }}
                    className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                    <ShoppingBag size={18} /> Add to Cart
                </button>
                <button 
                    onClick={() => toggleWishlist(quickViewProduct)}
                    className={`w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center transition-colors
                        ${inWishlist ? 'text-red-500 border-red-200' : 'text-gray-400 hover:text-red-500 hover:border-red-200'}`}
                >
                    <Heart size={20} fill={inWishlist ? "currentColor" : "none"} />
                </button>
            </div>
        </div>
      </div>
    </Modal>
  );
};
