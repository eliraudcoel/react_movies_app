import React, { Component } from 'react';
import { Platform } from 'react-native';
import { ListItem } from 'react-native-elements';
import Colors from '../constants/Colors';

export default class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: props.movie,
      goToNextScreen: props.goToNextScreen,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movie: nextProps.movie,
    })
  }

  render() {
    let { releaseDate } = this.state.movie;
    let options = { year: 'numeric', month: 'short', day: 'numeric' };
    let date = new Date(releaseDate).toLocaleDateString('fr-FR', options);

    return (
      <ListItem
        onPress={() => this.state.goToNextScreen()}
        leftAvatar={{ rounded: false, source: { uri: this.state.movie.posterPath } }}
        title={this.state.movie.title}
        titleProps={{ numberOfLines: 1 }}
        titleStyle={{ color: Colors.tintColor }}
        subtitle={date}
        rightIcon={{
          name: Platform.OS === 'ios' ? 'ios-heart' : 'md-heart',
          type: "ionicon",
          color: Colors.greyColor,
        }}
        bottomDivider
        chevron={{ color: Colors.lightTintColorDarker }}
      />
    );
  }
}
