import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'; //eslint-disable-line

import {offline} from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import {middleware as navMiddleware} from '../navigators/AppNavigator';

const sagaMiddleware = createSagaMiddleware();
//Array dei middleware da usare

let middleware = [sagaMiddleware]

/*
if (__DEV__)
  middleware = [...middleware, logger];
else
  middleware = [...middleware];*/



export default function configureStore(initialState, middleware) {


  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware, logger, navMiddleware),
      offline(offlineConfig)
    )
  );
  sagaMiddleware.run(rootSaga);

  return store;


}
