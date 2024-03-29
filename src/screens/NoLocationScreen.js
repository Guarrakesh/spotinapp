import React from 'react';
import {connect} from "react-redux";
import Permissions from 'react-native-permissions';
import AndroidOpenSettings from 'react-native-android-open-settings'
import {View, StyleSheet, ImageBackground, Text, Platform, ActivityIndicator} from "react-native";
import {Button} from "react-native-elements";
import { Button as MyButton } from '../components/common'
import Icon from "react-native-vector-icons/MaterialIcons";
import themes from "../styleTheme";
import i18n from "../i18n/i18n";


import { REFRESH_SCREEN } from '../actions/integrity';
const BackgroundPattern = require('../assets/img/wave_pattern.png');
const Fonts = themes.base.fonts;

class NoLocationScreen extends React.Component{

  handleRefresh() {
    this.props.dispatch({type: REFRESH_SCREEN });
  }

  render(){
    return(
      <View style={styles.container}>
        <Icon name={"location-off"} size={100} style={styles.noLocationIcon}/>
        <ImageBackground
          source={BackgroundPattern} style={{height: '100%', width: '100%', marginTop: -20}}
        >
          <View style={styles.middleContainerStyle}>
            <Text style={styles.text1}>{i18n.t("noLocation.needPosition")}</Text>
            <Text style={styles.text2}>{i18n.t("noLocation.enablePosition")}</Text>

              {this.props.fetching && <ActivityIndicator size="large" color={themes.base.colors.activityIndicator.default}/>}

              <Button
              title={i18n.t("profile.settings.title")}
              titleStyle={styles.sendButtonText}
              buttonStyle={[styles.sendButton, {borderColor: themes.base.colors.accent.default}]}
              onPress={() => {Platform.OS === 'ios' ? Permissions.openSettings() : AndroidOpenSettings.locationSourceSettings()}}
            />
              <MyButton disabled={this.props.fetching} clear variant="primary" onPress={this.handleRefresh.bind(this)}>{i18n.t("common.update")}</MyButton>
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
export default connect(state => ({
  fetching: state.location.device.fetching
}))(NoLocationScreen);