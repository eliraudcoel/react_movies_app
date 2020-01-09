import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
    Text,
    Image,
} from 'react-native';

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
            <View style={styles.container}>
                <ParallaxView
                    backgroundSource={{ uri: movie && movie.backdropPath }}
                    windowHeight={300}
                    scrollableViewStyle={{ backgroundColor: 'red' }}
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: 'black' }}>{movie && this.date()}</Text>
                        <Text style={{ fontSize: 20, color: 'black' }}>{movie && movie.overview}</Text>
                    </View>
                </ParallaxView>
                {/* <Image
                    style={{ height: height * 0.4 }}
                    source={{ uri: movie && movie.backdropPath }}
                /> */}

                {/* <ScrollView style={styles.scrollView}>

                </ScrollView> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.transparent,
    },
    scrollView: {
        flex: 1,
        backgroundColor: Colors.greyColor,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        top: -10,
    }
});

export default MovieScreen;