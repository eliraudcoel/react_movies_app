import { AsyncStorage } from 'react-native';

// URLS

// DEV
// const BACKEND_URL = `http://localhost:3000/api/`;
// PROD
const BACKEND_URL = `https://rails-movies-app.herokuapp.com/api/`;

const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

// Store userToken for API Call
let userToken = "";

/**
 * authenticateHeaders - method for getting userToken Authorization header
 */
export function authenticateHeaders() {
    return AsyncStorage.getItem('access_token')
        .then((accessToken) => {
            userToken = accessToken;
            console.log("accessToken from AsyncStorage", accessToken);

            return {
                Authorization: `Bearer ${accessToken}`
            }
        })
}

/**
 * _form - method for call API constructor for POST/PUT API
 * @param {string} url 
 * @param {string} method 
 * @param {Object} headers 
 * @param {Object} params 
 */
export function _form(url, method, headers, params) {
    return fetch(url, {
        method: method,
        headers: {
            ...DEFAULT_HEADERS,
            ...headers,
        },
        body: JSON.stringify(params),
    });
}
/**
 * _authenticateForm - method for call API constructor for POST/PUT API with authenticate header
 * @param {string} url 
 * @param {string} method 
 * @param {Object} headers 
 * @param {Object} params 
 */
export function _authenticateForm(url, method, headers, params) {
    return authenticateHeaders().then((authenticateHeaders) => {
        return fetch(url, {
            method: method,
            headers: {
                ...DEFAULT_HEADERS,
                ...headers,
                ...authenticateHeaders,
            },
            body: JSON.stringify(params),
        });
    });
}

/**
 * _get - method for call API constructor for GET API
 * @param {string} url 
 * @param {string} method 
 * @param {Object} headers 
 * @param {Object} params 
 */
export function _get(url, headers) {
    return authenticateHeaders().then((authenticateHeaders) => {
        return fetch(url, {
            headers: {
                ...DEFAULT_HEADERS,
                ...headers,
                ...authenticateHeaders,
            },
        });
    });
}

/**
 * manageError - Throw error after call API 
 * @param {Object} responseJson 
 */
function manageError(responseJson) {
    if (responseJson && responseJson.error_code) {
        throw responseJson;
    } else {
        return responseJson;
    }
}

/**
 * signIn - POST /sessions
 * @param {string} email 
 * @param {string} password 
 */
export function signIn(email, password) {
    let url = BACKEND_URL + "sessions";

    return _form(url, 'POST', null, { email, password })
        .then((response) => response.json())
        .then(manageError)
        .catch((error) => {
            console.log("signIn()", error);
            throw error;
        });
}

/**
 * signUp - POST /sessions
 * @param {string} email 
 * @param {string} password 
 */
export function signUp(email, password) {
    let url = BACKEND_URL + "users";

    return _form(url, 'POST', null, { email, password })
        .then((response) => response.json())
        .then(manageError)
        .catch((error) => {
            console.log("signUp()", error);
            throw error;
        });
}


/**
 * getUserById - GET /users/:id
 * @param {number} userId
 */
export function getUserById(userId) {
    let url = BACKEND_URL + `users/${userId}`;
    return _get(url)
        .then((response) => response.json())
        .then(manageError)
        .catch((error) => {
            console.log("getUserById()", error);
            throw error;
        });
}

/**
 * createUserMovie - POST /user_movies
 * @param {Object} params
 */
export function createUserMovie(params) {
    let url = BACKEND_URL + "user_movies";

    return _authenticateForm(url, 'POST', {}, params)
        .then((response) => response.json())
        .then(manageError)
        .catch((error) => {
            console.log("createUserMovie()", error);
            throw error;
        });
}

/**
 * updateUserMovie - PUT /user_movies
 * @param {Object} params
 */
export function updateUserMovie(userMovieId, params) {
    let url = BACKEND_URL + "user_movies/" + userMovieId;

    return _authenticateForm(url, 'PUT', {}, params)
        .then((response) => response.json())
        .then(manageError)
        .catch((error) => {
            console.log("updateUserMovie()", error);
            throw error;
        });
}