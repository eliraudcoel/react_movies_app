import React, { Component } from 'react';
import RoiLionImage from '../assets/images/roi_lion.jpg';
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
        <Image source={RoiLionImage} style={{ width: "50%", height: 200 }} />
        <Text>{this.state.movie.title}</Text>
      </View>
    );
  }
}
