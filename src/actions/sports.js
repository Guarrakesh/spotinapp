import {

    FETCH_ALL_SPORTS,
    FETCH_FAVORITE_SPORTS,

} from './types';


// REQUEST E FAILURE sono gestiti più generalmente da requestSending e requestError (vedi actions/index.js)
export function getAllSports() {
    return {
        type: FETCH_ALL_SPORTS.REQUEST
    }
}
export function getFavoriteSports() {
    return {
        type: FETCH_FAVORITE_SPORTS.REQUEST
    }
}
export function getAllSportsSuccess(sports) {
    return {
        type: FETCH_ALL_SPORTS.SUCCESS,
        sports
    }
}


export function getFavoriteSportsSuccess(error) {
    return {
        type: FETCH_FAVORITE_SPORTS.SUCCESS,
        sports: error
    }
}


