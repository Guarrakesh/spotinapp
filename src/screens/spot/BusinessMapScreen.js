import React from 'react';
import { connect } from 'react-redux';
import View from '../../components/common/View';
import { StyleSheet, FlatList, InteractionManager, Animated } from 'react-native';
import MapView from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';

import themes from '../../styleTheme';

import BroadcastFloatingCard from '../../components/BusinessProfileComponents/BroadcastFloatingCard';

class BusinessMapScreen extends React.Component {
  state = {transitionFinished: false, region: null,
    carouselVisible: true, carouselY: new Animated.Value(20)
  };

  latitudeDelta = 0.1;
  longitudeDelta = 0.1;

  constructor() {
    super();

    this._centerMapOnMarker = this._centerMapOnMarker.bind(this);
    this.slideCaoursel = this.slideCaoursel.bind(this);
  }

  componentDidMount() {
    //Evito la transizione a tratti (carico la mappa dopo che la transizione è finita)
    InteractionManager.runAfterInteractions(() => this.setState({transitionFinished: true}));
  }

  _centerMapOnMarker(index) {
    const { broadcasts } = this.props.navigation.state.params;
    const location = broadcasts[index].business.address.location;
    this.setState({
      region: {
        latitude: location.coordinates[1],
        longitude: location.coordinates[0],
        latitudeDelta: this.latitudeDelta,
        longitudeDelta: this.longitudeDelta
      }
    })
  }
  slideCaoursel() {
    Animated.timing(this.state.carouselY, {
      toValue: (this.state.carouselVisible ? 220 : -10),
      duration: 500,
    }).start();
    this.setState({
      carouselVisible: !this.state.carouselVisible
    });
  }
  render() {

    const { broadcasts } = this.props.navigation.state.params;
    if (!broadcasts || !this.state.transitionFinished) return null;

    const region = {
      latitude: broadcasts[0].business.address.location.coordinates[1],
      longitude: broadcasts[0].business.address.location.coordinates[0],
      latitudeDelta: this.latitudeDelta,
      longitudeDelta: this.longitudeDelta
    }
    return (
        <View style={{flex:1}}>
          <MapView style={styles.map}
                   region={this.state.region || region}
                   onPress={this.slideCaoursel}

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

          <Animated.View style={{
            transform: [{translateY: this.state.carouselY}],
            position: 'absolute',
            right: 0,
            bottom: 0,
            paddingBottom: 20
          }}>
          <Carousel
              data={broadcasts}
              renderItem={({item}) =>
                  <BroadcastFloatingCard elevation={5} business={item.business} offer={item.offer} style={{flex: 1}}
                                      onItemPress={() => this.handleBusPress(item)}/>
              }
              itemWidth={300}
              sliderWidth={400}
              activeAnimationType={'spring'}


              onSnapToItem={(index, marker) => this._centerMapOnMarker(index, marker)}

          />
          </Animated.View>
        </View>
    )
  }


  handleBusPress(broadcast) {

    this.props.navigation.navigate('BusinessProfileScreen', {business: broadcast.business});

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
  carouselContainer: {




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



