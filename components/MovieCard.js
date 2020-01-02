import React, { Component } from 'react';
import RoiLionImage from '../assets/images/roi_lion.jpg';
import {
  Image,
  Text,
  View,
} from 'react-native';


export default class MovieCard extends Component {
  render() {
    return (
      <View>
        <Image source={RoiLionImage} style={{ width: "80%", height: 200 }} />
        <Text style={styles.item}>toto</Text>
      </View>
    );
  }
}
