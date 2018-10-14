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

const reservation = {
  broadcast: {
    "_id": "5bbb6df62c8b6a001ff20655",
    "newsfeed": 1,
    "event": "5b9958ca2663a4001f50c879",
    "business": "5bb68212491957001f97fc94",
    "offer": {
      "_id": "5bbb6df62c8b6a001ff20656",
      "title": "Derby con birra!",
      "description": "Birra gratis per spesa minima di 15€  ",
      "type": 0,
      "value": 15
    },
    "image_url": [],
    "reservations": [],
    "__v": 0,
    "dist": {
      "calculated": 1.234
    }
  },
  createdAt: null
}

class ReservationScreen extends React.Component {

  render() {
    return(
      <View>
        <ReservationView reservation={reservation}/>
      </View>
    )
  }
}

export default ReservationScreen;