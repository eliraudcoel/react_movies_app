import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

// Safe Area
import { useSafeArea } from 'react-native-safe-area-context';

import Movies from '../components/Movies';
import Colors from '../constants/Colors';
import { UserContext } from '../contexts/UserContext';
import Movie from '../models/Movie';
import { Header } from 'react-navigation';

export default function MoviesScreen({ navigation }) {
  // Get SafeArea details - came from SafeAreaProvider declare on App.js file
  const insets = useSafeArea();

  // States
  const [movies, setMovies] = useState([]);

  // Context
  const [user, updateUser] = useContext(UserContext);

  /**
   * Listen user change from UserContext
  */
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
      <View style={[styles.moviesContainer, {
        paddingTop: Platform.OS === 'ios' ? insets.top : Header.HEIGHT + insets.top
      }]}>
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
  }
});
