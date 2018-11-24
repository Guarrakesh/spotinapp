// Optional: Flow type
import { take, fork, spawn, call, put, select } from "redux-saga/effects";
import { channel } from 'redux-saga';
import NavigationService from "../navigators/NavigationService";

import { PROFILE_GET_INFO_SUCCESS } from "../actions/profile";
import {
  FCM_INIT,
  FCM_NOTIFICATION_DISPLAYED,
  FCM_INITIAL_NOTIFICATION,
  FCM_NOTIFICATION_OPENED,
  FCM_TOKEN_REFRESHED,
  FCM_DESTROY,

} from "./actions";
import { AsyncStorage, Platform } from 'react-native';
import firebase, { Notification, NotificatonOpen } from 'react-native-firebase';

import { getToken, requestPermissions, hasPermission, getInitialNotification } from './helpers';
import themes from "../styleTheme";

const ANDROID_MAIN_CHANNEL_ID = "news";
const ANDROID_MAIN_CHANNEL_NAME = "News";

let onNotificationOpenUnsubscribe = () => {};
let onNotificationDisplayedUnsubscribe = () => {};
let onNotificationUnsubscribe = () => {};

const userProfileSelector = state => state.auth.profile;

export const fcmNotificationChannel = channel();

function* uploadFcmToken(token) {

  let profile = yield select(userProfileSelector);
  if (!profile || profile._id) {
    const action = yield take(PROFILE_GET_INFO_SUCCESS);
    profile = action.payload.data;
  }



}

function* watchfcmNotificationChannel() {
  while (true) {
    try {
      const action = yield take(fcmNotificationChannel);
      const {type, payload, meta} = action;


      if (!meta || !meta.firebase) continue;
      const notification = payload.notification;

      switch (type) {
        case FCM_TOKEN_REFRESHED: {
          //Update Token in Async Storage e mandarla al server
          yield call(AsyncStorage.setItem, "fcmToken", payload);
          yield spawn(uploadFcmToken, payload);

          break;
        }
        case FCM_NOTIFICATION_OPENED: {
          /* if (notification._data && notification._data.routeName) {
           yield put(NavigationService.navigate(notification._data.routeName, notification._data, true));
           }*/
          break;
        }
        case FCM_INITIAL_NOTIFICATION: {
          /* if (notification._data && notification._data.routeName) {
           yield put(NavigationService.navigate(notification._data.routeName, notification._data, true));
           }*/
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
      yield put(action);
    } catch (e) {
      console.warn(e);
      return;
    }
  }
}

function* initFcm() {
  try {
    let enabled = yield call(hasPermission);
    if (!enabled) {
      try {
        yield call(requestPermissions);
        const fcmToken = yield call(getToken);
        yield put({ type: FCM_TOKEN_REFRESHED, payload: fcmToken });
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
        const channel = new firebase.notifications.Android.Channel(ANDROID_MAIN_CHANNEL_ID, ANDROID_MAIN_CHANNEL_NAME, firebase.notifications.Android.Importance.Max);
        firebase.notifications().android.createChannel(channel);
      }

      // Attach listeners
      onNotificationOpenUnsubscribe = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
        /*
         * "On Android, unfortunately there is no way to access the title and body of an opened remote notification.
         * You can use the data part of the remote notification to supply this information if it's required"
         */
        fcmNotificationChannel.put({type: FCM_NOTIFICATION_OPENED, payload: notificationOpen, meta: { firebase: true}})
      });
      onNotificationDisplayedUnsubscribe = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
        // "Process your notification as required"
        fcmNotificationChannel.put({type: FCM_NOTIFICATION_DISPLAYED, payload: notification, meta: { firebase: true}});
        // "ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification"
      });
      onNotificationUnsubscribe = firebase.notifications().onNotification((notification: Notification) => {
        console.log("FCM notification", notification);
        notification
            .android.setChannelId(ANDROID_MAIN_CHANNEL_ID)
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
        fcmNotificationChannel.put({type: FCM_INITIAL_NOTIFICATION, payload: notificationOpen, meta: { firebase: true}});
      }
    }
  } catch (error) {
    // Unknwon Error
  }
}


export default function* root() {

  yield take(FCM_INIT);
  yield fork(initFcm);
  yield spawn(watchfcmNotificationChannel);
  // Aspetto che il profilo sia disponibile per aggiornare la token
  yield take(PROFILE_GET_INFO_SUCCESS);
  yield call(uploadFcmToken);
}