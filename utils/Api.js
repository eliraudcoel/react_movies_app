import Movie from '../models/Movie';

const API_KEY = "a36cb15a17169e4f6f975e37a31f7c4b";
const API_VERSION = 3;

// URLS
const SEARCH_API_URL = `https://api.themoviedb.org/${API_VERSION}/search/movie?api_key=${API_KEY}`;
const BACKEND_URL = `http://localhost:3000/api/`;
// TODO : make it https
// const BACKEND_URL = `https://localhost:3000/api/`;

const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

export function getMovies() {
    // TODO -> call RoR server
}

export function getMovieById(movieId) {
    const movieUri = `https://api.themoviedb.org/${API_VERSION}/movie/${movieId}?api_key=${API_KEY}`;

    return fetch(movieUri)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export function storeMovie() {
    // TODO -> call RoR server
}

export function storeMovies(movies) {
    // TODO -> call RoR server
}

export function setApiParams(url, params) {
    let uri = url;
    Object.keys(params).map(function (key) {
        uri = uri + "&" + key + "=" + params[key];
    });
    return uri;
}

export function fetchApi(url, method, headers, params) {
    return fetch(url, {
        method: method,
        headers: {
            ...DEFAULT_HEADERS,
            headers
        },
        body: JSON.stringify(params),
    });
}

export function searchBy(searchText) {
    let uri = setApiParams(SEARCH_API_URL, { query: searchText, page: 1, language: 'fr-FR' });

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

export function signIn(email, password) {
    let url = BACKEND_URL + "sessions";

    return fetchApi(url, 'POST', null, { email, password })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}