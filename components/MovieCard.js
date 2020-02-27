import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { ListItem } from 'react-native-elements';
import Colors from '../constants/Colors';

export default function MovieCard(props) {
  // States
  const [movie, setMovie] = useState(props.movie);
  const [date, setDate] = useState(null);

  // variable for dates
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  
  /**
   * Tip: On useEffect() we must listen "props" update
  */

  /**
   * Listen props.movie change from Parent Movies
  */
  useEffect(() => {
    console.log(props.movie.posterPath);
    setMovie(props.movie);
    setDate(new Date(props.movie.releaseDate).toLocaleDateString('fr-FR', options));
  }, [props.movie]);

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