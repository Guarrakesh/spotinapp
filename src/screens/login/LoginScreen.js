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

        <Login/>
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
    position: "absolute",
    top: height / 3,
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
