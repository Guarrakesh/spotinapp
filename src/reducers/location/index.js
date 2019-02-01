import { combineReducers } from 'redux';

import near from './near';
import {
    LOCATION_SET_POSITION
  , LOCATION_REQUEST
  , LOCATION_SET_ERROR
} from '../../actions/location';

function locationReducer(state = {
  position: null,
  error: null,
  fetching: false
}, action) {
  switch(action.type) {

    case LOCATION_REQUEST: {
      return {
        ...state,
        fetching: true
      }
    }

    case LOCATION_SET_POSITION: {
      const {position} = action;

      return {
        ...state,
        position,
        error: null,
        fetching: false
      }
    }

    case LOCATION_SET_ERROR : {
      const {error} = action;

      return {
        ...state,
        error: error,
        fetching: false
      }
    }

    default: {
      return state;
    }
  }
}



export const locationSelector = (state) => state.location.device;


export default combineReducers({
    device: locationReducer,
    near,
});

exports.locationReducer = locationReducer; //export x test