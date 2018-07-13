import React from 'react';
import { take, put, call, fork, race, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { delay } from 'redux-saga';
import { getToken, getSports } from './selectors';
import  sports  from '../api/sports';

import {
    FETCH_FAVORITE_SPORTS,
    FETCH_ALL_SPORTS,
    SET_AUTH

} from '../actions/types';
import {
    getAllSportsSuccess,
    getFavoriteSportsSuccess
} from '../actions/sports';
import {
    sendingRequest,
    requestError
} from '../actions';



// ==================
// WORKERS
// ==================

function* fetchSports(accessToken) {


    yield put(sendingRequest(true));

    try {

        const response = yield call(sports.fetchAll, accessToken);
        yield put(getAllSportsSuccess(response));

    } catch (err) {
        yield put(requestError(err));
    } finally {
        yield put(sendingRequest(false));
    }
}


// ==================
// WATCHERS
// ==================


function* watchGetSports() {

    while(true) {
       const request = yield take(FETCH_ALL_SPORTS.REQUEST);
        let token = yield select(getToken);

       //Non proseguo finché non ho un token. Posso farlo perché la login saga (./login.js), se non trova una token
       //Rimanda al login. In questo modo blocco il generatore finché non ho una otken
       while (token == null) {

           //Aspetto l'azione SET_AUTH, che verrà impostata su true se avrò una token. Se viene impostata su false
           //la login saga rimanda direttamente al Login

           let logged = yield take(SET_AUTH);
           token = (logged) ? yield select(getToken) : null;
       }



       const response = yield call(fetchSports, token.accessToken);

    }
}

export default function* root() {
    yield fork(watchGetSports);
}