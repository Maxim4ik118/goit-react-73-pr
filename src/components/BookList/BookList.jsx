import React from 'react';

import { ReactComponent as IconHeart } from './heart.svg';

import { StyledBook } from './BookList.styled';

function BookList({ books = [], onDelete, onEdit }) {
  return (
    <div>
      {Array.isArray(books) &&
        books.length &&
        books.map(book => {
          return (
            <StyledBook key={book.title}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.year}</p>
              <p>{book.genre}</p>
              <IconHeart
                className={`book-icon ${book.favourite ? 'favourite' : ''}`}
              />
            </StyledBook>
          );
        })}
    </div>
  );
}

export default BookList;
