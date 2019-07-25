import React from 'react';
import {withNamespaces} from "react-i18next";
import { StyleSheet, View, Text } from 'react-native';
import {Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {Button} from "../../components/common";
import themes from "../../styleTheme";
const colors = themes.base.colors;

const SignInForm = ({ t }) => {

  const [ formErrors, setFormErrors ] = React.useState({});
  const [{email, pass}, setFormValues] = React.useState({});
  const [termsVisible, setTermsVisible] = React.useState(false);
  return (
      <View style={styles.container}>
        <Text>
          ciapciao
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
}


const styles = StyleSheet.create({
  container: {
    width: '100%',

    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    ...themes.base.elevations.depth2
  },
});

export default withNamespaces()(SignInForm);