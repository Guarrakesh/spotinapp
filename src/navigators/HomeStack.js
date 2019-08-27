import React from 'react';
import {Platform} from 'react-native'
import {createStackNavigator} from "react-navigation";
import themes from "../styleTheme";

import HomeScreen from '../screens/home/HomeScreen';
import BusinessProfileScreen from '../screens/spot/BusinessProfileScreen';
import BroadcastsScreen from '../screens/spot/BroadcastsScreen';
import BusinessScreen from '../screens/business/BusinessScreen';

import i18n from '../i18n/i18n';
import Icon from 'react-native-vector-icons/Ionicons';


const HomeStack = createStackNavigator({
    Home: {
      screen: HomeScreen,
    },
    BusinessProfileScreen: {
      screen: BusinessProfileScreen,
      navigationOptions: {
        headerTitleStyle: {
          width: '100%',
          textAlign: 'center',
          alignSelf: 'center',
          color: themes.base.colors.accent.default,
          marginLeft: Platform.OS === 'android' ? -30 : null,
        },
      }
    },
    BroadcastsList: BroadcastsScreen,
    BusinessScreen: {
      screen: BusinessScreen,
      navigationOptions: {
        title: i18n.t('home.closestBusinesses'),

        headerTitleStyle: {
          width: '100%',
          textAlign: 'center',
          alignSelf: 'center',
          color: themes.base.colors.accent.default,
          marginLeft: Platform.OS === 'android' ? -10 : null,
        },
      }
    },
  },{
    navigationOptions: {
      headerBackTitle: null,
      headerBackImage: (<Icon
        color={themes.base.colors.text.default}
        name="ios-arrow-round-back" style={{marginLeft: Platform.OS === 'android' ? 0 : 16}} size={48}/>),
      headerTitleStyle: {
        color: themes.base.colors.accent.default
      }
    }
  }

);


export default HomeStack;
