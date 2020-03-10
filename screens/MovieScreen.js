import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
} from 'react-native';
import { Button } from 'react-native-elements';
import { getMovieById } from '../utils/MovieApi';
import Movie from '../models/Movie';
import ParallaxView from '../components/ParallaxView';
import { UserContext } from '../contexts/UserContext';
import { updateUserMovie, createUserMovie } from '../utils/Api';
import TabBarInfo from '../components/TabBarInfo';

export default function MovieScreen({ navigation }) {

    // States
    const [movieId, setMovieId] = useState(navigation.getParam('movieId', null));
    const [movie, setMovie] = useState(null);
    const [showFavoriteAdd, setShowFavoriteAdd] = useState(false);
    const [isFavorite, setFavorite] = useState(false);

    const { height } = Dimensions.get('window');

    // Context
    const [user, updateUser] = useContext(UserContext);

    // Équivalent à componentDidMount plus componentDidUpdate :
    useEffect(() => {
        getMovie();
    }, [movieId]);

    useEffect(() => {
        navigation.setParams({ isFavorite });
    }, [isFavorite]);

    /**
     * getMovie - Get movie by id from Database
     */
    async function getMovie() {
        return getMovieById(movieId)
            .then((movieJson) => {
                let movie = new Movie(movieJson);
                navigation.setParams({
                    title: movie.title,
                    likeUnlike: likeUnlike,
                    isFavorite: userMovieFavorite(),
                    movie: movie,
                });
                setMovie(movie);
                setFavorite(userMovieFavorite());
            });
    }

    /**
     * date - Display date correctly
     */
    date = () => {
        let options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(movie.releaseDate).toLocaleDateString('fr-FR', options);
    }

    /**
     * userMovieFavorite - Check if movie is in favorite for User
     */
    userMovieFavorite = () => {
        if (getUserMovie()) {
            return getUserMovie().favorite;
        }

        return false;
    }

    /**
     * getUserMovie - Get current movie on user's movies list
     */
    getUserMovie = () => {
        if (user && user.movies) {
            return user.movies.filter((movie) => movie.imdbID === movieId)[0];
        }

        return null;
    }

    /**
     * showTabBarInfo - Show/Hide favorite panel
     */
    showTabBarInfo = () => {
        setShowFavoriteAdd(true);
        setTimeout(() => {
            setShowFavoriteAdd(false);
        }, 1000);
    }

    /**
     * Update list of Movie for HomeScren update
     */
    updateInformationAfter = (newMovie) => {
        // Update favorite
        setFavorite(newMovie.favorite);
        if (newMovie.favorite) {
            showTabBarInfo();
        }

        // Get userMovies list
        let userMovies = user.movies;
        let foundMovie = userMovies.filter((movie) => movie.imdbID === newMovie.imdbID)[0];
        let userMoviesId = userMovies.map((movie) => movie.imdbID)

        // If found => update favorite
        if (foundMovie) {
            userMovies.splice(userMoviesId.indexOf(newMovie.imdbID), 1, {
                ...foundMovie,
                favorite: newMovie.favorite
            });
        } else {
            // Else create movie on list
            userMovies.push(newMovie);
        }

        // Update userMovies
        updateUser({
            ...user,
            movies: userMovies,
        });
    }

    /**
     * errorReport - Display error if Token has expired
     * @param {Object} error 
     */
    async function errorReport(error) {
        return new Promise((resolve, reject) => {
            switch (error.error_code) {
                case "Exceptions::InvalidToken":
                    // Invalid token OR Token expired
                    return Promise.all([
                        AsyncStorage.removeItem('access_token'),
                        AsyncStorage.removeItem('user_id')
                    ]).then(() => {
                        navigation.navigate('SignIn', {
                            redirectTo: 'Home',
                            error: error.details.message
                        });
                        resolve();
                    })
                    break;
                default:
                    resolve();
                    break;
            }
        })
    }

    /**
     * likeUnlike - Like/Unlike a movie
     */
    likeUnlike = (favorite, movie) => {
        userMovie = getUserMovie();
        if (user) {
            if (userMovie) {
                updateUserMovie(userMovie.id, {
                    favorite: !favorite
                }).then((userMovieJson) => {
                    let newMovie = new Movie({
                        ...userMovieJson,
                        type: 'userMovie'
                    });
                    updateInformationAfter(newMovie);
                }).catch((error) => {
                    console.log("updateUserMovie", error);
                    return errorReport(error);
                });
            } else {
                createUserMovie({
                    ...movie,
                    favorite: !favorite
                }).then((userMovieJson) => {
                    let newMovie = new Movie({
                        ...userMovieJson,
                        type: 'userMovie'
                    });
                    updateInformationAfter(newMovie);
                }).catch((error) => {
                    console.log("createUserMovie", error);
                    return errorReport(error);
                });
            }
        } else {
            // of unconnected -> connection screen && post like
            navigation.navigate('SignIn', {
                redirectTo: 'Movie',
                redirectParams: {
                    action: isFavorite ? 'unlike' : 'like',
                    movieId: movieId
                }
            });
        }
    }

    return (
        <ParallaxView
            backgroundSource={{ uri: movie && movie.backdropPath }}
            windowHeight={height * 0.4}
            scrollableViewStyle={[styles.scrollView, styles.borderRadius]}
            style={styles.borderRadius}
            bottomContainer={(
                showFavoriteAdd && <TabBarInfo />
            )}
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