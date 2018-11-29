import firebase from "react-native-firebase";
import { get } from "lodash";

import { SCREEN_VIEW, SET_USER_ID, TRACK_LOCATION } from "../store/eventsMap";

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
        const titleParam = action.params ? action.params.title : null;
        const routeName = titleParam ? `${action.route}/${titleParam}` : action.route;
        Analytics.setCurrentScreen(routeName);
        break;
      }
      case TRACK_LOCATION: {
        Analytics.logEvent("user_location_changed", action.position);
      }
    }


  });
};

export default target;