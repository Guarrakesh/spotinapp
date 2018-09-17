import vars from '../vars';
import { request } from './index';

const businesses = {

  async fetchByPosition(position) {
    const {lat, lng, radius = 50} = position;
    if (!lat || !lng) {
      throw new Error("Latitudine e longitudine sono obbligatori");
    }
    try {
      let endpoint = `${vars.apiUrl}/businesses?latitude=${lat}&longitude=${lng}&radius=${radius}`

      let response = await request(endpoint, {}, 'GET');

      let data = await response.json();

      return data;

    } catch (error) {
      throw new Error(error);

    }
  }
}

export default businesses;