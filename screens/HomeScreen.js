import React, { useState, useEffect, useContext } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    AsyncStorage,
} from 'react-native';


import { searchBy } from '../utils/MovieApi';
import { getUserById } from '../utils/Api';
import Movies from '../components/Movies';
import Search from '../components/Search';
import Colors from '../constants/Colors';
import { UserContext } from '../contexts/UserContext';

const SEARCH_THROTTLE = 3;

export default function HomeScreen({ navigation }) {
    // States
    const [movies, setMovies] = useState([]);
    const [showLoading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState(null);

    // Context
    const [user, updateUser] = useContext(UserContext);

    // Équivalent à componentDidMount plus componentDidUpdate :
    useEffect(() => {
        isConnected();
    }, []);

    /**
     * resetMovies - Reset form and movies' list
     */
    resetMovies = () => {
        setMovies([]);
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
                    // AsyncStorage.removeItem('access_token')
                    //     .then(() => {
                    navigation.navigate('SignIn', {
                        redirectTo: 'Home',
                        error: error.details.message
                    });
                    resolve();
                    // })
                    break;
                default:
                    resolve();
                    break;
            }
        })
    }

    /**
     * isConnected - Get user information from accessToken
     */
    async function isConnected() {
        return Promise.all([AsyncStorage.getItem('access_token'), AsyncStorage.getItem('user_id')])
            .then((values) => {
                let [accessToken, userId] = values;
                if (accessToken) {
                    return getUserById(userId)
                        .then((responseJson) => {
                            updateUser(user => ({
                                ...user,
                                ...responseJson,
                            }));
                        })
                        .catch((error) => {
                            console.log("isConnected", error);
                            return errorReport(error);
                        })
                }
            });
    }

    /**
     * updateSearch - Search film on API movie call
     * @param {String} searchText 
     */
    async function updateSearch(searchText) {
        setSearchText(searchText);
        setLoading(true);

        return new Promise((resolve, reject) => {
            if (searchText.length > 0 && searchText.length % SEARCH_THROTTLE === 0) {
                return searchBy(searchText)
                    .then((searchList) => {
                        setMovies(searchList);
                        setLoading(false);
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    })
            } else {
                setMovies(searchText.length > 0 ? movies : null);
                setLoading(false);
                resolve();
            }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.transparent} />
            <Search
                updateCallback={updateSearch}
                searchText={searchText}
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
                showLoading={showLoading}
                onClear={() => {
                    resetMovies();
                }}
            />

            <View style={styles.pageContainer}>
                {movies && movies.length > 0 ? (
                    <Movies movies={movies} navigation={navigation} nextScreen='Movie' />
                ) : (
                    <View style={styles.noFilmContainer}>
                        <Text style={styles.noFilm}>Aucun film trouvé</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
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