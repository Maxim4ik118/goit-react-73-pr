import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastConfig } from 'components/App';
import { toast } from 'react-toastify';
import { deleteBookById, getAllBooks } from 'services/api';

export const fetchBooks = createAsyncThunk(
  'books/fetchAll',
  async (_, thunkAPI) => {
    try {
      const books = await getAllBooks();
      return books;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBooks = createAsyncThunk(
  'books/deleteBook',
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const book = state.books.find(book => book.id === id);
    try {
      await deleteBookById(id);
      toast.success(
        `Book with title ${book.title} successfully deleted!`,
        toastConfig
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
