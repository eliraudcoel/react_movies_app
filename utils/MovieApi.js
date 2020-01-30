import Movie from '../models/Movie';

const API_KEY = "a36cb15a17169e4f6f975e37a31f7c4b";
const API_VERSION = 3;

// URLS
const SEARCH_API_URL = `https://api.themoviedb.org/${API_VERSION}/search/movie?api_key=${API_KEY}`;

export function getMovieById(movieId) {
    const movieUri = `https://api.themoviedb.org/${API_VERSION}/movie/${movieId}?api_key=${API_KEY}`;
    let uri = setApiParams(movieUri, {
        language: 'fr-FR'
    });

    return fetch(uri)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

export function setApiParams(url, params) {
    let uri = url;
    Object.keys(params).map(function (key) {
        uri = uri + "&" + key + "=" + params[key];
    });
    return uri;
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