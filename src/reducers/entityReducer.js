import { combineReducers } from 'redux';
import {
  FETCH_ALL_SPORTS,
  FETCH_FAVORITE_SPORTS,
  REQUEST_ERROR,
  SENDING_REQUEST,
  FETCH_COMPETITIONS,
  FETCH_EVENTS,
  FETCH_BUSINESSES,
  FETCH_BROADCASTS,
  RESERVE_BROADCAST
} from '../actions/types';

import events from './entities/events';
import sports from './entities/sports';
import businesses from './entities/businesses';
import broadcasts from './entities/broadcasts';


export default combineReducers({
  events,
  sports,
  businesses,
  broadcasts
});
