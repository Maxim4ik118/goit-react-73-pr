import React from 'react';

import { ReactComponent as IconHeart } from './heart.svg';

import { StyledBook, StyledBookList } from './BookList.styled';

function BookList({ books = [], onDelete, toggleFavorite, loadingProgress }) {
  return (
    <StyledBookList>
      {Array.isArray(books) &&
        Boolean(books.length) &&
        books.map(book => {
          return (
            <StyledBook key={book.title}>
              <h3>
                <b>Title: </b>
                {book.title}
              </h3>
              <p>
                <b>Author: </b>
                {book.author}
              </p>
              <p>
                <b>Year: </b>
                {book.year}
              </p>
              <p>
                <b>Genre: </b>
                {book.genre}
              </p>
              <IconHeart
                className={`book-icon ${book.favourite ? 'favourite' : ''}`}
                onClick={() => toggleFavorite(book.title)}
              />
              <button
                className="btn-delete"
                onClick={() => onDelete(book._id)}
                disabled={loadingProgress}
              >
                &times;
              </button>
            </StyledBook>
          );
        })}
    </StyledBookList>
  );
}

export default BookList;
