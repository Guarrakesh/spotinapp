import { fetchJson } from '../helpers/fetch';
import restClientProvider from './restClientProvider'
import auth from './auth';


const apiUrl = process.env.NODE_ENV === "production" ? "http://spotin.it/v1" : "http://localhost:3001/v1";
//const apiUrl = "http://spotin.herokuapp.com/v1";

const httpClient = async (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({Accept: 'application/json'});
  }

  const token = await auth.getAuthToken();
  if (!token) return Promise.reject({status: 401, message: "No Auth Token"});
  if (token) options.headers.set('Authorization', `Bearer ${token.accessToken}`);
  options.headers.set('X-Client-Type', 'mobileapp');

  return fetchJson(url, options);

};

const dataProvider = restClientProvider(apiUrl, httpClient);


export default dataProvider;
