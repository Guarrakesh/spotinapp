import {
    FETCH_ALL_SPORTS,
    FETCH_FAVORITE_SPORTS,
    REQUEST_ERROR,
    SENDING_REQUEST
} from '../actions/types';


let initialState = {

    sports: [],
    currentlySending: false,
    error: ''

};

export default function entityReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_SPORTS.SUCCESS:
        case FETCH_FAVORITE_SPORTS.SUCCESS:
            return {...state, error:'', sports: action.sports};
        case SENDING_REQUEST:
            return {...state, currentlySending: action.sending};
        case REQUEST_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}
