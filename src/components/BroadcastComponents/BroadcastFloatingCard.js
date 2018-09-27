import React from 'react';

import View from '../common/View';
import {Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import themes from '../../styleTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ReferenceField from '../common/ReferenceField'

const colors = themes.base.colors;

const BroadcastFloatingCard = ({
    broadcast,
    onPress,
    dark,
    elevation
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
                    source={{uri: business.image_url ? business.image_url[0].url : "https://www.hotelristorantemiranda.com/wp-content/uploads/2014/09/ristorante-slide-01.jpg"}}
                    style={styles.imgBackground(6)}
                >
                  <View
                      style={[{...styles.bottomContainer}, (dark ? {...styles.darkBackground} : {...styles.lightBackground})]}>
                    <View style={styles.leftInfo}>
                      <Text
                          style={[styles.name, dark ? {color: colors.white.default} : {color: colors.text.default}]}>{business.name}</Text>
                      <Text style={[styles.address, dark ? {color: colors.white.default} : {color: colors.text.default}]}>
                        {business.address.street}
                      </Text>

                      <View style={{flexDirection: 'row'}}>
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
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}>
                        {discount(offer.type)}
                      </Text>
                      <Text style={{
                        fontSize: 13,
                        color: dark ? colors.danger.light : colors.danger.default,
                        fontWeight: 'bold',
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
};
BroadcastFloatingCard.propTyeps = {
  onPress: PropTypes.func,
  broadcast: PropTypes.object,
  dark: PropTypes.bool,
  elevation: PropTypes.number,
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
    paddingTop: 180,
    resizeMode: 'stretch',
    borderRadius: themes.base.borderRadius,
    elevation: elevation,

  }),
  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,


    bottom: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'

  },
  darkBackground: {
    backgroundColor: 'rgba(43,39,39,.8)',
  },
  lightBackground: {
    backgroundColor: 'rgba(255,255,255,.8)'
  },
  leftInfo: {

  },
  offerValue: {
    alignSelf: 'center'
  },
  name: {
    fontSize: 17,

    fontWeight: '700',
  },
  address: {
    fontWeight: '300',
    fontSize: 12,


    marginBottom: 8
  },
  distance: {
    fontSize: 12,
    fontWeight: '700',



  },


})

export default BroadcastFloatingCard;