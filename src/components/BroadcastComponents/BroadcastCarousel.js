import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';

import BroadcastFloatingCardLoader from './BroadcastFloatingCardLoader';
import BroadcastFloatingCard from './BroadcastFloatingCard';
const BroadcastCarousel = ({
  ids,
  data,
  isLoading,
  style,
}) => {
    const businessIds = [];
    ids = ids.filter(id => {

      if (!businessIds.includes(data[id].business))  {
        businessIds.push(data[id].business);
        return true;
      };
      return false;
    });
    console.log(ids);
    return (
    isLoading ?
      null
      :   <Carousel

            data={ids}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            activeSlideAlignment={"start"}
            removeClippedSubviews={false}
            renderItem={({item}) =>
                <BroadcastFloatingCard elevation={5}
                                      showEvent
                                       broadcast={data[item]}
                                       style={{flex: 1}}
                                       onItemPress={() => {}}/>
            }
            itemWidth={300}
            layout={'default'}

            sliderWidth={400}
            activeAnimationType={'spring'}
            // inactiveSlideOpacity={1}  //
            // inactiveSlideScale={1}

        />
      )

  }
export default BroadcastCarousel;
