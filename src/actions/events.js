import { CREATE, } from './types';

import { FETCH_EVENTS, GET_LIST } from "./types";

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
    onLoading: {
      addToList: true,
    },

  }
});