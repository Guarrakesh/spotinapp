import firebase from 'react-native-firebase';
import { Platform } from "react-native";

import {
    FCM_INIT,
    FCM_NOTIFICATION_DISPLAYED,
    FCM_INITIAL_NOTIFICATION,
    FCM_NOTIFICATION_OPENED,
    FCM_TOKEN_REFRESHED
  } from "./actions";

export default () => (createStore) => (...args) => {
    
    const store = createStore(...args);

    /** Se Android, registro il canale
      ** @see https://github.com/invertase/react-native-firebase-docs/blob/master/docs/notifications/android-channels.md
      **/
     if (Platform.OS === "android") {
        const channel = new firebase.notifications.Android.Channel(ANDROID_CHANNEL_ID, ANDROID_CHANNEL_NAME, firebase.notifications.Android.Importance.Max);
        firebase.notifications().android.createChannel(channel);
      }

      /** On Foreground Notifications
      ** Notes: "No visible notification is shown to the user, it is up to you to display notifications manually"
       */
      firebase.notifications().onNotification((notification) => {
        notification
            .android.setChannelId(ANDROID_CHANNEL_ID)
            .android.setSmallIcon('ic_launcher') //TODO: icona piccola da settare
            .android.setColor(themes.base.colors.accent.default) // you can set a color here
            .android.setPriority(firebase.notifications.Android.Priority.High);
        firebase.notifications()
            .displayNotification(notification);

      })();

      // On Opened (From Backround) Notifications
      firebase.notifications().onNotificationOpened((notificationOpen) => {
        /*
         * "On Android, unfortunately there is no way to access the title and body of an opened remote notification.
         * You can use the data part of the remote notification to supply this information if it's required"
         */
        store.dispatch({type: FCM_NOTIFICATION_OPENED, payload: notificationOpen, meta: { firebase: true}})
      })();

      // IOS ONLY - triggered if content_available set to true
      firebase.notifications().onNotificationDisplayed((notification) => {
        // "Process your notification as required"
        store.dispatch({type: FCM_NOTIFICATION_DISPLAYED, payload: notification, meta: { firebase: true}});
        // "ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification"
      })();

}