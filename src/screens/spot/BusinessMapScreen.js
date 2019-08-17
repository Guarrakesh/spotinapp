import React from 'react';
import { connect } from 'react-redux';
import View from '../../components/common/View';
import { StyleSheet, Text, InteractionManager, Animated } from 'react-native';
import MapView, { AnimatedRegion, Animated as AnimatedMap } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import { coordsSelector } from "../../reducers/location";
import themes from '../../styleTheme';

import BroadcastFloatingCard from '../../components/BroadcastComponents/BroadcastFloatingCard';

class BusinessMapScreen extends React.Component {

  state = {
    transitionFinished: false,
    region: null,
    carouselVisible: true,
    carouselY: new Animated.Value(20)
  };

  latitudeDelta = 0.1;
  longitudeDelta = 0.1;



  constructor() {
    super();

    this._centerMapOnMarker = this._centerMapOnMarker.bind(this);
    this.slideCarousel = this.slideCarousel.bind(this);
    this.onMarkerPress = this.onMarkerPress.bind(this);
  }

  componentDidMount() {
    //Evito la transizione a tratti (carico la mappa dopo che la transizione è finita)
    InteractionManager.runAfterInteractions(() => this.setState({transitionFinished: true}));

    const { ids, data } = this.props.navigation.state.params;

    this.setState({
      region: new AnimatedRegion({
        latitude: data[ids[0]].dist.location.coordinates[1],
        longitude: data[ids[0]].dist.location.coordinates[0],
        latitudeDelta: this.latitudeDelta,
        longitudeDelta: this.longitudeDelta
      })
    })
  }

  _centerMapOnMarker(index) {
    const { data, ids } = this.props.navigation.state.params;
    const location = data[ids[index]].dist.location;

    const {region} = this.state;

    requestAnimationFrame(() => {
      region.timing({
        latitude:  location.coordinates[1], // selected marker lat
        longitude: location.coordinates[0], // selected marker lng
      }).start();
    });

  }

  slideCarousel() {
    requestAnimationFrame(() => {
      Animated.timing(this.state.carouselY, {
        toValue: (this.state.carouselVisible ? 220 : 20),
        duration: 500,
      }).start(() => this.setState({
        carouselVisible: !this.state.carouselVisible
      }));
    })
  }

  onMarkerPress(business) {
    const { ids } = this.props.navigation.state.params;
    const indexToScroll = ids.indexOf(business.id);

    requestAnimationFrame(() => {
      if(!this.state.carouselVisible){
        this.slideCarousel();
      }
      this.carousel.snapToItem(indexToScroll, true, false); //fireCallback false per non triggerare onSnapToItem del carousel
    })
  }

  render() {

    const { businesses } = this.props;
    const { ids, data } = this.props.navigation.state.params;
    if (!ids || !data || !this.state.transitionFinished) return null;

    if (ids.length === 0) {
      return (
        <View style={themes.base.noContentView}>
          <Text style={themes.base.noContentText}>{'Nessun locale da mostrare'}</Text>
        </View>
      )
    }

    const region = new AnimatedRegion({
      latitude: data[ids[0]].dist.location.coordinates[1],
      longitude: data[ids[0]].dist.location.coordinates[0],
      latitudeDelta: this.latitudeDelta,
      longitudeDelta: this.longitudeDelta
    });

    const sliderWidth = themes.base.deviceDimensions.width;

    return (
      <View style={{flex:1}}>
        <AnimatedMap
          style={styles.map}
          region={this.state.region || region}
          onPress={this.slideCarousel}
          onRegionChange={() => null}
        >

          {
            ids.map(id =>

              <MapView.Marker
                pointerEvents={"auto"}
                onPress={(e) => {e.stopPropagation(); this.onMarkerPress(data[id])}} //stopPropagation disabilita il MapPress su ios
                coordinate={{
                  latitude: data[id].dist.location.coordinates[1],
                  longitude: data[id].dist.location.coordinates[0]}}
                title={businesses[data[id].business].name}
                description={data[id].offer.title}
              />
            )
          }

        </AnimatedMap>
        <Animated.View style={{
          transform: [{translateY: this.state.carouselY}],
          position: 'absolute',
          right: 0,
          bottom: 0,
          paddingBottom: 20
        }}>
          <Carousel
            ref={carousel => this.carousel = carousel}
            data={ids}
            activeSlideAlignment={"center"}
            renderItem={({item}) =>
              <BroadcastFloatingCard elevation={5}
                                     broadcast={data[item]}
                                     style={{flex: 1}}
                                     onPress={() => this.handleBusPress(item, data[item].business, data[item].dist)}/>
            }
            itemWidth={sliderWidth - 80}
            sliderWidth={sliderWidth}
            activeAnimationType={'spring'}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            removeClippedSubviews={false}
            onSnapToItem={(index, marker) => this._centerMapOnMarker(index, marker)}

          />
        </Animated.View>
      </View>
    )
  }


  handleBusPress(broadcastId, businessId, distance) {

    this.props.navigation.navigate('BusinessProfileScreen', {broadcastId, businessId, distance});

  }
}


//equivale a function mapStateToProps(state) {}
const mapStateToProps = (state, props) => {
  const { listId } = props.navigation.state.params;
  //Mi prendo dallo state redux i business di questi broadcast
  let businesses;
  const resources = state.entities;
  const list = state.entities.broadcasts.list[listId];
  if (!listId || !list) businesses = {};
  else {
    businesses = list.ids.reduce((acc, id) => ({
      ...acc,
      [resources.broadcasts.data[id].business]: state.entities.businesses.data[resources.broadcasts.data[id].business]
    }), {});
  }




  const { latitude, longitude } = coordsSelector(state);

  return {
    latitude, longitude,
    businesses: businesses,
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
