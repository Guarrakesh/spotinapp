import React from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator, Animated, AsyncStorage, Dimensions, Image, View} from 'react-native';
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

const Logo = require('../assets/img/logo-text-white/logo-text.png');
const Mascotte = require('../assets/img/mascotte/pallanuoto/POLPO_PALLANUOTO.png');

class Launcher extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      logoY: new Animated.Value(1),

    }
  }



  componentDidMount() {

    // AsyncStorage.removeItem(FAVORITE_COMPETITORS);
    // AsyncStorage.removeItem(FAVORITE_SPORTS);
    // AsyncStorage.removeItem(ALREADY_SET_FAVORITE);
    // AsyncStorage.removeItem(ALREADY_STARTED_UP);

    const self = this;
    Animated.sequence([
      Animated.timing(this.state.logoY, {
        toValue: 200,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      firebase.notifications().getInitialNotification()
          .then((notificationOpen: NotificationOpen) => {
            if (notificationOpen) {
              // App was opened by a notification3F18AF

              // Get information about the notification that was opened
              const notification: Notification = notificationOpen.notification;
              self.notificationLaunch(notification);

            } else {
              self.normalLaunch();
            }
          });
    });


  }

  componentWillReceiveProps(nextProps): void {
    if (nextProps.deviceLocation.position !== this.props.deviceLocation.position && !nextProps.deviceLocation.isFetching) {
      this.props.navigate('Main');
    } else if (nextProps.deviceLocation.error) {
      // Nessun permesso, vado schermata LocationScreen
      this.props.navigate("LocationScreen", {}, true);
    }

  }

  startup() {
    setTimeout(() => {
      this.props.navigate("Main", {}, true);
    }, 1000);
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

  async normalLaunch() {
    const self = this;

    const alreadyStartedUp = await AsyncStorage.getItem(ALREADY_STARTED_UP);
    if (alreadyStartedUp) {
      //l'utente ha gia l'app e ha fatto l'intro
      //controllo nello storage se ha selezionato i preferiti
      //se l'ha gia' fatto in precedenza, allora:
      const alreadySetFavorite = await AsyncStorage.getItem(ALREADY_SET_FAVORITE);

      if (alreadySetFavorite) {
        const permissionState = await Permissions.check('location');

        if (permissionState !== "authorized") {
          self.props.navigate("LocationScreen", {}, true);
        } else {
          this.props.locationPermission();
        }
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
  }


  render() {
    const { isLoading } = this.props;
    return (
        <View style={styles.container}>

          <Animated.Image source={Logo}
                          resizeMethod={"scale"} resizeMode="contain"
                          style={{
                            position: 'absolute',
                            marginTop: 12,
                            height: 32,
                            transform: [{ translateY: Animated.multiply(this.state.logoY, -1) }]
                          }}/>

          <Animated.Image source={Mascotte}
                          style={{
                            marginTop: 12,
                            transform: [ { scale: this.state.logoY.interpolate({ inputRange: [0, 200], outputRange: [0.5, 1]})}],
                            opacity : this.state.logoY.interpolate({ inputRange: [0, 180, 200], outputRange: [0, 0.2, 1] }),
                          }}/>
          {isLoading && <ActivityIndicator size="large" color={themes.base.colors.activityIndicator.default}/>}
        </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.base.colors.accent.default,
  },
  logo: {
    height: 41
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
