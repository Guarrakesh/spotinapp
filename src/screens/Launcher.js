import React from 'react';
import { connect } from 'react-redux';
import { View, Image, ActivityIndicator, AsyncStorage} from 'react-native';

import NavigationService from "../navigators/NavigationService";
import { userCheck } from '../actions/authActions';
import { ALREADY_STARTED_UP } from "../helpers/asyncStorageKeys";
import { ALREADY_SET_FAVORITE, FAVORITE_SPORTS, FAVORITE_COMPETITORS } from "../sagas/core/favorite";

const Logo = require('../assets/img/logo/logo.png');
const Together = require('../assets/img/together/together.png');

class Launcher extends React.Component {
  componentDidMount() {

    const self = this;

    AsyncStorage.getItem(ALREADY_STARTED_UP).then(item => {

      if (item) {
        //l'utente ha gia l'app e ha fatto l'intro
        //controllo nello storage se ha selezionato i preferiti
        //se l'ha gia' fatto in precedenza, allora:
        AsyncStorage.getItem(ALREADY_SET_FAVORITE).then(setted => {
          if(setted){
            self.props.userCheck({redirectOnResolve: {pathName: "Main"}});
          }
          else {
            self.props.navigate("FavoriteNavigator", {
              onDone: () => {
                self.props.userCheck({redirectOnResolve: {pathName: "Main"}});
              },
              onCancel: () => {
                self.props.navigate("Auth", {}, true);
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
                self.props.navigate("Auth", {}, true);
              },
              onCancel: () => {
                self.props.navigate("Auth", {}, true);
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
        <Image resizeMethod={"scale"} resizeMode="contain" style={styles.logo} source={Logo}/>
        <Image source={Together} resizeMethod={"scale"} resizeMode="contain" style={{marginTop: 12, width: 240, height: 128}}/>
        {isLoading && <ActivityIndicator size="large"/>}
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
    favoriteCompetitors: state.auth.profile.favorite_competitors ? state.auth.profile.favorite_competitors : []
  })
  , {
    userCheck,
    navigate: NavigationService.navigate,

  })(Launcher);
