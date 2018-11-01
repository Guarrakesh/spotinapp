import {CREATE, DELETE} from "./types";
import {CRUD_CREATE, CRUD_DELETE_OPTIMISTIC} from "./dataActions";

import i18n from '../i18n/i18n';
i18n.init();

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
        body: i18n.t("profile.bookedOffer.bookedNotification.success.message"),
        level: 'success',
        messageArgs: {
          smart_count: 1,
        },
        title: i18n.t("profile.bookedOffer.bookedNotification.success.title")
      },

    },
    onFailure: {
      notification: {
        title: i18n.t("profile.bookedOffer.bookedNotification.failure.title"),
        body: i18n.t("profile.bookedOffer.bookedNotification.failure.message"),
        level: 'warning',
      },
    },
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
        body: i18n.t("profile.bookedOffer.deleteNotification.success.message"),
        level: "info",
        title: i18n.t("profile.bookedOffer.deleteNotification.success.title")
      }
    }
  }

});