import React from 'react';
import View from '../common/View';
import {Text, Button, StyleSheet, TouchableWithoutFeedback, ImageBackground} from 'react-native';
import {Fonts} from "../../components/common/Fonts";
import themes from "../../styleTheme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";


const colors = themes.base.colors;

const ReservedOfferCard = (props) => {

  const {business, offer, dark, elevation} = props;

  let roundedDistance = Math.round(business.dist.calculated*10)/10;
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

  return(
    <View style={styles.outerContainer} elevation={elevation}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <ImageBackground source={{uri: business.image_url ? business.image_url[0].url : "https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/0a/dc/restaurant-chocolat.jpg"}}
                         style={{width: '100%', height: '100%'}}
                         imageStyle={{ borderRadius: themes.base.borderRadius }}
        >
          <View style={styles.bottomContainer}>
            <View style={styles.leftInfo}>
              <Text style={[styles.name, dark ? {color: colors.white.default} : {color: colors.text.default}]}>{business.name}</Text>
              <Text style={[styles.address, dark ? {color: colors.white.default} : {color: colors.text.default}]}>
                {business.address.street}
              </Text>

              <View style={{flexDirection: 'row'}}>
                <Icon name="map-marker-radius" color={dark ? colors.accent.light : colors.accent.default} style={styles.geoFenceImg} size={14}/>
                <Text style={[styles.distance, dark ? { color: colors.accent.light } : { color: colors.accent.default }]}>
                  {roundedDistance} km
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>

  )
}


ReservedOfferCard.propTyeps = {
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
    marginBottom: 8,
    backgroundColor: colors.white.light,
    height: 200,
    borderRadius: 8,
    marginTop: 8
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
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255,255,255,.8)'

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

export default ReservedOfferCard;