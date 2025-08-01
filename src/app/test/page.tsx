'use client';

import { useAppSelector } from '@/lib/hooks';

export default function TestPage() {
  const userState = useAppSelector(state => state.user);
  const transactionState = useAppSelector(state => state.transactions);
  const budgetState = useAppSelector(state => state.budgets);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Redux Store Test</h1>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">User State:</h2>
          <pre className="text-sm bg-gray-100 p-2 rounded">
            {JSON.stringify(userState, null, 2)}
          </pre>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Transaction State:</h2>
          <pre className="text-sm bg-gray-100 p-2 rounded">
            {JSON.stringify(transactionState, null, 2)}
          </pre>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Budget State:</h2>
          <pre className="text-sm bg-gray-100 p-2 rounded">
            {JSON.stringify(budgetState, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
} 