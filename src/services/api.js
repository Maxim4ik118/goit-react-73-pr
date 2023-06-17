import axios from 'axios';

const getAllBooks = async () => {
  const { data } = await axios.get(
    // 'https://nodebackend-production-41b1.up.railway.app/api/books'
    'https://thawing-ravine-72740.herokuapp.com/api/books'
  );
  return data;
};

const deleteBookById = async id => {
  const { data } = await axios.delete(
    `https://thawing-ravine-72740.herokuapp.com/api/books/${id}`
    // `https://nodebackend-production-41b1.up.railway.app/api/books/${id}`
  );
  return data;
};

export { getAllBooks, deleteBookById };
