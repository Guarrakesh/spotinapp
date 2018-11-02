import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'; //eslint-disable-line
import Config from "react-native-config";
import {offline} from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';


import {

  createReactNavigationReduxMiddleware,

} from 'react-navigation-redux-helpers';

import rootReducer from '../reducers';
import rootSaga from '../sagas/core';
import appstateMiddleware from '../middlewares/appstate';



const sagaMiddleware = createSagaMiddleware();
//Array dei middleware da usare



export default function configureStore(initialState) {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const navMiddleware = createReactNavigationReduxMiddleware("root", state => state.navigation);


  let middleware = [sagaMiddleware, navMiddleware];

  if (Config.ENV === "development")
    middleware = [...middleware, logger];
  else
    middleware = [...middleware];





  const store = createStore(
      rootReducer,
      initialState,
      composeEnhancers(
          appstateMiddleware(),
          applyMiddleware(...middleware)
          //offline(offlineConfig)
      )
  );
  sagaMiddleware.run(rootSaga);

  return store;


}
