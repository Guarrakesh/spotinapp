import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import View from '../../components/common/View';
import { Text, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ReservationFloatingCard from "./ReservationFloatingCard";
import themes from "../../styleTheme";
import Button from '../common/Button';


class ReservationsCarousel extends React.Component{

  handleReservationPress(reservation){
    this.props.onItemPress(reservation);
  }

  render() {

    const { ids, data, isLoading,  onBrowsePress} = this.props;
    if (isLoading) return null;
    const emptyComponent = (
        <View style={styles.emptyComponentView} elevation={2}>
          <Text style={styles.emptyComponentText}>
            {'Non hai ancora nessuna prenotazione'}
          </Text>
          <Button clear={true} onPress={onBrowsePress}> Esplora offerte </Button>
        </View>
    );
    return(

        <View>
          <Text style={themes.base.inlineListTitleStyle}>Offerte prenotate</Text>

          {
            ids.length === 0 ? emptyComponent :
                <View style={{
                  right: 0,
                  bottom: 0,
                  paddingBottom: 5}}>

                  <Carousel
                      data={ids}
                      itemWidth={themes.base.deviceDimensions.width - 80}
                      sliderWidth={themes.base.deviceDimensions.width}
                      activeAnimationType={'spring'}
                      activeSlideAlignment={'start'}
                      inactiveSlideOpacity={1}
                      inactiveSlideScale={1}
                      loop={true}
                      enableSnap={false}
                      removeClippedSubviews={false}
                      renderItem={({item}) =>
                          <ReservationFloatingCard
                              elevation={0}
                              reservation={data[item]}
                              onPress={() => this.handleReservationPress(data[item])}/>}
                  />
                </View>
          }
        </View>
    )

  }

}

const styles = StyleSheet.create({


  emptyComponentView: {
    backgroundColor: themes.base.colors.white.light,
    borderRadius: themes.base.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    margin: 8
  },
  emptyComponentText: {
    fontSize: 14,
    fontFamily: themes.base.fonts.LatoMedium,
    padding: 8,
  }
});


ReservationsCarousel.propTypes = {
  ids: PropTypes.array,
  data: PropTypes.object,
  onBrowsePress: PropTypes.func
};
export default ReservationsCarousel;