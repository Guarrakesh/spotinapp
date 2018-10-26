import React from 'react';
import {connect} from "react-redux";
import Permissions from 'react-native-permissions';
import AndroidOpenSettings from 'react-native-android-open-settings'
import {View, StyleSheet, ImageBackground, Text, Platform, Linking, AppState} from "react-native";
import {Button} from "react-native-elements";

class NoLocationScreen extends React.Component{


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