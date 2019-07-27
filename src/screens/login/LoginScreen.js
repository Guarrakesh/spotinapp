import React from "react";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { Spring } from "react-spring/renderprops-universal";
import {
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  WebView,
  Dimensions,
} from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {withNamespaces} from 'react-i18next';
import {Button, Touchable, View} from '../../components/common';
import login from '../../validations/login';
import validate from 'validate.js';
import themes from "../../styleTheme";
import {oAuthFacebookLogin, userLogin} from "../../actions/authActions";
import i18n from "../../i18n/i18n";
import Modal from "react-native-modal";
import Login from "./Login";

const colors = themes.base.colors;

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

const { width, height} = Dimensions.get('screen');


class LoginScreen extends React.Component {


  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      formErrors: {},
      termsModalVisible: false
    };


  }



  forgotPassword() {
    this.props.navigation.navigate('ForgotPassword');
  }

  userLogin(email, password) {

    this.props.userLogin({email, password});
  }
  facebookLogin() {
    this.props.facebookLogin();
  }

  handleTermsPress() {
    this.setState({termsModalVisible: true});
  }


  _handleGoBack() {
    this.props.navigation.goBack(null)
  }
  render() {

    const {isLoggedIn, errorMessage, t, navigation, isLoading }  = this.props;

    const { email: emailError, password: passwordError } = this.state.formErrors;



    return (

        <Login
            facebookLogin={this.facebookLogin.bind(this)}
            onSignIn={this.userLogin.bind(this)}
            onPasswordForgot={this.forgotPassword.bind(this)}
            goBack={this._handleGoBack.bind(this)}/>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: "#ffffff"
  },




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
