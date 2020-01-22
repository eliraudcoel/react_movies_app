import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
} from 'react-native';
import { Button } from 'react-native-elements';

import { getMovieById } from '../utils/Api';
import Movie from '../models/Movie';
import ParallaxView from '../components/ParallaxView';

export function MovieScreen({ navigation }) {

    // States
    const [movieId, setMovieId] = useState(navigation.getParam('movieId', null));
    const [movie, setMovie] = useState(null);
    const [isFavorite, setFavorite] = useState(false);
    const [user, setUser] = useState(null);

    const { height } = Dimensions.get('window');

    // Équivalent à componentDidMount plus componentDidUpdate :
    useEffect(() => {
        getMovie();
    }, [movieId]);

    async function getMovie() {
        return getMovieById(movieId)
            .then((movieJson) => {
                let movie = new Movie(movieJson);
                navigation.setParams({
                    title: movie.title,
                    likeUnlike: likeUnlike.bind(this),
                    isFavorite: isFavorite
                });
                setMovie(movie);
            });
    }

    date = () => {
        let options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(movie.releaseDate).toLocaleDateString('fr-FR', options);
    }

    likeUnlike = () => {
        if (user) {
            // of connected -> post like
            setFavorite(!isFavorite);
        } else {
            // of unconnected -> connection screen && post like
            navigation.navigate('SignIn', {
                action: isFavorite ? 'unlike' : 'like',
                movieId: movieId
            });
        }
    }

    return (
        <ParallaxView
            backgroundSource={{ uri: movie && movie.backdropPath }}
            windowHeight={height * 0.4}
            scrollableViewStyle={[styles.scrollView, styles.borderRadius]}
            style={styles.borderRadius}
        >
            <View style={[styles.containerView, styles.borderRadius]}>
                <Text style={styles.containerText}>{movie && date()}</Text>
                <Text style={styles.containerText}>{movie && movie.overview}</Text>
                <Button
                    title="Voir les commentaires"
                    type="outline"
                    style={styles.button}
                />
            </View>
        </ParallaxView>
    );
}

const styles = StyleSheet.create({
    borderRadius: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    scrollView: {
        top: -20,
    },
    containerView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    containerText: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        color: 'black'
    },
    button: {
        paddingTop: 10,
    }
});

export default MovieScreen;