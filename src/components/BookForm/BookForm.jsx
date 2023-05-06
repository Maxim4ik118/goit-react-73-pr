import React, { Component } from 'react';
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

export default class BookForm extends Component {
  state = {
    title: '',
    author: '',
    year: '',
    genre: '', // "love" | "novel" | "fantasy"
    favourite: false,
    cover: 'https://images.gr-assets.com/books/1361975680l/2657.jpg',
  };

  handleChange = ({ target: { type, value, name, checked } }) => {
    if (type === 'checkbox') {
      this.setState({ [name]: checked });
      return;
    }

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const bookData = {
      title: this.state.title,
      author: this.state.author,
      year: Number(this.state.year),
      genre: this.state.genre, // "love" | "novel" | "fantasy"
      favourite: this.state.favourite,
      cover: this.state.cover,
    };
    this.props.onSubmit(bookData);

    this.reset()

  };

  reset = () => {
    this.setState({
      title: '',
      author: '',
      year: '',
      genre: '', // "love" | "novel" | "fantasy"
      favourite: false,
      cover: 'https://images.gr-assets.com/books/1361975680l/2657.jpg',
    });
  } 

  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <h2>{this.props.title}</h2>
        <label className="form-label">
          <span>title:</span>
          <input
            type="text"
            name="title"
            value={this.state.title}
            required
            onChange={this.handleChange}
          />
        </label>
        <label className="form-label">
          <span>author:</span>
          <input
            onChange={this.handleChange}
            type="text"
            name="author"
            value={this.state.author}
            required
          />
        </label>
        <label className="form-label">
          <span>year:</span>
          <input
            onChange={this.handleChange}
            type="text"
            name="year"
            value={this.state.year}
            required
          />
        </label>
        <label className="form-label">
          <span>genre:</span>
          <span className="radio-group">
            <span className="radio-label">Love</span>
            <input
              onChange={this.handleChange}
              type="radio"
              name="genre"
              value="love"
              checked={this.state.genre === 'love'}
              required
            />
          </span>
          <span className="radio-group">
            <span className="radio-label">Novel</span>
            <input
              onChange={this.handleChange}
              type="radio"
              name="genre"
              required
              value="novel"
              checked={this.state.genre === 'novel'}
            />
          </span>
          <span className="radio-group">
            <span className="radio-label">Fantasy</span>
            <input
              onChange={this.handleChange}
              type="radio"
              name="genre"
              required
              value="fantasy"
              checked={this.state.genre === 'fantasy'}
            />
          </span>
        </label>
        <label className="form-label">
          <span>favourite:</span>
          <input
            onChange={this.handleChange}
            type="checkbox"
            name="favourite"
            checked={this.state.favourite}
          />
        </label>
        <button type="submit" className="form-btn">
          Add book
        </button>
      </StyledForm>
    );
  }
}
