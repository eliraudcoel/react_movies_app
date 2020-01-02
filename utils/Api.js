import { AsyncStorage } from 'react-native';
import Movie from '../models/Movie';

const API_KEY = "1bfb1af1";
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

export function getMovies() {
    return AsyncStorage.getItem('movies')
        .then((movies) => {
            console.log("new values", movies);
            if (movies) {
                return movies.map((movie) => {
                    new Movie(movie);
                })
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.log("Get movies error", error);
        })
}

export function storeMovie() {
    return AsyncStorage.getItem('movies')
        .then((movies) => {

        })
        .catch((error) => {
            console.log("Get movies error", erro);
        })
}

export function storeMovies(movies) {
    return AsyncStorage.setItem('movies', movies)
        .then((newMovies) => {
            console.log("new values", newMovies);
        })
        .catch((error) => {
            console.log("Get movies error", error);
        })
}

export function setApiParams(params) {
    let uri = API_URL;
    console.log(params);

    Object.keys(params).map(function (key) {
        uri = uri + "&" + key + "=" + params[key];
    });

    console.log(uri);
    return uri;
}

export function searchBy(searchText) {
    let uri = setApiParams({ s: searchText, page: 1 });

    return fetch(uri)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson["Search"];
        })
        .then((searchList) => {
            let movieList = [];
            searchList.forEach(search => {
                movieList.push(Movie(search));
            });
            return movieList;
        })
        .catch((error) => {
            console.error(error);
        });
}