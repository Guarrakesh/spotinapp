import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  GET_MANY,
  GET_MANY_REFERENCE
} from './types';


export const PROFILE_GET_INFO = 'PROFILE_GET_INFO';
export const PROFILE_GET_INFO_LOADING = 'PROFILE_GET_INFO_LOADING';
export const PROFILE_GET_INFO_FAILURE = 'PRODILE_GET_INFO_FAILURE';
export const PROFILE_GET_INFO_SUCCESS = 'PROFILE_GET_INFO_SUCCESS';

export const profileGetInfo = (userId) => ({
  resource: "users",
  type: PROFILE_GET_INFO,
  payload: { id: userId },
  meta: {
    resource: 'users',
    basePath: "/users/profile",
    fetch: GET_ONE
  },
  onFailure: {
    notification: {
      body: 'spotinapp.notification.http_error',
      level: 'warning'
    }
  }
});