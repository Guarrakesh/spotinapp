import React from 'react';
import PropTypes from 'prop-types';
import View from '../common/View';
import {Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import themes from '../../styleTheme';
import Images from "../../assets/images";
import Helpers from '../../helpers';
import moment from "moment";
import 'moment/locale/it';
import {Fonts} from "../common/Fonts";
import VersionedImageField from '../common/VersionedImageField';

const BroadcastCardInProfile = (props) => {

  let { broadcast, onReservePress } = props;
  const {event, offer} = broadcast;
  let date = moment(event.start_at).locale('it').format('dddd D MMMM');
  let time = moment(event.start_at).locale('it').format('HH:mm');


  const discount = (type) => {
    switch (parseInt(type)) {
      case 0:
        return `${offer.value}€`;
      case 1:
        return `-${offer.value}%`;
      case 2:
        return `-${offer.value}€`;
      default:
        return null;
    }
  };


  return (
    <View style={styles.broadcastInfoView} elevation={2}>
      <View style={styles.eventInfoView}>
        <View style={styles.competitorsLogoView}>
          { event.competition.competitorsHaveLogo ?
            <VersionedImageField source={event.competitors[0].competitor.image_versions} minSize={{width: 64, height: 64}} imgSize={{width: 37, height: 37}}/>
            : <VersionedImageField source={event.competition.image_versions} minSize={{width: 64, height: 64}} imgSize={{width: 37, height: 37}} /> }
          { event.competition.competitorsHaveLogo
            ? <VersionedImageField
              style={{marginTop: 8}}
              source={event.competitors[1].competitor.image_versions}
              minSize={{width: 64, height: 64}}
              imgSize={{width: 37, height: 37}}/>
            : null }
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
          <Text style={styles.offerText}>{discount(offer.type)} alla cassa</Text>
        </View>
        <TouchableOpacity onPress={() => onReservePress(broadcast)}>
          <View style={styles.reservationButton} elevation={2}>
            <Text style={styles.reservationText}>PRENOTA OFFERTA</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
BroadcastCardInProfile.propTypes ={
  broadcast: PropTypes.object,
  onReservePress: PropTypes.func
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
    fontSize: 16,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.white.light,
    marginRight: 16,
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8
  }


});

export default BroadcastCardInProfile;