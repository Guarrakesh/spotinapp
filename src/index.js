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
    console.log("Firebase ID: ", firebase);
    const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {

      const action = notificationOpen.action;
      const notification: Notification = notificationOpen.notification;
      var seen = [];

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
        .android.setSmallIcon('ic_launcher'); //TODO: icona piccola da settare
      firebase.notifications()
        .displayNotification(notification);

    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;

      var seen = [];

      alert(JSON.stringify(notification.data, function(key, val) {
        if (val != null && typeof val == "object") {
          if (seen.indexOf(val) >= 0) {
            return;
          }
          seen.push(val);
        }
        return val;
      }));

      firebase.notifications().removeDeliveredNotification(notification.notificationId);

    });


    //Listener notifiche locali
    // PushNotification.configure({
    //   onNotification: function(notification) {
    //     console.log('NOTIFICATION: ', notification);
    //
    //   }
    // })
    //
    // PushNotification.onNotification();
    //
    // //Listener notifiche remote
    // Push.setListener({
    //   onPushNotificationReceived: function (pushNotification) {
    //     console.log("Notifica: ", pushNotification);
    //
    //     let message = pushNotification.message;
    //     let title = pushNotification.title;
    //
    //     if (message === null) {
    //       // Android messages received in the background don't include a message. On Android, that fact can be used to
    //       // check if the message was received in the background or foreground. For iOS the message is always present.
    //       title = 'Android background';
    //       message = '<empty>';
    //     }
    //
    //     // Custom name/value pairs set in the App Center web portal are in customProperties
    //     if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
    //       message += '\nCustom properties:\n' + JSON.stringify(pushNotification.customProperties);
    //     }
    //
    //     if (AppState.currentState === 'active') {
    //       Alert.alert(title, message);
    //     }
    //     else {
    //       console.log('App inactive');
    //       // Sometimes the push callback is received shortly before the app is fully active in the foreground.
    //       // In this case you'll want to save off the notification info and wait until the app is fully shown
    //       // in the foreground before displaying any UI. You could use AppState.addEventListener to be notified
    //       // when the app is fully in the foreground.
    //     }
    //   }
    // })


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