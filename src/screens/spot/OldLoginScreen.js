import React from "react";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  WebView
} from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {withNamespaces} from 'react-i18next';

import {Input} from "react-native-elements";
import {Button, Touchable, View} from '../../components/common';
import login from '../../validations/login';
import validate from 'validate.js';
import themes from "../../styleTheme";
import {oAuthFacebookLogin, userLogin} from "../../actions/authActions";
import i18n from "../../i18n/i18n";
import Modal from "react-native-modal";

const colors = themes.base.colors;

const Logo = require('../../assets/img/logo/logo.png');
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
      formErrors: {},
      termsModalVisible: false
    };

    this.login = this.login.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }

  login() {
    this.setState({formErrors: {}});
    const { password } = this.state;
    const email = this.state.email.replace(" ", "");

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
      }, "Main");
    }
  }

  forgotPassword() {
    this.props.navigation.navigate('ForgotPassword');
  }

  facebookLogin() {
    this.props.facebookLogin();
  }

  handleTermsPress() {
    this.setState({termsModalVisible: true});
  }


  render() {

    const {isLoggedIn, errorMessage, t, navigation, isLoading }  = this.props;

    const { email: emailError, password: passwordError } = this.state.formErrors;

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

      <View>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          bounces={false}
          keyboardShouldPersistTaps={"handled"}
        >
          {termsModal}
          <StatusBar
            backgroundColor={this.state.keyboardOpen ? colors.primary.default : "#9b59b6"}
            barStyle="dark-content"
          />
          <Image source={Logo} style={styles.logo} resizeMode={"contain"} />
          <Text style={styles.title} allowFontScaling={false}>{t("auth.login.title").toUpperCase()}</Text>
          <Text style={styles.subtitle} allowFontScaling={false}>{t("auth.login.subtitle")}</Text>


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
                allowFontScaling={false}
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
                allowFontScaling={false}
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
                size="big"
                containerStyle={{marginBottom: 8}}
                loadingProps={{color: colors.accent.default}}
              >{t("auth.login.signIn")}</Button>
              <Button
                loading={isLoading}
                round
                block
                uppercase
                containerStyle={[{backgroundColor: themes.commonColors.facebook}, {borderRadius: 100}]}
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
              <Text style={styles.policy}>
                {i18n.t("auth.terms.policyFirstPart")}
                <Text style={styles.policyAccent} onPress={() => this.handleTermsPress()}>{i18n.t("auth.terms.termsAndCond")}</Text>
                {i18n.t("auth.terms.policySecondPart")}
              </Text>
            </View>

        </KeyboardAwareScrollView>

      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: "#9b59b6"
  },
  logo: {
    marginTop: themes.base.deviceDimensions.height/10,
    height: 80,

  },
  title: {
    marginTop: 40,
    fontSize: 18,
    fontFamily: themes.base.fonts.LatoBlack,
    color: colors.accent.default,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  subtitle: {
    marginBottom: 20,
    marginTop: 8,
    fontSize: 16,
    fontFamily: themes.base.fonts.LatoMedium,
    color: colors.text.default,
    textAlign: 'center'
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
  policy: {
    fontSize: 12,
    fontFamily: themes.base.fonts.LatoBold,
    color: colors.text.default,
    marginBottom: 8
  },
  policyAccent: {
    color: colors.accent.default
  },

  bottomView: {
    width:'100%',
    height: 200,
    backgroundColor: colors.primary.default
  },
  modalView: {
    borderTopRightRadius: themes.base.borderRadius,
    borderTopLeftRadius: themes.base.borderRadius,
    overflow: "hidden"
  },
  privacyButton: {
    backgroundColor: themes.base.colors.accent.default,
    padding: 16,
    alignItems: "center",
    borderBottomRightRadius: themes.base.borderRadius,
    borderBottomLeftRadius: themes.base.borderRadius
  },
  privacyButtonText: {
    fontSize: 16,
    fontFamily: themes.base.fonts.LatoBold,
    color: themes.base.colors.white.default
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
