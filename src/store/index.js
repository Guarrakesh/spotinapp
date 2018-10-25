import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'; //eslint-disable-line

import {offline} from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import rootReducer from '../reducers';
import rootSaga from '../sagas/core';



const sagaMiddleware = createSagaMiddleware();
//Array dei middleware da usare



/*
if (__DEV__)
  middleware = [...middleware, logger];
else
  middleware = [...middleware];*/




export default function configureStore(initialState) {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware, logger),
      //offline(offlineConfig)
    )
  );
  sagaMiddleware.run(rootSaga);

  return store;


}
