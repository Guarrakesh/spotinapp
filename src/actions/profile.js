import {
  GET_PROFILE, UPDATE
} from './types';
import {CRUD_UPDATE} from "./dataActions";


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

export const updateProfile = (profile) => ({
  resource: "users",
  type: CRUD_UPDATE,
  payload: {
    id: profile.userId,
    data: {
      name: profile.name,
      password: profile.password
    },
  },
  meta: {
    basePath: "/users/"+profile.userId,
    resource: "profile",
    fetch: UPDATE,
    onSuccess: {
      notification: {
        body: "I dati del profilo sono stati aggiornati",
        level: "success",
        title: "Dati aggiornati"
      }
    }
  }
})