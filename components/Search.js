import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { searchBy } from '../utils/Api';

import RoiLionImage from '../assets/images/roi_lion.jpg';



export default class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      updateCallback: props.updateCallback,
      searchText: '',
      previousSearchText: '',
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     speaker: nextProps.speaker,
  //   })
  // }

  // Move into HomeScreen

  render() {
    return (
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.state.updateCallback}
        value={this.state.searchText}
      />
    );
  }
}