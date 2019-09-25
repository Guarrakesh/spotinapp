import React from 'react';
import {call, put, takeEvery} from 'redux-saga/effects';

import {setCoupon, setSpotCoins, USE_COUPON} from "../../actions/coupon";
import coupon from "../../api/coupon"
import auth from "../../api/auth";

import {requestError, sendingRequest} from '../../actions';


function* handleUseCoupon(action) {

  const { code } = action.payload.data;

  yield put(sendingRequest(true));

  try {

    let token = yield call(auth.getAuthToken);
    let response = yield call(coupon.useCoupon, code, token);

    if ( response && response.value && response.used ){
      //Richiesta andata a buon fine
      yield put(setCoupon(response.code)); //Aggiungo il coupon all'array in auth.profile.usedCoupon
      yield put(setSpotCoins(response.value)); //Aggiungo gli spotCoins all'utente (auth.profile.spotCoins)

      //TODO: Salvare num spotCoins nell'AsyncStorage per controllo ad apertura app

    } else {
      //Coupon gia' usato o non valido
      yield put(requestError(response));
    }

  } catch (error) {
    yield put(requestError(error));
    return null;

  } finally {
    yield put(sendingRequest(false));
  }
}

export default function* root() {
  yield takeEvery(USE_COUPON, handleUseCoupon);
}