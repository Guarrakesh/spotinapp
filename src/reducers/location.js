import {
    GET_CURRENT_LOCATION, REQUEST_ERROR, SENDING_REQUEST
} from "../actions/types";


let initialState = {
    latitude: null,
    longitude: null,
    error: null,
    currentlySending: false

}



//Action e' l'oggetto (plain) di risposta dispatchata dal saga
//I campi di action li posso vedere nel file actions/location.js

export default function locationReducer(state = initialState, action) {
    switch (action.type) {

        case GET_CURRENT_LOCATION.SUCCESS:
            const { latitude, longitude } = action;
            return {...state,

                latitude: latitude, longitude: longitude, error: null};

        case SENDING_REQUEST:
            return {...state, currentlySending: action.sending};


        case REQUEST_ERROR:
            return {...state, error: action.error};
        default:

            return state;
    }
}
