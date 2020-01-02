import { AsyncStorage } from 'react-native';
import Movie from '../models/Movie';

const API_KEY = "a36cb15a17169e4f6f975e37a31f7c4b";
const API_VERSION = 3;
const API_URL = `https://api.themoviedb.org/${API_VERSION}/search/movie?api_key=${API_KEY}`;

export function getMovies() {
    // TODO -> call RoR server
}

export function storeMovie() {
    // TODO -> call RoR server
}

export function storeMovies(movies) {
    // TODO -> call RoR server
}

export function setApiParams(params) {
    let uri = API_URL;
    Object.keys(params).map(function (key) {
        uri = uri + "&" + key + "=" + params[key];
    });
    return uri;
}

export function searchBy(searchText) {
    let uri = setApiParams({ query: searchText, page: 1, language: 'fr-FR'});

    return fetch(uri)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.results;
        })
        .then((searchList) => {
            let movieList = [];
            searchList.forEach(search => {
                let m = new Movie(search);
                movieList.push(m);
            });
            return movieList;
        })
        .catch((error) => {
            console.error(error);
        });
}