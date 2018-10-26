import React from 'react';
import {connect} from "react-redux";
import Permissions from 'react-native-permissions';
import AndroidOpenSettings from 'react-native-android-open-settings'
import {View, StyleSheet, ImageBackground, Text, Platform, Linking, AppState} from "react-native";
import {Button} from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import themes from "../styleTheme";
import {Fonts} from "../components/common/Fonts";

const BackgroundPattern = require('../assets/img/wave_pattern.png');

class NoLocationScreen extends React.Component{

  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {

    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
      Permissions.check('location').then(response => {
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        if(response === 'authorized'){
          this.props.navigation.navigate('Home', {refresh: true});
        }
      })

    }
    this.setState({appState: nextAppState});
  }

  render(){
    return(
      <View style={styles.container}>
        <Icon name={"location-off"} size={100} style={styles.noLocationIcon}/>
        <ImageBackground
          source={BackgroundPattern} style={{height: '100%', width: '100%', marginTop: -20}}
        >
          <View style={styles.middleContainerStyle}>
            <Text style={styles.text1}>Spot In non puo' funzionare senza la tua posizione...</Text>
            <Text style={styles.text2}>Abilita l'accesso alla tua posizione nelle Impostazioni.</Text>
            {Platform.OS === "android" ?
            <Text style={styles.text3}>Geolocalizzazione > Autorizz. a livello di app > Spot In</Text> : null}
            <Button
              title={"Impostazioni"}
              titleStyle={styles.sendButtonText}
              buttonStyle={[styles.sendButton, {borderColor: themes.base.colors.accent.default}]}
              onPress={() => {Platform.OS === 'ios' ? Permissions.openSettings() : AndroidOpenSettings.locationSourceSettings()}}
            />
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: themes.base.colors.white.light,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noLocationIcon: {
    color: themes.base.colors.text.default,
    marginTop: themes.base.deviceDimensions.height/5
  },
  text1: {
    fontSize: 20,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.text.default,
    textAlign: 'center'
  },
  text2: {
    fontSize: 20,
    fontFamily: Fonts.Lato,
    color: themes.base.colors.text.default,
    marginTop: 32,
    marginBottom: 32,
    textAlign: 'center'
  },
  text3: {
    fontSize: 16,
    fontFamily: Fonts.LatoLight,
    color: themes.base.colors.text.default,
    marginTop: 16,
    marginBottom: 32,
    textAlign: 'center'
  },
  middleContainerStyle: {
    width: '100%',
    paddingLeft: 48,
    paddingRight: 48,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: themes.base.deviceDimensions.height/7,

    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    ...themes.base.elevations.depth2
  },
  sendButton: {
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 40,
    backgroundColor: themes.base.colors.white.light,
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16
  },
  sendButtonText: {
    fontFamily: Fonts.LatoBold,
    fontSize: 18,
    color: themes.base.colors.accent.default
  },

});
export default NoLocationScreen;