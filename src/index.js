import React, {Component} from 'react';
/* Internationalization */
import {I18nextProvider, withNamespaces} from 'react-i18next';
import {BackHandler, Text, View} from 'react-native';
/* CodePush */
import codePush from 'react-native-code-push';
/* RN Config */
import Config from 'react-native-config';
/* React Navigation with Redux */
import {createReduxContainer} from 'react-navigation-redux-helpers';
import {connect, Provider} from 'react-redux';
import {compose} from 'recompose';
import {registerResource, unregisterResource} from './actions/entities';
import EnvironmentBar from './components/common/EnvironmentBar';
/* Root components */
import Notification from './components/Notification/Notification';
/* Firebase */
import {FirebaseProvider} from './firebase';
import i18n from './i18n/i18n'
/* Navigators */
import RootNavigator from './navigators/AppNavigator';
import NavigationService from './navigators/NavigationService';
/* Store, navigation and actions */
import createStore from './store';
/* Redux Persist */

//import { PersistGate } from "redux-persist/lib/integration/react";


/* Redux Store */
const { store } = createStore();


const ReduxifiedNavigator = connect(
    (state, props) => ({state: state.navigation}))(createReduxContainer(RootNavigator, "root"));

console.disableYellowBox = true;

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
Text.defaultProps.adjustsFontSizeToFit = true;

class ResourceInitializer extends Component {


  resources = ['sports', 'competitions', 'competitors',
    'events', 'broadcasts', 'businesses', 'reservations', 'prizes'];
  componentWillMount() {
    this.resources.map(res => this.props.register({name: res}));
  }

  async componentDidMount() {

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
      case 'Main/Home':
      case 'Auth/Auth':
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
          <FirebaseProvider store={store}>
            <View  style={{flex: 1}}>
              <Notification/>
              {(["staging","development"].includes(Config.ENV)) && <EnvironmentBar env={Config.ENV}/>}

              <ReduxifiedNavigator
                  screenProps={{t}}
                  ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef)
            }} />
            </View>
          </FirebaseProvider>
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
