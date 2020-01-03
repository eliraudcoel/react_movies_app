import React, { Component } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Image,
    View,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { getMovieById } from '../utils/Api';
import Movie from '../models/Movie';

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
        return (
            <SafeAreaView style={styles.container}>
                {this.state.movie &&
                    <View style={styles.movieContainer}>
                        <Image
                            source={{ uri: this.state.movie.backdropPath }}
                            style={{ width: "100%", height: 200, resizeMode: "contain" }}
                        />
                        <List>
                            <ListItem title={this.state.movie.overview} />
                        </List>
                    </View>
                }
            </SafeAreaView>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    movieContainer: {
        flex: 1,
        flexDirection: "column",
        // justifyContent: "center"
    }
});

export default MovieScreen;