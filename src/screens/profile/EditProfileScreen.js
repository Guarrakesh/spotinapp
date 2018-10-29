import React from 'react';
import {connect} from "react-redux";
import Permissions from 'react-native-permissions';
import AndroidOpenSettings from 'react-native-android-open-settings'
import {View, StyleSheet, ImageBackground, Text, Platform, ScrollView, CameraRoll, TouchableOpacity} from "react-native";
import {Button, Input} from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import validate from 'validate.js';
import profileUpdate from '../../validations/profileUpdate';
import themes from "../../styleTheme";
import {Fonts} from "../../components/common/Fonts";
import {ProfileController} from "../../controllers/ProfileController";
import {userCheck, userLogout} from "../../actions/authActions";
import {updateProfile} from "../../actions/profile";
import {crudDelete} from "../../actions/dataActions";
import Images from "../../assets/images";

const colors = themes.base.colors;
const BackgroundPattern = require('../../assets/img/wave_pattern.png');
const userIcon = Images.icons.barIcons.profileSelected;

class EditProfileScreen extends React.Component{

  state = {
    userId: "",
    name: "",
    email: "",
    picture: "",
    password: "",
    passwordConfirm: "",
    errors: {}
  }

  componentDidMount(){
    const {userId} = this.props;
    const {name, email, picture} = this.props.profile;
    this.setState({userId, name, email, picture});
  }

  handleEditPhotoPress = () => {
    //cambio immagine del profilo, valutare react-native-image-picker
    console.log('CAMBIO IMMAGINE');
  };

  updateProfile() {
    const {name, email, password, passwordConfirm} = this.state;
    this.setState({errors: {}});

    const validationErrors = (password === "" || passwordConfirm === "") ?
      validate({
        name,
        email,
      }, profileUpdate)
      :
      validate({
      name,
      email,
      password,
      passwordConfirm
    }, profileUpdate)


    if(validationErrors) {
      this.setState({errors: validationErrors});
    }
    else{
      console.log('Nessun errore!')
      this.dispatch(updateProfile(this.state));
    }
  }

  render(){

    const profile = this.props.profile;

    return(

      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.userImage} onPress={this.handleEditPhotoPress}>
            <ImageBackground
              source={profile.picture ? {uri: profile.picture } : userIcon}
              style={{width: 100, height: 100, alignItems: 'center', justifyContent: 'flex-end'}}
              >
              <View style={{padding: 5, backgroundColor: 'rgba(255,255,255,.8)', borderRadius: 20}}>
                <Icon name={"photo-camera"} size={20} color={colors.text.default}/>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <ImageBackground
            source={BackgroundPattern} style={{height: '100%', width: '100%', marginTop: -20}}
          >
            <View style={styles.middleContainerStyle}>
              <Text style={styles.labelOnInput}>Username</Text>
              <Input
                value={this.state.name}
                containerStyle={styles.inputOuterContainer}
                inputContainerStyle={{borderBottomWidth: 0}}
                inputStyle={styles.textInputStyle}
                autoCapitalize="none"
                displayError={true}
                errorStyle={styles.errorMessage}
                errorMessage={<Text>{this.state.errors.name ? this.state.errors.name[0] : ""}</Text>}
                shake={true}
                numberOfLines = {1}
                onChangeText={(text) => this.setState({name: text})}
                onSubmitEditing={() => {
                  this.refs.email.focus()
                }}
              />
              <Text style={styles.labelOnInput}>Email</Text>
              <Input
                value={this.state.email}
                ref={"email"}
                placeholderTextColor={themes.base.inputPlaceholderColor}
                containerStyle={styles.inputOuterContainer}
                inputContainerStyle={{borderBottomWidth: 0}}
                inputStyle={styles.textInputStyle}
                autoCapitalize="none"
                displayError={true}
                errorStyle={styles.errorMessage}
                errorMessage={<Text>{this.state.errors.email ? this.state.errors.email[0] : ""}</Text>}
                shake={true}
                numberOfLines = {1}
                onChangeText={(text) => this.setState({email: text})}
                onSubmitEditing={() => {
                  this.refs.password.focus()
                }}
              />
              <Text style={styles.labelOnInput}>Password</Text>
              <Input
                placeholder={"Inserisci la nuova password"}
                placeholderTextColor={themes.base.inputPlaceholderColor}
                ref={"password"}
                containerStyle={[styles.inputOuterContainer]}
                inputContainerStyle={{borderBottomWidth: 0}}
                inputStyle={styles.textInputStyle}
                autoCapitalize="none"
                displayError={true}
                secureTextEntry={true}
                errorStyle={styles.errorMessage}
                errorMessage={<Text>{this.state.errors.password ? this.state.errors.password[0] : ""}</Text>}
                shake={true}
                numberOfLines = {1}
                onChangeText={(text) => this.setState({password: text})}
                onSubmitEditing={() => {
                  this.refs.passwordConfirm.focus()
                }}
              />
              <Input
                placeholder={"Ripeti la password"}
                placeholderTextColor={themes.base.inputPlaceholderColor}
                ref={"passwordConfirm"}
                containerStyle={styles.inputOuterContainer}
                inputContainerStyle={{borderBottomWidth: 0}}
                inputStyle={styles.textInputStyle}
                autoCapitalize="none"
                displayError={true}
                secureTextEntry={true}
                errorStyle={styles.errorMessage}
                errorMessage={<Text>{this.state.errors.passwordConfirm ? this.state.errors.passwordConfirm[0]: ""}</Text>}
                shake={true}
                numberOfLines = {1}
                onChangeText={(text) => this.setState({passwordConfirm: text})}
                onSubmitEditing={() => {
                  this.refs.password.focus()
                }}
              />
              <Button
                title={"Aggiorna"}
                titleStyle={styles.sendButtonText}
                buttonStyle={[styles.sendButton, {borderColor: themes.base.colors.accent.default}]}
                onPress={() => {this.updateProfile()}}
              />
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    )
  }


}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: themes.base.colors.white.light,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userImage: {
    zIndex: 1,
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: themes.base.colors.accent.default,
    marginTop: themes.base.deviceDimensions.height/4,
    marginBottom: -20
  },
  middleContainerStyle: {
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    ...themes.base.elevations.depth2
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
  labelOnInput: {
    marginLeft: 24,
    color: themes.base.colors.text.default,
    fontSize: 20,
    fontFamily: Fonts.LatoBold
  },
  textInputStyle: {
    fontFamily: themes.base.fonts.LatoMedium,
    backgroundColor: colors.white.light,
    elevation: 2,
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 16,
    margin: 12,
    fontSize: 16,
  },
  sendButton: {
    paddingLeft: 48,
    paddingRight: 48,
    borderRadius: 40,
    backgroundColor: colors.white.light,
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16
  },
  sendButtonText: {
    fontFamily: Fonts.LatoBold,
    fontSize: 18,
    color: colors.accent.default
  },
  errorMessage: {
    fontFamily: Fonts.Lato,
    color: colors.danger.default,
    position: 'absolute',
    bottom: -8,
    width: '100%',
    marginLeft: 8,
  }
})

const mapStateToProps = (state) => {
  return ({
    userId: state.auth.profile ? state.auth.profile._id : undefined,
    profile: state.auth.profile
  });
};
export default connect(mapStateToProps, { userCheck, userLogout, crudDelete})(EditProfileScreen);