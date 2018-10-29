import React from 'react';
import { Platform } from 'react-native';

import { FluidNavigator } from 'react-navigation-fluid-transitions';

import { Icon } from 'react-native-vector-icons/MaterialIcons'
import { createStackNavigator }  from 'react-navigation';

import LoginScreen from '../screens/spot/LoginScreen';
import SignupScreen from '../screens/spot/SignupScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

import { TouchableHighlight } from 'react-native';
import DismissButton from '../components/common/DismissButton';
import themes from '../styleTheme';

const BackButton = ({onPress}) => (
    <TouchableHighlight onPress={onPress}>
        <Icon name="keyboard-backspace"/>
    </TouchableHighlight>
)


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
          title: 'Registrazione'.toUpperCase(),
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
          headerTintColor: themes.base.colors.text.default,

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
        backgroundColor: themes.base.colors.primary.default
      }


    }

);

export default AuthNavigator;