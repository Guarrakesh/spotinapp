import { takeEvery, all, fork, select } from 'redux-saga/effects';
import loginRoot from './login';
import eventsRoot from './events'



export default function* root() {
  yield all([
      fork(loginRoot),
      fork(eventsRoot)
      ]);
}


