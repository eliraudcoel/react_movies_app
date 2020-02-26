import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import MovieCard from './MovieCard';

export function Movies(props) {
  const [movies, setMovies] = useState(props.movies);
  const [nextScreen, setNextScreen] = useState(props.nextScreen);

  /**
   * Tip: On useEffect() we must listen "props" update
  */

  /**
   * Listen props.movies change from Parent
  */
  useEffect(() => {
    setMovies(props.movies);
  }, [props.movies]);

  /**
   * Listen props.nextScreen change from Parent
  */
  useEffect(() => {
    setNextScreen(props.nextScreen);
  }, [props.nextScreen]);

  return (
    <FlatList
      data={movies}
      extraData={movies}
      keyExtractor={item => String(item.imdbID)}
      renderItem={({ item }) =>
        <MovieCard
          movie={item}
          goToNextScreen={() => {
            props.navigation.navigate(nextScreen, { movieId: item.imdbID })
          }}
        />
      }
    />
  );
}

export default Movies;