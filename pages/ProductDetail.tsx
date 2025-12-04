
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Minus, Plus, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { useUI } from '../context/UIContext';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, isInWishlist } = useUI();
  
  // Mock product fetch - usually would come from API
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8 py-4 text-sm text-gray-500">
            <Link to="/" className="hover:text-slate-900 cursor-pointer">Home</Link> / 
            <Link to="/category" className="hover:text-slate-900 cursor-pointer mx-1">{product.category}</Link> / 
            <span className="text-slate-900 mx-1 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 mb-12">
            <div className="flex flex-col lg:flex-row gap-12">
                
                {/* Image Gallery */}
                <div className="lg:w-1/2">
                    <div className="bg-gray-50 rounded-xl p-8 mb-4 h-[400px] flex items-center justify-center relative">
                        <img src={product.image} alt={product.name} className="max-h-full object-contain mix-blend-multiply" />
                        {product.discount && (
                            <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-{product.discount}%</span>
                        )}
                        <button 
                            onClick={() => toggleWishlist(product)}
                            className={`absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center transition-colors
                                ${inWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                        >
                            <Heart fill={inWishlist ? "currentColor" : "none"} />
                        </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className={`w-20 h-20 rounded-lg bg-gray-50 border-2 cursor-pointer flex-shrink-0 flex items-center justify-center p-2 ${i === 1 ? 'border-yellow-400' : 'border-transparent hover:border-gray-200'}`}>
                                <img src={product.image} className="max-h-full mix-blend-multiply" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="lg:w-1/2">
                    <div className="mb-2 text-blue-600 font-bold text-sm tracking-wide">{product.brand?.toUpperCase()}</div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={18} fill="currentColor" />)}
                        </div>
                        <span className="text-gray-400 text-sm">(120 Reviews)</span>
                        <span className="text-green-500 text-sm font-medium ml-auto lg:ml-0 bg-green-50 px-3 py-1 rounded-full">In Stock</span>
                    </div>

                    <div className="text-4xl font-bold text-slate-900 mb-2">{product.price.toLocaleString()}₮</div>
                    {product.originalPrice && (
                        <div className="text-gray-400 line-through mb-8 text-lg">{product.originalPrice.toLocaleString()}₮</div>
                    )}

                    <p className="text-gray-600 leading-relaxed mb-8">
                        Experience premium quality with our carefully selected {product.name.toLowerCase()}. 
                        Sourced from the best farms and suppliers to ensure freshness and taste. 
                        Perfect for your daily nutritional needs.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="flex items-center border border-gray-300 rounded-full w-max">
                            <button 
                                className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-slate-900"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                <Minus size={18} />
                            </button>
                            <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                            <button 
                                className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-slate-900"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                        <button 
                            onClick={() => addToCart(product, quantity)}
                            className="flex-1 bg-slate-900 text-white rounded-full py-3 px-8 font-bold text-lg hover:bg-slate-800 transition-shadow shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                        >
                            <ShoppingBag /> Add to Cart
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-t border-gray-100">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><Truck size={20} /></div>
                            <div>Free Delivery<br/><span className="text-xs text-gray-400">Orders over 50k</span></div>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                             <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600"><ShieldCheck size={20} /></div>
                            <div>Secure Payment<br/><span className="text-xs text-gray-400">100% Protected</span></div>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                             <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600"><RefreshCcw size={20} /></div>
                            <div>Easy Return<br/><span className="text-xs text-gray-400">7 Days Return</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Similar Products */}
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Similar Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {PRODUCTS.slice(0, 5).map(p => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
