import React from "react";
import PropTypes from "prop-types";
import {get, isEmpty} from "lodash";
import {Text, StyleSheet, ImageBackground, Image, Alert} from "react-native";
import { withNamespaces } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import "moment/min/moment-with-locales";

import { Button, View, Typography } from "../common";

import ReferenceField from "../common/ReferenceField";
import VersionedImageField from "../common/VersionedImageField";
import Images from "../../assets/images";
import themes from "../../styleTheme";
import Helpers from "../../helpers";



const colors = themes.base.colors;
const Fonts = themes.base.fonts;
const coverWidth = themes.base.deviceDimensions.width - 16;

moment.locale(DeviceInfo.getDeviceLocale());
const ReservationView = ({reservation, onCancel, t}) => {

  const { broadcast, created_at, peopleNum } = reservation;
  const { offer, newsfeed } = broadcast;
  const description = offer.description ? offer.description.replace(/\\n/g, '\n') : null;



  let date = (startAt) => {
    return(
      moment(startAt).format('dddd D MMMM')
    )
  };

  let time = (startAt) => {
    return(
      moment(startAt).format('HH:mm')
    )
  };

  const reservationDate = moment(created_at).format('dddd D MMMM').toString();

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

  const deletePress = () => {
    Alert.alert(
      t("profile.bookedOffer.alertDelete.title"),
      t("profile.bookedOffer.alertDelete.message"),
      [
        {text: t("common.cancel"), style: 'cancel'},
        {text: t("profile.bookedOffer.alertDelete.delete"), onPress: () => onCancel()},
      ],
      { cancelable: true }
    )
  };

  return(
    <View style={styles.container} elevation={2}>
      <View style={styles.imgContainer}>
        <ReferenceField source="business" record={broadcast} resource="businesses" reference="businesses">
          { ({record: business}) =>
            <VersionedImageField
              isBackground={true}
              source={business.cover_versions && business.cover_versions.length > 0 ? business.cover_versions : null}
              style={styles.imgBackground}
              minSize={{width: 1200, height: 1200}}
              imgSize={{height: null, width: coverWidth}}
            >
              <View style={styles.businessContainer}>
                <Text style={styles.businessName}>{business.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'column', flex: 1}}>
                    <Text style={styles.businessType}>{business.type.join(' • ')}</Text>
                    <Text style={styles.businessAddress}>{business.address.street} {business.address.number}</Text>
                    <Text style={styles.businessAddress}>{business.address.city} ({business.address.province})</Text>
                  </View>
                </View>
              </View>
            </VersionedImageField>
          }
        </ReferenceField>
      </View>
      <ReferenceField source="event" record={broadcast} resource="events" reference="events">
        {({record: event}) =>
          <View style={styles.eventInfoView}>

            {event.competition.competitorsHaveLogo
              ? <View style={styles.competitorsLogoView}>
                {event.competitors.map(comp => {
                  return comp._links &&
                    <VersionedImageField source={comp._links.image_versions} minSize={{width: 62, height: 62}}
                                         imgSize={{width: 32, height: 32}}/>

                })}
              </View>
              :
              <View style={{marginTop: 8, marginLeft: 16}}>
                { <VersionedImageField source={event.competition.image_versions}
                                       minSize={{width: 128, height: 128}}
                                       imgSize={{width: 48, height: 48}}/>}
              </View>

            }

            <View style={styles.eventNameDateView}>
              <Text style={styles.eventNameText}>{event.name}</Text>
              <Text style={styles.eventDateText}>{date(event.start_at)}</Text>
              <Text style={styles.eventTimeText}>{time(event.start_at)}</Text>
            </View>
            <View style={styles.sportIconView}>
              <Image source={Images.icons.sports[Helpers.sportSlugIconMap(event.sport.slug)]} style={styles.sportIcon}/>
            </View>
          </View>
        }
      </ReferenceField>
      {
        (offer.description && !offer.description.isEmpty) ?
          <View style={styles.offerInfoView}>
            <Text style={styles.offerTitleText}>{offer.title && offer.title !== "" ? offer.title : t("common.discountAtCheckout")}</Text>
            <Text style={styles.offerDescriptionText}>{description}</Text>
          </View> : null
      }
      <View style={styles.peopleView}>
        <Typography uppercase gutterBottom variant={"heading"} style={styles.offerText}>{discount(offer.type)} {t("common.atCheckout").toUpperCase()}</Typography>
        <Typography uppercase gutterBottom>{t("profile.bookedOffer.savedOn").toUpperCase()} {reservationDate.toUpperCase()}</Typography>
        {(peopleNum && peopleNum !== 0) ?
          <View style={{flexDirection: "row", alignItems: "flex-end"}}>
            <MaterialIcons name={"people"} size={20} style={styles.peopleIcon}/>
            <Text style={styles.peopleText}>{peopleNum} {t("profile.bookedOffer.people")}</Text>
          </View> : null
        }
      </View>
      <View style={styles.offerReservationView}>
        <Button
          titleStyle={{color: colors.white.default}}
          round={true}
          variant="danger"
          uppercase
          containerStyle={{marginLeft: 8}}
          onPress={() => deletePress()}
        >{t("profile.bookedOffer.delete")}</Button>
      </View>
    </View>
  )


};

ReservationView.propTypes = {
  reservation: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    borderRadius: themes.base.borderRadius,
    //overflow: 'hidden',
    margin: 8,
    backgroundColor: themes.base.colors.white.light
  },
  imgContainer: {
    borderTopLeftRadius: themes.base.borderRadius,
    borderTopRightRadius: themes.base.borderRadius,
    overflow: 'hidden'
  },
  imgBackground: {
    borderTopLeftRadius: themes.base.borderRadius,
    borderTopRightRadius: themes.base.borderRadius,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingTop: 100,
    backgroundColor: themes.base.colors.white.light
  },
  businessContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  businessName: {
    fontFamily: Fonts.LatoBold,
    fontSize: 20,
    color: colors.white.light,
  },
  businessType: {
    fontFamily: Fonts.Lato,
    fontSize: 16,
    color: themes.base.colors.white.light
  },
  businessDistance: {
    fontSize: 18,
    fontFamily: Fonts.LatoBold,
    color: colors.white.light,
  },
  businessAddress: {
    fontSize: 14,
    fontFamily: Fonts.LatoLightItalic,
    color: colors.white.light,
  },
  eventInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    borderBottomWidth: 1,
    borderColor: colors.white.divisor
  },
  eventNameDateView: {
    flex: 1,
    margin: 16,
    marginTop: 0,
    justifyContent: 'space-between'
  },
  competitorsLogoView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
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

  },
  sportIcon: {
    width: 60,
    height: 60
  },
  offerInfoView: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: themes.base.colors.white.divisor
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
  offerReservationView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    //fontFamily: Fonts.LatoBold,
    color: themes.base.colors.danger.default,
    alignSelf: 'center'
  },
  reservedView: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 5,
    borderRadius: 50,
    overflow: 'hidden'
  },
  reservationDateText: {
    fontSize: 18,
    fontFamily: Fonts.LatoMedium,
    color: colors.text.default
  },
  peopleText: {
    fontSize: 16,
    fontFamily: Fonts.LatoBold,
    color: colors.accent.default,
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 16,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.white.light,
    marginLeft: 16,
    marginRight: 16

  },
  peopleView: {
    alignItems: "center",
    justifyContent: "center"
  },
  peopleIcon: {
    // position: 'absolute',
    // right: 16,
    color: themes.base.colors.accent.default
  },
});





export default withNamespaces()(ReservationView);