import {combineReducers} from 'redux';

import RootNavigator from '../navigators/AppNavigator';

import {
  createNavigationReducer } from 'react-navigation-redux-helpers';


import authReducer from './auth';
import references from './references';
import entities from './entities';
import location from './location';
import loading from './loading';
import ui from './ui';
import notifications from './notifications'


const navigation = createNavigationReducer(RootNavigator);



const rootReducer = combineReducers({
  location,
  auth: authReducer,
  entities,
  loading,
  references,
  notifications,
  ui,
  navigation
});

export default rootReducer;
