'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loginUser } from '@/lib/slices/userSlice';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.user);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  const handleDemoLogin = () => {
    dispatch(loginUser({ email: 'demo@example.com', password: 'password' }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">🤖</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to FinanceAI</h2>
        <p className="text-gray-600">Your AI-powered personal finance companion</p>
      </div>

      {/* Demo Credentials */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">🚀 Demo Credentials</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Email:</span>
            <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">demo@example.com</code>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Password:</span>
            <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">password</code>
          </div>
        </div>
        <button
          onClick={handleDemoLogin}
          disabled={loading}
          className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Quick Demo Login'}
        </button>
      </div>

      {/* Redux Toolkit Features */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-6 border border-green-200">
        <h3 className="font-semibold text-green-800 mb-3">💡 Redux Toolkit Features Demonstrated</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-green-600">•</span>
            <span className="text-gray-700">AI-powered financial insights</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-600">•</span>
            <span className="text-gray-700">Real-time budget tracking</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-600">•</span>
            <span className="text-gray-700">Smart transaction categorization</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-600">•</span>
            <span className="text-gray-700">Animated UI with smooth transitions</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-600">•</span>
            <span className="text-gray-700">Type-safe state management</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-600">•</span>
            <span className="text-gray-700">Async operations with loading states</span>
          </div>
        </div>
      </div>

      {/* Manual Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      {/* Features Preview */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">🎯 What You'll Experience</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span>📊</span>
            <span>Interactive financial dashboard with AI insights</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>💳</span>
            <span>Smart transaction management with categories</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🎯</span>
            <span>Budget planning with real-time progress tracking</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🤖</span>
            <span>AI-powered recommendations and alerts</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🔧</span>
            <span>Redux DevTools for state debugging</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 