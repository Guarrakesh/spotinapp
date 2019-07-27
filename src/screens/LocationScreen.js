import React from "react";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Permissions from 'react-native-permissions';
import AndroidOpenSettings from "react-native-android-open-settings";
import {
  Alert,
  Image,
  ImageBackground,
  InteractionManager,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight
} from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {withNamespaces} from 'react-i18next';
import {locationPermission, setPosition} from "../actions/location";
import {Button, View} from '../components/common';
import themes from "../styleTheme";
import i18n from "../i18n/i18n";
import {GOOGLE_API_KEY} from "../vars";
import DismissButton from "../components/common/DismissButton";

const colors = themes.base.colors;

const Logo = require('../assets/img/logo-full.png');
const Mascotte = require('../assets/img/mascotte.png');
const BackgroundPattern = require('../assets/img/no_location_gradient.png');

const deviceHeight = themes.base.deviceDimensions.height;
const deviceWidth = themes.base.deviceDimensions.width;


class LocationScreen extends React.Component {


  constructor() {
    super();
    this.state = {
      position: {},
      isSubmittable: false,
      cityName: "",
      loading: false
    };

    this.searchPress = this.searchPress.bind(this);
    this.currentLocationPress = this.currentLocationPress.bind(this);

  }

  componentWillMount() {
    if(this.props.position) {
      this.props.navigation.setParams({
        position: this.props.position
      });
    }
  }

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    const params = state.params || {};

    return {
      gesturesEnabled: false,
      headerRight: params.position ?
        <DismissButton onPress={() => {navigation.navigate('Main')}} color={themes.base.colors.text.default} style={{marginRight: 16}}/>
        : null
    }
  };

  searchPress() {

    this.setState({loading: true});
    requestAnimationFrame(() => {
      InteractionManager.runAfterInteractions(() => {

        const position = {
          coords: {
            latitude: this.state.position.lat,
            longitude: this.state.position.lng
          },
          cityName: this.state.cityName
        };
        this.props.setPosition(position);

        this.setState({loading: false});
      });
    })



  }

  currentLocationPress() {

    this.setState({loading: true});

    InteractionManager.runAfterInteractions(() => {

      Permissions.check('location').then(granted => {
        if (granted === "denied") {
          this.setState({loading: false});
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
          this.setState({loading: false});
        }
      });
    });
  }


  render() {

    const { t, isLoading }  = this.props;

    return (
      <ImageBackground source={BackgroundPattern} style={styles.outer}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          enableOnAndroid={true}
          bounces={false}
          keyboardShouldPersistTaps={"handled"}
          scrollEnabled={true}
          enableAutomaticScroll={true}
          extraScrollHeight={deviceHeight/10}
        >
          <Image source={Mascotte} style={styles.mascotte} resizeMode={"contain"} />
          <Image source={Logo} style={styles.logo} resizeMode={"contain"} />
          <Text style={styles.title} allowFontScaling={false}>{t("auth.login.title").toUpperCase()}</Text>
          <Text style={styles.subtitle} allowFontScaling={false}>{t("location.discoverWhere")}</Text>

          <View style={styles.middleContainerStyle}>

            <View style={{flexDirection: "row", alignItems: 'flex-start'}}>

              <GooglePlacesAutocomplete
                placeholder={t("location.InsertLocation")}
                minLength={3} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                listViewDisplayed={false}   // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  this.setState({position: details.geometry.location, isSubmittable: true, cityName: details.name});
                }}
                textInputProps={{
                  onChangeText: () => this.state.isSubmittable === false ? null : this.setState({isSubmittable: false})
                }}
                getDefaultValue={() => ''}
                enablePoweredByContainer={false}
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: GOOGLE_API_KEY,
                  language: i18n.language === "it-IT" ? 'it' : 'en', // language of the results
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
                    borderRadius: themes.base.borderRadius,
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
              loading={this.state.loading || isLoading}
              disabled={!this.state.isSubmittable || this.state.loading}
              color={themes.base.colors.accent.default}
              round
              variant="primary"
              uppercase
              onPress={this.searchPress}
              block
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
    flexGrow: 1,
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
  return ({
    isLoggedIn: state.auth.isLoggedin,
    isLoading: state.loading > 0,
    position: state.location.device.position
  })
};
export default connect(mapStateToProps, {
  locationPermission,
  setPosition
})(withNamespaces()(LocationScreen));
