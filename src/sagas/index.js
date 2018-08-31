import { takeEvery, all, fork, select } from 'redux-saga/effects';
import loginRoot from './login';
import eventsRoot from './events'
import locationRoot from './location';
import broadcastsRoot from "./broadcasts";


export default function* root() {
  yield all([
      fork(loginRoot),
      fork(eventsRoot),
      fork(locationRoot),
      fork(broadcastsRoot)
      ]);
}



