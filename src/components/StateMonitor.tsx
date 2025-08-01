'use client';

import { useAppSelector } from '@/lib/hooks';

const StateMonitor = () => {
  const transactionState = useAppSelector(state => state.transactions);
  const categoryState = useAppSelector(state => state.categories);
  const budgetState = useAppSelector(state => state.budgets);
  const userState = useAppSelector(state => state.user);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Redux State Monitor</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transactions State */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700 border-b pb-2">Transactions State</h3>
          <div className="bg-gray-50 rounded-lg p-4 text-sm">
            <pre className="whitespace-pre-wrap overflow-auto max-h-64">
              {JSON.stringify(transactionState, null, 2)}
            </pre>
          </div>
        </div>

        {/* Categories State */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700 border-b pb-2">Categories State</h3>
          <div className="bg-gray-50 rounded-lg p-4 text-sm">
            <pre className="whitespace-pre-wrap overflow-auto max-h-64">
              {JSON.stringify(categoryState, null, 2)}
            </pre>
          </div>
        </div>

        {/* Budgets State */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700 border-b pb-2">Budgets State</h3>
          <div className="bg-gray-50 rounded-lg p-4 text-sm">
            <pre className="whitespace-pre-wrap overflow-auto max-h-64">
              {JSON.stringify(budgetState, null, 2)}
            </pre>
          </div>
        </div>

        {/* User State */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700 border-b pb-2">User State</h3>
          <div className="bg-gray-50 rounded-lg p-4 text-sm">
            <pre className="whitespace-pre-wrap overflow-auto max-h-64">
              {JSON.stringify(userState, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateMonitor; 