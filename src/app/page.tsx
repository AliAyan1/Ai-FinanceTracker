'use client';

import { useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
import Header from '@/components/Header';
import FinanceDashboard from '@/components/FinanceDashboard';
import TransactionManager from '@/components/TransactionManager';
import BudgetPlanner from '@/components/BudgetPlanner';
import LoginForm from '@/components/LoginForm';
import ReduxDevTools from '@/components/ReduxDevTools';
import StateMonitor from '@/components/StateMonitor';

export default function Home() {
  const { isAuthenticated, user } = useAppSelector(state => state.user);
  const { loading: transactionsLoading } = useAppSelector(state => state.transactions);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">💰 FinanceAI</h1>
              <p className="text-gray-600">Your AI-powered personal finance dashboard</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'transactions', label: 'Transactions', icon: '💳' },
    { id: 'budgets', label: 'Budgets', icon: '🎯' },
    { id: 'devtools', label: 'DevTools', icon: '🔧' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {transactionsLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Content */}
        {!transactionsLoading && (
          <div>
            {activeTab === 'dashboard' && <FinanceDashboard />}
            {activeTab === 'transactions' && <TransactionManager />}
            {activeTab === 'budgets' && <BudgetPlanner />}
            {activeTab === 'devtools' && (
              <div className="space-y-6">
                <ReduxDevTools />
                <StateMonitor />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
