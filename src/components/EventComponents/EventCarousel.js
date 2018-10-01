import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';

//import BusinessFloatingCardLoader from './BusinessFloatingCardLoader';
import EventFloatingCard from './EventFloatingCard';


const EventCarousel = ({
  ids,
  data,
  isLoading,
  sports,
  style,
  onItemPress
}) => (
  isLoading || Object.keys(sports).length === 0 ?
      null
      :   <Carousel

            data={ids}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            activeSlideAlignment={"start"}
            removeClippedSubviews={false}
            renderItem={({item}) =>
                <EventFloatingCard elevation={5}
                                       event={data[item]}
                                       sport={sports[data[item].sport]}
                                       style={{flex: 1}}
                                       onPress={() => {onItemPress(data[item], item)}}/>
            }
            itemWidth={300}
            layout={'default'}
            slideStyle={{marginLeft: 8}}
            sliderWidth={375}
            activeAnimationType={'spring'}
            // inactiveSlideOpacity={1}  //
            // inactiveSlideScale={1}

        />

    );
export default connect(state => ({
  sports: state.entities.sports.data
}), {})(EventCarousel);
