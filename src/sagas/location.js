import React from 'react';
import { takeEvery, all, call, put } from 'redux-saga/effects';
import {fork} from "../../node_modules/redux-saga/effects";

import { getLocationSuccess } from "../actions/location";
import { requestError, sendingRequest } from "../actions";
import {
  GET_CURRENT_LOCATION

} from '../actions/types';


function getPosition() {

  return new Promise(function(resolve, reject) {

    navigator.geolocation.getCurrentPosition(function(response) {
      resolve(response);
    }, function(error) {
      reject(error);
    });
  });

}


function* getCurrentLocation(){
  yield put(sendingRequest(true));
  try {
    const response = yield call(getPosition);

    yield put(getLocationSuccess(response.coords));
  } catch(error) {
    yield put(requestError(error));
  } finally {
    yield put(sendingRequest(false));
  }
}

export default function* root() {


  yield all([
    takeEvery(GET_CURRENT_LOCATION.REQUEST, getCurrentLocation),

  ]);
}