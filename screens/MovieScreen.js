import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    Platform,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import Colors from '../constants/Colors';

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
            console.log(user, user.movies);
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
        // FIXME : make it works for update

        // Update favorite
        setFavorite(newMovie.favorite);
        if (newMovie.favorite) {
            showTabBarInfo();
        }

        /*
        updateUser({
            ...user,
            movies: {
                ...user.movies,
                newMovie
            }
        });
        */

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
     * likeUnlike - Like/Unlike a movie
     */
    likeUnlike = (favorite, movie) => {
        user_movie = getUserMovie();
        if (user) {
            if (user_movie) {
                updateUserMovie(user_movie.id, {
                    favorite: !favorite
                }).then((userMovieJson) => {
                    let newMovie = new Movie(userMovieJson);
                    updateInformationAfter(newMovie);
                })
            } else {
                createUserMovie({
                    ...movie,
                    favorite: !favorite
                }).then((userMovieJson) => {
                    let newMovie = new Movie(userMovieJson);
                    updateInformationAfter(newMovie);
                })
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
            {showFavoriteAdd &&
                <TabBarInfo />
            }
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