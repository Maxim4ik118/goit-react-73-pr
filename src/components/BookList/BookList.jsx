import React from 'react';

import { ReactComponent as IconHeart } from './heart.svg';

import { StyledBook, StyledBookList } from './BookList.styled';

function BookList({ books = [], onDelete, onEdit }) {
  return (
    <StyledBookList>
      {Array.isArray(books) &&
        books.length &&
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
              />
              <button
                className="btn-delete"
                onClick={() => onDelete(book.title)}
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
