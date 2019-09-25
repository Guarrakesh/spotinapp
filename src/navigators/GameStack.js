import React from 'react';
import { createStackNavigator } from 'react-navigation';

//Screen
import GameScreen from "../screens/game/GameScreen";
import CatalogScreen from "../screens/game/CatalogScreen";

export const GameStack = createStackNavigator({
  GameScreen: {
    screen: GameScreen,
    navigationOptions: {
      header: null
    }
  },
  CatalogScreen: {
    screen: CatalogScreen,
    navigationOptions: {
      header: null
    }
  }
});