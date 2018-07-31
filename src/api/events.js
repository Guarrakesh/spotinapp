import vars from '../vars';
import { request } from './index';

const events = {

    async fetchByCompetition(competitionId) {

        try {
            let response = await request(`${vars.apiUrl}/competitions/${competitionId}/events`, {}, 'GET');
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