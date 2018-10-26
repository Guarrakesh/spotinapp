import React from 'react';
import { take, call, put, spawn, fork, select, takeEvery, cancel} from 'redux-saga/effects';
import { channel } from 'redux-saga';

import { Platform} from 'react-native';
import Permissions from 'react-native-permissions';

import NavigationService from '../../navigators/NavigationService'

const navigationSelector = state => state.navigation;
const locationSelector = state => state.location.device;

import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import {
  LOCATION_REQUEST,
  LOCATION_SET_ERROR,
  LOCATION_SET_POSITION
} from "../../actions/location";

import { FOREGROUND } from '../../actions/appstate';
import { REFRESH_SCREEN } from '../../actions/integrity';



const geolocationSettings = { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 };
export const locationChannel = channel();
let watcher;


/*
 * Channel che si occupa di controllare quando la LOCATION non è più disponibile ( e quindi rimanda alla schermata NoLocationScreen)
 * Quando la location è disponibile e ci si trova in NoLocationScreen, allora rimanda alla Home
 *
 * Per realizzare la funzionalità, c'è bisogno di usare Redux per React Navigation, per tenere d'occhio le route correnti nel reducer
 */
function* watchLocationChannel() {
  while (true) {

    const action = yield take(locationChannel);
    const navigation = yield select(navigationSelector);
    const location = yield select(locationSelector);

    if (action.type === LOCATION_SET_ERROR && !location.position) {

      yield put(NavigationService.navigate('NoLocationScreen', {}, true));

    } else if (action.type === LOCATION_SET_POSITION && navigation.routes && navigation.routes[0].routeName == "NoLocationScreen"){
      yield put(NavigationService.navigate('Main', {}, true));

    }
    yield put(action);
  }
}

function* watchPosition() {
  if (Platform.OS === "android") {
    try {
      const data = yield call(RNAndroidLocationEnabler.promptForEnableLocationIfNeeded, {interval: 10000, fastInterval: 5000});
        let granted = yield call(Permissions.check, 'location',  {
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
      locationChannel.put({type: LOCATION_SET_ERROR });
    }
  }

  locationChannel.put({type: LOCATION_REQUEST});
  navigator.geolocation.watchPosition(
      position => {

        locationChannel.put({type: LOCATION_SET_POSITION, position})
      },
      (error) => locationChannel.put({type: LOCATION_SET_ERROR, error}),
      geolocationSettings

  );
}

function* resetWatcher() {
  cancel(watcher);
  navigator.geolocation.stopObserving();
  watcher = fork(watchPosition);
}
export default function* root() {
  // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'


  //Aspetto che il Check è stato effettuato (o il Login) e che si stia aprendo la Home
  yield take(action => action.actions && action.actions[0].routeName === "Main");

  yield spawn(watchLocationChannel);
  yield watcher = fork(watchPosition);

  yield takeEvery(REFRESH_SCREEN, resetWatcher);




}