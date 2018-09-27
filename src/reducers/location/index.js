import { combineReducers } from 'redux';

import {
    GET_CURRENT_LOCATION, REQUEST_ERROR, SENDING_REQUEST
} from "../../actions/types";

import near from './near';


let initialState = {
    latitude: null,
    longitude: null
};



//Action e' l'oggetto (plain) di risposta dispatchata dal saga
//I campi di action li posso vedere nel file actions/location.js
function coordReducer(state = initialState, action) {
    switch (action.type) {

        case GET_CURRENT_LOCATION.SUCCESS:
            const { latitude, longitude } = action;
            return {...state,

                latitude: latitude, longitude: longitude };


        default:

            return state;
    }
}

export default combineReducers({
    coordinates: coordReducer,
    near,
})