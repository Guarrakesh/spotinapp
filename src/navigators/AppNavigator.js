import React from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';

import { createStackNavigator, createTabNavigator, TabBarBottom, addNavigationHelpers}  from 'react-navigation';

import AuthNavigator from './AuthNavigator';
import FavoriteScreen from '../components/FavoriteScreen';
import Images from '../assets/images';
import {BusinessStack, BusinessMapNavigatorInBusiness} from "./BusinessStack";
import {SpotStack, BusinessMapNavigatorInSpot} from './SpotStack';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';

import themes from '../styleTheme';

const FavoriteStack = createStackNavigator({
  Favorite: FavoriteScreen,
});




export const MainNavigation = createTabNavigator(
  {
    Home: HomeStack,
    Esplora: SpotStack,

   Profile: ProfileStack,
  },
  {
    screenBackgroundColor: themes.base.colors.primary.default,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {

        const { routeName } = navigation.state;

        let image = '';

        switch (routeName){

          case 'Home':
            image = focused ? Images.icons.barIcons.spotSelected : Images.icons.barIcons.spot;
            break;
          case 'Esplora':
            image = focused ? Images.icons.barIcons.newsSelected : Images.icons.barIcons.news;
            break;
          case 'Profile':
            image = focused ? Images.icons.barIcons.profileSelected : Images.icons.barIcons.profile;
        }

        return <Image source={image} style={{height: 24, width: 24}} />;
      },
    }),
    initialRouteName: "Home",
    tabBarComponent: TabBarBottom,
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

    BusinessMapInSpot: BusinessMapNavigatorInSpot,
    BusinessMapInBusiness: BusinessMapNavigatorInBusiness
  }, {
    headerMode: 'none',
    mode: "modal",
    initialRouteName: 'Main',

  }
);



export default RootNavigator;
