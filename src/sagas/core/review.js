import {all, call, put, select, take, takeEvery} from "redux-saga/effects";
import {Platform, AsyncStorage} from "react-native";
import { delay } from 'redux-saga';
import {RESERVE_BROADCAST_SUCCESS} from "../../actions/reservation";
import firebase, { Notification, NotificationOpen } from "react-native-firebase";
import i18n from "../../i18n/i18n";
import themes from "../../styleTheme";
import {FCM_IOS_PERMISSION_INIT, FCM_PERMISSION_RESOLVED} from "../../firebase/actions";
import { getToken } from "../../firebase/helpers";

export function* reviewNotification(action) {

  const { payload } = action;
  const { broadcast } = payload.data;
  const reservation = payload.data;

  const businessId = broadcast.business;
  const eventId = broadcast.event;

  const businessSelector = state => ({...state.entities.businesses.data[businessId]});
  const eventSelector = state => ({...state.entities.events.data[eventId]});

  const business = yield select(businessSelector);
  const event = yield select(eventSelector);

  if(Platform.OS === "ios"){
    yield call(delay, 3000);
    yield put({type: FCM_IOS_PERMISSION_INIT});
    yield take(FCM_PERMISSION_RESOLVED);
  }

  createReviewNotification(reservation, event, business);

}

//Crea la notifica
function createReviewNotification(reservation, event, business) {

  const eventDate = new Date(event.start_at);
  const eventTimestamp = eventDate.getTime();
  const businessName = business.name;
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


export default function* root() {
  yield all([
    takeEvery(RESERVE_BROADCAST_SUCCESS, reviewNotification)
  ]);
}