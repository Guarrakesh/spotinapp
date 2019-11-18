import React from 'react';
import { createStackNavigator } from 'react-navigation';

//Screen
import GameScreen from "../screens/game/GameScreen";
import CatalogScreen from "../screens/game/CatalogScreen";
import PrizeDetailScreen from "../screens/game/PrizeDetailScreen";

export const GameStack = createStackNavigator({
  GameScreen: {
    screen: GameScreen,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
    defaultNavigationOptions: {
      gesturesEnabled: false,

    },
  },
  CatalogScreen: {
    screen: CatalogScreen,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
    defaultNavigationOptions: {
      gesturesEnabled: false,

    },
  },
  PrizeDetailScreen: {
    screen: PrizeDetailScreen,
    navigationOptions: {
      header: null,
    },
    defaultNavigationOptions: {
      gesturesEnabled: false,

    },
  }
});
