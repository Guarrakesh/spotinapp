import React from 'react';
import { Platform, TouchableHighlight } from 'react-native';

import { FluidNavigator } from 'react-navigation-fluid-transitions';

import { Icon } from 'react-native-vector-icons/MaterialIcons'
import { createStackNavigator }  from 'react-navigation';

import LoginScreen from '../screens/login/LoginScreen';
import SignupScreen from '../screens/spot/SignupScreen';
import ForgotPasswordScreen from '../screens/login/ForgotPasswordScreen';
import DismissButton from "../components/common/DismissButton";

import themes from '../styleTheme';
import i18n from '../i18n/i18n';

const BackButton = ({onPress}) => (
    <TouchableHighlight onPress={onPress}>
        <Icon name="keyboard-backspace"/>
    </TouchableHighlight>
);


const AuthNavigator = createStackNavigator(
    {
      SignIn: {
        screen: LoginScreen,
        navigationOptions: ({navigation}) => {
          return {
            headerTransparent: true,
            headerStyle: {
              shadowColor: 'transparent',
              borderBottomWidth: 0,
            },


          }
        }

      },
      SignUp: {
        screen: SignupScreen,

        navigationOptions: ({navigation}) => ({
          title: i18n.t("auth.register.title").toUpperCase(),
          headerTitleStyle: {
            fontFamily: themes.base.fonts.LatoMedium,
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
            marginRight: Platform.OS === 'android' ? 75 : null,
          },
          headerMode: 'screen',
          headerTransparent: true,
          headerTintColor: themes.base.colors.text.default,
          headerStyle: {
            shadowColor: 'transparent',
            borderBottomWidth: 0,
          }


        })
      },
      ForgotPassword: {
        screen: ForgotPasswordScreen,
        navigationOptions: ({navigation}) => ({
          headerTransparent: true,
          headerTintColor: themes.base.colors.white.default,

          headerStyle: {
            shadowColor: 'transparent',
            borderBottomWidth: 0,
          },

        })
      }
    },
    {
      mode: 'modal',
      headerMode: 'screen',
      cardStyle: {
        backgroundColor: themes.base.colors.accent.dark
      }


    }

);

export default AuthNavigator;