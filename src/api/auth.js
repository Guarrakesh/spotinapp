import vars from '../vars';
import { AsyncStorage } from 'react-native';


/*
* Sample response from login
* On Success: {
 "token": {
     "tokenType": "Bearer",
     "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzE1MTYxMTksImlhdCI6MTUzMDkxNjE3OSwic3ViIjoiNWIzY2Q0NDM3ZGY2MTAzOWJhZjdlZGFhIn0.HCN2ZoZDnjhZEI0MlxjTArzboCZ9mFEA83TaeXH7ROs",
     "refreshToken": "5b3cd4437df61039baf7edaa.6d8fffd413b08b7f7959ed87c3f85109817a3737391415a331c4869f908417cb8ca55783b62b331b",
     "expiresIn": "2018-07-13T21:08:39.749Z"
    },
 "user": {
     "id": "5b3cd4437df61039baf7edaa",cons
     "name": "Dario",
     "email": "dario.guarracino2@gmail.com",
     "role": "admin"
    }
 }
 * On Failure: {
     "code": 401,
     "message": "Incorrect email or password"
 }
 **/
const auth = {
    /**
     * Login request, returns promise with "true" when finished
      */
    async login(username, password) {

        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password: password })

        };
        try {
            let response = await fetch(`${vars.apiUrl}/auth/login`, config);
            let data = await response.json();
            return data;
        } catch (err) {
            throw new Error(err);
        }

    },

    async refresh(username, token) {

        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, refreshToken: token })
        };
        try {

            let response = await fetch(`${vars.apiUrl}/auth/refresh-token`, config);

            let data = await response.json();

            return data;
        } catch (err) {

            throw new Error(err);
        }
    },
    async loggedIn() {
        let token = await AsyncStorage.getItem('token');

        if (!token) return false;

        //Now check if expired
        let dateNow = new Date();
        let dateExpire = Date.parse(token.expiresIn);
        if (dateExpire < dateNow) {
            //Token expired
            return false;
        }
        return true;
    },
    async getAuthToken() {
        return JSON.parse(await AsyncStorage.getItem('token'));
    },
    async setAuthToken(token) {
        await AsyncStorage.setItem('token', JSON.stringify(token));
    },
    async setUserInfo(user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
    },
    async getUserInfo(user) {
        return JSON.parse(await AsyncStorage.getItem('user'));
    },
    async removeAuthToken() {
        await AsyncStorage.removeItem('token');
    }






}

export default auth;