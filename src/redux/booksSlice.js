import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    filter: '',
    isLoading: false,
    error: null,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});
export const {setBooks, setError, setLoading, setFilter} = booksSlice.actions;

export const booksReducer = booksSlice.reducer;
