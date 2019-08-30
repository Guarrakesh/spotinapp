import React from 'react';
import {createStackNavigator} from "react-navigation";
//Screens
import LocationScreen from "../screens/location/LocationScreen";


export const LocationNavigator = createStackNavigator({
  LocationScreen: {
    screen: LocationScreen,
    navigationOptions: () => {
      return {
        headerTransparent: true,
      }
    }

  }
});