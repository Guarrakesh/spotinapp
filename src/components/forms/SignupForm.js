

import React from 'react';
import  View   from '../common/View';
import { Text, Platform, TouchableNativeFeedback } from 'react-native';
import {Input } from 'react-native-elements';
import { Button } from '../common';

import PropTypes from 'prop-types';
import themes from '../../styleTheme';
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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


const colors = themes.base.colors;

const SignupForm = props => {

  return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Input
            placeholder="Nome completo"
            id="name"
            containerStyle={styles.inputOuterContainer}
            rightIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
            rightIcon={props.nameError ?  <Icon name="times" color={colors.danger.default} size={18}/> : <Icon name="user" size={18}/>}
            inputContainerStyle={{borderBottomWidth: 0}}
            inputStyle={styles.textInputStyle}
            errorStyle={styles.error}
            shake={props.nameError}
            onChangeText={props.onChangeTextName}
            displayError={true}
            errorMessage={<Text>{props.nameError || ""}</Text>}
            blurOnSubmit={true}
        />
        <Input
            placeholder="Email"

            id="email"

            containerStyle={styles.inputOuterContainer}
            rightIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
            rightIcon={props.emailError ? <Icon name="times" color={colors.danger.default} size={18}/> : <Icon name="envelope" size={18}/>}

            inputContainerStyle={{borderBottomWidth: 0}}
            inputStyle={styles.textInputStyle}
            autoCapitalize="none"
            shake={props.emailError}
            errorStyle={styles.error}
            onChangeText={props.onChangeTextEmail}
            displayError={true}
            errorMessage={<Text>{props.emailError || ""}</Text>}
            blurOnSubmit={true}
        />
        <Input
            placeholder="Password"

            id="password"
            containerStyle={styles.inputOuterContainer}
            rightIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
            rightIcon={props.passwordError ? <Icon name="times" color={colors.danger.default} size={18}/> : <Icon name="key" size={18}/> }
            inputContainerStyle={{borderBottomWidth: 0}}
            inputStyle={styles.textInputStyle}
            displayError={true}
            errorMessage={<Text numberOfLines={1} ellipsizeMode="tail">{props.passwordError || ""}</Text>}
            errorStyle={styles.error}

            onChangeText={props.onChangeTextPassword}
            secureTextEntry={true}
            shake={props.passwordError}
            blurOnSubmit={true}
        />
        <Input
            placeholder="Conferma password"
            id="passwordConfirm"

            containerStyle={styles.inputOuterContainer}
            rightIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
            rightIcon={props.passConfirmError ? <Icon name="times" color={colors.danger.default} size={18}/> : <Icon name="key" size={18}/>}
            inputContainerStyle={{borderBottomWidth: 0}}
            inputStyle={styles.textInputStyle}
            errorStyle={styles.error}
            errorMessage={<Text>{props.passConfirmError || "" }</Text>}
            shake={props.passConfirmError}
            displayError={true}
            onChangeText={props.onChangeTextPasswordConfirm}
            secureTextEntry={true}

            blurOnSubmit={true}
        />

        <Button
            clear
            rounded={true}
            variant={"primary"}
            loading={props.isLoading}
            title={'Registrati'.toUpperCase()}

          //  buttonStyle={styles.signUpButton}
            onPress={props.onSubmit}
        />


      </KeyboardAwareScrollView>
  )
};

SignupForm.propTypes = {

  emailError: PropTypes.string,
  passwordError: PropTypes.string,
  nameError: PropTypes.string,
  passConfirmError: PropTypes.string,
  onChangeTextPasswordConfirm: PropTypes.func.isRequired,
  onChangeTextPassword: PropTypes.func.isRequired,
  onChangeTextName: PropTypes.func.isRequired,
  onChangeTextEmail: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};


const styles = {
  container: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between'
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
  error: {
    position: 'absolute',
    bottom: -8,
    width: '100%',
    left: 8,

    color: colors.danger.default,
    fontWeight: '500'
  },
  signUpButton: {
      zIndex: 999,
    //marginTop: 20,
    backgroundColor: colors.accent.default,
    height: 40,
    elevation: 2,

    width: '100%',
    borderRadius: 100,
    marginTop: 32,
    marginBottom: 8,

    alignSelf: 'flex-end',
    ...themes.base.elevations.depth1,
  }
}
export default SignupForm;