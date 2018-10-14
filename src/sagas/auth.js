import { all, put, call, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import NavigationService from '../navigators/NavigationService';
import { showNotification, hideNotification } from'../actions/notificationActions';
import convertErrorMessage, { ERROR_TYPE_UNKNOWN } from '../helpers/convertErrorMessage';

import {
  USER_LOGIN,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_CHECK,
  USER_LOGOUT,
  USER_REGISTER,
  USER_REGISTER_FAILURE,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_LOADING,

  OAUTH_LOGIN,
  OAUTH_LOGIN_LOADING,
  OAUTH_LOGIN_FAILURE,
  OAUTH_LOGIN_SUCCESS,

  AUTH_CHECKING
} from '../actions/authActions';
import { FETCH_ERROR } from '../actions/fetchActions';



import { isChecking } from '../reducers/auth';

import auth from '../api/auth';
/*
 function* initAuth() {
 let token = yield call(auth.getAuthToken);
 const storedUser = yield call(auth.getUserInfo);
 if (token) {}
 //La token è già nello storage, la imposto come scaduta e refresho

 try {
 yield call(auth.check);
 } catch (e) {

 }
 }*/

function* handleErrorNotification(e) {

  let error = {};

  if (e.status == 409) {//Conflict email
    error = {
      type: 'warning',
      title: "Brutte notizie...",
      message: "Questa email esiste già. Ora ti tocca solo ricordare la password..."}
  } else if (e.status == 401) {
    error = {
      type: 'warning',
      title: "Sbagliato!",
      message: "Le credenziali non sono corrette.\nRitenta, sarai più fortunato."
    }
  } else {
    error = convertErrorMessage(e);
  }
  yield put(showNotification(error.message, error.type, {errorType: error.errorType, title: error.title}));
}
function* handleAuth(action) {
  const { type, payload, error, meta } = action;
  switch (type) {
    case USER_LOGIN: {
      try {
        yield put(hideNotification());

        yield put({type: USER_LOGIN_LOADING});
        const { email, password } = payload;
        const authResponse = yield call(auth.login, email, password);
        //Dico a redux di cambiare schermata
        yield put({
          type: USER_LOGIN_SUCCESS,
          payload: authResponse
        });
        NavigationService.navigate(meta.pathName || 'Main', {}, true );
      } catch (e) {
        yield call(handleErrorNotification,e);

        yield put({
          type: USER_LOGIN_FAILURE,
          error: e,
          meta: { auth: true }
        });


      }
      break;
    }
    case USER_REGISTER: {

      try {

        yield put(hideNotification());

        yield put({type: USER_REGISTER_LOADING});
        const { email, password, name } = payload;
        const authResponse = yield call(auth.register, {email, password, name});
        yield put({
          type: USER_REGISTER_SUCCESS,
          payload: authResponse
        });
        NavigationService.navigate(meta.pathName || 'Main' , {}, true);
      } catch (e) {
        yield call(handleErrorNotification,e);

        yield put({type: USER_REGISTER_FAILURE, error: e});


      }
      break;
    }
    case OAUTH_LOGIN: {
      try {
        yield put(hideNotification());

        yield put({ type: OAUTH_LOGIN_LOADING });
        const { service } = payload;
        const authResponse = yield call(auth.oAuthLogin, service);
        yield put({
          type: USER_LOGIN_SUCCESS,
          payload: authResponse
        });
        NavigationService.navigate(meta.pathName || 'Main', {}, true);


      } catch (e) {
        yield call(handleErrorNotification, e);

        yield put({
          type: OAUTH_LOGIN_FAILURE,
          error: e,
          meta: { auth: true }
        });
      }
      break;
    }
    case USER_CHECK: {
      try {
        yield put(hideNotification());

        yield call(delay, 100); //Debouncing, per evitare
        //piu refreshToken nello stesso momento
        const checking = yield select(isChecking);
        //Se già fetchSaga ha avviato un check, allora annullo l'operazione
        if (!checking) {
          yield put({type: AUTH_CHECKING, payload: { checking: true }});
          yield call(auth.check, payload);
          yield put({type: AUTH_CHECKING, payload: { checking: false }});
          if (payload.redirectOnResolve) {
            NavigationService.navigate(payload.redirectOnResolve.pathName, {}, true );
          }

        }


      } catch (error) {

        yield put({type: AUTH_CHECKING, payload: { checking: false }});

        //Check fallito, devo fare LOGOUT e reindirizzo al path specificato dal component (di default mando al login)
        yield call(auth.logout);

        NavigationService.navigate("Auth", {
          nextPath: meta.pathName
        }, true);
       // yield handleErrorNotification(error);


      }
      break;
    }

    case USER_LOGOUT: {
      yield call(auth.logout);

      NavigationService.navigate('SignIn');
      break;
    }
    case FETCH_ERROR: {

      try {
        yield call(auth.error, error);
      } catch (e) {

      //  const nextPathname = yield select(currentPathnameSelector);
        yield call(auth.logout);
        NavigationService.navigate("Auth", {
          nextPath: "Home"
        });

        yield put(hideNotification());
      }
      break;
    }
    default:
      return;

  }
}


export default function* watchAuthActions() {
  yield all([
    // initAuth(),
    takeLatest(action => action.meta && action.meta.auth, handleAuth),
    takeEvery(FETCH_ERROR, handleAuth)
  ])
}
