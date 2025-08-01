import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Budget {
  id: string;
  category: string;
  amount: number;
  period: 'monthly' | 'yearly';
}

interface BudgetState {
  budgets: Budget[];
}

const initialState: BudgetState = {
  budgets: [
    { id: '1', category: 'Groceries', amount: 500, period: 'monthly' },
    { id: '2', category: 'Entertainment', amount: 200, period: 'monthly' },
    { id: '3', category: 'Transport', amount: 150, period: 'monthly' },
  ],
};

const budgetSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    addBudget: (state, action: PayloadAction<Omit<Budget, 'id'>>) => {
      const newBudget: Budget = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.budgets.push(newBudget);
    },
    deleteBudget: (state, action: PayloadAction<string>) => {
      state.budgets = state.budgets.filter(b => b.id !== action.payload);
    },
    editBudget: (state, action: PayloadAction<Budget>) => {
      const idx = state.budgets.findIndex(b => b.id === action.payload.id);
      if (idx !== -1) {
        state.budgets[idx] = action.payload;
      }
    },
  },
});

export const { addBudget, deleteBudget, editBudget } = budgetSlice.actions;
export default budgetSlice.reducer;