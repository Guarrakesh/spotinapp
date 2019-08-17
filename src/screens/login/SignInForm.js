import React, {useRef} from 'react';
import {withNamespaces} from "react-i18next";
import {Text, TextInput, View} from 'react-native';
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome";
import {connect} from "react-redux";
import compose from "recompose/compose";
import validate from 'validate.js';
import {Button} from "../../components/common";
import PasswordInput from "../../components/common/PasswordInput";
import themes from "../../styleTheme";
import loginValidation from '../../validations/login';
import styles from './signInFormStyles';


const SignInForm = ({ t, isLoading, onSubmit, onPasswordForgot }) => {

  const [ formErrors, setFormErrors ] = React.useState({});
  const [{email, password}, setFormValues] = React.useState({});

  const passwordRef = useRef(null);
  const errorBoxRef = useRef(null);

  const [focusedInput, setFocusedInput] = React.useState();
  const handleSignIn = () => {


    const validationErrors = validate({ email, password }, loginValidation);
    if (validationErrors) {
      setFormErrors(validationErrors);
      errorBoxRef.current.bounceIn(800);

    } else {
      onSubmit(email, password)
    }
  };



  return (
      <View style={styles.container}>

        <Text style={styles.title}>
          {t('auth.login.helpText')}
        </Text>

        <View style={styles.inputOuterContainer}>
          <Icon size={18} name="envelope" style={styles.inputIcon}/>
          <TextInput
              onSubmitEditing={() => passwordRef.current.focus()}
              onChangeText={email =>  setFormValues({password, email: email.trim()})}

              allowFontScaling
              onFocus={() => setFocusedInput('email')}
              autoCapitalize='none'
              value={email}
              textContentType='emailAddress'
              keyboardType='email-address'
              style={[
                styles.input,
                focusedInput === "email" ? styles.focused : {},
              ]}
              placeholder={t("common.email")}
              placeholderTextColor={themes.base.inputPlaceholderColor}

          />
        </View>
        <PasswordInput
            ref={passwordRef}
            placeholder={t("common.password")}
            onSubmitEditing={handleSignIn}
            onChangeText={password =>  setFormValues({email, password})}
            numberOfLines={1}
            value={password}
            placeholderTextColor={themes.base.inputPlaceholderColor}
        />

        <Button
            block
            clear
            onPress={onPasswordForgot}
        > {t("auth.login.passwordForgot")}
        </Button>
        <Button
            loading={isLoading}
            disabled={isLoading}
            block
            variant='primary'
            uppercase
            round
            containerStyle={{ marginBottom: 14 }}
            buttonStyle={{ borderRadius: 12, backgroundColor: 'red'}}
            onPress={handleSignIn}
            iconContainerStyle={{alignSelf: 'flex-start'}}
        >{t("auth.login.signIn")}</Button>
        <Animatable.View style={[styles.errorBox, { opacity: 0}]}
                         ref={errorBoxRef}>
          <Text style={{
            fontWeight: '700',
            fontSize: 17,
            color: '#fff',
          }}>{t('auth.login.formError.title')}</Text>
          {Object.keys(formErrors).map(field => (
              <Text
                  style={{ fontWeight: '500', fontSize: 14, color: '#fff'}}
              >{formErrors[field]}</Text>
          ))}
        </Animatable.View>

      </View>
  )
};




export default compose(
    connect(state => ({
      isLoading: state.ui.loading > 0,
    })),
    withNamespaces()
)(SignInForm)