import React, {Component} from 'react';
import { compose } from 'recompose';
import { Provider, connect } from 'react-redux';
import { AppState, Alert, View, BackHandler, Text } from 'react-native';
import auth from '../src/api/auth';

/* Firebase */
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';
/* CodePush */
import codePush from 'react-native-code-push';
/* RN Config */
import Config from 'react-native-config';
import Push from 'appcenter-push';
/* Redux Persist */

//import { PersistGate } from "redux-persist/lib/integration/react";


/* React Navigation with Redux */
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

/* Internationalization */
import { I18nextProvider, NamespacesConsumer, withNamespaces } from 'react-i18next';
import i18n from './i18n/i18n'

/* Store, navigation and actions */
import createStore from './store';
import NavigationService from './navigators/NavigationService';
import { registerResource, unregisterResource } from './actions/entities';

/* Root components */
import Notification from './components/Notification/Notification';
import EnvironmentBar from './components/common/EnvironmentBar';
/* Navigators */
import RootNavigator from './navigators/AppNavigator';

/* Push Notification */
import PushNotification from "react-native-push-notification";
import themes from "./styleTheme";


/* Redux Store */
const { store, persistor } = createStore();


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

  async componentDidMount() {

    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    console.log("TOKEN: ", auth.getAuthToken());

    /* Firebase Push Notification */
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          firebase.messaging().getToken().then(token => {
            console.log("LOG: ", token);
          })
          // user has permissions
        } else {
          firebase.messaging().requestPermission()
            .then(() => {
              alert("User Now Has Permission")
            })
            .catch(error => {
              alert("Error", error)
              // User has rejected permissions
            });
        }
      });

    console.log("Firebase ID: ", firebase);
    const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {

      const action = notificationOpen.action;
      const notification: Notification = notificationOpen.notification;
      let seen = [];

      alert(JSON.stringify(notification.data, function(key, val) {
        if (val != null && typeof val === "object") {
          if (seen.indexOf(val) >= 0) {
            return;
          }
          seen.push(val);
        }
        return val;
      }));
    }

    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('My apps test channel');

    // Create the channel
    firebase.notifications().android.createChannel(channel);

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });

    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
      // Process your notification as required
      console.log("NOTIFICATION:", notification);
      notification
        .android.setChannelId('test-channel')
        .android.setSmallIcon('ic_launcher') //TODO: icona piccola da settare
        .android.setColor(themes.base.colors.accent.default) // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);


      firebase.notifications()
        .displayNotification(notification);

    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;

      let seen = [];

      // TODO: Azione ad apertura notifica remota

      // alert(JSON.stringify(notification.data, function(key, val) {
      //   if (val != null && typeof val === "object") {
      //     if (seen.indexOf(val) >= 0) {
      //       return;
      //     }
      //     seen.push(val);
      //   }
      //   return val;
      // }));

      firebase.notifications().removeDeliveredNotification(notification.notificationId);

    });

  }

  componentWillUnmount() {
    this.resources.map(res => this.props.unregister({name: res}));

    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);

    /* Firebase Push Notification */
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
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