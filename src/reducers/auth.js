import { omit } from 'lodash';


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

import {
  SET_COUPON,
  SET_SPOTCOINS,
  SET_COUPON_ERROR
} from "../actions/coupon";

import {
  PROFILE_GET_INFO_SUCCESS,
  PROFILE_UPDATE,
  PROFILE_UPDATE_SUCCESS

} from "../actions/profile";

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
      return { ...state, isLoggedIn: true, token: payload.token, profile: payload.user, loginError: null };

    case USER_REGISTER_SUCCESS:
      return { ...state, isLoggedIn: true, token: payload.token, profile: payload.user, registerError: null};
    case PROFILE_GET_INFO_SUCCESS:
    case PROFILE_UPDATE:
    case PROFILE_UPDATE_SUCCESS:
      return { ...state, profile: {...state.profile, ...omit(payload.data, "password")}};
    case USER_LOGOUT:
      return { ...state, isLoggedIn: false, token: null, profile: {}};

    case AUTH_CHECKING:
      return { ...state, checking: payload.checking};

    case USER_LOGIN_FAILURE:
    case OAUTH_LOGIN_FAILURE:
      return { ...state, loginError: error };
    case USER_REGISTER_FAILURE:
      return { ...state, registerError: error };
    case SET_COUPON:
      return { ...state, profile: {
          ...state.profile,
          usedCoupon: [
            ...state.profile.usedCoupon || [],
            { code: payload.data.code, value: payload.data.value }]
        }
      };
    case SET_SPOTCOINS:
      return { ...state, profile: { ...state.profile, spotCoins: (state.profile.spotCoins ? state.profile.spotCoins : 0) + payload.data.value}};
    case SET_COUPON_ERROR:
      return { ...state, profile: {
          ...state.profile,
          usedCoupon: [
            ...state.profile.usedCoupon || [],
            { code: payload.data.code, errorCode: payload.data.errorCode }]
        }
      };
    default:
      return state;
  }
}
//Selector
export const isLoggedIn = state => state.auth.isLoggedIn;
export const isChecking = state => state.auth.checking;
export const isAuthenticated = state => state.auth.profile.id;
export const userId = state => state.auth.profile ? state.auth.profile._id : undefined;