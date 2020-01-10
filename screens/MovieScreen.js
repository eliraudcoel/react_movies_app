import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
    Text,
    Image,
} from 'react-native';
import { Button } from 'react-native-elements';

import { getMovieById } from '../utils/Api';
import Movie from '../models/Movie';
import Colors from '../constants/Colors';
import ParallaxView from '../components/ParallaxView';

export class MovieScreen extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;

        this.state = {
            movieId: navigation.getParam('movieId', null),
            movie: null,
        };
    }

    componentWillMount() {
        return getMovieById(this.state.movieId)
            .then((movieJson) => {
                let movie = new Movie(movieJson);
                this.props.navigation.setParams({
                    title: movie.title,
                    likeUnlike: this.likeUnlike.bind(this),
                    isFavorite: this.state.isFavorite
                });
                this.setState({ movie })
            });
    }

    date = () => {
        let options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(this.state.movie.releaseDate).toLocaleDateString('fr-FR', options);
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    likeUnlike = () => {
        // of connected -> post like
        // of unconnected -> connection screen && post like
        this.setState({
            isFavorite: !this.state.isFavorite
        });
    }

    render() {
        let { height } = Dimensions.get('window');
        let { movie } = this.state;

        return (
            <ParallaxView
                backgroundSource={{ uri: movie && movie.backdropPath }}
                windowHeight={height * 0.4}
                scrollableViewStyle={[styles.scrollView, styles.borderRadius]}
                style={styles.borderRadius}
            >
                <View style={[styles.containerView, styles.borderRadius]}>
                    <Text style={styles.containerText}>{movie && this.date()}</Text>
                    <Text style={styles.containerText}>{movie && movie.overview}</Text>
                    <Button
                        title="Voir les commentaires"
                        type="outline"
                    />
                </View>
            </ParallaxView>
        );
    }
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
    }
});

export default MovieScreen;