import { useEffect, useState } from 'react';

// TypeScript interfaces
interface Transaction {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  note: string;
}

interface Budget {
  id: number;
  category: string;
  amount: number;
  period: string;
}

const FinanceDashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [animate, setAnimate] = useState<boolean>(false);

  // Mock data for demonstration
  const mockTransactions: Transaction[] = [
    {
      id: 1,
      type: 'income',
      amount: 5000,
      category: 'Salary',
      date: '2024-07-15',
      note: 'Monthly salary'
    },
    {
      id: 2,
      type: 'expense',
      amount: 1200,
      category: 'Housing',
      date: '2024-07-14',
      note: 'Rent payment'
    },
    {
      id: 3,
      type: 'expense',
      amount: 300,
      category: 'Food',
      date: '2024-07-13',
      note: 'Groceries'
    },
    {
      id: 4,
      type: 'income',
      amount: 500,
      category: 'Freelance',
      date: '2024-07-12',
      note: 'Web design project'
    },
    {
      id: 5,
      type: 'expense',
      amount: 150,
      category: 'Transportation',
      date: '2024-07-11',
      note: 'Gas and maintenance'
    },
    {
      id: 6,
      type: 'expense',
      amount: 80,
      category: 'Entertainment',
      date: '2024-07-10',
      note: 'Movie tickets'
    }
  ];

  const mockBudgets: Budget[] = [
    {
      id: 1,
      category: 'Housing',
      amount: 1500,
      period: 'Monthly'
    },
    {
      id: 2,
      category: 'Food',
      amount: 600,
      period: 'Monthly'
    },
    {
      id: 3,
      category: 'Transportation',
      amount: 300,
      period: 'Monthly'
    },
    {
      id: 4,
      category: 'Entertainment',
      amount: 200,
      period: 'Monthly'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadData = async (): Promise<void> => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTransactions(mockTransactions);
      setBudgets(mockBudgets);
      setLoading(false);
      setAnimate(true);
    };

    loadData();
  }, []);

  // Calculate financial insights
  const totalIncome: number = transactions
    .filter((t: Transaction) => t.type === 'income')
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

  const totalExpenses: number = transactions
    .filter((t: Transaction) => t.type === 'expense')
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

  const netIncome: number = totalIncome - totalExpenses;
  const savingsRate: number = totalIncome > 0 ? (netIncome / totalIncome) * 100 : 0;

  // AI Insights
  const getAIInsights = (): string[] => {
    const insights: string[] = [];
    
    if (savingsRate < 20) {
      insights.push('💡 Consider increasing your savings rate to 20% for better financial security');
    }
    
    const expenseTransactions: Transaction[] = transactions.filter((t: Transaction) => t.type === 'expense');
    if (expenseTransactions.length > 0) {
      const topExpense: Transaction = expenseTransactions
        .reduce((max: Transaction, t: Transaction) => t.amount > max.amount ? t : max, { id: 0, amount: 0, category: '', type: 'expense', date: '', note: '' });
      
      if (topExpense.amount > totalIncome * 0.3) {
        insights.push(`⚠️ ${topExpense.category} is taking up a large portion of your income`);
      }
    }
    
    if (netIncome > 0) {
      insights.push('🎉 Great job! You\'re maintaining a positive cash flow');
    } else {
      insights.push('📊 Focus on reducing expenses or increasing income to improve cash flow');
    }
    
    return insights;
  };

  const insights: string[] = getAIInsights();

  const handleViewAll = (): void => {
    console.log('View all transactions');
  };

  const handleManageBudgets = (): void => {
    console.log('Manage budgets');
  };

  const handleCreateBudget = (): void => {
    console.log('Create budget');
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Mobile-first Container */}
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
          
          {/* Header - Responsive Typography */}
          <div className={`transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2 sm:mb-3">
                Financial Dashboard
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl">
                Track your money, set budgets, and get AI-powered insights for smarter financial decisions
              </p>
            </div>
          </div>

          {/* Key Metrics Cards - Ultra Responsive Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 transition-all duration-1000 delay-200 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            
            <div className="group bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 text-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-green-100 text-xs sm:text-sm font-medium mb-1 sm:mb-2">Total Income</p>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate">${totalIncome.toLocaleString()}</p>
                  <p className="text-green-200 text-xs mt-1 hidden sm:block">This month</p>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl ml-2 group-hover:scale-110 transition-transform duration-300">💰</div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-red-500 via-red-600 to-rose-600 text-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-red-100 text-xs sm:text-sm font-medium mb-1 sm:mb-2">Total Expenses</p>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate">${totalExpenses.toLocaleString()}</p>
                  <p className="text-red-200 text-xs mt-1 hidden sm:block">This month</p>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl ml-2 group-hover:scale-110 transition-transform duration-300">💸</div>
              </div>
            </div>

            <div className={`group bg-gradient-to-br ${netIncome >= 0 ? 'from-blue-500 via-blue-600 to-cyan-600' : 'from-orange-500 via-orange-600 to-red-600'} text-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-blue-100 text-xs sm:text-sm font-medium mb-1 sm:mb-2">Net Income</p>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate">${netIncome.toLocaleString()}</p>
                  <p className={`text-xs mt-1 hidden sm:block ${netIncome >= 0 ? 'text-blue-200' : 'text-orange-200'}`}>
                    {netIncome >= 0 ? 'Surplus' : 'Deficit'}
                  </p>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl ml-2 group-hover:scale-110 transition-transform duration-300">
                  {netIncome >= 0 ? '📈' : '📉'}
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-purple-500 via-purple-600 to-violet-600 text-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-purple-100 text-xs sm:text-sm font-medium mb-1 sm:mb-2">Savings Rate</p>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{savingsRate.toFixed(1)}%</p>
                  <p className={`text-xs mt-1 hidden sm:block ${savingsRate >= 20 ? 'text-purple-200' : 'text-purple-300'}`}>
                    {savingsRate >= 20 ? 'Great!' : 'Needs work'}
                  </p>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl ml-2 group-hover:scale-110 transition-transform duration-300">🎯</div>
              </div>
            </div>
          </div>

          {/* AI Insights Section - Mobile Optimized */}
          <div className={`bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl p-4 sm:p-6 md:p-8 transition-all duration-1000 delay-400 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="text-2xl sm:text-3xl mr-3 animate-pulse">🤖</div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">AI Financial Insights</h2>
              </div>
              <div className="ml-auto hidden sm:block">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Smart Analysis
                </span>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {insights.length > 0 ? insights.map((insight: string, index: number) => (
                <div 
                  key={index}
                  className="group p-3 sm:p-4 md:p-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-lg sm:rounded-xl border-l-4 border-blue-500 hover:border-purple-500 hover:shadow-md hover:scale-[1.02] transition-all duration-300"
                >
                  <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">{insight}</p>
                </div>
              )) : (
                <div className="p-4 sm:p-6 bg-gray-50 rounded-lg sm:rounded-xl text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-gray-600 text-sm sm:text-base">No insights available. Add more transactions to get personalized recommendations.</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Transactions - Mobile First Design */}
          <div className={`bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl p-4 sm:p-6 md:p-8 transition-all duration-1000 delay-600 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">Recent Transactions</h2>
              <button 
                onClick={handleViewAll}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-200"
              >
                View All →
              </button>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {transactions.length > 0 ? transactions.slice(0, 6).map((transaction: Transaction, index: number) => (
                <div 
                  key={transaction.id}
                  className={`group flex items-center justify-between p-3 sm:p-4 bg-gray-50/80 hover:bg-white rounded-lg sm:rounded-xl hover:shadow-md transition-all duration-200 ${index >= 3 ? 'hidden sm:flex' : ''}`}
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-3 sm:mr-4 flex-shrink-0 ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'} group-hover:scale-125 transition-transform duration-200`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">{transaction.category}</p>
                          <p className="text-xs sm:text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right mt-1 sm:mt-0 sm:ml-4">
                          <p className={`font-bold text-sm sm:text-base md:text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {transaction.note && (
                        <p className="text-xs text-gray-500 mt-1 truncate sm:hidden">{transaction.note}</p>
                      )}
                    </div>
                  </div>
                  {transaction.note && (
                    <p className="text-xs text-gray-500 ml-4 hidden sm:block max-w-32 truncate">{transaction.note}</p>
                  )}
                </div>
              )) : (
                <div className="text-center py-8 sm:py-12">
                  <div className="text-4xl sm:text-6xl mb-4">💳</div>
                  <p className="text-gray-500 text-sm sm:text-base">No transactions found. Start by adding your first transaction.</p>
                </div>
              )}
            </div>
          </div>

          {/* Budget Overview - Responsive Grid */}
          <div className={`bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl p-4 sm:p-6 md:p-8 transition-all duration-1000 delay-800 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">Budget Overview</h2>
              <button 
                onClick={handleManageBudgets}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-200"
              >
                Manage Budgets →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {budgets.length > 0 ? budgets.map((budget: Budget) => {
                const spent: number = transactions
                  .filter((t: Transaction) => t.type === 'expense' && t.category === budget.category)
                  .reduce((sum: number, t: Transaction) => sum + t.amount, 0);
                const percentage: number = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
                const remaining: number = budget.amount - spent;
                
                return (
                  <div 
                    key={budget.id}
                    className="group p-4 sm:p-5 md:p-6 border-2 border-gray-200 hover:border-blue-300 rounded-lg sm:rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 bg-white/50 hover:bg-white"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-3 sm:mb-4">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg flex-1 min-w-0 pr-2">{budget.category}</h3>
                        <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">{budget.period}</span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between text-xs sm:text-sm font-medium mb-2">
                          <span className="text-gray-600 truncate">Spent: ${spent.toLocaleString()}</span>
                          <span className="text-gray-600 ml-2">/${budget.amount.toLocaleString()}</span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-3">
                          <div 
                            className={`h-2 sm:h-3 rounded-full transition-all duration-1000 ${
                              percentage > 90 ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                              percentage > 75 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 
                              'bg-gradient-to-r from-green-500 to-green-600'
                            } group-hover:shadow-lg`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <p className={`text-xs sm:text-sm font-bold ${
                            percentage > 90 ? 'text-red-600' : 
                            percentage > 75 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {percentage.toFixed(1)}% used
                          </p>
                          <p className={`text-xs text-gray-500 ${remaining < 0 ? 'text-red-500 font-medium' : ''}`}>
                            {remaining >= 0 ? `$${remaining.toLocaleString()} left` : `$${Math.abs(remaining).toLocaleString()} over`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="col-span-full text-center py-8 sm:py-12">
                  <div className="text-4xl sm:text-6xl mb-4">🎯</div>
                  <p className="text-gray-500 text-sm sm:text-base mb-4">No budgets set. Create your first budget to start tracking spending.</p>
                  <button 
                    onClick={handleCreateBudget}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Create Budget
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;