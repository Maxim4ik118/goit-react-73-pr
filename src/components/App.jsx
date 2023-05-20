import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import BookForm from './BookForm/BookForm';
import { BookList } from './BookList';

import booksJson from '../books.json';

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
  const [books, setBooks] = useState(basicBooks);

  const deleteBook = bookTitle => {
    setBooks(books.filter(book => book.title !== bookTitle));
  };

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
  return (
    <div>
      <BookForm title="add book" onSubmit={addBook} />
      <BookList books={books} onDelete={deleteBook} />
      <ToastContainer />
    </div>
  );
}

export default App;
