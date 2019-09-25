import {CREATE, DELETE,} from './types';

import { FETCH_EVENTS, GET_LIST } from "./types";
import {CRUD_DELETE_OPTIMISTIC, CRUD_UPDATE_OPTIMISTIC} from "./dataActions";

export const ADD_FAVORITE_EVENT = "ADD_FAVORITE_EVENT";
export const ADD_FAVORITE_EVENT_SUCCESS = "ADD_FAVORITE_EVENT_SUCCESS";
export const ADD_FAVORITE_EVENT_LOADING = "ADD_FAVORITE_EVENT_LOADING";
export const ADD_FAVORITE_EVENT_FAILURE = "ADD_FAVORITE_EVENT_FAILURE";

export const addFavoriteEvent = (event, userId, eventObj) => ({
  type: ADD_FAVORITE_EVENT,
  payload: { data: { event, id: event } },
  meta: {
    optimisticData: { ...eventObj, isUserFavorite: true },
    basePath: "/users/" + userId,
    resource: "events",
    fetch: CREATE,
    listId: "profile_savedEvents_list",
    addToList: true
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
      "events": {
        type: CRUD_UPDATE_OPTIMISTIC,
        payload: {
          id: id,
          data: {
            isUserFavorite: false
          }
        }
      }
    }
  }
});