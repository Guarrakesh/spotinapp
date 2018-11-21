import { take, takeEvery, call, put } from "redux-saga/effects";
import {
  FCM_INIT,
  FCM_NOTIFICATION_DISPLAYED,
  FCM_INITIAL_NOTIFICATION,
  FCM_NOTIFICATION_OPENED,
  FCM_TOKEN_REFRESHED
} from "./actions";
import { AsyncStorage, Platform } from 'react-native';
// Firebase
import firebase from 'react-native-firebase';

import themes from "../styleTheme";

const ANDROID_CHANNEL_ID = "spotin-remote-fcm-channel";
const ANDROID_CHANNEL_NAME = "Spot IN Android Remote FCM Channel";


function* firebaseWorker({type, payload}) {
  switch (type) {
    case FCM_TOKEN_REFRESHED: {
      //Update Token in Async Storage e mandarla al server
      yield call(AsyncStorage.setItem, "fcmToken", payload);
      break;
    }
    case FCM_NOTIFICATION_OPENED: {

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