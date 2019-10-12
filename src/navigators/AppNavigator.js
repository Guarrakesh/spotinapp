import React from 'react';
import {Image} from 'react-native';

import {addNavigationHelpers, createBottomTabNavigator, createStackNavigator} from 'react-navigation';

import AuthNavigator from './AuthNavigator';
import Images from '../assets/images';
import {BusinessMapNavigatorInBusiness} from "./BusinessStack";
import {BusinessMapNavigatorInSpot, ContactUsNavigator, SpotStack} from './SpotStack';
import {FavoriteNavigator, ProfileStack, ReviewsNavigator} from './ProfileStack';
import {GameStack} from "./GameStack";
import {LocationNavigator} from "./LocationStack";
import HomeStack from './HomeStack';

import BroadcastsScreen from '../screens/spot/BroadcastsScreen';
import Launcher from '../screens/Launcher';
import AppIntro from "../screens/intro/NewAppIntro"

import i18n from '../i18n/i18n';
import themes from '../styleTheme';

export const MainNavigation = createBottomTabNavigator(
  {
    Home: HomeStack,
    Browse: SpotStack,
    Game: GameStack,
    Profile: ProfileStack
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
            break;
          case 'Game':
            image = focused ? Images.icons.barIcons.gameVioletSelected : Images.icons.barIcons.gameViolet;
        }

        return <Image source={image} style={{height: 24, width: 24}} />;
      },
      title: i18n.t(`common.${navigation.state.routeName}`)
    }),

    initialRouteName: "Home",
    //tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: themes.base.colors.accent.default,
      inactiveTintColor: 'grey',  //da definire colore nei themes
    },
    animationEnabled: false,
    swipeEnabled: false,


  }
);

const RootNavigator = createStackNavigator(
  {
    Launcher: Launcher,

    LocationScreen: LocationNavigator,

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
    ReviewsNavigator: ReviewsNavigator,

    //For push notifications
    BroadcastList: BroadcastsScreen,
  }, {
    headerMode: 'none',
    mode: "modal",
    initialRouteName: 'Launcher',
  }
);



export default RootNavigator;
