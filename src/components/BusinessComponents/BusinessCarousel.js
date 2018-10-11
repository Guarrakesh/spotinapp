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
      <View style={{height: 166, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={themes.base.colors.accent.default}/>
      </View>
      :   <Carousel
            data={ids}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            enableSnap={false}
            loop={true}
            activeSlideAlignment={"start"}
            removeClippedSubviews={false}
            renderItem={({item}) =>
                <BusinessFloatingCard elevation={2}
                                       business={data[item]}
                                       style={{flex: 1}}
                                       onPress={() => onItemPress(item, data[item].dist)}/>
            }
            itemWidth={sliderWidth - 50}
            layout={'default'}
            sliderWidth={sliderWidth}
            activeAnimationType={'spring'}

        />

  )
export default BusinessCarousel;
