import React from 'react';
import {View, Text, Button, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from "react-navigation";

//Translation
import i18n from '../i18n/i18n';
//Screens
import SportScreen from "../screens/spot/SportScreen";
import EventScreen from '../screens/spot/EventScreen';
import BroadcastsScreen from '../screens/spot/BroadcastsScreen';
import CompetitionsScreen from "../screens/spot/CompetitionsScreen";
import BusinessMapScreen from "../screens/spot/BusinessMapScreen";
import BusinessProfileScreen from '../screens/spot/BusinessProfileScreen';
import ContactUsScreen from '../screens/spot/ContactUsScreen';
//Components
import DismissButton from '../components/common/DismissButton';
//Styles
import themes from "../styleTheme";


export const BusinessMapNavigatorInSpot = createStackNavigator({
      BusinessMapScreen: {
        screen: BusinessMapScreen,
        navigationOptions: ({navigation}) => {
          return {
            headerTransparent: true,
            headerStyle: {
              shadowColor: 'transparent',
              borderBottomWidth: 0,
            },
            headerRight: (
                <DismissButton onPress={() => {navigation.navigate('BroadcastsList')}} color={themes.base.colors.text.default} style={{marginRight: 16}}/>
            ),
          }
        },
      }
    }, {
      mode: 'modal',
    }
);

export const ContactUsNavigator = createStackNavigator({
      ContactUsScreen: {
        screen: ContactUsScreen,
        navigationOptions: ({navigation}) => {
          return {
            headerTransparent: true,
            headerStyle: {
              shadowColor: 'transparent',
              borderBottomWidth: 0,
            },
            headerRight: (
                <DismissButton onPress={() => {navigation.navigate('BroadcastsList')}} color={themes.base.colors.text.default} style={{marginRight: 16}}/>
            ),
          }
        },
      }
    }, {
      mode: 'modal',
    }
);

export const SpotStack = createStackNavigator({
      SportList: {
        screen: SportScreen,
        navigationOptions: () => ({
          title: i18n.t("common.Browse"),
          headerBackTitle: null,
          headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
            alignSelf: 'center',
            color: themes.base.colors.text.default,
            //marginRight: Platform.OS === 'android' ? 75 : null,
          },
        }),

      },
      Competitions: {
        screen: CompetitionsScreen,

        navigationOptions: ({navigation}) => ({
          ...navigation.navigationOptions,
          headerBackTitle: null,
          headerTitleStyle: {
            width: '100%',
            textAlign: 'center',
            alignSelf: 'center',
            color: themes.base.colors.text.default,
            marginLeft: Platform.OS === 'android' ? -30 : null,
          },

          title: navigation.state.params.title || "Spot In" })
      },
      Events: {
        screen: EventScreen,
        navigationOptions: ({navigation}) => ({
          ...navigation.navigationOptions,
          title: navigation.state.params.title || "Spot In",
          headerBackTitle: null,
          headerTitleStyle: {
            width: '100%',
            textAlign: 'center',
            alignSelf: 'center',
            color: themes.base.colors.text.default,
            marginLeft: Platform.OS === 'android' ? -30 : null,
          },
        })
      },
      BroadcastsList: {
        screen: BroadcastsScreen,
        title:  i18n.t("browse.nearOffers"),


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
      }
    },{
      cardStyle: { backgroundColor: themes.base.backgroundColor },

      navigationOptions: {
        headerBackTitle: "",
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


