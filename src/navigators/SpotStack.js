import React from 'react';
import SportScreen from "../screens/spot/SportScreen";
import EventScreen from '../screens/spot/EventScreen';
import BroadcastsScreen from '../screens/spot/BroadcastsScreen';
import CompetitionsScreen from "../screens/spot/CompetitionsScreen";
import {createStackNavigator} from "react-navigation";
import themes from "../styleTheme";
import BusinessMapScreen from "../screens/spot/BusinessMapScreen";
import BusinessProfileScreen from '../screens/spot/BusinessProfileScreen';

import DismissButton from '../components/common/DismissButton';

import { View, Text, Button } from 'react-native';


export const BusinessMapNavigatorInSpot = createStackNavigator({
    BusinessMapScreen: {
      screen: BusinessMapScreen,
      navigationOptions: ({navigation}) => {
        return {
          title: "Mappa Locali",
          headerRight: (
            <DismissButton onPress={() => {navigation.navigate('BroadcastsList')}} color={themes.base.colors.text.default} style={{marginRight: 16}}/>
          ),
        }
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
      navigationOptions: ({navigation}) => ({ title: navigation.state.params.title || "Spot In" })
    },
    Events: {
      screen: EventScreen,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title || "Spot In",
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
    cardStyle: { backgroundColor: themes.base.backgroundColor },

    navigationOptions: {

      headerStyle: {
        backgroundColor: themes.base.colors.primary.default

      },
      headerTintColor: themes.base.colors.text.default,
    }
  }
);
