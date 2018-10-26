import React from 'react';

import {View, Touchable} from '../common';
import VersionedImage from '../common/VersionedImageField';

import {Text, StyleSheet, ImageBackground} from 'react-native';
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


  const component = (
      <View style={styles.innerContainer}>
        <Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit={true}>
          {business.name}
        </Text>
        <Text style={styles.type} numberOfLines={1} adjustsFontSizeToFit={true}>
          {business.type.join(' • ')}
        </Text>
        <View style={styles.distanceContainer}>
          <Icon name="map-marker-radius" color={colors.white.light}
                style={styles.geoFenceImg} size={20}/>
          <Text style={styles.distance}>
            {roundedDistance} km
          </Text>
        </View>
      </View>
  );
  return (

      <Touchable activeOpacity={0.5}
                 style={[styles.outerContainer, {elevation, ...themes.base.elevations[`depth${elevation}`]}]}
                 onPress={onPress} delayPressIn={50}>

        { business.cover_versions && business.cover_versions.length > 0 ?
            <VersionedImage
                isBackground
                minSize={{width: 550, height: 250}}
                imgSize={{width: 350, height: 150}}
                style={styles.imgBackground(6)}

                imageStyle={{borderRadius: themes.base.borderRadius}}
                source={business.cover_versions}>
              {component}
            </VersionedImage>
            :<ImageBackground
            imageStyle={{borderRadius: themes.base.borderRadius}}
            style={[styles.imgBackground(6),{width: 350, height: 150}]} source={{uri:  "https://via.placeholder.com/350x150"}}>
          {component}
        </ImageBackground>}


      </Touchable>


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
    ...themes.base.elevations[`depth${elevation}`]

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
    alignItems: 'center',
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
