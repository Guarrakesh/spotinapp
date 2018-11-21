import { take, takeEvery, call, put } from "redux-saga/effects";
import {
  FCM_INIT,
  FCM_NOTIFICATION_DISPLAYED,
  FCM_INITIAL_NOTIFICATION,
  FCM_NOTIFICATION_OPENED,
  FCM_TOKEN_REFRESHED,
  FCM_LISTEN,
} from "./actions";
import { AsyncStorage, Platform } from 'react-native';
// Firebase
import firebase from 'react-native-firebase';

import themes from "../styleTheme";

const ANDROID_CHANNEL_ID = "spotin-remote-fcm-channel";
const ANDROID_CHANNEL_NAME = "Spot IN Android Remote FCM Channel";

/** On Foreground Notifications
 ** Notes: "No visible notification is shown to the user, it is up to you to display notifications manually"
 */
const onNotificationListener = firebase.notifications().onNotification((notification) => {
  notification
    .android.setChannelId(ANDROID_CHANNEL_ID)
    .android.setSmallIcon('ic_launcher') //TODO: icona piccola da settare
    .android.setColor(themes.base.colors.accent.default) // you can set a color here
    .android.setPriority(firebase.notifications.Android.Priority.High);
  firebase.notifications()
    .displayNotification(notification);

});

// IOS ONLY - triggered if content_available set to true
const onNotificationDisplayedListener =
  firebase.notifications().onNotificationDisplayed((notification) => {
    // "Process your notification as required"
    put.dispatch({type: FCM_NOTIFICATION_DISPLAYED, payload: notification, meta: { firebase: true}});
    // "ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification"
  });

// On Opened (From Backround) Notifications
const onNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
  /*
   * "On Android, unfortunately there is no way to access the title and body of an opened remote notification.
   * You can use the data part of the remote notification to supply this information if it's required"
   */
  put.dispatch({type: FCM_NOTIFICATION_OPENED, payload: notificationOpen, meta: { firebase: true}})
});

function* firebaseWorker({type, payload}) {
  switch (type) {
    case FCM_TOKEN_REFRESHED: {
      //Update Token in Async Storage e mandarla al server
      yield call(AsyncStorage.setItem, "fcmToken", payload);
      break;
    }

    case FCM_NOTIFICATION_OPENED: {

    }

    case FCM_LISTEN: {
      console.log("background");
      onNotificationDisplayedListener();
      onNotificationListener();
      onNotificationOpenedListener();

    }
    default:
      break;
  }
}
function* initFcm() {
  try {
    let enabled = yield call(firebase.messaging().hasPermission);
    if (!enabled) {

      try {
        yield call(firebase.messaging().requestPermission);
        const fcmToken = yield call(firebase.messaging().getToken);

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


      //  is populated if the notification is tapped and opens the app
      const notificationOpen = yield call(firebase.notifications().getInitialNotification);
      if (notificationOpen) {
        // App was opened by a notification
        // Get the action triggered by the notification being opened
        put({type: FCM_INITIAL_NOTIFICATION, payload: notification, meta: { firebase: true}});
      }
    }
  } catch (error) {
    // Unknwon Error

  }
}


export default function* root() {
  yield take(FCM_INIT, initFcm);

  yield takeEvery(action => action.meta && action.meta.firebase, firebaseWorker);
}