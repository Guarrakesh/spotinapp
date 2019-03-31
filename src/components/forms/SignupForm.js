

import React from 'react';
import { Text, Platform, TouchableNativeFeedback } from 'react-native';
import { View, Input , Button }   from '../common';
import { withNamespaces } from 'react-i18next';
import Icon from "react-native-vector-icons/FontAwesome";


import PropTypes from 'prop-types';
import themes from '../../styleTheme';


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

  const { t } = props;
  return (
      <View style={styles.container}>
        <Input
            placeholder={t("auth.register.fullname")}
            id="name"

            rightIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
            rightIcon={props.nameError ?  <Icon name="times" color={colors.danger.default} size={18}/> : <Icon name="user" size={18}/>}
            shake={props.nameError}
            onChangeText={props.onChangeTextName}
            displayError={true}
            errorMessage={<Text>{props.nameError || ""}</Text>}
            blurOnSubmit={true}
        />
        <Input
            placeholder={t("common.email")}

            id="email"

            containerStyle={styles.inputOuterContainer}
            rightIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
            rightIcon={props.emailError ? <Icon name="times" color={colors.danger.default} size={18}/> : <Icon name="envelope" size={18}/>}

            autoCapitalize="none"
            shake={props.emailError}

            onChangeText={props.onChangeTextEmail}
            displayError={true}
            errorMessage={<Text>{props.emailError || ""}</Text>}
            blurOnSubmit={true}
        />
        <Input
            placeholder={t("common.password")}

            id="password"
            rightIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
            rightIcon={props.passwordError ? <Icon name="times" color={colors.danger.default} size={18}/> : <Icon name="key" size={18}/> }
            displayError={true}
            errorMessage={<Text numberOfLines={1} ellipsizeMode="tail">{props.passwordError || ""}</Text>}

            onChangeText={props.onChangeTextPassword}
            secureTextEntry={true}
            shake={props.passwordError}
            blurOnSubmit={true}
        />
        <Input
            placeholder={t("common.passwordConfirm")}
            id="passwordConfirm"
            rightIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
            rightIcon={props.passConfirmError ? <Icon name="times" color={colors.danger.default} size={18}/> : <Icon name="key" size={18}/>}

            errorMessage={<Text>{props.passConfirmError || "" }</Text>}
            shake={props.passConfirmError}
            displayError={true}
            onChangeText={props.onChangeTextPasswordConfirm}
            secureTextEntry={true}

            blurOnSubmit={true}
        />

        <Button
            round
            uppercase
            variant={"primary"}
            loading={props.isLoading}
            disabled={props.isLoading}
            onPress={props.onSubmit}
          >{t("auth.register.button")}</Button>


      </View>
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
    justifyContent: 'center',
    alignItems: 'center'

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
};
export default withNamespaces()(SignupForm);