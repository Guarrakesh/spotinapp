import React from 'react';
import {connect} from 'react-redux';

import {ScrollView} from 'react-native';

import {cancelReservation, deleteReservation} from '../../actions/reservation';

import ReservationView from '../../components/ProfileComponents/ReservationView';

import themes from "../../styleTheme";


class ReservationScreen extends React.Component {


  onCancel() {
    const { reservation } = this.props.navigation.state.params;
    this.props.cancelReservation(reservation.user, reservation._id, reservation.broadcast._id);
    this.props.deleteReservation(reservation.user, reservation._id, reservation.broadcast._id);
    this.props.navigation.goBack();
  }

  render() {

    const {reservation} = this.props.navigation.state.params;

    return(
      <ScrollView style={{flexGrow: 1, backgroundColor: themes.base.colors.white.default}}
                  contentContainerStyle={{justifyContent: 'space-between'}}
                  bounces={false}
      >
        <ReservationView reservation={reservation} onCancel={this.onCancel.bind(this)}/>
      </ScrollView>
    )
  }
}

export default connect(null, {cancelReservation, deleteReservation})(ReservationScreen);