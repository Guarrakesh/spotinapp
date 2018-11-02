import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';



import {View, Text, Button, Platform} from 'react-native';
// Screens
import BroadcastsScreen from '../screens/spot/BroadcastsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import ReservationScreen from "../screens/profile/ReservationScreen";
import BusinessProfileScreen from '../screens/spot/BusinessProfileScreen';

import AuthNavigator from './AuthNavigator';

import i18n from '../i18n/i18n';
import themes from "../styleTheme";
import IntroSwiper from "../screens/intro/AppIntro";



export const ProfileStack = createStackNavigator({
      ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
          title: i18n.t('common.Profile'),
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
          headerTransparent: true,
          headerTintColor: themes.base.colors.text.default,

          headerStyle: {
            shadowColor: 'transparent',
            borderBottomWidth: 0,
          },
          title: null,

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
          title: i18n.t("profile.bookedOffer.title"),
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