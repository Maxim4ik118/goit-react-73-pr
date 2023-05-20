import React, { useState } from 'react';
import { StyledForm } from './BookForm.styled';

/*
{
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "year": 1960,
        "genre": "novel",
        "favourite": false,
        "cover": "https://images.gr-assets.com/books/1361975680l/2657.jpg"
      },


*/

export default function BookForm({ onSubmit, title }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    genre: '', // "love" | "novel" | "fantasy"
    favourite: false,
    cover: 'https://images.gr-assets.com/books/1361975680l/2657.jpg',
  });

  const handleChange = ({ target: { type, value, name, checked } }) => {
    if (type === 'checkbox') {
      setFormData(prevState => ({ ...prevState, [name]: checked }));
      return;
    }
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    const bookData = {
      title: formData.title,
      author: formData.author,
      year: Number(formData.year),
      genre: formData.genre, // "love" | "novel" | "fantasy"
      favourite: formData.favourite,
      cover: formData.cover,
    };
    onSubmit(bookData);

    reset();
  };

  const reset = () => {
    setFormData({
      title: '',
      author: '',
      year: '',
      genre: '', // "love" | "novel" | "fantasy"
      favourite: false,
      cover: 'https://images.gr-assets.com/books/1361975680l/2657.jpg',
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <label className="form-label">
        <span>title:</span>
        <input
          type="text"
          name="title"
          value={formData.title}
          required
          onChange={handleChange}
        />
      </label>
      <label className="form-label">
        <span>author:</span>
        <input
          onChange={handleChange}
          type="text"
          name="author"
          value={formData.author}
          required
        />
      </label>
      <label className="form-label">
        <span>year:</span>
        <input
          onChange={handleChange}
          type="text"
          name="year"
          value={formData.year}
          required
        />
      </label>
      <label className="form-label">
        <span>genre:</span>
        <span className="radio-group">
          <span className="radio-label">Love</span>
          <input
            onChange={handleChange}
            type="radio"
            name="genre"
            value="love"
            checked={formData.genre === 'love'}
            required
          />
        </span>
        <span className="radio-group">
          <span className="radio-label">Novel</span>
          <input
            onChange={handleChange}
            type="radio"
            name="genre"
            required
            value="novel"
            checked={formData.genre === 'novel'}
          />
        </span>
        <span className="radio-group">
          <span className="radio-label">Fantasy</span>
          <input
            onChange={handleChange}
            type="radio"
            name="genre"
            required
            value="fantasy"
            checked={formData.genre === 'fantasy'}
          />
        </span>
      </label>
      <label className="form-label">
        <span>favourite:</span>
        <input
          onChange={handleChange}
          type="checkbox"
          name="favourite"
          checked={formData.favourite}
        />
      </label>
      <button type="submit" className="form-btn">
        Add book
      </button>
    </StyledForm>
  );
}
