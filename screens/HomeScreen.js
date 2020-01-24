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

import { getMovies, searchBy } from '../utils/Api';
import Movies from '../components/Movies';
import Search from '../components/Search';
import Colors from '../constants/Colors';
import { UserContext } from '../contexts/UserContext';

const fakeMovies = [
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
];

export function HomeScreen({ navigation }) {
    // States
    const [movies, setMovies] = useState(fakeMovies);
    const [showLoading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState(null);

    // Context
    const [user, updateUser] = useContext(UserContext);

    // Équivalent à componentDidMount plus componentDidUpdate :
    useEffect(() => {
        if (user !== {}) {
            isConnected();
        }
    }, []);

    async function isConnected() {
        return AsyncStorage.getItem('access_token')
            .then((accessToken) => {
                updateUser(user => ({ ...user, accessToken }));
            })
            .catch((error) => {
                console.log("ERROR ON STORAGE", error);
            })
    }

    async function updateSearch(searchText) {
        setSearchText(searchText);
        setLoading(true);

        return new Promise((resolve, reject) => {
            if (searchText.length > 0 && searchText.length % 3 === 0) {
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
                onCancel={() => {
                    setMovies(null);
                }}
            />

            <View style={styles.pageContainer}>
                {movies && movies.length > 0 ? (
                    <Movies movies={movies} navigation={navigation} />
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

export default HomeScreen;