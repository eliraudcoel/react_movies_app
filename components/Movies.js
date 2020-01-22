import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import MovieCard from './MovieCard';

export function Movies(props) {
  const [movies, setMovies] = useState(props.movies);

  useEffect(() => {
    setMovies(movies);
  }, [movies]);

  return (
    <FlatList
      data={movies}
      keyExtractor={item => String(item.imdbID)}
      renderItem={({ item }) =>
        <MovieCard
          movie={item}
          goToNextScreen={() => {
            props.navigation.navigate('Movie', { movieId: item.imdbID })
          }}
        />
      }
    />
  );
}

export default Movies;