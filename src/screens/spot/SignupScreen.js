import React from 'react';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Animated } from 'react-native';
import { withNamespaces } from 'react-i18next';
import validate from 'validate.js';
import Icon from 'react-native-vector-icons/FontAwesome';

import SignupForm from '../../components/forms/SignupForm';
import signup from '../../validations/signup';


const SignupBackground = require('../../assets/img/signup_background.png');
const Logo = require('../../assets/img/logo-text/logo-text.png');
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Platform,
  StatusBar
} from 'react-native';

import { userRegister } from '../../actions/authActions';





import themes from '../../styleTheme';
const colors = themes.base.colors;



class SignupScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      email: "",
      errors: {}

    };

    this.register = this.register.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.onChangePassConfirm = this.onChangePassConfirm.bind(this);
  }


  onChangeEmail(text) {
    this.setState({email: text});
  }
  onChangeName(text) {
    this.setState({name: text});
  }
  onChangePass(text) {
    this.setState({password: text});
  }
  onChangePassConfirm(text) {
    this.setState({passwordConfirm: text});
  }


  register() {

    const {email, password, name, passwordConfirm} = this.state;
    this.setState({errors: {}});

    const validationErrors = validate({
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm
    }, signup);


    if (validationErrors) {
      this.setState({errors: validationErrors});

    } else {
      this.props.userRegister({
        email, password, name
      });
    }
  }
  render() {
    //Eventuali errori dati dal server (email già esistente o altri)
    //Sono diversi da quelli in this.state.errors, quelli sono errori di convalida fatti lato client
    const { errorMessage } = this.props;
    const { isLoading } = this.props;



    // TODO: Gestire tutti gli eventuali errori del server (per ora gestiamo solo il Conflict 409: Email già esistente)
    return (

      <ImageBackground source={SignupBackground} style={styles.container}>

        <StatusBar barStyle="dark-content" backgroundColor={colors.primary.default}/>
        <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1, justifyContent: 'center'}}>
          <Image source={Logo} style={{height: 32, width: '100%', marginBottom: 32,}} resizeMode={"contain"}/>
          <View style={styles.formContainer}>
            <SignupForm
              isLoading={isLoading}
              onChangeTextName={this.onChangeName}
              onChangeTextPassword={this.onChangePass}
              onChangeTextEmail={this.onChangeEmail}
              onChangeTextPasswordConfirm={this.onChangePassConfirm}
              emailError={this.state.errors.email ? this.state.errors.email[0] : errorMessage}
              nameError={this.state.errors.name ? this.state.errors.name[0] : ""}
              passwordError={this.state.errors.password ? this.state.errors.password[0] : ""}
              passConfirmError={this.state.errors.passwordConfirm ? this.state.errors.passwordConfirm[0]: ""}
              onSubmit={this.register}
            />
          </View>
        </KeyboardAwareScrollView>


      </ImageBackground>
    )
  }
}








const styles = StyleSheet.create({
  container: {
    flex:1,

    paddingTop: 64,
    backgroundColor: themes.base.backgroundColor,
    flexDirection: 'column',
    justifyContent: 'center',


    height: null,
    width: null,

  },
  formContainer: {
    marginTop:32,
    marginLeft: 16,
    marginRight: 16,
    justifyContent: 'flex-end'
  }

});

const mapStateToProps = (state, props) => {
  const registerError = state.auth.registerError;
  let errorMessage = null;
  if (registerError && registerError.status == 409) {
    errorMessage = props.t("auth.login.usedEmail")
  }
  return ({
    errorMessage,
    isLoggedIn: state.auth.isLoggedIn,
    isLoading: state.loading > 0
  });
};
export default withNamespaces()(connect(mapStateToProps, { userRegister })(SignupScreen));
