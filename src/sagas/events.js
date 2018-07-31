import React from 'react';
import { take, put, call, fork, race, select, all } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { delay } from 'redux-saga';
import { getToken, getSports } from './selectors';
import  sports  from '../api/sports';
import  events from '../api/events';
import {
    FETCH_FAVORITE_SPORTS,
    FETCH_ALL_SPORTS,
    SET_AUTH,
    FETCH_COMPETITIONS, FETCH_EVENTS

} from '../actions/types';
import {
    getAllSportsSuccess,
    getFavoriteSportsSuccess,
    getSportCompetitionsSuccess
} from '../actions/sports';
import {
    sendingRequest,
    requestError
} from '../actions';
import {getEventsSuccess} from "../actions/events";



// ==================
// WORKERS
// ==================


function* fetchSports() {


    yield put(sendingRequest(true));

    try {

        const response = yield call(sports.fetchAll);
        yield put(getAllSportsSuccess(response));

    } catch (err) {
        yield put(requestError(err));
    } finally {
        yield put(sendingRequest(false));
    }
}
function* fetchCompetitions(sport) {

    yield put(sendingRequest(true));
    try {
        const response = yield call(sports.fetchCompetitions, sport);
        yield put(getSportCompetitionsSuccess(sport._id, response));
    } catch (err) {
        yield put(requestError(err));

    } finally  {
        yield put(sendingRequest(false));
    }
}

function* fetchEvents(competitionId) {

    yield put(sendingRequest(true));

    try {

        let response;

        if (competitionId)
            response = yield call(events.fetchByCompetition, competitionId);
        else
            response = yield call(events.fetchAll);


        yield put(getEventsSuccess(response));

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

        // let token = yield select(getToken);
        yield call(fetchSports);


    }
}

function* watchGetCompetitions() {
    while (true) {
        const req = yield take(FETCH_COMPETITIONS.REQUEST);

        //let token = yield select(getToken);
        yield call(fetchCompetitions, req.sport);
    }
}

function* watchGetEvents() {
    while (true) {
        const req = yield take(FETCH_EVENTS.REQUEST);
        console.log("aaaaa", req);
        const response = yield call(fetchEvents, req.competitionId);
    }
}

export default function* root() {
    /*//Non proseguo finché non ho un token. Posso farlo perché la login saga (./login.js), se non trova una token
    //Rimanda al login. In questo modo blocco il generatore finché non ho una otken
    let token = null;
    while (token == null) {
        //Aspetto l'azione SET_AUTH, che verrà impostata su true se avrò una token. Se viene impostata su false
        //la login saga rimanda direttamente al Login
        let logged = yield take(SET_AUTH);
        token = (logged) ? yield select(getToken) : null;
    }
*/

    yield all([
        fork(watchGetSports),
        fork(watchGetCompetitions),
        fork(watchGetEvents)

    ])
}