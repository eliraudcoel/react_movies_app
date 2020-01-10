import Movie from '../models/Movie';

const API_KEY = "a36cb15a17169e4f6f975e37a31f7c4b";
const API_VERSION = 3;
const SEARCH_API_URL = `https://api.themoviedb.org/${API_VERSION}/search/movie?api_key=${API_KEY}`;

export function getMovies() {
    // TODO -> call RoR server
}

export function getMovieById(movieId) {
    const movieUri = `https://api.themoviedb.org/${API_VERSION}/movie/${movieId}?api_key=${API_KEY}`;
    /*
    return new Promise((resolve, reject) => {
        let responseJson = {
            "adult": false,
            "backdrop_path": "/txtRue33MaXv5HQpTiHPOmOcDxE.jpg",
            "belongs_to_collection": {
                "id": 458558,
                "name": "Mamma Mia! Collection",
                "poster_path": "/xRbDA4Ys0Y2Bvbnme02fVBwMWFe.jpg",
                "backdrop_path": "/8lmFjt0Lord5vl6iGx3fRlZrBuN.jpg"
            },
            "budget": 52000000,
            "genres": [
                {
                    "id": 35,
                    "name": "Comedy"
                },
                {
                    "id": 10749,
                    "name": "Romance"
                }
            ],
            "homepage": "http://www.mammamiamovie.com",
            "id": 11631,
            "imdb_id": "tt0795421",
            "original_language": "en",
            "original_title": "Mamma Mia!",
            "overview": "An independent, single mother who owns a small hotel on a Greek island is about to marry off the spirited young daughter she's raised alone. But, the daughter has secretly invited three of her mother's ex-lovers in the hopes of finding her biological father.",
            "popularity": 16.025,
            "poster_path": "/gOm2iMMbC6EonrFzmSQ8xvCa4Ei.jpg",
            "production_companies": [
                {
                    "id": 34441,
                    "logo_path": null,
                    "name": "Littlestar",
                    "origin_country": "GB"
                },
                {
                    "id": 4171,
                    "logo_path": "/ip8rzankhLLhJGGkvfCirfUM26d.png",
                    "name": "Playtone",
                    "origin_country": "US"
                },
                {
                    "id": 2655,
                    "logo_path": null,
                    "name": "Internationale Filmproduktion Richter",
                    "origin_country": "DE"
                }
            ],
            "production_countries": [
                {
                    "iso_3166_1": "DE",
                    "name": "Germany"
                },
                {
                    "iso_3166_1": "GB",
                    "name": "United Kingdom"
                },
                {
                    "iso_3166_1": "US",
                    "name": "United States of America"
                }
            ],
            "release_date": "2008-07-02",
            "revenue": 609841637,
            "runtime": 108,
            "spoken_languages": [
                {
                    "iso_639_1": "en",
                    "name": "English"
                },
                {
                    "iso_639_1": "el",
                    "name": "ελληνικά"
                }
            ],
            "status": "Released",
            "tagline": "Take a trip down the aisle you'll never forget",
            "title": "Mamma Mia!",
            "video": false,
            "vote_average": 6.9,
            "vote_count": 4079
        };
        resolve(responseJson);
    })*/
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

export function setApiParams(params) {
    let uri = SEARCH_API_URL;
    Object.keys(params).map(function (key) {
        uri = uri + "&" + key + "=" + params[key];
    });
    return uri;
}

export function searchBy(searchText) {
    let uri = setApiParams({ query: searchText, page: 1, language: 'fr-FR' });

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