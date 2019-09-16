import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import {withNamespaces} from 'react-i18next';
import {Platform, StyleSheet, Text, TextInput, TouchableNativeFeedback, View, WebView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import {connect} from "react-redux";
import validate from 'validate.js';
import {Touchable} from "../../components/common";
import Button from "../../components/common/Button";
import PasswordInput from "../../components/common/PasswordInput";
import i18n from "../../i18n/i18n";
import themes from '../../styleTheme';
import loginValidation from "../../validations/signup";
import signInStyles from './signInFormStyles';
import compose from 'recompose/compose';
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


const TermsModal = ({ isVisible, onDone }) => (
    <Modal
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        isVisible={isVisible}
        style={styles.modalView}
    >
      <WebView
          source={{uri: i18n.language === "it-IT" ? "https://www.iubenda.com/privacy-policy/62969082" : "https://www.iubenda.com/privacy-policy/55322937"}}
      />
      <Touchable style={styles.privacyButton} onPress={onDone}>
        <Text style={styles.privacyButtonText}>OK</Text>
      </Touchable>
    </Modal>
)


const SignUpForm = ({ isLoading, onSubmit, ...props }) => {
  const [ formErrors, setFormErrors ] = React.useState({});
  const [formValues, setFormValues] = React.useState({});
  const [termsVisible, setTermsVisible] = React.useState(false);
  const passwordRef = useRef(null);
  const errorBoxRef = useRef(null);
  const emailRef = useRef(null);
  const handleSubmit = () => {
    const validationErrors = validate(formValues, loginValidation);
    if (validationErrors) {

      setFormErrors(validationErrors);
      errorBoxRef.current.bounceIn(800);

    } else {
      onSubmit(formValues)
    }
  };
  const { t } = props;
  const { email, password } = formValues;
  return (
      <View style={styles.container}>
        <TermsModal isVisible={termsVisible}
                    onDone={() => setTermsVisible(false)}
        />
        <View style={styles.inputOuterContainer}>
          <Icon size={18} name="user" style={styles.inputIcon}/>
          <TextInput
              onSubmitEditing={() => emailRef.current.focus()}
              placeholder={t("auth.register.fullname")}
              id="name"
              autoCapitalize
              allowFontScaling
              textContentType='name'
              onChangeText={text => setFormValues({...formValues, name: text.trim() })}
              style={styles.input}
              blurOnSubmit={true}
          />
        </View>
        <View style={styles.inputOuterContainer}>
          <Icon size={18} name="envelope" style={styles.inputIcon}/>
          <TextInput
              ref={emailRef}
              onSubmitEditing={() => passwordRef.current.focus()}
              onChangeText={email =>  setFormValues({...formValues, email: email.trim()})}
              numberOfLines={1}
              allowFontScaling
              autoCapitalize='none'
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
        <PasswordInput
            ref={passwordRef}
            placeholder={t("common.password")}
            onSubmitEditing={() => handleSubmit()}
            onChangeText={password =>  setFormValues({...formValues, password})}
            numberOfLines={1}
            value={password}
            placeholderTextColor={themes.base.inputPlaceholderColor}
        />
        <Text style={styles.policy}>
          {i18n.t("auth.terms.policyFirstPart")}
          <Text style={styles.policyAccent} onPress={() => setTermsVisible(true)}>{i18n.t("auth.terms.termsAndCond")}</Text>
          {i18n.t("auth.terms.policySecondPart")}
        </Text>
        <Button
            disabled={isLoading}
            loading={isLoading}
            block
            variant='primary'
            uppercase
            round
            containerStyle={{ marginBottom: 14, marginTop: 32 }}
         //   buttonStyle={{ borderRadius: 12, }}
            onPress={handleSubmit}
            iconContainerStyle={{alignSelf: 'flex-start'}}
        >{t("auth.register.button")}</Button>

        <Animatable.View style={[styles.errorBox, { opacity: 0}]}
                         ref={errorBoxRef}>
          <Text style={{
            fontWeight: '700',
            fontSize: 17,
            color: '#fff',
          }}>{t('auth.register.formError.title')}</Text>
          {Object.keys(formErrors).map(field => (
              <Text
                  style={{ fontWeight: '500', fontSize: 14, color: '#fff'}}
              >{formErrors[field]}</Text>
          ))}
        </Animatable.View>

      </View>
  )
};

SignUpForm.propTypes = {

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


const styles = StyleSheet.create({

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
  },
  ...signInStyles,
});
export default compose(
    connect(state => ({
      isLoading: state.ui.loading > 0,
    })),
    withNamespaces()
)(SignUpForm)