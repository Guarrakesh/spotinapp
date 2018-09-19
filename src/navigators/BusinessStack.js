import React from 'react';
import {createStackNavigator} from 'react-navigation';
import BusinessScreen from '../screens/business/BusinessScreen';
import BusinessProfileScreen from '../screens/business/BusinessProfileScreen';
import BusinessMapScreen from '../screens/business/BusinessMapScreen';

import themes from '../styleTheme';
import {Fonts} from "../components/common/Fonts";
import DismissButton from "../components/common/DismissButton";

export const BusinessStack = createStackNavigator({

    BusinessList: {
      screen: BusinessScreen,
      navigationOption: ({navigation}) => {
        return {
          title: 'Locali vicini',

          headerStyle: {
            shadowOffset: {width: 0, height: 0},
            shadowColor: 'transparent',
            borderBottomWidth: 0,
            backgroundColor: themes.base.colors.primary.default
          },
          headerTitleStyle: {
            fontFamily: Fonts.LatoBold,
            color: themes.base.colors.text.default
          }
        }

      }
    },
    BusinessProfileScreen: {
      screen: BusinessProfileScreen,
      navigationOption: { title: 'Profilo locale' }
    }

  },{
    navigationOption: {
      headerStyle: {
        backgroundColor: themes.base.colors.primary.default

      },
      headerTintColor: themes.base.colors.text.default,
    }
  }
);

export const BusinessMapNavigator = createStackNavigator({

  BusinessMapScreen: {
    screen: BusinessMapScreen,
    navigationOptions: ({navigation}) => {
      return {
        title: "Mappa Locali",
        headerRight: (
          <DismissButton onPress={() => {navigation.navigate('BusinessList')}} color={themes.base.colors.text.default} style={{marginRight: 16}}/>
        ),
      }
    },
  }
}, {
  mode: 'modal',

});
