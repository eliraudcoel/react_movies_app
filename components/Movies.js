import React, { Component } from 'react';
import {
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import MovieCard from './MovieCard';

export class Movies extends Component {
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <FlatList
          data={this.state.movies}
          renderItem={({ item }) => <MovieCard movie={item} />}
        />
      </ScrollView>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
});

export default Movies;