import React, { Component } from 'react';
import { FlatList } from 'react-native';
import MovieCard from './MovieCard';

export class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: props.movies,
      navigation: props.navigation,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movies: nextProps.movies,
    })
  }

  render() {
    return (
      <FlatList
        data={this.state.movies}
        keyExtractor={item => String(item.imdbID)}
        renderItem={({ item }) =>
          <MovieCard
            movie={item}
            goToNextScreen={() => {
              this.state.navigation.navigate('Movie', { movieId: item.imdbID })
            }}
          />
        }
      />
    );
  }
}

export default Movies;