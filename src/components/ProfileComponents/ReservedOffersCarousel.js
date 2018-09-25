import React from 'react';
import { connect } from 'react-redux';
import View from '../../components/common/View';
import { StyleSheet, FlatList, InteractionManager, Animated } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ReservedOfferCard from "./ReservedOfferCard";
import themes from "../../styleTheme";


class ReservedOffersCarousel extends React.Component{

  render() {

    const {broadcasts} = this.props;

    return(
      <View style={{
        right: 0,
        bottom: 0,
        paddingBottom: 20}}>
        <Carousel
          data={broadcasts}
          itemWidth={300}
          itemHeight={200}
          sliderWidth={400}
          activeAnimationType={'spring'}
          activeSlideAlignment={'start'}
          // inactiveSlideOpacity={1}
          // inactiveSlideScale={1}
          renderItem={({item}) =>
            <ReservedOfferCard
              elevation={2}
              business={item.business}
              offer={item.offer}
              style={{flex:1}}
              onItemPress={() => this.handleBusPress(item)}/>}
        />
      </View>
    )

  }

}

export default ReservedOffersCarousel;