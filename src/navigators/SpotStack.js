import React from 'react';
import SportScreen from "../screens/SportScreen";
import EventScreen from '../screens/EventScreen';
import BroadcastsScreen from '../screens/BroadcastsScreen';
import CompetitionsScreen from "../screens/CompetitionsScreen";
import {createStackNavigator} from "react-navigation";
import themes from "../styleTheme";
import BusinessScreen from "../components/BusinessScreen";
import BusinessMapScreen from "../screens/BusinessMapScreen";
import BusinessProfileScreen from '../screens/BusinessProfileScreen'

import { View, Text, Button } from 'react-native';


export const BusinessMapNavigator = createStackNavigator({
    BusinessMapScreen: {
      screen: BusinessMapScreen,
      navigationOptions: {
        title: "Mappa Locali",
        headerLeft: (
          <Button
            title="Annulla"
            color="#555"
          />
        ),
      },
    }
  }, {
    mode: 'modal',

  }
);
export const SpotStack = createStackNavigator({
    SportList: {
      screen: SportScreen,
      navigationOptions: {  title: 'Sport' }

    },
    Competitions: {
      screen: CompetitionsScreen,
      navigationOptions: ({navigation}) => ({ title: navigation.state.params.sport.name })
    },
    Events: {
      screen: EventScreen,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.competition.name,
        headerBackTitle: null,
      })
    },
    BroadcastsList: {
      screen: BroadcastsScreen,


    },
    BusinessProfileScreen: {
      screen: BusinessProfileScreen,
      navigationOptions: ({navigation}) => ({
        title: "Profilo locale",
        headerBackTitle: null,
      })
    },

  },{
    navigationOptions: {

      headerStyle: {
        backgroundColor: themes.base.colors.primary.default
      },
      headerTintColor: themes.base.colors.white.default,
    }
  }
);


