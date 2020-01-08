import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    ScrollView,
    Dimensions,
    Text,
    Image,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scrollview';

import { getMovieById } from '../utils/Api';
import Movie from '../models/Movie';
import Colors from '../constants/Colors';
import { Icon } from 'react-native-elements';

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
                <Image
                    style={{ height: height * 0.4 }}
                    source={{ uri: movie && movie.backdropPath }}
                />

                <ScrollView style={styles.scrollView}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: 'black' }}>{movie && this.date()}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: 'black' }}>{movie && movie.overview}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.transparent,
    },
    headerTextView: {
        backgroundColor: 'transparent',
    },
    navBarView: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 45,
        paddingBottom: 35,
        backgroundColor: "rgba(0, 0, 0, 0.30)",
    },
    navbartText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '600',
        textAlign: 'center'
    },
    headerTextViewTitle: {
        fontSize: 35,
        color: 'white',
        fontWeight: '300',
        paddingBottom: 10,
        textAlign: 'center'
    },
    headerTextViewSubtitle: {
        fontSize: 20,
        color: 'white',
        fontWeight: '300'
    },
    nabBarIcon: {
        paddingLeft: 10,
        paddingRight: 10,
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