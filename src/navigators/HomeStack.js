import React from 'react';

import {createStackNavigator} from "react-navigation";
import themes from "../styleTheme";

import HomeScreen from '../screens/home/HomeScreen';
import BusinessProfileScreen from '../screens/spot/BusinessProfileScreen';
import BroadcastsScreen from '../screens/spot/BroadcastsScreen';

import Icon from 'react-native-vector-icons/Ionicons';
//import DismissButton from '../components/common/DismissButton';

import { View, Text, Button } from 'react-native';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    BusinessProfile: BusinessProfileScreen,
    BroadcastsList: BroadcastsScreen,
  },{
    navigationOptions: {
      headerBackTitle: false,
      headerBackImage: (<Icon
        color={themes.base.colors.text.default}
        name="ios-arrow-round-back" style={{marginLeft: 16}} size={48}/>)

    }
    }

);


export default HomeStack;
