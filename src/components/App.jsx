import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import BookForm from './BookForm/BookForm';
import { BookList } from './BookList';

import booksJson from '../books.json';
import { getAllBooks, deleteBookById } from '../services/api';

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
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getAllBooks();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const deleteBookRequest = async bookId => {
    try {
      setError(null);
      setLoading(true);
      const deletedBook = await deleteBookById(bookId);
      setBooks(books.filter(book => book._id !== bookId));
      toast.success(
        `Book with title ${deletedBook.title} successfully deleted!`,
        toastConfig
      );
    } catch (err) {
      setError(err.message);
      toast.error(err.message, toastConfig);
    } finally {
      setLoading(false);
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
    setBooks(prevBooks => [...prevBooks, bookData]);
  };

  const toggleFavorite = bookTitle => {
    setBooks(
      books.map(book => {
        if (book.title === bookTitle) {
          return { ...book, favourite: !book.favourite };
        }
        return book;
      })
    );
  };

  return (
    <div>
      <BookForm title="add book" onSubmit={addBook} />
      {loading && <p>Loading...</p>}
      {Boolean(error !== null) && <p>Error: {error}</p>}
      <BookList
        books={books}
        onDelete={deleteBookRequest}
        toggleFavorite={toggleFavorite}
        loadingProgress={loading}
      />
      <ToastContainer />
    </div>
  );
}

export default App;
