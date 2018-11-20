/* Firebase */
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';

export { default as FirebaseProvider } from "./FirebaseProvider";
//
//
// const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
// if (notificationOpen) {
//
//   const action = notificationOpen.action;
//   const notification: Notification = notificationOpen.notification;
//   let seen = [];
//
//   alert(JSON.stringify(notification.data, function(key, val) {
//     if (val != null && typeof val === "object") {
//       if (seen.indexOf(val) >= 0) {
//         return;
//       }
//       seen.push(val);
//     }
//     return val;
//   }));
// }



/*this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
  // Get the action triggered by the notification being opened
  const action = notificationOpen.action;
  // Get information about the notification that was opened
  const notification: Notification = notificationOpen.notification;

  let seen = [];

  // TODO: Azione ad apertura notifica remota

  // alert(JSON.stringify(notification.data, function(key, val) {
  //   if (val != null && typeof val === "object") {
  //     if (seen.indexOf(val) >= 0) {
  //       return;
  //     }
  //     seen.push(val);
  //   }
  //   return val;
  // }));

  firebase.notifications().removeDeliveredNotification(notification.notificationId);

});*/
