'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addBudget, deleteBudget, editBudget } from '@/lib/slices/budgetSlice';
import { Budget } from '@/lib/slices/budgetSlice';
// Removed unused import of Transaction
// import { Transaction } from '@/lib/slices/transactionSlice';

const BudgetPlanner = () => {
  const dispatch = useAppDispatch();
  const { budgets } = useAppSelector(state => state.budgets);
  const { transactions } = useAppSelector(state => state.transactions);
  const { categories } = useAppSelector(state => state.categories);
  
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    period: 'monthly' as 'monthly' | 'yearly'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBudget) {
      dispatch(editBudget({
        ...editingBudget,
        ...formData,
        amount: parseFloat(formData.amount)
      }));
      setEditingBudget(null);
    } else {
      dispatch(addBudget({
        ...formData,
        amount: parseFloat(formData.amount)
      }));
    }
    
    setFormData({
      category: '',
      amount: '',
      period: 'monthly'
    });
    setShowForm(false);
  };

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setFormData({
      category: budget.category,
      amount: budget.amount.toString(),
      period: budget.period
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this budget?')) {
      dispatch(deleteBudget(id));
    }
  };

  // Calculate spending for each budget
  const getBudgetStatus = (budget: Budget) => {
    const spent = transactions
      .filter(t => t.type === 'expense' && t.category === budget.category)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const percentage = (spent / budget.amount) * 100;
    const remaining = budget.amount - spent;
    
    return { spent, percentage, remaining };
  };

  // AI Budget Recommendations
  const getAIRecommendations = () => {
    const recommendations = [];
    
    // Find categories without budgets
    const categoriesWithBudgets = budgets.map(b => b.category);
    const categoriesWithoutBudgets = categories
      .filter(cat => cat.type === 'expense' && !categoriesWithBudgets.includes(cat.name));
    
    if (categoriesWithoutBudgets.length > 0) {
      recommendations.push(`💡 Consider setting budgets for: ${categoriesWithoutBudgets.slice(0, 3).map(c => c.name).join(', ')}`);
    }
    
    // Check for over-budget categories
    budgets.forEach(budget => {
      const status = getBudgetStatus(budget);
      if (status.percentage > 100) {
        recommendations.push(`⚠️ ${budget.category} is over budget by $${Math.abs(status.remaining).toFixed(2)}`);
      } else if (status.percentage > 80) {
        recommendations.push(`⚠️ ${budget.category} is approaching budget limit (${status.percentage.toFixed(1)}%)`);
      }
    });
    
    // General recommendations
    const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    if (totalBudget > totalIncome * 0.8) {
      recommendations.push('💡 Your total budget is quite high relative to income. Consider reducing some budgets.');
    }
    
    return recommendations;
  };

  const recommendations = getAIRecommendations();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Budget Planner</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          {showForm ? 'Cancel' : '+ Add Budget'}
        </button>
      </div>

      {/* AI Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border-l-4 border-purple-500">
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">🤖</div>
            <h3 className="text-lg font-semibold text-gray-800">AI Budget Recommendations</h3>
          </div>
          <div className="space-y-2">
            {recommendations.map((rec, index) => (
              <div 
                key={index}
                className="p-3 bg-white rounded-lg shadow-sm animate-in slide-in-from-left-2 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 animate-in slide-in-from-top-2 duration-500">
          <h3 className="text-lg font-semibold mb-4">
            {editingBudget ? 'Edit Budget' : 'Add New Budget'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  {categories
                    .filter(cat => cat.type === 'expense')
                    .map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              
            
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
                <select
                  value={formData.period}
                  onChange={(e) => setFormData({...formData, period: e.target.value as 'monthly' | 'yearly'})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {editingBudget ? 'Update' : 'Add'} Budget
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingBudget(null);
                  setFormData({
                    category: '',
                    amount: '',
                    period: 'monthly'
                  });
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Budgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget, index) => {
          const status = getBudgetStatus(budget);
          
          return (
            <div 
              key={budget.id}
              className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-500 delay-${index * 100} animate-in slide-in-from-bottom-2 duration-500`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{budget.category}</h3>
                  <p className="text-sm text-gray-500 capitalize">{budget.period}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(budget)}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(budget.id)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Spent</span>
                  <span>${status.spent.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Budget</span>
                  <span>${budget.amount.toLocaleString()}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                      status.percentage > 100 ? 'bg-red-500' : 
                      status.percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}

                    style={{ width: `${Math.min(status.percentage, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${
                    status.percentage > 100 ? 'text-red-600' : 
                    status.percentage > 80 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {status.percentage.toFixed(1)}% used
                  </span>
                  
                  <span className={`text-sm font-medium ${
                    status.remaining < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {status.remaining >= 0 ? '+' : ''}${status.remaining.toFixed(2)} remaining
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {budgets.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Budgets Set</h3>
          <p className="text-gray-500">Create your first budget to start tracking your spending goals!</p>
        </div>
      )}
    </div>
  );
};

export default BudgetPlanner;

          
