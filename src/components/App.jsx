import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import BookForm from './BookForm/BookForm';
import { BookList } from './BookList';

import booksJson from '../books.json';
import { getAllBooks, deleteBookById } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBooks,
  selectError,
  selectFilter,
  selectIsLoading,
} from 'redux/selectors';
import { setBooks, setError, setFilter, setLoading } from 'redux/booksSlice';
import { Filter } from './Filter/Filter';

const basicBooks = booksJson.books;
const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

function App() {
  // const [books, setBooks] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const books = useSelector(selectBooks);
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        dispatch(setLoading(true));
        const data = await getAllBooks();
        dispatch(setBooks(data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchBooks();
  }, [dispatch]);

  const deleteBookRequest = async bookId => {
    try {
      dispatch(setError(null));
      dispatch(setLoading(true));
      const deletedBook = await deleteBookById(bookId);
      dispatch(setBooks(books.filter(book => book._id !== bookId)));
      toast.success(
        `Book with title ${deletedBook.title} successfully deleted!`,
        toastConfig
      );
    } catch (err) {
      dispatch(setError(err.message));
      toast.error(err.message, toastConfig);
    } finally {
      dispatch(setLoading(false));
    }
  };

  //   const deleteBook = bookId => {
  //   setBooks(books.filter(book => book.title !== bookTitle));

  //     deleteBookRequest(bookId);
  //  };

  const addBook = bookData => {
    if (books.some(book => book.title === bookData.title)) {
      toast.error(
        `Book with title ${bookData.title} is already exists!`,
        toastConfig
      );
      return;
    }
    dispatch(setBooks([...books, bookData]));
  };

  const toggleFavorite = bookTitle => {
    dispatch(
      setBooks(
        books.map(book => {
          if (book.title === bookTitle) {
            return { ...book, favourite: !book.favourite };
          }
          return book;
        })
      )
    );
  };

  const handleFilterChange = evt => dispatch(setFilter(evt.target.value));
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(filter.toLowerCase())
  ).sort((a, b) => b.favourite - a.favourite);
  return (
    <div>
      <BookForm title="add book" onSubmit={addBook} />
      <Filter value={filter} onChange={handleFilterChange} />
      {loading && <p>Loading...</p>}
      {error !== null && <p>Error: {error}</p>}
      <BookList
        books={filteredBooks}
        onDelete={deleteBookRequest}
        toggleFavorite={toggleFavorite}
        loadingProgress={loading}
      />
      <ToastContainer />
    </div>
  );
}

export default App;
