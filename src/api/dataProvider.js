import { fetchJson } from '../helpers/fetch';
import restClientProvider from './restClientProvider'
import { AsyncStorage } from 'react-native';
import auth from './auth';


//const apiUrl = process.env.NODE_ENV === "production" ? "http://spotin.it/v1" : "http://192.168.1.36:3001/v1";
const apiUrl = "http://spotin.it/v1";

const httpClient = async (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({Accept: 'application/json'});
  }

  const token = await auth.getAuthToken();
  //if (!token) return Promise.reject("No Auth Token");
  if (token) options.headers.set('Authorization', `Bearer ${token.accessToken}`);
  return fetchJson(url, options);

};

const dataProvider = restClientProvider(apiUrl, httpClient);


export default dataProvider;
