import vars from '../vars';
import { request } from './index';

const events = {

    async fetchByCompetition(competitionId) {

        try {
            const endpoint = `${vars.apiUrl}/events?extend=competition,competitors.competitor&competition_id=${competitionId}&_end=10`
            let response = await request(endpoint, {}, 'GET');
            let data = await response.json();

            return data;
        } catch(err) {
            throw new Error(err);
        }
    },

    async fetchAll() {
        // TODO: Da definire

    },

    async fetchAccumulated(ids = []) {
        const idsString = ids.join('|');
      try {
        const endpoint = `${vars.apiUrl}/events?id_like=${idsString}&extend=competition,competitors.competitor,sport`;
        let response = await request(endpoint, {}, 'GET');
        let data = await response.json();

        return data;
      } catch(err) {
        throw new Error(err);
      }

    }


};

export default events;