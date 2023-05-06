import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    books: basicBooks,
  };

  addBook = bookData => {
    if (this.state.books.some(book => book.title === bookData.title)) {
      toast.error(
        `Book with title ${bookData.title} is already exists!`,
        toastConfig
      );
      return;
    }

    this.setState(prevState => ({
      books: [...prevState.books, bookData],
    }));
    // { ...{ books: [1,2,3,4] }, ...{ books: [5] } } -> { books: [5] }
  };

  render() {
    return (
      <div>
        <BookForm title="add book" onSubmit={this.addBook} />
        <BookList books={this.state.books}/>
        <ToastContainer />
      </div>
    );
  }
}
