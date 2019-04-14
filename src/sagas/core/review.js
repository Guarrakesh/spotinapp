import { all, call, put, takeEvery, select } from "redux-saga/effects";
import {RESERVE_BROADCAST_SUCCESS} from "../../actions/reservation";
import firebase, {Notification, NotificationOpen} from "react-native-firebase";
import i18n from "../../i18n/i18n";
import themes from "../../styleTheme";
import { Platform } from "react-native";

export function* reviewNotification(action) {

  const { payload } = action;
  const { broadcast } = payload.data;
  const reservation = payload.data;

  const businessId = broadcast.business;
  const eventId = broadcast.event;

  const businessSelector = state => state.entities.businesses.data[businessId];
  const eventSelector = state => state.entities.events.data[eventId];

  const business = yield select(businessSelector);
  const event = yield select(eventSelector);

  if(Platform.OS === "ios"){
    setTimeout(() => iosPermissionCheck(reservation, event, business), 3000)
  }
  else{
    createReviewNotification(reservation, event, business);
  }

}

//Crea la notifica

function createReviewNotification(reservation, event, business) {

  const eventDate = new Date(event.start_at);
  const eventTimestamp = eventDate.getTime();
  const businessName = business["name"];
  const reservationId = reservation._id;
  const reviewNotification = new Date(eventTimestamp + (12 * 3600000));

  //Setto il canale
  const channel = new firebase.notifications.Android.Channel(
    `review_notification_${reservationId}`,
    'Review Notification',
    firebase.notifications.Android.Importance.Max
  ).setDescription('Scheduled notification 12 hours after the event');

  //Creo il canale
  firebase.notifications().android.createChannel(channel);

  // Creo Notification Listener
  firebase.notifications().onNotification((notification: Notification) => {
    // Process your notification as required
    notification
      .android.setChannelId(`review_notification_${reservationId}`)
      .android.setSmallIcon('notification_icon');
    firebase.notifications()
      .displayNotification(notification);

  });

  //Creo la notifica
  const localNotification = new firebase.notifications.Notification({
    sound: 'default',
    //show_in_foreground: true,
    show_in_background: true,
  })
    .setNotificationId(`rev_notification_${reservationId}`)
    .setTitle(`${i18n.t("pushNotification.review.title")} ${businessName}?`)
    .setBody(`${i18n.t("pushNotification.review.message")}`)
    .setData({
      type: 'review',
      reservation: reservation,
      business: business,
      event: event
    })
    .android.setChannelId(`review_notification_${reservationId}`) // e.g. the id you chose above
    .android.setSmallIcon('notification_icon') // create this icon in Android Studio
    .android.setColor(themes.base.colors.accent.default) // you can set a color here
    .android.setPriority(firebase.notifications.Android.Priority.High);


  firebase.notifications()
    .scheduleNotification(localNotification, {
      fireDate: reviewNotification.getTime(),
    })
    .catch(err => console.error(err));
}

//Su iOS controllo prima la concessione dei permessi per le notifiche

function iosPermissionCheck(reservation, event, business) {

  firebase.messaging().hasPermission()
    .then(enabled => {
      if (enabled) {
        // user has permissions
        createReviewNotification(reservation, event, business);
      } else {
        // user doesn't have permission
        firebase.messaging().requestPermission()
          .then(() => {
            // User has authorised
            createReviewNotification(reservation, event, business);
          })
          .catch(error => {
            // User has rejected permissions
            console.log(error);
          });
      }
    });
}

export default function* root() {
  yield all([
    takeEvery(RESERVE_BROADCAST_SUCCESS, reviewNotification)
  ]);
}