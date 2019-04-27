import { Platform } from 'react-native';
import Config from "react-native-config";
export default {
  apiUrl: Config.API_URL ? Config.API_URL : process.env.NODE_ENV === "development" ? "https://spotin-dev.herokuapp.com/v1" : "https://spotin.herokuapp.com/v1",
  environment: Config.ENV || "production",
  //apiUrl: Platform.select({android: 'http://192.168.1.5:3001/v1', ios: 'http://localhost:3001/v1'})
  //apiUrl: Platform.select({android: 'http://10.11.49.18:3001/v1', ios: 'http://10.11.49.18:3001/v1'})
};

export const GOOGLE_API_KEY = "AIzaSyAjhLABUIehL464nlbYk3YobnCOGRi5sDI";