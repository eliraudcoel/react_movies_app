import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';


export default class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: props.movie,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movie: nextProps.movie,
    })
  }

  render() {
    return (
      <View>
        <Image
          source={{ uri: this.state.movie.posterPath }}
          style={{ width: "50%", height: 100, resizeMode: "contain" }}
        />
        <Text>{this.state.movie.title}</Text>
      </View>
    );
  }
}
