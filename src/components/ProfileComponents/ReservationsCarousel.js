import React from 'react';
import PropTypes from 'prop-types';
import {withNamespaces} from 'react-i18next';

import View from '../../components/common/View';
import {StyleSheet, Text} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ReservationFloatingCard from "./ReservationFloatingCard";
import themes from "../../styleTheme";
import Button from '../common/Button';


class ReservationsCarousel extends React.Component{

  constructor() {
    super();
    this.state = {
      futureReservations: []
    }

  }

  reservationUpdate() {
    const {ids, data} = this.props;
    const futureReservations = ids.filter(function(item) {
      //Ritorna le prenotazioni precedenti all'inizio dell'evento + 3 ore
      const expiredDate = new Date(data[item].end_at).getTime();
      const expiredDateTimestamp = new Date(expiredDate + (3 * 3600000));
      const broadcastExpiredDate = new Date(data[item].broadcast.end_at).getTime();
      const broadcastExpiredDateTimestamp = new Date(broadcastExpiredDate + (3 * 3600000));
      return (expiredDateTimestamp > Date.now() || broadcastExpiredDateTimestamp > Date.now());
    });

    this.setState({futureReservations: futureReservations});
  }

  componentDidMount() {
    this.reservationUpdate();

  }


  handleReservationPress(reservation){
    this.props.onItemPress(reservation);
  }


  render() {

    const { data, isLoading,  onBrowsePress, t} = this.props;
    if (isLoading) return null;
    const emptyComponent = (
        <View style={styles.emptyComponentView} elevation={2}>
          <Text style={styles.emptyComponentText}>
            {t('profile.bookedOffer.noReservations')}
          </Text>
          <Button onPress={onBrowsePress}
              variant="primary" uppercase clear>{t('profile.bookedOffer.browseOffers')}</Button>
        </View>
    );


    return(

        <View>
          <Text style={themes.base.inlineListTitleStyle}>{t("profile.bookedOffer.listTitle")}</Text>

          {
            this.state.futureReservations.length === 0 ? emptyComponent :
                <View style={{
                  right: 0,
                  bottom: 0,
                  paddingBottom: 5}}>

                  <Carousel
                      data={this.state.futureReservations}
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
                              t={t}
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
export default withNamespaces()(ReservationsCarousel);