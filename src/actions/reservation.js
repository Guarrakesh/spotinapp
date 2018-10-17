import {CREATE, RESERVE_BROADCAST} from "./types";
import {CRUD_CREATE} from "./dataActions";

export function reserveBroadcastRequest(broadcastId) {
  return {
    type: RESERVE_BROADCAST.REQUEST,
    broadcastId
  }
}

export function reserveBroadcastSuccess(reservation) {
  return {
    type: RESERVE_BROADCAST.REQUEST,
    reservation
  }
}




export const reserveBroadcast = (broadcast, userId) => ({
  type: CRUD_CREATE,
  payload: { broadcast },
  meta: {
    basePath: "/users"+userId,
    resource: "reservations",
    fetch: CREATE,
    listId: "profile_reservations_list",
     onSuccess: {
       notification: {
         body: "Hai ottenuto l'offerta con successo!",
         level: 'success',
         messageArgs: {
           smart_count: 1,
         },
       },

     },
     /*onFailure: {
       notification: {
         body: 'spotinapp.notification.http_error',
         level: 'warning',
       },
     },*/
  },
});

