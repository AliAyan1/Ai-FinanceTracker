'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loginUser, logoutUser } from '@/lib/slices/userSlice';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated, user } = useAppSelector(state => state.user);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleDemoLogin = () => {
    dispatch(loginUser({ email: 'demo@example.com', password: 'password' }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {!isAuthenticated ? (
        <>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to FinanceAI</h2>
            <p className="text-gray-600">Your AI-powered personal finance companion</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

          <div className="mt-4 text-center">
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="text-blue-600 hover:text-blue-800"
            >
              Quick Demo Login
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back, {user?.name}</h2>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Logging Out...' : 'Logout'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginForm;
