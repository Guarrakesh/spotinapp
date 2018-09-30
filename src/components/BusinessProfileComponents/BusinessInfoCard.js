import React from 'react';
import View from '../common/View';
import {Text, StyleSheet, TouchableOpacity, Linking, Platform} from 'react-native';
import themes from '../../styleTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Fonts} from "../common/Fonts";
import call from 'react-native-phone-call'

const BusinessInfoCard = (props) => {

  let { business, distance } = props;

  let roundedDistance = Math.round(distance.calculated*10)/10;
  roundedDistance = roundedDistance.toString().replace(".",",");

  const mapURL = Platform.OS === 'android' ? "google.navigation:q=" : "maps://app?daddr=";
  const businessAddr = `${distance.location.coordinates[1]}+${distance.location.coordinates[0]}`

  return (
    <View style={styles.businessInfoView} elevation={2}>
      <Text style={styles.businessNameText}>{business.name}</Text>
      <Text style={styles.businessTypes}>{business.type.join(' • ')}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(`${mapURL}${businessAddr}`)}>
        <View style={styles.topContainer}>
          <View style={styles.distanceItemView}>
            <Icon name="map-marker-radius" color={themes.base.colors.accent.default} size={23}/>
            <Text style={styles.distanceText}>{roundedDistance} km</Text>
          </View>
          <View style={styles.businessAddressView}>
            <Text style={styles.businessStreetText} numberOfLines={1} adjustsFontSizeToFit={true}>{business.address.street} {business.address.number}</Text>
            <Text style={styles.businessCityText}>{business.address.city} ({business.address.province})</Text>
          </View>
          <View style={styles.arrowIconView}>
            <MaterialIcon name="keyboard-arrow-right" color={themes.base.colors.text.default} style={styles.arrowImg} size={25}/>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 16}}>
          <MaterialIcon name="event-seat" color={themes.base.colors.text.default} size={32}/>
          <Text style={styles.seatsTvText}>
            {business.seats}
          </Text>
          <MaterialIcon name="tv" color={themes.base.colors.text.default} size={32} style={styles.tvIcon}/>
          <Text style={styles.seatsTvText}>
            {business.tvs}
          </Text>
          {business.wifi ? <MaterialIcon name="wifi" color={themes.base.colors.text.default} size={32} style={styles.wifiIcon}/> : null}
        </View>
        <TouchableOpacity style={styles.callButton} onPress={() => {call({number: business.phone, prompt: true}).catch(console.error)}}>
          <MaterialIcon name="phone" color={themes.base.colors.accent.default} size={32} style={{margin: 8, marginLeft: 8}}/>
          <MaterialIcon name="keyboard-arrow-right" color={themes.base.colors.text.default}  size={25}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  businessInfoView: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: themes.base.colors.white.light,
    ...themes.base.elevations.depth1
  },
  businessNameText: {
    marginTop: 8,
    marginLeft: 16,
    fontSize: 20,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.text.default
  },
  businessTypes: {
    marginLeft: 16,
    fontSize: 16,
    fontFamily: Fonts.LatoLight,
    color: themes.base.colors.text.default
  },
  topContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  distanceItemView: {
    alignItems:'center',
    marginLeft: 16,
    marginTop: 8
  },
  distanceText:{
    fontFamily: Fonts.Lato
  },
  businessAddressView: {
    justifyContent: 'center',
    marginLeft: 20,
    flexWrap: 'wrap',
    flex: 1
  },
  businessStreetText: {
    fontSize: 18,
    fontFamily: Fonts.LatoItalic,
    color: themes.base.colors.accent.default
  },
  businessCityText: {
    fontFamily: Fonts.LatoItalic
  },
  arrowIconView: {
    justifyContent: 'center',
    right: 0,
  },
  bottomContainer: {
    flexDirection: 'row',
    margin: 16,
    borderTopColor: themes.base.colors.white.divisor,
    borderTopWidth: 1
  },
  tvIcon: {
    marginLeft: 20,
  },
  wifiIcon: {
    marginLeft: 20
  },
  arrowImg: {
    marginRight: 8,
  },
  seatsTvText: {
    fontSize: 18,
    color: themes.base.colors.text.default,
    marginLeft: 5,
    fontFamily: Fonts.LatoMedium
  },
  buttonText: {
    fontSize: 50,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Arial'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  callButton: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
    width: 80,
    borderColor: themes.base.colors.accent.default,
    borderWidth: 1,
    borderRadius: 25
  }
})

export default BusinessInfoCard;
