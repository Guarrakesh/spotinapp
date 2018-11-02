import { Platform } from 'react-native';
import Config from "react-native-config";
export default {
  apiUrl: Config.API_URL,
  environment: Config.ENV,
 // apiUrl: Platform.select({android: 'http://10.0.2.2:3001/v1', ios: 'http://localhost:3001/v1'})
};