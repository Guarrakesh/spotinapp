import React, { useRef} from 'react';
import {withNamespaces} from "react-i18next";
import {Animated, StyleSheet, Text, TextInput, View, WebView} from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import validate from 'validate.js';
import {Button, Touchable} from "../../components/common";
import i18n from "../../i18n/i18n";
import themes from "../../styleTheme";
import loginValidation from '../../validations/login';
import styles from './singInFormStyles';



const TermsModal = ({ isVisible, onDone}) => (
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

const SignInForm = ({ t, onSubmit }) => {

  const [ formErrors, setFormErrors ] = React.useState({});
  const [{email, pass}, setFormValues] = React.useState({});
  const [termsVisible, setTermsVisible] = React.useState(false);

  const passRef = useRef(null);

  const [errorBoxOpacity] = React.useState(new Animated.Value(0));
  const [errorBoxShakeX] = React.useState(new Animated.Value(30));

  const [passwordShowIcon, setPasswordShowIcon] = React.useState('eye-slash');
  const [focusedInput, setFocusedInput] = React.useState();
  const handlePasswordShowChange = () => {
    setPasswordShowIcon(passwordShowIcon === "eye-slash" ? "eye" : "eye-slash");
  };
  const handleSignIn = () => {


    const validationErrors = validate({ email, password: pass }, loginValidation);
    if (validationErrors) {
      setFormErrors(validationErrors);
      Animated.parallel([
        Animated.spring(errorBoxOpacity, {
          toValue: Object.keys(validationErrors).length > 0 ? 1 : 0,
        }),
        Animated.sequence([
          Animated.timing(errorBoxShakeX, { toValue: -30, duration: 150, }),
          Animated.timing(errorBoxShakeX, { toValue: 30, duration: 150,  }),
          Animated.timing(errorBoxShakeX, { toValue: 0, duration: 150, })
        ])


      ]).start()

    } else {
      onSubmit(email, pass)
    }
  };



  return (
      <View style={styles.container}>
        <TermsModal isVisible={termsVisible}
                    onDone={() => setTermsVisible(false)}
        />
        <Text style={styles.title}>
          {t('auth.login.helpText')}
        </Text>

        <View style={styles.inputOuterContainer}>
          <Icon size={18} name="envelope" style={styles.inputIcon}/>
          <TextInput
              onSubmitEditing={() => passRef.current.focus()}
              onChangeText={email =>  setFormValues({pass, email: email.trim()})}
              numberOfLines={1}
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
        <View style={styles.inputOuterContainer}>
          <Icon size={18} name="lock" style={styles.inputIcon}/>
          <TextInput
              ref={passRef}
              onSubmitEditing={() => handleSignIn()}
              onChangeText={pass =>  setFormValues({pass, email})}
              numberOfLines={1}
              value={pass}
              allowFontScaling
              onFocus={() => setFocusedInput('pass')}
              autoCapitalize='none'
              style={[
                styles.input,
                focusedInput === "pass" ? styles.focused : {},
              ]}
              textContentType='password'
              placeholder={t("common.password")}
              secureTextEntry={passwordShowIcon === "eye-slash"}
              placeholderTextColor={themes.base.inputPlaceholderColor}

          />
          {pass && pass.length > 0 && <Icon style={styles.passwordEyeIcon}
                                            size={18}
                                            name={passwordShowIcon}
                                            onPress={() => handlePasswordShowChange()}/>}
        </View>

        <Button
            block
            clear
            onPress={this.forgotPassword}
        > {t("auth.login.passwordForgot")}
        </Button>
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
        <Animated.View style={[
          styles.errorBox, {
            opacity: errorBoxOpacity,
            transform: [ { translateX: errorBoxShakeX}]
          }
        ]}>
          <Text style={{
            fontWeight: '700',
            fontSize: 17,
            color: '#fff',
          }}>Aspetta! Abbiamo un problema:</Text>
          {Object.keys(formErrors).map(field => (
              <Text
                  style={{ fontWeight: '500', fontSize: 14, color: '#fff'}}
              >{formErrors[field]}</Text>
          ))}
        </Animated.View>
        <Text style={styles.policy}>
          {i18n.t("auth.terms.policyFirstPart")}
          <Text style={styles.policyAccent} onPress={() => setTermsVisible(true)}>{i18n.t("auth.terms.termsAndCond")}</Text>
          {i18n.t("auth.terms.policySecondPart")}
        </Text>
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
};




export default withNamespaces()(SignInForm);