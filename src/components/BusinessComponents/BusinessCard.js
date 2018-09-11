import React from 'react';

import View from '../common/View';
import {Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import themes from '../../styleTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';


const BusinessCard = (props) => {

  const { business } = props;

  let roundedDistance = Math.round(business.dist.calculated*10)/10;
  roundedDistance = roundedDistance.toString().replace(".",",");


  return (
    <TouchableOpacity onPress={props.onItemPress}>
      <View elevation={1} style={styles.innerContainer}>
        <View style={styles.topContainer}>
          <ImageBackground
            imageStyle={{ borderRadius: themes.base.borderRadius }}
            source={{uri: business.image_url ? business.image_url[0].url: "https://www.hotelristorantemiranda.com/wp-content/uploads/2014/09/ristorante-slide-01.jpg"}}
            style={styles.imgBackground}
          >
            <View style={styles.overlayView}>
              <View style={{flexDirection: 'column', justifyContent: 'flex-end', borderTopLeftRadius: themes.base.borderRadius}}>
                <Text style={styles.name}>{business.name} • {business.type}</Text>
                <Text style={styles.address}>{business.address.city} ({business.address.province})</Text>
              </View>
              <View style={{flexDirection: 'column', justifyContent: 'flex-end', flex: 1, borderTopRightRadius: themes.base.borderRadius}}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Icon name="map-marker-radius" color={themes.base.colors.white.light} style={styles.geoFenceImg} size={21}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <Text style={styles.distance}>{roundedDistance} km</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.bottomContainer}>
          <View style={{flex: 2, height: '100%', flexDirection: 'row', alignItems: 'center', borderRightColor: themes.base.colors.text.default, borderRightWidth: 0.5}}>
            <MaterialIcon name="event-seat" color={themes.base.colors.text.default} size={32} style={styles.seatsImg}/>
            <Text style={{fontSize: 18, color: themes.base.colors.text.default, marginLeft: 5, fontWeight: 'bold'}}>
              {business.seats}
            </Text>
            <MaterialIcon name="tv" color={themes.base.colors.text.default} size={32} style={styles.seatsImg}/>
            <Text style={{fontSize: 18, color: themes.base.colors.text.default, marginLeft: 5, fontWeight: 'bold'}}>
              {business.tvs}
            </Text>
            {business.wifi ? <MaterialIcon name="wifi" color={themes.base.colors.text.default} size={32} style={styles.seatsImg}/> : null}
          </View>
        </View>
      </View>
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
    fontSize: 16,
    color: themes.base.colors.white.default,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  address: {
    fontWeight: 'bold',
    fontSize: 12,
    color: themes.base.colors.white.default,
    marginLeft: 8,
    marginBottom: 8
  },
  distance: {
    fontSize: 18,
    fontWeight: 'bold',
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