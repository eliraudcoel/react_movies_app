import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
} from 'react-native';

import Icon from '../components/Icon';
import { getMovies, searchBy } from '../utils/Api';
import Movies from '../components/Movies';
import Search from '../components/Search';

export class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // movies: null,
            movies: [
                {
                    imdbID: 123,
                    title: "Mamma",
                    releaseDate: "2019",
                    posterPath: "https://image.tmdb.org/t/p/original/xRbDA4Ys0Y2Bvbnme02fVBwMWFe.jpg"
                },
                {
                    imdbID: 456,
                    title: "Mamma",
                    releaseDate: "2019",
                },
                {
                    imdbID: 789,
                    title: "Mamma",
                    releaseDate: "2019",
                    posterPath: "https://image.tmdb.org/t/p/original/xRbDA4Ys0Y2Bvbnme02fVBwMWFe.jpg"
                }
            ],
        };
    }

    componentWillMount() {
        // return getMovies()
        //     .then((movies) => {
        //         this.setState({ movies });
        //     });
    }

    componentWillUnmount() {
    }

    updateSearch = (searchText) => {
        this.setState({ searchText });

        return new Promise((resolve, reject) => {
            if (searchText.length > 0 && searchText.length % 3 === 0) {
                console.log(searchText);
                return searchBy(searchText)
                    .then((searchList) => {
                        this.setState({ movies: searchList });
                    })
                    .then(() => {
                        resolve()
                    })
                    .catch((error) => {
                        reject(error);
                    })
            } else {
                resolve();
            }
        })
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Search
                    updateCallback={this.updateSearch}
                    searchText={this.state.searchText}
                />

                {(this.state.movies && this.state.movies.length > 0) ? (
                    <Movies movies={this.state.movies} />
                ) : (
                    <Text style={styles.tabBarInfoText}>Aucun film trouvé</Text>
                )}

                {/* For adding */}
                {this.state.movieAdded &&
                    <View style={styles.tabBarInfoContainer}>
                        <Icon
                            family={"ionicons"}
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
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        marginTop: 30,
        marginBottom: 20,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
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
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});

export default HomeScreen;