import React from 'react';
import View from '../common/View';
import {Text, StyleSheet, TouchableOpacity, Linking, Platform} from 'react-native';
import themes from '../../styleTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';


const BusinessInfoCard = (props) => {

  let { business } = props;

  let roundedDistance = Math.round(business.dist.calculated*10)/10;
  roundedDistance = roundedDistance.toString().replace(".",",");

  const mapURL = Platform.OS === 'android' ? "google.navigation:q=" : "maps://app?daddr=";
  const businessAddr = `${business.dist.location.coordinates[1]}+${business.dist.location.coordinates[0]}`

  return (
    <View style={styles.businessInfoView} elevation={2}>
      <Text style={styles.businessNameText}>{business.name} • {business.type}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(`${mapURL}${businessAddr}`)}>
        <View style={styles.topContainer}>
          <View style={styles.distanceItemView}>
            <Icon name="map-marker-radius" color={themes.base.colors.accent.default} size={23}/>
            <Text>{roundedDistance} km</Text>
          </View>
          <View style={styles.businessAddressView}>
            <Text style={styles.businessStreetText}>{business.address.street} {business.address.number}</Text>
            <Text style={styles.businessCityText}>{business.address.city} ({business.address.province})</Text>
          </View>
          <View style={styles.arrowIconView}>
            <MaterialIcon name="keyboard-arrow-right" color={themes.base.colors.text.default} style={styles.arrowImg} size={25}/>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <View style={{height: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: 16}}>
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
    fontWeight: 'bold',
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
  businessAddressView: {
    justifyContent: 'center',
    marginLeft: 20,
    width: '100%'
  },
  businessStreetText: {
    fontSize: 18,
    fontStyle: 'italic'
  },
  businessCityText: {
    fontStyle: 'italic'
  },
  arrowIconView: {
    justifyContent: 'center',
    right: 0,
    height: '100%',
    position: 'absolute'
  },
  bottomContainer: {
    flexDirection: 'row',
    margin: 16,
    borderTopColor: themes.base.colors.text.default,
    borderTopWidth: 0.5
  },
  tvIcon: {
    marginLeft: 20,
  },
  wifiIcon: {
    marginLeft: 20
  },
  arrowImg: {
    marginRight: 8
  },
  seatsTvText: {
    fontSize: 18,
    color: themes.base.colors.text.default,
    marginLeft: 5,
    fontWeight: 'bold'
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
  }
})

export default BusinessInfoCard;