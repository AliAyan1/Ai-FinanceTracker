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
    // more mock transactions...
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
    // more mock budgets...
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
  }, [mockTransactions, mockBudgets]);  // Add dependencies here

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
          {/* Your dashboard content here */}
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
