import React from 'react';
import { take, put, call, fork, all, takeEvery } from 'redux-saga/effects';
import broadcasts from '../api/broadcasts';

import {
    FETCH_BROADCASTS,
    RESERVE_BROADCAST
} from "../actions/types";

import {
    getBroadcastsSuccess,
    reserveBroadcastSuccess
} from "../actions/broadcasts";

import {
    sendingRequest,
    requestError
} from '../actions';

function* fetchBroadcasts(action){

    yield put(sendingRequest(true));

    try {
        const response = yield call(broadcasts.fetchByPosition, action.position, action.eventId);

        yield put(getBroadcastsSuccess(action.eventId, response));

    } catch(error){

        yield put(requestError(error));

    } finally {

        yield put(sendingRequest(false));
    }
}

//TODO reserveBroadcast

export default function* root() {
    yield all([
        takeEvery(FETCH_BROADCASTS.REQUEST, fetchBroadcasts),
    ]);
}