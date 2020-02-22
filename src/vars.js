import { Platform } from 'react-native';
import Config from "react-native-config";
export default {
  apiUrl: Config.API_URL ? Config.API_URL : process.env.NODE_ENV === "development" ? "https://spotin-dev.herokuapp.com/v1" : "https://spotin.herokuapp.com/v1",
  environment: Config.ENV || "production",
  socketUrl: Config.SOCKET_URL ? Config.SOCKET_URL : null,
  //apiUrl: Platform.select({android: 'http://localhost:3001/v1', ios: 'http://localhost:3001/v1'})
  //apiUrl: Platform.select({android: 'http://10.11.51.230:3001/v1', ios: 'http://10.11.51.230:3001/v1'})
  //apiUrl: Config.API_URL ? Config.API_URL : process.env.NODE_ENV === "development" ? "https://spotin.herokuapp.com/v1" : "https://spotin.herokuapp.com/v1",
};


export const GOOGLE_API_KEY = "AIzaSyBAIxUNGqQL7EM1GjRxsYNCshrawvHw4fc";
export const PHONE_NUMBER = "+393512486394";
export const REGULATION_URL = "https://joinus.spotin.it/game";
