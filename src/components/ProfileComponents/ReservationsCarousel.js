import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import View from '../../components/common/View';
import { Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ReservationFloatingCard from "./ReservationFloatingCard";
import themes from "../../styleTheme";


class ReservationsCarousel extends React.Component{

  render() {

    const { ids, data, isLoading } = this.props;
    if (isLoading) return null;

    return(
      <View style={{
        right: 0,
        bottom: 0,
        paddingBottom: 5, marginLeft: -8, marginRight: -8}}>
        <Text style={themes.base.inlineListTitleStyle}>Offerte prenotate</Text>

        <Carousel
          data={ids}
          itemWidth={themes.base.deviceDimensions.width - 80}
          sliderWidth={themes.base.deviceDimensions.width}
          activeAnimationType={'spring'}
          activeSlideAlignment={'center'}
          // inactiveSlideOpacity={1}
          // inactiveSlideScale={1}
          loop={true}
          removeClippedSubviews={false}
          containerCustomStyle={{marginTop: 8}}
          renderItem={({item}) =>
            <ReservationFloatingCard
              elevation={2}
              reservation={data[item]}

              onPress={() => this.handleBusPress(item)}/>}
        />
      </View>
    )

  }

}

ReservationsCarousel.propTypes = {
  ids: PropTypes.array,
  data: PropTypes.data
};
export default ReservationsCarousel;