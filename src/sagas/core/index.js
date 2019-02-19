import { all, fork } from 'redux-saga/effects';

import authRoot from './auth';
import accumulate from './accumulate';


import locationRoot from './location';
import notifications from './notifications';
import callback from './callback';

import fetch from './fetch';
import sideActions from "./sideActions";
import firebaseSaga from '../../firebase/saga';
import setFavorites from "./favorite";
import dataProvider from '../../api/dataProvider';

export default function* root() {
  yield all([
    fork(authRoot),
    fetch(dataProvider)(),
    fork(accumulate),
    fork(locationRoot),
    fork(notifications),
    fork(callback),
    fork(sideActions),
    fork(setFavorites),
      //Firebase
    fork(firebaseSaga),
  ]);

}
