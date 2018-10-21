import {CREATE, DELETE} from "./types";
import {CRUD_CREATE, CRUD_DELETE_OPTIMISTIC} from "./dataActions";


export const reserveBroadcast = (broadcast, userId, callback) => ({
  type: CRUD_CREATE,
  payload: { data: {broadcast} },
  meta: {
    basePath: "/users/"+userId,
    resource: "reservations",
    fetch: CREATE,
    listId: "profile_reservations_list",

    onSuccess: {
      callback,
      notification: {
        body: "Hai ottenuto l'offerta con successo!",
        level: 'success',
        messageArgs: {
          smart_count: 1,
        },
        title: "Ottimo!"
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

export const CANCEL_RESERVATION = 'CANCEL_RESERVATION';
export const CANCEL_RESERVATION_SUCCESS = 'CANCEL_RESERVATION_SUCCESS';
export const CANCEL_RESERVATION_FAILURE = 'CANCEL_RESERVATION_FAILURE';
export const CANCEL_RESERVATION_LOADING = 'CANCEL_RESERVATION_LOADING';


export const cancelReservation = (userId, reservationId) => ({
  type: CRUD_DELETE_OPTIMISTIC,
  payload: { id: reservationId },
  meta: {
    basePath: "/users/"+userId,
    resource: "reservations",
    fetch: DELETE,
    listId: "profile_reservations_list",
    onSuccess: {
      notification: {
        body: "La prenotazione è stata annullata.",
        level: "info",
        title: "Fatto"
      }
    }
  }

});