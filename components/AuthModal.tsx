import React, { useState } from 'react';
import { useUI } from '../context/UIContext';
import { Modal } from './Modal';
import { User } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, closeAuth } = useUI();
  const [isLogin, setIsLogin] = useState(true);
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleDemoLogin = () => {
    setIsLogin(true);
    setEmail('bat-erdene@gmail.com');
    setPassword('demo123456');
  };

  return (
    <Modal isOpen={isAuthOpen} onClose={closeAuth} title={isLogin ? 'Welcome Back' : 'Create Account'}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg mb-2">
            <button 
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${isLogin ? 'bg-white shadow text-slate-900' : 'text-gray-500'}`}
                onClick={() => setIsLogin(true)}
            >
                Login
            </button>
            <button 
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${!isLogin ? 'bg-white shadow text-slate-900' : 'text-gray-500'}`}
                onClick={() => setIsLogin(false)}
            >
                Sign Up
            </button>
        </div>

        {!isLogin && (
            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">Full Name</label>
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-yellow-400 outline-none text-slate-900" 
                    placeholder="John Doe" 
                />
            </div>
        )}

        <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500">Email Address</label>
            <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-yellow-400 outline-none text-slate-900" 
                placeholder="you@example.com" 
            />
        </div>

        <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500">Password</label>
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-yellow-400 outline-none text-slate-900" 
                placeholder="••••••••" 
            />
        </div>

        {isLogin && (
            <div className="flex justify-between items-center">
                <button 
                    onClick={handleDemoLogin}
                    className="text-xs font-bold text-slate-700 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
                >
                    <User size={12} /> Demo Account
                </button>
                <a href="#" className="text-xs text-blue-500 hover:underline">Forgot Password?</a>
            </div>
        )}

        <button className="bg-slate-900 text-white py-3 rounded-xl font-bold mt-2 hover:bg-slate-800 transition-colors">
            {isLogin ? 'Login' : 'Create Account'}
        </button>

        <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-slate-700">
                <span className="font-bold text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-slate-700">
                <span className="font-bold text-sm">Facebook</span>
            </button>
        </div>
      </div>
    </Modal>
  );
};