
import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, Grid, List } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
import { useUI } from '../context/UIContext';

export const CategoryPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('Popularity');
  const location = useLocation();
  const { showNotification } = useUI();
  
  // Extract search term from URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    if (searchQuery) {
        // Just for visual confirmation since we are mocking
        // console.log("Searching for:", searchQuery);
    }
  }, [searchQuery]);

  const handleGetOffer = () => {
    showNotification('Discount applied to your session!', 'success');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">
                    {searchQuery ? `Search Results for "${searchQuery}"` : "Food & Beverages"}
                </h1>
                <p className="text-gray-500 mt-1">Showing 1-24 of 120 products</p>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-transparent font-medium text-slate-800 outline-none cursor-pointer"
                    >
                        <option>Popularity</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest First</option>
                    </select>
                </div>
                <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${viewMode === 'grid' ? 'text-slate-900 bg-gray-100' : 'text-gray-400'}`}
                    >
                        <Grid size={20} />
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors ${viewMode === 'list' ? 'text-slate-900 bg-gray-100' : 'text-gray-400'}`}
                    >
                        <List size={20} />
                    </button>
                </div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
                {/* Category Filter */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center justify-between">
                        Categories
                        <ChevronDown size={16} />
                    </h3>
                    <ul className="space-y-3">
                        {CATEGORIES.map(cat => (
                            <li key={cat.id} className="flex items-center justify-between text-sm group cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center group-hover:border-yellow-400"></div>
                                    <span className="text-gray-600 group-hover:text-yellow-500 transition-colors">{cat.name}</span>
                                </div>
                                <span className="text-gray-400 text-xs bg-gray-100 px-2 py-0.5 rounded-full">24</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Price Filter */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-4">Price Range</h3>
                    <div className="h-1 bg-gray-200 rounded-full mb-4 relative">
                        <div className="absolute left-0 w-1/2 h-full bg-yellow-400 rounded-full"></div>
                        <div className="absolute left-0 w-4 h-4 bg-white border-2 border-yellow-400 rounded-full top-1/2 -translate-y-1/2 shadow cursor-pointer"></div>
                        <div className="absolute left-1/2 w-4 h-4 bg-white border-2 border-yellow-400 rounded-full top-1/2 -translate-y-1/2 shadow cursor-pointer"></div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                        <span>0₮</span>
                        <span>100,000₮</span>
                    </div>
                </div>

                {/* Banner Ad */}
                <div className="bg-blue-600 rounded-2xl p-6 text-white text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="font-bold text-2xl mb-2">30% OFF</div>
                        <p className="text-sm opacity-90 mb-4">On all organic fruits this weekend!</p>
                        <button 
                            onClick={handleGetOffer}
                            className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-400 hover:text-slate-900 transition-colors"
                        >
                            Get Offer
                        </button>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
                <div className={`grid gap-4 lg:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                    {/* Repeat products to fill grid */}
                    {[...PRODUCTS, ...PRODUCTS, ...PRODUCTS].map((product, idx) => (
                        <ProductCard key={`${product.id}-${idx}`} product={product} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-12 flex items-center justify-center gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-500">
                        &lt;
                    </button>
                    {[1, 2, 3, '...', 12].map((p, i) => (
                        <button 
                            key={i} 
                            className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${p === 1 ? 'bg-slate-900 text-white' : 'hover:bg-gray-100 text-slate-700'}`}
                        >
                            {p}
                        </button>
                    ))}
                    <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-500">
                        &gt;
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
