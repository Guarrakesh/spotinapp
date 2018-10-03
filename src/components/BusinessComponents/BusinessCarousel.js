import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import themes from '../../styleTheme'
//import BusinessFloatingCardLoader from './BusinessFloatingCardLoader';
import BusinessFloatingCard from './BusinessFloatingCard';

const sliderWidth = themes.base.deviceDimensions.width;

const BusinessCarousel = ({
  ids,
  data,
  isLoading,
  style,
  onItemPress
}) => (
    isLoading ?
      null
      :   <Carousel
            data={ids}
            // inactiveSlideScale={1}
            // inactiveSlideOpacity={1}
            firstItem={2}
            activeSlideAlignment={"center"}
            removeClippedSubviews={false}
            renderItem={({item}) =>
                <BusinessFloatingCard elevation={5}

                                       business={data[item]}
                                       style={{flex: 1}}
                                       onPress={() => onItemPress(item, data[item].dist)}/>
            }
            itemWidth={sliderWidth - 80}
            layout={'default'}
            sliderWidth={sliderWidth}
            activeAnimationType={'spring'}
            // inactiveSlideOpacity={1}
            // inactiveSlideScale={1}

        />

  )
export default BusinessCarousel;
