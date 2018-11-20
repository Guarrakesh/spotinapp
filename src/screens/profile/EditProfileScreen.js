import React from 'react';
import { omitBy, isEmpty, pick, isEqual, omit} from 'lodash';

import {connect} from "react-redux";
import {View, StyleSheet, ImageBackground, Text, Platform, ScrollView, CameraRoll, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import validate from 'validate.js';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Button, Input, Typography, Touchable } from '../../components/common';
import profileUpdate from '../../validations/profileUpdate';
import themes from "../../styleTheme";
import {userCheck, userLogout} from "../../actions/authActions";
import {updateProfile} from "../../actions/profile";
import {crudDelete} from "../../actions/dataActions";
import Images from "../../assets/images";

const colors = themes.base.colors;
const BackgroundPattern = require('../../assets/img/patterns/liquid-cheese.png');
const userIcon = Images.icons.barIcons.profileSelected;
const Fonts = themes.base.fonts;
class EditProfileScreen extends React.Component{

  state = {
    userId: "",
    name: "",
    picture: "",
    password: "",
    passwordConfirm: "",
    errors: {},
    canSubmit: false
  };

  constructor(props) {
    super(props);

  }
  componentDidMount(){
    const { userId } = this.props;
    const { name, picture } = this.props.profile;
    this.setState({ userId, name, picture });
  }

  handleEditPhotoPress = () => {
    //cambio immagine del profilo, valutare react-native-image-picker
    //TODO:
  };
  handleBlur(inputName) {
    //Sull' endEditing (blur) convalido il singolo input ed eventualmente mostro l'errore

    this.state[inputName] !== "" && this.setState({errors: {...this.state.errors, [inputName]: validate.single(this.state[inputName], profileUpdate[inputName]) || {}}});
  }
  handleInputChange(inputName, inputValue) {
    this.setState({ [inputName] : inputValue });
    const { password, passwordConfirm, name } = this.state;
    //Convalido, ogni volta che cambia, l'input corrente per vedere se posso abilitare il tasto submit
    //Non aggiorno invece state.errors perché si mostrerebbero all'utente mentre scrive e sarebbe invasivo
    let validationErrors;
    if (inputName === "name") {
      validationErrors = validate.single(name, profileUpdate[inputName]);
    } else {
      validationErrors = validate({password, passwordConfirm}, omit(profileUpdate,"name"));
    }
    const newState = { canSubmit: validationErrors !== null};

    this.setState(newState);
  }
  updateProfile() {
    const {name, password, passwordConfirm, userId} = this.state;
    this.setState({errors: {}});


    const validationErrors = validate(omitBy({name, password, passwordConfirm}, isEmpty), profileUpdate);

    if(validationErrors) {
      this.setState({errors: validationErrors});
    } else {
      const self = this;
      this.props.updateProfile(omitBy({userId, name, password}, isEmpty), (payload) => {
        this.setState({...pick(self.props.profile,['name','picture']), password: "", passwordConfirm: "", canSubmit: false});
      });
    }
  }

  render(){

    const { profile, loading } = this.props;
    const { name, password, passwordConfirm, errors, canSubmit} = this.state;
    const { email } = profile;
    return(


          <ImageBackground source={BackgroundPattern} style={styles.container}>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps
                bounces={false}
            >

              <Touchable style={styles.userImage} onPress={this.handleEditPhotoPress}>
                <ImageBackground
                    source={profile.picture ? {uri: profile.picture } : userIcon}
                    style={{width: 100, height: 100, alignItems: 'center', justifyContent: 'flex-end'}}
                >
                  <View style={{padding: 5, backgroundColor: 'rgba(255,255,255,.8)', borderRadius: 20}}>
                    <Icon name={"photo-camera"} size={20} color={colors.text.default}/>
                  </View>
                </ImageBackground>
              </Touchable>
              <View style={styles.middleContainerStyle}>
                <Typography block variant="caption" style={{marginLeft: 16}} gutterBottom  uppercase h4>Username</Typography>
                <Input
                    value={name}
                    onEndEditing={() => this.handleBlur('name')}
                    block
                    autoCapitalize="none"
                    allowFontScaling={false}
                    displayError={true}
                    errorStyle={styles.errorMessage}
                    errorMessage={<Text>{errors.name ? errors.name[0] : ""}</Text>}
                    shake={true}
                    numberOfLines = {1}
                    onChangeText={(text) => this.handleInputChange("name", text)}
                    onSubmitEditing={() => this.password.focus() }
                />


                <Typography variant="caption" block align={"left"} style={{marginLeft: 16}} gutterBottom uppercase h4>Password</Typography>
                <Input
                    value={password}
                    placeholder={"Inserisci la nuova password"}
                    onEndEditing={() => this.handleBlur('password')}

                    block
                    placeholderTextColor={themes.base.inputPlaceholderColor}
                    ref={input => this.password = input}
                    autoCapitalize="none"
                    allowFontScaling={false}
                    displayError={true}
                    secureTextEntry={true}
                    errorMessage={<Text>{errors.password ? errors.password[0] : ""}</Text>}
                    shake={true}
                    numberOfLines = {1}
                    onChangeText={(text) => this.handleInputChange("password", text)}
                    onSubmitEditing={() => { this.passwordConfirm.focus() }}
                />
                <Input
                    value={passwordConfirm}
                    block
                    placeholder={"Ripeti la password"}
                    placeholderTextColor={themes.base.inputPlaceholderColor}
                    onEndEditing={() => this.handleBlur('passwordConfirm')}
                    ref={input => this.passwordConfirm = input}
                    autoCapitalize="none"
                    allowFontScaling={false}
                    displayError={true}
                    secureTextEntry={true}
                    errorMessage={<Text>{errors.passwordConfirm ? errors.passwordConfirm[0]: ""}</Text>}
                    shake={true}
                    numberOfLines = {1}
                    onChangeText={(text) => this.handleInputChange("passwordConfirm", text)}
                    onSubmitEditing={() => {
                  this.updateProfile();
                }}
                />
                <Button

                    loading={loading}
                    uppercase
                    disabled={loading || !canSubmit}
                    round

                    variant="primary"
                    onPress={() => {this.updateProfile()}}
                >{"Aggiorna"}</Button>
              </View>
            </KeyboardAwareScrollView>

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
  userImage: {
    zIndex: 1,
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: themes.base.colors.accent.default,

    marginBottom: 100,
    width: 100,
    height: 100
  },
  middleContainerStyle: {
    width: '100%',
    height: null,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    ...themes.base.elevations.depth2
  },



});

const mapStateToProps = (state) => {
  return ({
    loading: state.loading > 0,
    userId: state.auth.profile ? state.auth.profile._id : undefined,
    profile: state.auth.profile
  });
};
export default connect(mapStateToProps, { userCheck, userLogout, crudDelete, updateProfile })(EditProfileScreen);