'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { logoutUser } from '@/lib/slices/userSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);
  const { transactions } = useAppSelector(state => state.transactions);
  const { budgets } = useAppSelector(state => state.budgets);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Calculate quick stats
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netIncome = totalIncome - totalExpenses;

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="text-3xl">💰</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">FinanceAI</h1>
              <p className="text-sm text-gray-600">AI-Powered Personal Finance</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
              <span className="text-green-600 font-medium">Income:</span>
              <span className="font-semibold text-green-700">${totalIncome.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2 bg-red-100 px-3 py-1 rounded-full">
              <span className="text-red-600 font-medium">Expenses:</span>
              <span className="font-semibold text-red-700">${totalExpenses.toLocaleString()}</span>
            </div>
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
              netIncome >= 0 ? 'bg-blue-100' : 'bg-orange-100'
            }`}>
              <span className={`font-medium ${netIncome >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                Net:
              </span>
              <span className={`font-semibold ${netIncome >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
                ${netIncome.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-full">
              <span className="text-purple-600 font-medium">Budgets:</span>
              <span className="font-semibold text-purple-700">{budgets.length}</span>
            </div>
          </div>

          {/* User Info and Logout */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {user.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="hidden md:block">
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            )}
            
            <button
              onClick={handleLogout}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 