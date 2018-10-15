import React from 'react';
import {ScrollView, Text, Button, StyleSheet, ActivityIndicator} from 'react-native';

import ReservationView from '../../components/ProfileComponents/ReservationView';

import themes from "../../styleTheme";



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