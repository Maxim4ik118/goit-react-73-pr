import { createSlice } from '@reduxjs/toolkit';
import { deleteBooks, fetchBooks } from './operation';

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    filter: '',
    isLoading: false,
    error: null,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchBooks.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteBooks.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBooks.fulfilled, (state, action) => {
        state.books = state.books.filter(book => {
          return book.id !== action.payload;
        });
      })
      .addCase(deleteBooks.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      }),

  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    // setLoading: (state, action) => {
    //   state.isLoading = action.payload;
    // },
    // setError: (state, action) => {
    //   state.error = action.payload;
    // },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setFavorite: (state, action) => {
      state.books = state.books.map(book => {
        if (book.title === action.payload) {
          return { ...book, favourite: !book.favourite };
        }
        return book;
      });
    },
  },
});
// export const { setBooks, setError, setLoading, setFilter } = booksSlice.actions;
export const { setFilter, setFavorite, setBooks } = booksSlice.actions;

export const booksReducer = booksSlice.reducer;
