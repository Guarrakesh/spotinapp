import React from "react";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Text, Image, StyleSheet, ActivityIndicator, ImageBackground,
  Platform, Alert, ScrollView, KeyboardAvoidingView, TextInput } from "react-native";

import {Input, Button, Slider} from "react-native-elements";
import View from "../../components/common/View";
import themes from "../../styleTheme";
import {Fonts} from "../../components/common/Fonts";
import {VersionedImageField} from "../../components/common";

const colors = themes.base.colors

const BackgroundPattern = require('../../assets/img/wave_pattern.png');
const emailError = false

class ContactUsScreen extends React.Component{

  constructor() {
    console.log('CONTACTUS MONTATO!!!!!!!!!!!!!!!!!!!')
    super();

    this.state = {
      location: "",
      maxDistance: 0,
      people: 1,
      notes: "",
    }
  }

  showAlert() {
    Alert.alert(
      'Alert Title',
      `location: ${this.state.location}\nmaxDistance: ${this.state.maxDistance}\npeople: ${this.state.people}\nnotes: ${this.state.notes}`,
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

  render() {

    const distances = [5, 10, 20, 50, 100];

    const position = {
      lat: this.props.latitude,
      lng: this.props.longitude
    };

    return(
      <ScrollView contentContainerStyle={styles.container} >
        <Text style={styles.header}>Organizziamo l'evento per te!</Text>
        <View style={styles.eventContainer}>
          <Text style={styles.competitionName}>Serie A</Text>
          <View style={styles.eventRow}>
            <Image source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/S.S.C._Napoli_logo.svg/200px-S.S.C._Napoli_logo.svg.png"}}
                   style={{width: 48, height: 48}}
                   resizeMode={'contain'}/>
            <Text style={styles.eventName}>Napoli - Juventus</Text>
            <Image source={{uri: "https://upload.wikimedia.org/wikipedia/commons/5/51/Juventus_FC_2017_logo.png"}}
                   style={{width: 48, height: 48}}
                   resizeMode={'contain'}/>
          </View>
          <Text style={styles.eventDate}>23 agosto alle 21:30</Text>
        </View>
        <ImageBackground source={BackgroundPattern} style={{
          height: '100%',
          width: '100%',
          marginTop: -50
        }}>
          <View style={styles.middleContainerStyle}>
            <Input
              placeholder="Dove vuoi guardare l’evento ?"
              placeholderTextColor={themes.base.inputPlaceholderColor}
              leftIcon={<Icon name={"map-marker-radius"}
                              color={colors.text.default} size={25}/>}
              leftIconContainerStyle={{width: 25, height: 25, marginLeft: 0}}
              containerStyle={styles.inputOuterContainer}
              inputContainerStyle={{borderBottomWidth: 0}}
              inputStyle={styles.textInputStyle}
              autoCapitalize="none"
              errorMessage={emailError}
              displayError={true}
              errorStyle={styles.errorMessage}
              shake={true}
              onChangeText={(text) => this.setState({location: text})}

            />
            <Text style={[styles.header, {marginTop: 0}]}>Quanto sei disposto a spostarti?</Text>
            <View style={styles.distancesContainer}>
              {distances.map(dist => (
                <Button
                  title={dist + ' km'}
                  titleStyle={this.state.maxDistance === dist ? [styles.distanceTextButton, {fontFamily: Fonts.LatoBold}] : [styles.distanceTextButton, {fontFamily: Fonts.LatoLight}]}
                  buttonStyle={this.state.maxDistance === dist ? [styles.distanceButton, {borderColor: colors.accent.default}] : [styles.distanceButton, {borderColor: colors.white.light}]}
                  onPress={() => { this.setState({maxDistance: dist}) }}
                />
              ))}
            </View>
            <Text style={[styles.header, {marginTop: 8}]}>Quante persone sarete?</Text>
            <View style={styles.peopleCard} elevation={2}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.peopleText}>{this.state.people}</Text>
                <MaterialIcons name={"people"} size={25} style={styles.peopleIcon}/>
              </View>
              <Slider
                value={this.state.people}
                minimumValue={1}
                maximumValue={20}
                step={1}
                style={{justifyContent: 'center'}}
                //trackStyle={{height: 1}}
                thumbStyle={{borderWidth: 2, borderColor: colors.accent.default}}
                thumbTintColor={colors.white.light}
                onValueChange={(people) => this.setState({people})} />
            </View>
          </View>
          <View style={styles.noteCard} elevation={2}>
            <TextInput
              multiline = {true}
              numberOfLines = {4}
              placeholder={"Aggiungi eventuali note"}
              style={{textAlignVertical: "top"}}
              onChangeText={(text) => this.setState({notes: text})}
            />
          </View>
            <Button
              title={"Invia"}
              titleStyle={styles.sendButtonText}
              buttonStyle={[styles.sendButton, {borderColor: colors.accent.default}]}
              disabled={this.state.location === "" || this.state.maxDistance === 0}
              onPress={() => this.showAlert()}
            />
        </ImageBackground>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, props) => {
  const {eventId} = props.navigation.state.params;
  const { latitude, logitude } = state.location.coordinates;
  return {
    eventId, latitude, logitude
  }
}

const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
  },
  header: {
    fontFamily: Fonts.LatoBold,
    fontSize: 20,
    color: themes.base.colors.text.default,
    marginTop: 12
  },
  eventContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    width: '100%',
    padding: 16,
    paddingBottom: 0
  },
  competitionName: {
    fontFamily: Fonts.LatoLight,
    fontSize: 20,
    color: themes.base.colors.text.default
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around'
  },
  eventName: {
    fontFamily: Fonts.LatoBold,
    fontSize: 22,
    color: themes.base.colors.text.default,
    marginTop: 8,
    marginBottom: 8
  },
  eventDate: {
    fontFamily: Fonts.LatoBold,
    fontSize: 14,
    color: themes.base.colors.text.default
  },
  middleContainerStyle: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,


    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 100,

    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    ...themes.base.elevations.depth2
  },
  inputOuterContainer: {
    width:'100%',

    backgroundColor: 'transparent',

    maxHeight: 60,
    justifyContent: 'center',
    marginTop: -20,
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
  distancesContainer: {
    flexDirection: 'row',
    marginTop: 8
  },
  distanceButton: {
    borderRadius: 20,
    margin: 5,
    backgroundColor: colors.white.light,
    borderWidth: 1,
    borderColor: colors.accent.default

  },
  distanceTextButton: {
    color: colors.text.default,
    fontSize: 14,
  },
  peopleCard: {
    width: '100%',
    backgroundColor: colors.white.light,
    margin: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: themes.base.borderRadius
  },
  peopleText: {
    fontSize: 28,
    alignSelf: 'center',
    fontFamily: Fonts.LatoBold,
    color: colors.text.default
  },
  peopleIcon: {
    position: 'absolute',
    right: 16,
    color: colors.accent.default
  },
  noteCard: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    paddingTop: 8,
    backgroundColor: colors.white.light,
    borderRadius: themes.base.borderRadius,
    justifyContent: 'flex-start'
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
  }
})

export default connect(mapStateToProps)(ContactUsScreen);