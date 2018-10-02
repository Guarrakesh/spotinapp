import React from 'react';

import View from '../common/View';
import {Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import themes from '../../styleTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ReferenceField from '../common/ReferenceField'
import Helpers from '../../helpers/index';


const fonts = themes.base.fonts;
const colors = themes.base.colors;

const BroadcastFloatingCard = ({
    broadcast,
    onPress,
    dark,
    elevation,
    showEvent,
    overlayOpacity = 1,

    titleStyle,
}) => {

  const { business, offer, dist } = broadcast;

  let roundedDistance = Math.round(dist.calculated*10)/10;
  roundedDistance = roundedDistance.toString().replace(".",",");

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
      <View style={styles.outerContainer} elevation={elevation}>
        <TouchableOpacity onPress={onPress}>
          <ReferenceField reference="businesses" source="business" record={broadcast}>
            { ({record: business}) =>
                <ImageBackground
                    imageStyle={{borderRadius: themes.base.borderRadius}}
                    source={{uri: business.cover_versions ? business.cover_versions[0].url : "https://www.hotelristorantemiranda.com/wp-content/uploads/2014/09/ristorante-slide-01.jpg"}}
                    style={styles.imgBackground(6)}
                >
                  <View
                      style={[{...styles.bottomContainer}, (dark ? {...styles.darkBackground} : {...styles.lightBackground(overlayOpacity)})]}>
                    <View style={styles.leftInfo}>
                      <Text
                        style={[styles.name(overlayOpacity), dark ? {color: colors.white.default} : {color: colors.text.default}]}>{business.name}</Text>
                      {!showEvent &&

                      <Text style={[styles.address(overlayOpacity), dark ? {color: colors.white.default} : {color: colors.text.default}]}>
                        {business.address.street}
                      </Text>
                      }
                      {showEvent &&
                        <ReferenceField reference="events" record={broadcast} source="event">
                          { ({record: event}) =>
                              <View>
                                <Text style={[styles.eventName(overlayOpacity), dark ? {color: colors.white.default} : {color: colors.text.default}, titleStyle]}>
                                  {event.name}
                                </Text>
                                <View >
                                  <Text style={styles.eventDate}>{Helpers.formattedEventDate(event.start_at, "D MMMM [alle] HH:mm")}</Text>
                                </View>
                              </View>
                          }
                        </ReferenceField>
                      }

                      <View style={{flexDirection: 'row', marginTop: 8}}>
                        <Icon name="map-marker-radius" color={dark ? colors.accent.light : colors.accent.default}
                              style={styles.geoFenceImg} size={14}/>
                        <Text
                            style={[styles.distance, dark ? {color: colors.accent.light} : {color: colors.accent.default}]}>
                          {roundedDistance} km
                        </Text>
                      </View>
                    </View>
                    <View style={styles.offerValue}>
                      <Text style={{
                        fontSize: 24,
                        color: dark ? colors.danger.light : colors.danger.default,

                          fontFamily: fonts.LatoMedium,
                        textAlign: 'center'
                      }}>
                        {discount(offer.type)}
                      </Text>
                      <Text style={{
                        fontSize: 13,
                        color: dark ? colors.danger.light : colors.danger.default,
                        fontFamily: fonts.LatoMedium,
                        textAlign: 'center'
                      }}>
                        alla cassa
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
            }
          </ReferenceField>
        </TouchableOpacity>
      </View>

  );
};

BroadcastFloatingCard.defaultProps = {
  elevation: 1,
  titleStyle: {}
};

BroadcastFloatingCard.propTyeps = {
  onPress: PropTypes.func,
  broadcast: PropTypes.object,
  dark: PropTypes.bool,
  elevation: PropTypes.number,

  //styles
  titleStile: PropTypes.object
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    //I padding servono per dare spazio all'ombra
    padding: 8,
    paddingTop: 0,
    paddingBottom: 16

  },
  imgBackground: (elevation = 4) => ({
    position: 'relative',
    flex: 1,
    paddingTop: 220,
    resizeMode: 'stretch',
    borderRadius: themes.base.borderRadius,
    elevation: elevation,

  }),
  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomLeftRadius:  themes.base.borderRadius,
    borderBottomRightRadius:  themes.base.borderRadius,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'

  },
  darkBackground: {
    backgroundColor: 'rgba(43,39,39,.8)',
  },
  lightBackground: (opacity = 1) => ({
    backgroundColor: `rgba(255,255,255,${opacity})`,
  }),

  offerValue: {
    alignSelf: 'flex-end'
  },
  name: (opacity = 1) => ({
    fontSize: 16,
    fontFamily: fonts.LatoLight,
    fontFamily: opacity !== 1 ? fonts.LatoBold : fonts.LatoMedium,

  }),
  address: (opacity = 1) => ({
    fontWeight: '300',
    fontSize: 12,
    fontFamily: fonts.LatoLight,

    marginBottom: opacity === 1 ? 8 : 0,
  }),
  distance: {
    fontSize: 12,
    fontFamily: fonts.LatoBold,
  },
  eventName: (opacity = 1) => ({
    fontFamily: opacity !== 1 ? fonts.LatoBold : fonts.LatoMedium,
    fontSize: 16,
    marginTop: 4,
  }),
  eventDate: {
    fontFamily: fonts.LatoLight,
    color: themes.base.colors.text.default,
    fontSize: 12
  },


})

export default BroadcastFloatingCard;
