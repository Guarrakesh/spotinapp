import { analytics } from "react-native-firebase";
import { get } from "lodash";
import {
  PROFILE_GET_INFO_SUCCESS,
} from "../actions/profile";



const target = (actions) => {
  actions.forEach(action => {
    if (!action || !action.type) return;
    const { payload } = action;
    switch (action.type) {
      case PROFILE_GET_INFO_SUCCESS: {
        const userId = get(payload, "data._id");
        userId && analytics.setUserId(userId);
      }
    }


  });
};

export default target;