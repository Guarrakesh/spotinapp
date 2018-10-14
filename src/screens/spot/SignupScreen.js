import React from 'react';
import { connect } from 'react-redux';

import SignupForm from '../../components/forms/SignupForm';
import signup from '../../validations/signup';
import validate from 'validate.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignupBackground = require('../../assets/img/signup_background.png');
const Logo = require('../../assets/img/logo-text.png');
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


import { Animated } from 'react-native';



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



        </ImageBackground>
    )
  }
}








const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'space-between',
    paddingTop: 64,
    backgroundColor: themes.base.backgroundColor,
    flexDirection: 'column',
    justifyContent: 'center',


    height: '100%',
    width: '100%',

  },
  formContainer: {
    marginTop:32,
    marginLeft: 32,
    marginRight: 32,
    justifyContent: 'flex-end'
  }

});

const mapStateToProps = (state) => {
  const registerError = state.auth.registerError;
  let errorMessage = null;
  if (registerError && registerError.status == 409) {
    errorMessage = "Questa email è già stata usata";
  }
  return ({
    errorMessage,
    isLoggedIn: state.auth.isLoggedIn,
    isLoading: state.loading > 0
  });
};
export default connect(mapStateToProps, { userRegister })(SignupScreen);
