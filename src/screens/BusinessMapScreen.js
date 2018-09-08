import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList } from 'react-native';
import MapView from 'react-native-maps';
import Swiper from 'react-native-swiper';
import themes from '../styleTheme';

import BroadcastCardInMap from '../components/BusinessProfileComponents/BroadcastCardInMap';

class BusinessMapScreen extends React.Component {
  render() {
    const { broadcasts } = this.props.navigation.state.params;
    if (!broadcasts) return null;



    return (
      <View style={{flex:1}}>
        <MapView style={styles.map}
                 initialRegion={{
                   latitude: broadcasts[0].business.address.location.coordinates[1],
                   longitude: broadcasts[0].business.address.location.coordinates[0],
                   latitudeDelta: 0.5,
                   longitudeDelta: 0.5
                 }}
        >

          {
            broadcasts.map(broad =>
              <MapView.Marker
                coordinate={{
                  latitude: broad.business.address.location.coordinates[1],
                  longitude: broad.business.address.location.coordinates[0]}}
                title={broad.business.name}
                description={broad.offer.title}
              />
            )
          }

        </MapView>
        <View style={{backgroundColor: themes.base.colors.white.default, position: 'absolute', bottom: 0, height: '35%', width: '100%'}}>
          <FlatList
            data={broadcasts}
            renderItem={({item}) =>
              <View style={{width: 280, marginTop: 16, marginBottom: 16, marginLeft: 8, marginRight: 8}}>
                <BroadcastCardInMap business={item.business} offer={item.offer}/>
              </View>
            }
            horizontal={true}
            pagingEnabled={true}
          />
        </View>

      </View>
    )
  }
}


//equivale a function mapStateToProps(state) {}
const mapStateToProps = (state) => {
  return {
    latitude: state.location.latitude,
    longitude: state.location.longitude,
  };
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

  },
  buttonText: {
    fontSize: 50,
    color: 'rgba(000, 000, 000, 0.7)',
    fontFamily: 'Arial'
  }
});

export default connect(mapStateToProps)(BusinessMapScreen);



