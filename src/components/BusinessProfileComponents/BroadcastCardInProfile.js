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
import Icon from 'react-native-vector-icons/Feather'
import VersionedImageField from '../common/VersionedImageField';
import ReferenceField from '../common/ReferenceField'

const BroadcastCardInProfile = (props) => {

  let { broadcast, onReservePress, reserved } = props;
  const { offer, newsfeed } = broadcast;


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
    <ReferenceField reference="events" record={broadcast} source="event">
      {({record: event, isLoading}) => {

        if (isLoading) return null;

        let date = moment(event.start_at).locale('it').format('dddd D MMMM');
        let time = moment(event.start_at).locale('it').format('HH:mm');
        const { competitors } = event;

        return (
          <View style={styles.broadcastInfoView} elevation={2}>
            {(newsfeed || newsfeed > 0) ?
              <View style={styles.redHeader} elevation={3}>
                <Text style={styles.headerText}>Offerta consigliata</Text>
              </View> : null
            }
            <View style={styles.eventInfoView}>
              <ReferenceField  reference="competitions" source="competition" record={event}>
                {({record}) => (

                  record.competitorsHaveLogo
                    ?
                    <View style={styles.competitorsLogoView}>
                      {competitors.map(comp => { return (
                        <VersionedImageField source={comp._links.image_versions} minSize={{width: 62, height: 62}} imgSize={{width: 32, height: 32}}/>
                      )})}
                    </View>
                    :
                    <View style={{marginTop: 8, marginLeft: 16}}>
                      { <VersionedImageField source={record.image_versions} minSize={{width: 128, height: 128}} imgSize={{width: 48, height: 48}} />}
                    </View>
                )}
              </ReferenceField>

              <View style={{margin: 16, marginTop: 0, justifyContent: 'space-between'}}>
                <Text style={styles.eventNameText}>{event.name}</Text>
                <Text style={styles.eventDateText}>{date}</Text>
                <Text style={styles.eventTimeText}>{time}</Text>
              </View>
              <View style={styles.sportIconView}>
                <Image source={Images.icons.sports[Helpers.sportSlugIconMap(event.sport.slug)]} style={styles.sportIcon}/>
              </View>
            </View>
            {(newsfeed || newsfeed > 0) ?
              <View style={styles.offerInfoView}>
                <Text style={styles.offerTitleText}>{offer.title}</Text>
                <Text style={styles.offerDescriptionText}>{offer.description}</Text>
              </View> : null
            }
            <View style={styles.offerReservationView}>
              <View style={styles.offerContainer}>
                <Text style={styles.offerText}>{discount(offer.type)} alla cassa</Text>
              </View>
              {!reserved ?
                <TouchableOpacity onPress={onReservePress}>
                  <View style={styles.reservationButton} elevation={2}>
                    <Text style={styles.reservationText}>PRENOTA OFFERTA</Text>
                  </View>
                </TouchableOpacity>
                :
                <View style={styles.reservedView}>
                  <Icon name={'check-circle'} size={20} color={themes.base.colors.accent.default} style={{marginRight: 3}}/>
                  <Text style={styles.reservedText}>PRENOTATO</Text>
                </View>
              }
            </View>
          </View>
        )}}
    </ReferenceField>

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
  redHeader: {
    backgroundColor: themes.base.colors.danger.default,
    marginTop: 0,
    borderRadius: 16,
    padding: 5
  },
  headerText: {
    fontFamily: Fonts.LatoBold,
    fontSize: 14,
    color: themes.base.colors.white.default,
    marginLeft: 8
  },
  eventInfoView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 16
  },
  competitorsLogoView: {

    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 16,

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
  reservedView: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
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
  },
  reservedText: {
    fontSize: 16,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.text.default,

  },
  offerInfoView: {
    marginLeft: 16,
    marginRight: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: themes.base.colors.white.divisor
  },
  offerTitleText: {
    fontSize: 20,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.text.default
  },
  offerDescriptionText: {
    fontSize: 16,
    fontFamily: Fonts.Lato,
    color: themes.base.colors.text.default
  }


});

export default BroadcastCardInProfile;
