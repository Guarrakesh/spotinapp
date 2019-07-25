import React from 'react';
import {call, takeEvery, fork, put, select, spawn, take, race} from 'redux-saga/effects';
import {channel} from 'redux-saga';
import Geolocation from 'react-native-geolocation-service';
import {Platform} from 'react-native';
import Permissions from 'react-native-permissions';

import NavigationService from '../../navigators/NavigationService'

import {LOCATION_REQUEST, LOCATION_SET_ERROR, LOCATION_SET_POSITION} from "../../actions/location";

import {FOREGROUND} from '../../actions/appstate';
import {REFRESH_SCREEN} from '../../actions/integrity';
import {FETCH_END, FETCH_START} from "../../actions/fetchActions";

const navigationSelector = state => ({...state.navigation});
const locationSelector = state => ({...state.location.device});


const geolocationSettings = {
  enableHighAccuracy: true,
  timeout: 30000,
  maximumAge: 10000
};

export const locationChannel = channel();
let watcher;

/*
 * Channel che si occupa di controllare quando la LOCATION non è più disponibile ( e quindi rimanda alla schermata LocationScreen)
 * Quando la location è disponibile e ci si trova in LocationScreen, allora rimanda alla Home
 *
 * Per realizzare la funzionalità, c'è bisogno di usare Redux per React Navigation, per tenere d'occhio le route correnti nel reducer
 */
function* watchLocationChannel() {
  while (true) {

    const action = yield take(locationChannel);
    const navigation = yield select(navigationSelector);
    const location = yield select(locationSelector);

    if (action.type === LOCATION_SET_POSITION) {
      const lastTimestamp = location.position ? location.position.timestamp : null;
      if (!lastTimestamp || action.position.timestamo - lastTimestamp < 300000) {// posizione la aggiorno ogni max 5 minuti
        yield put(action);
      }
    } else {

      //yield put(NavigationService.navigate('Main', {}, true));

      //
      // if (action.type === LOCATION_SET_ERROR && !location.position) {
      //   yield put(action);
      //   yield put(NavigationService.navigate('LocationScreen', {}, true));
      //
      // } else if (action.type === LOCATION_SET_POSITION && navigation.routes && navigation.routes[0].routeName === "LocationScreen"){
      //   yield put(action);
      //   // yield put(NavigationService.navigate('Main', {}, true));
      //
      // }
      yield put(action);
    }
  }
}

function* watchPosition() {

  if (Platform.OS === "android") {

    try {

      let granted = yield call(Permissions.request, 'location',  {
        title: "Accesso a posizione",
        message: "Spot In richiede l'accesso alla tua posizione per individuare i locali più vicini a te."
      });
      if (granted !== "authorized") {
        locationChannel.put({type: LOCATION_SET_ERROR });
        while (granted !== "authorized") {

          yield take(FOREGROUND); // Aspetto che l'app ritorni dal background (cioè presumo che l'utente sia andato in impostazioni ad attivare i permessi)
          granted = yield call(Permissions.check, 'location');
        }
      }
    } catch (err) {
      //console.log(err);
      locationChannel.put({type: LOCATION_SET_ERROR, error: err });
      return;
    }
  }


  Geolocation.stopObserving();
  //watcher = locationChannel.put({type: LOCATION_REQUEST});
  Geolocation.watchPosition(
      (position) => {
        // Check last timestamp


        locationChannel.put({type: LOCATION_SET_POSITION, position});
      },
      (error) => {
        locationChannel.put({type: LOCATION_SET_ERROR, error})
      },
      geolocationSettings
  );

}


export default function* root() {
  yield spawn(watchLocationChannel);
  yield takeEvery(LOCATION_REQUEST, watchPosition);



}