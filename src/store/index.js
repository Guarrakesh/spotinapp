import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'; //eslint-disable-line
import Config from "react-native-config";
import { AsyncStorage } from 'react-native';
//import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

/*
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconcilier: autoMergeLevel2,
  blacklist: ['navigation']
};

*/

import {

  createReactNavigationReduxMiddleware,

} from 'react-navigation-redux-helpers';

/* Redux Beacon */
import { createMiddleware } from "redux-beacon";
import eventsMap from "./eventsMap";

import BeaconFirebaseTarget from "../firebase/BeaconFirebaseTarget";
import BeaconActivityTarget from "../activities/BeaconActivityTarget";
import rootReducer from '../reducers';
import rootSaga from '../sagas/core';

import appstateMiddleware from '../middlewares/appstate';



const sagaMiddleware = createSagaMiddleware();

//Array dei middleware da usare


//const persistedReducer = persistReducer(persistConfig, rootReducer);


export default function configureStore(initialState) {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const navMiddleware = createReactNavigationReduxMiddleware("root", state => state.navigation);

  const firebaseBeaconMiddleware = createMiddleware(eventsMap, BeaconFirebaseTarget());
  const activityBeaconMiddleware = createMiddleware(eventsMap, BeaconActivityTarget());

  let middleware = [sagaMiddleware, navMiddleware, firebaseBeaconMiddleware, activityBeaconMiddleware];

  if (Config.ENV === "development" || Config.LOGGER)
    middleware = [...middleware, logger];
  else
    middleware = [...middleware];





  const store = createStore(
     // persistedReducer,
      rootReducer,
      initialState,
      composeEnhancers(
          appstateMiddleware(),
          applyMiddleware(...middleware)
          //offline(offlineConfig)
      )
  );
  //Redux saga
  sagaMiddleware.run(rootSaga);
  //Redux persist
  //let persistor = persistStore(store);
  return { store };


}
