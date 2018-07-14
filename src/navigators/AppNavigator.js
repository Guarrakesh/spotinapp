import React from 'react';
import PropTypes from 'prop-types';

import { createStackNavigator, createTabNavigator, TabBarBottom, addNavigationHelpers}  from 'react-navigation';


import SignedOut from './SignedOut';
import BusinessScreen from '../components/BusinessScreen';
import DetailsScreen from '../components/DetailsScreen';
import FavoriteScreen from '../components/FavoriteScreen';
import SpotScreen from '../components/SpotScreen';
import NewsScreen from '../components/NewsScreen';
import ProfileScreen from '../screens/ProfileScreen';

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
            /* tabBarIcon: ({ focused, tintColor }) => {
             const { routeName } = navigation.state;
             let image = '';
             if (routeName === 'Local') {
             image = focused ? require('../BarIcons/LocalIcon.png') : require('../BarIcons/LocalIcon-outline.png');
             }
             else if (routeName === 'Favorite') {
             image = focused ? require('../BarIcons/FavoriteIcon.png') : require('../BarIcons/FavoriteIcon-outline.png');
             }
             else if (routeName === 'Spot') {
             image = focused ? require('../BarIcons/SpotinIcon.png') : require('../BarIcons/SpotinIcon-outline.png');
             }
             else if (routeName === 'News') {
             image = focused ? require('../BarIcons/NewsIcon.png') : require('../BarIcons/NewsIcon-outline.png');
             }
             else if (routeName === 'Profile') {
             image = focused ? require('../BarIcons/ProfileIcon.png') : require('../BarIcons/ProfileIcon-outline.png');
             }

             //const img = require('./BarIcons/NewsIcon.png');
             // You can return any component that you like here! We usually use an
             // icon component from react-native-vector-icons
             return <Image source={image} style={{height: 30, width: 30}} />;
             },*/
        }),
        initialRouteName: "Spot",
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: 'gray',
        },
        animationEnabled: false,
        swipeEnabled: false,
        cardStyle: {backgroundColor: 'red'}

    }
);

const RootNavigator = createStackNavigator(
    {
        SignedIn: {
            screen: SignedIn,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        SignedOut: {
            screen: SignedOut,
            navigationOptions: {
                gesturesEnabled: false
            }
        }
    }, {
        headerMode: 'none',
        mode: "modal",
        initialRouteName: 'SignedOut',

    }
);



export default RootNavigator;