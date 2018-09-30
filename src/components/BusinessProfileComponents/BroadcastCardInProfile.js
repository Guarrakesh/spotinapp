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
import ReferenceField from '../common/ReferenceField'

const BroadcastCardInProfile = (props) => {

  let { broadcast, onReservePress, reserved } = props;
  const { offer } = broadcast;


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


          return (
              <View style={styles.broadcastInfoView} elevation={2}>
                <View style={styles.eventInfoView}>
                  <ReferenceField reference="competitions" source="competition" record={event}>
                    {({record: competition, isLoading: competitionLoading}) =>
                        competitionLoading || !competition ? null :
                            <View style={styles.competitorsLogoView}>

                              {competition.competitorsHaveLogo ?
                                  <ReferenceField reference="competitors" source="competitors[0].competitor" record={event}>
                                    {({record: competitor, isLoading: competitorLoading}) =>
                                        competitorLoading ? null :
                                            <VersionedImageField source={competitor.image_versions} minSize={{width: 64, height: 64}}
                                                                 imgSize={{width: 32, height: 32}}/>
                                    }
                                  </ReferenceField>
                                  :
                                  <VersionedImageField source={competition.image_versions} minSize={{width: 64, height: 64}}
                                                       imgSize={{width: 37, height: 37}}/>
                              }

                              {competition.competitorsHaveLogo ?
                                  <ReferenceField reference="competitors" source="competitors[1].competitor" record={event}>
                                    {({record: competitor, isLoading: competitorLoading}) =>
                                        competitorLoading ? null :
                                            <VersionedImageField source={competitor.image_versions} minSize={{width: 64, height: 64}}
                                                                 imgSize={{width: 32, height: 32}}/>
                                    }
                                  </ReferenceField>

                                  : null
                              }
                            </View>
                    }

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
                      : <Text>PRENOTATO</Text>}
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
  eventInfoView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 16
  },
  competitorsLogoView: {

    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    margin: 16,
    marginTop: 0,
    marginRight: 0,

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
