import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Movies from '../components/Movies';
import Colors from '../constants/Colors';
import { UserContext } from '../contexts/UserContext';
import Movie from '../models/Movie';

export default function MoviesScreen({navigation}) {
  // States
  const [movies, setMovies] = useState([]);

  // Context
  const [user, updateUser] = useContext(UserContext);

  // Équivalent à componentDidMount plus componentDidUpdate :
  useEffect(() => {
    resetForUserMovies();
  }, [user]);

  /**
   * resetForUserMovies - Reset form and populate with user's movies
   */
  resetForUserMovies = () => {
    if (user && user.movies && user.movies.length > 0) {
      let formattedMovies = user.movies.map(movieJson => new Movie(movieJson));
      setMovies(formattedMovies);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.transparent} />
      <View style={styles.moviesContainer}>
        {movies && movies.length > 0 ? (
          <Movies movies={movies} navigation={navigation} isUserMovie={true} />
        ) : (
            <View style={styles.noFilmContainer}>
              <Text style={styles.noFilm}>Aucun film trouvé</Text>
            </View>
          )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  moviesContainer: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    paddingTop: 44,
  }
});
