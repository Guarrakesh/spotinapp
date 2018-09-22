import vars from '../vars';
import { request } from './index';

const broadcasts = {

  async fetchByPosition(position, eventId = null) {
    const {lat, lng, radius = 50} = position;
    if (!lat || !lng) {
      throw new Error("Latitudine e longitudine sono obbligatori");
    }
    try {
      let endpoint = `${vars.apiUrl}/broadcasts?latitude=${lat}&longitude=${lng}&radius=${radius}`
      if (eventId) endpoint += "&event=" + eventId; //Fetch anche per evento

      let response = await request(endpoint, {}, 'GET');

      let data = await response.json();

      return data;

    } catch (error) {
      throw new Error(error);

    }
  },

  async fetchByBusiness(business) {

    if (!business) {
      throw new Error("Nessun locale");
    }
    try {
      let endpoint = `${vars.apiUrl}/broadcasts?business=${business}`

      let response = await request(endpoint, {}, 'GET');

      let data = await response.json();

      return data;

    } catch (error) {
      throw new Error(error);

    }
  }

}

export default broadcasts;