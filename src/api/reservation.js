import vars from '../vars';
import { AsyncStorage } from 'react-native';
import { request } from './index';

const reservation = {

  async reserveOffer(broadcast){

    let token = await AsyncStorage.getItem('token');

    if (!token)
      throw Error("Token not provided.");
    try {
      let response = await request(`${vars.apiUrl}/reservations`,
        JSON.stringify({broadcast: broadcast}), 'POST', token);
      const data = await response.json();

      return data;

    }catch (error) {
      throw new Error(error);
    }

  }

}

export default reservation;