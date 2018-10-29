import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';



import {View, Text, Button, Platform} from 'react-native';

import BroadcastsScreen from '../screens/spot/BroadcastsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';

import themes from "../styleTheme";
import AuthNavigator from './AuthNavigator';
import ReservationScreen from "../screens/profile/ReservationScreen";

import BusinessProfileScreen from '../screens/spot/BusinessProfileScreen';


export const ProfileStack = createStackNavigator({
      ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
          title: 'Profilo',
          headerBackTitle: null,
          headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
            alignSelf: 'center',
            color: themes.base.colors.text.default,
            marginLeft: Platform.OS === 'android' ? 75 : null,
          },
        }
      },
      EditProfileScreen: {
        screen: EditProfileScreen,
        navigationOptions: {
          title: null,
          headerTransparent: true,
          headerStyle: {
            shadowColor: 'transparent',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            width: '100%',
            textAlign: 'center',
            alignSelf: 'center',
            color: themes.base.colors.text.default,
            marginLeft: Platform.OS === 'android' ? -30 : null,
          },
        }
      },
      ReservationScreen: {
        screen: ReservationScreen,
        navigationOptions: {
          title: 'Offerta prenotata',
          headerTitleStyle: {
            width: '100%',
            textAlign: 'center',
            alignSelf: 'center',
            color: themes.base.colors.text.default,
            marginLeft: Platform.OS === 'android' ? -30 : null,
          },
        }
      },
      BroadcastsList: {
        screen: BroadcastsScreen,

      },
      BusinessProfileScreen: {
        screen: BusinessProfileScreen,
        navigationOptions: ({navigation}) => ({

          headerBackTitle: null,
          headerTitleStyle: {
            width: '100%',
            textAlign: 'center',
            alignSelf: 'center',
            color: themes.base.colors.text.default,
            marginLeft: Platform.OS === 'android' ? -30 : null,
          },
          headerBackImage: (<Icon
              color={themes.base.colors.text.default}
              name="ios-arrow-round-back" style={{marginLeft: Platform.OS === 'android' ? 0 : 16}} size={48}/>),
        })
      },

    },{
      navigationOptions: {
        headerBackTitle: null,
        headerBackImage: (<Icon
          color={themes.base.colors.text.default}
          name="ios-arrow-round-back" style={{marginLeft: Platform.OS === 'android' ? 0 : 16}} size={48}/>),

        headerStyle: {
          backgroundColor: themes.base.colors.primary.default

        },
        headerTintColor: themes.base.colors.text.default,
      }
    }
);


export default ProfileStack;