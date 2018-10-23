import React from "react";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import {Text, Image, StyleSheet, ActivityIndicator, ImageBackground,
  Platform, ScrollView, StatusBar, KeyboardAvoidingView, TouchableNativeFeedback } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {Input} from "react-native-elements";
import {Button, View} from '../../components/common';


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

  facebookLogin() {
    this.props.facebookLogin();
  }
  render() {
    const { navigation, isLoading } = this.props;
    const {isLoggedIn, errorMessage} = this.props;

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
        >

          <StatusBar
            backgroundColor={this.state.keyboardOpen ? colors.primary.default : colors.white.default}
            barStyle="dark-content"
          />
          <Image source={Logo} style={styles.logo} resizeMode={"contain"} />
          <Text style={styles.title}>{"Entra nel tuo account".toUpperCase()}</Text>

          <ImageBackground source={BackgroundPattern} style={{
            height: '100%',
            width: '100%',
            marginTop: -30
          }} resizeMode={'cover'}>


            <View style={styles.middleContainerStyle}>

              <Input
                placeholder="email"
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
                placeholder="password"
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
                disabledStyle={{ backgroundColor: colors.white.default, borderColor:themes.base.inputPlaceholderColor, borderRadius: 100}}
                disabledTitleStyle={{color: themes.base.inputPlaceholderColor}}
                title={'Accedi'.toUpperCase()}
                onPress={this.login}
                buttonStyle={[styles.signInButton, {borderRadius: 100}]}
                titleStyle={{color: colors.accent.default, fontSize: 16, fontWeight: '700'}}
                loading={isLoading}
                loadingProps={{color: colors.accent.default}}
              />
              <Button
                titleStyle={{color: colors.white.default, fontSize: 16}}
                title={'Entra con Facebook'}
                loading={isLoading}
                disabledStyle={{borderRadius: 100}}
                containerViewStyle={{borderRadius: 100}}
                buttonStyle={[styles.fbSignInButton, {borderRadius: 100}]}
                onPress={this.facebookLogin}
                icon={<Icon
                  name='facebook'
                  size={18}
                  color='white'
                />
                }
                iconContainerStyle={{alignSelf: 'flex-start'}}
              />

              <Button
                fixNativeFeedbackRadius={true}
                title='Password dimenticata?'
                flat
                titleStyle={{color: colors.text.default, fontSize: 16}}
                buttonStyle={{marginTop: 8, backgroundColor: '', shadowOpacity: 0}}
                clear={true}

              />
              <View style={{overflow: "hidden"}}>
                <Button
                  fixNativeFeedbackRadius={true}
                  clear={true}
                  rounded={true}
                  disabled={isLoading}
                  title={['Non hai un account?', <Text style={{fontWeight: '700'}}> Registrati</Text>]}
                  titleStyle={{color: colors.accent.default, fontSize: 14, alignSelf: 'center'}}
                  buttonStyle={styles.signUpButton}
                  onPress={() => this.props.navigation.navigate('SignUp')}
                />
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
        <View style={styles.bottomView}/>
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
    alignItems: 'stretch',
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

  signInButton: {
    position: 'relative',
    backgroundColor: colors.white.light,
    borderColor: colors.accent.default,
    borderWidth: 1,

    height: 43,
    justifyContent: 'center',
    elevation: 1,

  },
  fbSignInButton: {

    backgroundColor: themes.commonColors.facebook,
    marginTop: 8,
    height: 43,
    elevation: 1,
    ...themes.base.elevations.depth1,
  },
  signUpButton: {

    //marginTop: 20,
    backgroundColor: 'transparent',

    height: 47,
    marginTop: 16,
    width: '90%',
    borderRadius: 100,
    alignSelf: 'center',
    ...themes.base.elevations.depth1,
    elevation: 1
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
})(LoginScreen);
