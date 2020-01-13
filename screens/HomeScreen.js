import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
} from 'react-native';

import { Icon } from 'react-native-elements';
import { getMovies, searchBy } from '../utils/Api';
import Movies from '../components/Movies';
import Search from '../components/Search';
import Colors from '../constants/Colors';

export class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // movies: null,
            movies: [
                {
                    imdbID: 11631,
                    title: "Mamma Mia !",
                    releaseDate: "2019-02-05",
                    posterPath: "https://image.tmdb.org/t/p/original/xRbDA4Ys0Y2Bvbnme02fVBwMWFe.jpg"
                },
                {
                    imdbID: 456,
                    title: "Mammaaaaaa aaaaaa aaaaaa aaaaa aaaa",
                    releaseDate: "2019-02-05",
                },
                {
                    imdbID: 789,
                    title: "Mamma",
                    releaseDate: "2019-02-05",
                    posterPath: "https://image.tmdb.org/t/p/original/xRbDA4Ys0Y2Bvbnme02fVBwMWFe.jpg"
                }
            ],
            showLoading: false,
        };
    }

    componentWillMount() {
        // return getMovies()
        //     .then((movies) => {
        //         this.setState({ movies });
        //     });
    }

    updateSearch = (searchText) => {
        this.setState({ searchText });

        return new Promise((resolve, reject) => {
            if (searchText.length > 0 && searchText.length % 3 === 0) {
                this.state.showLoading = true;
                return searchBy(searchText)
                    .then((searchList) => {
                        this.setState({ movies: searchList, showLoading: false });
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    })
            } else {
                this.setState({
                    movies: searchText.length > 0 ? this.state.movies : null,
                    showLoading: false
                });
                resolve();
            }
        })
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={Colors.transparent} />
                <Search
                    updateCallback={this.updateSearch}
                    searchText={this.state.searchText}
                    containerStyle={{
                        backgroundColor: Colors.tintColor,
                        borderBottomWidth: 0,
                        borderTopWidth: 0,
                    }}
                    inputContainerStyle={{
                        backgroundColor: Colors.tintColor,
                        height: 50,
                        borderRadius: 0,
                    }}
                    placeholderTextColor={Colors.lightColor}
                    inputStyle={{ color: Colors.lightColor }}
                    searchIcon={{
                        iconStyle: { color: Colors.lightColor },
                    }}
                    clearIcon={{
                        iconStyle: { color: Colors.lightColor },
                    }}
                    showLoading={this.state.showLoading}
                    onCancel={() => {
                        this.setState({ movies: null })
                    }}
                />

                <View style={styles.pageContainer}>
                    {this.state.movies && this.state.movies.length > 0 ? (
                        <Movies movies={this.state.movies} navigation={this.props.navigation} />
                    ) : (
                        <View style={styles.noFilmContainer}>
                            <Text style={styles.noFilm}>Aucun film trouvé</Text>
                        </View>
                    )}
                </View>

                {/* For adding */}
                {this.state.movieAdded &&
                    <View style={styles.tabBarInfoContainer}>
                        <Icon
                            type='ionicon'
                            size={26}
                            name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
                            color={"red"}
                        />
                        <Text style={styles.tabBarInfoText}>Ajouté au favori !</Text>
                    </View>
                }
            </SafeAreaView>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.tintColor
    },
    pageContainer: {
        flex: 1,
        backgroundColor: Colors.whiteColor
    },
    noFilmContainer: {
        paddingTop: 10,
    },
    noFilm: {
        color: Colors.greyColorDarker,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: Colors.greyColorDarker,
        textAlign: 'center',
    },
});

export default HomeScreen;