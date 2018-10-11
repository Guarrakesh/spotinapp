import React from 'react';
import View from '../common/View';
import {Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import themes from '../../styleTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Fonts} from "../common/Fonts";

const colors = themes.base.colors;

const BusinessCard = (props) => {

  const { business, onPress } = props;

  let roundedDistance = Math.round(business.dist.calculated*10)/10;
  roundedDistance = roundedDistance.toString().replace(".",",");


  return (
    <View style={styles.container} elevation={2}>
      <TouchableOpacity onPress={onPress} delayPressIn={100}>
        <ImageBackground
          imageStyle={{borderRadius: themes.base.borderRadius}}
          source={{uri: business.cover_versions[0] ? business.cover_versions[0].url : "https://www.hotelristorantemiranda.com/wp-content/uploads/2014/09/ristorante-slide-01.jpg"}}
          style={styles.imgBackground}
        >
          <View style={styles.businessContainer}>
            <View style={{flexDirection: 'column', flex: 1}}>
              <Text style={styles.businessName}>{business.name}</Text>
              <Text style={styles.businessType}>{business.type.join(' • ')}</Text>
              <Text style={styles.businessAddress}>{business.address.street} {business.address.number}</Text>
              <Text style={styles.businessAddress}>{business.address.city} ({business.address.province})</Text>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Icon name="map-marker-radius" color={colors.white.light} size={25}/>
              <Text style={styles.businessDistance}>{roundedDistance} km</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>

  );
};

BusinessCard.propTypes = {
  onPress: PropTypes.func,
  business: PropTypes.object
}

const styles = StyleSheet.create({
  container: {
    borderRadius: themes.base.borderRadius,
    overflow: 'hidden',
    margin: 8,
    backgroundColor: themes.base.colors.white.light
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
    alignItems: 'flex-end',
    flexDirection: 'row',
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
})

export default BusinessCard;