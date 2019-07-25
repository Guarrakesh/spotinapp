import { combineReducers } from 'redux';
import { get } from 'lodash';
import near from './near';
import {
  LOCATION_SET_POSITION
  , LOCATION_REQUEST
  , LOCATION_SET_ERROR, LOCATION_SET_USER_ADDRESS, LOCATION_USE_DEVICE_LOCATION
} from '../../actions/location';

function geoLocationReducer(state = {
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


function userAddressReducer(state = {position: null}, action) {
  if (action.type === LOCATION_SET_USER_ADDRESS) {
    const { position } = action;
    return {
      position
    }
  }
  return state;
}

// Se l'utente si geolocalizza o aggiorna la posizione, utilizza "device", altriment
// se inserisce un indirizzo, utilizza "address"
function currentLocationReducer(state = 'device', action) {
  if (action.type === LOCATION_SET_USER_ADDRESS) {
    return 'address'
  } else if (action.type === LOCATION_USE_DEVICE_LOCATION) {
    return 'device';
  }
  return state;
}
/**
 * Questi due selettori danno priorità alla geoposizione del device
 * Se invece l'utente
 */
export const positionSelector = (state) => {
  // Seleziona le coordinate in base al currentLccation
  const currentLocation = state.location.currentLocation;
  if (state.location[currentLocation].position) {
    return state.location[currentLocation].position;
  }
  return undefined;
}
export const coordsSelector = state => {
  const subState = state.location.currentLocation;
  return {
    latitude: get(state.location[subState], 'position.coords.latitude'),
    longitude: get(state.location[subState], 'position.coords.longitude')
  };

};
export default combineReducers({
  device: geoLocationReducer,
  near,
  address: userAddressReducer,
  currentLocation: currentLocationReducer, // tipo di indirizzo in uso attualmente
});

exports.geoLocationReducer = geoLocationReducer; //export x test

