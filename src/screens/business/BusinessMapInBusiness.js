import React from 'react';
import { connect } from 'react-redux';
import View from '../../components/common/View';
import {StyleSheet, FlatList, InteractionManager} from 'react-native';
import MapView from 'react-native-maps';
import Swiper from 'react-native-swiper';
import themes from '../../styleTheme';

import BusinessCard from '../../components/BusinessComponents/BusinessCard';

class BusinessMapInBusiness extends React.Component {

  state = {transitionFinished: false}

  constructor() {
    super();

  }

  componentDidMount() {
    //Evito la transizione a tratti (carico la mappa dopo che la transizione è finita)
    InteractionManager.runAfterInteractions(() => this.setState({transitionFinished: true}));
  }

  render() {

    const { businesses } = this.props.navigation.state.params;
    if (!businesses || !this.state.transitionFinished) return null;

    return (
      <View style={{flex:1}}>
        <MapView style={styles.map}
                 initialRegion={{
                   latitude: businesses[0].address.location.coordinates[1],
                   longitude: businesses[0].address.location.coordinates[0],
                   latitudeDelta: 0.5,
                   longitudeDelta: 0.5
                 }}
        >

          {
            businesses.map(bus =>
              <MapView.Marker
                coordinate={{
                  latitude: bus.address.location.coordinates[1],
                  longitude: bus.address.location.coordinates[0]}}
                title={bus.name}
                description={`${bus.address.street} ${bus.address.number}`}
              />
            )
          }

        </MapView>
        <View style={{backgroundColor: themes.base.colors.white.default, position: 'absolute', bottom: 0, height: '40%', width: '100%'}}>
          <FlatList
            data={businesses}
            renderItem={({item}) =>
              <View style={{width: 280, marginTop: 16, marginBottom: 16, marginLeft: 8, marginRight: 8, borderRadius: 8, backgroundColor: themes.base.colors.white.light}} elevation={2}>
                <BusinessCard business={item} style={{flex: 1}} onItemPress={() => this.handleBusPress(item)}/>
              </View>
            }
            horizontal={true}
            pagingEnabled={true}
          />
        </View>

      </View>
    )
  }


  handleBusPress(business) {

    this.props.navigation.navigate('BusinessProfileScreen', {business: business});

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

export default connect(mapStateToProps)(BusinessMapInBusiness);



