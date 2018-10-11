import { all, put, call, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
  USER_LOGIN,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_CHECK,
  USER_LOGOUT,
  USER_AUTH_LOADING,
  OAUTH_LOGIN,
  OAUTH_LOGIN_LOADING,
  OAUTH_LOGIN_FAILURE,
  OAUTH_LOGIN_SUCCESS,

} from '../actions/authActions';
import { FETCH_ERROR } from '../actions/fetchActions';

import auth from '../api/auth';


function* handleAuth(action) {
  const { type, payload, error, meta } = action;
  console.log(action);
  switch (type) {
    case USER_LOGIN: {
      try {
        yield put({type: USER_LOGIN_LOADING});
        const { email, password } = payload;
        const authResponse = yield call(auth.login, email, passowrd);
        //Dico a redux di cambiare schermata
          yield put({
          type: USER_LOGIN_SUCCESS,
          payload: authResponse
        });
        yield call(NavigationService.navigate, 'SignedIn');
    } catch (e) {
        yield put({
          type: USER_LOGIN_FAILURE,
          error: e,
          meta: { auth: true }
        });

        //TODO: Handle Notification!!
      }
      break;
    }
    case OAUTH_LOGIN: {
      try {
        yield put({ type: OAUTH_LOGIN_LOADING });
        console.log("yabaduuu", payload);
        const { service } = payload;
        const accessTokenResponse = yield call(auth.oAuthLogin, service);
        console.log("yielded", accessTokenResponse);
        //Mando accessToken al server

      } catch (e) {
        console.log("Errore durante oAuth Facebook",e);
        yield put({
          type: OAUTH_LOGIN_FAILURE,
          error: e,
          meta: { auth: true }
        });
        //TODO: showNotificatioN!!
      }
      break;
    }
    case USER_CHECK: {
      try {
        yield call(delay, 100); //Debouncing, per evitare
        //piu refreshToken nello stesso momento
        yield call(auth.check, payload);
      } catch (error) {
      //TODO: yield put(showNotification(error, 'warning'));
        //Check fallito, devo fare LOGOUT
        yield call(auth.logout);
      }
      break;
    }

    case USER_LOGOUT: {
      yield call(authProvider.logout);
      NavigationService.navigate('SignIn');
      break;
    }

    default:
    return;

  }
}


export default function* watchAuthActions() {
  yield all([
    takeLatest(action => action.meta && action.meta.auth, handleAuth),
    takeEvery(FETCH_ERROR, handleAuth)
  ])
}
