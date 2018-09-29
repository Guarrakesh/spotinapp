import {
  GET_PROFILE
} from './types';


export const PROFILE_GET_INFO = 'PROFILE_GET_INFO';
export const PROFILE_GET_INFO_LOADING = 'PROFILE_GET_INFO_LOADING';
export const PROFILE_GET_INFO_FAILURE = 'PRODILE_GET_INFO_FAILURE';
export const PROFILE_GET_INFO_SUCCESS = 'PROFILE_GET_INFO_SUCCESS';

export const profileGetInfo = () => ({
  resource: "users",
  type: PROFILE_GET_INFO,
  meta: {
    resource: 'users',
    fetch: GET_PROFILE
  },
  onFailure: {
    notification: {
      body: 'spotinapp.notification.http_error',
      level: 'warning'
    }
  }
});