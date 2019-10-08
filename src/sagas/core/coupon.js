import React from 'react';
import {call, put, takeEvery} from 'redux-saga/effects';

import {setCoupon, setSpotCoins, setCouponError, USE_COUPON} from "../../actions/coupon";
import coupon from "../../api/coupon"
import auth from "../../api/auth";
import { fetchStart, fetchEnd } from "../../actions/fetchActions";

import {requestError, sendingRequest} from '../../actions';
import {REQUEST_ERROR} from "../../actions/types";


function* handleUseCoupon(action) {

  const { code } = action.payload.data;

  yield put(fetchStart());

  try {

    let token = yield call(auth.getAuthToken);
    let response = yield call(coupon.useCoupon, code, token);

    if ( response && response.value && response.used ){
      //Richiesta andata a buon fine
      yield put(setCoupon(response.code, response.value)); //Aggiungo il coupon all'array in auth.profile.usedCoupon
      yield put(setSpotCoins(response.value)); //Aggiungo gli spotCoins all'utente (auth.profile.spotCoins)

      //TODO: Salvare num spotCoins nell'AsyncStorage per controllo ad apertura app

    } else {
      //Coupon gia' usato o non valido
      console.log("REsponse: ", response);
      yield put(setCouponError(response.code, response.message.code));
      yield put(requestError(response));
    }

  } catch (error) {
    yield put(requestError(error));
    return null;

  } finally {
    yield put(fetchEnd());
  }
}

export default function* root() {
  yield takeEvery(USE_COUPON, handleUseCoupon);
}