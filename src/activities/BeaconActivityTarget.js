import firebase from "react-native-firebase";
import { get } from "lodash";
import * as Activity from  './api';

import {
  SCREEN_VIEW,
    ENTITY_VIEW,
  SET_USER_ID,
  TRACK_LOCATION,
  RESERVATION_COMPLETED,
  RESERVATION_START,
  RESERVATION_UNDO,
  RESERVATION_DELETE,
  FAVORITE_SETTED,
  FAVORITE_SKIPPED
} from "../store/eventsMap";




const target = () => (events) => {
  events.forEach(action => {
    if (!action || !action.type) return;

    switch (action.type) {
      case ENTITY_VIEW: {

        Activity.logView(action.entityType, action.entityId, action.params, {
          user: action.userId,
          location: action.userPosition,
        });
        break;
      }
      case RESERVATION_COMPLETED: {
        Activity.logGetOfferComplete(action.broadcastId, action.userId, {
          location: action.userPosition,
        });
        break;
      }

      case RESERVATION_UNDO: {
        Activity.logGetOfferCancel(action.broadcastId, action.userId, {
          location: action.userPosition,
        });
        break;
      }

      case RESERVATION_DELETE: {
        Activity.logCancelOffer(action.broadcastId, action.userId, {
          location: action.userPosition,
        });
        break;
      }
      case FAVORITE_SETTED: {
        Activity.logFavoriteSet(action.userId, {
          favorite_sports: action.favorite_sports,
          favorite_competitors: action.favorite_competitors
        }, {
          location: action.userPosition,
        });
        break;
      }
      case FAVORITE_SKIPPED: {
        Activity.logFavoriteSkip();
        break;
      }
    }
  });
};

export default target;