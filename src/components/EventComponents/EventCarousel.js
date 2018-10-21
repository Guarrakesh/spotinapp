import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import themes from '../../styleTheme'
//import BusinessFloatingCardLoader from './BusinessFloatingCardLoader';
import EventFloatingCard from './EventFloatingCard';
import {ActivityIndicator, View} from "react-native";

const sliderWidth = themes.base.deviceDimensions.width;

const EventCarousel = ({
  ids,
  data,
  isLoading,
  style,
  onItemPress
}) => (
  isLoading ? null :
   <Carousel

            data={ids}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            enableSnap={false}
            loop={true}
            activeSlideAlignment={"start"}
            removeClippedSubviews={false}
            renderItem={({item}) =>
                <EventFloatingCard elevation={1}
                                       event={data[item]}

                                       style={{flex: 1}}
                                       onPress={() => {onItemPress(data[item], item)}}/>
            }
            itemWidth={sliderWidth - 50}
            layout={'default'}
            sliderWidth={sliderWidth}
            activeAnimationType={'spring'}

        />

    );
export default EventCarousel;
