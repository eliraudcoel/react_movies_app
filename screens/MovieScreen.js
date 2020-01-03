import React, { Component } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    StatusBar,
    View,
    Platform,
    ScrollView,
    Dimensions,
    Text,
} from 'react-native';
import { List, ListItem, Image } from 'react-native-elements';
import ParallaxScrollView from 'react-native-parallax-scrollview';

import { getMovieById } from '../utils/Api';
import Movie from '../models/Movie';
import Colors from '../constants/Colors';

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
                this.props.navigation.setParams({ title: movie.title });
                this.setState({ movie })
            });
    }

    render() {
        let { height } = Dimensions.get('window');

        return (
            <ParallaxScrollView
                windowHeight={height * 0.5}
                backgroundSource={{ uri: this.state.movie && this.state.movie.backdropPath }}
                navBarTitle='Custom Title'
                navBarTitleColor='white'
                navBarColor={"rgba(0, 0, 0, 0.20)"}
                navBarHeight={88}
                headerView={(
                    <View style={styles.headerView}>
                        <View style={styles.headerTextView}>
                            <Text style={styles.headerTextViewTitle}>My App</Text>
                            <Text style={styles.headerTextViewSubtitle}>Custom Header View</Text>
                        </View>
                    </View>
                )}
            >
                <ScrollView style={{ flex: 1, backgroundColor: 'rgba(228, 117, 125, 1)' }}>
                    <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 32, color: 'white' }}>Custom view</Text>
                    </View>
                    <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 32, color: 'white' }}>Custom view</Text>
                    </View>
                    <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 32, color: 'white' }}>Custom view</Text>
                    </View>
                    <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 32, color: 'white' }}>Custom view</Text>
                    </View>
                    <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 32, color: 'white' }}>Custom view</Text>
                    </View>
                </ScrollView>
            </ParallaxScrollView>
        );
    }
}

const styles = StyleSheet.create({
    headerView: {
        backgroundColor: "rgba(0, 0, 0, 0.81)",
    },
    headerTextView: {
        backgroundColor: 'transparent',
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
});

export default MovieScreen;