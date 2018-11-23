import { take, fork, takeEvery, call, put } from "redux-saga/effects";
import {
  FCM_INIT,
  FCM_NOTIFICATION_DISPLAYED,
  FCM_INITIAL_NOTIFICATION,
  FCM_NOTIFICATION_OPENED,
  FCM_TOKEN_REFRESHED,
  FCM_DESTROY,

} from "./actions";
import { AsyncStorage, Platform } from 'react-native';
import firebase from 'react-native-firebase';


import { getToken, requestPermissions, hasPermission, getInitialNotification } from './helpers';
import themes from "../styleTheme";

const ANDROID_CHANNEL_ID = "spotin-remote-fcm-channel";
const ANDROID_CHANNEL_NAME = "Spot IN Android Remote FCM Channel";

let onNotificationOpenUnsubscribe = () => {};
let onNotificationDisplayedUnsubscribe = () => {};
let onNotificationUnsubscribe = () => {};

function* firebaseWorker({type, payload}) {
  switch (type) {
    case FCM_TOKEN_REFRESHED: {
      //Update Token in Async Storage e mandarla al server
      yield call(AsyncStorage.setItem, "fcmToken", payload);
      break;
    }
    case FCM_NOTIFICATION_OPENED: {
      break;
    }
    case FCM_DESTROY: {
      //Unsubscribe fcm listeners
      onNotificationOpenUnsubscribe();
      onNotificationDisplayedUnsubscribe();
      onNotificationUnsubscribe();
      break;
    }

    default:
      break;
  }
}
function* initFcm() {
  try {
    let enabled = yield call(hasPermission);
    if (!enabled) {
      try {
        yield call(requestPermissions);
        const fcmToken = yield call(getToken);
        console.log("FCM",enabled);
        yield call(AsyncStorage.setItem, "fcmToken", fcmToken);
        enabled = true;
      } catch (error) {
        yield call(AsyncStorage.setItem, "fcmToken", "0");
        // Nient'altro da fare, l'utente ha negato il permesso
        return;
      }
    }

    if (enabled) {
      /** Se Android, registro il canale
       ** @see https://github.com/invertase/react-native-firebase-docs/blob/master/docs/notifications/android-channels.md
       **/
      if (Platform.OS === "android") {
        const channel = new firebase.notifications.Android.Channel(ANDROID_CHANNEL_ID, ANDROID_CHANNEL_NAME, firebase.notifications.Android.Importance.Max);
        firebase.notifications().android.createChannel(channel);
      }

      // Attach listeners
      onNotificationOpenUnsubscribe = firebase.notifications().onNotificationOpened((notificationOpen) => {
        /*
         * "On Android, unfortunately there is no way to access the title and body of an opened remote notification.
         * You can use the data part of the remote notification to supply this information if it's required"
         */
        put({type: FCM_NOTIFICATION_OPENED, payload: notificationOpen, meta: { firebase: true}})
      });
      onNotificationDisplayedUnsubscribe = firebase.notifications().onNotificationDisplayed((notification) => {
        // "Process your notification as required"
        put({type: FCM_NOTIFICATION_DISPLAYED, payload: notification, meta: { firebase: true}});
        // "ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification"
      });
      onNotificationUnsubscribe = firebase.notifications().onNotification((notification) => {
        notification
            .android.setChannelId(ANDROID_CHANNEL_ID)
            .android.setSmallIcon('ic_launcher') //TODO: icona piccola da settare
            .android.setColor(themes.base.colors.accent.default) // you can set a color here
            .android.setPriority(firebase.notifications.Android.Priority.High);
        firebase.notifications()
            .displayNotification(notification);

      });

      //  is populated if the notification is tapped and opens the app
      const notificationOpen = yield call(getInitialNotification);
      if (notificationOpen) {
        // App was opened by a notification
        // Get the action triggered by the notification being opened
        put({type: FCM_INITIAL_NOTIFICATION, payload: notificationOpen, meta: { firebase: true}});
      }
    }
  } catch (error) {
    // Unknwon Error
    console.warn(error);
  }
}


export default function* root() {

  yield take(FCM_INIT);
  yield fork(initFcm);
  yield takeEvery(action => action.meta && action.meta.firebase, firebaseWorker);
}