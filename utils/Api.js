// URLS
const BACKEND_URL = `http://localhost:3000/api/`;
// TODO : make it https
// const BACKEND_URL = `https://localhost:3000/api/`;

const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
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
 * _get - method for call API constructor for GET API
 * @param {string} url 
 * @param {string} method 
 * @param {Object} headers 
 * @param {Object} params 
 */
export function _get(url, headers) {
    return fetch(url, {
        headers: {
            ...DEFAULT_HEADERS,
            ...headers,
        },
    });
}


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
 * getUserById - GET /users/:id
 * @param {number} userId
 */
export function getUserById(userToken, userId) {
    let url = BACKEND_URL + `users/${userId}`;
    let headers = {
        Authorization: `Bearer ${userToken}`
    }
    return _get(url, headers)
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
export function createUserMovie(userToken, params) {
    let url = BACKEND_URL + "user_movies";
    let headers = {
        Authorization: `Bearer ${userToken}`
    }

    return _form(url, 'POST', headers, params)
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
export function updateUserMovie(userToken, userMovieId, params) {
    let url = BACKEND_URL + "user_movies/" + userMovieId;
    let headers = {
        Authorization: `Bearer ${userToken}`
    }

    return _form(url, 'PUT', headers, params)
        .then((response) => response.json())
        .then(manageError)
        .catch((error) => {
            console.log("updateUserMovie()", error);
            throw error;
        });
}