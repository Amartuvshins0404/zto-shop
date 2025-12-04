
import React from 'react';
import { useUI } from '../context/UIContext';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, clearCart, showNotification } = useUI();
  const navigate = useNavigate();
  
  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = () => {
    toggleCart();
    navigate('/dashboard?tab=Cart');
  };

  const handleStartShopping = () => {
    toggleCart();
    navigate('/category');
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleCart}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-white z-[61] shadow-2xl transform transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-lg text-slate-800">
                <ShoppingBag className="text-yellow-400" />
                Your Cart ({cartItems.length})
            </div>
            <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4">
                    <ShoppingBag size={64} className="opacity-20" />
                    <p>Your cart is empty.</p>
                    <button onClick={handleStartShopping} className="text-yellow-500 font-bold text-sm hover:underline">Start Shopping</button>
                </div>
            ) : (
                cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-4 bg-gray-50 p-3 rounded-xl">
                        <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                            <img src={item.product.image} alt={item.product.name} className="max-h-16 mix-blend-multiply" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{item.product.name}</h4>
                                <div className="text-xs text-gray-500">{item.product.brand}</div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900">{item.product.price.toLocaleString()}₮</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                    <button 
                                        onClick={() => removeFromCart(item.product.id)}
                                        className="text-red-400 hover:text-red-600"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>

        {cartItems.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-bold text-xl text-slate-900">{total.toLocaleString()}₮</span>
                </div>
                <button 
                    onClick={handleCheckout}
                    className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
                >
                    Checkout <ArrowRight size={18} />
                </button>
            </div>
        )}
      </div>
    </>
  );
};
