import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  note?: string;
}

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

// Simulate fetching transactions from an API
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { id: '1', type: 'income', amount: 5000, category: 'Salary', date: '2024-07-01', note: 'July Salary' },
      { id: '2', type: 'expense', amount: 1200, category: 'Rent', date: '2024-07-02', note: 'Monthly rent' },
      { id: '3', type: 'expense', amount: 300, category: 'Groceries', date: '2024-07-03' },
      { id: '4', type: 'income', amount: 200, category: 'Freelance', date: '2024-07-04', note: 'Logo design' },
      { id: '5', type: 'expense', amount: 150, category: 'Utilities', date: '2024-07-05' },
    ] as Transaction[];
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id'>>) => {
      const newTransaction: Transaction = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.transactions.unshift(newTransaction);
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
    editTransaction: (state, action: PayloadAction<Transaction>) => {
      const idx = state.transactions.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) {
        state.transactions[idx] = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch transactions';
      });
  },
});

export const { addTransaction, deleteTransaction, editTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;