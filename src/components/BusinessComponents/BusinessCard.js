import React from 'react';

import View from '../common/View';
import {Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import themes from '../../styleTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Fonts} from "../common/Fonts";


const BusinessCard = (props) => {

  const { business } = props;

  let roundedDistance = Math.round(business.dist.calculated*10)/10;
  roundedDistance = roundedDistance.toString().replace(".",",");


  return (
    <TouchableOpacity onPress={props.onItemPress}>
      <ImageBackground
        imageStyle={{borderRadius: themes.base.borderRadius}}
        source={{uri: business.cover_versions[0] ? business.cover_versions[0].url : "https://www.hotelristorantemiranda.com/wp-content/uploads/2014/09/ristorante-slide-01.jpg"}}
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
        </View>
      </ImageBackground>
    </TouchableOpacity>

  );
};


const styles = StyleSheet.create({
  innerContainer: {
    marginBottom: 16,
    borderRadius: themes.base.borderRadius,
    backgroundColor: themes.base.colors.white.light,
    ...themes.base.elevations.depth1

  },
  overlayView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,.4)',
    borderTopLeftRadius: themes.base.borderRadius,
    borderTopRightRadius: themes.base.borderRadius
  },
  image: {
    width: 64,
    marginLeft: 16,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.white.default,
    marginLeft: 8,
  },
  types: {
    fontSize: 16,
    fontFamily: Fonts.Lato,
    color: themes.base.colors.white.default,
    marginLeft: 8
  },
  address: {
    fontFamily: Fonts.LatoMedium,
    fontSize: 14,
    color: themes.base.colors.white.default,
    marginLeft: 8,
    marginBottom: 8
  },
  distance: {
    fontSize: 18,
    fontFamily: Fonts.LatoSemibold,
    color: themes.base.colors.white.default,
    marginRight: 8,
    marginBottom: 8
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flex: 1,
    borderTopLeftRadius: themes.base.borderRadius,
    borderTopRightRadius: themes.base.borderRadius,

  },
  geoFenceImg: {
    marginRight: 30
  },
  wifiImg: {
    width: 32,
    height: 24,
    marginLeft: 20
  },
  seatsImg: {
    marginLeft: 20
  },
  topContainer: {
    width: '100%',
    backgroundColor: themes.base.colors.white.default,
    height: 124,
    flexDirection: 'row',
    borderTopLeftRadius: themes.base.borderRadius,
    borderTopRightRadius: themes.base.borderRadius

  },
  bottomContainer: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    borderWidth: 0,
  },
  divisor: {
    height: '100%',
    width: 1,
    backgroundColor: themes.base.colors.text.default
  }
})

export default BusinessCard;