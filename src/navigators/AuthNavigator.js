import React from 'react';
import { Platform, TouchableHighlight } from 'react-native';


import { Icon } from 'react-native-vector-icons/MaterialIcons'
import { createStackNavigator }  from 'react-navigation';

import LoginScreen from '../screens/login/LoginScreen';
import ForgotPasswordScreen from '../screens/login/ForgotPasswordScreen';

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
      // SignUp: {
      //   screen: SignupScreen,
      //
      //   defaultNavigationOptions: ({navigation}) => ({
      //     title: i18n.t("auth.register.title").toUpperCase(),
      //     headerTitleStyle: {
      //       fontFamily: themes.base.fonts.LatoMedium,
      //       textAlign: 'center',
      //       alignSelf: 'center',
      //       flex: 1,
      //       marginRight: Platform.OS === 'android' ? 75 : null,
      //     },
      //     headerMode: 'screen',
      //     headerTransparent: true,
      //     headerTintColor: themes.base.colors.text.default,
      //     headerStyle: {
      //       shadowColor: 'transparent',
      //       borderBottomWidth: 0,
      //     }
      //
      //
      //   })
      // },
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
        backgroundColor: themes.base.colors.accent.default
      }


    }

);

export default AuthNavigator;
