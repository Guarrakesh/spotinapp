import _ from 'lodash';
import vars from '../vars';

export const fetchApi = (endPoint, payload = {}, method = 'get', header = {}) => {
    // TODO: return fetch
}

export async function request(url, payload, method: 'GET', accessToken = null) {
    let config = {
        method: method,
        headers: { 'Content-Type': 'application/json' },

    };
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (method ==! 'HEAD' && method ==! 'GET') {
        config.body = payload;
    }


    let response = await fetch(url, config);

    return response;


}