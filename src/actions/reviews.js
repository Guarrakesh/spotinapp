import {CREATE} from "./types";
import i18n from '../i18n/i18n';
import { CRUD_UPDATE_OPTIMISTIC } from "./dataActions";

i18n.init();

export const SEND_REVIEW = "SEND_REVIEW";

export const sendReview = (reservationId, userId, comment, rating) => ({
  type: SEND_REVIEW,
  payload: {
    data: {
      reservationId,
      userId,
      rating,
      ...(comment && {comment: comment})
    }
  },
  meta: {
    basePath: "/broadcastreviews",
    resource: "",
    fetch: CREATE,
    listId: "profile_reviews_list",
    linkedResources: {
      "reservations": { type: CRUD_UPDATE_OPTIMISTIC, payload: { id: reservationId, data: { review: true } }}
    },
    onSuccess: {
      notification: {
        body: i18n.t("profile.reservations.notifications.success.message"),
        level: "success",
        title: i18n.t("profile.reservations.notifications.success.title")
      }
    },
    onFailure: {
      notification: {
        body: i18n.t("profile.reservations.notifications.failure.message"),
        level: "warning",
        title: i18n.t("profile.reservations.notifications.failure.title")
      }
    }
  }
});