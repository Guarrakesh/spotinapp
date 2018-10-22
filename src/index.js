import React, {Component} from 'react';

import { Provider, connect } from 'react-redux';
import { View } from 'react-native';
import codePush from 'react-native-code-push';

import configureStore from './store';

import NavigationService from './navigators/NavigationService';
import { registerResource, unregisterResource } from './actions/entities';

import Notification from './components/Notification/Notification';



import RootNavigator from './navigators/AppNavigator';

console.disableYellowBox = true;
const store = configureStore();

class ResourceInitializer extends Component {


  resources = ['sports', 'competitions', 'competitors',
    'events', 'broadcasts', 'businesses', 'reservations'];
  componentWillMount() {
    this.resources.map(res => this.props.register({name: res}));


  }
  componentWillUnmount() {
    this.resources.map(res => this.props.unregister({name: res}));
  }


  render() {
    return (
        <View  style={{flex: 1}}>
          <Notification/>

          <RootNavigator
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef)
              }} />
        </View>
    )
  }
};

const ConnectedResourceInit = connect(null, {
  register: registerResource,
  unregister: unregisterResource
})(ResourceInitializer);


class App extends React.Component {
  render() {

    return (
        <Provider store={store}>
          <ConnectedResourceInit/>
        </Provider>
    );
  }
}

//Controllo aggiornamenti ad ogni resume dell'app
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
export default codePush(App);