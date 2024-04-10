import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [movieType, setMovieType] = useState('popular'); // Default to popular movies

  useEffect(() => {
    if (searchQuery.trim() === '') {
      fetchMovies(movieType);
    } else {
      searchMovies(searchQuery);
    }
  }, [searchQuery, movieType]);

  const fetchMovies = async (type) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${type}?api_key=fad09df3295d318a78dc568589a95e12&language=en-US&page=1`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error(`Error fetching ${type} movies:`, error);
    }
  };

  const searchMovies = async (query) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=fad09df3295d318a78dc568589a95e12&language=en-US&query=${query}&page=1`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    searchMovies(searchQuery);
  };

  const handleMovieTypeChange = (type) => {
    setMovieType(type);
    setSearchQuery(''); // Clear search query when changing movie type
  };

  return (
    <div>
      <nav>
        <h1>Cine Sphere</h1>
        <ul>
          <li><button onClick={() => handleMovieTypeChange('popular')}>Popular Movies</button></li>
          <li><button onClick={() => handleMovieTypeChange('top_rated')}>Top Rated</button></li>
          <li><button onClick={() => handleMovieTypeChange('upcoming')}>Upcoming Movies</button></li>
          <li>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
          </li>
        </ul>
      </nav>

      <div>
        <h1>{movieType === 'popular' ? 'Popular Movies' : movieType === 'top_rated' ? 'Top Rated Movies' : 'Upcoming Movies'}</h1>
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <p>{movie.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
