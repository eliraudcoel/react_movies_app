import React, { Component } from 'react';
import {
  Image,
  // Text,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from '../components/Icon';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

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
      <ListItem thumbnail>
        <Left>
          <Thumbnail square
            source={{ uri: this.state.movie.posterPath }}
            style={styles.poster}
          />
        </Left>
        <Body>
          <Text>{this.state.movie.title}</Text>
          <Text note>{this.state.movie.releaseDate}</Text>
        </Body>
        <Right style={styles.container}>
          <Icon
            style={styles.favoriteIcon}
            family={"ionicons"}
            size={26}
            name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
            color={"#ddd"}
          />
          <Icon
            family={"ionicons"}
            size={26}
            name={'ios-arrow-dropright'}
            color={"black"}
          />
        </Right>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  favoriteIcon: {
    marginRight: 10
  },
  poster: {
    backgroundColor: "#ddd",
  }
});
