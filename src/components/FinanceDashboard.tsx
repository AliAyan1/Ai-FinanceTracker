'use client';

import { useState, useEffect } from 'react';

// TypeScript interfaces for Transaction and Budget
interface Transaction {
  id: number;
  category: string;
  amount: number;
  date: string;
  note: string;
  type: 'income' | 'expense'; // Adding type for income/expense
}

interface Budget {
  id: number;
  category: string;
  amount: number;
  period: string;
}

// Mock data for demonstration
const mockTransactions: Transaction[] = [
  { id: 1, category: 'Housing', amount: 1200, date: '2024-07-15', note: 'Rent payment', type: 'expense' },
  { id: 2, category: 'Food', amount: 300, date: '2024-07-14', note: 'Groceries', type: 'expense' },
  { id: 3, category: 'Transportation', amount: 150, date: '2024-07-13', note: 'Gas for car', type: 'expense' },
];

const mockBudgets: Budget[] = [
  { id: 1, category: 'Housing', amount: 1500, period: 'Monthly' },
  { id: 2, category: 'Food', amount: 600, period: 'Monthly' },
  { id: 3, category: 'Transportation', amount: 200, period: 'Monthly' },
];

const FinanceDashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate data fetching with delay
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));  // Simulate network delay
      setTransactions(mockTransactions);  // Set mock transactions
      setBudgets(mockBudgets);            // Set mock budgets
      setLoading(false);
    };

    fetchData(); // Fetch data on component mount
  }, []); // Empty dependency array to run this only on component mount

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 px-4">
        <div className="text-center max-w-md w-full">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-purple-200 border-b-purple-600 mx-auto animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">Loading Dashboard</h3>
            <p className="text-gray-600">Preparing your financial insights...</p>
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 px-4">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">

        {/* Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2 sm:mb-3">
            Financial Dashboard
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl">
            Track your money, set budgets, and get AI-powered insights for smarter financial decisions.
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <div className="group bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 text-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-green-100 text-xs sm:text-sm font-medium mb-1 sm:mb-2">Total Income</p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate">${transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}</p>
                <p className="text-green-200 text-xs mt-1 hidden sm:block">This month</p>
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl ml-2 group-hover:scale-110 transition-transform duration-300">💰</div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-red-500 via-red-600 to-rose-600 text-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-red-100 text-xs sm:text-sm font-medium mb-1 sm:mb-2">Total Expenses</p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate">${transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}</p>
                <p className="text-red-200 text-xs mt-1 hidden sm:block">This month</p>
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl ml-2 group-hover:scale-110 transition-transform duration-300">💸</div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 text-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-blue-100 text-xs sm:text-sm font-medium mb-1 sm:mb-2">Net Income</p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate">${transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) - transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)}</p>
                <p className="text-blue-200 text-xs mt-1 hidden sm:block">This month</p>
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl ml-2 group-hover:scale-110 transition-transform duration-300">📈</div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-purple-500 via-purple-600 to-violet-600 text-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-purple-100 text-xs sm:text-sm font-medium mb-1 sm:mb-2">Savings Rate</p>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{(100 * (transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) - transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)) / transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)).toFixed(1)}%</p>
                <p className="text-purple-200 text-xs mt-1 hidden sm:block">This month</p>
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl ml-2 group-hover:scale-110 transition-transform duration-300">🎯</div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white p-4 mt-4 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold">Transactions</h2>
          <ul className="space-y-4 mt-4">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <span>{transaction.category}</span>
                  <span className="ml-2 text-gray-500 text-sm">{transaction.date}</span>
                </div>
                <div className="text-right text-lg font-semibold">
                  ${transaction.amount.toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Budgets List */}
        <div className="bg-white p-4 mt-4 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold">Budgets</h2>
          <ul className="space-y-4 mt-4">
            {budgets.map((budget) => (
              <li key={budget.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <span>{budget.category}</span>
                  <span className="ml-2 text-gray-500 text-sm">{budget.period}</span>
                </div>
                <div className="text-right text-lg font-semibold">
                  ${budget.amount.toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
