import { CREATE } from "../actions/types";
// If your app is in the foreground, or background, you can listen for when a notification is clicked / tapped / opened
export const FCM_NOTIFICATION_OPENED = "FCM_NOTIFICATION_OPENED";

export const FCM_NOTIFICATION_DISPLAYED = "FCM_NOTIFICATION_DISPLAYED";

// If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened
export const FCM_INITIAL_NOTIFICATION = "FCM_INITIAL_NOTIFICATION";

// FCM Token refreshed
export const FCM_TOKEN_REFRESHED = "FCM_TOKEN_REFRESHED";

// Init & attach listeners
export const FCM_INIT = "FCM_INIT";
// Detach listeners
export const FCM_DESTROY = "FCM_DESTROY";

export const FCM_SEND_TOKEN = "FCM_SEND_TOKEN";

export const sendFcmToken = (token, deviceId, userId) => ({
  type: FCM_SEND_TOKEN,
  payload: { data: { token, deviceId } },
  meta: {
    basePath: "/users/"+userId,
    resource: "fcm_tokens",
    fetch: CREATE,

  }
});