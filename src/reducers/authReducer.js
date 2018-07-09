import {
    LOGIN,
    LOGOUT,
    SET_AUTH,
    SENDING_REQUEST,
    REQUEST_ERROR
} from '../actions/types';


let initialState = {

    loggedIn: false,
    currentlySending: false,
    error: '',
    token: null

}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTH:
            return {...state, loggedIn: action.newAuthState, token: action.token};
        case LOGIN.REQUEST:
        case SENDING_REQUEST:
            return {...state, currentlySending: action.sending};

        case LOGIN.FAILURE:
        case REQUEST_ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}
