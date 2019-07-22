import React from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator, AsyncStorage, Image, View} from 'react-native';
import type {Notification, NotificationOpen} from 'react-native-firebase';
import firebase from "react-native-firebase";
import Permissions from 'react-native-permissions';
import NavigationService from "../navigators/NavigationService";
import { userCheck } from '../actions/authActions';
import { skipFavorites } from "../actions/profile";
import { locationPermission } from "../actions/location";
import {ALREADY_STARTED_UP} from "../helpers/asyncStorageKeys";
import {ALREADY_SET_FAVORITE} from "../sagas/core/favorite";
import themes from "../styleTheme";

const Logo = require('../assets/img/logo/logo.png');
const Together = require('../assets/img/together/together.png');
const Mascotte = require("../assets/img/mascotte.png");

class Launcher extends React.Component {


  componentDidMount() {

    // AsyncStorage.removeItem(FAVORITE_COMPETITORS);
    // AsyncStorage.removeItem(FAVORITE_SPORTS);
    // AsyncStorage.removeItem(ALREADY_SET_FAVORITE);
    // AsyncStorage.removeItem(ALREADY_STARTED_UP);

    const self = this;

    firebase.notifications().getInitialNotification()
      .then((notificationOpen: NotificationOpen) => {
        if (notificationOpen) {
          // App was opened by a notification

          // Get information about the notification that was opened
          const notification: Notification = notificationOpen.notification;
          self.notificationLaunch(notification);

        } else {
          self.normalLaunch();
        }
      });


  }
  componentWillReceiveProps(nextProps): void {
    if (nextProps.deviceLocation.position !== this.props.deviceLocation.position && !nextProps.deviceLocation.isFetching) {
      this.props.navigate("Main", {}, true);
    } else if (nextProps.deviceLocation.error) {
      // Nessun permesso, vado schermata LocationScreen
      this.props.navigate("LocationScreen", {}, true)
    }

  }

  //Da qui possiamo gestire tutte le aperture da notifica,
  //l'if sara' sostituito da uno switch per tutti i tipi di notifica
  notificationLaunch(notification){
    const self = this;

    if(notification._data.type === "review"){
      const reservation = notification._data.reservation;
      self.props.navigate("ReviewsNavigator.ReviewsQuestionScreen", {reservation}, true);
    } else {
      self.normalLaunch();
    }
  }

  normalLaunch() {
    const self = this;

    AsyncStorage.getItem(ALREADY_STARTED_UP).then(item => {
      if (item) {
        //l'utente ha gia l'app e ha fatto l'intro
        //controllo nello storage se ha selezionato i preferiti
        //se l'ha gia' fatto in precedenza, allora:
        AsyncStorage.getItem(ALREADY_SET_FAVORITE).then(setted => {
          if(setted){
            //Controlla se l'utente ha dato il permesso per la localizzazione:
            this.props.locationPermission();
            // Permissions.check('location').then(granted => {
            //   //se l'ha dato rimanda alla home con la posizione corrente
            //   if(granted !== "authorized") {
            //     self.props.navigate("LocationScreen", {}, true);
            //   }
            //   //altrimenti rimanda alla schermata di localizzazione
            //   else {
            //     this.props.locationPermission();
            //   }

          } else {
            self.props.navigate("FavoriteNavigator", {
              onDone: () => {
                self.props.navigate("LocationScreen", {}, true);
              },
              onCancel: () => {
                AsyncStorage.setItem(ALREADY_SET_FAVORITE, "1");
                this.props.skipFavorites(); //action per analytics
                self.props.navigate("LocationScreen", {}, true);
              }
            })
          }
        })

        //altrimenti rimanda al setfavorite
      } else {
        self.props.navigate("AppIntro", {
          onGetStarted: () => {
            AsyncStorage.setItem(ALREADY_STARTED_UP, "1");
            //naviga a setfavorite
            self.props.navigate("FavoriteNavigator", {
              onDone: () => {
                self.props.navigate("LocationScreen", {}, true);
              },
              onCancel: () => {
                AsyncStorage.setItem(ALREADY_SET_FAVORITE, "1");
                this.props.skipFavorites(); //action per analytics
                self.props.navigate("LocationScreen", {}, true);

              }
            })
          }
        }, true);
      }
    })
  }


  render() {
    const { isLoading } = this.props;
    return (
      <View style={styles.container}>
        <Image resizeMethod={"scale"} resizeMode="contain" style={styles.logo} source={Mascotte}/>
        <Image source={Together} resizeMethod={"scale"} resizeMode="contain" style={{marginTop: 12, width: 240, height: 128}}/>
        {isLoading && <ActivityIndicator size="large" color={themes.base.colors.activityIndicator.default}/>}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
    backgroundColor: 'white'
  },
  logo: {
    width: 240,
    height: 148
  }

};


export default connect(state => ({
    isLoading: state.loading > 0,
    favoriteSports: state.auth.profile.favorite_sports ? state.auth.profile.favorite_sports : [],
    favoriteCompetitors: state.auth.profile.favorite_competitors ? state.auth.profile.favorite_competitors : [],
    deviceLocation: state.location.device,
  })
  , {
    userCheck,
    skipFavorites,
    locationPermission,
    navigate: NavigationService.navigate,
  })(Launcher);
