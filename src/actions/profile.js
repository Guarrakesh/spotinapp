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

export const PROFILE_UPDATE = 'PROFILE_UPDATE';
export const PROFILE_UPDATE_LOADING = 'PROFILE_UPDATE_LOADING';
export const PROFILE_UPDATE_FAILURE = 'PROFILE_UPDATE_FAILURE';
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';

export const updateProfile = ({userId: id, name, email, password, notificationsEnabled }, callback) => ({
  type: PROFILE_UPDATE,
  payload: {
    id,
    data: {
      id,
      name,
      password,
      notificationsEnabled
    },
  },
  meta: {
    //  basePath: "/users/"+profile.userId, Per @Ale: Non c'è bisogno dato che l'update prende la resource e l'id e forma l'url PATCH /users/:userID
    //Quello che c'è da fare è, aggiornare i dati nel reducer auth.js
    resource: "users",
    fetch: UPDATE,

    onSuccess: {
      callback,
      notification: {
        body: "I dati del profilo sono stati aggiornati",
        level: "success",
        title: "Dati aggiornati"
      }
    }
  }
});

/**
 * Usato per aggiornare le impostazioni come le notifiche
 * A differenze del updateProfile, non mostra la notifica di successo
  */

export const updateSettings = ({ userId: id, notificationsEnabled }, callback ) => ({
  type: PROFILE_UPDATE,
  payload: {
    id,
    data: {
      notificationsEnabled
    },
  },
  meta: {
    //  basePath: "/users/"+profile.userId, Per @Ale: Non c'è bisogno dato che l'update prende la resource e l'id e forma l'url PATCH /users/:userID
    //Quello che c'è da fare è, aggiornare i dati nel reducer auth.js
    resource: "users",
    fetch: UPDATE,
  }
})