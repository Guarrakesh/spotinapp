import React from 'react';
import {createStackNavigator} from 'react-navigation';
import BusinessScreen from '../screens/BusinessScreen';
import BusinessProfileScreen from '../screens/BusinessProfileScreen';
import BusinessMapScreen from '../screens/BusinessMapScreen';

import themes from '../styleTheme';
import {Fonts} from "../components/common/Fonts";
import DismissButton from "../components/common/DismissButton";

export const BusinessStack = createStackNavigator({

  BusinessList: {
    screen: BusinessScreen,
    navigationOption: {
      title: 'Locali vicini',
    }
  },
  BusinessProfileScreen: {
    screen: BusinessProfileScreen,
    navigationOption: { title: 'Profilo locale' }
  }

});

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
