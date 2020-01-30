import { AsyncStorage } from "react-native";

// URLS
const BACKEND_URL = `http://localhost:3000/api/`;
// TODO : make it https
// const BACKEND_URL = `https://localhost:3000/api/`;

const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

/**
 * fetchApi - method for call API constructor
 * @param {string} url 
 * @param {string} method 
 * @param {Object} headers 
 * @param {Object} params 
 */
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


function manageError(responseJson) {
    console.log(responseJson);
    if (responseJson && responseJson.error_code) {
        throw responseJson;
    } else {
        return responseJson;
    }
}

/**
 * getUserById - GET /users/:id
 * @param {number} userId 
 */
export function getUserById(userId) {
    let url = BACKEND_URL + `users/${userId}`;

    return fetch(url)
        .then((response) => response.json())
        .then(manageError)
        .catch((error) => {
            console.log("getUserById()", error);
            throw error;
        });
}

/**
 * signIn - POST /sessions
 * @param {string} email 
 * @param {string} password 
 */
export function signIn(email, password) {
    let url = BACKEND_URL + "sessions";

    return fetchApi(url, 'POST', null, { email, password })
        .then((response) => response.json())
        .then(manageError)
        .catch((error) => {
            console.log("signIn()", error);
            throw error;
        });
}