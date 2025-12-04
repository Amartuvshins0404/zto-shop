
import React, { useState, useEffect } from 'react';
import { CURRENT_USER, RECENT_ORDERS, CHART_DATA_HISTORY, CHART_DATA_CATEGORIES } from '../constants';
import { Package, LogOut, Settings, CreditCard, ShoppingCart, TrendingUp, Sun, Calendar, Edit2, User, Mail, MapPin, Bell, Heart, Plus, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useUI } from '../context/UIContext';
import { Link, useLocation } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';

type ViewType = 'Dashboard' | 'My Orders' | 'Cart' | 'Payment Methods' | 'Settings' | 'Wishlist';

export const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('Dashboard');
  const { toggleEventModal, openAuth, cartItems, removeFromCart, wishlist, showNotification, clearCart, openOrder } = useUI();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['Dashboard', 'My Orders', 'Cart', 'Payment Methods', 'Settings', 'Wishlist'].includes(tab)) {
        setActiveView(tab as ViewType);
    }
  }, [location]);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    showNotification('Order placed successfully!', 'success');
    clearCart();
  };

  const handleSaveSettings = () => {
    showNotification('Settings saved successfully', 'success');
  };

  const handleAddCard = () => {
    showNotification('New card added', 'success');
  };

  const renderContent = () => {
    switch (activeView) {
        case 'Wishlist':
            return (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Heart size={20} className="text-red-500" fill="currentColor" /> 
                        My Wishlist
                    </h3>
                    {wishlist.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">
                            Your wishlist is empty. <Link to="/category" className="text-yellow-500 hover:underline">Browse Products</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {wishlist.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            );
        case 'My Orders':
            return (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-6">Order History</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 text-gray-400">
                                    <th className="pb-3 font-medium">Order ID</th>
                                    <th className="pb-3 font-medium">Date</th>
                                    <th className="pb-3 font-medium">Items</th>
                                    <th className="pb-3 font-medium">Total</th>
                                    <th className="pb-3 font-medium">Status</th>
                                    <th className="pb-3 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {RECENT_ORDERS.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 font-medium text-slate-800">{order.id}</td>
                                        <td className="py-4 text-gray-500">{order.date}</td>
                                        <td className="py-4 text-gray-500">{order.items} items</td>
                                        <td className="py-4 font-bold text-slate-700">{order.total.toLocaleString()}₮</td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <button 
                                                onClick={() => openOrder(order)}
                                                className="text-blue-500 hover:text-blue-700 font-medium"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        case 'Cart':
            return (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-6">Shopping Cart</h3>
                     {cartItems.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">
                            Your cart is empty. <Link to="/category" className="text-yellow-500 hover:underline">Go Shop</Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.product.id} className="flex justify-between items-center border-b border-gray-100 pb-4">
                                    <div className="flex items-center gap-4">
                                        <img src={item.product.image} className="w-16 h-16 object-contain mix-blend-multiply" alt="" />
                                        <div>
                                            <div className="font-bold">{item.product.name}</div>
                                            <div className="text-sm text-gray-500">{item.product.price.toLocaleString()}₮ x {item.quantity}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="font-bold text-lg">{(item.product.price * item.quantity).toLocaleString()}₮</div>
                                        <button onClick={() => removeFromCart(item.product.id)} className="text-red-400 hover:text-red-600">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="flex flex-col items-end pt-4 gap-4">
                                <div className="text-xl font-bold">Total: {cartItems.reduce((acc, i) => acc + (i.product.price * i.quantity), 0).toLocaleString()}₮</div>
                                <button onClick={handleCheckout} className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 shadow-lg shadow-slate-200">
                                    Checkout Now
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            );
        case 'Payment Methods':
            return (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-6">Payment Methods</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-4 bg-gray-50">
                             <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold font-serif">VISA</div>
                             <div className="flex-1">
                                 <div className="font-medium text-slate-900">•••• •••• •••• 4242</div>
                                 <div className="text-xs text-gray-500">Expires 12/24</div>
                             </div>
                             <button onClick={() => showNotification('Card removed', 'info')} className="text-red-500 text-sm font-medium hover:underline">Remove</button>
                         </div>
                         <button onClick={handleAddCard} className="border border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group text-gray-500 hover:text-slate-900">
                             <div className="flex flex-col items-center gap-1">
                                <Plus size={24} className="group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-bold">+ Add New Card</span>
                             </div>
                         </button>
                    </div>
                </div>
            );
        case 'Settings':
             return (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-6">Account Settings</h3>
                    <div className="space-y-6 max-w-2xl">
                        <div className="flex items-center gap-6">
                            <img src={CURRENT_USER.avatar} className="w-20 h-20 rounded-full" alt="" />
                            <button className="text-blue-500 text-sm font-bold hover:underline">Change Avatar</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Full Name</label>
                                <input type="text" defaultValue={CURRENT_USER.name} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-slate-900" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Email</label>
                                <input type="email" defaultValue={CURRENT_USER.email} className="w-full border border-gray-200 rounded-lg px-4 py-2 text-slate-900" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Phone</label>
                                <input type="text" defaultValue="+976 99112659" className="w-full border border-gray-200 rounded-lg px-4 py-2 text-slate-900" />
                            </div>
                        </div>
                        <button onClick={handleSaveSettings} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800">Save Changes</button>
                    </div>
                </div>
             );
        default: // Dashboard
            return (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-pink-500 rounded-2xl p-6 text-white shadow-md relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="text-sm font-medium opacity-90 mb-2">Recent Order Total</div>
                                <div className="text-2xl font-bold">100,000₮</div>
                                <div className="mt-4 text-xs opacity-75 flex items-center gap-1">
                                    <TrendingUp size={12} /> +12% from last week
                                </div>
                            </div>
                            <Package className="absolute right-[-10px] bottom-[-10px] w-24 h-24 opacity-20 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="bg-yellow-400 rounded-2xl p-6 text-white shadow-md relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="text-sm font-medium opacity-90 mb-2">Total Spending</div>
                                <div className="text-2xl font-bold">3,600,000₮</div>
                                <div className="mt-4 text-xs opacity-75 flex items-center gap-1">
                                    <TrendingUp size={12} /> +5% from last month
                                </div>
                            </div>
                            <CreditCard className="absolute right-[-10px] bottom-[-10px] w-24 h-24 opacity-20 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="bg-slate-800 rounded-2xl p-6 text-white shadow-md relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="text-sm font-medium opacity-90 mb-2">Total Items</div>
                                <div className="text-2xl font-bold">165</div>
                                <div className="mt-4 text-xs opacity-75 flex items-center gap-1">
                                    Lifetime purchased
                                </div>
                            </div>
                            <ShoppingCart className="absolute right-[-10px] bottom-[-10px] w-24 h-24 opacity-20 group-hover:scale-110 transition-transform" />
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* Line Chart */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-2">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-slate-800">Purchase History</h3>
                                <div className="flex gap-2">
                                    {['7 Days', 'Month', 'Year'].map((t, i) => (
                                        <button key={t} className={`text-xs px-3 py-1 rounded-full ${i === 1 ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-500'}`}>{t}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={CHART_DATA_HISTORY}>
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                                        <Tooltip 
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                        />
                                        <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Donut Chart */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h3 className="font-bold text-slate-800 mb-6">Top Categories</h3>
                            <div className="h-48 w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={CHART_DATA_CATEGORIES}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {CHART_DATA_CATEGORIES.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                    <span className="text-2xl font-bold text-slate-800">100%</span>
                                    <span className="text-xs text-gray-400">Total</span>
                                </div>
                            </div>
                            <div className="space-y-3 mt-4">
                                {CHART_DATA_CATEGORIES.map((cat, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{backgroundColor: cat.fill}}></div>
                                            <span className="text-gray-600">{cat.name}</span>
                                        </div>
                                        <span className="font-bold text-slate-700">{cat.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Bottom Grid: Recent Orders & Calendar/Schedule */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Orders Table */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-2">
                            <h3 className="font-bold text-slate-800 mb-6">Recent Orders</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-gray-400">
                                            <th className="pb-3 font-medium">Order ID</th>
                                            <th className="pb-3 font-medium">Date</th>
                                            <th className="pb-3 font-medium">Items</th>
                                            <th className="pb-3 font-medium">Total</th>
                                            <th className="pb-3 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {RECENT_ORDERS.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => openOrder(order)}>
                                                <td className="py-4 font-medium text-slate-800">{order.id}</td>
                                                <td className="py-4 text-gray-500">{order.date}</td>
                                                <td className="py-4 text-gray-500">{order.items} items</td>
                                                <td className="py-4 font-bold text-slate-700">{order.total.toLocaleString()}₮</td>
                                                <td className="py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        {/* Simple Calendar Widget */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
                                Schedule
                                <Calendar size={18} className="text-gray-400" />
                            </h3>
                            <div className="space-y-4">
                                {[
                                    {time: '08:00', label: 'Morning Delivery', color: 'border-l-4 border-yellow-400'},
                                    {time: '11:00', label: 'Review Products', color: 'border-l-4 border-blue-400'},
                                    {time: '14:00', label: 'Grocery Shopping', color: 'border-l-4 border-green-400'},
                                ].map((item, i) => (
                                    <div key={i} className={`bg-gray-50 p-3 rounded-r-lg ${item.color}`}>
                                        <div className="text-xs font-bold text-gray-500 mb-1">{item.time}</div>
                                        <div className="text-sm font-medium text-slate-800">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={toggleEventModal} className="w-full mt-6 bg-slate-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                                Add New Event
                            </button>
                        </div>
                    </div>
                </>
            );
    }
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-80px)] p-4 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 flex-shrink-0">
             <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-3 group cursor-pointer" onClick={() => setActiveView('Settings')}>
                        <img src={CURRENT_USER.avatar} alt="User" className="w-20 h-20 rounded-full border-4 border-gray-50" />
                        <button className="absolute bottom-0 right-0 bg-yellow-400 text-white p-1.5 rounded-full shadow-sm hover:scale-110 transition-transform">
                            <Edit2 size={12} />
                        </button>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900">{CURRENT_USER.name}</h3>
                    <p className="text-gray-400 text-xs">{CURRENT_USER.email}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                        <span className="block text-xs text-gray-400">Points</span>
                        <span className="font-bold text-slate-800">{CURRENT_USER.points}</span>
                    </div>
                     <div className="bg-gray-50 p-2 rounded-lg text-center">
                        <span className="block text-xs text-gray-400">Balance</span>
                        <span className="font-bold text-slate-800">{(CURRENT_USER.balance / 1000000).toFixed(1)}M₮</span>
                    </div>
                </div>

                <nav className="space-y-1">
                    {[
                        { icon: TrendingUp, label: 'Dashboard', id: 'Dashboard' },
                        { icon: Package, label: 'My Orders', id: 'My Orders' },
                        { icon: ShoppingCart, label: 'Cart', id: 'Cart' },
                        { icon: Heart, label: 'Wishlist', id: 'Wishlist' },
                        { icon: CreditCard, label: 'Payment Methods', id: 'Payment Methods' },
                        { icon: Settings, label: 'Settings', id: 'Settings' },
                    ].map((item) => (
                        <button 
                            key={item.id} 
                            onClick={() => setActiveView(item.id as ViewType)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeView === item.id ? 'bg-yellow-50 text-yellow-600' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                    <button onClick={openAuth} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-red-500 hover:bg-red-50">
                        <LogOut size={18} />
                        Logout
                    </button>
                </nav>
             </div>

             <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="font-bold">Weather</h4>
                        <Sun className="text-yellow-300" />
                    </div>
                    <div className="text-4xl font-light mb-1">9°C</div>
                    <div className="text-sm opacity-80">Ulaanbaatar, MN</div>
                </div>
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-white opacity-10 transform rotate-12 scale-150"></div>
             </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
             {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
