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
      <TouchableOpacity onPress={onPress} delayPressIn={50}>
        <ImageBackground
          imageStyle={{borderRadius: themes.base.borderRadius}}
          source={{uri: business.cover_versions && business.cover_versions.length > 0 ? business.cover_versions[0].url : "https://www.hotelristorantemiranda.com/wp-content/uploads/2014/09/ristorante-slide-01.jpg"}}
          style={styles.imgBackground(6)}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.name}>
              {business.name}
            </Text>
            <Text style={styles.type}>
              {business.type.join(' • ')}
            </Text>
            <View style={styles.distanceContainer}>
              <Icon name="map-marker-radius" color={colors.white.default}
                    style={styles.geoFenceImg} size={20}/>
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
    margin: 8,
    backgroundColor: colors.white.light,
    borderRadius: themes.base.borderRadius,
    overflow: 'hidden'

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
    padding: 8,

  },
  name: {
    fontSize: 21,
    color: colors.white.light,
    fontFamily: fonts.LatoBold,
  },
  type: {
    color: colors.white.light,
    fontFamily: fonts.Lato,
    fontSize: 14
  },
  distanceContainer: {
    color: colors.white.light,
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    borderRadius: themes.base.borderRadius
  },
  distance: {
    fontSize: 20,
    fontFamily: fonts.LatoBlack,
    alignSelf: 'flex-end',
    color:  colors.white.light,

  },
  geoFenceImg: {
    color: colors.white.light,
    marginRight: 5
  }


})

export default BroadcastFloatingCard;
