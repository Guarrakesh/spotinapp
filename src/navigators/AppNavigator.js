import React from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';

import { createStackNavigator, createBottomTabNavigator, TabBarBottom, addNavigationHelpers}  from 'react-navigation';

import AuthNavigator from './AuthNavigator';
import Images from '../assets/images';
import {BusinessStack, BusinessMapNavigatorInBusiness} from "./BusinessStack";
import {SpotStack, BusinessMapNavigatorInSpot, ContactUsNavigator} from './SpotStack';
import {FavoriteNavigator, ProfileStack} from './ProfileStack';
import HomeStack from './HomeStack';

import BroadcastsScreen from '../screens/spot/BroadcastsScreen';
import Launcher from '../screens/Launcher';
import NoLocationScreen from '../screens/NoLocationScreen';
import AppIntro from "../screens/intro/AppIntro"

import i18n from '../i18n/i18n';




import themes from '../styleTheme';

export const MainNavigation = createBottomTabNavigator(
  {
    Home: HomeStack,
    Browse: SpotStack,
    Profile: ProfileStack,
  },
  {
    lazy: false,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {

        const { routeName } = navigation.state;

        let image = '';

        switch (routeName){

          case 'Home':
            image = focused ? Images.icons.barIcons.spotSelected : Images.icons.barIcons.spot;
            break;
          case 'Browse':
            image = focused ? Images.icons.barIcons.newsSelected : Images.icons.barIcons.news;
            break;
          case 'Profile':
            image = focused ? Images.icons.barIcons.profileSelected : Images.icons.barIcons.profile;
        }

        return <Image source={image} style={{height: 24, width: 24}} />;
      },
      title: i18n.t(`common.${navigation.state.routeName}`)
    }),

    initialRouteName: "Home",
    //tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: themes.base.colors.text.default,
      inactiveTintColor: 'grey',  //da definire colore nei themes
    },
    animationEnabled: false,
    swipeEnabled: false,


  }
);

const RootNavigator = createStackNavigator(
  {
    Launcher: Launcher,

    NoLocationScreen: NoLocationScreen,

    Main: {
      screen: MainNavigation,
      navigationOptions: {
        gesturesEnabled: false,

      },


    },
    Auth: {
      screen: AuthNavigator,
      navigationOptions: {
        gesturesEnabled: false,


      }
    },
    AppIntro: AppIntro,
    BusinessMapInSpot: BusinessMapNavigatorInSpot,
    BusinessMapInBusiness: BusinessMapNavigatorInBusiness,
    ContactUs: ContactUsNavigator,
    FavoriteNavigator: FavoriteNavigator,

    //For push notifications
    BroadcastList: BroadcastsScreen,
  }, {
    headerMode: 'none',
    mode: "modal",
    initialRouteName: 'Launcher',
  }
);



export default RootNavigator;
