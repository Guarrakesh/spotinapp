import {
  USER_LOGIN_SUCCESS,
  OAUTH_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../actions/authActions';

import {PROFILE_GET_INFO_SUCCESS} from "../actions/profile";


let initialState = {

  isLoggedIn: false,
  token: null,
  profile: {}

}

export default function authReducer(state = initialState, { payload, type }) {
  switch (type) {
    case USER_LOGIN_SUCCESS:
    case OAUTH_LOGIN_SUCCESS:
      return { ...state, loggedIn: true, token: payload.token, profile: payload.user}

    case PROFILE_GET_INFO_SUCCESS:
       return { ...state, profile: payload.data };
    case USER_LOGOUT:
        return { ...previousState, isLoggedIn: false, token: null, profile: {}};
    default:
      return state;
  }
}
//Selector
export const isLoggedIn = state => state.isLoggedIn;
