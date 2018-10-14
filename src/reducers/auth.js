import {
  USER_LOGIN_SUCCESS,
  OAUTH_LOGIN_SUCCESS,
  USER_REGISTER_SUCCESS,

  USER_LOGIN_FAILURE,
  OAUTH_LOGIN_FAILURE,
  USER_REGISTER_FAILURE,
  USER_LOGOUT,
  AUTH_CHECKING,

} from '../actions/authActions';

import {PROFILE_GET_INFO_SUCCESS} from "../actions/profile";

let initialState = {

  isLoggedIn: false,
  token: null,
  profile: {},
  checking: false,
  loginError: null,
  registerError: null,
};

export default function authReducer(state = initialState, { payload, type, error }) {
  switch (type) {
    case USER_LOGIN_SUCCESS:
    case OAUTH_LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true, token: payload.token, profile: payload.user,  loginError: null };

    case USER_REGISTER_SUCCESS:
      return { ...state, isLoggedIn: true, token: payload.token, profile: payload.user, registerError: null};
    case PROFILE_GET_INFO_SUCCESS:
      return { ...state, profile: payload.data};
    case USER_LOGOUT:
      return { ...state, isLoggedIn: false, token: null, profile: {}};

    case AUTH_CHECKING:
      return { ...state, checking: payload.checking};

    case USER_LOGIN_FAILURE:
    case OAUTH_LOGIN_FAILURE:
      return { ...state, loginError: error };
    case USER_REGISTER_FAILURE:
      return { ...state, registerError: error };
    default:
      return state;
  }
}
//Selector
export const isLoggedIn = state => state.auth.isLoggedIn;
export const isChecking = state => state.auth.checking;