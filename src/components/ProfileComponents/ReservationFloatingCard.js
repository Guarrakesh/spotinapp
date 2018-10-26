import React from "react";
import PropTypes from "prop-types";
import {Text, StyleSheet, ImageBackground} from "react-native";
import ReferenceField from '../common/ReferenceField';

import {View, Touchable} from "../common";
import themes from "../../styleTheme";
import Helpers from "../../helpers";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const Fonts = themes.base.fonts;


const colors = themes.base.colors;

const ReservationFloatingCard = ({
                                   reservation,
                                   onPress,
                                   elevation,
                                   dark
                                 }) => {

  const { broadcast, createdAt } = reservation;
  const { offer } = broadcast;
  const { business, event } = broadcast;

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

  return(
    <View style={styles.outerContainer} elevation={1}>
      <Touchable onPress={onPress} style={{flex: 1, borderRadius: themes.base.borderRadius}}>
        <ReferenceField source="business" record={broadcast} resource="businesses" reference="businesses">
          { ({record: business}) =>
            <ImageBackground
              imageStyle={{borderRadius: themes.base.borderRadius}}
              source={{uri: business.cover_versions && business.cover_versions.length > 0 ? business.cover_versions[0].url : "https://media-cdn.tripadvisor.com/media/photo-s/0f/aa/db/0d/ristorante-a-mano.jpg"}}
              style={styles.imgBackground}
              resizeMode={'cover'}
            >
              <View style={styles.bottomContainer}>
                <ReferenceField source="event" record={broadcast} resource="events" reference="events">
                  {({record: event}) =>
                    <View style={styles.leftInfo}>
                      <Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit={true}>
                        {business.name}
                      </Text>
                      <Text style={styles.eventName} numberOfLines={1} adjustsFontSizeToFit={true}>
                        {event.name}
                      </Text>
                      <Text
                        style={styles.eventDate} numberOfLines={1} adjustsFontSizeToFit={true}>{Helpers.formattedEventDate(event.start_at, "D MMMM [alle] HH:mm")}
                      </Text>
                    </View>
                  }
                </ReferenceField>
                <View style={styles.offerView}>
                  <Text style={styles.offerValue}>{discount(offer.type)}</Text>
                  <Text style={styles.offerValueText}>alla cassa</Text>
                </View>

              </View>
            </ImageBackground>


          }
        </ReferenceField>


      </Touchable>
    </View>
  )
};

ReservationFloatingCard.propTyeps = {
  onPress: PropTypes.func,
  reservation: PropTypes.object,
  dark: PropTypes.bool,
  elevation: PropTypes.number,
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: themes.base.colors.white.light,
    borderRadius: themes.base.borderRadius,
    flexDirection: 'column',
    //I padding servono per dare spazio all'ombra
    height: themes.base.deviceDimensions.height/3,
    margin: 8

  },
  imgBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: themes.base.borderRadius,
  },
  bottomContainer: {
    backgroundColor: 'rgba(255,255,255,.8)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  darkBackground: {
    backgroundColor: 'rgba(43,39,39,.8)',
  },
  lightBackground: {
    backgroundColor: 'rgba(255,255,255,1)'
  },
  leftInfo: {
    flexWrap: 'wrap',
    marginRight: 8
  },
  offerView: {
    alignSelf: 'flex-end'
  },
  offerValue: {
    fontFamily: Fonts.LatoHeavy,
    fontSize: 24,
    color: colors.danger.default,
    textAlign: 'center'
  },
  offerValueText: {
    fontSize: 14,
    fontFamily: Fonts.LatoBold,
    color: colors.danger.default,
    textAlign: 'center'
  },
  name: {
    fontSize: 14,
    fontFamily: Fonts.LatoMedium,
    color: themes.base.colors.text.default
  },
  eventName: {
    fontFamily: Fonts.LatoBold,
    fontSize: 16,
    color: themes.base.colors.text.default
  },
  eventDate: {
    fontFamily: Fonts.LatoLight,
    color: themes.base.colors.text.default,
    fontSize: 14,
  }

})

export default ReservationFloatingCard;