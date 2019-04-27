import React from "react";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Modal from "react-native-modal";
import Permissions from 'react-native-permissions';
import {
  Text, Image, StyleSheet, Alert,
  Platform, StatusBar, KeyboardAvoidingView, TouchableNativeFeedback, Linking, WebView,
  TouchableHighlight, ImageBackground
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { withNamespaces } from 'react-i18next';
import { locationPermission, setPosition } from "../actions/location";
import {Input} from "react-native-elements";
import {Button, Touchable, View} from '../components/common';

import themes from "../styleTheme";
import i18n from "../i18n/i18n";
import { GOOGLE_API_KEY } from "../vars";

const colors = themes.base.colors;

const Logo = require('../assets/img/logo-full.png');
const Mascotte = require('../assets/img/mascotte.png');
const BackgroundPattern = require('../assets/img/no_location_gradient.png');

const deviceHeight = themes.base.deviceDimensions.height;
const deviceWidth = themes.base.deviceDimensions.width;
/**
 * @see https://github.com/react-native-training/react-native-elements/issues/1102
 */
let background;
if (Platform.Version >= 21) {
  background = TouchableNativeFeedback.Ripple(
    'ThemeAttrAndroid',
    true
  );

} else {
  background = TouchableNativeFeedback.SelectableBackground();
}


class LocationScreen extends React.Component {


  constructor() {


    super();
    this.state = {
      position: {},
      isSubmitable: false
    };

    this.goPress = this.goPress.bind(this);
    this.currentLocationPress = this.currentLocationPress.bind(this);

  }

  goPress() {

    console.log(this.state.position);
    const position = {
      coords: {
        latitude: this.state.position.lat,
        longitude: this.state.position.lng
      }
    };
    this.props.setPosition(position);

  }

  currentLocationPress() {
    Permissions.check('location').then(granted =>{
      if(granted === "denied") {
        Alert.alert(
          i18n.t("location.locationPermissions.title"),
          i18n.t("location.locationPermissions.subtitle"),
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: i18n.t("profile.settings.title"),
              onPress: () => Platform.OS === 'ios' ? Permissions.openSettings() : AndroidOpenSettings.locationSourceSettings()
            },
          ],
          {cancelable: true},
        );
      }
      else {
        this.props.locationPermission();
      }
    });

  }


  render() {

    const {isLoggedIn, errorMessage, t, navigation, isLoading }  = this.props;


    // if (loggedIn) {
    //   return () => this.props.navigation.navigate('ProfileScreen')
    //
    // }
    //else {

    const termsModal = (
      <Modal
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        isVisible={this.state.termsModalVisible}
        style={styles.modalView}
      >
        <WebView
          source={{uri: i18n.language === "it-IT" ? "https://www.iubenda.com/privacy-policy/62969082" : "https://www.iubenda.com/privacy-policy/55322937"}}
        />
        <Touchable style={styles.privacyButton} onPress={() => this.setState({termsModalVisible: false})}>
          <Text style={styles.privacyButtonText}>OK</Text>
        </Touchable>
      </Modal>
    );

    return (

      <ImageBackground source={BackgroundPattern} style={styles.outer}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          enabledOnAndroid={true}
          bounces={false}
          //keyboardShouldPersistTaps={"handled"}
          scrollEnabled={true}
          //enableAutomaticScroll={true}
          extraHeight={deviceHeight/5}
          extraScrollHeight={deviceHeight/5}
        >
          {/*{termsModal}*/}
          {/*<StatusBar*/}
            {/*backgroundColor={this.state.keyboardOpen ? colors.primary.default : colors.white.default}*/}
            {/*barStyle="dark-content"*/}
          {/*/>*/}
          <Image source={Mascotte} style={styles.mascotte} resizeMode={"contain"} />
          <Image source={Logo} style={styles.logo} resizeMode={"contain"} />
          <Text style={styles.title} allowFontScaling={false}>{t("auth.login.title").toUpperCase()}</Text>
          <Text style={styles.subtitle} allowFontScaling={false}>{t("location.discoverWhere")}</Text>


          <View style={styles.middleContainerStyle}>


            <View style={{flexDirection: "row", alignItems: 'flex-start'}}>

              <GooglePlacesAutocomplete
                placeholder={t("location.InsertLocation")}
                minLength={5} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                listViewDisplayed={false}   // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  this.setState({position: details.geometry.location, isSubmitable: true});
                }}
                textInputProps={{
                  onChangeText: () => this.state.isSubmitable === false ? null : this.setState({isSubmitable: false})
                }}
                getDefaultValue={() => ''}
                enablePoweredByContainer={false}
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: GOOGLE_API_KEY,
                  language: 'it', // language of the results
                  //types: '(geocode)' // default: 'geocode'
                }}
                styles={{
                  textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth:0,
                  },
                  textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    marginTop: 0,
                    height: 40,
                    color: '#5d5d5d',
                    fontSize: 14,
                    borderRadius: 0,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    borderWidth: 1,
                    borderRightWidth: 0,
                    borderColor: themes.base.colors.accent.default
                  },

                  listView: {

                    backgroundColor: themes.base.colors.white.light
                  }
                }}
              />
              <View style={{borderTopWidth: 1, borderColor: themes.base.colors.accent.default}}>
              <View style={styles.triangleCornerLayer} />
              </View>
                <TouchableHighlight
                  style={styles.geocodeButton}
                  underlayColor={themes.base.colors.accent.default}
                  activeOpacity={0.5}
                  onPress={this.currentLocationPress}
                >
                  <Icon name={"crosshairs-gps"}
                        color={colors.white.light} size={21}
                  />
                </TouchableHighlight>
            </View>
            <Button
              disabled={!this.state.isSubmitable}
              round
              variant="primary"
              uppercase
              onPress={this.goPress}
              block
              loading={isLoading}
              size="big"
              containerStyle={styles.submitButton}
              loadingProps={{color: colors.accent.default}}
            >{t("location.search")}</Button>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    )
  }
}



const styles = StyleSheet.create({
  outer: {
    backgroundColor: colors.white.default,
    height: "100%"

  },
  container: {
    //flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  logo: {
    marginTop: themes.base.deviceDimensions.height/30,
    height: 50,

  },
  mascotte: {
    marginTop: themes.base.deviceDimensions.height/20,
    height: 100,
  },
  title: {
    marginTop: deviceHeight/20,
    fontSize: 18,
    fontFamily: themes.base.fonts.LatoBlack,
    color: colors.accent.default,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  subtitle: {

    marginTop: 8,
    fontSize: 16,
    fontFamily: themes.base.fonts.LatoMedium,
    color: colors.text.default,
    textAlign: 'center'
  },

  middleContainerStyle: {
    width: '100%',

    paddingLeft: deviceWidth/20,
    paddingRight: deviceWidth/20,
    paddingTop: deviceHeight/20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    ...themes.base.elevations.depth2
  },
  errorMessage: {
    position: 'absolute',
    bottom: -8,
    fontFamily: themes.base.fonts.LatoBlack,
    color: colors.danger.default,
    flex: 1,
    backgroundColor: 'transparent',
    marginLeft: 8,
    zIndex: 100,
    marginBottom: 8,
  },

  modalView: {
    borderTopRightRadius: themes.base.borderRadius,
    borderTopLeftRadius: themes.base.borderRadius,
    overflow: "hidden"
  },


  triangleCornerLayer: {

    height: 39,
    borderRightWidth: 30,
    borderTopWidth: 39,
    borderTopColor: themes.base.colors.white.light,
    borderRightColor: themes.base.colors.accent.default

  },
  geocodeButton: {
    backgroundColor: themes.base.colors.accent.default,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    paddingLeft: 16,
    paddingRight: 16

  },
  submitButton: {
    marginBottom: 8,
    marginTop: 32,
    width: 150
  }

});

const mapStateToProps = (state) => {
  const loginError = state.auth.loginError;
  let errorMessage = null;
  if (loginError && [401,400].includes(loginError.status)) {
    errorMessage = "Credenziali errate";
  }
  return ({
    errorMessage,
    isLoggedIn: state.auth.isLoggedin,
    isLoading: state.loading > 0
  });
};
export default connect(mapStateToProps, {
  locationPermission, setPosition
})(withNamespaces()(LocationScreen));
