import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [
    { id: '1', name: 'Salary', type: 'income' },
    { id: '2', name: 'Freelance', type: 'income' },
    { id: '3', name: 'Rent', type: 'expense' },
    { id: '4', name: 'Groceries', type: 'expense' },
    { id: '5', name: 'Utilities', type: 'expense' },
    { id: '6', name: 'Entertainment', type: 'expense' },
    { id: '7', name: 'Transport', type: 'expense' },
    { id: '8', name: 'Other', type: 'expense' },
  ],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Omit<Category, 'id'>>) => {
      const newCategory: Category = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.categories.push(newCategory);
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(c => c.id !== action.payload);
    },
    editCategory: (state, action: PayloadAction<Category>) => {
      const idx = state.categories.findIndex(c => c.id === action.payload.id);
      if (idx !== -1) {
        state.categories[idx] = action.payload;
      }
    },
  },
});

export const { addCategory, deleteCategory, editCategory } = categorySlice.actions;
export default categorySlice.reducer;