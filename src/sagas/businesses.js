import React from 'react';
import { take, put, call, fork, all, takeEvery } from 'redux-saga/effects';
import businesses from '../api/businesses';

import {FETCH_BUSINESSES} from "../actions/types";

import {getBusinessSuccess} from "../actions/businesses";


import {
  sendingRequest,
  requestError
} from '../actions';

function* fetchBusinesses(action){

  yield put(sendingRequest(true));

  try {
    const response = yield call(businesses.fetchByPosition, action.position);

    yield put(getBusinessSuccess(response));

  } catch(error){

    yield put(requestError(error));

  } finally {

    yield put(sendingRequest(false));
  }
}

//TODO reserveBroadcast

export default function* root() {
  yield all([
    takeEvery(FETCH_BUSINESSES.REQUEST, fetchBusinesses),
  ]);
}