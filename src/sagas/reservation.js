import React from 'react';
import { take, put, call, fork, all, takeLatest } from 'redux-saga/effects';
import reservation from '../api/reservation';
import {sendingRequest, requestError} from "../actions";
import { RESERVE_BROADCAST } from '../actions/types'
import {reserveBroadcastRequest, reserveBroadcastSuccess} from "../actions/reservation";
import {FETCH_BROADCASTS} from "../actions/types";

export function* reserve({broadcastId}) {
  yield put(sendingRequest(true));

  try{
    let response = yield call(reservation.reserveOffer, broadcastId);
    if (response) {
      yield put(reserveBroadcastSuccess(response));
    }
  } catch (error) {
    yield put(requestError(error));
  } finally {
    yield put(sendingRequest(false));
  }
}

export default function* root() {
  yield takeLatest(RESERVE_BROADCAST.REQUEST, reserve);

}