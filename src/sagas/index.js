import { takeEvery, all, fork, select } from 'redux-saga/effects';
import loginRoot from './login';
import accumulate from './accumulate';

import eventsRoot from './events'
import locationRoot from './location';
import broadcastsRoot from "./broadcasts";
import businessesRoot from './businesses'

import fetch from './fetch';
import dataProvider from '../api/dataProvider';

export default function* root() {
  yield all([
    fork(loginRoot),

    fetch(dataProvider)(),
    fork(accumulate),
      fork(locationRoot)

  ]);

}



