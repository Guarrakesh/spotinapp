import firebase from "react-native-firebase";
import { get } from "lodash";
import {AppEventsLogger} from 'react-native-fbsdk';

import {
  SCREEN_VIEW,
  SET_USER_ID,
  TRACK_LOCATION,
  RESERVATION_COMPLETED,
  RESERVATION_START,
  RESERVATION_UNDO,
  RESERVATION_DELETE,
  FAVORITE_SETTED
} from "../store/eventsMap";

const Analytics = firebase.analytics();


const target = () => (events) => {
  Analytics.setAnalyticsCollectionEnabled(true);
  events.forEach(action => {
    if (!action || !action.type) return;
    switch (action.type) {
      case SET_USER_ID: {
        Analytics.setUserId(action.userId);
        break;
      }
      case SCREEN_VIEW: {
        const titleParam = action.params ? action.params.title || action.params.id : null;
        const routeName = titleParam ? `${action.route}/${titleParam}` : action.route;
        Analytics.setCurrentScreen(routeName);
        break;
      }
      case TRACK_LOCATION: {
        Analytics.logEvent("user_location_changed", action.position);
        break;
      }
      case RESERVATION_COMPLETED: {
        Analytics.logEvent("reservation_completed", { broadcastId: action.broadcastId });
        AppEventsLogger.logPurchase(0.0, "EUR"); //Evento di Acquisto FB su Prenotazione effettuata
        break;
      }
      case RESERVATION_START: {
        Analytics.logEvent("reservation_started", { broadcastId: action.broadcastId, userId: action.userId });
        AppEventsLogger.logEvent("fb_mobile_initiated_checkout"); //Evento di Inizio Checkout FB su Inizio Prenotazione
        break;
      }
      case RESERVATION_UNDO: {
        Analytics.logEvent("reservation_undo");
        break;
      }
      case RESERVATION_DELETE: {
        Analytics.logEvent("reservation_delete");
        break;
      }
      case FAVORITE_SETTED: {
        AppEventsLogger.logEvent("favorite_setted");
        Analytics.logEvent("favorite_setted", { favoriteSports: action.favorite_sports, favoriteCompetitors: action.favorite_competitors });
        //console.log("PREFERITI SETTATI", action.userId, action.favorite_sports, action.favorite_competitors);
        break;
      }
    }
  });
};

export default target;