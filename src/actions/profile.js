import {
  GET_PROFILE, UPDATE
} from './types';
import i18n from "../i18n/i18n";
import {CRUD_DELETE_OPTIMISTIC, CRUD_UPDATE, CRUD_UPDATE_OPTIMISTIC} from "./dataActions";
import {DELETE} from "./types";


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

export const updateProfile = ({userId: id, name, email, password, notificationsEnabled, favorite_sports, favorite_competitors }, callback,
                              showNotification = true) => ({
  type: PROFILE_UPDATE,
  payload: {
    id,
    data: {
      id,
      name,
      password,
      notificationsEnabled,
      favorite_sports,
      favorite_competitors
    },
  },
  meta: {
    //  basePath: "/users/"+profile.userId, Per @Ale: Non c'è bisogno dato che l'update prende la resource e l'id e forma l'url PATCH /users/:userID
    //Quello che c'è da fare è, aggiornare i dati nel reducer auth.js
    resource: "users",
    fetch: UPDATE,

    onSuccess: {
      callback,
      notification: showNotification ? {
        body: i18n.t("profile.settings.notifications.profileDataUpdateMessage"),
        level: "success",
        title: i18n.t("profile.settings.notifications.profileDataUpdateTitle")
      } : undefined,
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
});

export const UPLOAD_IMAGE_LOADING = "UPLOAD_IMAGE_LOADING";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE";
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export var IMAGE_VERSION = 0;


export const uploadImage = (userId, photo) => ({
  type: UPLOAD_IMAGE,
  payload: {
    userId,
    photo
  }
});



export const SET_FAVORITES = "SET_FAVORITES";

export const setFavorites = ({ userId, favorite_sports, favorite_competitors }) => ({
  type: SET_FAVORITES,
  payload: {
    userId,
    favorite_sports,
    favorite_competitors
  }
});

export const deleteFavoriteEvent = (userId, id) => ({
  type: CRUD_DELETE_OPTIMISTIC,
  payload: {id},
  meta: {
    basePath: "/users/"+userId,
    resource: "events",
    fetch: DELETE,
    listId: 'profile_savedEvents_list',
    linkedResources: {
      "events": {type: CRUD_UPDATE_OPTIMISTIC, payload: { id: id, data: { isUserFavorite: false }}}
    }
  }
});
