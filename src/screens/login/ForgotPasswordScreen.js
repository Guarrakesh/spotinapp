import React from 'react';
import {withNamespaces} from 'react-i18next';
import {LayoutAnimation, Platform, StatusBar, StyleSheet, TextInput, UIManager, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {G} from "react-native-svg";
import Icon from "react-native-vector-icons/FontAwesome";
import {connect} from 'react-redux';
import validate from 'validate.js';
import {fetchEnd, fetchStart} from '../../actions/fetchActions';
import {hideNotification, showNotification} from '../../actions/notificationActions';
import auth from '../../api/auth';


import {Button, Typography} from '../../components/common';
import themes from '../../styleTheme';
import validations from '../../validations/forgotPassword';
import signInStyles from './signInFormStyles';
import SvgWave from "./SvgWave";


const Background = require('../../assets/img/patterns/liquid-cheese.png');
const forgotPassword = auth.forgotPassword;
const colors = themes.base.colors;


class ForgotPasswordScreen extends React.Component {

  handleErrorTextRef = ref => this.errorTextRef = ref;

  constructor() {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    super();
    this.state = {
      email: "",
      errors: {},

      index: 0,
    };

    this.submit = this.submit.bind(this);


    this.CustomLayoutAnimation =
        Platform.select({
          ios: {
            duration: 300,
            create: {
              type: LayoutAnimation.Types.spring,
              property: LayoutAnimation.Properties.opacity,
            },
            update: {
              type: LayoutAnimation.Types.curveEaseInEaseOut,
              property: LayoutAnimation.Properties.opacity
            },
          },
          android: LayoutAnimation.Presets.spring
        });
  }


  submit() {

    const {email} = this.state;
    this.setState({errors: {}});

    const validationErrors = validate({
      email
    }, validations);


    if (validationErrors) {
      console.log(validationErrors);
      this.errorTextRef.bounceIn(800);
      return this.setState({errors: validationErrors});

    } else {

      const self = this;

      const { t } = self.props;
      self.props.hideNotification();

      self.props.fetchStart();
      forgotPassword(email)
          .then(response => {
            LayoutAnimation.configureNext(this.CustomLayoutAnimation);
            this.setState({index: 1});
          })
          .catch(error => {
            if (error && error.status === 404) {
              self.props.showNotification(t("auth.passwordForgot.notification.failure.message"), "warning",
                  { title: t("auth.passwordForgot.notification.failure.title") }
              );
            } else {
              self.props.showNotification(t("common.notificationFailure.message"), "danger", {
                title: t("common.notificationFailure.title")
              });
            }
          })
          .finally(() => {
            this.props.fetchEnd();
          })
    }
  }
  render() {
    //Eventuali errori dati dal server (email già esistente o altri)
    //Sono diversi da quelli in this.state.errors, quelli sono errori di convalida fatti lato client
    const { errors, email, } = this.state;
    const { isLoading, t } = this.props;



    return (
        <React.Fragment>

          <G>
            <SvgWave pathProps={{fill: themes.base.colors.accent.default}}/>
            <SvgWave pathProps={{scale: 1.5, fill: themes.base.colors.accent.dark}}/>

          </G>


          <StatusBar barStyle="dark-content" translucent backgroundColor={"transparent"}/>
          <View style={[styles.formContainer, this.state.index === 0 ? {flex: 1, opacity: 1} : {flex: 0,height: 0, opacity: 0} ]}>
            <Typography h4 gutterBottom align="center" color="white">{t("auth.passwordForgot.title")}</Typography>
            <Typography gutterBottom align="center" color="white">{t("auth.passwordForgot.subtitle")}</Typography>
            <View style={[styles.inputOuterContainer,errors.email ? styles.inputError : {}]}>
              <Icon size={18} name="envelope" style={[styles.inputIcon, errors.email ? styles.iconError : {}]}/>
              <TextInput
                  onChangeText={email =>  this.setState({email: email.trim()})}
                  numberOfLines={1}
                  allowFontScaling
                  autoCapitalize={false}
                  value={email}
                  textContentType='emailAddress'
                  keyboardType='email-address'
                  style={[
                    styles.input,

                  ]}
                  placeholder={t("common.email")}
                  placeholderTextColor={themes.base.inputPlaceholderColor}

              />
            </View>
            <Button variant="accent"
                    clear
                    loading={isLoading}
                    disabled={isLoading}
                    onPress={this.submit}
                    uppercase
                    block

                    round>{t("auth.passwordForgot.button")}</Button>
            <Animatable.Text style={[{opacity: 0},styles.errorText]}
                             ref={this.handleErrorTextRef}>{errors.email}</Animatable.Text>

          </View>
          <View style={[styles.confirm, this.state.index === 1 ? {flex: 1, opacity: 1} : {flex: 0, height: 0, opacity: 0}]}>
            <Icon name="check-circle" size={48} style={styles.successIcon}/>
            <Typography h3 color="white" variant="accent">{t("auth.passwordForgot.notification.success.title")}</Typography>
            <Typography color="white">{t("auth.passwordForgot.notification.success.message")}</Typography>
          </View>
        </React.Fragment>


    )
  }
}

const styles = StyleSheet.create({
  ...signInStyles,
  container: {
    flex:1,
    paddingTop: 64,
    backgroundColor: themes.base.backgroundColor,
    flexDirection: 'column',
    justifyContent: 'center',


    height: null,
    width: null,

  },
  successIcon: {
    marginBottom: 16,
    color: colors.white.default
  },
  confirm: {
    paddingLeft: 32,
    paddingRight: 32,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formContainer: {
    marginTop:32,
    marginLeft: 16,
    marginRight: 16,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: null,
  },
  inputOuterContainer: {
    ...signInStyles.inputOuterContainer,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'transparent',
  },
  inputError: {
    borderWidth: 2,
    borderColor: colors.danger.light,
  },
  iconError: {
    color: colors.danger.light,
  },
  errorText: {
    position: 'absolute',
    bottom: 24,
    fontWeight: '700',
    color: colors.danger.light,
    letterSpacing: 0.5,
  }

});

const mapStateToProps = (state) => {

  return ({
    isLoading: state.loading > 0,
    notification: state.notifications[0]
  });
};
export default
connect(mapStateToProps, { showNotification, fetchEnd, fetchStart, hideNotification })
(withNamespaces()(ForgotPasswordScreen));
