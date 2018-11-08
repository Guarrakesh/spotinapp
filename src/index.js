import React, {Component} from 'react';
import { compose } from 'recompose';
import { Provider, connect } from 'react-redux';
import { View, BackHandler, Text } from 'react-native';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';

import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { I18nextProvider, NamespacesConsumer, withNamespaces } from 'react-i18next';
import i18n from './i18n/i18n'
import configureStore from './store';

import NavigationService from './navigators/NavigationService';
import { registerResource, unregisterResource } from './actions/entities';

import Notification from './components/Notification/Notification';
import EnvironmentBar from './components/common/EnvironmentBar';

import RootNavigator from './navigators/AppNavigator';

const store = configureStore();
const ReduxifiedNavigator = connect(
    (state, props) => ({state: state.navigation}))(reduxifyNavigator(RootNavigator, "root"));

console.disableYellowBox = true;

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
Text.defaultProps.adjustsFontSizeToFit = true;

class ResourceInitializer extends Component {


  resources = ['sports', 'competitions', 'competitors',
    'events', 'broadcasts', 'businesses', 'reservations'];
  componentWillMount() {
    this.resources.map(res => this.props.register({name: res}));
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    this.resources.map(res => this.props.unregister({name: res}));

    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  /**
   * Gestisce correttamente il tasto back sui dispositivi android
   * @returns {boolean}
   */
  onBackPress = () => {
    const { navigation } = store.getState();
    const { dispatch } = store;
    //Get current route as url and check if it's one of the routes that should close the app
    switch (this.getCurrentRoute(navigation)) {
      case 'Home/Home':
      case 'Auth/SignIn':
      case "AppIntro/AppIntro":
        return false;
    }
    dispatch(NavigationService.back());

    return true;
  };
  getCurrentRoute = (navigation) => {
    const route = (name, state) => {
      if (state.index !== undefined) return route(state.routeName, state.routes[state.index]);
      return `${name}/${state.routeName}`;
    };
    return route('', navigation)
  };

  render() {
    const { t } = this.props;
    return (
        <I18nextProvider i18n={i18n}>
          <View  style={{flex: 1}}>
            <Notification/>
            {(["staging","development"].includes(Config.ENV)) && <EnvironmentBar env={Config.ENV}/>}
            <ReduxifiedNavigator
                screenProps={{t}}
                ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef)
              }} />
          </View>
        </I18nextProvider>
    )
  }
};


const ConnectedResourceInit = compose(
    connect(null, {
      register: registerResource,
      unregister: unregisterResource
    }),
    withNamespaces()
)(ResourceInitializer);


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
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };
export default codePush(App);