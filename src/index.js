import React, {Component} from 'react';

import { Provider, connect } from 'react-redux';
import configureStore from './store';

import NavigationService from './navigators/NavigationService';
import { registerResource, unregisterResource } from './actions/entities';


import RootNavigator from './navigators/AppNavigator';

console.disableYellowBox = true;
const store = configureStore();

class ResourceInitializer extends Component {

  resources = ['sports', 'competitions',
    'events', 'broadcasts', 'businesses', 'reservations'];
  componentWillMount() {
    this.resources.map(res => this.props.register({name: res}));
  }
  componentWillUnmount() {
    this.resources.map(res => this.props.unregister({name: res}));
  }

  render() {
    return <RootNavigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef)
        }} />
  }
};

const ConnectedResourceInit = connect(null, {
  register: registerResource,
  unregister: unregisterResource
})(ResourceInitializer);



export default class App extends React.Component {
  render() {

    return (
      <Provider store={store}>
        <ConnectedResourceInit/>
      </Provider>
    );
  }
}
