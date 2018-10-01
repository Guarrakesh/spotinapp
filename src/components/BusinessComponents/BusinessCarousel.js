import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';

//import BusinessFloatingCardLoader from './BusinessFloatingCardLoader';
import BusinessFloatingCard from './BusinessFloatingCard';
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
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            activeSlideAlignment={"start"}
              removeClippedSubviews={false}
            renderItem={({item}) =>
                <BusinessFloatingCard elevation={5}

                                       business={data[item]}
                                       style={{flex: 1}}
                                       onPress={() => onItemPress(item, data[item].dist)}/>
            }
            itemWidth={300}
            layout={'default'}

            sliderWidth={400}
            activeAnimationType={'spring'}
            // inactiveSlideOpacity={1}  //
            // inactiveSlideScale={1}

        />

  )
export default BusinessCarousel;
