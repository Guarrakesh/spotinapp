import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import themes from '../../styleTheme'
import BroadcastFloatingCardLoader from './BroadcastFloatingCardLoader';
import BroadcastFloatingCard from './BroadcastFloatingCard';

const sliderWidth = themes.base.deviceDimensions.width;

const BroadcastCarousel = ({
                             ids,
                             data,
                             isLoading,
                             style,
                             onItemPress
                           }) => {
  const businessIds = [];
  ids = ids.filter(id => {

    if (!businessIds.includes(data[id].business))  {
      businessIds.push(data[id].business);
      return true;
    };
    return false;
  });
  return (
    isLoading ?
      null
      :   <Carousel
        swipeThreshold={0}
        data={ids}
        // inactiveSlideScale={1}
        // inactiveSlideOpacity={1}
        firstItem={2}
        activeSlideAlignment={"center"}
        removeClippedSubviews={false}
        renderItem={({item}) =>
          <BroadcastFloatingCard elevation={5}
                                 showEvent
                                 broadcast={data[item]}
                                 style={{flex: 1}}
                                 onPress={() => {onItemPress(item, data[item].business, data[item].dist)}}/>
        }
        itemWidth={sliderWidth - 80}
        layout={'default'}
        sliderWidth={sliderWidth}
        activeAnimationType={'spring'}
      />
  )

}
export default BroadcastCarousel;
