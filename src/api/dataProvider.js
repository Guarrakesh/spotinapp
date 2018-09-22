import { fetchJson } from '../helpers/fetch';
import restClientProvider from './restClientProvider'


const apiUrl = process.env.NODE_ENV === "production" ? "/v1" : "http://localhost:3001/v1";
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({Accept: 'application/json'});
  }

  const token = JSON.parse(localStorage.getItem('token'));
  if (!token) return Promise.reject("No Auth Token");
  options.headers.set('Authorization', `Bearer ${token.accessToken}`);
  return fetchUtils.fetchJson(url, options);

};



export default dataProvider;
