import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import MovieCard from './MovieCard';

export function Movies(props) {
  const [movies, setMovies] = useState(props.movies);
  const [isUserMovie, setUserMovie] = useState(props.isUserMovie);

  useEffect(() => {
    setMovies(movies);
    setUserMovie(isUserMovie);
  }, [movies, isUserMovie]);

  return (
    <FlatList
      data={movies}
      keyExtractor={item => String(item.imdbID)}
      renderItem={({ item }) =>
        <MovieCard
          movie={item}
          goToNextScreen={() => {
            if (isUserMovie) {
              props.navigation.navigate('UserMovie', { movieId: item.imdbID })
            } else {
              props.navigation.navigate('Movie', { movieId: item.imdbID })
            }
          }}
        />
      }
    />
  );
}

export default Movies;