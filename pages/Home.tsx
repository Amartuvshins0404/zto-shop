
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS, RECIPES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Link, useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('SPECIAL');
  const navigate = useNavigate();

  const getFilteredProducts = () => {
    switch (activeTab) {
        case 'NEW':
            return PRODUCTS.filter(p => p.isNew);
        case 'DISCOUNTED':
            return PRODUCTS.filter(p => p.discount);
        case 'DEMANDED':
             // Mock logic for demanded - essentially random mix
            return PRODUCTS.filter((_, i) => i % 2 === 0);
        default: // SPECIAL
            return PRODUCTS;
    }
  };

  const filteredProducts = getFilteredProducts().length > 0 ? getFilteredProducts() : PRODUCTS;

  return (
    <div className="pb-20">
      {/* Hero Banner */}
      <section className="bg-gray-50 overflow-hidden relative">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row items-center h-[400px] md:h-[500px]">
                <div className="md:w-1/2 z-10 space-y-6">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider inline-block mb-2">HOT DEAL</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
                        SAMSUNG <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500">SUPER SALE</span>
                    </h1>
                    <p className="text-gray-500 text-lg max-w-md">Upgrade your home with the latest technology from Samsung. Limited time offer.</p>
                    <Link to="/category">
                        <button className="bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-red-200 hover:bg-red-700 hover:shadow-xl transition-all flex items-center gap-2 group mt-4">
                            Shop Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
                <div className="md:w-1/2 absolute md:relative right-0 bottom-0 top-0 opacity-20 md:opacity-100 flex items-end justify-center">
                    <img 
                        src="https://picsum.photos/id/2/800/600" 
                        alt="Hero Banner" 
                        className="max-h-full object-cover md:object-contain mix-blend-multiply"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-slate-800">BROWSE CATEGORIES</h2>
                <p className="text-gray-400 text-sm mt-1">THIS WEEK</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {CATEGORIES.map((cat) => (
                    <Link to="/category" key={cat.id} className="flex flex-col items-center gap-3 group cursor-pointer min-w-[100px]">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:border-yellow-400 group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
                             {/* Icons placeholder since we don't have all specific SVGs */}
                             <div className="text-slate-400 group-hover:text-yellow-500 transition-colors">
                                <span className="text-2xl font-bold">{cat.name[0]}</span>
                             </div>
                        </div>
                        <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      {/* Recommended for You */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                 <div className="text-center md:text-left w-full">
                    <h2 className="text-2xl font-bold text-slate-800">RECOMMENDED FOR YOU</h2>
                    <p className="text-gray-400 text-sm mt-1">EVERYTHING YOU NEED IN ONE PLACE</p>
                </div>
                
                <div className="flex items-center justify-center md:justify-end gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                    {['SPECIAL', 'DEMANDED', 'NEW', 'DISCOUNTED'].map((filter) => (
                        <button 
                            key={filter} 
                            onClick={() => setActiveTab(filter)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${activeTab === filter ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6 min-h-[300px]">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="mt-12 text-center">
                <Link to="/category">
                    <button className="bg-slate-900 text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg shadow-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all">
                        VIEW ALL PRODUCTS
                    </button>
                </Link>
            </div>
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="rounded-3xl overflow-hidden relative bg-blue-600 h-64 md:h-80 flex items-center">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/id/12/1600/600')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                <div className="relative z-10 px-8 md:px-16 w-full text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">GET YOUR GROCERIES DELIVERED</h2>
                    <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
                    <Link to="/category">
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-yellow-400 hover:text-slate-900 transition-colors">
                            START SHOPPING
                        </button>
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* Recipes */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
             <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-slate-800">YOUR RECIPES</h2>
                <p className="text-gray-400 text-sm mt-1">FAVORITE FOOD WITH YOUR OWN HANDS</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {RECIPES.map((recipe) => (
                    <div key={recipe.id} className="group cursor-pointer">
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4">
                            <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <h3 className="font-bold text-slate-800 group-hover:text-yellow-500 transition-colors mb-1">{recipe.title}</h3>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span>{recipe.duration}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{recipe.calories} kcal</span>
                        </div>
                    </div>
                ))}
            </div>
             <div className="mt-10 text-center">
                <Link to="/category">
                    <button className="bg-slate-900 text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-slate-800 transition-all">
                        SEE ALL RECIPES
                    </button>
                </Link>
            </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-12">FEATURED BRANDS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 opacity-60">
                {[1,2,3,4,5,6].map((i) => (
                    <Link to="/category" key={i} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer hover:opacity-100">
                        <img src={`https://picsum.photos/id/${i * 10 + 50}/150/80`} alt="Brand" className="max-h-12" />
                    </Link>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};
