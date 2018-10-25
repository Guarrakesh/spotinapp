import React from 'react';
import {connect} from "react-redux";
import Permissions from 'react-native-permissions';
import AndroidOpenSettings from 'react-native-android-open-settings'
import {View, StyleSheet, ImageBackground, Text, Platform, Linking, AppState} from "react-native";
import {Button} from "react-native-elements";

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
        <Text>Spot In non puo' funzionare senza la tua posizione</Text>
        <Button
          title={"Impostazioni"}
          onPress={() => {Platform.OS === 'ios' ? Permissions.openSettings() : AndroidOpenSettings.locationSourceSettings()}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

});
export default NoLocationScreen;