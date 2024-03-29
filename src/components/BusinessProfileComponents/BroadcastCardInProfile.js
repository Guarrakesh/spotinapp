import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text} from 'react-native';
import {withNamespaces} from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import moment from "moment";
import 'moment/min/moment-with-locales';

import {Button, View} from '../common';
import themes from '../../styleTheme';
import Images from "../../assets/images";
import Helpers from '../../helpers';

import {Fonts} from "../common/Fonts";
import Icon from 'react-native-vector-icons/Feather'
import VersionedImageField from '../common/VersionedImageField';
import ReferenceField from '../common/ReferenceField'

moment.locale(DeviceInfo.getDeviceLocale());

const CHEER_BAR_WIDTH = themes.base.deviceDimensions.width-48;

//Inizializzo i voti a zero se non sono presenti nel broadcast
const votes = {
  cheers: {
    home: 0,
    guest: 0,
    total: 0,
  }
};

const BroadcastCardInProfile = (props) => {

  let {business, broadcast, onReservePress, t, firstRed } = props;
  const { offer, newsfeed, reserved } = broadcast;
  const hasOffer = offer && (offer.value || offer.value === 0)
  const offerValue = hasOffer && offer.value.toFixed(2);
  const description = hasOffer && offer.description ? offer.description.replace(/\\n/g, '\n') : null;

  const discount = (type) => {
    switch (parseInt(type)) {
      case 0:
        return `${offerValue}€`.replace(".",",");
      case 1:
        return `-${offer.value}%`.replace(".",",");
      case 2:
        return `-${offer.value}€`.replace(".",",");
      default:
        return null;
    }
  };

  const cheerBar = (event) => {

    const hasCompetitors = event.sport.has_competitors;
    const firstCompetitorColor = event.competitors[0] && event.competitors[0].color ? event.competitors[0].color : "#ABCDDD";
    const secondCompetitorColor = event.competitors[1] && event.competitors[1].color ? event.competitors[1].color : "#2752A5";

    const { cheers } = broadcast;
    const total = cheers && cheers.total ? cheers.total : 0;
    const home = cheers && cheers.home ? cheers.home: 0;

    const firstCompPercentage = total === 0 ? 50 : (home*100)/total;
    //const secondCompPercentage = 100 - firstCompPercentage;

    const initialBarWidth =
      total === 0 ?
        CHEER_BAR_WIDTH/2 : home === 0 ?
        0 : (CHEER_BAR_WIDTH * home)/total;

    if(hasCompetitors){
      return (
        <View style={[styles.votesBar, {backgroundColor: secondCompetitorColor}]}>
          <View style={[styles.firstCompVotes, {backgroundColor: firstCompetitorColor, width: initialBarWidth}]}/>
        </View>
      )
    } else
      return null;

  };


  return (
    <ReferenceField reference="events" record={broadcast} source="event">
      {({record: event, isLoading}) => {
        if (isLoading) return null;

        let date = moment(event.start_at).format('dddd D MMMM');
        let time = moment(event.start_at).format('HH:mm');
        const { competitors } = event;
        //console.log(broadcast);

        return (
          <View style={(1 === 0) ? styles.broadcastInfoViewWithHeader : [styles.broadcastInfoView, {borderWidth: firstRed ? 1:0, borderColor: themes.base.colors.danger.default}]} elevation={2}>
            {(1 === 0) ?
              <View style={styles.redHeader} elevation={3}>
                <Text style={styles.headerText}>{t("browse.getOffer.recommended")}</Text>
              </View> : null
            }
            <View style={styles.eventInfoView}>

              {event.competition.competitorsHaveLogo  ?
                competitors[0] && competitors[0]._links && competitors[0]._links.image_versions && competitors[0]._links.image_versions[0] && competitors[1]._links.image_versions[0] ?
                  <View style={styles.competitorsLogoView}>
                    <VersionedImageField source={competitors[0]._links.image_versions} minSize={{width: 62, height: 62}} imgSize={{width: 32, height: 32}}/>
                    <VersionedImageField source={competitors[1]._links.image_versions} minSize={{width: 62, height: 62}} imgSize={{width: 32, height: 32}} style={{marginTop: 8}}/>
                  </View> : null
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
            {cheerBar(event)}
            {event.sport.has_competitors && <Text style={styles.estimationText}>{t("browse.getOffer.supportersEstimation")} {business.name}</Text>}
            {
              (offer && offer.description && offer.description !== "" ) ?
                <View style={styles.offerInfoView}>
                  <Text style={styles.offerTitleText}>{(!offer.title || offer.title === "") ? t("common.discountAtCheckout") : offer.title}</Text>
                  <Text style={styles.offerDescriptionText}>{description}</Text>
                </View> : null
            }
            <View style={styles.offerReservationView}>
              {
                (hasOffer) ?
                  <View style={styles.offerContainer}>
                    <Text style={styles.offerText}>{discount(offer.type)} {t("common.atCheckout")}</Text>
                  </View> : <View/>
              }
              {!reserved  ?
                <Button round uppercase variant="primary" onPress={onReservePress}>{hasOffer ? t('browse.getOffer.buttonTitle') : t('browse.getOffer.join')}</Button>
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
  },
  votesBar: {
    margin: 16,
    marginBottom: 0,
    height: 10,
    overflow: 'hidden',
    //borderWidth: 1,
    borderColor: themes.base.colors.accent.default,
    borderRadius: 10
  },
  firstCompVotes: {
    height: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10
  },
  estimationText: {
    alignSelf: 'center',
    marginTop: 5,
    fontFamily: Fonts.LatoLightItalic,
    fontSize: 14
  },

});

export default withNamespaces()(BroadcastCardInProfile);
