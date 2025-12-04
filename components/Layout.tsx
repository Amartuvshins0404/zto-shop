
import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, CreditCard, Menu, Gift, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CURRENT_USER } from '../constants';
import { useUI } from '../context/UIContext';
import { NotificationContainer } from './Notification';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { toggleCart, openAuth, cartItems, wishlist } = useUI();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
        navigate(`/category?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <NotificationContainer />
      
      {/* Top Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
              <span className="transform -rotate-12">Z</span>
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900 tracking-tight leading-none">ZTO SHOP</span>
                <span className="text-[0.6rem] text-slate-500 uppercase tracking-widest leading-none">Zero to One</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl relative mx-4">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for products..." 
              className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-5 pr-12 focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all text-sm text-slate-900"
            />
            <button type="submit" className="absolute right-1 top-1 bottom-1 bg-teal-500 hover:bg-teal-600 text-white rounded-full w-10 flex items-center justify-center transition-colors">
              <Search size={18} />
            </button>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 text-slate-600">
            <Link to="/category" className="hidden sm:block hover:text-yellow-500 transition-colors" title="Special Offers">
                <Gift size={22} />
            </Link>
            <button 
                onClick={() => navigate('/dashboard?tab=Wishlist')} 
                className="hidden sm:block hover:text-red-500 transition-colors relative"
                title="Wishlist"
            >
                <Heart size={22} className={wishlist.length > 0 ? "fill-red-500 text-red-500" : ""} />
                {wishlist.length > 0 && (
                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-full">
                        {wishlist.length}
                     </span>
                )}
            </button>
            
            <button onClick={toggleCart} className="flex items-center gap-3 pl-4 border-l border-gray-200 group">
                <div className="relative">
                    <ShoppingBag size={24} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                            {cartCount}
                        </span>
                    )}
                </div>
                <div className="hidden lg:flex flex-col text-right">
                    <span className="text-xs text-gray-400">Total</span>
                    <span className="text-sm font-bold text-slate-800">{cartTotal.toLocaleString()}₮</span>
                </div>
            </button>

            <div className="relative group cursor-pointer" onClick={openAuth}>
               <img src={CURRENT_USER.avatar} alt="Profile" className="w-10 h-10 rounded-full border-2 border-gray-100 group-hover:border-yellow-400 transition-all object-cover" />
               <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="border-t border-gray-100 bg-white hidden md:block">
            <div className="container mx-auto px-4 lg:px-8">
                <nav className="flex items-center gap-8 py-3 text-sm font-medium text-slate-600 overflow-x-auto no-scrollbar">
                    <Link to="/category" className="flex items-center gap-2 bg-yellow-400 text-white px-4 py-1.5 rounded-full hover:bg-yellow-500 transition-colors whitespace-nowrap">
                        <Menu size={16} />
                        ALL CATEGORIES
                    </Link>
                    {['SPECIAL OFFERS', 'FOOD', 'DRINKS', 'HOUSEHOLD', 'BABY & KIDS', 'BEAUTY', 'ELECTRONICS'].map((item) => (
                        <Link key={item} to="/category" className="hover:text-yellow-500 transition-colors whitespace-nowrap">{item}</Link>
                    ))}
                </nav>
            </div>
        </div>
      </header>

      {/* Mobile Search (Visible only on small screens) */}
      <div className="md:hidden bg-white p-4 shadow-sm">
        <form onSubmit={handleSearch} className="relative">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..." 
              className="w-full bg-gray-100 border-none rounded-lg py-2 px-4 focus:ring-1 focus:ring-yellow-400 text-slate-900"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
                <Search size={18} />
            </button>
        </form>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 text-sm">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-slate-900 font-bold">Z</div>
                        <span className="text-xl font-bold text-white">ZTO SHOP</span>
                    </div>
                    <p className="mb-6 leading-relaxed">
                        We provide the best quality products for your daily needs. Shop with confidence and get fast delivery.
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-colors cursor-pointer">
                            <span className="font-bold">f</span>
                        </div>
                        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors cursor-pointer">
                            <span className="font-bold">in</span>
                        </div>
                        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors cursor-pointer">
                            <span className="font-bold">t</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-6">QUICK LINKS</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:text-yellow-400 transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-yellow-400 transition-colors">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:text-yellow-400 transition-colors">Careers</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-6">CUSTOMER SERVICE</h3>
                    <ul className="space-y-3">
                        <li><Link to="/dashboard?tab=Settings" className="hover:text-yellow-400 transition-colors">My Account</Link></li>
                        <li><Link to="/dashboard?tab=My Orders" className="hover:text-yellow-400 transition-colors">Order History</Link></li>
                        <li><Link to="/dashboard?tab=Dashboard" className="hover:text-yellow-400 transition-colors">Tracking List</Link></li>
                        <li><a href="#" className="hover:text-yellow-400 transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-yellow-400 transition-colors">Returns</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-6">DOWNLOAD APP</h3>
                    <p className="mb-4">Get access to exclusive offers!</p>
                    <div className="flex flex-col gap-3">
                        <button className="bg-black border border-gray-700 rounded-lg p-2 flex items-center gap-3 hover:bg-gray-800 transition-colors w-40">
                             <div className="w-6 h-6 bg-white rounded-full"></div> 
                             <div className="text-left">
                                <div className="text-[10px]">Download on the</div>
                                <div className="text-sm font-bold text-white">App Store</div>
                             </div>
                        </button>
                        <button className="bg-black border border-gray-700 rounded-lg p-2 flex items-center gap-3 hover:bg-gray-800 transition-colors w-40">
                             <div className="w-6 h-6 bg-white rounded-full"></div>
                             <div className="text-left">
                                <div className="text-[10px]">GET IT ON</div>
                                <div className="text-sm font-bold text-white">Google Play</div>
                             </div>
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; 2023 ZTO Shop. All rights reserved.</p>
                <div className="flex gap-4">
                    <CreditCard className="text-slate-600" />
                    <CreditCard className="text-slate-600" />
                    <CreditCard className="text-slate-600" />
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};
