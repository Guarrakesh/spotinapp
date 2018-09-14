import React from "react";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import {Text, Image, StyleSheet, ActivityIndicator, ImageBackground, Platform, Animated, StatusBar} from "react-native";
import View from "../components/common/View";
import {Input, Button} from "react-native-elements";
import themes from "../styleTheme";
import {loginRequest} from "../actions/login";

const colors = themes.base.colors;


class LoginScreen extends React.Component {

  constructor() {


    super();
    this.state = {
      username: "",
      password: ""
    };

    this.login = this.login.bind(this);
  }

  login() {
    if (this.state.username == "" || this.state.password == "")
      return;


    this.props.dispatch(loginRequest(this.state.username,this.state.password));
  }
  render() {

    const {navigation} = this.props;


    return (

      <View style={styles.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <ImageBackground source={require('../images/loginBg1.jpg')} blurRadius={ Platform.OS == "ios" ? 10 : 5} style={{width: '100%', height: '100%'}}>

          <View style={styles.middleContainerStyle}>
            <Image
              source={require('../images/SpotInIconWhite.png')}
              style={{marginTop: 10, alignSelf: 'center'}}
            />
            <Text style={{marginTop: 30, marginBottom: 30, fontSize: 20, fontWeight: '700', color: colors.text.light, textAlign: 'center'}}>Entra nel tuo account</Text>
            <Input
              placeholder="username"
              leftIcon={<Icon name="user" color={colors.text.light} size={21}/>}
              leftIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
              containerStyle={styles.inputOuterContainer}
              inputContainerStyle={{borderBottomWidth: 0}}
              inputStyle={styles.textInputStyle}
              autoCapitalize="none"
              shake={true}
              onChangeText={(text) => this.setState({username: text})}
              onSubmitEditing={() => {this.refs.password.focus()}}

            />
            <Input
              placeholder="password"
              ref="password"
              leftIcon={<Icon name="key" color={colors.text.light} size={21}/>}
              containerStyle={styles.inputOuterContainer}
              leftIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
              inputContainerStyle={{borderBottomWidth: 0}}
              inputStyle={styles.textInputStyle}
              errorMessage={this.props.auth.error != null ? this.props.auth.error.message : ""}
              shake={true}
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry={true}
              onSubmitEditing={this.login}
              blurOnSubmit={true}
            />

            <Button
              disabled={this.state.username == "" || this.state.password == ""}
              disabledStyle={{opacity: 0.8, borderRadius: 100}}
              title='Sign In'
              onPress={ this.login }
              buttonStyle={styles.signInButton}
              titleStyle={{color: colors.text.light, fontSize: 16}}
              loading={this.props.auth.currentlySending}



            />
            <Button
              titleStyle={{color: colors.white.default, fontSize: 16}}
              title='Sign in with Facebook'
              buttonStyle={styles.fbSignInButton}
              icon={<Icon
                name='facebook'
                size={18}
                color='white'
              />
              }
              iconContainerStyle={{alignSelf: 'flex-start'}}
            />


            <Button
              title='Forgot your password?'
              titleStyle={{ color: colors.text.light, fontSize: 16 }}
              buttonStyle={{marginTop: 8, backgroundColor: '', shadowOpacity: 0}}
              clear={true}

            />
          </View>


          <Button
            clear={true}
            title={['Do not have an account? ', <Text style={{fontWeight: '700'}}>Create one</Text>]}
            titleStyle={{ color: colors.accent.default, fontSize: 14, alignSelf: 'center'}}
            buttonStyle={styles.signUpButton}
            onPress={() => this.props.navigation.navigate('SignUp')}
          />

        </ImageBackground>
      </View>


    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex:1,

    alignItems: 'center',

    flexDirection: 'column',

    width: '100%',

  },
  inputOuterContainer: {
    width:'100%',
    borderWidth: 0,
    marginBottom: 26
  },

  textInputStyle: {
    paddingBottom: 8,
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: colors.text.light,
    color: colors.text.light

  },
  middleContainerStyle: {
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,
    height: '85%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,


    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    ...themes.base.elevations.depth2
  },
  signInButton: {
    position: 'relative',
    borderRadius: 100,
    backgroundColor: colors.accent.default,

    marginTop: 0,
    height: 43,
    justifyContent: 'center',


  },
  fbSignInButton: {
    borderRadius: 100,
    backgroundColor: themes.commonColors.facebook,
    marginTop: 8,
    height: 43,
  },
  signUpButton: {

    //marginTop: 20,
    backgroundColor: colors.white.light,
    height: 47,
    marginTop: 24,
    width: '90%',
    borderRadius: 100,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.accent.default,
    ...themes.base.elevations.depth0
  }
});

const mapStateToProps = (state) => {
  return ({
    auth: state.auth
  });
};
export default connect(mapStateToProps)(LoginScreen);
