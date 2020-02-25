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
  useEffect(() => {
    console.log("MoviesScreen - USER useEffect()");
    resetForUserMovies();
  }, [user]);

  useEffect(() => {
    console.log("MoviesScreen - MOVIES useEffect()");
    console.log(movies);
  }, [movies]);

  /**
   * resetForUserMovies - Reset form and populate with user's movies
   */
  resetForUserMovies = () => {
    if (user && user.movies && user.movies.length > 0) {
      let formattedMovies = user.movies.map(movieJson => new Movie(movieJson));
      // FIXME : not get last value of favorite
      console.log("resetForUserMovies() - update movies", formattedMovies);
      setMovies(formattedMovies);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.transparent} />
      <View style={styles.moviesContainer}>
        <FlatList
          data={movies}
          extraData={movies}
          keyExtractor={item => String(item.imdbID)}
          renderItem={({ item }) =>
            <ListItem
              onPress={() => navigation.navigate('UserMovie', { movieId: item.imdbID })}
              leftAvatar={{ rounded: false, source: { uri: item.posterPath } }}
              title={item.title}
              titleProps={{ numberOfLines: 1 }}
              titleStyle={{ color: Colors.tintColor }}
              subtitle={new Date(item.releaseDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}
              rightIcon={{
                name: Platform.OS === 'ios' ? 'ios-heart' : 'md-heart',
                type: "ionicon",
                color: item.favorite ? Colors.redColor : Colors.greyColor,
              }}
              bottomDivider
              chevron={{ color: Colors.lightTintColorDarker }}
            />
            }
        />
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
