import { Platform } from 'react-native';
export default {


   // apiUrl: process.env.NODE_ENV === "development" ? "https://spotin-dev.herokuapp.com/v1" : 'https://spotin.herokuapp.com/v1',
   apiUrl: process.env.NODE_ENV === "production" ? "https://spotin.it/v1" : Platform.select({android: 'http://10.0.2.2:3001/v1', ios: 'http://localhost:3001/v1'})
};