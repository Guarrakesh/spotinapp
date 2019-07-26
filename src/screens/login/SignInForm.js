import React, {useState, useEffect, useRef} from 'react';
import {withNamespaces} from "react-i18next";
import {StyleSheet, View, Text, TextInput, Animated, Dimensions} from 'react-native';
import {Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {Button} from "../../components/common";
import themes from "../../styleTheme";
import validate from 'validate.js';
import loginValidation from '../../validations/login';

const colors = themes.base.colors;

const SignInForm = ({ t, onSignIn }) => {

  const [ formErrors, setFormErrors ] = React.useState({});
  const [{email, pass}, setFormValues] = React.useState({});
  const [termsVisible, setTermsVisible] = React.useState(false);
  const passRef = useRef(null);

  const [errorBoxOpacity] = React.useState(new Animated.Value(0));

  const [focusedInput, setFocusedInput] = React.useState();
  const handleSignIn = () => {
    setFormErrors({});
    errorBoxOpacity.stopAnimation();
    const validationErrors = validate({ email, password: pass }, loginValidation);
    if (validationErrors) {
      setFormErrors(validationErrors);
    } else {
      onSignIn(email, pass)
    }
  };
  useEffect(() => {
    Animated.spring(errorBoxOpacity, {
      toValue: Object.keys(formErrors).length > 0 ? 1 : 0,
    }).start();

  })
  return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {t('auth.login.helpText')}
        </Text>
        <TextInput
            onSubmitEditing={() => passRef.current.focus()}
            onChangeText={email =>  setFormErrors({pass, email: email.trim()})}
            numberOfLines={1}
            allowFontScaling
            onFocus={() => setFocusedInput('email')}
            autoCapitalize
            style={[
              styles.inputOuterContainer,
              focusedInput === "email" ? styles.focused : {},
            ]}
            placeholder={t("common.email")}
            placeholderTextColor={themes.base.inputPlaceholderColor}

        />
        <TextInput
            ref={passRef}
            onSubmitEditing={() => passRef.current.focus()}
            onChangeText={pass =>  setFormErrors({pass, email})}
            numberOfLines={1}
            allowFontScaling
            onFocus={() => setFocusedInput('pass')}
            autoCapitalize
            style={[
              styles.inputOuterContainer,
              focusedInput === "pass" ? styles.focused : {},
            ]}
            placeholder={t("common.password")}
            secureTextEntry={true}
            placeholderTextColor={themes.base.inputPlaceholderColor}

        />
        <Button
            block
            variant='primary'
            uppercase
            round
            containerStyle={{ marginBottom: 14 }}
            buttonStyle={{ borderRadius: 12, backgroundColor: 'red'}}
            onPress={handleSignIn}
            iconContainerStyle={{alignSelf: 'flex-start'}}
        >{t("auth.login.signIn")}</Button>
        <Animated.View style={[styles.errorBox, {opacity: errorBoxOpacity}]}>
          {Object.keys(formErrors).map(field => (
            <Text style={{
              fontWeight: '700',
              fontSize: 17,
              color: '#fff',
            }}>{formErrors[field]}</Text>
          ))}
        </Animated.View>
        {/*  <Input*/}
        {/*      placeholder={t("common.email")}*/}
        {/*      placeholderTextColor={themes.base.inputPlaceholderColor}*/}
        {/*      leftIcon={<Icon name={emailError ? "times" : "user"}*/}
        {/*                      color={emailError ? colors.danger.default : colors.text.default} size={21}/>}*/}
        {/*      leftIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}*/}
        {/*      containerStyle={styles.inputOuterContainer}*/}
        {/*      inputContainerStyle={{borderBottomWidth: 0}}*/}
        {/*      inputStyle={styles.textInputStyle}*/}
        {/*      autoCapitalize="none"*/}
        {/*      allowFontScaling={false}*/}
        {/*      errorMessage={emailError}*/}
        {/*      displayError={true}*/}
        {/*      errorStyle={styles.errorMessage}*/}
        {/*      shake={true}*/}
        {/*      numberOfLines = {1}*/}
        {/*      onChangeText={(text) => this.setState({email: text})}*/}
        {/*      onSubmitEditing={() => {*/}
        {/*        this.refs.password.focus()*/}
        {/*      }}*/}

        {/*  />*/}

        {/*  <Input*/}
        {/*      placeholder={t("common.password")}*/}
        {/*      ref="password"*/}
        {/*      placeholderTextColor={themes.base.inputPlaceholderColor}*/}
        {/*      leftIcon={<Icon name={passwordError ? "times" : "key"}*/}
        {/*                      color={passwordError ? colors.danger.default : colors.text.default} size={21}/>}*/}
        {/*      containerStyle={styles.inputOuterContainer}*/}
        {/*      leftIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}*/}
        {/*      inputContainerStyle={{borderBottomWidth: 0}}*/}
        {/*      inputStyle={styles.textInputStyle}*/}
        {/*      allowFontScaling={false}*/}
        {/*      //errorMessage={this.props.auth.error != null ? this.props.auth.error.message : ""}*/}
        {/*      shake={errorMessage !== null }*/}
        {/*      onChangeText={(text) => this.setState({password: text})}*/}
        {/*      secureTextEntry={true}*/}
        {/*      errorMessage={passwordError}*/}
        {/*      displayError={true}*/}
        {/*      errorStyle={styles.errorMessage}*/}
        {/*      onSubmitEditing={this.login}*/}
        {/*      blurOnSubmit={true}*/}
        {/*      numberOfLines = {1}*/}
        {/*  />*/}
        {/*  <Button*/}
        {/*      block*/}
        {/*      clear*/}
        {/*      onPress={this.forgotPassword}*/}
        {/*  > {t("auth.login.passwordForgot")}*/}
        {/*  </Button>*/}

        {/*  <Button*/}
        {/*      disabled={isLoading || this.state.username === "" || this.state.password === ""}*/}
        {/*      round*/}
        {/*      variant="primary"*/}
        {/*      uppercase*/}
        {/*      onPress={this.login}*/}
        {/*      block*/}
        {/*      loading={isLoading}*/}
        {/*      size="big"*/}
        {/*      containerStyle={{marginBottom: 8}}*/}
        {/*      loadingProps={{color: colors.accent.default}}*/}
        {/*  >{t("auth.login.signIn")}</Button>*/}
      </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',

    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    ...themes.base.elevations.depth2
  },
  title: {
    marginBottom: 24,
    fontWeight: '800',
    fontSize: 18,
    color: colors.text.default,
  },
  errorBox: {
    position: 'absolute',
    width: '100%',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: themes.base.colors.danger.light,
    minHeight: 40,
    bottom: -60,
    borderRadius: 6,

  },
  inputOuterContainer: {
    alignSelf: 'stretch',
    textAlign: 'center',
    borderRadius: 100,
    shadowColor: '#000000',
    shadowOpacity: 0.13,
    shadowRadius: 30,
    shadowOffset: { width: 3, height: 10 },
    fontSize: 18,
    color: colors.text.default,
    fontWeight: '500',
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 16,
  },
  focused: {
    shadowColor: themes.base.colors.accent.dark,
    shadowRadius: 15,
  }
});

export default withNamespaces()(SignInForm);