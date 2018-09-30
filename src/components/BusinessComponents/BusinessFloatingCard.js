import React from 'react';

import View from '../common/View';
import {Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import themes from '../../styleTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ReferenceField from '../common/ReferenceField'
import Helpers from '../../helpers/index';

const colors = themes.base.colors;

const fonts = themes.base.fonts;
const BroadcastFloatingCard = ({
    business,
    onPress,
    dark,
    elevation,
    showEvent
}) => {

  const { dist} = business;

  let roundedDistance = Math.round(dist.calculated*10)/10;
  roundedDistance = roundedDistance.toString().replace(".",",");



  return (
      <View style={styles.outerContainer} elevation={elevation}>
        <TouchableOpacity onPress={onPress}>
          <ImageBackground
                  imageStyle={{borderRadius: themes.base.borderRadius}}
                  source={{uri: business.cover_versions ? business.cover_versions[0].url : "https://www.hotelristorantemiranda.com/wp-content/uploads/2014/09/ristorante-slide-01.jpg"}}
                  style={styles.imgBackground(6)}
                >
                  <View style={styles.innerContainer}>
                      <Text style={styles.name}>
                        {business.name}
                      </Text>
                      <Text style={styles.address}>
                        {business.address.street}
                      </Text>


                      <View style={styles.distanceContainer}>
                        <Icon name="map-marker-radius" color={colors.white.default}
                              style={styles.geoFenceImg} size={14}/>
                        <Text style={styles.distance}>
                          {roundedDistance} km
                        </Text>
                      </View>


                  </View>
              </ImageBackground>


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
    paddingTop: 150,
    resizeMode: 'stretch',
    borderRadius: themes.base.borderRadius,
    elevation: elevation,

  }),
  innerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(62,62,62,.47)',
    bottom: 0,
    borderRadius: themes.base.borderRadius,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 16,

  },
  name: {
    fontSize: 21,
    color: colors.white.default,
    fontFamily: fonts.Lato,
    fontWeight: '500',
  },
  address: {
      color: colors.white.default,
      fontFamily: fonts.Lato,
    fontWeight: '500',
    fontSize: 14
  },
  distanceContainer: {
    color: colors.white.default,
      flexDirection: 'row',
      alignItems: 'flex-end',
      alignSelf: 'flex-end',
      marginTop: 8
  },
  distance: {
    fontSize: 12,
    alignSelf: 'flex-end',
    color:  colors.white.default,

  },
  geoFenceImg: {
    color: colors.white.default
  }


})

export default BroadcastFloatingCard;
