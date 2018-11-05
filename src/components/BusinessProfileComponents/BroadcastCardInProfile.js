import React from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet, Image, Alert} from 'react-native';
import { withNamespaces } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import moment from "moment";
import 'moment/min/moment-with-locales';

import { Button, Touchable, View } from '../common';
import themes from '../../styleTheme';
import Images from "../../assets/images";
import Helpers from '../../helpers';

import {Fonts} from "../common/Fonts";
import Icon from 'react-native-vector-icons/Feather'
import VersionedImageField from '../common/VersionedImageField';
import ReferenceField from '../common/ReferenceField'

moment.locale(DeviceInfo.getDeviceLocale());

const BroadcastCardInProfile = (props) => {

  let { broadcast, onReservePress, t} = props;
  const { offer, newsfeed, reserved } = broadcast;


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

          let date = moment(event.start_at).format('dddd D MMMM');
          let time = moment(event.start_at).format('HH:mm');
          const { competitors } = event;

          return (
              <View style={(1 === 0) ? styles.broadcastInfoViewWithHeader : styles.broadcastInfoView} elevation={2}>
                {(1 === 0) ?
                    <View style={styles.redHeader} elevation={3}>
                      <Text style={styles.headerText}>{t("browse.getOffer.recommended")}</Text>
                    </View> : null
                }
                <View style={styles.eventInfoView}>

                  {    event.competition.competitorsHaveLogo
                      ?
                      <View style={styles.competitorsLogoView}>
                        <VersionedImageField source={competitors[0]._links.image_versions} minSize={{width: 62, height: 62}} imgSize={{width: 32, height: 32}}/>
                        <VersionedImageField source={competitors[1]._links.image_versions} minSize={{width: 62, height: 62}} imgSize={{width: 32, height: 32}} style={{marginTop: 8}}/>
                      </View>
                      :
                      <View style={{marginTop: 8, marginLeft: 16}}>
                        { <VersionedImageField source={event.competition.image_versions} minSize={{width: 128, height: 128}} imgSize={{width: 48, height: 48}} />}
                      </View>

                  }
                  <View style={{flex: 1, marginLeft: 16, justifyContent: 'space-between'}}>
                    <Text style={styles.eventNameText}>{event.name}</Text>
                    <Text style={styles.eventDateText}>{date}</Text>
                    <Text style={styles.eventTimeText}>{time}</Text>
                  </View>
                  <View style={styles.sportIconView}>
                    <Image source={Images.icons.sports[Helpers.sportSlugIconMap(event.sport.slug)]} style={styles.sportIcon}/>
                  </View>
                </View>
                {(newsfeed || newsfeed > 0 ) ?
                    <View style={styles.offerInfoView}>
                      <Text style={styles.offerTitleText}>{(!offer.title || offer.title === "") ? t("common.discountAtCheckout") : offer.title}</Text>
                      <Text style={styles.offerDescriptionText}>{offer.description}</Text>
                    </View> : null
                }
                <View style={styles.offerReservationView}>
                  <View style={styles.offerContainer}>
                    <Text style={styles.offerText}>{discount(offer.type)} {t("common.atCheckout")}</Text>
                  </View>
                  {!reserved && !props.reserved ?
                      <Button round uppercase variant="primary" onPress={onReservePress}>{t('browse.getOffer.buttonTitle')}</Button>

                      :
                      <View style={styles.reservedView}>
                        <Icon name={'check-circle'} size={20} color={themes.base.colors.accent.default} style={{marginRight: 3}}/>
                        <Text style={styles.reservedText}>{t("browse.getOffer.booked")}</Text>
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
  onReservePress: PropTypes.func,
  reserved: PropTypes.bool,
};
const styles = StyleSheet.create({
  broadcastInfoView: {
    margin: 8,
    borderRadius: 8,
    flexDirection: 'column',
    backgroundColor: themes.base.colors.white.light,
  },
  broadcastInfoViewWithHeader: {
    margin: 8,
    borderRadius: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: 'column',
    backgroundColor: themes.base.colors.white.light,
  },
  // TODO: da attivare nel render sostituendo nell'if (newsfeed || newsfeed > 0) quando differenzieremo le plus
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
    alignItems: 'center',
    marginTop: 16
  },
  competitorsLogoView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 16,

  },
  eventNameText: {
    fontSize: 18,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.text.default
  },
  eventDateText: {
    fontSize: 16,
    fontFamily: Fonts.LatoMedium,
    marginTop: 5,
    marginBottom: 5,
    color: themes.base.colors.text.default
  },
  eventTimeText: {
    fontSize: 20,
    fontFamily: Fonts.LatoLight,
    color: themes.base.colors.text.default
  },
  sportIconView: {
    justifyContent: 'center',
    marginRight: 16
  },
  sportIcon: {
    width: 60,
    height: 60,
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
  reservedView: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 100,
    margin: 5
  },
  reservedText: {
    fontSize: 16,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.text.default,

  },
  offerInfoView: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
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

export default withNamespaces()(BroadcastCardInProfile);
