import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {
  Platform,
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  StatusBar,
  LayoutAnimation,
  UIManager
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";


import validations from '../../validations/forgotPassword';
import auth from '../../api/auth';
import { showNotification, hideNotification } from '../../actions/notificationActions';
import { fetchStart, fetchEnd } from '../../actions/fetchActions';


import { Button, Input, Typography } from '../../components/common';
import themes from '../../styleTheme';

const Background = require('../../assets/img/patterns/liquid-cheese.png');
const forgotPassword = auth.forgotPassword;
const colors = themes.base.colors;


class ForgotPasswordScreen extends React.Component {

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
        this.setState({errors: validationErrors});

      } else {

        const self = this;
        self.props.hideNotification();

        self.props.fetchStart();
        forgotPassword(email)
            .then(response => {
              LayoutAnimation.configureNext(this.CustomLayoutAnimation);
              this.setState({index: 1});
            })
            .catch(error => {
              if (error && error.status === 404) {
                self.props.showNotification("Non abbiamo trovato account con questa email.", "warning",
                    { title: "Email non esistente" }
                );
              } else {
                self.props.showNotification("Qualcosa è andato storto.", "danger", {title: "Ops..."});
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
      const { isLoading } = this.props;



      return (

          <ImageBackground source={Background} style={styles.container}>

            <StatusBar barStyle="dark-content" translucent backgroundColor={"transparent"}/>
            <View style={[styles.formContainer, this.state.index === 0 ? {flex: 1, opacity: 1} : {flex: 0,height: 0, opacity: 0} ]}>
              <Typography h4 gutterBottom align="center">{"Password dimenticata?"}</Typography>
              <Typography gutterBottom align="center">{"Inserisci la tua email e ti invieremo le istruzioni per reimpostare la tua password"}</Typography>
              <Input
                  placeholder="Email"
                  id="email"
                  value={email}
                  inputOuterContainer={{marginTop: 16}}
                  autoCapitalize="none"
                  shake={!!errors.email}
                  onChangeText={(email) => this.setState({email})}
                  displayError={true}
                  errorMessage={<Typography variant="danger">{errors.email ? errors.email[0] : ""}</Typography>}
                  blurOnSubmit={true}
              />
              <Button variant="primary"
                      loading={isLoading}
                      disabled={isLoading}
                      onPress={this.submit}
                      capitalize
                      buttonStyle={{marginTop: 16}}
                      clear
                      round>Reimposta password</Button>
            </View>
            <View style={[styles.confirm, this.state.index === 1 ? {flex: 1, opacity: 1} : {flex: 0, height: 0, opacity: 0}]}>
              <Icon name="check-circle" size={48} style={styles.successIcon}/>
              <Typography h3 variant="accent">Controlla la tua email</Typography>
              <Typography>Ti abbiamo inviato le istruzioni per reimpostare la tua password.</Typography>
            </View>


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
  successIcon: {
    marginBottom: 16,
    color: colors.accent.default
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
  }

});

  const mapStateToProps = (state) => {

  return ({
    isLoading: state.loading > 0,
    notification: state.notifications[0]
  });
};
  export default connect(mapStateToProps, { showNotification, fetchEnd, fetchStart, hideNotification })(ForgotPasswordScreen);
