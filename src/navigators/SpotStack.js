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
import Icon from 'react-native-vector-icons/Ionicons';

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


    },
    Competitions: {
      screen: CompetitionsScreen,
      navigationOptions: ({navigation}) => ({
        ...navigation.navigationOptions,
        headerBackTitle: null,

        title: navigation.state.params.title || "Spot In" })
    },
    Events: {
      screen: EventScreen,
      navigationOptions: ({navigation}) => ({
          ...navigation.navigationOptions,
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
        headerBackTitle: null,
      })
    },

  },{
    cardStyle: { backgroundColor: themes.base.backgroundColor },

    navigationOptions: {
      headerBackTitle: "",
      headerBackImage: (<Icon
        color={themes.base.colors.text.default}
        name="ios-arrow-round-back" style={{marginLeft: 16}} size={48}/>),

      headerStyle: {
        backgroundColor: themes.base.colors.primary.default

      },
      headerTintColor: themes.base.colors.text.default,
    }
  }
);
