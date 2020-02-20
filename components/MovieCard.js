import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { ListItem } from 'react-native-elements';
import Colors from '../constants/Colors';

export default function MovieCard(props) {
  // States
  const [movie, setMovie] = useState(props.movie);

  // variable for dates
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  let date = new Date(movie.releaseDate).toLocaleDateString('fr-FR', options);

  useEffect(() => {
    console.log("useEffect() - movieCard");
    setMovie(movie);
  }, [movie]);

  return (
    <ListItem
      onPress={() => props.goToNextScreen()}
      leftAvatar={{ rounded: false, source: { uri: movie.posterPath } }}
      title={movie.title}
      titleProps={{ numberOfLines: 1 }}
      titleStyle={{ color: Colors.tintColor }}
      subtitle={date}
      rightIcon={{
        name: Platform.OS === 'ios' ? 'ios-heart' : 'md-heart',
        type: "ionicon",
        color: movie.favorite ? Colors.redColor : Colors.greyColor,
      }}
      bottomDivider
      chevron={{ color: Colors.lightTintColorDarker }}
    />
  );
}