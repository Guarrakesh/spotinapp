import React from "react";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Text, StyleSheet, ActivityIndicator, ImageBackground,
  Platform, Alert, ScrollView, TextInput } from "react-native";
import { withNamespaces } from 'react-i18next';
import {createRequest} from "../../actions/requests";
import { Slider } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { View, Input, Button } from "../../components/common";
import themes from "../../styleTheme";
import {Fonts} from "../../components/common/Fonts";
import {VersionedImageField} from "../../components/common";
import moment from "moment";
import auth from '../../api/auth';
import vars from '../../vars';
import {fetchStart, fetchEnd} from "../../actions/fetchActions";
import {showNotification} from "../../actions/notificationActions";
import NavigationService from '../../navigators/NavigationService';

const colors = themes.base.colors;

const BackgroundPattern = require('../../assets/img/wave_pattern.png');

class ContactUsScreen extends React.Component{

  constructor() {
    super();

    this._sendRequest = this._sendRequest.bind(this);

    this.state = {
      userId: "",
      event: "",
      userPosition: {
        latitude: this.latitude,
        longitude: this.longitude
      },
      location: "",
      maxDistance: 0,
      numOfPeople: 1,
      notes: "",
    }
  }

  componentDidMount(){

    const {event} = this.props.navigation.state.params;

    this.setState({
      event: event._id,
      userId: this.props.userId,
      userPosition: {
        latitude: this.props.latitude,
        longitude: this.props.longitude
      }
    });
  }

  _sendRequest(){
    const {userId, event, userPosition, location, maxDistance, numOfPeople, notes } = this.state;
    //this.props.dispatch(createRequest(userId, event, location, maxDistance, numOfPeople, userPosition, notes));
    const self = this;

    auth.check().then(() => {
      auth.getAuthToken().then(token => {

        self.props.dispatch(fetchStart());
        const { t } = self.props;
        fetch(`${vars.apiUrl}/users/${userId}/requests`,
            {
              headers: {
                'Authorization':`Bearer ${token.accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                event,
                location,
                maxDistance,
                numOfPeople,
                userPosition,
                note: notes
              })
            })
            .then(function(res){
              if(res.status === 204){
                self.props.dispatch(fetchEnd());
                //mostra notifica
                self.props.dispatch(showNotification(
                    t("browse.noBroadcasts.notification.success.message"),
                    "success",
                    {
                      title:    t("browse.noBroadcasts.notification.success.title"),
                    }
                ));
                self.props.navigation.navigate('BroadcastsList');
              }
              else{
                //mostra notifica
                self.props.dispatch(showNotification(
                    t("browse.noBroadcasts.notification.failure.message"),
                    "warning",
                    {
                      title: t("browse.noBroadcasts.notification.success.title"),
                    }
                ));

                self.props.dispatch(fetchEnd());
              }
            })
            .catch(function(res){
              self.props.dispatch(showNotification(
                  t("common.notificationFailure.message"),
                  "error",
                  {
                    title: t("common.notificationFailure.title")
                  }
              ));
              self.props.dispatch(fetchEnd());
            })
      })
    }).catch(function(e){
      NavigationService.navigate("Auth", {}, true);
      self.props.dispatch(fetchEnd());
    })


  }

  render() {

    const {event} = this.props.navigation.state.params;
    const distances = [5, 10, 20, 50, 100];
    const { t } = this.props;

    let date = moment(event.start_at).format('D MMMM [alle] HH:mm');

    return(
        <View>
          <KeyboardAwareScrollView
              contentContainerStyle={styles.container}
              bounces={false}
          >
            <Text style={styles.header}>{t("browse.noBroadcasts.weOrganizeForYou")}</Text>
            <View style={styles.eventContainer}>
              <Text style={styles.competitionName}>{event.competition.name}</Text>
              <View style={styles.eventRow}>
                <VersionedImageField
                    source={event.competition.competitorsHaveLogo ? event.competitors[0]._links.image_versions : event.competition.image_versions}
                    minSize={{width: 62, height: 62}}
                    imgSize={{width: 42, height: 42}}
                />
                <View style={{flex:1, flexWrap: 'wrap'}}>
                  <Text style={styles.eventName} numberOfLines={1} adjustsFontSizeToFit={true}>{event.name}</Text>
                </View>
                {event.competition.competitorsHaveLogo ?
                    <VersionedImageField
                        source={event.competitors[1]._links.image_versions}
                        minSize={{width: 62, height: 62}}
                        imgSize={{width: 42, height: 42}}
                    /> :
                    <View style={{width: 42, height: 42}}/>
                }

              </View>
              <Text style={styles.eventDate}>{date}</Text>
            </View>
            <ImageBackground source={BackgroundPattern} style={{
            height: '100%',
            alignItems: 'center',

            width: '100%',
            marginTop: -20
          }}
                             resizeMode={'cover'}>
              <View style={styles.middleContainerStyle}>
                <Input
                    placeholder={t("browse.noBroadcasts.whereToWatch")}
                    placeholderTextColor={themes.base.inputPlaceholderColor}
                    leftIcon={<Icon name={"map-marker-radius"}
                                color={colors.text.default} size={25}/>}
                    leftIconContainerStyle={{width: 25, height: 25, marginLeft: 0}}
                    containerStyle={styles.inputOuterContainer}
                    inputContainerStyle={{borderBottomWidth: 0}}
                    inputStyle={styles.textInputStyle}
                    autoCapitalize="none"
                    numberOfLines = {1}
                    displayError={true}
                    errorStyle={styles.errorMessage}
                    shake={true}
                    onChangeText={(text) => this.setState({location: text})}

                />
                <Text style={[styles.header, {marginTop: 0}]}>{t("browse.noBroadcasts.howMuchTravel")}</Text>
                <View style={styles.distancesContainer}>
                  {distances.map(dist => (
                      <Button

                          containerStyle={[{flexGrow: 1, flexBasis: 30, maxHeight: 40},
                            dist === distances[0]
                            ? {borderTopLeftRadius: 50, borderBottomLeftRadius: 50 }
                            : dist === distances[distances.length-1] ? {borderTopRightRadius: 50, borderBottomRightRadius: 50} : {} ]}
                          variant={this.state.maxDistance === dist ? "primary" : "default"}
                          //buttonStyle={this.state.maxDistance === dist ? {borderColor: colors.accent.default} :  {borderColor: colors.white.light}}
                          onPress={() => { this.setState({maxDistance: dist}) }}
                      >{dist + ' km'}</Button>
                  ))}
                </View>
                <Text style={[styles.header, {marginTop: 8}]}>{t("browse.noBroadcasts.howManyPeople")}</Text>
                <View style={styles.peopleCard} elevation={2}>
                  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.peopleText}>{this.state.numOfPeople}</Text>
                    <MaterialIcons name={"people"} size={25} style={styles.peopleIcon}/>
                  </View>
                  <Slider
                      value={this.state.numOfPeople}
                      minimumValue={1}
                      maximumValue={20}
                      step={1}
                      style={{justifyContent: 'center'}}
                      //trackStyle={{height: 1}}
                      thumbStyle={{borderWidth: 2, borderColor: colors.accent.default}}
                      thumbTintColor={colors.white.light}
                      onValueChange={(numOfPeople) => this.setState({numOfPeople})} />
                </View>
              </View>
              <View style={styles.noteCard} elevation={2}>
                <TextInput
                    multiline = {true}
                    numberOfLines = {4}
                    placeholder={t("browse.noBroadcasts.addNotes")}
                    style={{textAlignVertical: "top"}}
                    onChangeText={(text) => this.setState({notes: text})}
                />
              </View>
              <Button
                  round
                  variant="primary"
                  disabled={this.state.location === "" || this.state.maxDistance === 0}
                  loading={this.props.isLoading}
                  loadingProps={{color: colors.accent.default}}
                  loadingStyle={{padding: 16, paddingTop: 8, paddingBottom: 8}}
                  onPress={() => this._sendRequest()}
              >{t("browse.noBroadcasts.send")}</Button>
            </ImageBackground>
          </KeyboardAwareScrollView>
          <View style={styles.bottomView}/>
        </View>
    );
  }
}

const mapStateToProps = (state) => {

  const { latitude, longitude } = state.location.device.position ? state.location.device.position.coords : {};
  const isLoading = state.loading > 0;
  const userId = state.auth.profile._id;

  return {
    latitude, longitude, userId, isLoading
  }
};

const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    backgroundColor: colors.white.light,
    paddingTop: 16,
  },
  header: {
    fontFamily: Fonts.LatoBold,
    fontSize: 20,
    color: themes.base.colors.text.default,
    marginTop: 12,
    paddingTop: 32,
  },
  eventContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: -40,
    width: '100%',
    padding: 16,
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
    marginBottom: 8,
    textAlign: 'center'
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
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 8
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
    justifyContent: 'flex-start',
    width: '90%',
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
  bottomView: {
    width: '100%',
    height: 200,
    backgroundColor: colors.primary.default
  }
})

export default connect(mapStateToProps)(withNamespaces()(ContactUsScreen));