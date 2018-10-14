import React from 'react';
import {Platform} from 'react-native'
import {createStackNavigator} from "react-navigation";
import themes from "../styleTheme";

import HomeScreen from '../screens/home/HomeScreen';
import BusinessProfileScreen from '../screens/spot/BusinessProfileScreen';
import BroadcastsScreen from '../screens/spot/BroadcastsScreen';
import BusinessScreen from '../screens/business/BusinessScreen';

import Icon from 'react-native-vector-icons/Ionicons';
//import DismissButton from '../components/common/DismissButton';


const HomeStack = createStackNavigator({
    Home: HomeScreen,
    BusinessProfileScreen: BusinessProfileScreen,
    BroadcastsList: BroadcastsScreen,
    BusinessScreen: BusinessScreen,
  },{
    navigationOptions: {
      headerBackTitle: null,
      headerBackImage: (<Icon
        color={themes.base.colors.text.default}
        name="ios-arrow-round-back" style={{marginLeft: Platform.OS === 'android' ? 0 : 16}} size={48}/>)

    }
    }

);


export default HomeStack;
