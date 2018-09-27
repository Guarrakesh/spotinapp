import {
  LOGIN,
  LOGOUT,
  SET_AUTH,
  SENDING_REQUEST,
  REQUEST_ERROR
} from '../actions/types';
import {PROFILE_GET_INFO_SUCCESS} from "../actions/profile";


let initialState = {

  loggedIn: false,
  currentlySending: false,
  error: '',
  token: null,
  profile: {}

}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {...state, loggedIn: action.newAuthState, token: action.token };
    case LOGIN.REQUEST:
    case SENDING_REQUEST:
      return {...state, currentlySending: action.sending};

    case LOGIN.FAILURE:
    case REQUEST_ERROR:
      return {...state, error: action.error};

    case PROFILE_GET_INFO_SUCCESS:
       return { ...state, profile: action.payload };

    default:
      return state;
  }
}
