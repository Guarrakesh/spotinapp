import vars from '../vars';
import { request } from './index';

const events = {

    async fetchByCompetition(competitionId) {

        try {
            const endpoint = `${vars.apiUrl}/events?competition_id=${competitionId}&_end=100`
            let response = await request(endpoint, {}, 'GET');
            let data = await response.json();

            return data;
        } catch(err) {
            throw new Error(err);
        }
    },

    async fetchAll() {
        // TODO: Da definire

    }


};

export default events;