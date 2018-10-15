import React from 'react';
import View from '../../components/common/View';
import ReservationView from '../../components/ProfileComponents/ReservationView';
import {ScrollView, Text, Button, StyleSheet, ActivityIndicator} from 'react-native';
import ProfileController from '../../controllers/ProfileController';
import InlineListController from '../../controllers/InlineListController';


import ListController from '../../controllers/ListController'
import { userLogout } from '../../actions/login';
import UserInfoCard from '../../components/ProfileComponents/UserInfoCard';
import ReservationsCarousel from '../../components/ProfileComponents/ReservationsCarousel';
import SavedEventsCard from '../../components/ProfileComponents/SavedEventsCard';
import { connect } from 'react-redux';
import {Fonts} from "../../components/common/Fonts";
import themes from "../../styleTheme";
import reservation from "../../api/reservation";
import {ShowController} from "../../controllers/ShowController";


class ReservationScreen extends React.Component {


  render() {

    const {reservation} = this.props.navigation.state.params;

    return(
      <ScrollView style={{flexGrow: 1, backgroundColor: themes.base.colors.white.default}}
                  contentContainerStyle={{justifyContent: 'space-between'}}
                  bounces={false}
      >

            <ReservationView reservation={reservation}/>

      </ScrollView>
    )
  }
}

export default ReservationScreen;