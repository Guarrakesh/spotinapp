import React from "react";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import {Text, Image, StyleSheet, ActivityIndicator, ImageBackground,
  Platform, ScrollView, StatusBar, KeyboardAvoidingView, TouchableNativeFeedback } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { withNamespaces } from 'react-i18next';

import {Input} from "react-native-elements";
import {Button, View, Typography} from '../../components/common';


import login from '../../validations/login';
import validate from 'validate.js';
import themes from "../../styleTheme";
import { userLogin, oAuthFacebookLogin } from "../../actions/authActions";



const colors = themes.base.colors;

const Logo = require('../../assets/img/logo-full.png');
const BackgroundPattern = require('../../assets/img/wave_pattern.png');



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


class LoginScreen extends React.Component {


  constructor() {


    super();
    this.state = {
      email: "",
      password: "",
      formErrors: {}
    };

    this.login = this.login.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }

  login() {


    this.setState({formErrors: {}});
    const { email, password } = this.state;

    const validationErrors = validate({
      email,
      password
    }, login);
    if (validationErrors) {
      this.setState({formErrors: validationErrors});
    } else {
      this.props.userLogin({
        email,
        password
      });
    }
  }
  forgotPassword() {
    this.props.navigation.navigate('ForgotPassword')
  }
  facebookLogin() {
    this.props.facebookLogin();
  }
  render() {

    const {isLoggedIn, errorMessage, t, navigation, isLoading }  = this.props;

    const { email: emailError, password: passwordError } = this.state.formErrors;

    // if (loggedIn) {
    //   return () => this.props.navigation.navigate('ProfileScreen')
    //
    // }
    //else {

    return (

        <View>
          <ScrollView
              contentContainerStyle={styles.container}
              bounces={false}
              keyboardShouldPersistTaps
          >

            <StatusBar
                backgroundColor={this.state.keyboardOpen ? colors.primary.default : colors.white.default}
                barStyle="dark-content"
            />
            <Image source={Logo} style={styles.logo} resizeMode={"contain"} />
            <Text style={styles.title}>{t("auth.login.title").toUpperCase()}</Text>

            <ImageBackground source={BackgroundPattern} style={{
            height: '100%',

            width: '100%',
            marginTop: -30
          }} resizeMode={'cover'}>


              <View style={styles.middleContainerStyle}>

                <Input
                    placeholder={t("common.email")}
                    placeholderTextColor={themes.base.inputPlaceholderColor}
                    leftIcon={<Icon name={emailError ? "times" : "user"}
                                color={emailError ? colors.danger.default : colors.text.default} size={21}/>}
                    leftIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
                    containerStyle={styles.inputOuterContainer}
                    inputContainerStyle={{borderBottomWidth: 0}}
                    inputStyle={styles.textInputStyle}
                    autoCapitalize="none"
                    errorMessage={emailError}
                    displayError={true}
                    errorStyle={styles.errorMessage}
                    shake={true}
                    numberOfLines = {1}
                    onChangeText={(text) => this.setState({email: text})}
                    onSubmitEditing={() => {
                  this.refs.password.focus()
                }}

                />
                <Input
                    placeholder={t("common.password")}
                    ref="password"
                    placeholderTextColor={themes.base.inputPlaceholderColor}
                    leftIcon={<Icon name={passwordError ? "times" : "key"}
                                color={passwordError ? colors.danger.default : colors.text.default} size={21}/>}
                    containerStyle={styles.inputOuterContainer}
                    leftIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
                    inputContainerStyle={{borderBottomWidth: 0}}
                    inputStyle={styles.textInputStyle}
                    //errorMessage={this.props.auth.error != null ? this.props.auth.error.message : ""}
                    shake={errorMessage !== null }
                    onChangeText={(text) => this.setState({password: text})}
                    secureTextEntry={true}
                    errorMessage={passwordError}
                    displayError={true}
                    errorStyle={styles.errorMessage}
                    onSubmitEditing={this.login}
                    blurOnSubmit={true}
                    numberOfLines = {1}
                />
                <Button
                    disabled={isLoading || this.state.username === "" || this.state.password === ""}
                    round
                    variant="primary"
                    uppercase
                    onPress={this.login}
                    block
                    loading={isLoading}
                    loadingProps={{color: colors.accent.default}}
                >{t("auth.login.signIn")}</Button>
                <Button
                    loading={isLoading}
                    round
                    block
                    uppercase
                    containerStyle={[{backgroundColor: themes.commonColors.facebook,}, {borderRadius: 100}]}
                    titleStyle={{color: '#fff'}}
                    onPress={this.facebookLogin}
                    icon={<Icon
                  name='facebook'
                  size={18}
                  color='white'
                />
                }
                    iconContainerStyle={{alignSelf: 'flex-start'}}
                  >{t("auth.login.facebookSignIn")}</Button>

                <Button
                    block
                    clear
                    onPress={this.forgotPassword}
                > {t("auth.login.passwordForgot")}
                </Button>

                  <Button
                      clear
                      block
                      uppercase
                      disabled={isLoading}
                      variant="primary"
                      onPress={() => this.props.navigation.navigate('SignUp')}
                  >
                    <Text
                                uppercase
                                style={{fontWeight: '700', color: themes.base.colors.accent.default}}>
                      {t("auth.login.noAccount").toUpperCase()}
                      </Text>
                      <Text
                          uppercase
                        style={{paddingLeft: 8, fontWeight: '700', color: themes.base.colors.accent.default}}>
                      {" " + t("auth.login.register").toUpperCase()}
                    </Text>
                  </Button>

              </View>
            </ImageBackground>
          </ScrollView>

        </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.white.default
  },
  logo: {
    marginTop: 55,
    height: 128,

  },
  title: {

    marginTop: 16 ,
    fontSize: 18,
    fontFamily: themes.base.fonts.LatoBlack,
    color: colors.text.default,
    textAlign: 'center',
    textTransform: 'uppercase'
  },

  inputOuterContainer: {
    width:'100%',

    backgroundColor: 'transparent',

    maxHeight: 60,
    justifyContent: 'center',
    paddingBottom: 24,
    paddingTop: 8,
    marginBottom: 8,
    ...themes.base.elevations.depth1,
    position: 'relative',
  },

  textInputStyle: {
    fontFamily: themes.base.fonts.LatoMedium,
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 16,
    margin: 12,
    fontSize: 16,
  },
  middleContainerStyle: {
    width: '100%',

    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 100,
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
  remoteErrorMessage: {

    fontFamily: themes.base.fonts.LatoBlack,
    color: colors.danger.default,
    textAlign: 'center',


  },

  bottomView: {
    width:'100%',
    height: 200,
    backgroundColor: colors.primary.default
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
  userLogin,
  facebookLogin: oAuthFacebookLogin,
})(withNamespaces()(LoginScreen));
