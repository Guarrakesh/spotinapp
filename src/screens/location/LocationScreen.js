import React from "react";
import {withNamespaces} from 'react-i18next';
import {Alert, InteractionManager, Platform, Text, Image, Animated} from "react-native";
import AndroidOpenSettings from "react-native-android-open-settings";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Permissions from 'react-native-permissions';
import Icon from "react-native-vector-icons/FontAwesome";
import {connect} from "react-redux";
import {locationPermission, useAddress, useDeviceLocation} from "../../actions/location";
import {View} from '../../components/common';
import Button from "../../components/common/Button";
import { Touchable } from "../../components/common";
import i18n from "../../i18n/i18n";
import themes from "../../styleTheme";
import Images from '../../assets/images';
import {GOOGLE_API_KEY} from "../../vars";
import styles from './locationScreenStyles';

const colors = themes.base.colors;

const Logo = require('../../assets/img/logo-full.png');
const Mascotte = require('../../assets/img/mascotte.png');
const BackgroundPattern = require('../../assets/img/no_location_gradient.png');

const deviceHeight = themes.base.deviceDimensions.height;
const deviceWidth = themes.base.deviceDimensions.width;

const AnimatedImage = Animated.createAnimatedComponent(Image);
class LocationScreen extends React.Component {


  constructor() {
    super();
    this.iconYAnimationInstance = null;
    this.state = {
      position: {},
      isSubmittable: false,
      cityName: "",
      loading: false,
      iconY: new Animated.Value(0),

    };

    this.searchPress = this.searchPress.bind(this);
    this.currentLocationPress = this.currentLocationPress.bind(this);

  }

  componentWillMount() {
    if(this.props.deviceLocation.position) {
      this.props.navigation.setParams({
        position: this.props.deviceLocation.position
      });
    }
  }

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
        this.props.useAddress(position);
        this.props.navigation.navigate('Main');
        this.setState({loading: false});
      });
    })

  }

  componentWillReceiveProps(nextProps): void {
    if (nextProps.deviceLocation.position === this.props.deviceLocation.position &&
        nextProps.deviceLocation.error === this.props.deviceLocation.error &&
        nextProps.deviceLocation.fetching === this.props.deviceLocation.fetching) {
      return;
    }
    if (!nextProps.deviceLocation.fetching && nextProps.deviceLocation.error) {
      this.setState({ loading: false });
  //    this.state.iconY.stopAnimation();

    } else if (!nextProps.deviceLocation.fetching && nextProps.deviceLocation.position) {
      this.props.navigation.navigate('Main');
    //  this.state.iconY.stopAnimation();
      this.setState({loading: false})
    }
  }

  async currentLocationPress() {


    let permissionState = await Permissions.check('location');
    if (permissionState == "undetermined") {
      permissionState = await Permissions.request('location');
    }
    if (permissionState !== "authorized") {
      requestAnimationFrame(() => {

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
      });
    } else {
      Animated.loop(
          Animated.sequence([
            Animated.timing(this.state.iconY, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(this.state.iconY, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
      , { iterations: 20 }).start();
      this.setState({loading: true });
      this.props.locationPermission();
      this.props.useDeviceLocation();
    }
  }

  render() {

    const { t, isLoading }  = this.props;
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            enableOnAndroid={true}
            bounces={false}
            keyboardShouldPersistTaps={"handled"}
            scrollEnabled={true}
            enableAutomaticScroll={true}
            extraScrollHeight={deviceHeight/10}
        >
          <View style={styles.header}>
            <Animated.Image source={Images.icons.common.location}
                           style={{
                             width: 128,
                             height: 128,
                             transform: [{ scale: this.state.iconY.interpolate({ inputRange: [0,1], outputRange: [1, 1.2]}) }]
                           }}/>
          </View>
          <View style={styles.content}>
            <Text style={styles.title} allowFontScaling={false}>{t("location.title").toUpperCase()}</Text>
            <Text style={styles.subtitle} allowFontScaling={false}>{t("location.needLocation")}</Text>
            <Button round
                    block
                    containerStyle={styles.button}
                    onPress={this.currentLocationPress} variant="primary" uppercase>{t("location.enableLocation")}</Button>
            <Text style={[styles.subtitle,styles.subtitle2]}
                  allowFontScaling={false}>{t("location.orInsertAddress")}</Text>


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
                    textInputContainer: styles.inputOuterContainer,

                    textInput: styles.input,
                    separator: styles.separator,
                    listView: styles.listView,
                    row: styles.listViewItem
                  }}
              />
              <Touchable
                  style={[styles.confirmBtn, { opacity: this.state.isSubmittable ? 1 : 0 }]}
                  clear
                  disabled={!this.state.isSubmittable || this.state.loading}
                  onPress={this.searchPress}
              ><Icon
                  color={colors.text.light}
                  name='arrow-right'
                  size={21}/></Touchable>


            <Touchable style={styles.close} onPress={() => this.props.navigation.navigate('Main')}>
              <Text>{t("location.close").toUpperCase()}</Text>
            </Touchable>
          </View>

        </KeyboardAwareScrollView>
    )
  }
}





const mapStateToProps = (state) => {
  return ({
    isLoggedIn: state.auth.isLoggedin,
    isLoading: state.loading > 0,
    deviceLocation: state.location.device,
  })
};
export default connect(mapStateToProps, {
  locationPermission,
  useAddress,
  useDeviceLocation,
})(withNamespaces()(LocationScreen));
