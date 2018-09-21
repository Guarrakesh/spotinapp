import React from 'react';
import View from '../common/View';
import {Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import themes from '../../styleTheme';
import Images from "../../assets/images";
import Helpers from '../../helpers';
import moment from "moment";
import 'moment/locale/it';
import {Fonts} from "../common/Fonts";

const BroadcastCardInProfile = (props) => {

  let { event } = props;

  let date = moment(event.start_at).locale('it').format('dddd D MMMM');
  let time = moment(event.start_at).locale('it').format('hh:mm');

  const showAlert = () => {
    Alert.alert(
      'Vuoi prenotare questa offerta?',
      '-10% alla cassa',
      [
        {text: 'Annulla', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'PRENOTA!', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

  return (
    <View style={styles.broadcastInfoView} elevation={2}>
      <View style={styles.eventInfoView}>
        <View style={styles.competitorsLogoView}>
          { event.competition.competitorsHaveLogo ? <Image source={{uri: event.competitors[0]._id.image_versions[0].url}} style={{width: 37, height: 37}} resizeMode={'contain'}/> : <Image source={{uri: event.competition.image_versions[0].url}} style={{width: 37, height: 37}} resizeMode={'contain'}/> }
          { event.competition.competitorsHaveLogo ? <Image source={{uri: event.competitors[1]._id.image_versions[0].url}} style={{width: 37, height: 37, marginTop: 8}} resizeMode={'contain'}/> : null }
        </View>
        <View style={{margin: 16, marginTop: 0, justifyContent: 'space-between'}}>
          <Text style={styles.eventNameText}>{event.name}</Text>
          <Text style={styles.eventDateText}>{date}</Text>
          <Text style={styles.eventTimeText}>{time}</Text>
        </View>
        <View style={styles.sportIconView}>
          <Image source={Images.icons.sports[Helpers.sportSlugIconMap(event.sport.slug)]} style={styles.sportIcon}/>
        </View>
      </View>
      <View style={styles.offerReservationView}>
        <View style={styles.offerContainer}>
          <Text style={styles.offerText}>-10% alla cassa</Text>
        </View>
        <TouchableOpacity onPress={showAlert}>
          <View style={styles.reservationButton} elevation={2}>
            <Text style={styles.reservationText}>PRENOTA OFFERTA</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  broadcastInfoView: {
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'column',
    backgroundColor: themes.base.colors.white.light,
  },
  eventInfoView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 16
  },
  competitorsLogoView: {
    margin: 16,
    marginTop: 0,
    marginRight: 0
  },
  eventNameText: {
    fontSize: 18,
    fontFamily: Fonts.LatoBold
  },
  eventDateText: {
    fontSize: 16,
    fontFamily: Fonts.LatoMedium,
    marginTop: 5,
    marginBottom: 5,
  },
  eventTimeText: {
    fontSize: 20,
    fontFamily: Fonts.LatoLight
  },
  sportIconView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    right: 16
  },
  sportIcon: {
    width: 60,
    height: 60
  },
  offerReservationView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16
  },
  offerContainer: {
    //borderWidth: 2,
    borderColor: themes.base.colors.accent.default,
    borderRadius: 100,
  },
  offerText: {
    fontSize: 16,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.danger.default,
  },
  reservationButton: {
    backgroundColor: themes.base.colors.accent.default,
    borderRadius: 100,
    margin: 5
  },
  reservationText: {
    fontSize: 18,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.white.light,
    marginRight: 16,
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8
  }


})

export default BroadcastCardInProfile;