import React, {Component} from 'react';

import { Provider } from 'react-redux';
import configureStore from './store';

import NavigationService from './navigators/NavigationService';



import RootNavigator from './navigators/AppNavigator';

console.disableYellowBox = true;
const store = configureStore();

export default class App extends React.Component {



  render() {

    return (
      <Provider store={store}>
        <RootNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }} />
      </Provider>
    );
  }
}
