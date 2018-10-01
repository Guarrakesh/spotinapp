import React from 'react';

import {createStackNavigator} from "react-navigation";
import themes from "../styleTheme";

import HomeScreen from '../screens/home/HomeScreen';
import BusinessProfileScreen from '../screens/spot/BusinessProfileScreen';
import BroadcastsScreen from '../screens/spot/BroadcastsScreen';

//import DismissButton from '../components/common/DismissButton';

import { View, Text, Button } from 'react-native';

const SpotStack = createStackNavigator({
    Home: HomeScreen,
    BusinessProfile: BusinessProfileScreen,
    BroadcastsList: BroadcastsScreen,
  },{
    //NavOptions
  }
);


export default SpotStack;
