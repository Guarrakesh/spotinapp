import React from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';

import { createStackNavigator, createTabNavigator, TabBarBottom, addNavigationHelpers}  from 'react-navigation';


import AuthNavigator from './AuthNavigator';
import BusinessScreen from '../components/BusinessScreen';
import DetailsScreen from '../components/DetailsScreen';
import FavoriteScreen from '../components/FavoriteScreen';
import NewsScreen from '../components/NewsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Images from '../assets/images';

import {SpotStack, BusinessMapNavigator} from './SpotStack';
import ProfileStack from './ProfileStack';

import themes from '../styleTheme';

const BusinessStack = createStackNavigator({
    Business: BusinessScreen,

});

const FavoriteStack = createStackNavigator({
    Favorite: FavoriteScreen,

});


const NewsStack = createStackNavigator({
    News: NewsScreen,

});




export const MainNavigation = createTabNavigator(
    {

        Business: BusinessStack,
        Favorite: FavoriteStack,
        Spot: SpotStack,
        News: NewsStack,
        Profile: ProfileStack,
    },
    {
        screenBackgroundColor: 'red',
        navigationOptions: ({ navigation }) => ({
             tabBarIcon: ({ focused, tintColor }) => {

             const { routeName } = navigation.state;

             let image = '';

             switch (routeName){
                 case 'Business':
                     image = focused ? Images.icons.barIcons.businessSelected : Images.icons.barIcons.business;
                     break;
                 case 'Favorite':
                     image = focused ? Images.icons.barIcons.favoriteSelected : Images.icons.barIcons.favorite;
                     break;
                 case 'Spot':
                     image = focused ? Images.icons.barIcons.spotSelected : Images.icons.barIcons.spot;
                     break;
                 case 'News':
                     image = focused ? Images.icons.barIcons.newsSelected : Images.icons.barIcons.news;
                     break;
                 case 'Profile':
                     image = focused ? Images.icons.barIcons.profileSelected : Images.icons.barIcons.profile;
             }

             return <Image source={image} style={{height: 24, width: 24}} />;
             },
        }),
        initialRouteName: "Spot",
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

        BusinessMap: BusinessMapNavigator
    }, {
        headerMode: 'none',
        mode: "modal",
        initialRouteName: 'Main',

    }
);



export default RootNavigator;