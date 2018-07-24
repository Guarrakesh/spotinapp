import React from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';

import { createStackNavigator, createTabNavigator, TabBarBottom, addNavigationHelpers}  from 'react-navigation';


import AuthNavigator from './AuthNavigator';
import BusinessScreen from '../components/BusinessScreen';
import DetailsScreen from '../components/DetailsScreen';
import FavoriteScreen from '../components/FavoriteScreen';
import SpotScreen from '../components/SpotScreen';
import NewsScreen from '../components/NewsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Images from '../assets/images';

import SpotStack from './SpotStack';
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




export const SignedIn = createTabNavigator(
    {

        Business: BusinessStack,
        Favorite: FavoriteStack,
        Spot: SpotStack,
        News: NewsStack,
        Profile: ProfileStack
    },
    {
        navigationOptions: ({ navigation }) => ({
             tabBarIcon: ({ focused, tintColor }) => {

             const { routeName } = navigation.state;

             let image = '';

             if (routeName === 'Business') {
             image = focused ? Images.icons.barIcons.businessSelected : Images.icons.barIcons.business;
             }
             else if (routeName === 'Favorite') {
             image = focused ? Images.icons.barIcons.favoriteSelected : Images.icons.barIcons.favorite;
             }
             else if (routeName === 'Spot') {
             image = focused ? Images.icons.barIcons.spotSelected : Images.icons.barIcons.spot;
             }
             else if (routeName === 'News') {
             image = focused ? Images.icons.barIcons.newsSelected : Images.icons.barIcons.news;
             }
             else if (routeName === 'Profile') {
             image = focused ? Images.icons.barIcons.profileSelected : Images.icons.barIcons.profile;
             }

             return <Image source={image} style={{height: 30, width: 30}} />;
             },
        }),
        initialRouteName: "Spot",
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: themes.base.colors.text.default,
            inactiveTintColor: 'gray',
        },
        animationEnabled: false,
        swipeEnabled: true,


    }
);

const RootNavigator = createStackNavigator(
    {
        SignedIn: {
            screen: SignedIn,
            navigationOptions: {
                gesturesEnabled: false,

            }
        },
        Auth: {
            screen: AuthNavigator,
            navigationOptions: {
                gesturesEnabled: false

            }
        }
    }, {
        headerMode: 'none',
        mode: "modal",
        initialRouteName: 'SignedIn',

    }
);



export default RootNavigator;