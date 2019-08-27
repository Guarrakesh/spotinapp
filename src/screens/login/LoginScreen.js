import React from "react";
import {withNamespaces} from 'react-i18next';
import {Dimensions, Platform, StyleSheet, TouchableNativeFeedback,} from "react-native";
import {connect} from "react-redux";
import {oAuthFacebookLogin, userLogin, userRegister} from "../../actions/authActions";
import themes from "../../styleTheme";
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



  register(formValues) {
    this.props.userRegister(formValues);
  }
  _handleGoBack() {

    this.props.navigation.navigate("Main");
  }
  render() {

    const {isLoggedIn, errorMessage, t, navigation, isLoading }  = this.props;

    const { email: emailError, password: passwordError } = this.state.formErrors;



    return (

        <Login

            facebookLogin={this.facebookLogin.bind(this)}
            onSignIn={this.userLogin.bind(this)}
            onPasswordForgot={this.forgotPassword.bind(this)}
            onSignUp={this.register.bind(this)}
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
  userRegister,
  facebookLogin: oAuthFacebookLogin,
})(withNamespaces()(LoginScreen));
