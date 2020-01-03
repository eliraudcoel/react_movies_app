import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';

export default class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      updateCallback: props.updateCallback,
      searchText: '',
      previousSearchText: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchText: nextProps.searchText,
    })
  }

  render() {
    return (
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.state.updateCallback}
        value={this.state.searchText}
        {...this.props}
      />
    );
  }
}