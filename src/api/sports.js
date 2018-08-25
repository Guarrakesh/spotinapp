import vars from '../vars';
import { request } from './index';

const sports = {
    async fetchAll() {
        try {
            let response = await request(`${vars.apiUrl}/sports`, {}, 'GET' );
            let data = await response.json();
            return data;
        } catch (err) {
            throw new Error(err);
        }

    },

    async fetchCompetitions(sport) {
        try {
            let url = `${vars.apiUrl}/competitions`;
            url.search = new URLSearchParams({sport_id: sport._id});
            let response = await request(url, {}, 'GET');
            let data = await response.json();
            return data;
        } catch (err) {
            throw new Error(err);
        }
    }
}


export default sports;