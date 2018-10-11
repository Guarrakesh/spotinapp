import React from 'react';
import { connect } from 'react-redux';
import View from '../../components/common/View';
import {StyleSheet, FlatList, InteractionManager, Animated} from 'react-native';
import MapView from 'react-native-maps';
import Swiper from 'react-native-swiper';
import themes from '../../styleTheme';

import BusinessCard from '../../components/BusinessComponents/BusinessCard';
import Carousel from "react-native-snap-carousel";
import BroadcastFloatingCard from "../../components/BroadcastComponents/BroadcastFloatingCard";

class BusinessMapInBusiness extends React.Component {

  state = {transitionFinished: false, region: null,
    carouselVisible: true, carouselY: new Animated.Value(20)
  };

  latitudeDelta = 0.1;
  longitudeDelta = 0.1;

  constructor() {
    super();

    this._centerMapOnMarker = this._centerMapOnMarker.bind(this);
    this.slideCarousel = this.slideCarousel.bind(this);

  }

  componentDidMount() {
    //Evito la transizione a tratti (carico la mappa dopo che la transizione è finita)
    InteractionManager.runAfterInteractions(() => this.setState({transitionFinished: true}));
  }

  _centerMapOnMarker(index) {
    const { data, ids } = this.props.navigation.state.params;
    const location = data[ids[index]].dist.location;
    this.setState({
      region: {
        latitude: location.coordinates[1],
        longitude: location.coordinates[0],
        latitudeDelta: this.latitudeDelta,
        longitudeDelta: this.longitudeDelta
      }
    })
  }

  slideCarousel() {
    Animated.timing(this.state.carouselY, {
      toValue: (this.state.carouselVisible ? 220 : 20),
      duration: 500,
    }).start();
    this.setState({
      carouselVisible: !this.state.carouselVisible
    });
  }

  render() {

    //const { businesses } = this.props;
    const { ids, data } = this.props.navigation.state.params;

    if (!ids || !data || !this.state.transitionFinished) return null;

    const region = {
      latitude: data[ids[0]].dist.location.coordinates[1],
      longitude: data[ids[0]].dist.location.coordinates[0],
      latitudeDelta: this.latitudeDelta,
      longitudeDelta: this.longitudeDelta
    }
    const sliderWidth = themes.base.deviceDimensions.width;

    return (
      <View style={{flex:1}}>
        <MapView style={styles.map}
                 region={this.state.region || region}
                 onPress={this.slideCarousel}
        >
          {
            ids.map(id =>
              <MapView.Marker
                coordinate={{
                  latitude: data[id].address.location.coordinates[1],
                  longitude: data[id].address.location.coordinates[0]}}
                title={data[id].name}
                description={`${data[id].address.street} ${data[id].address.number}`}
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
            data={ids}
            activeSlideAlignment={"center"}
            renderItem={({item}) =>
              <BusinessCard business={data[item]}
                            style={{flex: 1}}
                            onPress={() => this.handleBusPress(item, data[item].dist)}/>
            }
            itemWidth={sliderWidth - 80}
            sliderWidth={sliderWidth}
            activeAnimationType={'spring'}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            onSnapToItem={(index, marker) => this._centerMapOnMarker(index, marker)}

          />
        </Animated.View>
      </View>
    )
  }


  handleBusPress(businessId, distance) {

    this.props.navigation.navigate('BusinessProfileScreen', {businessId: businessId, distance: distance});

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



