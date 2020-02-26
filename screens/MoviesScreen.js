import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  Platform,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import MovieCard from '../components/MovieCard';

import Movies from '../components/Movies';
import Colors from '../constants/Colors';
import { UserContext } from '../contexts/UserContext';
import Movie from '../models/Movie';

export default function MoviesScreen({ navigation }) {
  // States
  const [movies, setMovies] = useState([]);

  // Context
  const [user, updateUser] = useContext(UserContext);

  let toto = false;

  // Équivalent à componentDidMount plus componentDidUpdate :

  /**
   * Listen user change from UserContext
  */
  useEffect(() => {
    resetForUserMovies();
  }, [user]);

  /**
   * Listen movies change
  */
  useEffect(() => {
    console.log(movies);
  }, [movies]);

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
          <Movies movies={movies} navigation={navigation} nextScreen='UserMovie' />
        ) : (
          <View style={styles.noFilmContainer}>
            <Text style={styles.noFilm}>Vous n'avez pas ajouté de film !</Text>
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
