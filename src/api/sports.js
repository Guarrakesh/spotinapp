import vars from '../vars';
import { request } from './index';

const sports = {
    async fetchAll(accessToken) {
        try {
            let response = await request(`${vars.apiUrl}/sports`, {}, 'GET', accessToken );
            let data = await response.json();
            return data;
        } catch (err) {
            throw new Error(err);
        }

    }
}


export default sports;