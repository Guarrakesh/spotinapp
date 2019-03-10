import {
  all,
  call,
  cancelled,
  put,
  take,
  takeEvery,
  select,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { AsyncStorage } from 'react-native';
import {
  FETCH_CANCEL,
  FETCH_END,
  FETCH_ERROR,
  FETCH_START
} from '../../actions/fetchActions';

import { AUTH_CHECKING } from '../../actions/authActions';
import { isChecking, isAuthenticated } from '../../reducers/auth';
import { hideNotification } from '../../actions/notificationActions';

import auth from '../../api/auth'


export function* handleFetch(dataProvider, action) {
  const {
    type,
    payload,
    meta: { fetch: fetchMeta, onSuccess, onFailure, ...meta }
  } = action;
  const restType = fetchMeta;

  try {
    /* const isOptimistic = yield select(state => state.ui.optimistic);
     if (isOptimistic) {
     // in optimistic mode, all fetch actions are canceled,
     // so the admin uses the store without synchronization
     return;
     }*/


    //Evito che siano chiamati più auth.check allo stesso tempo (Questo implica che non vengano mandati due o più refresh-token
    //consecutivamente, il che comporterebbe ad un 401 per i successivi refreshtoken e quindi al logout

    //Throttling di 100ms per ogni fetch
    yield call(delay, 100);
    const checking = yield select(isChecking);
    //Se no è in corso alcun Check, allora lo effettuo
    try {
      if (!checking) {
        yield put({type: AUTH_CHECKING, payload: {checking: true, type}});
        yield call(auth.check);
        yield put({type: AUTH_CHECKING, payload: {checking: false, type}});

      } else {
        //Se è in corso un check, aspetto che finisca mettendomi in ascolto dell'action AUTH_CHECKING -> false
        yield take(action => action.type === AUTH_CHECKING && action.payload.checking === false);
      }
    } catch (e) {
      if (e.status === 401 && meta.authorized) {
          // La richiesta deve essere autorizzata ma non ho token, esco fuori
        throw Error(e);
      }
      yield put({type: AUTH_CHECKING, payload: { checking: false, type}});
    }




    //A questo punto sono libero di fare il fetch, essendo sicuro (o quasi) che la token è fresh
    yield all([
      put({ type: `${type}_LOADING`, payload, meta}),
      put({ type: FETCH_START })
    ]);
    let response = yield call(
        dataProvider,
        restType,
        meta.resource,
        payload,
        meta.basePath,
    );


    yield put({
      type: `${type}_SUCCESS`,
      payload: response,
      requestPayload: payload,
      meta: {
        ...meta,
        ...onSuccess,
        fetchResponse: restType,
        fetchStatus: FETCH_END
      }
    });
    yield put({ type: FETCH_END });
  } catch (error) {

    yield put({type: AUTH_CHECKING, payload: { checking: false, type }});



    yield put({
      type: `${type}_FAILURE`,
      error: error.message ? error.message : error,
      payload: error.body ? error.body : null,
      requestPayload: payload,
      meta: {
        ...meta,
        ...onFailure,
        fetchResponse: restType,
        fetchStatus: FETCH_ERROR
      }
    });
    yield put({ type: FETCH_ERROR, error, meta: onFailure || {}});
  } finally {
    if (yield cancelled()) {
      yield put({ type: FETCH_CANCEL });
      return; /* eslint no-unsafe-finally:0 */
    }
  }
}

export const takeFetchAction = action => action.meta && action.meta.fetch;
const fetch = dataProvider => {
  return function* watchFetch() {
    //Faccio un po' di debounce sulle chiamate
    yield takeEvery(takeFetchAction, handleFetch, dataProvider)

  }
};

export default fetch;