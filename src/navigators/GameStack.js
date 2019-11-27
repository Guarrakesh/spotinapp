import React from 'react';
import { createStackNavigator } from 'react-navigation';

//Screen
import GameScreen from "../screens/game/GameScreen";
import CatalogScreen from "../screens/game/CatalogScreen";
import PrizeDetailScreen from "../screens/game/PrizeDetailScreen";
import BusinessRequestScreen from "../screens/game/BusinessRequestScreen";
import PrizeConfirmationScreen from "../screens/game/PrizeConfirmationScreen";

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

    }
  },
  PrizeDetailScreen: {
    screen: PrizeDetailScreen,
    navigationOptions: {
      header: null,
    },
    defaultNavigationOptions: {
      gesturesEnabled: false,

    }
  },
  BusinessRequestScreen: {
    screen: BusinessRequestScreen,
    navigationOptions: {
      header: null,
    },
    defaultNavigationOptions: {
      gesturesEnabled: false,

    }
  },
  PrizeConfirmationScreen: {
    screen: PrizeConfirmationScreen,
    navigationOptions: {
      header: null,
    },
    defaultNavigationOptions: {
      gesturesEnabled: false,

    }
  }
});
